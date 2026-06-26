import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// DESIGN DNA — encoded from each reference site
// ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the world's best web designer and frontend developer. Your work is featured on Awwwards.com (Site of the Day winner), curated on Siteinspire.com, showcased on Land-book.com for its conversion architecture, and your animations appear on Godly.website. Every site you produce must feel like it cost $2,000–$10,000 to build.

════════════════════════════════════════
AWWWARDS.COM — AWARD-WINNING AESTHETICS
════════════════════════════════════════
Awwwards sites win because of bold creative direction. Apply:
• Typography as the HERO: oversized display type, clamp(56px, 10vw, 140px) for main headline
• Grid-breaking layouts: elements that intentionally escape the grid feel designed, not accidental
• Noise/grain texture for depth: use SVG feTurbulence filter or CSS pseudo-element with SVG data URI
• Large decorative numbers as design elements (01, 02, 03 as section markers)
• Diagonal section dividers using clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%)
• Split-screen hero layouts (50/50 with image mask and text side)
• Custom cursor: cursor:none + position:fixed div that follows mousemove (optional)
• Horizontal scroll showcase: overflow-x:scroll section with scroll-snap for portfolio items
• Precise letter-spacing on headings: -0.02em to -0.05em (tight, editorial feel)
• Section transitions that feel inevitable, not abrupt

════════════════════════════════════════
SITEINSPIRE.COM — EDITORIAL REFINEMENT
════════════════════════════════════════
Siteinspire curates the most refined, typographically-led design. Apply:
• Five clear typographic levels: display (80-140px) → heading (32-48px) → subheading (20-28px) → body (16-18px) → caption (12-14px)
• Generous whitespace: section padding minimum 80px, ideal 120-160px vertical
• line-height: 1.6-1.8 on body, 1.1-1.2 on display type
• letter-spacing: -0.02em to -0.04em on all headings
• Subtle 1px dividers (border: 1px solid rgba(255,255,255,0.08)) not chunky borders
• Every interactive element has a hover state — color, opacity, or transform change
• transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) on ALL interactive elements
• 4px/8px spacing grid consistently applied throughout
• Font pairing: one expressive display font + one refined neutral sans-serif

════════════════════════════════════════
LAND-BOOK.COM — CONVERSION ARCHITECTURE
════════════════════════════════════════
Land-book features the highest-converting landing pages. Always structure:
1. HOOK: one clear value proposition, 8 words max in headline
2. PROOF: logos row immediately after hero ("Trusted by 2,000+ companies")
3. PROBLEM/SOLUTION: what's broken, how you fix it
4. FEATURES: grid of 3 or 6 items (icon + title + 2-line description)
5. PROCESS: numbered steps (3 max), simple action verbs
6. SOCIAL PROOF: testimonials with initials circle avatar, name, role, company
7. METRICS: 3-4 big numbers with counters ("+340%", "10,000+", "$2M saved")
8. OBJECTION HANDLING: FAQ accordion, 5-6 questions
9. FINAL CTA: repeat the main offer with urgency
10. FOOTER: links, socials, copyright
Sticky nav with CTA button always visible. Multiple CTAs throughout. Specific CTA text: "Start Free Trial", "Book a Demo", not "Learn More" or "Click Here".

════════════════════════════════════════
GODLY.WEBSITE — ANIMATION EXCELLENCE
════════════════════════════════════════
Godly.website features the most cutting-edge CSS/JS animations. Apply ALL of these:

1. CLIP-PATH TEXT REVEAL (MANDATORY on headlines):
.reveal-clip { clip-path: inset(0 100% 0 0); transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-clip.in { clip-path: inset(0 0% 0 0); }

2. STAGGERED FADE-UP (all section content):
.fade-up { opacity: 0; transform: translateY(40px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
.fade-up.in { opacity: 1; transform: translateY(0); }
Children get animation-delay incremented by 0.1s each.

3. SMOOTH SCROLL OBSERVER (mandatory):
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal-clip, .fade-up').forEach(el => io.observe(el));

4. PARALLAX (hero background or decorative elements):
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  document.querySelectorAll('[data-speed]').forEach(el => {
    el.style.transform = 'translateY(' + (sy * parseFloat(el.dataset.speed)) + 'px)';
  });
}, { passive: true });

5. COUNTER ANIMATION (stats section):
function runCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  let cur = 0, inc = target / 80;
  const t = setInterval(() => {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = prefix + Math.floor(cur).toLocaleString() + suffix;
  }, 16);
}
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ runCounter(e.target); cio.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => cio.observe(el));

