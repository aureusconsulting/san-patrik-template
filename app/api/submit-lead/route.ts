import { NextRequest, NextResponse } from 'next/server';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeadPayload {
  fullName:       string;
  email:          string;
  phone:          string;
  country:        string;
  villaType:      string;
  message?:       string;
  recaptchaToken: string;
  utm_source?:    string;
  utm_medium?:    string;
  utm_campaign?:  string;
  utm_content?:   string;
}

// ─── reCAPTCHA verification ───────────────────────────────────────────────────

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return true; // skip in dev if not configured

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    `secret=${secret}&response=${token}`,
  });
  const data = await res.json() as { success: boolean; score: number };
  return data.success && data.score >= 0.5;
}

// ─── HubSpot contact creation ─────────────────────────────────────────────────

// Update these labels to match the villa types for this project
const VILLA_LABEL: Record<string, string> = {
  'type-1': 'PLACEHOLDER_VILLA_1_NAME',
  'type-2': 'PLACEHOLDER_VILLA_2_NAME',
  'type-3': 'PLACEHOLDER_VILLA_3_NAME',
  'type-4': 'PLACEHOLDER_VILLA_4_NAME',
  'unsure': 'Not sure yet',
};

async function createHubSpotContact(payload: LeadPayload): Promise<void> {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) {
    console.warn('[submit-lead] HUBSPOT_TOKEN not set — skipping CRM');
    return;
  }

  const [firstName, ...rest] = payload.fullName.trim().split(' ');
  const lastName = rest.join(' ') || '';

  // 1. Create contact — standard properties only (description is a Company field, not Contact)
  const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      properties: {
        firstname: firstName,
        lastname:  lastName,
        email:     payload.email,
        phone:     payload.phone,
        country:   payload.country,
      },
    }),
  });

  if (!contactRes.ok) {
    if (contactRes.status === 409) {
      console.log('[submit-lead] HubSpot: contact already exists for', payload.email);
    } else {
      console.error('[submit-lead] HubSpot contact error:', contactRes.status, await contactRes.text());
    }
    return;
  }

  const contact = await contactRes.json() as { id: string };
  console.log('[submit-lead] HubSpot contact created:', contact.id, 'for', payload.email);

  // 2. Attach a note with villa interest + message + UTMs
  const noteLines = [
    `Villa Interest: ${VILLA_LABEL[payload.villaType] ?? payload.villaType}`,
    payload.message     ? `Message: ${payload.message}`                                                           : null,
    payload.utm_source  ? `Source: ${payload.utm_source} / ${payload.utm_medium ?? '—'} / ${payload.utm_campaign ?? '—'}` : null,
    'Lead Source: PLACEHOLDER_PROJECT_TITLE Landing Page',
  ].filter(Boolean).join('\n');

  const noteRes = await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      properties: {
        hs_note_body: noteLines,
        hs_timestamp: new Date().toISOString(),
      },
      associations: [{
        to:    { id: contact.id },
        types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
      }],
    }),
  });

  if (!noteRes.ok) {
    // Note failure is non-critical — contact was already created
    console.error('[submit-lead] HubSpot note error:', noteRes.status, await noteRes.text());
  } else {
    console.log('[submit-lead] HubSpot note attached to contact', contact.id);
  }
}

// ─── Email notification via Resend ────────────────────────────────────────────

async function sendNotificationEmail(payload: LeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[submit-lead] RESEND_API_KEY not set — skipping email');
    return;
  }

  const html = `
    <h2 style="color:#0D2137;font-family:sans-serif;">New Lead — PLACEHOLDER_PROJECT_TITLE</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:bold;">Name</td><td style="padding:6px 0;">${payload.fullName}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:bold;">Email</td><td style="padding:6px 0;"><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:bold;">Phone</td><td style="padding:6px 0;"><a href="tel:${payload.phone}">${payload.phone}</a></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:bold;">Country</td><td style="padding:6px 0;">${payload.country}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:bold;">Villa Interest</td><td style="padding:6px 0;">${VILLA_LABEL[payload.villaType] ?? payload.villaType}</td></tr>
      ${payload.message ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:bold;">Message</td><td style="padding:6px 0;">${payload.message}</td></tr>` : ''}
      ${payload.utm_source ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:bold;">Source</td><td style="padding:6px 0;">${payload.utm_source} / ${payload.utm_medium ?? '—'} / ${payload.utm_campaign ?? '—'}</td></tr>` : ''}
    </table>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from:    'PLACEHOLDER_PROJECT_TITLE Leads <leads@PLACEHOLDER_SUBDOMAIN.sanpatrik.co>',
      to:      ['PLACEHOLDER_AGENT_EMAIL'],
      subject: `New lead: ${payload.fullName} — ${payload.country} — ${VILLA_LABEL[payload.villaType] ?? payload.villaType}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error('[submit-lead] Resend error:', res.status, await res.text());
  } else {
    console.log('[submit-lead] Notification email sent');
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json() as LeadPayload;

    // 1. Validate required fields
    if (!payload.fullName || !payload.email || !payload.phone || !payload.country || !payload.villaType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Verify reCAPTCHA
    const captchaOk = await verifyRecaptcha(payload.recaptchaToken);
    if (!captchaOk) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // 3. Create HubSpot contact + send email in parallel
    await Promise.allSettled([
      createHubSpotContact(payload),
      sendNotificationEmail(payload),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[submit-lead] Unexpected error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
