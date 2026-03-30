import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import dns from 'dns';

// Fix for Node >= 17 IPv6 ENETUNREACH issues on Windows
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, E-Mail und Nachricht sind Pflichtfelder.' },
        { status: 400 }
      );
    }

    // 1. Save to Database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    });
    console.log("✅ Database Entry Created:", contactRequest.id);

    // 2. Setup Nodemailer (Fail-fast if not configured)
    if (!process.env.SMTP_PASS || process.env.SMTP_PASS === "HIER_MUSS_DAS_GMAIL_APP_PASSWORT_REIN") {
      console.warn("⚠️ E-Mails wurden übersprungen: Das Gmail App-Passwort fehlt in der .env Datei.");
      return NextResponse.json({ success: true, data: contactRequest }, { status: 201 });
    }

    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: smtpPort === 465, // True für SMTPS 465, False für STARTTLS 587
      connectionTimeout: 5000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Send Notification Email to Admin
    const adminMailOptions = {
      from: `"HM-Profi Webseite" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Neue Kontaktanfrage: ${name}`,
      html: `
        <h2>Neue Anfrage von der Webseite</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Nicht angegeben"}</p>
        <hr />
        <h3>Nachricht:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // 4. Send Auto-Reply to Customer
    const userMailOptions = {
      from: `"HM-Profi" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Ihre Anfrage bei HM-Profi`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hallo ${name},</h2>
          <p>vielen Dank für Ihre Nachricht an HM-Profi! Wir haben Ihre Anfrage erfolgreich erhalten.</p>
          <p>Wir werden uns Ihr Anliegen ansehen und uns schnellstmöglich bei Ihnen melden.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Ihre übermittelte Nachricht:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #00a0e3;">
            ${message.replace(/\n/g, "<br>")}
          </p>
          <br/>
          <p>Mit freundlichen Grüßen,<br/>Ihr Team von HM-Profi</p>
        </div>
      `,
    };

    try {
      console.log("📧 Starting SMTP Dispatch...");
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ]);
      console.log("✅ SMTP Emails Dispatched Successfully");
    } catch (mailError) {
      console.error("❌ Mail Dispatch Error:", mailError);
    }

    return NextResponse.json({ success: true, data: contactRequest }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { message: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