6. FLOATING DECORATION:
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
@keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
.float { animation: float 7s ease-in-out infinite; }
.float2 { animation: float2 9s ease-in-out infinite 1s; }

7. NAV SCROLL BLUR:
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60 ? 'rgba(var(--bg-rgb), 0.85)' : 'transparent';
  nav.style.backdropFilter = window.scrollY > 60 ? 'blur(20px)' : 'none';
  nav.style.borderBottom = window.scrollY > 60 ? '1px solid var(--border)' : '1px solid transparent';
}, { passive: true });

8. MAGNETIC BUTTON (on primary CTAs):
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * 0.18;
    const y = (e.clientY - r.top - r.height/2) * 0.18;
    btn.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(1.04)';
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

9. HERO GRADIENT BLOB (animated background):
@keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
.blob { animation: blob 8s ease-in-out infinite; }

10. LETTER SPLIT ANIMATION (for short hero words):
function splitAndAnimate(el) {
  const letters = el.textContent.split('');
  el.innerHTML = letters.map((l,i) => l === ' ' ? ' ' : '<span style="display:inline-block;animation:letterIn 0.5s cubic-bezier(0.16,1,0.3,1) '+( i * 0.04)+'s both">'+l+'</span>').join('');
}
@keyframes letterIn { from{opacity:0;transform:translateY(30px) rotateX(-40deg)} to{opacity:1;transform:none} }

════════════════════════════════════════
FONTS — MANDATORY RULES
════════════════════════════════════════
Always @import from Google Fonts. NEVER use Inter, Roboto, Arial, system-ui, or generic sans-serif.

EXCELLENT display choices (pick one per site): Playfair Display, Fraunces, Cormorant Garamond, DM Serif Display, Instrument Serif, Syne, Bricolage Grotesque, Libre Baskerville, Bodoni Moda
EXCELLENT body choices (pick one): DM Sans, Outfit, Plus Jakarta Sans, Nunito, Manrope, Lexend, Barlow
MONO: JetBrains Mono, Space Mono

════════════════════════════════════════
CSS ARCHITECTURE
════════════════════════════════════════
Always define ALL these custom properties:

