# MediaLab LATAM — Agente Editorial IA

Generador de contenido editorial para redes sociales impulsado por Claude (Anthropic). Produce gráfica, carrusel y guión de video con la voz editorial de MediaLab LATAM.

## Stack

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **IA:** Anthropic Claude (`claude-sonnet-4-6`) con web search

## Estructura

```
medialab-agent/
├── backend/
│   ├── server.js        # API Express (POST /api/generate, POST /api/search)
│   └── package.json
├── frontend/
│   ├── src/App.jsx      # Componente principal React
│   ├── index.html
│   └── package.json
├── package.json         # Scripts raíz (dev, build, start)
└── .env.example
```

## Correr localmente

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd medialab-agent
npm install          # instala deps de root, backend y frontend automáticamente
```

### 2. Configurar variables de entorno

```bash
cp backend/.env.example backend/.env
```

Editá `backend/.env` y agregá tu API key de Anthropic:

```
ANTHROPIC_API_KEY=sk-ant-api03-...
PORT=3001
```

Conseguís tu API key en: https://console.anthropic.com/

### 3. Correr en modo desarrollo

```bash
npm run dev
```

Esto levanta en paralelo:
- Backend en `http://localhost:3001`
- Frontend en `http://localhost:5173`

El frontend proxea automáticamente `/api/*` al backend (configurado en `vite.config.js`).

---

## Deploy en Railway

### Prerequisitos
- Cuenta en [Railway](https://railway.app)
- Repo subido a GitHub

### Pasos

1. **Crear nuevo proyecto en Railway**
   - New Project → Deploy from GitHub repo → seleccioná este repo

2. **Agregar variable de entorno**
   - En Railway: Settings → Variables → Add Variable
   - `ANTHROPIC_API_KEY` = `sk-ant-api03-...`

3. **Configurar Build & Start**
   Railway detecta el `package.json` raíz. Verificá que en Settings → Deploy tenga:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`

4. **Deploy**
   Railway ejecuta:
   - `npm install` → instala todo (root + backend + frontend via `postinstall`)
   - `npm run build` → compila el frontend con Vite
   - `npm start` → levanta Express, que sirve el frontend compilado + la API

5. **Listo**
   Railway provee una URL pública automáticamente (ej: `https://medialab-agent.up.railway.app`).

### Variables de entorno en Railway

| Variable | Descripción | Requerida |
|---|---|---|
| `ANTHROPIC_API_KEY` | API key de Anthropic | Sí |
| `PORT` | Puerto (Railway lo setea automáticamente) | No |
| `NODE_ENV` | Railway la setea en `production` automáticamente | No |

---

## Endpoints de la API

### `POST /api/generate`

Genera contenido editorial para gráfica, carrusel y video.

**Body:**
```json
{ "topic": "Titular y resumen de la noticia..." }
```

**Response:**
```json
{ "text": "### 🖼️ GRÁFICA\n..." }
```

### `POST /api/search`

Busca las noticias de IA más relevantes de las últimas 48h usando web search.

**Body:** `{}`

**Response:**
```json
{
  "noticias": [
    {
      "id": 1,
      "titulo": "...",
      "resumen": "...",
      "impacto": "...",
      "fuente": "...",
      "categoria": "medios",
      "relevancia": "alta",
      "fecha": "hace 3 horas"
    }
  ]
}
```

---

## Notas

- El backend requiere **Node.js >= 18** (usa `fetch` nativo y `node --watch`).
- En desarrollo, editá `backend/server.js` — el servidor se reinicia automáticamente.
- El `SYSTEM` prompt editorial y el `SEARCH_PROMPT` viven en `backend/server.js`.
- Revisá siempre el contenido generado antes de publicar.
