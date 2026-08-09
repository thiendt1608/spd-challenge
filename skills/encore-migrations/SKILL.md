---
name: encore-migrations
description: >-
  Use for ANY database schema, seed, or config change in an Encore Go backend (services/<name>/migrations/*.up.sql) — tables, columns, indexes, seeded rows, prompt/config rows, runtime config. Encore AUTO-APPLIES only NEW sequential .up.sql files on deploy and NEVER re-runs an already-applied one, so an in-place edit silently drifts prod from git. Two sanctioned paths: (1) add a new migration file, (2) consolidate/squash overlapping migrations then reset+reinit. Read before touching migrations or running `encore db shell --write`.
---

# encore-migrations — change DB state without drifting prod (Encore Go)

Encore tracks applied migrations in `schema_migrations(version, dirty)` and runs `up` migrations **sequentially, once each**, on `encore run` (local) and every cloud deploy (`git push`). It NEVER re-runs an already-applied version. Source of truth: https://encore.dev/docs/go/primitives/databases (read when unsure).

**The trap:** editing an applied `*.up.sql` (e.g. `005_seed_prompts.up.sql`) only changes a *fresh* DB — prod and running envs keep the OLD content → git says one thing, prod does another. A later migration can also overwrite an earlier one (`006_tweak_prompts` UPDATEs a row seeded by `005_seed_prompts`), so **"latest applied migration wins", not "the file you edited".**

---

## Choose ONE of two options

### ▶ Option 1 — add a NEW migration file (DEFAULT; the only prod-safe path)
Use whenever prod/any shared env is live (you cannot wipe it). Append-only, zero manual steps, auto-applies on deploy.

1. New file = `<N+1>_<short_name>.up.sql` in the service's `migrations/` (highest number + 1, monotonic, `.up.sql`, no gaps). Example first file: `services/demo/migrations/001_init.up.sql`.
2. Forward SQL only:
   - schema → `CREATE/ALTER/DROP …`
   - seed/config → `INSERT … ON CONFLICT (…) DO UPDATE` (idempotent) or `UPDATE … WHERE …`
   - **long text blob (prompt/template)** → `UPDATE <table> SET content=$TAG$<full text>$TAG$, updated_at=NOW() WHERE id='<row id>' AND status='live';` (dollar-quote with a tag the content can't contain, e.g. `$MK$`). Generate it from the original seed block so git stays the readable source.
3. Verify (see below) → `git commit && git push` → Encore applies on deploy. **No `encore db shell --write`.**

Cost: over time you accumulate overlapping migrations (5 sets a row, 6 overrides it, 10/11 re-update it). That's fine functionally ("latest wins") but noisy — clean it with Option 2 at a planned reset.

### ▶ Option 2 — consolidate / squash (only when you CAN reset+reinit)
Use on local/dev, a greenfield/new env, or a **coordinated** wipe — NEVER casually on a shared env with data you must keep (it requires dropping the DB; deleting an applied migration file without a reset triggers Encore's "no migration found for version N" error).

1. **Backup first (mandatory).** Copy the current migrations to a timestamped folder so you can diff/restore: `cp -r services/<svc>/migrations services/<svc>/migrations.bak-<YYYYMMDD>` (or keep under `docs/migration-backups/<date>/`). This is how you compare afterwards and prove nothing was lost.
2. **Audit overlaps.** List which migrations touch the same table/rows (e.g. one table written by 5, 6, 10, 11). Decide the final desired state per object.
3. **Rewrite into clean canonical files.** Fold the final state back into the base files, strip the now-redundant override/patch migrations, keep the seeds that are still the only source of their rows. Renumber only if needed; keep history readable.
4. **Reset + reinit + verify locally:** `encore db reset --all` → `SELECT version,dirty FROM schema_migrations` (matches new max, `dirty=f`) → spot-check every consolidated object equals the intended final state → diff against the backup to confirm nothing was lost.
5. **Roll out:** commit the squashed set. Because applied versions changed, every env must be reinitialized from the squashed set (local reset; a brand-new cloud env provisions clean). For an EXISTING cloud env you must also reset its DB (destructive) — schedule it, back up data first.

Decision: live shared env + must keep data → **Option 1**. Local/dev or a planned clean cut where data is disposable/re-seedable → **Option 2**.

**☁️ Cloud reality (learned the hard way):** Encore CLI `db reset` has **no `--env`** — it only resets LOCAL/namespace/shadow/test. You CANNOT `db reset` a cloud env. So for an existing cloud env, Option 2 is done by reconciliation, not reset:
- If the squashed files produce the SAME final content the env already has, you do NOT re-run anything — just align the version pointer.
- `schema_migrations` is a **single-row golang-migrate pointer** (`version,dirty`), NOT one row per migration. To reconcile to new max N: `DELETE FROM schema_migrations; INSERT INTO schema_migrations(version,dirty) VALUES (N,false);` (or `UPDATE … SET version=N`). **NEVER `DELETE WHERE version IN (10,11)`** — that empties the table → next deploy thinks nothing is applied → re-runs `1_init` → `CREATE TABLE` fails → deploy aborts.
- Then push the squashed files (deploy sees applied=N = max file → no pending → boots) and verify content + health. A brand-new cloud env just provisions clean from the squashed set.

---

## Self-verify (mandatory gate, both options)
From the Encore app root, `export PATH="$HOME/.encore/bin:$PATH"`:
- `encore check` — compiles + applies pending migrations locally; 0 errors.
- `encore db reset --all` — drops + re-runs 1→N from scratch; the real proof the whole sequence (incl later-overrides-earlier) lands the intended final state.
- `SELECT version, dirty FROM schema_migrations;` → version = max, `dirty=f`; then spot-check changed rows, e.g. `SELECT id, position('<marker>' in content) FROM <table> WHERE status='live';`
- Behavior change (prompts/config) → run the golden/regression suite for that service, or exercise the real path end-to-end. Watch out for in-process caches with a TTL (deploy restart clears them, a local reset is immediate).

## Debug
- Migration fails → Encore rolls back that migration and ABORTS the deploy. Fix SQL, push again; locally re-run `encore run`/`encore check`.
- `schema_migrations.dirty=t` → half-applied; fix SQL then it re-runs. Force re-run last: `UPDATE schema_migrations SET version = version - 1;` (manual, last resort).
- "no migration found for version N" (local DB after a daemon timeout, OR after deleting an applied migration without reset) → restart `encore daemon`, then `encore db reset --all`.
- After squashing on a cloud env, if `schema_migrations` ends up EMPTY or wrong: `DELETE FROM schema_migrations; INSERT INTO schema_migrations(version,dirty) VALUES (<max file version>, false);` then redeploy. Confirm content is the intended final state (it was set by the pre-squash migrations and is untouched by file edits).

## House rules
- Local DB names usually drop the `_db` suffix that cloud envs carry — check `encore db shell --help` / the service definition before assuming a name.
- Treat any shared cloud env as LIVE when deciding Option 1 vs 2, even a "dev" one — it has other people's data.
- Business values live in seeds/migrations, never Go constants.
- bash heredocs may be blocked in the agent harness — build SQL with the `write` tool then pipe it: `encore db shell <db> < file.sql`.
- Track any prod `encore db shell --write` in `docs/operations/*-prod-db-writes.md` (Option-1 migrations need no such tracking — they self-document).
