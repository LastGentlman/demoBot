import {
  ArrowRight,
  Bot,
  Cable,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import ChatWidget from "@/components/chat-widget";

const stats = [
  { label: "Tiempo medio de respuesta", value: "< 2 seg" },
  { label: "Tickets automatizados", value: "92%" },
  { label: "Ahorro operativo", value: "35%" },
];

const differentiators = [
  {
    title: "Onboarding guiado",
    description:
      "Mapeamos tus flujos críticos en minutos y entrenamos al agente con el contenido verificado de tu equipo.",
    icon: Sparkles,
    pill: "Autonomía",
  },
  {
    title: "Control total",
    description:
      "Cada respuesta queda auditada con trazabilidad, reglas de fallback y alertas para humanos.",
    icon: ShieldCheck,
    pill: "Governance",
  },
  {
    title: "Conexión nativa",
    description:
      "Se integra con tu agente de n8n mediante un webhook aislado y firmado para mantener tus datos internos seguros.",
    icon: Cable,
    pill: "Integraciones",
  },
];

const workflowSteps = [
  {
    title: "Conecta n8n",
    description:
      "Exponemos un único webhook firmado y limitado por IP para hablar con tu agente existente en n8n.",
  },
  {
    title: "Orquesta respuestas",
    description:
      "Definimos intenciones, entonación y límites de confianza para que el agente resuelva tickets sin supervisión.",
  },
  {
    title: "Despliega en Vercel",
    description:
      "Listo para producción con CI en Vercel, métricas en tiempo real y reglas de actualización blue/green.",
  },
];

const securityHighlights = [
  "Capa CSP estricta, HSTS y aislamiento por dominio.",
  "Webhook firmado y envío sólo en modo POST con JSON esquema validado.",
  "Sin cookies ni almacenamiento local: los mensajes viven en memoria.",
  "Logs anonimizados y redactados antes de abandonar el navegador.",
];

const useCases = [
  "Soporte 24/7 para e-commerce y SaaS B2B.",
  "Onboarding asistido para nuevos clientes y training interno.",
  "Captura de leads cualificados con traspaso automático a CRM.",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(15,23,42,0.8),_rgba(2,6,23,0.95))]" />
      </div>

      <ChatWidget />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-16 sm:gap-20 sm:px-6 sm:pb-28 sm:pt-20 lg:gap-24 lg:px-8 lg:pb-32">
        <section className="text-center">
          <div className="mx-auto mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/70 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Security first · listo para Vercel
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50 sm:text-sm sm:tracking-[0.6em]">
            demoBot · agente AI de atención al cliente
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Responde como tu mejor agente, las 24 horas, con el motor de
            automatización de n8n.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
            Orquesta bots, humanos y flujos en n8n desde una sola landing page.
            demoBot verifica cada respuesta con reglas de seguridad antes de
            enviarla al cliente.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <a
              href="https://vercel.com/new"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:w-auto"
            >
              Lanzar demo en Vercel
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#workflow"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 sm:w-auto"
            >
              Ver cómo se conecta con n8n
            </a>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl bg-white/5 p-6 text-center ring-1 ring-white/10 sm:grid-cols-3 sm:p-8 sm:text-left">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="sm:border-l sm:border-white/10 sm:pl-6 first:sm:border-l-0 first:sm:pl-0"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 md:grid-cols-[minmax(0,_1.1fr)_minmax(0,_0.9fr)] lg:grid-cols-[1.3fr,_0.7fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-emerald-500/10 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80 sm:text-sm sm:tracking-[0.4em]">
              Diferenciales
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Diseñado junto a equipos de soporte exigentes.
            </h2>
            <div className="mt-8 space-y-6">
              {differentiators.map(({ icon: Icon, title, description, pill }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      {pill}
                    </span>
                    <p className="text-lg font-semibold text-white">{title}</p>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <article className="rounded-3xl border border-emerald-400/30 bg-slate-950/40 p-5 sm:p-6">
              <div className="flex items-center gap-3 text-emerald-200">
                <Bot className="h-5 w-5" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm sm:tracking-[0.4em]">
                  Casos de uso
                </p>
              </div>
              <ul className="mt-6 space-y-4 text-sm text-white/70">
                {useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300"
                      aria-hidden
                    />
                    {useCase}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 sm:p-6">
              <div className="flex items-center gap-3 text-white/70">
                <Lock className="h-5 w-5" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm sm:tracking-[0.4em]">
                  Seguridad activa
                </p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {securityHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section
          id="workflow"
          className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
              Integración
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Conecta tu agente de n8n sin exponer tu stack.
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Creamos un chat embebido que habla con tu workflow de n8n mediante
              un webhook mínimo. Añade controles de IP allow-list, firma HMAC y
              límites de rate desde el panel.
            </p>
          </div>
          <div className="space-y-4 lg:col-span-2">
            {workflowSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-base font-semibold text-white sm:text-lg">{step.title}</p>
                  <p className="text-sm text-white/70 sm:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 via-slate-950 to-blue-600/10 p-6 text-center sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
            Monitoreo continuo
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Observa cada conversación en tiempo real.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Dashboards con métricas de latencia, satisfacción y triggers de
            fallback. Exporta eventos a tu SIEM en segundos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/80">
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 sm:w-auto sm:justify-start">
              <Workflow className="h-4 w-4" aria-hidden />
              Auditoría de flujos
            </span>
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 sm:w-auto sm:justify-start">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Alertas en tiempo real
            </span>
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 sm:w-auto sm:justify-start">
              <Cable className="h-4 w-4" aria-hidden />
              Webhook firmado
            </span>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">¿Listo para probar?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            Despliega esta landing en Vercel, conecta tu agente de n8n y prueba
            el chat seguro en menos de 10 minutos. Incluimos script de despliegue,
            métricas y checklist de seguridad.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <a
              href="mailto:security@demobot.ai?subject=Quiero%20probar%20demoBot"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:w-auto"
            >
              Hablar con el equipo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <p className="text-sm text-white/60 sm:w-auto sm:text-left">
              Sin tarjeta · Cancelas cuando quieras
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
