// Quick EmailJS Setup Script
// Run this script to check your EmailJS configuration

import { EMAILJS_CONFIG, getConfigStatus } from './src/config/emailjs.js';

console.log('=== EmailJS Configuration Status ===');
console.log('');

const status = getConfigStatus();
console.log('Service ID:', status.serviceId);
console.log('Template ID:', status.templateId);
console.log('Public Key:', status.publicKey);
console.log('');
console.log('Overall Status:', status.isReady ? '✅ Ready to use' : '❌ Needs configuration');
console.log('');

if (!status.isReady) {
  console.log('🔧 Setup Instructions:');
  console.log('1. Go to https://www.emailjs.com/ and create a free account');
  console.log('2. Create a new email service (Gmail, Outlook, etc.)');
  console.log('3. Create an email template');
  console.log('4. Get your credentials and update .env.local file:');
  console.log('');
  console.log('   VITE_EMAILJS_SERVICE_ID=your_actual_service_id');
  console.log('   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id');
  console.log('   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key');
  console.log('');
  console.log('5. Restart your development server');
  console.log('');
  console.log('📖 For detailed instructions, see EMAILJS_SETUP.md');
} else {
  console.log('🎉 EmailJS is properly configured and ready to use!');
}

console.log('');
console.log('Current configuration values:');
console.log('SERVICE_ID:', EMAILJS_CONFIG.SERVICE_ID);
console.log('TEMPLATE_ID:', EMAILJS_CONFIG.TEMPLATE_ID);
console.log('PUBLIC_KEY:', EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 10) + '...');