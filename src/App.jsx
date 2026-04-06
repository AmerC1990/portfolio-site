import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Work", "Testimonials", "Contact"];

const APPS = [
  {
    name: "Machine Monitors",
    client: "Peter Bouzek",
    description:
      "A production-line tool that uses continuous live video capture to help teams surface equipment issues instantly — sending short clips directly to decision makers in two taps.",
    tags: ["Camera & Video", "Industrial Tools", "Android"],
    playUrl:
      "https://play.google.com/store/apps/details?id=com.bouzek.machinemonitors&hl=en_US",
    icon: "🎥",
    color: "#FF6B35",
  },
  {
    name: "Lyrically",
    client: "Ejub Mrso",
    description:
      "A writing companion for songwriters, poets, and lyricists — offering rhymes, synonyms, homophones, internal rhymes, and more linguistic tools, all in one clean interface.",
    tags: ["Creative Writing", "Music", "NLP"],
    playUrl:
      "https://play.google.com/store/apps/details?id=com.cosovic.lyrically&hl=en_US",
    icon: "🎵",
    color: "#7C3AED",
  },
];

const TESTIMONIALS = [
  {
    name: "Peter Bouzek",
    role: "Founder, Machine Monitors",
    quote:
      "Working with Amer was a pleasure. I had an idea for an app that would use a continuous live recording in production lines and he was able to build it in a few months. I had several suggestions throughout the process and he was very attentive with me.",
    initial: "P",
    color: "#FF6B35",
  },
  {
    name: "Ejub Mrso",
    role: "Founder, Lyrically",
    quote:
      "Amer built Lyrically for me in about 5 months. It's a note app that songwriters and poets can use to get linguistic devices. Highly recommend working with him.",
    initial: "E",
    color: "#7C3AED",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.2rem 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled || menuOpen ? "rgba(8,8,12,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.08em", color: "#fff" }}>
          AMER<span style={{ color: "#FF6B35" }}>.</span>DEV
        </div>

        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "flex", flexDirection: "column", gap: "5px" }}>
            {menuOpen ? (
              <span style={{ color: "#fff", fontSize: "1.5rem", lineHeight: 1 }}>✕</span>
            ) : (
              <>
                <span style={{ display: "block", width: "24px", height: "2px", background: "#fff" }} />
                <span style={{ display: "block", width: "24px", height: "2px", background: "#fff" }} />
                <span style={{ display: "block", width: "24px", height: "2px", background: "#fff" }} />
              </>
            )}
          </button>
        ) : (
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.65)", fontSize: "0.78rem",
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em",
                  textTransform: "uppercase", transition: "color 0.2s", padding: 0,
                }}
                onMouseEnter={e => e.target.style.color = "#FF6B35"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}
              >{link}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile menu dropdown */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99,
          background: "rgba(8,8,12,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column",
        }}>
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)",
                cursor: "pointer", color: "rgba(255,255,255,0.8)", fontSize: "0.9rem",
                fontFamily: "'DM Mono', monospace", letterSpacing: "0.14em",
                textTransform: "uppercase", padding: "1.2rem 1.5rem", textAlign: "left",
              }}
            >{link}</button>
          ))}
        </div>
      )}
    </>
  );
}

