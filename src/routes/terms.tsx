import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";

export const Route = createFileRoute("/terms")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Terms & Conditions — CYNEX Production' },
      { name: "description", content: 'Terms and conditions for using CYNEX Production services and website.' },
    ],
    links: [{ rel: "canonical", href: '/terms' }],
  }),
});

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <p className="text-lg md:text-xl text-[#999] max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-[#7A7A7A] text-base leading-[26px] space-y-6">
          <h2 className="text-2xl font-semibold text-[#101010]">1. Introduction</h2>
          <p>
            Welcome to CYNEX Production. By accessing our website or using our services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">2. Services</h2>
          <p>
            CYNEX Production provides video production, animation, photography, and related creative services. The scope, deliverables, timelines, and costs for each project will be outlined in a separate agreement or proposal.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">3. Intellectual Property</h2>
          <p>
            All content produced by CYNEX Production remains our intellectual property until full payment is received. Upon full payment, ownership of the final deliverables is transferred to the client. CYNEX Production retains the right to use project work in our portfolio and marketing materials unless otherwise agreed in writing.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">4. Payment Terms</h2>
          <p>
            Payment terms are specified in each project proposal. A deposit is typically required before work begins, with the balance due upon delivery or as otherwise agreed. Late payments may result in project delays or suspension of work.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">5. Revisions & Cancellations</h2>
          <p>
            Revision policies are outlined in the project agreement. Cancellations made after work has commenced may be subject to a fee covering work completed up to the point of cancellation.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">6. Limitation of Liability</h2>
          <p>
            CYNEX Production shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our total liability is limited to the amount paid by the client for the specific project giving rise to the claim.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">7. Contact</h2>
          <p>
            For questions about these terms, please contact us at{" "}
            <a href="mailto:sales@cynexproduction.in" className="text-primary hover:underline">sales@cynexproduction.in</a>.
          </p>
        </div>
      </Section>

      <Section className="bg-white text-center">
        <Link to="/" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Back to Home
        </Link>
      </Section>

      <Footer />
    </div>
  );
}
