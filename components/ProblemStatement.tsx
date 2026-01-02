const ProblemStatement = () => {
  return (
    <section className="w-full py-24 px-6 md:px-16 text-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Label */}
        <p className="text-sky-400 uppercase tracking-widest text-sm mb-3">
          Problem
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          The Trust Problem in Web3
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-14 max-w-3xl mx-auto">
          In Web3 ecosystems, wallet addresses act as identities, but there is
          no reliable mechanism to evaluate trust or credibility. Existing trust
          models are centralized, opaque, and fail to reflect real behavioral
          patterns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Card 1 */}
          <div className="group p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur transition hover:border-sky-400/40 hover:bg-white/10">
            <h3 className="text-xl font-semibold mb-2">
              Lack of Trust Signals
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Wallets provide no built-in indicators of trust, making it
              difficult to assess credibility across decentralized applications.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur transition hover:border-sky-400/40 hover:bg-white/10">
            <h3 className="text-xl font-semibold mb-2">
              Centralized Alternatives
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Traditional trust systems depend on centralized authorities,
              resulting in bias, opacity, and single points of failure.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur transition hover:border-sky-400/40 hover:bg-white/10">
            <h3 className="text-xl font-semibold mb-2">
              Risk for Web3 Platforms
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Without reliable trust evaluation, DeFi platforms, DAOs, and Web3
              services face increased risk of misuse and low-quality
              participation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
