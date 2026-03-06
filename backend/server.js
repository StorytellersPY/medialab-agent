require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ─── CONSTANTS ──────────────────────────────────────────────────
const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";

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

// ─── ANTHROPIC HELPER ────────────────────────────────────────────
async function callAnthropic(payload, { beta } = {}) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY no configurada");
  }

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
  };
  if (beta) headers["anthropic-beta"] = beta;

  const response = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }
  return response.json();
}

// ─── ROUTES ──────────────────────────────────────────────────────

// POST /api/generate
// Body: { topic: string }
// Returns: { text: string }
app.post("/api/generate", async (req, res) => {
  const { topic } = req.body || {};
  if (!topic?.trim()) {
    return res.status(400).json({ error: "El campo 'topic' es requerido" });
  }

  try {
    const data = await callAnthropic(
      {
        model: MODEL,
        max_tokens: 2048,
        system: [
          {
            type: "text",
            text: SYSTEM,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: [
          {
            role: "user",
            content: `Genera el contenido completo para los 3 formatos sobre esta noticia:\n\n${topic}\n\nRecordá: aplicá la metodología editorial completa de MediaLab. El remate LATAM va al final como posición editorial, no como dato. La voz es directa y toma partido.`,
          },
        ],
      },
      { beta: "prompt-caching-2024-07-31" }
    );

    const text = data.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    res.json({ text });
  } catch (err) {
    console.error("[/api/generate]", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/search
// Body: {} (no body required)
// Returns: { noticias: [...] }
app.post("/api/search", async (req, res) => {
  try {
    const data = await callAnthropic(
      {
        model: MODEL,
        max_tokens: 4096,
        messages: [{ role: "user", content: SEARCH_PROMPT }],
        tools: [{ type: "web_search_20250305", name: "web_search" }],
      },
      { beta: "web-search-2025-03-05" }
    );

    console.log("[/api/search] stop_reason:", data.stop_reason);
    console.log("[/api/search] content types:", data.content?.map((b) => b.type).join(", "));

    const raw = data.content
      ?.filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("") || "";
    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    res.json(parsed);
  } catch (err) {
    console.error("[/api/search]", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── STATIC (PRODUCTION) ─────────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  const DIST = path.join(__dirname, "../frontend/dist");
  app.use(express.static(DIST));
  app.get("*", (req, res) => {
    res.sendFile(path.join(DIST, "index.html"));
  });
}

// ─── START ───────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`MediaLab Agent backend → http://localhost:${PORT}`);
});
