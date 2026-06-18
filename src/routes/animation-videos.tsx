import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/animation-videos")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Animation Video Production — CYNEX Production' },
      { name: "description", content: 'Professional 2D and 3D animation videos for brands, explainers, and marketing that captivate and communicate.' },
    ],
    links: [{ rel: "canonical", href: '/animation-videos' }],
  }),
});

const styles = [
  { title: "2D Animation", desc: "Classic hand-crafted animation with vibrant characters and stories that feel personal and memorable." },
  { title: "Motion Graphics", desc: "Dynamic text, shapes, and data visualization for explainer videos, presentations, and brand content." },
  { title: "Whiteboard Animation", desc: "Engaging hand-drawn style illustrations that simplify complex ideas and keep viewers hooked." },
  { title: "3D Animation", desc: "Immersive three-dimensional visuals for product demos, architectural walkthroughs, and brand films." },
  { title: "Character Animation", desc: "Custom character design and animation that brings personalities to life on screen." },
  { title: "Kinetic Typography", desc: "Moving text and typography that emphasizes your message with rhythm and visual impact." },
];

const process = [
  { step: "01", title: "Script & Concept", desc: "We develop a compelling narrative and visual concept aligned with your brand voice." },
  { step: "02", title: "Storyboarding", desc: "Every scene is sketched and approved before animation begins, ensuring perfect alignment." },
  { step: "03", title: "Design & Animation", desc: "Our animators bring the storyboard to life with fluid motion and stunning visuals." },
  { step: "04", title: "Voiceover & Sound", desc: "Professional voice artists and sound designers add the final layer of polish." },
];

const faqs = [
  { q: "What types of animation do you offer?", a: "We specialize in 2D animation, motion graphics, whiteboard animation, 3D animation, character animation, and kinetic typography." },
  { q: "How long does an animated video take?", a: "A typical 60-90 second explainer takes 3-5 weeks from script to final delivery, depending on complexity." },
  { q: "Do you provide scriptwriting?", a: "Yes, our team includes experienced scriptwriters who craft compelling narratives tailored to your audience." },
  { q: "Can you match our brand style?", a: "Absolutely. We work closely with your brand guidelines to ensure the animation feels like a natural extension of your identity." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Animation</span> Videos
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            From 2D explainers to stunning 3D visuals — we bring ideas to life with animation 
            that captivates audiences and communicates your message with clarity and creativity.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Start Your Animation
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Animation That Connects</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            Animation breaks the boundaries of live-action. It lets you explain the impossible, 
            visualize the abstract, and tell stories that stick. At CYNEX Production, our animation 
            studio combines artistic talent with technical precision to deliver videos that educate, 
            entertain, and inspire action.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">Animation Styles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((s, i) => (
            <div key={i} className="text-center p-6">
              <h3 className="text-lg font-semibold text-[#4d4d4d] mb-2">{s.title}</h3>
              <p className="text-sm text-[#4d4d4d] leading-[26px]">{s.desc}</p>
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

      <VideoSection page="/animation-videos" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Bring Your Story to Life</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Animate Your Ideas</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Whether it's a 2D explainer or a 3D product demo — we'll make it move.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Get Started
        </Link>
      </Section>

      <Section className="bg-white">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-8">Related Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Motion Graphics", to: "/motion-graphics" },
            { name: "Explainer Videos", to: "/explainer-video-production" },
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
