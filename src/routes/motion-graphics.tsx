import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/motion-graphics")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Motion Graphics Production — CYNEX Production' },
      { name: "description", content: 'Dynamic motion graphics and animation services. Bring your stories to life with stunning motion design.' },
    ],
    links: [{ rel: "canonical", href: '/motion-graphics' }],
  }),
});

const features = [
  { title: "Explainer Motion Graphics", desc: "Animate complex ideas with clean visuals, smooth transitions, and engaging typography." },
  { title: "Brand Identity Animation", desc: "Logo reveals, brand stingers, and animated brand guidelines that make your identity pop." },
  { title: "Data Visualization", desc: "Transform stats, charts, and data into visually compelling animated infographics." },
  { title: "Social Media Content", desc: "Short, punchy motion graphics optimized for Instagram, LinkedIn, YouTube, and TikTok." },
  { title: "Presentation Graphics", desc: "Animated slides, titles, and transitions that elevate your pitch decks and presentations." },
  { title: "Title Sequences", desc: "Cinematic opening titles and lower thirds for films, shows, and corporate videos." },
];

const process = [
  { step: "01", title: "Creative Brief", desc: "We understand your message, audience, and desired visual style to define the creative direction." },
  { step: "02", title: "Style Frames", desc: "Key visual frames are designed to establish the look, feel, and motion language of the piece." },
  { step: "03", title: "Animation", desc: "Our motion designers bring the frames to life with smooth animation and precise timing." },
  { step: "04", title: "Sound Design", desc: "Music, sound effects, and voiceover are layered to create a complete audio-visual experience." },
];

const faqs = [
  { q: "What's the difference between motion graphics and animation?", a: "Motion graphics focus on moving graphic elements, text, and shapes — ideal for explainers and data viz. Animation involves characters and storytelling." },
  { q: "How long does a motion graphic video take?", a: "A 60-second motion graphic video typically takes 2-4 weeks from concept to delivery." },
  { q: "Can you work with our existing brand assets?", a: "Yes, we use your logos, colors, fonts, and brand guidelines to create motion graphics that feel cohesive." },
  { q: "Do you provide music and sound design?", a: "Absolutely. Our team includes sound designers who compose or select the perfect audio to complement your visuals." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Motion</span> Graphics
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Bring your stories to life with dynamic motion graphics. From kinetic typography 
            to complex visual effects — we make your message move.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Get Motion Graphics
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Make Your Brand Move</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            Motion graphics combine design, animation, and sound to create content that 
            informs, entertains, and engages. At CYNEX Production, our motion designers 
            craft pixel-perfect animations that elevate your brand's visual communication 
            across every platform.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">What We Create</h2>
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

      <VideoSection page="/motion-graphics" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Start Your Project</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Create Something That Moves</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          From concept to animation — let's bring your vision to motion.
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
            { name: "Explainer Videos", to: "/explainer-video-production" },
            { name: "Ad Films", to: "/ad-films-maker" },
            { name: "Brand Films", to: "/brand-video-production-services" },
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
