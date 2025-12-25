import LightRays from "@/ui/LightRays";
import Navbar from "@/components/Navbar";
import { ArrowDownToLine } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1}
          lightSpread={0.6}
          rayLength={0.8}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.001}
          distortion={0.004}
          className="custom-rays"
        />
      </div>

      <main className="relative z-10 min-h-screen">
        <Navbar />
        <hr className="text-gray-600" />
        <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-white">Building Trust</span>
              <span className="block bg-linear-to-r from-white to-sky-300 bg-clip-text text-transparent">
                Powered by AI & Blockchain
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              A decentralized platform that evaluates trust scores using AI
              models while ensuring transparency, security, and immutability
              with blockchain.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="rounded-full bg-cyan-400 px-8 py-3 font-semibold text-black hover:bg-cyan-300 transition">
                Get Started
              </button>
              <button className="flex rounded-full border border-cyan-400/40 px-8 py-3 text-cyan-300 hover:bg-cyan-400/10 transition">
                Explore
                <span className="ml-1 flex items-center">
                  <ArrowDownToLine size={18} />
                </span>
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              No sign-up required · Wallet-based authentication
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
