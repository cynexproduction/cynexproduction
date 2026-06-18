import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/brand-video-production-services")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Brand Films Production — CYNEX Production' },
      { name: "description", content: 'Elevate your brand story with cinematic precision and flair. Professional brand film production services.' },
    ],
    links: [{ rel: "canonical", href: '/brand-video-production-services' }],
  }),
});

const features = [
  { title: "Brand Story Films", desc: "Cinematic narratives that communicate your brand's mission, vision, and unique value proposition." },
  { title: "Product Launch Films", desc: "High-energy launch videos that create anticipation and drive demand for new products." },
  { title: "Culture & People Films", desc: "Authentic behind-the-scenes looks at your team, workspace, and company culture." },
  { title: "Customer Journey Films", desc: "Story-driven films that follow your customer's journey and showcase real impact." },
  { title: "Brand Documentaries", desc: "In-depth documentary-style films exploring your brand's origin, evolution, and purpose." },
  { title: "Social Impact Films", desc: "Purpose-driven content that highlights your brand's contribution to society and the environment." },
];

const process = [
  { step: "01", title: "Brand Discovery", desc: "We immerse ourselves in your brand — understanding your story, audience, and aspirations." },
  { step: "02", title: "Concept Development", desc: "Our creative team develops a film concept that captures your brand essence." },
  { step: "03", title: "Production", desc: "Cinematic shoots with premium equipment, expert lighting, and meticulous direction." },
  { step: "04", title: "Post Production", desc: "Professional editing, color grading, music scoring, and sound design for a polished finish." },
];

const faqs = [
  { q: "What makes a brand film different from a corporate film?", a: "Brand films focus on emotional connection and storytelling, while corporate films are more informational. Brand films are about who you are; corporate films are about what you do." },
  { q: "How long should a brand film be?", a: "Ideal length is 2-4 minutes for primary use, with 30-60 second cuts for social media and advertising." },
  { q: "Do you help with brand strategy?", a: "Yes, our process includes brand discovery and strategy sessions to ensure the film aligns with your brand identity and goals." },
  { q: "Can we use the film across multiple platforms?", a: "Absolutely. We deliver versions optimized for your website, social media, presentations, and paid advertising." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Brand</span> Films
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Elevate your brand story with cinematic precision and flair. We craft brand films 
            that connect emotionally and drive meaningful engagement.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Start Your Brand Film
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Cinematic Brand Storytelling</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            Your brand is more than a logo — it's a story waiting to be told. At CYNEX Production, 
            we create brand films that capture the heart of who you are. Every frame is crafted 
            to evoke emotion, build connection, and leave a lasting impression on your audience.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">Brand Film Types</h2>
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

      <VideoSection page="/brand-video-production-services" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Tell Your Story</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Make Your Brand Film</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Your brand has a story. Let's tell it together.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Get in Touch
        </Link>
      </Section>

      <Section className="bg-white">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-8">Related Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Corporate Films", to: "/corporate-films" },
            { name: "Ad Films", to: "/ad-films-maker" },
            { name: "Documentary Films", to: "/documentary-film-maker" },
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
