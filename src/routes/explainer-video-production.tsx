import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/explainer-video-production")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Explainer Video Production — CYNEX Production' },
      { name: "description", content: 'Simplify complex ideas with engaging, informative explainer videos that drive understanding and conversions.' },
    ],
    links: [{ rel: "canonical", href: '/explainer-video-production' }],
  }),
});

const features = [
  { title: "Product Explainer Videos", desc: "Showcase your product's features and benefits in a clear, engaging format that drives adoption." },
  { title: "Service Explainers", desc: "Help your audience understand complex services with simple, visual explanations." },
  { title: "SaaS & App Demos", desc: "Animated walkthroughs that demonstrate software functionality and user workflows." },
  { title: "Animated Infographics", desc: "Transform data and statistics into visually compelling animated stories." },
  { title: "Process Explainers", desc: "Break down complicated processes into easy-to-follow step-by-step visual narratives." },
  { title: "Concept Explainers", desc: "Abstract ideas made tangible through creative animation and metaphor-driven storytelling." },
];

const process = [
  { step: "01", title: "Scriptwriting", desc: "We craft a clear, concise script that simplifies your message for maximum impact." },
  { step: "02", title: "Storyboarding", desc: "Every visual element is planned and approved to ensure perfect alignment with your vision." },
  { step: "03", title: "Animation", desc: "Our animators bring the storyboard to life with smooth motion and engaging visuals." },
  { step: "04", title: "Voiceover & Sound", desc: "Professional voiceover and sound design add personality and polish to your explainer." },
];

const faqs = [
  { q: "How long should an explainer video be?", a: "60-90 seconds is the sweet spot — long enough to explain your idea, short enough to hold attention." },
  { q: "What style of explainer video do you recommend?", a: "It depends on your brand and audience. We help you choose between 2D animation, motion graphics, whiteboard, or live-action styles." },
  { q: "Do you provide voiceover services?", a: "Yes, we have a network of professional voice artists across multiple languages and styles." },
  { q: "Can you update the video later?", a: "Yes, we maintain project files and can create updated versions as your product or service evolves." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Explainer</span> Videos
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Simplify complex ideas with engaging, informative explainer videos. Perfect for 
            products, services, and concepts that need clear, compelling communication.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Create Your Explainer
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Simple. Clear. Effective.</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            Explainer videos are the most effective way to communicate complex ideas quickly. 
            At CYNEX Production, we combine smart scripts, creative visuals, and professional 
            voiceover to create explainers that educate your audience and drive conversions.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">Explainer Types</h2>
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

      <VideoSection page="/explainer-video-production" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Simplify Your Message</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Create Your Explainer</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Complex ideas deserve simple explanations. Let's make yours clear and compelling.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Get Started
        </Link>
      </Section>

      <Section className="bg-white">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-8">Related Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Animation Videos", to: "/animation-videos" },
            { name: "Motion Graphics", to: "/motion-graphics" },
            { name: "Ad Films", to: "/ad-films-maker" },
            { name: "Corporate Films", to: "/corporate-films" },
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
