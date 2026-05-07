import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  SiReact,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMysql,
} from "react-icons/si";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HERO */}
      <section className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">
              Build Your Professional Identity
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition hover:scale-105 duration-300">
            Portfolio{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Builder
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Fill form → Choose theme → Get your portfolio website instantly
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <Link
              to="/create"
              className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Create Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition duration-300" />
            </Link>

            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              My Dashboard
            </Link>

          </div>
        </div>
      </section>

      {/* STATUS CARDS */}
      <section className="px-4 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {/* Backend */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow border text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="font-semibold text-lg md:text-xl">Backend</h3>
            <p className="text-green-600 text-sm mt-2">localhost:5000</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
              Connected
            </span>
          </div>

          {/* Frontend */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow border text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="font-semibold text-lg md:text-xl">Frontend</h3>
            <p className="text-blue-600 text-sm mt-2">localhost:5173</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
              Running
            </span>
          </div>

          {/* Status */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow border text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="font-semibold text-lg md:text-xl">Status</h3>
            <p className="text-purple-600 text-sm mt-2">Ready to Build</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
              Everything OK
            </span>
          </div>

        </div>
      </section>

      {/* TECH STACK */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow border text-center">

          <p className="text-gray-700 font-medium mb-6">
            Built with modern technologies
          </p>

          <div className="flex flex-wrap justify-center gap-6">

            <div className="flex flex-col items-center transition hover:scale-110">
              <SiReact className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
              <span className="text-sm mt-1">React</span>
            </div>

            <div className="flex flex-col items-center transition hover:scale-110">
              <SiVite className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
              <span className="text-sm mt-1">Vite</span>
            </div>

            <div className="flex flex-col items-center transition hover:scale-110">
              <SiNodedotjs className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              <span className="text-sm mt-1">Node.js</span>
            </div>

            <div className="flex flex-col items-center transition hover:scale-110">
              <SiExpress className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
              <span className="text-sm mt-1">Express</span>
            </div>

            <div className="flex flex-col items-center transition hover:scale-110">
              <SiMysql className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              <span className="text-sm mt-1">MySQL</span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}








