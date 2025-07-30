import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden akwam-home-bg">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-center">
          {/* User Panel */}
          <div className="flex items-center text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ml-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <span className="text-sm">أضيف حديثاً</span>
          </div>
          
          {/* Logo */}
          <div className="text-white text-xl font-bold tracking-wider">
            𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Central Logo Circle */}
        <div className="mb-12 akwam-fade-in">
          <div className="w-48 h-48 rounded-full flex items-center justify-center relative akwam-glass-dark">
            <div 
              className="w-36 h-36 rounded-full flex items-center justify-center"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.5)'
              }}
            >
              <div className="text-center text-white">
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'akoam, Noto Sans Arabic' }}>
                  Y
                </div>
                <div className="text-sm font-semibold">الصفحة الرئيسية</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-12 w-full max-w-2xl akwam-slide-up">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث هنا عن فيلم أو مسلسل..."
              className="w-full h-16 text-white text-lg px-6 pl-24 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 akwam-glass"
              style={{ borderRadius: '0' }}
            />
            <button
              type="submit"
              className="absolute left-2 top-2 bottom-2 px-6 text-white font-semibold akwam-orange-btn"
              style={{ borderRadius: '0' }}
            >
              بحث
            </button>
          </form>
        </div>

        {/* Category Icons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 akwam-slide-up">
          {/* Movies */}
          <a href="/movies" className="no-underline">
            <div className="flex flex-col items-center text-white hover:text-orange-500 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 akwam-glass flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/50">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎬</div>
                  <div className="text-xs">MOVIE</div>
                </div>
              </div>
              <span className="text-lg font-semibold">أفلام</span>
            </div>
          </a>

          {/* TV Shows */}
          <a href="/shows" className="no-underline">
            <div className="flex flex-col items-center text-white hover:text-orange-500 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 akwam-glass flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/50">
                <div className="text-center">
                  <div className="text-2xl mb-1">📺</div>
                  <div className="text-xs">TV</div>
                </div>
              </div>
              <span className="text-lg font-semibold">تلفزيون</span>
            </div>
          </a>

          {/* Series */}
          <a href="/series" className="no-underline">
            <div className="flex flex-col items-center text-white hover:text-orange-500 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 akwam-glass flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/50">
                <div className="text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-xs">SERIES</div>
                </div>
              </div>
              <span className="text-lg font-semibold">مسلسلات</span>
            </div>
          </a>

          {/* Mix */}
          <a href="/mix" className="no-underline">
            <div className="flex flex-col items-center text-white hover:text-orange-500 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 akwam-glass flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/50">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎭</div>
                  <div className="text-xs">MIX</div>
                </div>
              </div>
              <span className="text-lg font-semibold">منوعات</span>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-center space-x-6 space-x-reverse text-white/60 mb-4">
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📱</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📧</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📺</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">🌐</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📱</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📧</span>
            </div>
          </a>
        </div>
        
        <div className="text-center text-white/60 text-sm">
          <p>جميع الحقوق محفوظة لـ شبكة 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗 © 2025</p>
        </div>
      </footer>
    </div>
  );
}