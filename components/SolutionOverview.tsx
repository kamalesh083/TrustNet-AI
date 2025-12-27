const SolutionOverview = () => {
  return (
    <section className="relative flex items-center w-full py-24 px-6 md:px-16  bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <p className="text-sky-400 uppercase tracking-widest text-sm mb-4">
          The Approach
        </p>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-10">
          How TrustNet AI Solves the Problem
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-lg max-w-3xl leading-relaxed mb-16">
          TrustNet AI separates intelligence from verification. Artificial
          intelligence evaluates behavioral patterns to generate trust scores,
          while blockchain guarantees that these results remain transparent,
          immutable, and verifiable without exposing sensitive data.
        </p>

        {/* Flow-style layout */}
        <div className="space-y-10">
          <div className="flex items-start gap-6">
            <span className="text-2xl font-bold text-sky-400">01</span>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Behavioral Intelligence with AI
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Machine learning models analyze user behavior patterns and
                engagement signals instead of relying on static or subjective
                trust rules.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <span className="text-2xl font-bold text-sky-400">02</span>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Trust Score Generation
              </h3>
              <p className="text-gray-400 leading-relaxed">
                The AI system generates an explainable trust score that reflects
                credibility based on observed behavior rather than identity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <span className="text-2xl font-bold text-sky-400">03</span>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Blockchain-Based Verification
              </h3>
              <p className="text-gray-400 leading-relaxed">
                A cryptographic proof of the generated score is recorded on the
                blockchain, enabling transparent verification without exposing
                raw user data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;
