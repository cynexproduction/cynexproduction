import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/documentary-film-maker")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Documentary Film Production — CYNEX Production' },
      { name: "description", content: 'Professional documentary film production. Documenting real stories with impactful visual storytelling.' },
    ],
    links: [{ rel: "canonical", href: '/documentary-film-maker' }],
  }),
});

const features = [
  { title: "Brand Documentaries", desc: "Deep-dive films that explore a brand's journey, vision, and impact on its community." },
  { title: "Social Impact Films", desc: "Powerful storytelling that highlights social causes, NGO work, and community development." },
  { title: "Historical Documentaries", desc: "Well-researched documentary films that preserve history and tell stories of significance." },
  { title: "Behind the Scenes", desc: "Authentic access films that take audiences behind the curtain of organizations and events." },
  { title: "Travel & Culture Films", desc: "Visually stunning documentaries that capture the essence of places, people, and cultures." },
  { title: "Biographical Films", desc: "Intimate portraits of individuals — their journeys, struggles, and achievements." },
];

const process = [
  { step: "01", title: "Research", desc: "We dive deep into the subject, conducting interviews and gathering background material." },
  { step: "02", title: "Pre-Production", desc: "We plan the shoot, scout locations, and prepare interview questions and shot lists." },
  { step: "03", title: "Principal Shooting", desc: "On-location filming with professional equipment and a focused, efficient crew." },
  { step: "04", title: "Post Production", desc: "Editing, narration, music, and color grading to shape the final documentary." },
];

const faqs = [
  { q: "How long does a documentary film take?", a: "Timelines vary significantly based on scope — from 4 weeks for a short doc to 6+ months for a feature-length film." },
  { q: "Do you handle sensitive subjects?", a: "Yes, we approach every subject with empathy, respect, and journalistic integrity." },
  { q: "What equipment do you use?", a: "We use cinema-grade cameras, professional audio gear, and lighting equipment to ensure broadcast-quality results." },
  { q: "Can you work with archival footage?", a: "Absolutely. We integrate existing footage, photographs, and archival material seamlessly into the narrative." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Documentary</span> Films
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Documenting real stories with impactful visual storytelling. We craft documentaries 
            that inform, inspire, and create lasting change.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Start Your Documentary
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Stories That Matter</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            Documentary filmmaking is about truth, perspective, and the power of real stories. 
            At CYNEX Production, we bring a journalist's curiosity and a filmmaker's eye to 
            every project. Whether it's a brand documentary, a social impact film, or a cultural 
            portrait — we tell stories that matter with authenticity and craft.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">Documentary Types</h2>
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

      <VideoSection page="/documentary-film-maker" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Share Your Story</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Let's Document Something Real</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Every story deserves to be told. Let's tell yours.
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
            { name: "Music Videos", to: "/music-video-production-services" },
            { name: "Ad Films", to: "/ad-films-maker" },
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
