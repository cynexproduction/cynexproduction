import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Layout";
import { useState, FormEvent } from "react";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/contact")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Contact CYNEX Production — Get in Touch' },
      { name: "description", content: 'Reach CYNEX Production for video production, ad films and creative services in Rajkot, Ahmedabad and across India.' },
    ],
    links: [{ rel: "canonical", href: '/contact' }],
  }),
});

function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/public/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "contact",
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          page_url: "/contact",
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Submission failed");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Contact</span> Us
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Ready to start your next project? Send us a message and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Get in Touch</h2>
              
              <div className="space-y-5 text-sm text-[#7A7A7A]">
                <div>
                  <strong className="text-[#4d4d4d] block text-base">Rajkot & Ahmedabad</strong>
                  <span className="text-base">Main Office, Gujarat</span>
                </div>
                <div>
                  <strong className="text-[#4d4d4d] block text-base">Email</strong>
                  <a href="mailto:sales@cynexproduction.in" className="text-primary hover:underline text-base">sales@cynexproduction.in</a>
                </div>
                <div>
                  <strong className="text-[#4d4d4d] block text-base">Phone</strong>
                  <span className="text-base">+91 98765 43210</span>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold text-[#101010] mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {["FB", "IG", "LI", "YT"].map((s) => (
                    <span key={s} className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold text-[#4d4d4d]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="bg-black border border-primary/50 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4 text-primary">✓</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                  <p className="text-[#999]">Your message has been received. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary"
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us about your project"
                    rows={4}
                    required
                    className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary resize-none"
                  />
                  {error && <p className="text-primary text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <VideoSection page="/contact" />
      <section className="py-16 md:py-24 bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Prefer Email?</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Write to Us Directly</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-2">
          <a href="mailto:sales@cynexproduction.in" className="text-primary hover:underline">sales@cynexproduction.in</a>
        </p>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          We respond to all enquiries within 24 hours.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Submit an Enquiry
        </Link>
      </section>

      <Footer />
    </div>
  );
}
