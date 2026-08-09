export function ErrorAlert({ error }: { error: string }) {
  return (
    <div className="mt-8 p-6 border-l-4 border-red-500 bg-red-50 text-red-900 rounded-r-adyen">
      <h3 className="text-lg font-bold mb-1">Ghép đội thất bại</h3>
      <p className="text-sm">{error}</p>
    </div>
  );
}