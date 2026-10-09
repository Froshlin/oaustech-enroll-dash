import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, FileCheck2, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { REQUIRED_DOCUMENTS } from "@/types/documents";
import DecorativeCircles from "@/components/landing/DecorativeCircles";

type MockStatus = "approved" | "pending" | "rejected";

const mockRows: Array<{ id: string; status: MockStatus }> = [
  { id: "jamb-admission", status: "approved" },
  { id: "oaustech-admission", status: "approved" },
  { id: "jamb-supeb-result", status: "approved" },
  { id: "olevel-result", status: "pending" },
  { id: "clearance-form", status: "rejected" },
];

const uploadedCount = 9;
const totalCount = REQUIRED_DOCUMENTS.length;
const progressPercent = Math.round((uploadedCount / totalCount) * 100);

const statusConfig: Record<MockStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  approved: {
    label: "Approved",
    className: "bg-success/10 text-success border-success/20",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    icon: Clock,
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      <DecorativeCircles variant="hero" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
            Official OAUSTECH admissions system
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Register and submit your documents without the queues.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Upload all 15 required admission documents, track each one's review status in real time, and get
            cleared for resumption — all from one secure student dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => navigate("/student-register")} className="gap-2">
              Start registration
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/student-login")}>
              Log in
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3 dark:border-slate-800">
            <div>
              <dt className="text-2xl font-bold text-slate-900 dark:text-white">15</dt>
              <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">Documents tracked in one place</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-slate-900 dark:text-white">24/7</dt>
              <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">Upload access, no office visits</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-slate-900 dark:text-white">Real-time</dt>
              <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">Admin review status updates</dd>
            </div>
          </dl>
        </div>

        <div className="relative lg:justify-self-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-accent/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-3 h-9 w-9 rounded-full bg-accent/15"
          />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-6 -left-6 h-8 w-8 rounded-full bg-accent" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 left-6 h-4 w-4 rounded-full border border-primary/30"
          />

          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Registration progress</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Chidinma A. &middot; Computer Science</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 border border-primary/15">
                <FileCheck2 className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {uploadedCount} of {totalCount} uploaded
                </span>
                <span className="text-slate-500 dark:text-slate-400">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="mt-2 h-2" />
            </div>

            <ul className="mt-5 flex flex-col gap-2.5">
              {mockRows.map((row) => {
                const doc = REQUIRED_DOCUMENTS.find((item) => item.id === row.id);
                if (!doc) return null;
                const status = statusConfig[row.status];
                const StatusIcon = status.icon;
                return (
                  <li
                    key={row.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                      {doc.name}
                    </span>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${status.className}`}
                    >
                      <StatusIcon className="h-3 w-3" strokeWidth={1.5} />
                      {status.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
              +{totalCount - mockRows.length} more documents tracked on your dashboard
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
