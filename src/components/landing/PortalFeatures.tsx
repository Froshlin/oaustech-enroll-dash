import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Bell,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  ListFilter,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import IconTile from "@/components/landing/IconTile";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const studentFeatures: Feature[] = [
  {
    icon: UploadCloud,
    title: "Upload and replace documents anytime",
    description: "Submit a file, swap it for a corrected version, and keep working without starting over.",
  },
  {
    icon: FileCheck2,
    title: "Track approval status per document",
    description: "See exactly which of the 15 requirements are approved, pending, or rejected.",
  },
  {
    icon: Bell,
    title: "Get notified on rejections",
    description: "Admin comments explain exactly what to fix before you resubmit a document.",
  },
  {
    icon: LayoutDashboard,
    title: "One dashboard for every requirement",
    description: "No spreadsheets or email threads — your full registration status lives in one place.",
  },
];

const adminFeatures: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Review submissions as they arrive",
    description: "New uploads appear instantly, so review queues never pile up silently.",
  },
  {
    icon: BadgeCheck,
    title: "Approve or reject with comments",
    description: "Give students clear, specific feedback directly attached to each document.",
  },
  {
    icon: ListFilter,
    title: "Filter students by department and status",
    description: "Narrow the registration list down to exactly who still needs attention.",
  },
  {
    icon: ClipboardList,
    title: "Full audit trail per student",
    description: "Every version, decision, and comment is kept against the student's record.",
  },
];

const FeatureList = ({ features }: { features: Feature[] }) => (
  <ul className="mt-6 flex flex-col gap-5">
    {features.map((feature) => (
      <li key={feature.title} className="flex items-start gap-4">
        <IconTile icon={feature.icon} />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{feature.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{feature.description}</p>
        </div>
      </li>
    ))}
  </ul>
);

const PortalFeatures = () => {
  return (
    <section id="portals" className="bg-slate-50/60 py-20 dark:bg-slate-900/40 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Two portals, one system"
          title="Built for students and the admissions team alike"
          description="Each side of the portal is purpose-built for how that person actually works, while staying in sync in real time."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <IconTile icon={GraduationCap} tone="primary" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Student portal</h3>
            </div>
            <FeatureList features={studentFeatures} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <IconTile icon={ShieldCheck} tone="accent" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Admin portal</h3>
            </div>
            <FeatureList features={adminFeatures} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalFeatures;
