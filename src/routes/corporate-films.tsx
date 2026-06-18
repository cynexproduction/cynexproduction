import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/corporate-films")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Corporate Films Production — CYNEX Production' },
      { name: "description", content: 'Professional corporate film production services. Level up your brand presence with compelling corporate videos.' },
    ],
    links: [{ rel: "canonical", href: '/corporate-films' }],
  }),
});

const features = [
  { title: "Company Profile Films", desc: "A powerful visual introduction to your company — your story, mission, and values brought to life." },
  { title: "Brand Documentaries", desc: "In-depth documentary-style films that explore your brand's journey, culture, and impact." },
  { title: "Product Demos", desc: "Clear, engaging demonstrations that showcase your product's features, benefits, and use cases." },
  { title: "Testimonial Videos", desc: "Authentic client and partner testimonials that build trust and social proof for your brand." },
  { title: "Internal Communications", desc: "Employee-facing videos for training, town halls, announcements, and team engagement." },
  { title: "CSR & Impact Films", desc: "Story-driven films that highlight your corporate social responsibility initiatives and community impact." },
];

const process = [
  { step: "01", title: "Discovery", desc: "We learn about your company, stakeholders, and objectives to shape the film's narrative." },
  { step: "02", title: "Scripting", desc: "Our writers craft a compelling script that balances brand messaging with audience engagement." },
  { step: "03", title: "Production", desc: "Professional shoots at your locations or our studio with cinema-grade equipment." },
  { step: "04", title: "Post Production", desc: "Editing, color grading, music, and sound design to deliver a polished final film." },
];

const faqs = [
  { q: "How long is a typical corporate film?", a: "Most corporate films range from 2-8 minutes, but we also create shorter cuts for social media and longer versions for presentations." },
  { q: "Do you shoot at our location?", a: "Yes, we bring our production team to your office, factory, or any location that tells your story best." },
  { q: "How many people are on your production crew?", a: "Our typical corporate film crew includes a director, cinematographer, sound engineer, and producer. Larger productions scale as needed." },
  { q: "Can you include existing footage or brand assets?", a: "Absolutely. We integrate your existing visuals, logos, and brand guidelines seamlessly into the film." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Corporate</span> Films
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Elevate your brand's presence with corporate films that showcase your vision, 
            culture, and values through compelling visual storytelling.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Get Your Corporate Film
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Stories That Build Trust</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            A great corporate film does more than inform — it inspires trust, showcases culture, 
            and sets you apart from the competition. At CYNEX Production, we craft corporate 
            videos that reflect your brand's authenticity and leave a lasting impression on 
            clients, partners, and employees alike.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">Corporate Film Types</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="text-center p-6">
              <h3 className="text-lg font-semibold text-[#4d4d4d] mb-2">{f.title}</h3>
              <p className="text-sm text-[#4d4d4d] leading-[26px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-black">
        <h2 className="text-[34px] leading-[45px] font-semibold text-white text-center mb-12">Our Process</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {process.map((p, i) => (
            <div key={i} className="text-center">
              <div className="text-primary text-5xl font-bold mb-4">{p.step}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-[#999]">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-[#ddd] rounded-lg px-6 bg-white">
                <AccordionTrigger className="text-[#333] font-medium text-left hover:text-primary text-[17px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#666] text-[17px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <VideoSection page="/corporate-films" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Tell Your Story</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Make Your Corporate Film</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          From concept to final cut — we'll help you tell your story with impact.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Get in Touch
        </Link>
      </Section>

      <Section className="bg-white">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-8">Related Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Brand Films", to: "/brand-video-production-services" },
            { name: "Documentary Films", to: "/documentary-film-maker" },
            { name: "Ad Films", to: "/ad-films-maker" },
            { name: "Explainer Videos", to: "/explainer-video-production" },
          ].map((s, i) => (
            <Link key={i} to={s.to as any} className="flex items-center justify-between bg-black border-2 border-primary px-5 py-4 hover:text-primary transition-colors group">
              <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">{s.name}</span>
              <span className="text-white text-2xl font-bold group-hover:text-primary transition-colors">&rarr;</span>
            </Link>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
