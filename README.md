# demoBot · Landing AI + n8n

Landing page en Next.js 16 que demuestra un agente de atención al cliente conectado a un flujo de n8n. Incluye un chat embebido, enfoque security-first y está optimizada para desplegarse en Vercel sin ajustes adicionales.

## Características principales

- 🎯 Hero, métricas, casos de uso e integración paso a paso con n8n.
- 💬 Chat flotante que envía mensajes a tu agente mediante un webhook dedicado.
- 🛡️ Cabeceras de seguridad (CSP, HSTS, Permissions-Policy, XFO, etc.) y cero cookies.
- ⚙️ Código en TypeScript, Tailwind v4 y fuentes Geist listas para producción.

## Requisitos

- Node.js ≥ 18.18
- npm (incluido con Node)
- URL pública de webhook en n8n (puede ser Cloud o self-hosted)

## Variables de entorno

Copia el archivo de ejemplo y actualiza tu URL:

```bash
cp .env.local.example .env.local
```

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Webhook público del flujo en n8n que procesará los mensajes del chat. Debe aceptar solicitudes `POST` con payload JSON `{ message, source, locale, timestamp }`. |

> El chat valida la URL durante el build y mostrará un aviso si no está configurada.

## Desarrollo local

```bash
npm install
npm run dev
```

Visita `http://localhost:3000` y utiliza el chat flotante. Para cerrar la ventana usa el botón con el icono `X`.

## Integración con n8n

1. Crea un workflow en n8n que comience con un **Webhook Trigger**.
2. Copia la URL pública y colócala en `NEXT_PUBLIC_N8N_WEBHOOK_URL`.
3. Asegúrate de devolver un JSON con el campo `reply` (string) para que el chat lo muestre.
4. Opcional: añade firma HMAC, allow-list de IPs o rate limits directamente en n8n; el front ya envía metadata como `source` y `timestamp`.

## Seguridad incluida

- **CSP estricta** con `frame-ancestors 'none'`, `base-uri 'self'` y `connect-src` limitado al dominio del webhook.
- **HSTS** (2 años + preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Permissions-Policy` mínima.
- El chat mantiene los mensajes sólo en memoria (sin `localStorage` ni cookies) y recorta la entrada del usuario para evitar payloads maliciosos.
- Validación del JSON de respuesta usando `zod` antes de mostrarlo en el UI.

## Despliegue en Vercel

1. Haz fork del repositorio y conéctalo en el panel de Vercel.
2. Configura la variable `NEXT_PUBLIC_N8N_WEBHOOK_URL` en **Project Settings → Environment Variables**.
3. Deploy: `npm run build && npm start` (Vercel lo ejecuta automáticamente).

> La cabecera CSP se genera en build time; si cambias la URL del webhook recuerda redeployar.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run lint` | Ejecuta ESLint con la configuración oficial de Next.js. |
| `npm run build` | Compila la app para producción. |
| `npm start` | Sirve la build optimizada (usado por Vercel). |

---

¿Necesitas adaptar la landing a otro idioma, branding o más integraciones? Añade tus componentes en `src/components` y extiende `src/app/page.tsx`. El chat puede reusarse en cualquier otra página importando `ChatWidget`. ¡Buen deploy! 
