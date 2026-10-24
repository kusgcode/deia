import { useState } from 'react';
import { subscribeToNewsletter, isNewsletterDemoMode } from '../services/newsletterService';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const isDemo = isNewsletterDemoMode();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      setStatus('error');
      setFeedbackMessage('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const result = await subscribeToNewsletter(email.trim());
      if (result.success) {
        setStatus('success');
        setFeedbackMessage('Thank you for subscribing to DEIA.');
        setEmail('');
      } else {
        setStatus('error');
        setFeedbackMessage(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-heading">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 id="newsletter-heading" className="newsletter-heading">
            Stay Connected With DEIA
          </h2>
          <p className="newsletter-description">
            Discover our collection, new arrivals, and stories inspired by tradition.
          </p>

          {status === 'success' ? (
            <div className="newsletter-success-state" role="status" aria-live="polite">
              <p className="newsletter-success-message">{feedbackMessage}</p>
              {isDemo && (
                <p className="newsletter-demo-note">
                  (Demo Mode: No marketing emails will be sent. Newsletter subscriptions will be enabled soon.)
                </p>
              )}
              <button
                type="button"
                className="newsletter-reset-btn"
                onClick={() => {
                  setStatus('idle');
                  setFeedbackMessage('');
                }}
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <div className="newsletter-form-group">
                <input
                  type="email"
                  className={`newsletter-input ${status === 'error' ? 'has-error' : ''}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                      setStatus('idle');
                      setFeedbackMessage('');
                    }
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  disabled={status === 'loading'}
                  required
                />
                <button
                  type="submit"
                  className="newsletter-submit-btn"
                  disabled={status === 'loading'}
                  aria-label="Subscribe to newsletter"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              {status === 'error' && feedbackMessage && (
                <p className="newsletter-error-message" role="alert" aria-live="polite">
                  {feedbackMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
