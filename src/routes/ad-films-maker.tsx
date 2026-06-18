import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/ad-films-maker")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Ad Films Production — CYNEX Production' },
      { name: "description", content: 'Professional ad film production services — TV commercials, digital ads and brand films crafted to capture attention and drive sales.' },
    ],
    links: [{ rel: "canonical", href: '/ad-films-maker' }],
  }),
});

const features = [
  { title: "TV Commercials", desc: "Cinematic television ads that captivate mass audiences and build brand recall with every airing." },
  { title: "Digital Ads", desc: "Optimized video ads for YouTube, Instagram, Facebook and LinkedIn that drive conversions." },
  { title: "Social Content", desc: "Short-form vertical videos, reels and stories tailored for social media platforms." },
  { title: "Product Launches", desc: "High-impact launch films that create buzz and communicate your product's value proposition." },
  { title: "Brand Anthems", desc: "Emotionally charged brand films that define who you are and what you stand for." },
  { title: "Retail & Ecomm Ads", desc: "Performance-driven ad films designed for ecommerce platforms and retail marketing." },
];

const process = [
  { step: "01", title: "Brief & Discovery", desc: "We dive deep into your brand, audience, and goals to shape the creative direction." },
  { step: "02", title: "Script & Storyboard", desc: "Our writers craft a compelling script and visualize every frame before production." },
  { step: "03", title: "Production", desc: "Professional shoots with top-tier cameras, lighting, and direction to capture your vision." },
  { step: "04", title: "Post Production", desc: "Editing, color grading, sound design, and VFX to polish every second of your ad." },
];

const faqs = [
  { q: "How long does it take to produce an ad film?", a: "Typical timelines range from 2-4 weeks depending on complexity, from concept to final delivery." },
  { q: "What types of ad films do you produce?", a: "We produce TV commercials, digital video ads, social media content, brand anthems, product launch films, and retail ads." },
  { q: "Do you handle both concept and production?", a: "Yes, we offer end-to-end ad film production — from creative strategy and scripting to shooting and post-production." },
  { q: "Can you work with our existing creative agency?", a: "Absolutely. We frequently collaborate with agencies to handle the production leg of their campaigns." },
  { q: "What's the cost of producing an ad film?", a: "Costs vary based on concept, duration, locations, talent, and post-production requirements. Contact us for a custom quote." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Ad Films</span> That Sell
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            From TV commercials to digital ads — we craft compelling advertisements that capture attention, 
            drive engagement, and deliver measurable results for your brand.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Start Your Ad Film
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Why Ad Films Matter</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            In a world of shrinking attention spans, a great ad film cuts through the noise. 
            At CYNEX Production, we combine storytelling, strategy, and cinematic craft to create 
            advertisements that don't just look good — they perform. Every frame is built to connect 
            with your audience and drive the action that matters to your business.
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

      <VideoSection page="/ad-films-maker" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Ready to Launch</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Create Your Next Ad</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          From concept to screen — let's build an ad film that makes your brand unforgettable.
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
            { name: "Corporate Films", to: "/corporate-films" },
            { name: "Explainer Videos", to: "/explainer-video-production" },
            { name: "Motion Graphics", to: "/motion-graphics" },
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
