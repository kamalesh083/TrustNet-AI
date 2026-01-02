const HowItWorks = () => {
  return (
    <section className="w-full py-24 px-6 md:px-16  text-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <p className="text-sky-400 uppercase tracking-widest text-sm mb-4">
          System Flow
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-16">
          How TrustNet AI Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          {/* Step 1 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-4">👛</div>
            <h3 className="text-xl font-semibold mb-2">Wallet Connection</h3>
            <p className="text-gray-400 leading-relaxed">
              Users authenticate using their crypto wallet, establishing a
              decentralized identity without relying on usernames or passwords.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Behavioral Analysis</h3>
            <p className="text-gray-400 leading-relaxed">
              Relevant behavioral and engagement signals are collected and
              prepared for AI-based evaluation.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Trust Scoring</h3>
            <p className="text-gray-400 leading-relaxed">
              Machine learning models generate an explainable trust score based
              on observed behavioral patterns rather than static rules.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-4">⛓️</div>
            <h3 className="text-xl font-semibold mb-2">
              On-Chain Verification
            </h3>
            <p className="text-gray-400 leading-relaxed">
              A cryptographic proof of the trust score is stored on the
              blockchain, enabling transparent and tamper-proof verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
