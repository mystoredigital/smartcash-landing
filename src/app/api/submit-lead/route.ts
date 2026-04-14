import { NextRequest, NextResponse } from 'next/server';

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${GHL_API_KEY}`,
  'Version': '2021-07-28',
};

// Comision: 4% por cada 30 dias (modelo SmartCash)
function calculateEstimate(amountRange: string) {
  const rangeMap: Record<string, { min: number; max: number }> = {
    '$300 - $500': { min: 300, max: 500 },
    '$500 - $1,000': { min: 500, max: 1000 },
    '$1,000 - $2,000': { min: 1000, max: 2000 },
    '$2,000 - $3,000': { min: 2000, max: 3000 },
    '$3,000 - $4,000': { min: 3000, max: 4000 },
  };

  const range = rangeMap[amountRange];
  if (!range) return null;

  const avg = (range.min + range.max) / 2;
  const commission30d = avg * 0.04;
  const youReceive30d = avg - commission30d;
  const commission60d = avg * 0.08;
  const youReceive60d = avg - commission60d;

  return {
    avgAmount: avg,
    example30d: { commission: commission30d.toFixed(2), receive: youReceive30d.toFixed(2) },
    example60d: { commission: commission60d.toFixed(2), receive: youReceive60d.toFixed(2) },
  };
}

function buildWelcomeEmail(firstName: string, chequeAmount: string, estimate: ReturnType<typeof calculateEstimate>) {
  const estimateHtml = estimate
    ? `
      <div style="background: #f0fdfa; border: 1px solid #14b8a6; border-radius: 12px; padding: 24px; margin: 20px 0;">
        <h3 style="color: #12647c; margin-top: 0;">Estimacion para un cheque de ~$${estimate.avgAmount.toLocaleString()}</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
          <tr style="background: #12647c; color: white;">
            <th style="padding: 10px; text-align: left; border-radius: 8px 0 0 0;">Plazo</th>
            <th style="padding: 10px; text-align: right;">Comision</th>
            <th style="padding: 10px; text-align: right; border-radius: 0 8px 0 0;">Tu Recibes</th>
          </tr>
          <tr style="background: white;">
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">30 dias</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb; color: #6b7280;">$${estimate.example30d.commission}</td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb; color: #12647c; font-weight: bold;">$${estimate.example30d.receive}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px;">60 dias</td>
            <td style="padding: 10px; text-align: right; color: #6b7280;">$${estimate.example60d.commission}</td>
            <td style="padding: 10px; text-align: right; color: #12647c; font-weight: bold;">$${estimate.example60d.receive}</td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #6b7280; margin-bottom: 0; margin-top: 12px;">
          * Valores referenciales. La cotizacion final depende del cheque especifico.
        </p>
      </div>
    `
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: 'Inter', Arial, sans-serif; background: #f8fafc; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

        <div style="background: linear-gradient(135deg, #12647c, #0d9488); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SmartCash</h1>
          <p style="color: #ccfbf1; margin: 8px 0 0 0;">Liquidez Inmediata para tu Negocio</p>
        </div>

        <div style="padding: 32px;">
          <h2 style="color: #111827; margin-top: 0;">Hola ${firstName}!</h2>
          <p style="color: #374151; line-height: 1.6;">
            Gracias por contactarnos. Recibimos tu solicitud y estamos listos para ayudarte
            a convertir tu cheque en efectivo.
          </p>

          ${chequeAmount ? `<p style="color: #374151;">Nos indicaste que tienes un cheque en el rango de <strong style="color: #12647c;">${chequeAmount}</strong>. Aqui te mostramos una estimacion de lo que recibirias:</p>` : ''}

          ${estimateHtml}

          <p style="color: #374151; line-height: 1.6;">
            <strong>Siguiente paso:</strong> Uno de nuestros asesores te contactara en las proximas
            24 horas para revisar los detalles de tu cheque y darte una cotizacion exacta.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <p style="color: #374151; margin-bottom: 16px;">Si deseas adelantar el proceso, envíanos la foto de tu cheque por WhatsApp:</p>
            <a href="${process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}" style="display: inline-block; background: linear-gradient(135deg, #2dd4bf, #12647c); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
              Enviar Cheque por WhatsApp
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-bottom: 0;">
            SmartCash - Servicio de factoring confiable en Ecuador<br>
            ${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@smartcash.ec'}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildAdminNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  chequeAmount: string;
  message: string;
  contactId: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; background: #f8fafc; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

        <div style="background: #111827; padding: 24px; text-align: center;">
          <h2 style="color: #2dd4bf; margin: 0;">Nuevo Lead SmartCash</h2>
        </div>

        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Nombre</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Email</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Telefono</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Empresa</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.company || 'No indicado'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Monto Cheque</td>
              <td style="padding: 8px 12px; color: #12647c; font-weight: bold; border-bottom: 1px solid #e5e7eb;">${data.chequeAmount || 'No indicado'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Mensaje</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${data.message || 'Sin mensaje'}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 13px;">ID Contacto GHL: ${data.contactId}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendEmailViaGHL(contactId: string, subject: string, htmlBody: string) {
  // Primero buscar o crear conversacion
  const convRes = await fetch(`${GHL_API_BASE}/conversations/`, {
    method: 'POST',
    headers: GHL_HEADERS,
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      contactId,
    }),
  });
  const convData = await convRes.json();
  const conversationId = convData.conversation?.id;

  if (!conversationId) {
    console.error('Failed to create conversation:', convData);
    return false;
  }

  // Enviar email
  const msgRes = await fetch(`${GHL_API_BASE}/conversations/messages`, {
    method: 'POST',
    headers: GHL_HEADERS,
    body: JSON.stringify({
      type: 'Email',
      conversationId,
      contactId,
      subject,
      html: htmlBody,
    }),
  });

  return msgRes.ok;
}

async function createGHLContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  chequeAmount: string;
  message: string;
}) {
  const res = await fetch(`${GHL_API_BASE}/contacts/`, {
    method: 'POST',
    headers: GHL_HEADERS,
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      companyName: data.company,
      locationId: GHL_LOCATION_ID,
      source: 'SmartCash Landing Page',
      tags: ['smartcash-lead', 'landing-page'],
      customFields: [
        { id: 'MSrY6qoPbTFRZeWqrtQI', value: data.chequeAmount },
        { id: 'WxPjPYXDaaiSLI1s4GYO', value: data.message },
      ],
    }),
  });

  return res.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, chequeAmount, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // 1. Crear contacto en GHL
    const contactData = await createGHLContact({
      firstName, lastName, email, phone, company, chequeAmount, message,
    });

    const contactId = contactData.contact?.id;
    if (!contactId) {
      console.error('Failed to create contact:', contactData);
      return NextResponse.json({ error: 'Error creando contacto' }, { status: 500 });
    }

    // 2. Enviar email de bienvenida al cliente
    const estimate = calculateEstimate(chequeAmount);
    const welcomeHtml = buildWelcomeEmail(firstName, chequeAmount, estimate);
    await sendEmailViaGHL(contactId, 'Bienvenido a SmartCash - Tu estimacion de liquidez', welcomeHtml);

    // 3. Enviar notificacion a admins
    if (ADMIN_EMAIL) {
      // Buscar contacto admin por email para enviar notificacion via GHL
      const searchRes = await fetch(`${GHL_API_BASE}/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(ADMIN_EMAIL)}`, {
        method: 'GET',
        headers: GHL_HEADERS,
      });
      const searchData = await searchRes.json();
      let adminContactId = searchData.contact?.id;

      // Si no existe el admin como contacto, crearlo
      if (!adminContactId) {
        const adminRes = await fetch(`${GHL_API_BASE}/contacts/`, {
          method: 'POST',
          headers: GHL_HEADERS,
          body: JSON.stringify({
            firstName: 'Admin',
            lastName: 'SmartCash',
            email: ADMIN_EMAIL,
            locationId: GHL_LOCATION_ID,
            tags: ['admin', 'internal'],
          }),
        });
        const adminData = await adminRes.json();
        adminContactId = adminData.contact?.id;
      }

      if (adminContactId) {
        const adminHtml = buildAdminNotificationEmail({
          name, email, phone, company, chequeAmount, message, contactId,
        });
        await sendEmailViaGHL(adminContactId, `Nuevo Lead: ${name} - ${chequeAmount || 'Sin monto'}`, adminHtml);
      }
    }

    return NextResponse.json({ success: true, contactId });
  } catch (error) {
    console.error('Error in submit-lead:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
