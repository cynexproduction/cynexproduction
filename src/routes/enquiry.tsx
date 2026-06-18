import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Layout";
import { useState, FormEvent } from "react";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/enquiry")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Enquiry — CYNEX Production' },
      { name: "description", content: 'Send us your project enquiry — video production, ad films, corporate films and more.' },
    ],
    links: [{ rel: "canonical", href: '/enquiry' }],
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
          form_type: "enquiry",
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.service,
          message: data.message,
          payload: { company: data.company },
          page_url: "/enquiry",
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
            Let's <span className="text-primary">Connect</span>
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Tell us about your project and we'll craft a solution that fits your vision and budget.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-4">Share Your Project Details</h2>
            

            {submitted ? (
              <div className="bg-black border border-primary/50 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4 text-primary">✓</div>
                <h3 className="text-xl font-semibold text-white mb-2">Enquiry Submitted!</h3>
                <p className="text-[#999]">We'll review your project details and get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="name" type="text" placeholder="Full Name" required className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary" />
                  <input name="email" type="email" placeholder="Email Address" required className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="phone" type="tel" placeholder="Phone Number" className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary" />
                  <input name="company" type="text" placeholder="Company Name" className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary" />
                </div>
                <select name="service" className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                  <option value="">Select Service</option>
                  <option>Ad Films</option>
                  <option>Brand Films</option>
                  <option>Corporate Films</option>
                  <option>Animation</option>
                  <option>Documentary</option>
                  <option>Music Video</option>
                  <option>Social Media Content</option>
                  <option>Other</option>
                </select>
                <textarea name="message" placeholder="Tell us about your project — goals, timeline, budget, etc." rows={5} required className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-primary resize-none" />
                {error && <p className="text-primary text-sm">{error}</p>}
                <button type="submit" disabled={sending} className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {sending ? "Sending..." : "Submit Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <VideoSection page="/enquiry" />
      <section className="py-16 md:py-24 bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Prefer a Quick Call?</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Talk to Our Team</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-2">+91 98765 43210</p>
        <p className="text-[#999] max-w-xl mx-auto mb-8">Mon–Sat, 10 AM – 7 PM</p>
        <Link to="/contact" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Contact Us
        </Link>
      </section>

      <Footer />
    </div>
  );
}
