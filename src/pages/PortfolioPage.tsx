import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Download, Copy, ExternalLink } from 'lucide-react';
import Confetti from 'react-confetti';

interface Project {
  title: string;
  link: string;
  description: string;
}

interface Portfolio {
  name: string;
  bio: string;
  skills: string[] | string;
  projects: Project[] | string;
  profileImage?: string;
  theme: 'dark' | 'light' | 'minimal';
}

const PortfolioPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/portfolios/${slug}`);
        setPortfolio(response.data);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPortfolio();
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
          <a href="/" className="text-blue-600 hover:underline">Go Home</a>
        </div>
      </div>
    );
  }

  // ✅ FIX 4 — Parse safely
  const parsedSkills: string[] =
    typeof portfolio.skills === 'string'
      ? JSON.parse(portfolio.skills)
      : portfolio.skills;

  const parsedProjects: Project[] =
    typeof portfolio.projects === 'string'
      ? JSON.parse(portfolio.projects)
      : portfolio.projects;

  const getThemeClasses = (theme: Portfolio['theme']) => {
    switch (theme) {
      case 'dark':
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white';
      case 'light':
        return 'bg-gradient-to-br from-slate-50 via-white to-gray-50 text-gray-900';
      case 'minimal':
        return 'bg-gradient-to-br from-gray-50 to-white text-gray-900 border-t-8 border-gray-200';
      default:
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white';
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <div className={`${getThemeClasses(portfolio.theme)} min-h-screen`}>
        {/* Header */}
        <header className="pt-16 pb-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-end mb-8">
              <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-2">
                <button
                  onClick={copyLink}
                  className="p-3 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-2 text-sm"
                  title="Copy link"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href="#"
                  className="p-3 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-2 text-sm"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hero */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
              {portfolio.profileImage && (
                <div className="flex-shrink-0">
                  <img
                    src={`http://localhost:5000/${portfolio.profileImage}`} // ✅ FIX image path
                    alt={portfolio.name}
                    className="w-48 h-48 lg:w-64 lg:h-64 rounded-3xl object-cover shadow-2xl ring-4 ring-white/20"
                  />
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-white/80 to-transparent bg-clip-text">
                  {portfolio.name}
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 max-w-3xl leading-relaxed">
                  {portfolio.bio}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pb-24">
          {/* Skills */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
              <span className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">★</span>
              Skills
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {parsedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  <h3 className="text-2xl font-bold group-hover:underline">{skill}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
              <span className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">🚀</span>
              Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {parsedProjects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-sm rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-4"
                >
                  <h3 className="text-3xl font-bold mb-6 group-hover:underline">{project.title}</h3>
                  <p className="text-xl text-white/80 mb-8 leading-relaxed">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-2xl font-bold text-white/90 hover:text-white group-hover:translate-x-2 transition-all duration-300"
                  >
                    View Project
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-32 pt-12 pb-8 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto text-center text-white/70">
            <p>Built with ❤️ using Portfolio Builder</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PortfolioPage;