import { useState, useEffect, useRef } from "react";

// ─── EXACT SVG PATH FROM ORIGINAL BRAND FILE ──────────────────
const ML_PATH = "M 79.441406 315.222656 C 76.875 317.507812 72.492188 315.894531 72.492188 312.664062 L 72.492188 62.328125 C 72.492188 60.132812 74.519531 58.6875 76.621094 58.699219 C 77.609375 58.707031 78.621094 59.035156 79.441406 59.765625 L 127.652344 102.710938 L 184.605469 153.441406 C 184.65625 153.488281 184.707031 153.527344 184.757812 153.570312 L 184.761719 153.574219 L 185.757812 154.46875 L 245.53125 207.710938 C 245.757812 207.914062 246.003906 208.085938 246.257812 208.230469 C 248.59375 209.550781 251.777344 208.371094 252.378906 205.964844 C 252.441406 205.707031 252.480469 205.433594 252.480469 205.144531 L 252.480469 169.847656 C 252.480469 166.613281 248.097656 164.996094 245.53125 167.28125 L 242.976562 169.554688 L 237.734375 174.226562 L 202.519531 142.609375 L 207.621094 138.066406 L 295.527344 59.765625 C 298.09375 57.484375 302.476562 59.097656 302.476562 62.328125 L 302.476562 312.664062 C 302.476562 314.855469 300.449219 316.308594 298.347656 316.292969 C 297.359375 316.285156 296.347656 315.957031 295.527344 315.222656 L 247.316406 272.28125 L 190.363281 221.550781 C 190.3125 221.503906 190.261719 221.460938 190.210938 221.421875 L 190.207031 221.417969 L 189.210938 220.523438 L 129.4375 167.28125 C 129.210938 167.078125 128.964844 166.90625 128.714844 166.761719 C 126.378906 165.445312 123.191406 166.621094 122.589844 169.023438 C 122.527344 169.285156 122.492188 169.558594 122.492188 169.847656 L 122.492188 205.144531 C 122.492188 208.378906 126.871094 209.996094 129.4375 207.710938 L 131.992188 205.4375 L 137.234375 200.765625 L 172.449219 232.382812 L 167.347656 236.925781 L 79.441406 315.222656";

const MLIcon = ({ size = 40, color = "#ff3131" }) => (
  <svg width={size} height={size} viewBox="72 58 231 260" fill="none" style={{ display:"block", flexShrink:0 }}>
    <path fill={color} fillRule="nonzero" d={ML_PATH} />
  </svg>
);

const Logo = ({ iconSize = 36, nameSize = "1rem", subSize = "0.76rem" }) => (
  <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
    <MLIcon size={iconSize} />
    <div style={{ lineHeight:1.05 }}>
      <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:nameSize, letterSpacing:"0.04em", color:"#fff" }}>MEDIALAB</div>
      <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:subSize, letterSpacing:"0.14em", color:"#ff3131" }}>LATAM</div>
    </div>
  </div>
);

