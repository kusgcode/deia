/**
 * Newsletter Subscription Service
 * 
 * Currently operates in DEMO MODE.
 * When a real email provider is configured (e.g., Mailchimp, SendGrid, ConvertKit),
 * replace the demo function with actual API calls.
 */

const DEMO_MODE = true;

export function isNewsletterDemoMode() {
  return DEMO_MODE;
}

/**
 * Validate email address
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Please enter your email address.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true, error: null };
}

/**
 * Subscribe to newsletter (DEMO MODE)
 * 
 * In production, this would call your email service provider's API.
 */
export async function subscribeToNewsletter(email) {
  const validation = validateEmail(email);
  if (!validation.isValid) {
    return { success: false, error: validation.error, demo: DEMO_MODE };
  }
  
  if (DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      demo: true,
      message: 'Demo mode: Subscription recorded locally. Connect an email service provider to enable real subscriptions.'
    };
  }
  
  // Production implementation:
  // const response = await fetch('/api/newsletter/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email: email.trim() })
  // });
  // return response.json();
}
