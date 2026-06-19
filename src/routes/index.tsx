import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Section } from "@/components/Layout";
import { VideoSection } from "@/components/VideoSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Creative Agency in Rajkot & Ahmedabad, Production agencies" },
      { name: "description", content: "Discover CYNEX Production, a leading creative agency and production house in Rajkot & Ahmedabad, specializing in video production and branding." },
      { property: "og:title", content: "Creative Agency in Rajkot & Ahmedabad, Production agencies" },
      { property: "og:description", content: "Discover CYNEX Production, a leading creative agency and production house in Rajkot & Ahmedabad, specializing in video production and branding." },
    ],
  }),
});

const serviceCards = [
  { img: "https://www.avatarstudios.in/wp-content/uploads/2023/02/3.webp", title: "Ad Films", desc: "Crafting compelling ads that capture attention and drive sales", to: "/ad-films-maker" },
  { img: "https://www.avatarstudios.in/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-21-at-1.32.48-PM.jpeg", title: "Brand Films", desc: "Elevate your brand story with cinematic precision and flair", to: "/brand-video-production-services" },
  { img: "https://www.avatarstudios.in/wp-content/uploads/2024/03/Screenshot-2024-03-22-123327.png", title: "Explainer Videos", desc: "Simplify complex ideas with engaging, informative videos", to: "/explainer-video-production" },
  { img: "https://www.avatarstudios.in/wp-content/uploads/2024/03/Screenshot-2024-03-22-120830.png", title: "Corporate Videos", desc: "Level up your brand's presence with corporate films", to: "/corporate-films" },
  { img: "https://www.avatarstudios.in/wp-content/uploads/2024/01/event-photography.webp", title: "Documentaries", desc: "Documenting real stories with impactful visual storytelling", to: "/documentary-film-maker" },
  { img: "https://www.avatarstudios.in/wp-content/uploads/2023/02/1.webp", title: "Music Videos", desc: "Creative music videos that amplify your sound", to: "/music-video-production-services" },
];

const services = [
  { title: "Ad Films", desc: "Crafting compelling ads that capture attention and drive sales", to: "/ad-films-maker" },
  { title: "Brand Films", desc: "Elevate your brand story with cinematic precision and flair", to: "/brand-video-production-services" },
  { title: "Explainer Videos", desc: "Simplify complex ideas with engaging, informative videos", to: "/explainer-video-production" },
  { title: "2D Animation Videos", desc: "Bring your stories to life with stunning animation", to: "/animation-videos" },
  { title: "Corporate Videos", desc: "Level up your brand's presence with corporate films", to: "/corporate-films" },
  { title: "Documentaries", desc: "Documenting real stories with impactful visual storytelling", to: "/documentary-film-maker" },
  { title: "Music Videos", desc: "Creative music videos that amplify your sound", to: "/music-video-production-services" },
  { title: "Motion Graphics", desc: "Bring your stories to us and we will set it in motion", to: "/motion-graphics" },
];

const perks = [
  { icon: "👥", title: "People", desc: "Strategists, producers, designers, creators, marketers and everyone you can think of, are in-house." },
  { icon: "🤖", title: "Technology", desc: "From Adobe to AI, we have the eye for every emerging technology that will perform and deliver results." },
  { icon: "💡", title: "Creativity", desc: "We don't think outside the box. We snoop it inside out." },
  { icon: "🎬", title: "Infrastructure", desc: "Being a 360° agency means you walk into one door — and walk out with strategy, scripts, shoots, edits, and final cuts. No gaps." },
  { icon: "⚡", title: "Turnaround", desc: "Get your outputs in a flash! With our super-speedy service." },
];

