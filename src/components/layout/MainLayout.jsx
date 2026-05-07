import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Portfolio <span className="text-purple-600">Builder</span>
          </Link>

          <div className="flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link
              to="/create"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Create
            </Link>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 Portfolio Builder
      </footer>
    </div>
  );
}