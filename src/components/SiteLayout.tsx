import { Link } from "@tanstack/react-router";

const linkStyle: React.CSSProperties = {
  color: "#f5f5f5",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  padding: "6px 0",
  transition: "color 0.2s",
};

const socialLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  color: "#f5f5f5",
  textDecoration: "none",
  fontSize: 16,
  transition: "color 0.2s",
};

export function SiteHeader() {
  return (
    <header style={{
      background: "#0f0f0f",
      borderBottom: "1px solid #222",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="/cynex-logo.png" alt="CYNEX Production" style={{ height: 40 }} />
      </Link>
      <nav style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/video-production-company" style={linkStyle}>Film & Video</Link>
        <Link to="/animation-videos" style={linkStyle}>Animation</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        <Link to="/blog" style={{ ...linkStyle, color: "#e50914" }}>Blog</Link>
        <Link to="/enquiry" style={{
          ...linkStyle,
          background: "#e50914",
          color: "#fff",
          padding: "8px 18px",
          borderRadius: 4,
          fontWeight: 600,
        }}>Enquire Now</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer style={{
      background: "#0a0a0a",
      borderTop: "1px solid #222",
      padding: "40px 24px 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24 }}>
          <a href="https://www.instagram.com/cynex.production" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
          <a href="https://www.youtube.com/@Cynex_Production" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h3 style={{ color: "#f5f5f5", margin: "0 0 4px", fontSize: 18 }}>Let's Talk</h3>
          <Link to="/contact" style={{
            display: "inline-block",
            color: "#e50914",
            border: "1px solid #e50914",
            padding: "8px 20px",
            borderRadius: 4,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
          }}>Post a Query</Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 24, fontSize: 13, color: "#aaa" }}>
          <div>
            <strong style={{ color: "#f5f5f5", display: "block", marginBottom: 4 }}>Rajkot & Ahmedabad</strong>
            Mahalakshmi Layout, Indiranagar
          </div>
          <div>
            <strong style={{ color: "#f5f5f5", display: "block", marginBottom: 4 }}>Hyderabad</strong>
            Banjara Hills
          </div>
          <div>
            <strong style={{ color: "#f5f5f5", display: "block", marginBottom: 4 }}>For Business</strong>
            <a href="mailto:sales@cynexproduction.in" style={{ color: "#aaa", textDecoration: "none" }}>sales@cynexproduction.in</a>
          </div>
          <div>
            <strong style={{ color: "#f5f5f5", display: "block", marginBottom: 4 }}>For Careers</strong>
            <a href="mailto:hr@cynexproduction.in" style={{ color: "#aaa", textDecoration: "none" }}>hr@cynexproduction.in</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #222", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 13, color: "#666" }}>
          <span>2026 © <Link to="/" style={{ color: "#f5f5f5", textDecoration: "none" }}>CYNEX Production</Link>, All rights reserved. Created by <a href="https://bhumitnasit.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#888", textDecoration: "none" }}>BHUMIT NASIT</a></span>
          <div style={{ display: "flex", gap: 16 }}>
            <Link to="/blog" style={{ color: "#888", textDecoration: "none" }}>Blog</Link>
            <Link to="/terms" style={{ color: "#888", textDecoration: "none" }}>Terms</Link>
            <Link to="/privacy" style={{ color: "#888", textDecoration: "none" }}>Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
