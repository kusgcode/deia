/**
 * Checkout Service
 * 
 * Currently operates in DEMO MODE.
 * When a backend is implemented, replace the demo functions with real API calls.
 * 
 * Integration points:
 * - Payment gateway: Razorpay (requires merchant account and API keys)
 * - Order API: POST /api/orders
 * - Email confirmation: Triggered server-side after order creation
 */

const DEMO_MODE = true;

export function isCheckoutDemoMode() {
  return DEMO_MODE;
}

/**
 * Validate checkout form data
 */
export function validateCheckoutForm(formData) {
  const errors = {};
  
  if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
  if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone.trim())) {
    errors.phone = 'Please enter a valid phone number';
  }
  if (!formData.address?.trim()) errors.address = 'Address is required';
  if (!formData.city?.trim()) errors.city = 'City is required';
  if (!formData.state?.trim()) errors.state = 'State is required';
  if (!formData.pincode?.trim()) {
    errors.pincode = 'PIN code is required';
  } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
    errors.pincode = 'Please enter a valid 6-digit PIN code';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Process checkout (DEMO MODE)
 * 
 * In production, this would:
 * 1. Create an order via the backend API
 * 2. Initialize Razorpay payment
 * 3. Handle payment success/failure
 * 4. Return order confirmation
 */
export async function processCheckout(orderData) {
  if (DEMO_MODE) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      demo: true,
      message: 'This is a demo checkout. No real order has been placed and no payment has been charged.',
      orderId: `DEMO-${Date.now()}`,
      orderData
    };
  }
  
  // Production implementation would go here:
  // const response = await fetch('/api/orders', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(orderData)
  // });
  // return response.json();
}

/**
 * Initialize Razorpay payment (placeholder)
 * 
 * Required setup:
 * 1. Create a Razorpay account
 * 2. Add RAZORPAY_KEY_ID to environment variables
 * 3. Implement server-side order creation at /api/orders/create-razorpay-order
 */
export async function initializePayment(orderId, amount) {
  if (DEMO_MODE) {
    return {
      demo: true,
      message: 'Payment gateway is not configured. Please set up Razorpay credentials.'
    };
  }
  
  // Production implementation:
  // const options = {
  //   key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //   amount: amount * 100,
  //   currency: 'INR',
  //   name: 'DEIA',
  //   description: `Order ${orderId}`,
  //   order_id: orderId,
  //   handler: function(response) { ... },
  //   prefill: { ... },
  //   theme: { color: '#4A2D1B' }
  // };
  // const rzp = new window.Razorpay(options);
  // rzp.open();
}

export function formatPrice(price, currency = 'INR') {
  if (price === null || price === undefined) return 'Price on request';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
}
