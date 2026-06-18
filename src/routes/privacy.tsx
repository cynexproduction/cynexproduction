import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";

export const Route = createFileRoute("/privacy")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — CYNEX Production' },
      { name: "description", content: 'Privacy policy for CYNEX Production website and services.' },
    ],
    links: [{ rel: "canonical", href: '/privacy' }],
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
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-lg md:text-xl text-[#999] max-w-2xl mx-auto">
            How we collect, use, and protect your information.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-[#7A7A7A] text-base leading-[26px] space-y-6">
          <h2 className="text-2xl font-semibold text-[#101010]">1. Information We Collect</h2>
          <p>
            We collect information you provide directly, such as your name, email address, phone number, and project details when you fill out our enquiry form or contact us. We also collect basic usage data through cookies and analytics to improve our website experience.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">2. How We Use Your Information</h2>
          <p>
            We use your information to respond to your enquiries, provide our services, communicate about your projects, and improve our offerings. We do not sell or share your personal information with third parties for their marketing purposes.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">3. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">4. Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings, though this may affect certain functionality.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">5. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these external sites.
          </p>

          <h2 className="text-2xl font-semibold text-[#101010]">6. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
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
