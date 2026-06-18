import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VideoSection } from "@/components/VideoSection";

export const Route = createFileRoute("/studio-rental")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Studio Rental — CYNEX Production' },
      { name: "description", content: 'Professional studio rental in Rajkot and Ahmedabad. Fully equipped production studio for rent.' },
    ],
    links: [{ rel: "canonical", href: '/studio-rental' }],
  }),
});

const features = [
  { title: "Fully Equipped Studio", desc: "Professional lighting, soundproofing, green screen, and cinema-grade backdrops ready for your production." },
  { title: "Podcast Setup", desc: "Multi-camera podcast studio with professional audio interfaces, microphones, and live streaming capability." },
  { title: "Photography Studio", desc: "Dedicated photo shooting space with continuous and strobe lighting, backdrops, and accessories." },
  { title: "Audio Recording", desc: "Sound-proof recording booth with professional microphones, mixers, and monitoring systems." },
  { title: "Post Production Suite", desc: "Fully equipped editing bays with color-grading monitors and high-performance workstations available for rent." },
  { title: "Equipment Rental", desc: "Cameras, lenses, lighting, audio gear, and grip equipment available for on-location shoots." },
];

const amenities = [
  "Air conditioned studio space", "Green screen cyclorama", "Professional lighting kit",
  "Sound treatment panels", "Makeup & green room", "Client lounge area",
  "High-speed WiFi", "Parking available", "Kitchen & refreshments",
  "Security & CCTV", "Generator backup", "24/7 access option",
];

const faqs = [
  { q: "What are your studio rental rates?", a: "Rates vary based on the space, duration, and equipment needed. Contact us for current pricing and packages." },
  { q: "Can I visit the studio before booking?", a: "Yes, we encourage studio visits. Schedule a tour and we'll show you the space and available equipment." },
  { q: "Do you provide technical support?", a: "Yes, our in-house technician can assist with setup, troubleshooting, and equipment operation during your rental." },
  { q: "What's the minimum rental duration?", a: "Our minimum rental is 3 hours. Half-day and full-day packages are available at discounted rates." },
  { q: "Can I bring my own crew?", a: "Absolutely. You're welcome to bring your own crew. We also offer crew booking services if needed." },
];

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-primary">Studio</span> Rental
          </h1>
          <p className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto">
            Fully equipped production studio available for rent in Rajkot & Ahmedabad. 
            Perfect for shoots, podcasts, and creative productions of all sizes.
          </p>
          <Link to="/enquiry" className="inline-block bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
            Check Availability
          </Link>
        </div>
      </section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] mb-4">Your Creative Space Awaits</h2>
          
          <p className="text-[#7A7A7A] text-base leading-[26px]">
            At CYNEX Production, our studio is designed for creators. Whether you're shooting a 
            film, recording a podcast, capturing photos, or editing your next project — we provide 
            a professional, well-equipped space that lets you focus on what matters: your craft.
          </p>
        </div>
      </Section>

      <Section className="bg-white !pt-0">
        <h2 className="text-[34px] leading-[45px] font-semibold text-[#101010] text-center mb-12">Studio Features</h2>
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
        <h2 className="text-[34px] leading-[45px] font-semibold text-white text-center mb-12">Amenities</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {amenities.map((a, i) => (
            <span key={i} className="bg-[#111] border border-[#333] px-4 py-2 rounded-full text-sm text-white/80">
              {a}
            </span>
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

      <VideoSection page="/studio-rental" />
      <Section className="bg-black text-center">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Book Now</span>
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">Reserve Your Studio Time</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Ready to create? Check availability and book your session today.
        </p>
        <Link to="/enquiry" className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors">
          Book Now
        </Link>
      </Section>

      <Footer />
    </div>
  );
}
