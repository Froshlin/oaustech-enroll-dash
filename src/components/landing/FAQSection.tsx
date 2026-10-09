import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "@/components/landing/SectionHeading";

const faqs = [
  {
    question: "How many documents do I need to upload?",
    answer:
      "All students must submit 15 required documents, covering admission, academic, financial, personal, medical, and legal categories. Your dashboard shows the full checklist and your progress against it.",
  },
  {
    question: "What happens if a document is rejected?",
    answer:
      "The reviewing officer attaches a comment explaining what's wrong. You can then upload a corrected version from the same dashboard — there's no need to start a new registration.",
  },
  {
    question: "Can I upload documents from my phone?",
    answer:
      "Yes. The portal is fully responsive, so you can register, upload files, and track approvals from a phone, tablet, or desktop browser.",
  },
  {
    question: "How do I know when a document has been reviewed?",
    answer:
      "Each document's status updates in real time on your dashboard — Pending, Approved, or Rejected — so you always know exactly where your registration stands.",
  },
  {
    question: "Who can access the admin portal?",
    answer:
      "Only authorized OAUSTECH registration staff can sign in to the admin portal, which is kept entirely separate from the student login.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="bg-white py-20 dark:bg-slate-950 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything students usually ask before starting registration."
          className="mx-auto"
        />

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-slate-200 dark:border-slate-800">
              <AccordionTrigger className="text-left text-sm font-semibold text-slate-900 hover:no-underline dark:text-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
