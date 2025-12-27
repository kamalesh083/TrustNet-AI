import LightRays from "@/ui/LightRays";
import Navbar from "@/components/Navbar";
import { ArrowDownToLine } from "lucide-react";

import Button from "@/components/Button";
import ProblemStatement from "@/components/ProblemStatement";
import SolutionOverview from "@/components/SolutionOverview";
import HowItWorks from "@/components/HowItWorks";
import WhyAIBlockchain from "@/components/WhyAIBlockchain";
import Highlights from "@/components/HighLlghts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none">
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

      <main className="relative z-10 min-h-screen ">
        <Navbar />
        <hr className="text-gray-600 mb-12" />
        <section className="relative flex min-h-screen items-center justify-center px-6">
          <div className="mx-auto max-w-5xl text-center">
            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="block text-white">Building Trust</span>
              <span className="block bg-linear-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                Powered by AI & Blockchain
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-7 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A decentralized platform that evaluates trust scores using AI
              models while ensuring{" "}
              <span className="text-white">transparency</span>,
              <span className="text-white"> security</span>, and
              <span className="text-white"> immutability</span> on blockchain.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button
                label="Get Started"
                className="
                  rounded-full
                  bg-cyan-400 px-9 py-3.5
                  font-semibold text-black
                  hover:bg-cyan-300
                  shadow-[0_0_25px_rgba(34,211,238,0.45)]
                  transition
                "
              />
              <Button
                className="
                  flex items-center gap-1.5
                  rounded-full
                  border border-cyan-400/40
                  px-9 py-3.5
                  text-cyan-300
                  hover:bg-cyan-400/10
                  transition"
              >
                Explore
                <ArrowDownToLine size={17} />
              </Button>
            </div>

            {/* Trust Note */}
            <div className="mt-7 text-sm text-gray-400">
              No sign-up required · Wallet-based authentication
            </div>

            {/* Stats */}
            <div
              className="
                mt-16
                grid grid-cols-1 sm:grid-cols-3 gap-6
                pt-12
                border-t border-white/10"
            >
              {[
                { value: "99.9%", label: "Accuracy Rate" },
                { value: "50M+", label: "Verifications / Month" },
                { value: "<100ms", label: "Response Time" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="
                    rounded-xl
                    bg-white/5
                    backdrop-blur-md
                    border border-white/10
                    py-6"
                >
                  <div className="text-3xl font-bold text-cyan-300 mb-1">
                    {item.value}
                  </div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProblemStatement />
        <SolutionOverview />
        <HowItWorks />
        <WhyAIBlockchain />
        <Highlights />
        <Footer />
      </main>
    </>
  );
}