:root {
  /* Colors */
  --bg: [main background];
  --bg-rgb: [RGB of --bg for rgba()];
  --bg-2: [slightly lighter surface];
  --surface: [card background];
  --border: [subtle border color];
  --text: [primary text];
  --muted: [secondary text, ~55% opacity of --text];
  --accent: [user's brand color];
  --accent-h: [hover state, 10% lighter];
  --accent-rgb: [RGB of accent for rgba()];

  /* Type */
  --display: 'Display Font', serif;
  --sans: 'Body Font', sans-serif;

  /* Motion */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --t: 0.5s var(--ease);
}

/* Base animations */
.fade-up { opacity:0; transform:translateY(40px); transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
.fade-up.in { opacity:1; transform:none; }
.reveal-clip { clip-path:inset(0 100% 0 0); transition: clip-path 0.9s var(--ease); }
.reveal-clip.in { clip-path:inset(0 0% 0 0); }

Delay children with: .fade-up:nth-child(1){transition-delay:0s} .fade-up:nth-child(2){transition-delay:0.1s} etc.

════════════════════════════════════════
MANDATORY SECTIONS CHECKLIST
════════════════════════════════════════
Always include ALL of:
✓ Navigation — sticky, transparent→blur on scroll, hamburger+overlay on mobile, CTA button
✓ Hero — 100vh, massive headline, animated blob/shape, subheadline, 2 CTAs (.magnetic class on primary)
✓ Logos bar — "Trusted by..." with 5-6 company names/logos (CSS text or simple SVGs)
✓ Features — grid of 3 or 6, each with SVG/emoji icon, title, 2-line description
✓ Process — "How it works" with 3 numbered steps
✓ Stats — 3-4 metrics with data-target counter animation
✓ Testimonials — 3 quotes, initials circle avatar, name, role, company
✓ Mid-page CTA — bold section with contrasting background
✓ FAQ — accordion with 5 questions (JS toggle), handles objections
✓ Footer — columns with links, socials, tagline, copyright

════════════════════════════════════════
IMAGE HANDLING
════════════════════════════════════════
NEVER leave broken img tags. Use:
- CSS gradient rectangles with border-radius as placeholders
- Inline SVG geometric illustrations for features icons
- https://picsum.photos/800/600?random=N for photo placeholders (vary N per image)
- Abstract CSS shapes for hero visuals

════════════════════════════════════════
COPY QUALITY
════════════════════════════════════════
- Write realistic, industry-appropriate professional copy. NO lorem ipsum.
- Headlines: active voice, clear benefit, 6-10 words
- Testimonials: use realistic full names and company names
- Stats: plausible numbers ("3,400+ clients", "98% retention", "4.9/5 rating")
- Footer: include a realistic email, one social handle

════════════════════════════════════════
RESPONSIVE DESIGN
════════════════════════════════════════
Always include breakpoints:
@media (max-width: 900px) { /* tablet */ }
@media (max-width: 600px) { /* mobile */ }
Stack columns, reduce font sizes, make nav full-screen overlay on mobile.

════════════════════════════════════════
OUTPUT FORMAT — CRITICAL
════════════════════════════════════════
Output ONLY the raw HTML document. 
• Start immediately with <!DOCTYPE html>
• End with </html>
• NO markdown code fences (no \`\`\`html)
• NO explanation before or after
• ALL CSS inside <style> in <head>
• ALL JavaScript inside <script> before </body>
• File must be 100% self-contained (only external dependency: Google Fonts CDN)`;

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const STYLES = [
  { id: "dark-awwwards", icon: "ti-moon-stars", label: "Dark Premium", desc: "Deep blacks, bold type — Awwwards" },
  { id: "editorial", icon: "ti-article", label: "Editorial", desc: "Magazine-clean — Siteinspire" },
  { id: "bold-light", icon: "ti-bolt", label: "Bold & Direct", desc: "High-conversion — Land-book" },
  { id: "minimal", icon: "ti-layout-list", label: "Ultra Minimal", desc: "Luxury whitespace" },
  { id: "retro", icon: "ti-planet", label: "Retro-Future", desc: "Y2K / Synthwave aesthetic" },
];

const ANIMS = [
  { id: "subtle", label: "Subtle", desc: "Fades & hover" },
  { id: "rich", label: "Rich", desc: "Reveals + parallax" },
  { id: "godly", label: "Godly ✦", desc: "Full Godly level" },
];

const REFS = ["Awwwards", "Siteinspire", "Land-book", "Godly.website"];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function WebsiteStudio() {
  const [f, setF] = useState({
    name: "Go Dream AI",
    industry: "Automatización para inmobiliarias",
    desc: "Diseñamos y construimos el sistema operativo de tu inmobiliaria: CRM + WhatsApp + automatizaciones. En 10–14 días. Alcance cerrado. Resultado real. Ningún lead se pierde, ninguna comisión se calcula a mano, ningún propietario espera respuesta.",
    audience: "Dueño de inmobiliaria argentina. 2–15 personas. Opera con WhatsApp personal, Excel y caos. No le interesa la tecnología — le interesa dejar de perder plata por desorden.",
    style: "dark-awwwards",
    anim: "rich",
    colors: ["#333333", "#ffffff", "#CCFF00"],
  });
  const [html, setHtml] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("preview");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  // Blob URL: gives the iframe a real origin so scripts + fonts load correctly
  useEffect(() => {
    if (!html) { setPreviewSrc(""); return; }
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [html]);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const COLOR_ROLES = ["Primary", "Secondary", "Accent"];
  const COLOR_DEFAULTS = ["#7c3aed", "#06b6d4", "#f59e0b"];

  const addColor = () => {
    if (f.colors.length >= 3) return;
    setF((p) => ({ ...p, colors: [...p.colors, COLOR_DEFAULTS[p.colors.length]] }));
  };
  const removeColor = (i) => {
    setF((p) => ({ ...p, colors: p.colors.filter((_, idx) => idx !== i) }));
  };
  const updateColor = (i, val) => {
    setF((p) => { const c = [...p.colors]; c[i] = val; return { ...p, colors: c }; });
  };

  const generate = async () => {
    if (!f.name.trim() || !f.desc.trim()) return;
    setLoading(true); setErr(""); setHtml("");

    const styleLabel = STYLES.find((s) => s.id === f.style)?.label ?? f.style;
    const animLabel = ANIMS.find((a) => a.id === f.anim)?.label ?? f.anim;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8000,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content:
              `Create a premium $2,000 website with these specs:\n\n` +
              `Business name: ${f.name}\n` +
              `Industry: ${f.industry || "Not specified"}\n` +
              `What they do: ${f.desc}\n` +
              `Target audience: ${f.audience || "General professionals"}\n` +
              `Visual style: ${styleLabel} (id: ${f.style})\n` +
              `Animation level: ${animLabel} (id: ${f.anim}) — ${f.anim === "godly" ? "apply ALL Godly animation techniques from the brief" : f.anim === "rich" ? "apply clip-path reveals, counters, and parallax" : "apply clean fade-up reveals and hover states only"}\n` +
              `Brand colors: ${f.colors.map((c, i) => `${COLOR_ROLES[i]}: ${c}`).join(", ")} — use as --accent, --accent-2, --accent-3 in :root\n\n` +
              `Generate the complete HTML file now. Start with <!DOCTYPE html>.`,
          }],
        }),
      });

      const d = await res.json();
      if (d.error) { setErr(d.error.message); setLoading(false); return; }

      let h = (d.content ?? [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");
      h = h.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "").trim();
      setHtml(h);
      setTab("preview");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const slug = f.name.replace(/\s+/g, "-").toLowerCase() || "website";
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([html], { type: "text/html" })),
      download: `${slug}.html`,
    });
    a.click();
  };

  const canGenerate = !loading && f.name.trim() && f.desc.trim();

  // ─── Styles ───────────────────────────────
  const S = {
    wrap: {
      display: "flex",
      border: "0.5px solid var(--color-border-tertiary)",
      borderRadius: "var(--border-radius-lg)",
      overflow: "hidden",
      minHeight: "640px",
      background: "var(--color-background-primary)",
    },
    sidebar: {
      width: "296px",
      flexShrink: 0,
      borderRight: "0.5px solid var(--color-border-tertiary)",
      background: "var(--color-background-secondary)",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    },
    sideInner: { padding: "16px", display: "flex", flexDirection: "column", gap: "18px", flex: 1 },
    main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
    label: { fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-tertiary)", marginBottom: "8px" },
    fieldLabel: { display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "5px" },
    input: {
      width: "100%", fontSize: "13px", padding: "8px 10px",
      borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)",
      background: "var(--color-background-primary)", color: "var(--color-text-primary)",
      outline: "none", fontFamily: "inherit", boxSizing: "border-box",
    },
    tabBar: {
      display: "flex", alignItems: "center", gap: "3px",
      padding: "10px 12px", borderBottom: "0.5px solid var(--color-border-tertiary)", flexShrink: 0,
    },
    tabBtn: (active) => ({
      padding: "5px 12px", borderRadius: "var(--border-radius-md)", border: "none",
      background: active ? "var(--color-background-secondary)" : "transparent",
      color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
      fontSize: "13px", fontWeight: active ? 500 : 400, cursor: "pointer",
    }),
    actionBtn: {
      padding: "5px 11px", fontSize: "12px", borderRadius: "var(--border-radius-md)",
      border: "0.5px solid var(--color-border-secondary)", background: "transparent",
      color: "var(--color-text-secondary)", cursor: "pointer",
    },
    genBtn: {
      width: "100%", padding: "11px 16px", borderRadius: "var(--border-radius-md)",
      border: canGenerate ? "0.5px solid var(--color-border-primary)" : "0.5px solid var(--color-border-tertiary)",
      background: canGenerate ? "var(--color-background-primary)" : "transparent",
      color: canGenerate ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
      fontSize: "13px", fontWeight: 500, cursor: canGenerate ? "pointer" : "not-allowed",
      transition: "all 0.2s", boxSizing: "border-box",
    },
    center: {
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "10px", padding: "32px", textAlign: "center",
    },
  };

  return (
    <div>
      <h2 className="sr-only">Website Studio — AI premium website generator</h2>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .ws-spin { animation: spin 0.9s linear infinite; display:inline-block; }
        .ws-style-card { cursor:pointer; padding:8px 10px; border-radius:var(--border-radius-md); transition:all 0.15s; display:flex; align-items:center; gap:10px; }
        .ws-style-card:hover { background:var(--color-background-primary); }
        .ws-anim-card { flex:1; padding:8px 6px; text-align:center; border-radius:var(--border-radius-md); cursor:pointer; transition:all 0.15s; }
      `}</style>

      <div style={S.wrap}>

        {/* ── Sidebar ── */}
        <div style={S.sidebar}>
          <div style={S.sideInner}>

            {/* Logo */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <i className="ti ti-world-code" style={{ fontSize: "18px", color: "var(--color-text-secondary)" }} aria-hidden="true" />
                <span style={{ fontSize: "14px", fontWeight: 500 }}>Website Studio</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                {REFS.map((r) => (
                  <span key={r} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "100px", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-tertiary)" }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Business info */}
            <div>
              <p style={S.label}>Brief</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                  <label style={S.fieldLabel}>Business name *</label>
                  <input style={S.input} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Acme Corp" />
                </div>
                <div>
                  <label style={S.fieldLabel}>Industry</label>
                  <input style={S.input} value={f.industry} onChange={(e) => set("industry", e.target.value)} placeholder="SaaS, Agency, Studio, E-comm..." />
                </div>
                <div>
                  <label style={S.fieldLabel}>What you do *</label>
                  <textarea
                    style={{ ...S.input, resize: "none", height: "68px", lineHeight: "1.5" }}
                    value={f.desc}
                    onChange={(e) => set("desc", e.target.value)}
                    placeholder="We help startups automate their operations using AI, reducing costs by 40%..."
                  />
                </div>
                <div>
                  <label style={S.fieldLabel}>Target audience</label>
                  <input style={S.input} value={f.audience} onChange={(e) => set("audience", e.target.value)} placeholder="CTOs, founders, agencies..." />
                </div>
              </div>
            </div>

            {/* Visual style */}
            <div>
              <p style={S.label}>Visual style</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {STYLES.map((s) => {
                  const active = f.style === s.id;
                  return (
                    <div
                      key={s.id}
                      className="ws-style-card"
                      onClick={() => set("style", s.id)}
                      style={{
                        background: active ? "var(--color-background-primary)" : "transparent",
                        border: `0.5px solid ${active ? "var(--color-border-primary)" : "transparent"}`,
                      }}
                    >
                      <i className={`ti ${s.icon}`} aria-hidden="true"
                        style={{ fontSize: "16px", color: active ? "var(--color-text-primary)" : "var(--color-text-tertiary)", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: active ? 500 : 400, color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>{s.label}</div>
                        <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Animation level */}
            <div>
              <p style={S.label}>Animation level</p>
              <div style={{ display: "flex", gap: "6px" }}>
                {ANIMS.map((a) => {
                  const active = f.anim === a.id;
                  return (
                    <div
                      key={a.id}
                      className="ws-anim-card"
                      onClick={() => set("anim", a.id)}
                      style={{
                        border: `0.5px solid ${active ? "var(--color-border-primary)" : "var(--color-border-tertiary)"}`,
                        background: active ? "var(--color-background-primary)" : "transparent",
                      }}
                    >
                      <div style={{ fontSize: "12px", fontWeight: active ? 500 : 400, color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>{a.label}</div>
                      <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", marginTop: "2px" }}>{a.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brand colors */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <p style={{ ...S.label, margin: 0 }}>Brand colors</p>
                {f.colors.length < 3 && (
                  <button
                    onClick={addColor}
                    style={{ fontSize: "11px", color: "var(--color-text-secondary)", background: "transparent", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", padding: "2px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}
                  >
                    <i className="ti ti-plus" style={{ fontSize: "11px" }} aria-hidden="true" />
                    Add color
                  </button>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {f.colors.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "var(--border-radius-md)", overflow: "hidden", border: "0.5px solid var(--color-border-secondary)", flexShrink: 0, position: "relative" }}>
                      <input type="color" value={c} onChange={(e) => updateColor(i, e.target.value)}
                        style={{ position: "absolute", top: "-6px", left: "-6px", width: "200%", height: "200%", cursor: "pointer", border: "none" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginBottom: "1px" }}>{COLOR_ROLES[i]}</div>
                      <code style={{ fontSize: "11px", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{c}</code>
                    </div>
                    {i > 0 && (
                      <button
                        onClick={() => removeColor(i)}
                        aria-label={`Remove ${COLOR_ROLES[i]} color`}
                        style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--color-text-tertiary)", padding: "4px", borderRadius: "var(--border-radius-md)", display: "flex", alignItems: "center" }}
                      >
                        <i className="ti ti-x" style={{ fontSize: "13px" }} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "10px", color: "var(--color-text-tertiary)", marginTop: "6px" }}>
                {f.colors.length === 1 ? "Add up to 2 more colors" : f.colors.length === 2 ? "Add 1 more color" : "Maximum 3 colors"}
              </p>
            </div>

            {/* Error */}
            {err && (
              <div style={{ fontSize: "12px", color: "var(--color-text-danger)", background: "var(--color-background-danger)", padding: "9px 11px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-danger)", lineHeight: 1.5 }}>
                <i className="ti ti-alert-triangle" style={{ marginRight: "5px", fontSize: "13px" }} aria-hidden="true" />
                {err}
              </div>
            )}

            {/* Generate */}
            <div style={{ marginTop: "auto" }}>
              <button style={S.genBtn} onClick={generate} disabled={!canGenerate}>
                {loading
                  ? <><i className="ti ti-refresh ws-spin" style={{ marginRight: "6px", fontSize: "14px" }} aria-hidden="true" />Generating...</>
                  : <><i className="ti ti-sparkles" style={{ marginRight: "6px", fontSize: "14px" }} aria-hidden="true" />Generate website ↗</>}
              </button>
              {!f.name.trim() || !f.desc.trim()
                ? <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", textAlign: "center", marginTop: "6px" }}>Name and description required</p>
                : null}
            </div>

          </div>
        </div>

        {/* ── Main area ── */}
        <div style={S.main}>

          {/* Tab bar */}
          <div style={S.tabBar}>
            {["preview", "code"].map((t) => (
              <button key={t} style={S.tabBtn(tab === t)} onClick={() => setTab(t)}>
                <i className={`ti ${t === "preview" ? "ti-eye" : "ti-code"}`} style={{ marginRight: "5px", fontSize: "13px" }} aria-hidden="true" />
                {t === "preview" ? "Preview" : "Code"}
              </button>
            ))}

            {html && (
              <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                <button style={S.actionBtn} onClick={copy} aria-label="Copy HTML">
                  <i className={`ti ${copied ? "ti-check" : "ti-copy"}`} style={{ marginRight: "4px", fontSize: "13px" }} aria-hidden="true" />
                  {copied ? "Copied" : "Copy HTML"}
                </button>
                <button style={S.actionBtn} onClick={download} aria-label="Download HTML file">
                  <i className="ti ti-download" style={{ marginRight: "4px", fontSize: "13px" }} aria-hidden="true" />
                  Download
                </button>
              </div>
            )}
          </div>

          {/* Preview tab */}
          {tab === "preview" && (
            <div style={{ flex: 1, position: "relative" }}>
              {loading ? (
                <div style={S.center}>
                  <i className="ti ti-brush" style={{ fontSize: "36px", color: "var(--color-text-tertiary)" }} aria-hidden="true" />
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-secondary)" }}>
                    Building your $2,000 website...
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", maxWidth: "260px", lineHeight: 1.7 }}>
                    Applying Awwwards typography · Godly animations ·
                    Land-book conversion architecture · Siteinspire refinement
                  </div>
                </div>
              ) : html ? (
                <iframe
                  src={previewSrc}
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  title="Generated website preview"
                />
              ) : (
                <div style={S.center}>
                  <i className="ti ti-layout-grid" style={{ fontSize: "36px", color: "var(--color-text-tertiary)" }} aria-hidden="true" />
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-secondary)" }}>
                    Ready to design
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-tertiary)", maxWidth: "300px", lineHeight: 1.7 }}>
                    Fill in your brief on the left and hit Generate. The AI applies
                    design DNA from the world's best web galleries.
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", marginTop: "4px" }}>
                    {[
                      ["ti-trophy", "Awwwards aesthetics"],
                      ["ti-sparkles", "Godly animations"],
                      ["ti-chart-bar", "Land-book conversion"],
                      ["ti-eye-check", "Siteinspire refinement"],
                    ].map(([icon, text]) => (
                      <span key={text} style={{ fontSize: "11px", display: "flex", alignItems: "center", gap: "4px", padding: "3px 9px", borderRadius: "100px", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-tertiary)" }}>
                        <i className={`ti ${icon}`} style={{ fontSize: "12px" }} aria-hidden="true" />
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Code tab */}
          {tab === "code" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {html ? (
                <pre style={{
                  fontSize: "11px", fontFamily: "var(--font-mono)",
                  color: "var(--color-text-secondary)", lineHeight: 1.7,
                  whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0,
                }}>
                  {html}
                </pre>
              ) : (
                <div style={S.center}>
                  <i className="ti ti-code-off" style={{ fontSize: "32px", color: "var(--color-text-tertiary)" }} aria-hidden="true" />
                  <span style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
                    Generate a website to see its code here
                  </span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
