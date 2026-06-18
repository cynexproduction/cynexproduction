import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/music-video-production-services")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Music Video Production — CYNEX Production' },
      { name: "description", content: 'Creative music video production services. Amplify your sound with stunning visuals that captivate.' },
    ],
    links: [{ rel: "canonical", href: '/music-video-production-services' }],
  }),
});

const features = [
  { title: "Narrative Music Videos", desc: "Story-driven music videos that bring your song's lyrics and emotion to life through cinematic storytelling." },
  { title: "Performance Videos", desc: "High-energy live performance captures that showcase your band or artist's stage presence." },
  { title: "Lyric Videos", desc: "Creative typography and visual treatments that highlight your lyrics in an engaging format." },
  { title: "Conceptual Visuals", desc: "Abstract and artistic visual interpretations that create a unique identity for your music." },
  { title: "Behind the Scenes", desc: "Authentic documentary-style content that gives fans a glimpse into your creative process." },
  { title: "Teaser & Promo Content", desc: "Short, punchy promotional videos for album launches, singles, and tour announcements." },
];

const process = [
  { step: "01", title: "Concept Meeting", desc: "We listen to your track, discuss your vision, and develop a creative concept together." },
  { step: "02", title: "Pre-Production", desc: "Location scouting, casting, storyboarding, and scheduling every detail of the shoot." },
  { step: "03", title: "Principal Shoot", desc: "Professional filming with cinema cameras, creative lighting, and expert direction." },
  { step: "04", title: "Post Production", desc: "Editing, color grading, visual effects, and syncing to deliver a polished music video." },
];

const faqs = [
  { q: "How long does a music video take to produce?", a: "Typically 2-4 weeks from concept to delivery, depending on complexity and visual effects." },
  { q: "What if I have a limited budget?", a: "We work with you to create a concept that fits your budget while maintaining creative quality." },
  { q: "Do you provide concept development?", a: "Yes, our creative team collaborates with you to develop a concept that matches your music and artistic vision." },
  { q: "Can you work with our existing creative direction?", a: "Absolutely. We can execute your existing vision or collaborate to refine it with our production expertise." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Music</span> Videos
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Creative music videos that amplify your sound and captivate your audience. 
            From concept to final cut, we bring your music to life visually.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Start Your Music Video
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Visuals That Amplify Your Sound</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            A great music video is more than visuals set to a track — it's an extension of 
            the art. At CYNEX Production, we work closely with artists and labels to create 
            music videos that capture the energy, emotion, and identity of your music. 
            Every frame is crafted to make your sound unforgettable.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">Video Styles</h2>
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

      <VideoSection page="/music-video-production-services" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Amplify Your Sound</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Make Your Music Video</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Your music deserves visuals as powerful as the sound. Let's create them together.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Get in Touch
        </Link>
      </Section>

      <Section className="bg-white">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-8">Related Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Documentary Films", to: "/documentary-film-maker" },
            { name: "Brand Films", to: "/brand-video-production-services" },
            { name: "Ad Films", to: "/ad-films-maker" },
            { name: "Studio Rental", to: "/studio-rental" },
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