function Hero() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: isMobile ? "6rem 1.5rem 3rem" : "0 2.5rem",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,107,53,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,107,53,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      <div style={{
        position: "absolute", top: "15%", right: isMobile ? "-20%" : "8%",
        width: isMobile ? "300px" : "520px", height: isMobile ? "300px" : "520px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div style={{ position: "relative", width: "100%" }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
          letterSpacing: "0.2em", color: "#FF6B35", textTransform: "uppercase",
          marginBottom: "1.2rem", animation: "fadeUp 0.6s ease forwards",
        }}>
          Android Developer · 7+ Years Experience
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: isMobile ? "clamp(3.5rem, 16vw, 5.5rem)" : "clamp(4rem, 10vw, 9rem)",
          lineHeight: 0.92, margin: "0 0 1.5rem",
          color: "#fff", letterSpacing: "0.02em",
          animation: "fadeUp 0.6s 0.1s ease both",
        }}>
          YOUR IDEA.<br />
          <span style={{ color: "#FF6B35", WebkitTextStroke: "2px #FF6B35", WebkitTextFillColor: "transparent" }}>
            BUILT RIGHT.
          </span>
        </h1>
        <p style={{
          fontSize: isMobile ? "1rem" : "1.15rem", lineHeight: 1.75,
          color: "rgba(255,255,255,0.6)", maxWidth: "540px",
          marginBottom: "2rem", fontFamily: "'Lora', serif",
          animation: "fadeUp 0.6s 0.2s ease both",
          textAlign: "left",
        }}>
          I build custom Android apps for businesses — fast, clean, and built to last.
          Enterprise-grade experience. Personal attention. Real results.
        </p>
        <div style={{
          display: "flex", gap: "1rem", flexDirection: isMobile ? "column" : "row",
          animation: "fadeUp 0.6s 0.3s ease both",
        }}>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "1rem 2rem", background: "#FF6B35", border: "none",
              color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: "0.78rem",
              letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Get a Free Quote
          </button>
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "1rem 2rem", background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)",
              fontFamily: "'DM Mono', monospace", fontSize: "0.78rem",
              letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
            }}
          >
            See My Work
          </button>
        </div>
        <div style={{
          display: "flex", gap: isMobile ? "2rem" : "3rem", marginTop: "3rem",
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem",
          animation: "fadeUp 0.6s 0.4s ease both",
        }}>
          {[["7+", "Years Coding"], ["5+", "Years Enterprise"], ["2", "Apps Published"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "2rem" : "2.4rem", color: "#FF6B35", lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.3rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  return (
    <section id="about" ref={ref} style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2.5rem" : "6rem",
          alignItems: "start",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)",
          transition: "all 0.7s ease",
        }}>
          {/* Left: text */}
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "1rem" }}>
              About Me
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "#fff", lineHeight: 1, marginBottom: "1.5rem" }}>
              BUILT FOR<br />IMPACT.
            </h2>

            {/* Photo on mobile — show here between heading and text */}
            {isMobile && (
              <div style={{ marginBottom: "1.5rem" }}>
                <img src="/amer.png" alt="Amer Cosovic"
                  style={{ width: "160px", display: "block", borderRadius: "4px", filter: "grayscale(15%) contrast(1.05)" }}
                />
              </div>
            )}

            <div style={{ fontFamily: "'Lora', serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(255,255,255,0.65)", textAlign: "left" }}>
              <p style={{ marginBottom: "1.2rem" }}>
                I'm Amer — an Android developer with over 7 years of experience building
                apps that people actually use. For the past 5+ years, I've worked at
                Gap Inc., building enterprise inventory apps used by associates across
                every Gap, Old Navy, and Banana Republic store in North America and Japan.
              </p>
              <p style={{ marginBottom: "1.2rem" }}>
                That means I build software at scale — apps that need to be rock-solid,
                performant, and intuitive for thousands of users every day. I bring that
                same standard to every client project I take on.
              </p>
              <p>
                I'm passionate about building things that have a genuine positive impact —
                whether that's a tool that helps a factory run smoother or an app that
                helps a songwriter find the perfect word.
              </p>
            </div>
            <a href="https://www.linkedin.com/in/amer-c-383a6617a/" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                marginTop: "1.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem",
                letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF6B35",
                textDecoration: "none", borderBottom: "1px solid rgba(255,107,53,0.3)",
                paddingBottom: "0.2rem",
              }}
            >
              View LinkedIn Profile →
            </a>
          </div>

          {/* Right: photo + card (desktop only photo) */}
          <div>
            {!isMobile && (
              <div style={{ marginBottom: "1.5rem" }}>
                <img src="/amer.png" alt="Amer Cosovic"
                  style={{ width: "220px", display: "block", filter: "grayscale(15%) contrast(1.05)" }}
                />
              </div>
            )}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              padding: "2rem", position: "relative",
            }}>
              <div style={{
                position: "absolute", top: "-1px", left: "2rem", right: "2rem", height: "2px",
                background: "linear-gradient(90deg, #FF6B35, transparent)",
              }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Enterprise Background
              </div>
              {[
                ["Gap Inc.", "Android Developer", "5+ yrs"],
                ["Fulfill App", "Enterprise Inventory", "N. America + Japan"],
                ["BOH Mobile", "Back-of-House Ops", "Retail Scale"],
              ].map(([co, role, detail]) => (
                <div key={co} style={{ marginBottom: "1.2rem", paddingBottom: "1.2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem", color: "#fff", letterSpacing: "0.05em" }}>{co}</div>
                      <div style={{ fontFamily: "'Lora', serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginTop: "0.1rem" }}>{role}</div>
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#FF6B35", letterSpacing: "0.06em", textAlign: "right", flexShrink: 0 }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  return (
    <section id="work" ref={ref} style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 2.5rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
          transition: "all 0.6s ease",
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "1rem" }}>
            Published Work
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "#fff", lineHeight: 1, marginBottom: "2.5rem" }}>
            APPS I'VE BUILT.
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "1.5rem",
        }}>
          {APPS.map((app, i) => (
            <div key={app.name} style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              padding: "2rem", position: "relative", overflow: "hidden",
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)",
              transition: `all 0.6s ${0.1 + i * 0.1}s ease`,
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${app.color}, transparent)` }} />
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{app.icon}</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.7rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "0.4rem" }}>{app.name}</h3>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", color: app.color, textTransform: "uppercase", marginBottom: "0.8rem" }}>
                Client: {app.client}
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", marginBottom: "1.2rem", textAlign: "left" }}>
                {app.description}
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {app.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "0.3rem 0.7rem",
                    border: `1px solid ${app.color}30`, color: app.color,
                  }}>{tag}</span>
                ))}
              </div>
              <a href={app.playUrl} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "#fff", textDecoration: "none",
                  padding: "0.7rem 1.4rem", border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                View on Play Store →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  return (
    <section id="testimonials" ref={ref} style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
          transition: "all 0.6s ease", marginBottom: "2.5rem",
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "1rem" }}>
            Testimonials
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "#fff", lineHeight: 1 }}>
            WHAT CLIENTS SAY.
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "1.5rem",
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              padding: "2rem", position: "relative",
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)",
              transition: `all 0.6s ${0.15 + i * 0.1}s ease`,
            }}>
              <div style={{
                position: "absolute", top: "1.5rem", right: "1.5rem",
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem",
                color: t.color, opacity: 0.1, lineHeight: 1,
              }}>"</div>
              <p style={{
                fontFamily: "'Lora', serif", fontSize: "1rem", lineHeight: 1.8,
                color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem",
                fontStyle: "italic", textAlign: "left",
              }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: t.color, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "#fff",
                  flexShrink: 0,
                }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: "#fff", letterSpacing: "0.05em" }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: t.color, letterSpacing: "0.1em", marginTop: "0.1rem" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const { name, email, message } = form;
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`App Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBusiness: ${form.business}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:cosovic14@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputStyle = {
    width: "100%", padding: "1rem", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)", color: "#fff",
    fontFamily: "'Lora', serif", fontSize: "1rem",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s", borderRadius: "2px",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 2.5rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
          transition: "all 0.6s ease",
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "1rem" }}>
            Get in Touch
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "#fff", lineHeight: 1, marginBottom: "1rem" }}>
            LET'S BUILD<br />YOUR APP.
          </h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: "2rem", textAlign: "left" }}>
            Have an idea? I'll give you a free quote and honest timeline. No fluff, no upselling — just a straight conversation about what it takes to build your app right.
          </p>
          {sent ? (
            <div style={{ padding: "2rem", border: "1px solid rgba(255,107,53,0.3)", textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: "#FF6B35", marginBottom: "0.5rem" }}>Your email client is opening!</div>
              <div style={{ fontFamily: "'Lora', serif", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Finish sending the message and I'll get back to you soon.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#FF6B35"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#FF6B35"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <input name="business" placeholder="Business Name (optional)" value={form.business} onChange={handleChange} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#FF6B35"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <textarea name="message" placeholder="Tell me about your app idea..." value={form.message} onChange={handleChange}
                rows={5} style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "#FF6B35"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <button onClick={handleSubmit}
                style={{
                  padding: "1.1rem", background: "#FF6B35", border: "none",
                  color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem",
                  letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
                }}
              >
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "2rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem",
    }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
        AMER<span style={{ color: "#FF6B35" }}>.</span>DEV
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
        © 2025 · BUILT BY AMER COSOVIC
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ background: "#08080C", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08080C; }
        ::-webkit-scrollbar-thumb { background: #FF6B35; }
        ::placeholder { color: rgba(255,255,255,0.2); }
        input, textarea { -webkit-appearance: none; }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}