import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/about")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'About CYNEX Production — Our Story & Team' },
      { name: "description", content: 'Meet the team behind CYNEX Production: storytellers, filmmakers and creatives crafting brand films across India from Rajkot & Ahmedabad.' },
    ],
    links: [{ rel: "canonical", href: '/about' }],
  }),
});

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            About <span className="text-primary">CYNEX</span> Production
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            We are a creative production house based in Rajkot & Ahmedabad, 
            dedicated to crafting compelling visual stories that drive real results. 
            From ad films and brand documentaries to animation and social content — 
            we bring ideas to life with craft, speed, and soul.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Work With Us
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Our Story</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px] mb-4">
            Founded with a vision to bridge the gap between creative excellence and business results, 
            CYNEX Production has grown into one of Gujarat's most trusted production houses. 
            Our team of strategists, filmmakers, editors, and designers work as one tight unit 
            to produce content that cuts through the noise and connects with audiences.
          </p>
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            Armed with world-class infrastructure, AI-powered tools, and a studio that feels 
            like a playground for creators — we deliver videos that don't just look good. 
            They perform.
          </p>
        </div>
      </Section>

      <Section className="bg-black">
        <h2 className="text-[34px] leading-[45px] font-semibold text-white text-center mb-4">By the Numbers</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {[
            { num: "500+", label: "Projects Delivered" },
            { num: "50+", label: "Happy Clients" },
            { num: "3+", label: "Years of Excellence" },
            { num: "2", label: "Studio Locations" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-primary text-5xl md:text-6xl font-light mb-2">{s.num}</div>
              <div className="text-[#999] text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Our Mission & Values</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            Every project we take on is driven by a set of core principles that guide how we create, collaborate, and deliver.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Creative Excellence", desc: "We push creative boundaries to produce work that stands out and resonates deeply with audiences." },
            { title: "Client Partnership", desc: "We work as an extension of your team — transparent, collaborative, and committed to your vision." },
            { title: "Results-Driven", desc: "Every frame we produce is designed to achieve measurable outcomes for your brand or business." },
          ].map((v, i) => (
            <div key={i} className="text-center p-6">
              <h3 className="text-lg font-semibold text-[#4d4d4d] mb-2">{v.title}</h3>
              <p className="text-sm text-[#4d4d4d] leading-[26px]">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-black">
        <h2 className="text-[34px] leading-[45px] font-semibold text-white text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { role: "Strategy", desc: "Creative directors and strategists who craft the vision and narrative for every project." },
            { role: "Production", desc: "Filmmakers, cinematographers, and producers who bring every story to life on set." },
            { role: "Post-Production", desc: "Editors, colorists, and sound designers who perfect every frame and every note." },
          ].map((t, i) => (
            <div key={i} className="bg-[#111] border border-[#222] rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{t.role}</h3>
              <p className="text-sm text-[#999]">{t.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <VideoSection page="/about" />

      <Section className="bg-white text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Let's Collaborate</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mt-3 mb-4">Ready to Tell Your Story?</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Whether you have a clear brief or just a spark of an idea — we'd love to hear from you.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Start a Conversation
        </Link>
      </Section>

      <Footer />
    </div>
  );
}
