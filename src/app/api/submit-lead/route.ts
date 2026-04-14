import { NextRequest, NextResponse } from 'next/server';

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${GHL_API_KEY}`,
  'Version': '2021-07-28',
};

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

    // Crear contacto en GHL con tags para que el workflow se active
    const res = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: GHL_HEADERS,
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        companyName: company,
        locationId: GHL_LOCATION_ID,
        source: 'SmartCash Landing Page',
        tags: ['smartcash-lead', 'landing-page'],
        customFields: [
          { id: 'MSrY6qoPbTFRZeWqrtQI', value: chequeAmount },
          { id: 'WxPjPYXDaaiSLI1s4GYO', value: message },
        ],
      }),
    });

    const contactData = await res.json();

    if (!contactData.contact?.id) {
      console.error('Failed to create contact:', contactData);
      return NextResponse.json({ error: 'Error creando contacto' }, { status: 500 });
    }

    return NextResponse.json({ success: true, contactId: contactData.contact.id });
  } catch (error) {
    console.error('Error in submit-lead:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