// ─── EDITORIAL SYSTEM PROMPT ───────────────────────────────────
// This encodes MediaLab's actual editorial methodology:
// - Global relevance as selection criterion
// - "La IA acaba de cambiar las reglas — y LATAM no puede quedarse afuera" voice
// - LATAM angle as closing remate (not opener)
// - Technology → concrete human impact as the core bridge
const SYSTEM = `Eres el editor senior de MediaLab LATAM. No eres un asistente genérico de contenido — eres una voz editorial con criterio, posición y estilo propio.

## FILOSOFÍA EDITORIAL
MediaLab cubre IA porque los medios de comunicación de LATAM enfrentan la mayor transformación de su historia. Cada noticia no es un dato técnico: es una señal de cambio que puede beneficiar o desplazar a la gente común. Tu trabajo es hacer esa traducción con honestidad y urgencia.

**Criterio de relevancia:** Una noticia merece cobertura si tiene impacto real en la industria global de medios, tecnología o comunicación. No cubrís novedades menores ni hype sin sustancia.

**Voz característica:** Directa, experta sin ser elitista. Nunca neutral cuando hay algo en juego. La frase que define el tono: *"La IA acaba de cambiar las reglas del juego — y LATAM no puede quedarse afuera."*

**Estructura narrativa obligatoria:**
1. El hecho global — qué pasó y por qué importa en el mundo
2. El impacto humano concreto — quién se beneficia, quién queda expuesto, qué cambia en la vida real
3. El remate LATAM — como conclusión que transforma información en posición: ¿qué oportunidad o amenaza concreta abre esto para la gente común en nuestra región?

**Lo que NUNCA hace MediaLab:**
- Celebrar tecnología sin preguntarse para quién
- Usar jerga técnica sin explicar sus consecuencias
- Terminar un contenido sin un ángulo latinoamericano claro
- Sonar como un comunicado de prensa de Silicon Valley

---

## FORMATO DE OUTPUT — SIEMPRE EN ESPAÑOL

Genera los 3 formatos con esta estructura exacta:

---
### 🖼️ GRÁFICA

**TITULAR:** [Máx. 8 palabras. Fuerza de primera plana. Puede ser afirmación impactante o pregunta perturbadora. Nunca neutro.]

**SUBTÍTULO:** [Máx. 18 palabras. Contextualiza el titular. Introduce la tensión: quién gana, quién pierde, qué cambia.]

**COPY DEL POST:**
[Oración 1 — El hecho en su máxima expresión: qué pasó y su escala de impacto.]
[Oración 2 — La consecuencia humana concreta: quién se ve afectado y cómo, con especificidad.]
[Oración 3 — El remate LATAM + CTA: qué significa esto para nuestra región y qué debe hacer quien lee esto ahora.]

**HASHTAGS:** [7-9. Mezcla español/inglés. Específicos de la noticia + identidad MediaLab.]

**BRIEF VISUAL:** [Instrucciones concretas para el diseñador: paleta dominante, tipografía clave, elemento visual central, composición, mood. Referencia estética si aplica.]

---
### 📱 CARRUSEL

**SLIDE 1 — PORTADA:**
Titular: [El mismo gancho de la gráfica o variante más visual]
Visual: [Elemento gráfico que detiene el scroll]

**SLIDE 2 — EL HECHO:**
Encabezado: [3-5 palabras]
Cuerpo: [2-3 oraciones. Qué pasó, quién lo hizo, cuándo. Solo hechos.]

**SLIDE 3 — LA ESCALA:**
Encabezado: [El dato más impactante como titular]
Cuerpo: [Contexto que hace ese dato comprensible. Por qué ese número importa.]

**SLIDE 4 — QUIÉN GANA:**
Encabezado: [Directo]
Cuerpo: [Quién se beneficia y cómo. Concreto, no abstracto.]

**SLIDE 5 — QUIÉN QUEDA EXPUESTO:**
Encabezado: [Directo]
Cuerpo: [La cara B. Quién pierde, qué riesgo aparece, qué queda en suspenso.]

**SLIDE 6 — EL REMATE LATAM:**
Encabezado: ["Y en nuestra región..." o similar]
Cuerpo: [La oportunidad O amenaza concreta para la gente común en LATAM. Específico, con nombre y apellido de países o sectores si aplica. Este es el momento donde MediaLab toma posición.]

**SLIDE 7 — CTA:**
Pregunta: [Una sola pregunta que active la conversación en comentarios. Sin respuesta obvia.]

**COPY DEL POST:** [2 oraciones que funcionen sin ver el carrusel + "Desliza para entender qué significa esto para vos →"]

---
### 🎬 VIDEO

**GANCHO (0–4s):**
[Frase de impacto máximo. Puede romper la cuarta pared. Debe generar disonancia cognitiva. El objetivo es detención total del scroll.]
Acción en cámara: [Qué hace el presentador o qué aparece en pantalla]

**BEAT 1 — EL HECHO (4–12s):**
Texto: [El qué pasó en 2 oraciones máximo]
Recurso visual: [Qué aparece: texto, gráfico, clip, animación]

**BEAT 2 — LA MAGNITUD (12–24s):**
Texto: [El dato + su contexto inmediato]
Recurso visual: [Cómo se visualiza ese dato]

**BEAT 3 — EL IMPACTO HUMANO (24–38s):**
Texto: [Quién se beneficia, quién queda expuesto. El punto de mayor tensión narrativa.]
Recurso visual: [Cómo se representa ese impacto]

**BEAT 4 — EL REMATE LATAM (38–52s):**
Texto: [La posición editorial de MediaLab. Qué significa esto para la gente común en la región. El momento donde se toma partido.]
Recurso visual: [Elemento que ancle la región: mapa, dato local, referencia cultural]

**CIERRE + CTA (52–62s):**
Texto: [Pregunta abierta que invita a comentar + llamada a seguir la cuenta]
Acción: [Qué hace el presentador o cómo termina el visual]

**COPY DEL POST:** [3 líneas. Primera línea = gancho. Segunda = contexto. Tercera = CTA con pregunta.]

**DIRECCIÓN DE PRODUCCIÓN:** [Ritmo de corte, música sugerida por mood, tipografía en pantalla, color grade, referencias de formato si aplica.]

---

**⚡ ÁNGULO EDITORIAL MEDIALAB:**
[3-4 líneas. Esto NO es un resumen — es la posición editorial. Por qué esta noticia importa específicamente para el proyecto de construir medios mejores en LATAM. Qué está en juego más allá de la noticia en sí. Qué pregunta más grande abre. Escrito como si fuera la introducción de un editorial largo.]`;

