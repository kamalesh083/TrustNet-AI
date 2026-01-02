const WhyAIBlockchain = () => {
  return (
    <section className="w-full py-24 px-6 md:px-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <p className="text-sky-400 uppercase tracking-widest text-sm mb-4">
          Technology Choice
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          Why AI and Blockchain?
        </h2>

        {/* Two-column comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* AI Column */}
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-6">🤖</div>
            <h3 className="text-2xl font-semibold mb-4">
              Why Artificial Intelligence
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Trust is a dynamic concept that depends on behavior over time.
              Artificial intelligence enables the system to analyze complex,
              non-linear patterns that cannot be captured through static rules.
            </p>

            <ul className="space-y-3 text-gray-300">
              <li>• Learns from behavioral data</li>
              <li>• Adapts to changing usage patterns</li>
              <li>• Produces explainable trust scores</li>
              <li>• Reduces human bias in evaluation</li>
            </ul>
          </div>

          {/* Blockchain Column */}
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <div className="text-4xl mb-6">⛓️</div>
            <h3 className="text-2xl font-semibold mb-4">Why Blockchain</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Trust scores must be verifiable and tamper-proof to be meaningful
              in decentralized systems. Blockchain provides an immutable and
              transparent layer for verification without centralized control.
            </p>

            <ul className="space-y-3 text-gray-300">
              <li>• Immutable record of trust proofs</li>
              <li>• Publicly verifiable outcomes</li>
              <li>• Decentralized trust enforcement</li>
              <li>• Audit-friendly and transparent</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAIBlockchain;
