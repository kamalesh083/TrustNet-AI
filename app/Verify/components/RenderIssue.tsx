import { FileWarning } from "lucide-react";

const RenderIssue = () => {
  return (
    <div
      className="
    w-full
    max-w-3xl
    flex items-start gap-3
    bg-blue-500/10
    border border-blue-500/25
    text-blue-300
    px-4 py-3
    rounded-lg
    text-sm
    mb-6
  "
    >
      <FileWarning className="w-5 h-5 shrink-0 mt-0.5 text-blue-400" />

      <div className="leading-relaxed">
        <p className="font-medium text-blue-200">
          First verification may take longer
        </p>
        <p className="text-blue-300/80">
          The initial request can take up to{" "}
          <span className="font-semibold">60 seconds</span> while the backend
          warms up. Future verifications will be much faster.
        </p>
      </div>
    </div>
  );
};

export default RenderIssue;
