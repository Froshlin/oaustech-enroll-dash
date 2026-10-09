import { BadgeCheck, ShieldCheck, UploadCloud, UserPlus } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import IconTile from "@/components/landing/IconTile";

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    description: "Register with your JAMB and admission details to set up your student profile.",
  },
  {
    icon: UploadCloud,
    title: "Upload your documents",
    description: "Submit all 15 required documents from your dashboard, in any order, at your own pace.",
  },
  {
    icon: ShieldCheck,
    title: "Admin reviews each file",
    description: "Registration officers verify every document and leave comments if something needs fixing.",
  },
  {
    icon: BadgeCheck,
    title: "Get cleared to resume",
    description: "Once all documents are approved, your registration is marked complete for resumption.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-50/60 py-20 dark:bg-slate-900/40 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps from application to clearance"
          description="The portal replaces manual document drop-offs with a guided, trackable process for both students and admissions staff."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <IconTile icon={step.icon} />
                <span className="text-sm font-bold text-slate-300 dark:text-slate-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