const faqs = [
  { q: "What services does CYNEX Production offer?", a: "As a leading creative agency, CYNEX Production specializes in video production, including corporate videos, commercials, branded content, and event videography across Rajkot and Ahmedabad." },
  { q: "How do we start a project with CYNEX Production?", a: "Contact us via our website or phone. We'll arrange a consultation to explore your needs and creative aspirations." },
  { q: "Does CYNEX Production provide services outside of Gujarat?", a: "Although we are based in Gujarat, our reach extends across India. We utilize advanced communication and technology tools to efficiently manage and execute remote projects." },
  { q: "How does CYNEX Production handle revisions?", a: "Our process includes milestones for client review and revisions. We outline the revisions included and detail any additional costs for further changes." },
  { q: "How involved can I be in the production process?", a: "Client involvement is encouraged at all stages of the video production process. We ensure your vision is realized and valued throughout." },
];

const testimonials = [
  { quote: "I needed a documentary video for my NGO and wanted to reach a large target audience. CYNEX Production handled the project in a very professional way and I am quite happy with the end result.", author: "Anil Shetty", role: "Founder, Nava Bengaluru Foundation" },
  { quote: "CYNEX Production were quite outstanding during the complete approach. They completely understood our needs & specifications. The best part is that they created videos at a very cost-effective price while maintaining the quality.", author: "Vinay", role: "Saravi Technologies" },
  { quote: "We have had good experience working with CYNEX Production for our documentary video. They are backed with a very good team that helps out in delivering best in class results.", author: "Dinakaar Naidu GN", role: "CFO, Hare Krishna Charities" },
  { quote: "CYNEX Production delivered animated explainer videos about our company in a very short period. They understood all my requirements and delivered the project accordingly.", author: "Anand Murali", role: "Visit Plan" },
];

const serviceLinks = [
  { name: "Video Production Services", to: "/video-production-company" },
  { name: "Animation Video Production", to: "/animation-videos" },
  { name: "Podcast Studios", to: "/studio-rental" },
  { name: "Ad Films Services", to: "/ad-films-maker" },
  { name: "Brand Films Production", to: "/brand-video-production-services" },
  { name: "Motion Graphics Videos", to: "/motion-graphics" },
  { name: "Studio Rental", to: "/studio-rental" },
  { name: "Corporate Films", to: "/corporate-films" },
];

function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setIndex((index + 1) % words.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, words]);

  return <span>{words[index].substring(0, charIndex)}<span className="animate-pulse ml-0.5">|</span></span>;
}

function SectionTitle({ label, title, subtitle, light }: { label?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      {label && <span className="text-primary text-sm font-semibold uppercase tracking-wider">{label}</span>}
      <h2 className={`text-[34px] leading-[45px] font-semibold mt-2 ${light ? "text-white" : "text-[#101010]"}`}>{title}</h2>
      {subtitle && <p className="text-[#7A7A7A] mt-3 max-w-2xl mx-auto text-base leading-[26px]">{subtitle}</p>}
    </div>
  );
}

