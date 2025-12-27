const ProblemStatement = () => {
  return (
    <section className="w-full py-20 px-6 md:px-16  bg-black text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          The Trust Problem in Web3
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          In Web3 ecosystems, wallet addresses act as identities, but there is
          no reliable mechanism to evaluate trust or credibility. Existing trust
          models are centralized, opaque, and fail to reflect actual behavioral
          patterns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">
              Lack of Trust Signals
            </h3>
            <p className="text-gray-400">
              Wallets provide no built-in indicators of trust, making it hard to
              assess credibility across decentralized applications.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">
              Centralized Alternatives
            </h3>
            <p className="text-gray-400">
              Traditional trust systems rely on centralized entities, leading to
              bias, opacity, and single points of failure.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">
              Risk for Web3 Platforms
            </h3>
            <p className="text-gray-400">
              Without reliable trust evaluation, DeFi platforms, DAOs, and Web3
              services face higher risks of misuse and low-quality
              participation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
