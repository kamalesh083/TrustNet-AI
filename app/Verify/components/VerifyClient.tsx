"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { ShieldCheck, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAccount } from "wagmi";

import RenderIssue from "./RenderIssue";

import { verifyProfileAction } from "../actions/verify";

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
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // ✅ STRONG email validation
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  const startVerification = async () => {
    // ✅ Backend safety
    if (!email || !isValidEmail) {
      setError("Please enter a valid email before verification.");
      return;
    }

    if (started) return;

    setStarted(true);
    setLoading(true);
    setError(null);

    try {
      /* STEP 1 — fetch + preprocess */
      setCurrentStep(0);
      const res = await axios.post("/api/service", {
        address,
        chainId,
        email,
      });

      /* STEP 2 — AI explanation */
      setCurrentStep(1);
      const geminiRes = await axios.post("/api/analyze", res.data);

      /* STEP 3 — inference complete */
      setCurrentStep(2);
      const verification = await verifyProfileAction({
        email,
        address: address || "",
        trustScore: geminiRes.data.trust_score,
        reasons: geminiRes.data.explanation || [],
      });
      if (!verification.success) {
        throw new Error("Server-side verification action failed.");
      }
      console.log("Encrypted Data:", {
        email: verification.encryptedEmail,
        reasons: verification.encryptedReasons,
      });

      const { trust_score, confidence_score } = res.data;

      setScore(trust_score);
      setConfidence(confidence_score);
      setReasons(geminiRes.data.explanation || []);
    } catch (err) {
      console.error(err);
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center px-4 w-full">
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

        {/* Email + Start */}
        {!started && (
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/80 tracking-wide"
              >
                E-mail address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="
                  w-full mt-2 rounded-xl
                  bg-white/10 backdrop-blur-md
                  border border-white/20
                  px-4 py-3 text-white
                  placeholder-white/40
                  outline-none transition
                  duration-300
                  focus:border-cyan-400
                  focus:ring-2 focus:ring-cyan-400/30
                "
              />
            </div>

            <button
              onClick={startVerification}
              disabled={!email || !isValidEmail}
              className={`
                w-full py-3 rounded-xl
                border transition duration-300
                ${
                  email && isValidEmail
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30"
                    : "bg-white/5 text-white/30 border-white/10 cursor-not-allowed"
                }
              `}
            >
              Start Verification
            </button>

            {/* Inline feedback */}
            {!email && (
              <p className="text-xs text-zinc-400 text-center">
                Enter your email to start verification
              </p>
            )}

            {email && !isValidEmail && (
              <p className="text-xs text-red-400 text-center">
                Please enter a valid email (example: user@gmail.com)
              </p>
            )}
          </div>
        )}

        {/* Loading */}
        <AnimatePresence>
          {started && loading && (
            <motion.div className="space-y-5">
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
                  border border-emerald-500/30
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
