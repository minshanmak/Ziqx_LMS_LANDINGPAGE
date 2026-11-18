import { NextResponse } from 'next/server';
import { validateContact, type ContactPayload } from '@/marketing/contactValidation';

export const runtime = 'nodejs';

/**
 * Contact form endpoint.
 *
 * Forwards validated submissions to CONTACT_WEBHOOK_URL (server-only env var). That URL can be a
 * form-to-email service, a CRM inbound webhook or an internal support endpoint.
 *
 * If CONTACT_WEBHOOK_URL is not set, the endpoint returns 503 `not_configured`. It never reports
 * success without delivering the message.
 */
export async function POST(request: Request) {
  let body: Partial<ContactPayload> & { website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: 'invalid_body', message: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real users leave this field empty. Pretend success so bots get no signal.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: 'validation', errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { ok: false, code: 'not_configured', message: 'The contact form is not connected yet.' },
      { status: 503 },
    );
  }

  const payload = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    organization: (body.organization ?? '').trim(),
    enquiryType: body.enquiryType,
    message: body.message!.trim(),
    source: 'ziqx-marketing-site',
    receivedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, code: 'upstream', message: 'We could not send your message. Please try again.' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, code: 'upstream', message: 'We could not send your message. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
