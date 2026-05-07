export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">P</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                PortfolioBuilder
              </h2>
              <p className="text-xs text-gray-500 font-medium">Built with React + Vite + Node.js + Express + MySQL</p>
            </div>
          </div>
          
          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="#features" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#templates" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">Templates</a>
            <a href="/dashboard" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">Dashboard</a>
          </nav>
          
          {/* CTA */}
          <a href="/create" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
            Get Started Free
          </a>
        </div>
      </div>
    </header>
  );
}