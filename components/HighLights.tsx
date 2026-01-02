import Link from "next/link";
import Button from "./Button";

const Highlights = () => {
  return (
    <section className="w-full py-24 px-6 md:px-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sky-400 uppercase tracking-widest text-sm mb-3">
            Platform Highlights
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for Trust-Critical Web3 Systems
          </h2>
        </div>

        {/* Feature + Use Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Features */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Core Capabilities</h3>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <span className="text-2xl">🤖</span>
                <p className="text-gray-300 leading-relaxed">
                  Behavioral intelligence powered by machine learning to
                  generate dynamic and explainable trust scores.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <span className="text-2xl">⛓️</span>
                <p className="text-gray-300 leading-relaxed">
                  Blockchain-backed verification ensures immutability,
                  transparency, and decentralized trust enforcement.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <span className="text-2xl">🔒</span>
                <p className="text-gray-300 leading-relaxed">
                  Privacy-first design where raw behavioral data remains
                  off-chain while only cryptographic proofs are stored.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Use Cases */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Real-World Applications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-semibold mb-1">DeFi Protocols</h4>
                <p className="text-sm text-gray-400">
                  Risk-aware lending and participation scoring.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-semibold mb-1">DAO Governance</h4>
                <p className="text-sm text-gray-400">
                  Trust-weighted voting and reputation signals.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-semibold mb-1">Web3 Marketplaces</h4>
                <p className="text-sm text-gray-400">
                  Credibility-aware interactions.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-semibold mb-1">Sybil Prevention</h4>
                <p className="text-sm text-gray-400">
                  Behavior-based identity reinforcement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center border-t border-white/10 pt-12">
          <h3 className="text-2xl font-semibold mb-4">
            Discover Your Trust Score
          </h3>
          <p className="text-gray-400 mb-6">
            Connect your wallet to view AI-generated insights backed by
            blockchain verification.
          </p>
          <Link href="/Dashboard">
            <Button
              label="Get Started"
              className="px-8 py-3 rounded-full bg-sky-400 text-black font-semibold hover:bg-sky-300 transition cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
