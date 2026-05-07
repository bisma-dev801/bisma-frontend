import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Plus, Edit3, Copy, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Portfolio {
  id: number;
  name: string;
  slug: string;
  theme: string;
  updated_at: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get(`${API}/api/portfolios/user/${user?.id}`);
      setPortfolios(res.data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPortfolios();
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Portfolios
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your portfolios easily
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to="/create"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl font-medium hover:shadow-lg transition"
            >
              <Plus className="w-5 h-5" />
              New
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-5 py-3 rounded-xl font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* PORTFOLIOS */}
        {portfolios.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((p) => (
              <div
                key={p.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                {/* TOP */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold truncate">{p.name}</h3>

                  <div className="flex gap-2">
                    <Link
                      to={`/portfolio/${p.slug}`}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Copy className="w-4 h-4" />
                    </button>

                    <Link
                      to={`/edit/${p.id}`}
                      className="p-2 hover:bg-blue-100 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4 text-blue-600" />
                    </Link>
                  </div>
                </div>

                {/* INFO */}
                <div className="text-sm text-gray-500 space-y-2">
                  <p className="truncate">
                    yourapp.com/portfolio/{p.slug}
                  </p>

                  <p>
                    Theme:{" "}
                    <span className="font-medium capitalize">
                      {p.theme}
                    </span>
                  </p>

                  <p className="text-xs text-gray-400">
                    Updated:{" "}
                    {new Date(p.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold mb-3">
              No portfolios yet
            </h2>

            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition"
            >
              <Plus className="w-5 h-5" />
              Create First Portfolio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;