import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/video-production-company")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Video Production Company — CYNEX Production' },
      { name: "description", content: 'End-to-end video production for brands and businesses — ad films, corporate, brand and digital content crafted in Rajkot & Ahmedabad.' },
    ],
    links: [{ rel: "canonical", href: '/video-production-company' }],
  }),
});

const features = [
  { title: "Ad Films", desc: "TV commercials, digital ads, and social content that capture attention and drive action." },
  { title: "Brand Films", desc: "Cinematic brand stories that define your identity and connect with audiences emotionally." },
  { title: "Corporate Films", desc: "Professional corporate videos, internal communications, and brand documentaries." },
  { title: "Explainer Videos", desc: "Animated and live-action explainer videos that simplify complex ideas." },
  { title: "Motion Graphics", desc: "Dynamic motion design and visual effects for every screen and platform." },
  { title: "Documentary", desc: "Authentic documentary storytelling that showcases real people and real impact." },
];

const process = [
  { step: "01", title: "Discovery", desc: "We learn about your brand, audience, and goals to shape a winning creative direction." },
  { step: "02", title: "Pre-Production", desc: "Scripting, storyboarding, casting, and planning every detail before the cameras roll." },
  { step: "03", title: "Production", desc: "Professional shoots with industry-grade cameras, lighting, and direction." },
  { step: "04", title: "Post-Production", desc: "Editing, color grading, sound design, and VFX to polish every frame to perfection." },
];

const faqs = [
  { q: "What types of video production services do you offer?", a: "We offer ad films, brand films, corporate films, explainer videos, motion graphics, documentaries, music videos, and social media content." },
  { q: "How long does a typical video project take?", a: "Timelines range from 1-4 weeks depending on complexity. A simple social cut can turn around in days, while a full-scale brand film may take 3-4 weeks." },
  { q: "Do you handle both concept and execution?", a: "Yes, we provide end-to-end video production — from creative strategy and scripting to shooting, post-production, and final delivery." },
  { q: "Can you film at our location?", a: "Absolutely. We shoot across Gujarat, India, and can travel for projects that require on-location filming." },
  { q: "What equipment do you use?", a: "We use professional cinema cameras, lighting kits, gimbals, drones, and audio gear to ensure broadcast-quality output." },
  { q: "How much does video production cost?", a: "Costs vary based on project scope, duration, locations, crew, and post-production needs. Contact us for a custom quote." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Video Production</span> Company
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            From concept to final frame — we craft compelling video content that tells your story, 
            engages your audience, and delivers measurable results for your brand.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Start Your Project
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Bringing Your Vision to Life</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            At CYNEX Production, we believe every brand has a story worth telling. 
            Our team of filmmakers, editors, and creative strategists work together to produce 
            video content that cuts through the noise and connects with audiences. 
            Based in Rajkot & Ahmedabad, we serve clients across India with world-class 
            production value and a relentless focus on results.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">What We Deliver</h2>
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

      <VideoSection page="/video-production-company" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Ready to Start</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Create Together</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Whether it's a 30-second ad or a full-length brand film — we're here to make it extraordinary.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Get in Touch
        </Link>
      </Section>

      <Section className="bg-white">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-8">Related Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Ad Films", to: "/ad-films-maker" },
            { name: "Brand Films", to: "/brand-video-production-services" },
            { name: "Corporate Films", to: "/corporate-films" },
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
