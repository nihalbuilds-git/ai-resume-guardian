import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedSection } from "./AnimatedSection";

const FAQS = [
  {
    q: "Is ResumeAI really free to use?",
    a: "Yes! Our Free plan lets you create 1 resume with access to all core features including AI bullet generation, ATS scoring, and PDF export. Upgrade anytime for unlimited resumes and advanced AI tools.",
  },
  {
    q: "How does the AI write bullet points?",
    a: "Our AI analyzes your job title, industry, and experience level to generate impactful, quantified bullet points. It uses proven resume-writing frameworks like the STAR method to highlight your achievements.",
  },
  {
    q: "What is an ATS score and why does it matter?",
    a: "ATS (Applicant Tracking System) is software used by 95% of Fortune 500 companies to filter resumes. Our ATS scorer checks your resume against real ATS algorithms and gives actionable tips to improve your pass rate.",
  },
  {
    q: "Can I tailor my resume to a specific job description?",
    a: "Absolutely! Paste any job description and our AI will analyze the required skills, keywords, and qualifications — then suggest edits to align your resume perfectly with that role.",
  },
  {
    q: "What file formats can I export my resume in?",
    a: "You can export your resume as a professionally formatted PDF that's optimized for both ATS systems and human recruiters. The layout stays pixel-perfect across all devices.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is encrypted in transit and at rest. We never share your personal information with third parties. You can delete your account and all associated data at any time.",
  },
];

export function FAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Everything you need to know about ResumeAI. Can't find what you're looking for? Reach out to our support team.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-5 bg-card data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-medium text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