function Page() {
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins,sans-serif]">
      <Header />

      {/* 1. Hero */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Creative Agency in{" "}
            <span className="text-primary">Rajkot & Ahmedabad</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#999] mb-8 max-w-2xl mx-auto"
          >
            We craft compelling visual stories that drive results — from ad films and brand
            documentaries to animation and social content.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/enquiry"
              className="bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors"
            >
              Let's Connect
            </Link>
            <Link
              to="/video-production-company"
              className="border border-white/30 text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Service Image Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid md:grid-cols-2 lg:grid-cols-3"
      >
        {serviceCards.map((s, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
          >
            <Link
              to={s.to as any}
              className="group relative min-h-[300px] flex items-center justify-center overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${s.img})` }}
              />
              <div className="absolute inset-0 bg-black/95 group-hover:bg-transparent group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-primary/90 transition-all duration-500" />
              <div className="relative z-10 text-center p-6">
                <h3 className="text-2xl md:text-[24px] font-medium text-white leading-[35px]">{s.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* 4. Fancy Text Section - white bg */}
      <Section className="bg-white">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-[34px] leading-[45px] font-semibold text-black">
            We make{" "}
            <span className="text-primary">
              <TypingText words={["Ad Films", "Brand Films", "Explainer Videos", "Animation", "Corporate Films", "Documentaries"]} />
            </span>{" "}
            for your brand
          </h2>
          <div className="mt-[-20px] mb-8">
          </div>
        </div>
      </Section>

      {/* 5. Our Expert Capabilities - white bg */}
      <Section className="bg-white !pt-0">
        <SectionTitle title="Our Expert Capabilities" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
            >
              <Link
                to={s.to as any}
                className="group text-center block"
              >
                <h3 className="text-lg font-semibold text-[#4d4d4d] group-hover:text-primary transition-colors mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#4d4d4d] leading-[26px]">{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 7. Perks to Consider - black bg */}
      <Section className="bg-black">
        <div className="text-center mb-12">
          <h2 className="text-[34px] leading-[45px] font-semibold text-white">Perks to consider</h2>
          <div className="flex justify-center mt-[-20px] mb-5">
            <div className="w-[50px] h-[2px] bg-[#e9204f]" />
          </div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {perks.map((p, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
              className="text-center"
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-[#999]">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 8. Parallax Section with red-bordered cards */}
      <section
        className="py-24 bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: "url(https://www.avatarstudios.in/wp-content/uploads/2025/10/parallax-new-scaled.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-4 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Start Your Journey</span>
          <h2 className="text-[34px] leading-[45px] font-semibold text-white mt-3 mb-4">
            Let's Build Something<br />That Lasts
          </h2>
          <p className="text-[#ccc] max-w-xl mx-auto mb-4 text-base leading-[26px]">
            Whether it's a single film or a long-term content mandate, we work with clarity, creativity, and commitment.
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto"
          >
            {[
              { title: "Creative Strategy", desc: "Brand story development, creative direction, audience analysis & campaign planning — all built to connect." },
              { title: "Video Production", desc: "Ad films, corporate films, documentaries, music videos, and social content shot with cinematic quality." },
              { title: "Post Production", desc: "Editing, color grading, sound design, VFX, motion graphics & animation — polished to perfection." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                className="border-2 border-primary p-[5%] pb-[12%] group hover:shadow-[0_0_31px_5px_rgba(0,0,0,0.21)] transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-[17px] text-white group-hover:text-primary transition-colors leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. FAQ - black bg */}
      <Section className="bg-black !pt-0">
        <SectionTitle title="Some questions answered" light />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-[#333] rounded-lg px-6 bg-[#111]">
                <AccordionTrigger className="text-white/80 font-medium text-left hover:text-primary text-[17px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#999] text-[17px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* 10. Services We Are Known For - white bg */}
      <Section className="bg-white">
        <SectionTitle title="Services we are known for" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {serviceLinks.map((s, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
            >
              <Link
                to={s.to as any}
                className="flex items-center justify-between bg-black border-2 border-primary px-5 py-4 hover:text-primary transition-colors group"
              >
                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">{s.name}</span>
                <span className="text-white text-2xl font-bold group-hover:text-primary transition-colors">&rarr;</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 13. Testimonials - white bg */}
      <Section className="bg-white !pt-0">
        <SectionTitle title="What our clients say" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              className="border border-[#ddd] rounded-lg p-6"
            >
              <p className="text-[#666] mb-4 italic leading-relaxed">"{t.quote}"</p>
              <div>
                <strong className="text-[#333] block">{t.author}</strong>
                <span className="text-sm text-[#999]">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <VideoSection page="/" />

      {/* 14. CTA - black bg */}
      <Section className="bg-black text-center">
        <h2 className="text-[34px] leading-[45px] font-semibold text-white mb-4">Let's Talk</h2>
        <p className="text-[#999] max-w-xl mx-auto mb-8">
          Ready to bring your vision to life? Get in touch and let's create something extraordinary.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-black text-white border-2 border-primary px-8 py-3 font-semibold hover:text-primary transition-colors"
        >
          Post a Query
        </Link>
      </Section>

      <Footer />
    </div>
  );
}
