/**
 * ELVION contact form handler — Vercel Serverless Function.
 *
 * Receives the contact form POST and relays it to the ELVION inbox via Resend.
 * No dependencies: uses the built-in fetch, so the site keeps its zero-install,
 * no-build-step setup.
 *
 * Environment variables (set in the Vercel dashboard — never in frontend files):
 *   RESEND_API_KEY  required. Server-side only.
 *   CONTACT_TO      optional. Defaults to the verified ELVION address below.
 *   CONTACT_FROM    optional. Must be an address on a Resend-verified domain.
 */

// Verified ELVION contact address (see DESIGN.md and the JSON-LD on every page).
const DEFAULT_TO = 'saleselvion@gmail.com';

// Until elvionbulb.com is verified in Resend, their shared sender is the only
// address allowed to send, and it can only deliver to the account owner.
const DEFAULT_FROM = 'ELVION Website <onboarding@resend.dev>';

const MIN_FILL_SECONDS = 3;        // faster than this is a bot, not a clinician
const RATE_LIMIT_MAX = 5;          // submissions per IP...
const RATE_LIMIT_WINDOW_MS = 600000; // ...per 10 minutes

const LIMITS = { name: 100, clinic: 120, email: 200, device: 120, message: 5000 };

/**
 * Best-effort in-memory rate limiting. Serverless instances are ephemeral and
 * may run in parallel, so this thins out floods rather than guaranteeing a cap.
 * The honeypot and timing checks are the primary spam defence.
 */
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

/** Escape user input before it goes anywhere near an HTML email body. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Strip CR/LF so user input can never inject extra mail headers. */
function singleLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
  const name = String(body.name || '').trim();
  const clinic = String(body.clinic || '').trim();
  const email = String(body.email || '').trim();
  const device = String(body.device || '').trim();
  const message = String(body.message || '').trim();

  // --- Spam layer 1: honeypot. Bots fill it; the field is hidden from humans.
  // Answer 200 so the bot believes it succeeded and does not retry.
  if (String(body.website || '').trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  // --- Spam layer 2: timing. A real person cannot complete this in 3 seconds.
  const elapsed = (Date.now() - Number(body.t || 0)) / 1000;
  if (!body.t || Number.isNaN(elapsed) || elapsed < MIN_FILL_SECONDS) {
    return res.status(200).json({ ok: true });
  }

  // --- Spam layer 3: rate limit per IP.
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many messages from this connection. Please try again shortly.',
    });
  }

  // --- Server-side validation. The browser's checks are a convenience only;
  // anything can POST here directly, so nothing from the client is trusted.
  const errors = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!message) errors.message = 'Please enter a message.';

  for (const [field, max] of Object.entries(LIMITS)) {
    const value = { name, clinic, email, device, message }[field];
    if (value && value.length > max) errors[field] = `This field is too long (max ${max} characters).`;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, error: 'Please check the highlighted fields.', errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — cannot send contact form email.');
    return res.status(500).json({
      ok: false,
      error: "Sorry — we couldn't send your message. Please email or call us directly.",
    });
  }

  const to = process.env.CONTACT_TO || DEFAULT_TO;
  const from = process.env.CONTACT_FROM || DEFAULT_FROM;

  const rows = [
    ['Name', name],
    ['Clinic / practice', clinic || '—'],
    ['Email', email],
    ['Device model', device || '—'],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6B7280;">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;color:#10151C;"><strong>${escapeHtml(value)}</strong></td></tr>`
    )
    .join('');

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:600px;">
      <p style="color:#6B7280;font-size:13px;margin:0 0 4px;">New enquiry from elvionbulb.com</p>
      <h2 style="color:#10151C;margin:0 0 16px;">Contact form message</h2>
      <table style="border-collapse:collapse;font-size:15px;">${rows}</table>
      <p style="color:#6B7280;font-size:13px;margin:20px 0 4px;">Message</p>
      <div style="white-space:pre-wrap;color:#10151C;font-size:15px;line-height:1.6;
                  border-left:3px solid #D8A84A;padding-left:14px;">${escapeHtml(message)}</div>
      <p style="color:#6B7280;font-size:12px;margin-top:24px;">
        Reply directly to this email to answer ${escapeHtml(email)}.
      </p>
    </div>`;

  const text =
    `New enquiry from elvionbulb.com\n\n` +
    `Name: ${name}\nClinic: ${clinic || '—'}\nEmail: ${email}\nDevice: ${device || '—'}\n\n` +
    `Message:\n${message}\n`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email, // replying in Gmail goes straight back to the customer
        subject: singleLine(`ELVION enquiry — ${name}${device ? ` (${device})` : ''}`),
        html,
        text,
      }),
    });

    if (!response.ok) {
      // Log server-side for diagnosis; never expose provider detail to the browser.
      console.error('Resend rejected the message:', response.status, await response.text());
      return res.status(502).json({
        ok: false,
        error: "Sorry — we couldn't send your message. Please email or call us directly.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form send failed:', err);
    return res.status(500).json({
      ok: false,
      error: "Sorry — we couldn't send your message. Please email or call us directly.",
    });
  }
};
