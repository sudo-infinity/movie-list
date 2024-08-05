import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-800 to-cyan-950 p-4">
      <div className="text-6xl font-bold text-white mb-6 text-center">
        Welcome to Movie List
      </div>

      <div className="flex flex-row space-x-4">
        <Link href="/login">
          <div className="w-full px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-75 transition-transform transform hover:scale-105">
            Login
          </div>
        </Link>

        <Link href="/register">
          <div className="w-full px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-75 transition-transform transform hover:scale-105">
            Register
          </div>
        </Link>
      </div>
      <Footer relativePosition={false} />
    </div>
  );
}
