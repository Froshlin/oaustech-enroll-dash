import type { LucideIcon } from "lucide-react";
import { BookOpen, FileCheck2, HeartPulse, Scale, User, Wallet } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import IconTile from "@/components/landing/IconTile";
import { REQUIRED_DOCUMENTS, type DocumentType } from "@/types/documents";

const categoryMeta: Record<DocumentType["category"], { label: string; icon: LucideIcon }> = {
  admission: { label: "Admission", icon: FileCheck2 },
  academic: { label: "Academic records", icon: BookOpen },
  financial: { label: "Financial", icon: Wallet },
  personal: { label: "Personal identification", icon: User },
  medical: { label: "Medical", icon: HeartPulse },
  legal: { label: "Legal declarations", icon: Scale },
};

const categoryOrder: DocumentType["category"][] = [
  "admission",
  "academic",
  "financial",
  "personal",
  "medical",
  "legal",
];

const groupedDocuments = categoryOrder.map((category) => ({
  category,
  documents: REQUIRED_DOCUMENTS.filter((doc) => doc.category === category),
}));

const RequiredDocuments = () => {
  return (
    <section id="documents" className="bg-white py-20 dark:bg-slate-950 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Required documents"
          title={`All ${REQUIRED_DOCUMENTS.length} documents, grouped by category`}
          description="Every document students need for registration is tracked individually on their dashboard, organized here for clarity."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groupedDocuments.map(({ category, documents }) => {
            const meta = categoryMeta[category];
            return (
              <div
                key={category}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <IconTile icon={meta.icon} tone="slate" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{meta.label}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {documents.length} document{documents.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-col gap-3">
                  {documents.map((doc) => (
                    <li key={doc.id} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                      {doc.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RequiredDocuments;
