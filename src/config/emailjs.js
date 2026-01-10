// EmailJS Configuration
// This configuration uses environment variables for security
// Make sure to set up your EmailJS credentials in .env.local

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'
};

// Check if EmailJS is properly configured
export const isEmailJSConfigured = () => {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
  return (
    SERVICE_ID && SERVICE_ID !== 'your_service_id' &&
    TEMPLATE_ID && TEMPLATE_ID !== 'your_template_id' &&
    PUBLIC_KEY && PUBLIC_KEY !== 'your_public_key'
  );
};

// Get configuration status for debugging
export const getConfigStatus = () => {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
  return {
    serviceId: SERVICE_ID !== 'your_service_id' ? '✅ Configured' : '❌ Not configured',
    templateId: TEMPLATE_ID !== 'your_template_id' ? '✅ Configured' : '❌ Not configured',
    publicKey: PUBLIC_KEY !== 'your_public_key' ? '✅ Configured' : '❌ Not configured',
    isReady: isEmailJSConfigured()
  };
};

// Example Email Template Variables (use these in your EmailJS template):
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{message}} - Message content
// {{to_name}} - Recipient name (Hemovia Support Team)
// {{reply_to}} - Reply-to email address

// Sample EmailJS Template:
/*
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from the Hemovia Blood Donation website.
Reply directly to this email to respond to {{from_name}}.
*/