'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = 'user' | 'assistant';

interface Message {
  id: string;
  role: Role;
  text: string;
  isError?: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const WA_NUMBER = '628118681678'; // TODO: ganti nomor WA sales Ginnva Indonesia
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo, saya ingin bertanya lebih lanjut tentang produk Ginnva.')}`;

const DISCLAIMER: Message = {
  id: 'disclaimer',
  role: 'assistant',
  text: '⚠️ Perlu diketahui: Saya adalah asisten AI dan jawaban saya mungkin tidak selalu akurat. Untuk informasi resmi atau pemesanan, silakan hubungi tim kami via [WhatsApp].',
};

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  text: 'Halo! Saya Asisten Ginnva 👋\n\nSaya siap membantu seputar produk PPF, Window Film, garansi, dan perawatan film Ginnva.\n\nAda yang bisa saya bantu?',
};

const SUGGESTIONS = [
  'Apa itu PPF?',
  'Garansi Window Film berapa lama?',
  'Cara merawat PPF?',
  'Bagaimana cara klaim garansi?',
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([DISCLAIMER, WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isInitial = messages.length === 2;

  // Scroll ke atas saat pertama buka, ke bawah saat ada pesan baru
  useEffect(() => {
    if (isInitial) {
      topRef.current?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    } else {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isInitial]);

  // Fokus input saat panel dibuka
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';

    const userMsg: Message = { id: `u_${Date.now()}`, role: 'user', text: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true);

    const history = nextMessages
      .filter((m) => m.id !== 'welcome' && m.id !== 'disclaimer' && !m.isError)
      .map((m) => ({ role: m.role, content: m.text }));

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error('server_error');
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: `a_${Date.now()}`, role: 'assistant', text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e_${Date.now()}`,
          role: 'assistant',
          isError: true,
          text: 'Maaf, terjadi gangguan. Silakan coba lagi atau hubungi kami via WhatsApp.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showSuggestions = messages.length === 2;

  return (
    <>
      {/* ── Panel ──────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          bottom: 88,
          right: 24,
          width: 360,
          maxWidth: 'calc(100vw - 32px)',
          height: 520,
          maxHeight: 'calc(100vh - 120px)',
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 8px 48px rgba(0,0,0,.18)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 300,
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          transition: 'opacity .22s ease, transform .22s ease, visibility .22s',
          transformOrigin: 'bottom right',
        }}
        aria-hidden={!open}
      >
        {/* Header panel */}
        <div
          style={{
            background: 'var(--accent, #ed1651)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 15,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              G
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
                Asisten Ginnva
              </div>
              <div style={{ color: 'rgba(255,255,255,.75)', fontSize: 11 }}>
                AI · Produk &amp; Garansi
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Tombol WA */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                background: '#25d366',
                color: '#fff',
                borderRadius: 99,
                padding: '5px 10px',
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Sales
            </a>
            {/* Tombol tutup */}
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,.15)',
                border: 'none',
                color: '#fff',
                width: 28,
                height: 28,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
              }}
              aria-label="Tutup chat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Message list */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            background: '#f7f8fc',
          }}
        >
          <div ref={topRef} />
          {messages.map((msg) =>
            msg.role === 'user' ? (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    background: 'var(--accent, #ed1651)',
                    color: '#fff',
                    borderRadius: '16px 16px 4px 16px',
                    padding: '9px 13px',
                    maxWidth: '78%',
                    fontSize: 13,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-end', gap: 7 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'var(--accent, #ed1651)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  G
                </div>
                <div
                  style={{
                    background: msg.isError ? '#fde8e8' : msg.id === 'disclaimer' ? '#fff8e1' : '#fff',
                    color: msg.isError ? '#dc2626' : '#333',
                    borderRadius: '16px 16px 16px 4px',
                    padding: '9px 13px',
                    maxWidth: '78%',
                    fontSize: 13,
                    lineHeight: 1.5,
                    boxShadow: '0 1px 4px rgba(0,0,0,.07)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.id === 'disclaimer' ? (
                    <>
                      ⚠️ Perlu diketahui: Saya adalah asisten AI dan jawaban saya mungkin tidak selalu akurat. Untuk informasi resmi atau pemesanan, silakan hubungi tim kami via{' '}
                      <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', fontWeight: 700, textDecoration: 'none' }}>
                        WhatsApp
                      </a>
                      .
                    </>
                  ) : msg.text}
                </div>
              </div>
            )
          )}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'var(--accent, #ed1651)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                G
              </div>
              <div
                style={{
                  background: '#fff',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '10px 14px',
                  boxShadow: '0 1px 4px rgba(0,0,0,.07)',
                  display: 'flex',
                  gap: 5,
                  alignItems: 'center',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#999',
                      animation: `ginnva-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Suggested questions */}
          {showSuggestions && !loading && (
            <div style={{ marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#999', marginBottom: 6 }}>
                Pertanyaan umum:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      background: '#fff',
                      border: '1px solid #e6e6e6',
                      borderRadius: 99,
                      padding: '5px 11px',
                      fontSize: 12,
                      color: 'var(--accent, #ed1651)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      lineHeight: 1.4,
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div
          style={{
            padding: '10px 12px',
            borderTop: '1px solid #e6e6e6',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
            background: '#fff',
            flexShrink: 0,
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pertanyaan... (Enter untuk kirim)"
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              border: '1px solid #e6e6e6',
              borderRadius: 12,
              padding: '9px 12px',
              fontSize: 13,
              color: '#333',
              background: '#f7f8fc',
              outline: 'none',
              fontFamily: 'inherit',
              lineHeight: 1.5,
              overflowY: 'hidden',
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background:
                !input.trim() || loading ? '#ccc' : 'var(--accent, #ed1651)',
              border: 'none',
              cursor: !input.trim() || loading ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background .15s',
            }}
            aria-label="Kirim pesan"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Floating Bubble ──────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Tutup asisten' : 'Buka asisten Ginnva'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--accent, #ed1651)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(237,22,81,.45)',
          transition: 'transform .2s, box-shadow .2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
      >
        {/* Icon: chat saat tutup, X saat buka */}
        <div
          style={{
            position: 'relative',
            width: 24,
            height: 24,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
            style={{
              position: 'absolute',
              inset: 0,
              transition: 'opacity .2s, transform .2s',
              opacity: open ? 0 : 1,
              transform: open ? 'rotate(90deg) scale(0.5)' : 'rotate(0) scale(1)',
            }}
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
            style={{
              position: 'absolute',
              inset: 0,
              transition: 'opacity .2s, transform .2s',
              opacity: open ? 1 : 0,
              transform: open ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.5)',
            }}
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </div>
      </button>

      {/* Keyframe animasi typing dots — injected sekali */}
      <style>{`
        @keyframes ginnva-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: .4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}