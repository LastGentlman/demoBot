"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { MessageCircleMore, Send, ShieldCheck, X } from "lucide-react";
import clsx from "clsx";
import { z } from "zod";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

const replySchema = z
  .object({
    reply: z.string().min(1).max(2000),
  })
  .catchall(z.unknown());

const sanitizeText = (value: string) =>
  value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

const buildId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  const panelId = "demobot-chat-panel";

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: buildId(),
      role: "assistant",
      content:
        "Hola 👋 Soy demoBot. ¿En qué puedo ayudarte con la atención al cliente?",
    },
  ]);

  const secureInput = useMemo(() => sanitizeText(input).slice(0, 800), [input]);

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!secureInput || isSending) return;

    const nextMessage: Message = {
      id: buildId(),
      role: "user",
      content: secureInput,
    };

    setMessages((prev) => [...prev, nextMessage]);
    setInput("");

    if (!webhookUrl) {
      setMessages((prev) => [
        ...prev,
        {
          id: buildId(),
          role: "system",
          content:
            "Configura NEXT_PUBLIC_N8N_WEBHOOK_URL para conectar el chat con tu agente en n8n.",
        },
      ]);
      return;
    }

    setIsSending(true);
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: secureInput,
          source: "landing-chat",
          locale: "es-ES",
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      const data = await response.json().catch(() => ({ reply: "" }));
      const parsed = replySchema.safeParse(data);
      const reply = parsed.success
        ? sanitizeText(parsed.data.reply)
        : "Gracias por escribir. En breve un humano continuará la conversación.";

      setMessages((prev) => [
        ...prev,
        {
          id: buildId(),
          role: "assistant",
          content: reply || "Estoy aquí para ayudarte.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: buildId(),
          role: "system",
          content:
            "No pudimos conectar con el agente. Revisa la red o inténtalo más tarde.",
        },
      ]);
    } finally {
      setIsSending(false);
      controllerRef.current = null;
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Abrir chat con demoBot"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl ring-4 ring-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:bottom-8 sm:right-8"
      >
        <MessageCircleMore className="h-6 w-6" aria-hidden />
      </button>

      <div
        id={panelId}
        className={clsx(
          "pointer-events-none fixed bottom-24 right-4 z-40 w-[calc(100%-2rem)] max-w-sm scale-95 opacity-0 transition-all duration-200 ease-out sm:bottom-28 sm:right-8 sm:max-w-md md:bottom-32 md:right-12",
          isOpen && "pointer-events-auto scale-100 opacity-100",
        )}
        aria-hidden={!isOpen}
        aria-live="polite"
      >
        <div className="flex flex-col overflow-hidden rounded-3xl bg-slate-950/80 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                demoBot
              </p>
              <p className="text-xs text-white/50">
                Agente AI · En línea las 24h
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar ventana de chat"
              className="rounded-full p-1 text-white/60 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="flex max-h-[min(60vh,_20rem)] flex-col gap-3 overflow-y-auto px-5 py-4 text-sm leading-relaxed scroll-smooth sm:max-h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={clsx(
                  "max-w-[90%] rounded-2xl px-4 py-3",
                  message.role === "user" &&
                    "self-end bg-emerald-500/20 text-white",
                  message.role === "assistant" &&
                    "self-start bg-white/10 text-white",
                  message.role === "system" &&
                    "self-center bg-white/5 text-white/70",
                )}
              >
                {message.content}
              </div>
            ))}
          </div>

            <div className="flex items-center gap-2 px-5 pb-2 text-xs text-white/50">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Canal cifrado y aislado de n8n
            </div>

          <form
            onSubmit={handleSend}
            className="flex flex-col gap-2 border-t border-white/5 px-4 py-3 sm:flex-row sm:items-center"
          >
            <label htmlFor="chat-input" className="sr-only">
              Escribe tu mensaje
            </label>
            <input
              id="chat-input"
              name="message"
              autoComplete="off"
              maxLength={800}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 rounded-2xl border border-transparent bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-emerald-400/80 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!secureInput || isSending}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-500 text-white transition enabled:hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
            >
              <Send className="h-4 w-4" aria-hidden />
              <span className="sr-only">Enviar mensaje</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatWidget;