// ─── SEARCH PROMPT ─────────────────────────────────────────────
const SEARCH_PROMPT = `Eres el editor de noticias de MediaLab LATAM. Busca las noticias de inteligencia artificial de las últimas 48 horas que cumplan este criterio editorial estricto:

CRITERIO DE SELECCIÓN: Relevancia global real — impacto concreto en la industria de medios, periodismo, comunicación o tecnología de consumo masivo. No hype, no anuncios menores, no actualizaciones de producto sin consecuencias.

JERARQUÍA DE TEMAS (en orden de prioridad):
1. Cambios en modelos o plataformas que afectan cómo se produce o consume información
2. IA que transforma empleos en medios, marketing o comunicación
3. Regulación o políticas de IA con impacto en libertad de expresión o acceso a información
4. Herramientas que democratizan o concentran poder en el ecosistema de medios
5. Cualquier desarrollo de IA con ángulo directo en Latinoamérica

Responde ÚNICAMENTE con este JSON exacto, sin texto adicional ni backticks:
{"noticias":[{"id":1,"titulo":"Titular periodístico preciso, no clickbait","resumen":"Primera oración: el hecho concreto. Segunda oración: por qué importa a escala global.","impacto":"Una frase sobre la consecuencia humana más directa","fuente":"Nombre del medio","categoria":"medios|herramientas|regulacion|latam|industria","relevancia":"alta|media","fecha":"hace X horas"}]}

Incluye entre 5 y 7 noticias. Prioriza calidad sobre cantidad. Si no hay suficientes noticias de alta relevancia, incluye menos.`;

// ─── CONFIG ────────────────────────────────────────────────────
const CAT = {
  medios:      { label:"MEDIOS",       color:"#dc2626" },
  herramientas:{ label:"HERRAMIENTAS", color:"#7c3aed" },
  regulacion:  { label:"REGULACIÓN",   color:"#0369a1" },
  latam:       { label:"LATAM",        color:"#065f46" },
  industria:   { label:"INDUSTRIA",    color:"#92400e" },
  general:     { label:"GENERAL",      color:"#374151" },
};

