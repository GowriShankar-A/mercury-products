"use server";

import nodemailer from "nodemailer";

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
  user: process.env.SMTP_USER || "gowrishankara003@gmail.com",
  pass: process.env.SMTP_PASS || "nfky xhjb pjfw wifn",
  from: process.env.SMTP_FROM || '"Mercury Products" <gowrishankara003@gmail.com>',
  to: process.env.SMTP_TO || "mercuryproducts@gmail.com",
};

interface QuoteInput {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

interface ContactInput {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends a quote request email to the team using SMTP.
 */
export async function sendQuoteEmail(data: QuoteInput) {
  // Validate fields
  if (!data.name || !data.phone || !data.message) {
    return { success: false, error: "Required fields (Name, Phone, Message) are missing." };
  }

  const { host, port, secure, user, pass, to, from } = SMTP_CONFIG;

  // Handle case where SMTP is not configured
  if (!host || !user || !pass) {
    console.warn("SMTP credentials are not configured. Email could not be sent.");
    return {
      success: false,
      error: "SMTP configuration is incomplete."
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #222; max-width: 600px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #eaeaea; padding-bottom: 20px;">
          <h1 style="color: #6D6EFF; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">MERCURY PRODUCTS</h1>
          <p style="color: #666; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">New Quote Request Received</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #fafafa;">
            <td style="padding: 12px 0; font-weight: 600; color: #666; width: 140px;">Client Name</td>
            <td style="padding: 12px 0; color: #111; font-weight: 500;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #fafafa;">
            <td style="padding: 12px 0; font-weight: 600; color: #666;">Phone Number</td>
            <td style="padding: 12px 0; color: #111; font-weight: 500;">
              <a href="tel:${data.phone}" style="color: #6D6EFF; text-decoration: none;">${data.phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #fafafa;">
            <td style="padding: 12px 0; font-weight: 600; color: #666;">Email Address</td>
            <td style="padding: 12px 0; color: #111; font-weight: 500;">
              ${data.email ? `<a href="mailto:${data.email}" style="color: #6D6EFF; text-decoration: none;">${data.email}</a>` : '<span style="color: #aaa; font-style: italic;">Not provided</span>'}
            </td>
          </tr>
        </table>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 30px;">
          <p style="font-weight: 600; margin: 0 0 10px 0; color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Project Details & Message</p>
          <div style="color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
        </div>
        
        <div style="font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #eaeaea; padding-top: 20px;">
          This inquiry was sent automatically from the quote form on the <a href="https://www.mercuryproducts.in" style="color: #6D6EFF; text-decoration: none;">Mercury Products Website</a>.
        </div>
      </div>
    `;

    const textContent = `
NEW QUOTE REQUEST RECEIVED
=========================
Client Name: ${data.name}
Phone Number: ${data.phone}
Email Address: ${data.email || "Not provided"}

Project Details & Message:
-------------------------
${data.message}

Sent automatically from the Mercury Products Website.
    `;

    await transporter.sendMail({
      from,
      to,
      subject: `[Quote Request] ${data.name}`,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send quote request email via SMTP:", error);
    return { success: false, error: error.message || "An error occurred while sending the email." };
  }
}

/**
 * Sends a contact inquiry email to the team using SMTP.
 */
export async function sendContactEmail(data: ContactInput) {
  // Validate fields
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Required fields (Name, Email, Message) are missing." };
  }

  const { host, port, secure, user, pass, to, from } = SMTP_CONFIG;

  // Handle case where SMTP is not configured
  if (!host || !user || !pass) {
    console.warn("SMTP credentials are not configured. Email could not be sent.");
    return {
      success: false,
      error: "SMTP configuration is incomplete."
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #222; max-width: 600px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #eaeaea; padding-bottom: 20px;">
          <h1 style="color: #22d3ee; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">MERCURY PRODUCTS</h1>
          <p style="color: #666; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">New Contact Inquiry Received</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #fafafa;">
            <td style="padding: 12px 0; font-weight: 600; color: #666; width: 140px;">Visitor Name</td>
            <td style="padding: 12px 0; color: #111; font-weight: 500;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #fafafa;">
            <td style="padding: 12px 0; font-weight: 600; color: #666;">Email Address</td>
            <td style="padding: 12px 0; color: #111; font-weight: 500;">
              <a href="mailto:${data.email}" style="color: #22d3ee; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
        </table>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 30px;">
          <p style="font-weight: 600; margin: 0 0 10px 0; color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message Body</p>
          <div style="color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
        </div>
        
        <div style="font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #eaeaea; padding-top: 20px;">
          This message was sent automatically from the contact form on the <a href="https://www.mercuryproducts.in" style="color: #22d3ee; text-decoration: none;">Mercury Products Website</a>.
        </div>
      </div>
    `;

    const textContent = `
NEW CONTACT INQUIRY RECEIVED
===========================
Visitor Name: ${data.name}
Email Address: ${data.email}

Message Body:
------------
${data.message}

Sent automatically from the Mercury Products Website.
    `;

    await transporter.sendMail({
      from,
      to,
      subject: `[Contact Inquiry] ${data.name}`,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send contact inquiry email via SMTP:", error);
    return { success: false, error: error.message || "An error occurred while sending the email." };
  }
}
