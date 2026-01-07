"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { ShieldCheck, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAccount } from "wagmi";

import RenderIssue from "./RenderIssue";

const steps = [
  "Fetching on-chain activity",
  "Engineering wallet features",
  "Running AI trust model",
];

export default function VerifyClient() {
  const { address, chainId } = useAccount();
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startVerification = async () => {
    if (started) return;

    setStarted(true);
    setLoading(true);
    setError(null);

    try {
      /* STEP 1 — fetch + preprocess */
      setCurrentStep(0);
      const res = await axios.post("/api/service", {
        address: address,
        chainId: chainId,
      });

      /* STEP 2 — backend ML call */

      setCurrentStep(1);

      console.log(res.data);

      /* STEP 3 — inference complete */
      setCurrentStep(2);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { trust_score, confidence_score, reasons } = res.data;

      setScore(trust_score);
      setConfidence(confidence_score);
      setReasons(reasons);
    } catch (err) {
      console.error(err);
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex
      flex-col
      items-center
      px-4 w-full"
    >
      <div className="w-full max-w-xl min-h-18 mb-4">
        {loading && <RenderIssue />}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
        relative w-full max-w-xl
        rounded-3xl bg-white/5 backdrop-blur-xl
        border border-white/10 p-8 sm:p-10
      "
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-7 h-7 text-cyan-400" />
          <h1 className="text-xl font-semibold">Trust Verification</h1>
        </div>

        {/* Start */}
        {!started && (
          <button
            onClick={startVerification}
            className="
            w-full py-3 rounded-xl
            bg-cyan-500/20 text-cyan-400
            border border-cyan-500/30
          "
          >
            Start Verification
          </button>
        )}

        {/* Loading */}
        <AnimatePresence>
          {started && loading && (
            <motion.div className="space-y-5">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-400"
                  animate={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-3 text-sm">
                  {i < currentStep ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : i === currentStep ? (
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20" />
                  )}
                  <span
                    className={
                      i <= currentStep ? "text-zinc-200" : "text-zinc-500"
                    }
                  >
                    {step}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-center gap-2 text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Result */}
        <AnimatePresence>
          {score !== null && (
            <motion.div className="mt-10 text-center">
              <p className="text-sm text-zinc-400">AI Trust Score</p>

              <div className="flex justify-center items-end gap-2 mt-2">
                <span className="text-6xl font-bold text-cyan-400">
                  <CountUp end={score} duration={1.5} />
                </span>
                <span className="text-zinc-400 mb-2">/100</span>
              </div>

              <p className="mt-2 text-sm text-zinc-400">
                Confidence: {confidence}%
              </p>

              <div className="mt-8 space-y-3 text-left">
                {reasons.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl p-4 bg-white/5 border border-white/10 text-sm"
                  >
                    {r}
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => router.push("/Dashboard")}
                className="
                mt-8 w-full py-3 rounded-xl
                bg-emerald-500/20 text-emerald-400
                border border-emerald-500/30 cursor-pointer
              "
              >
                Go to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