async function callClaude({ messages, system, search = false }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      messages,
      ...(system && { system }),
      ...(search && { tools: [{ type:"web_search_20250305", name:"web_search" }] }),
    }),
  });
  if (!res.ok) {
    const e = await res.json().catch(()=>({}));
    throw new Error(e?.error?.message || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── RESULT RENDERER ───────────────────────────────────────────
function ResultView({ text }) {
  const lines = text.split("\n");
  return (
    <div style={{ fontFamily:"'Montserrat',sans-serif" }}>
      {lines.map((line, i) => {
        if (line.startsWith("### ")) return (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:"0.6rem",
            margin:"2rem 0 0.6rem", paddingBottom:"0.4rem",
            borderBottom:`2px solid #ff3131`,
          }}>
            <span style={{ fontSize:"1.1rem" }}>{line.match(/^### ([\S]+)/)?.[1]}</span>
            <h3 style={{
              fontWeight:900, fontSize:"0.82rem", letterSpacing:"0.1em",
              color:"#0f0147", textTransform:"uppercase", margin:0,
            }}>{line.replace(/^### [\S]+ /, "")}</h3>
          </div>
        );

        // Bold label: value
        const lbl = line.match(/^\*\*([^*]+):\*\*\s*(.*)/);
        if (lbl) return (
          <div key={i} style={{ margin:"0.5rem 0", fontSize:"0.83rem", lineHeight:1.65 }}>
            <span style={{
              display:"inline-block", background:"#0f0147", color:"#fff",
              fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.1em",
              padding:"0.1rem 0.45rem", marginRight:"0.5rem",
              textTransform:"uppercase", verticalAlign:"middle",
            }}>{lbl[1]}</span>
            <span style={{ color:"#1a1a2e", fontWeight:500 }}>{lbl[2]}</span>
          </div>
        );

        // Section headers **text**
        if (/^\*\*[A-Z\s\d—]+\*\*$/.test(line)) return (
          <p key={i} style={{
            fontWeight:800, color:"#0f0147", margin:"1rem 0 0.2rem",
            fontSize:"0.78rem", letterSpacing:"0.06em", textTransform:"uppercase",
          }}>{line.replace(/\*\*/g,"")}</p>
        );

        if (line.startsWith("- ")) return (
          <p key={i} style={{ margin:"0.2rem 0 0.2rem 1rem", color:"#374151", fontSize:"0.82rem", lineHeight:1.6 }}>
            <span style={{ color:"#ff3131", fontWeight:700, marginRight:"0.4rem" }}>—</span>
            {line.slice(2)}
          </p>
        );

        if (line === "---") return (
          <div key={i} style={{ height:1, margin:"1.8rem 0", background:"linear-gradient(90deg, #ff3131 0%, #0f0147 60%, transparent 100%)" }}/>
        );

        if (!line.trim()) return <div key={i} style={{ height:"0.3rem" }}/>;

        return (
          <p key={i} style={{ margin:"0.2rem 0", color:"#2d2d4e", fontSize:"0.83rem", lineHeight:1.7 }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────
export default function App() {
  const [step, setStep]     = useState("home");
  const [news, setNews]     = useState([]);
  const [picked, setPicked] = useState(null);
  const [topic, setTopic]   = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy]     = useState(false);
  const [msg, setMsg]       = useState("");
  const [dots, setDots]     = useState("·");
  const [err, setErr]       = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setTab] = useState("grafica");
  const topRef = useRef(null);

  useEffect(() => {
    if (!busy) return;
    const iv = setInterval(() => setDots(d => d.length >= 3 ? "·" : d + "·"), 500);
    return () => clearInterval(iv);
  }, [busy]);

  const goTop = () => setTimeout(() => topRef.current?.scrollIntoView({ behavior:"smooth" }), 40);

  const fetchNews = async () => {
    setStep("loading"); setBusy(true); setErr("");
    setMsg("Escaneando fuentes editoriales");
    try {
      const data = await callClaude({ messages:[{ role:"user", content:SEARCH_PROMPT }], search:true });
      const raw = data.content?.find(b => b.type==="text")?.text || "";
      try {
        const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
        setNews(parsed.noticias || []);
      } catch { setNews([]); }
      setStep("news"); goTop();
    } catch(e) {
      setErr(e.message); setStep("news");
    } finally { setBusy(false); }
  };

  const generate = async (t) => {
    setStep("loading"); setBusy(true); setResult(""); setErr("");
    setMsg("Generando contenido editorial");
    try {
      const data = await callClaude({
        system: SYSTEM,
        messages:[{ role:"user", content:`Genera el contenido completo para los 3 formatos sobre esta noticia:\n\n${t}\n\nRecordá: aplicá la metodología editorial completa de MediaLab. El remate LATAM va al final como posición editorial, no como dato. La voz es directa y toma partido.` }],
      });
      const txt = data.content?.map(b => b.text||"").join("") || "";
      setResult(txt); setStep("result"); setTab("grafica"); goTop();
    } catch(e) {
      setErr(e.message); setStep("news");
    } finally { setBusy(false); }
  };

  const pickNews = (n) => {
    setPicked(n);
    generate(`TITULAR: ${n.titulo}\n\nRESUMEN: ${n.resumen}\n\nIMPACTO: ${n.impacto}\n\nFUENTE: ${n.fuente}`);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(result);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStep("home"); setNews([]); setPicked(null);
    setTopic(""); setResult(""); setErr("");
  };

  // Parse result into sections for tab view
  const getSections = () => {
    if (!result) return { grafica:"", carrusel:"", video:"", editorial:"" };
    const sections = { grafica:"", carrusel:"", video:"", editorial:"" };
    const parts = result.split(/(?=### [🖼📱🎬]|### ⚡)/);
    parts.forEach(p => {
      if (p.includes("GRÁFICA")) sections.grafica = p.trim();
      else if (p.includes("CARRUSEL")) sections.carrusel = p.trim();
      else if (p.includes("VIDEO")) sections.video = p.trim();
      else if (p.includes("ÁNGULO") || p.includes("EDITORIAL")) sections.editorial = p.trim();
    });
    return sections;
  };

  const sections = getSections();
  const tabs = [
    { id:"grafica",   icon:"🖼️",  label:"GRÁFICA" },
    { id:"carrusel",  icon:"📱",  label:"CARRUSEL" },
    { id:"video",     icon:"🎬",  label:"VIDEO" },
    { id:"editorial", icon:"⚡",  label:"EDITORIAL" },
  ];

  // ─── CSS ─────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap');
    * { box-sizing:border-box; margin:0; padding:0; }
    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-track { background:#060018; }
    ::-webkit-scrollbar-thumb { background:#ff3131; }

    .btn-primary {
      background:#ff3131; color:#fff; border:none;
      font-family:'Montserrat',sans-serif; font-weight:700;
      letter-spacing:0.08em; text-transform:uppercase;
      cursor:pointer; transition:all 0.15s;
      display:inline-flex; align-items:center; gap:0.4rem;
    }
    .btn-primary:hover { background:#cc2020; transform:translateY(-1px); box-shadow:0 8px 24px rgba(255,49,49,0.3); }
    .btn-primary:disabled { opacity:0.3; pointer-events:none; }

    .btn-ghost {
      background:transparent; color:#ff3131; border:1.5px solid #ff3131;
      font-family:'Montserrat',sans-serif; font-weight:700;
      letter-spacing:0.08em; text-transform:uppercase; cursor:pointer; transition:all 0.15s;
    }
    .btn-ghost:hover { background:#ff3131; color:#fff; }

    .btn-dark {
      background:#0f0147; color:#fff; border:none;
      font-family:'Montserrat',sans-serif; font-weight:600;
      letter-spacing:0.06em; text-transform:uppercase; cursor:pointer; transition:all 0.15s;
    }
    .btn-dark:hover { background:#1a0a6b; }

    .news-card {
      border:1px solid rgba(255,255,255,0.07);
      border-left:3px solid #ff3131;
      background:rgba(255,255,255,0.03);
      padding:1.1rem 1.2rem; cursor:pointer;
      transition:all 0.15s; margin-bottom:0.5rem;
      position:relative; overflow:hidden;
    }
    .news-card::before {
      content:''; position:absolute; inset:0;
      background:linear-gradient(135deg, rgba(255,49,49,0.04) 0%, transparent 60%);
      opacity:0; transition:opacity 0.15s;
    }
    .news-card:hover { border-left-color:#fff; transform:translateX(3px); background:rgba(255,255,255,0.06); }
    .news-card:hover::before { opacity:1; }

    .tag {
      display:inline-block; font-size:0.56rem; font-weight:700;
      letter-spacing:0.1em; padding:0.14rem 0.45rem; text-transform:uppercase;
    }

    .tab-btn {
      background:transparent; border:none; color:rgba(255,255,255,0.35);
      font-family:'Montserrat',sans-serif; font-weight:700; font-size:0.68rem;
      letter-spacing:0.1em; text-transform:uppercase; cursor:pointer;
      padding:0.7rem 1rem; border-bottom:2px solid transparent;
      transition:all 0.15s; display:flex; align-items:center; gap:0.35rem;
    }
    .tab-btn.active { color:#fff; border-bottom-color:#ff3131; }
    .tab-btn:hover:not(.active) { color:rgba(255,255,255,0.65); }

    .fade { animation:fade 0.3s ease; }
    @keyframes fade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }

    .pulse { animation:pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.1; } }

    .scan { animation:scan 1.5s ease-in-out infinite; }
    @keyframes scan { 0%,100% { transform:scaleX(0); transform-origin:left; } 50% { transform:scaleX(1); transform-origin:left; } 51% { transform:scaleX(1); transform-origin:right; } 99% { transform:scaleX(0); transform-origin:right; } }

    textarea {
      background:rgba(255,255,255,0.04); border:1px solid rgba(255,49,49,0.2);
      color:#fff; font-family:'Montserrat',sans-serif; font-size:0.83rem;
      resize:vertical; width:100%; outline:none; padding:0.9rem 1rem;
      transition:border-color 0.15s; line-height:1.65;
    }
    textarea:focus { border-color:#ff3131; }
    textarea::placeholder { color:rgba(255,255,255,0.2); font-style:italic; }

    .result-content { max-height:58vh; overflow-y:auto; padding:1.75rem; background:#fff; }
    .result-content::-webkit-scrollbar-thumb { background:#0f0147; }

    .ticker {
      display:flex; gap:0; overflow:hidden;
      border-top:1px solid rgba(255,49,49,0.2);
      border-bottom:1px solid rgba(255,49,49,0.2);
    }
    .ticker-item {
      animation:ticker 20s linear infinite;
      white-space:nowrap; padding:0.4rem 2rem;
      font-size:0.62rem; font-weight:600; letter-spacing:0.12em;
      color:rgba(255,255,255,0.3); text-transform:uppercase;
    }
    @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  `;

  const tickerText = "MEDIALAB LATAM · EL FUTURO DE LOS MEDIOS · IA + PERIODISMO · LATAM PRIMERO · ".repeat(6);

  // ─── RENDER ───────────────────────────────────────────────────
  return (
    <div ref={topRef} style={{ minHeight:"100vh", background:"#060018", color:"#fff", fontFamily:"'Montserrat',sans-serif" }}>
      <style>{css}</style>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header style={{
        background:"#0f0147",
        borderBottom:"2px solid #ff3131",
        position:"sticky", top:0, zIndex:100,
        boxShadow:"0 4px 30px rgba(0,0,0,0.6)",
      }}>
        <div style={{
          maxWidth:780, margin:"0 auto",
          padding:"0.75rem 1.4rem",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <Logo iconSize={34} nameSize="0.95rem" subSize="0.72rem" />
          <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
            {step !== "home" && (
              <button className="btn-ghost" onClick={reset}
                style={{ fontSize:"0.65rem", padding:"0.35rem 0.8rem" }}>← inicio</button>
            )}
            <div style={{
              background:"#ff3131", color:"#fff",
              fontSize:"0.55rem", fontWeight:800, letterSpacing:"0.16em",
              padding:"0.22rem 0.6rem", textTransform:"uppercase",
            }}>agente editorial</div>
          </div>
        </div>
        {/* Ticker */}
        <div className="ticker">
          <div className="ticker-item">{tickerText}</div>
        </div>
      </header>

      <main style={{ maxWidth:780, margin:"0 auto", padding:"2.5rem 1.4rem" }}>

        {/* ══ HOME ═════════════════════════════════════════════ */}
        {step === "home" && (
          <div className="fade">
            {/* Hero */}
            <div style={{ marginBottom:"3.5rem" }}>
              {/* Red accent line */}
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.5rem" }}>
                <div style={{ width:32, height:3, background:"#ff3131" }}/>
                <div style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.18em", color:"#ff3131" }}>
                  GENERADOR DE CONTENIDO EDITORIAL
                </div>
              </div>

              <h1 style={{
                fontWeight:900, fontSize:"clamp(2.2rem,6vw,4rem)",
                lineHeight:0.92, letterSpacing:"-0.025em",
                marginBottom:"1.4rem",
              }}>
                LA IA ACABA DE<br/>
                CAMBIAR LAS<br/>
                <span style={{ color:"#ff3131", WebkitTextStroke:"0px", position:"relative" }}>
                  REGLAS DEL JUEGO
                </span>
              </h1>

              {/* Divider with icon */}
              <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.4rem" }}>
                <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
                <MLIcon size={24} color="rgba(255,49,49,0.5)" />
                <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.1)" }}/>
              </div>

              <p style={{
                fontSize:"0.92rem", lineHeight:1.8, fontWeight:400,
                color:"rgba(255,255,255,0.55)", maxWidth:540, marginBottom:"2rem",
              }}>
                Escaneamos las noticias de IA de mayor impacto global y las convertimos
                en <span style={{color:"#fff",fontWeight:600}}>contenido editorial real</span> con
                la voz y el criterio de MediaLab LATAM — listo para gráfica, carrusel y video.
              </p>

              <div style={{ display:"flex", gap:"0.7rem", flexWrap:"wrap" }}>
                <button className="btn-primary" onClick={fetchNews}
                  style={{ fontSize:"0.82rem", padding:"0.85rem 1.8rem" }}>
                  <span>→</span> ESCANEAR NOTICIAS DE HOY
                </button>
                <button className="btn-ghost" onClick={() => setStep("news")}
                  style={{ fontSize:"0.78rem", padding:"0.85rem 1.4rem" }}>
                  INGRESAR TEMA PROPIO
                </button>
              </div>
            </div>

            {/* Format preview cards */}
            <div style={{ marginBottom:"1rem" }}>
              <div style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.16em", color:"rgba(255,255,255,0.25)", marginBottom:"1rem" }}>
                LO QUE GENERA EL AGENTE
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)" }}>
                {[
                  {
                    icon:"🖼️", label:"GRÁFICA",
                    items:["Titular de primera plana","Subtítulo + tensión","Copy 3 oraciones","Brief visual completo","7–9 hashtags estratégicos"],
                    accent:true,
                  },
                  {
                    icon:"📱", label:"CARRUSEL",
                    items:["6 slides con narrativa","Hecho → Escala → Quién gana → Quién pierde","Remate LATAM como posición","CTA que activa comentarios","Copy del post"],
                  },
                  {
                    icon:"🎬", label:"VIDEO",
                    items:["Guión beat a beat (62 seg)","Gancho que detiene el scroll","Dirección de producción","Copy del post","Remate LATAM como cierre"],
                  },
                ].map((f,i) => (
                  <div key={i} style={{
                    background:"#0a0130", padding:"1.4rem 1.1rem",
                    borderTop:`2px solid ${f.accent ? "#ff3131" : "transparent"}`,
                  }}>
                    <div style={{ fontSize:"1.5rem", marginBottom:"0.7rem" }}>{f.icon}</div>
                    <div style={{ fontWeight:800, fontSize:"0.72rem", letterSpacing:"0.1em", color:"#fff", marginBottom:"0.75rem" }}>{f.label}</div>
                    {f.items.map((item,j) => (
                      <div key={j} style={{ display:"flex", gap:"0.4rem", marginBottom:"0.3rem", alignItems:"flex-start" }}>
                        <span style={{ color:"#ff3131", fontSize:"0.6rem", marginTop:"0.15rem", flexShrink:0 }}>▸</span>
                        <span style={{ fontSize:"0.67rem", color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom manifesto line */}
            <div style={{
              marginTop:"2rem", padding:"1rem 1.2rem",
              border:"1px solid rgba(255,49,49,0.15)",
              borderLeft:"3px solid #ff3131",
              background:"rgba(255,49,49,0.04)",
            }}>
              <p style={{ fontSize:"0.78rem", fontStyle:"italic", color:"rgba(255,255,255,0.4)", lineHeight:1.7 }}>
                "La pregunta no es si la IA va a llegar a LATAM. La pregunta es si vamos a tener voz cuando llegue."
                <span style={{ display:"block", marginTop:"0.3rem", fontStyle:"normal", color:"rgba(255,255,255,0.2)", fontSize:"0.62rem", letterSpacing:"0.1em" }}>
                  — MEDIALAB LATAM
                </span>
              </p>
            </div>
          </div>
        )}

        {/* ══ LOADING ══════════════════════════════════════════ */}
        {step === "loading" && (
          <div className="fade" style={{ paddingTop:"5rem", textAlign:"center" }}>
            <div className="pulse" style={{ display:"flex", justifyContent:"center", marginBottom:"2.5rem" }}>
              <MLIcon size={72} color="#ff3131" />
            </div>

            <div style={{ fontWeight:900, fontSize:"1.6rem", letterSpacing:"-0.01em", marginBottom:"0.5rem" }}>
              {msg.toUpperCase()}
            </div>

            <div style={{ color:"#ff3131", fontWeight:700, fontSize:"1.2rem", letterSpacing:"0.2em", marginBottom:"2rem" }}>
              {dots}
            </div>

            {/* Scanning bar */}
            <div style={{ maxWidth:300, margin:"0 auto", height:2, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
              <div className="scan" style={{ height:"100%", background:"#ff3131" }}/>
            </div>
          </div>
        )}

        {/* ══ NEWS + INPUT ═════════════════════════════════════ */}
        {step === "news" && (
          <div className="fade">
            {news.length > 0 && (
              <div style={{ marginBottom:"2rem" }}>
                <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"1.2rem" }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.25rem" }}>
                      <div style={{ width:16, height:2, background:"#ff3131" }}/>
                      <span style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.16em", color:"#ff3131" }}>AGENDA EDITORIAL</span>
                    </div>
                    <h2 style={{ fontWeight:900, fontSize:"1.4rem", letterSpacing:"-0.01em" }}>
                      NOTICIAS DEL DÍA
                    </h2>
                  </div>
                  <div style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.25)", fontWeight:600, letterSpacing:"0.06em" }}>
                    {news.length} HISTORIAS ENCONTRADAS
                  </div>
                </div>

                {news.map((n, idx) => {
                  const cat = CAT[n.categoria] || CAT.general;
                  return (
                    <div key={n.id} className="news-card" onClick={() => pickNews(n)}>
                      <div style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                        {/* Number */}
                        <div style={{
                          fontWeight:900, fontSize:"1.8rem", color:"rgba(255,49,49,0.15)",
                          lineHeight:1, flexShrink:0, minWidth:"2rem", textAlign:"right",
                          fontVariantNumeric:"tabular-nums",
                        }}>
                          {String(idx+1).padStart(2,"0")}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.45rem", flexWrap:"wrap" }}>
                            <span className="tag" style={{ background:cat.color, color:"#fff" }}>{cat.label}</span>
                            {n.relevancia === "alta" && (
                              <span className="tag" style={{ border:"1px solid #ff3131", color:"#ff3131" }}>★ DESTACADA</span>
                            )}
                            <span style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.2)", fontWeight:600, letterSpacing:"0.05em" }}>
                              {n.fuente?.toUpperCase()} · {n.fecha}
                            </span>
                          </div>
                          <div style={{ fontWeight:700, fontSize:"0.9rem", color:"#fff", lineHeight:1.4, marginBottom:"0.4rem" }}>
                            {n.titulo}
                          </div>
                          <div style={{ fontSize:"0.76rem", color:"rgba(255,255,255,0.45)", lineHeight:1.6, marginBottom: n.impacto ? "0.4rem" : 0 }}>
                            {n.resumen}
                          </div>
                          {n.impacto && (
                            <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                              <span style={{ color:"#ff3131", fontSize:"0.65rem", fontWeight:700, flexShrink:0, marginTop:"0.05rem" }}>IMPACTO</span>
                              <span style={{ fontSize:"0.73rem", color:"rgba(255,255,255,0.6)", fontStyle:"italic", lineHeight:1.5 }}>{n.impacto}</span>
                            </div>
                          )}
                        </div>
                        <div style={{ color:"#ff3131", fontSize:"1.1rem", fontWeight:900, flexShrink:0, paddingTop:"0.2rem" }}>→</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Manual input */}
            <div style={{
              background:"rgba(15,1,71,0.5)",
              border:"1px solid rgba(255,49,49,0.2)",
              borderTop:"3px solid #ff3131",
              padding:"1.4rem",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.8rem" }}>
                <div style={{ width:12, height:2, background:"#ff3131" }}/>
                <span style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.16em", color:"rgba(255,255,255,0.4)" }}>
                  {news.length > 0 ? "O INGRESA TU PROPIA NOTICIA O TEMA" : "INGRESA UNA NOTICIA O TEMA"}
                </span>
              </div>
              <textarea rows={3}
                placeholder="Pegá el titular y resumen de la noticia, o describí el tema que querés cubrir..."
                value={topic}
                onChange={e => setTopic(e.target.value)}
              />
              <div style={{ marginTop:"0.9rem", display:"flex", gap:"0.55rem", flexWrap:"wrap", alignItems:"center" }}>
                <button className="btn-primary"
                  onClick={() => { if(topic.trim()) generate(topic); }}
                  disabled={!topic.trim()}
                  style={{ fontSize:"0.78rem", padding:"0.7rem 1.5rem" }}>
                  GENERAR CONTENIDO EDITORIAL →
                </button>
                <button className="btn-dark" onClick={fetchNews}
                  style={{ fontSize:"0.72rem", padding:"0.7rem 1.1rem" }}>
                  🔄 RE-ESCANEAR
                </button>
              </div>
            </div>

            {err && (
              <div style={{
                marginTop:"1rem", padding:"0.7rem 1rem",
                background:"rgba(255,49,49,0.07)", border:"1px solid rgba(255,49,49,0.25)",
                color:"#fca5a5", fontSize:"0.75rem", fontWeight:500,
              }}>⚠️ {err}</div>
            )}
          </div>
        )}

        {/* ══ RESULT ═══════════════════════════════════════════ */}
        {step === "result" && (
          <div className="fade">
            {/* Header */}
            <div style={{ marginBottom:"1.2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.3rem" }}>
                <div style={{ width:16, height:2, background:"#ff3131" }}/>
                <span style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.16em", color:"#ff3131" }}>CONTENIDO GENERADO</span>
              </div>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"0.8rem" }}>
                <h2 style={{ fontWeight:900, fontSize:"1.4rem", letterSpacing:"-0.01em" }}>
                  3 FORMATOS LISTOS
                </h2>
                <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                  <button className="btn-dark" onClick={handleCopy}
                    style={{ fontSize:"0.68rem", padding:"0.42rem 0.8rem" }}>
                    {copied ? "✓ COPIADO" : "📋 COPIAR TODO"}
                  </button>
                  <button className="btn-ghost" onClick={() => { setStep("news"); setPicked(null); }}
                    style={{ fontSize:"0.68rem", padding:"0.42rem 0.8rem" }}>← VOLVER</button>
                  <button className="btn-primary" onClick={reset}
                    style={{ fontSize:"0.68rem", padding:"0.42rem 0.8rem" }}>+ NUEVA NOTICIA</button>
                </div>
              </div>
            </div>

            {/* Source */}
            {picked && (
              <div style={{
                padding:"0.65rem 1rem", marginBottom:"1rem",
                background:"rgba(15,1,71,0.7)", borderLeft:"3px solid #ff3131",
                display:"flex", alignItems:"flex-start", gap:"0.6rem",
              }}>
                <span style={{ fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.1em", color:"#ff3131", flexShrink:0, paddingTop:"0.05rem" }}>NOTICIA BASE</span>
                <span style={{ fontSize:"0.76rem", color:"rgba(255,255,255,0.5)", lineHeight:1.5 }}>{picked.titulo}</span>
              </div>
            )}

            {/* Tabs */}
            <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)", marginBottom:0, display:"flex" }}>
              {tabs.map(t => (
                <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setTab(t.id)}>
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ borderTop:"none" }}>
              <div className="result-content">
                <ResultView text={sections[activeTab] || result} />
              </div>
              <div style={{
                padding:"0.5rem 1rem", background:"#0f0147",
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                  <MLIcon size={16} color="#ff3131" />
                  <span style={{ fontSize:"0.58rem", color:"rgba(255,255,255,0.2)", fontWeight:600, letterSpacing:"0.08em" }}>
                    GENERADO CON IA · MEDIALAB LATAM
                  </span>
                </div>
                <span style={{ fontSize:"0.58rem", color:"rgba(255,255,255,0.15)", fontWeight:600, letterSpacing:"0.06em" }}>
                  REVISAR ANTES DE PUBLICAR
                </span>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
