import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Frontend demonstration only. Connect an email service or backend
    // before treating messages as delivered.
    setSubmitted(true);
  }

  return (
    <section className="page-container contact-page">
      <header className="page-header">
        <p className="eyebrow">WE'RE HERE FOR YOU</p>
        <h1>Get in Touch</h1>
        <p>
          Questions about our collection or your order?
          We'd love to hear from you.
        </p>
      </header>

      <div className="contact-content">
        <div className="contact-information">
          <h2>Let's Connect</h2>
          <p>
            Whether you need help choosing a product or have a question
            about an existing order, send us a message.
          </p>

          <div>
            <h3>Customer Support</h3>
            <p>Use the form to send our team your enquiry.</p>
          </div>

          <div>
            <h3>Our Philosophy</h3>
            <p>
              DEIA celebrates traditional Indian craftsmanship,
              thoughtful rituals, and the beauty of simplicity.
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div role="status">
              <h2>Thank you for reaching out.</h2>
              <p>
                This demonstration form does not send messages yet.
                Please connect a backend or email service to enable delivery.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />

              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                required
              />

              <button type="submit">Send Message</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}