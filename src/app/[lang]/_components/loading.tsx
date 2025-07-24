export default function Loading() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </section>
  );
}
