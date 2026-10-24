const policyContent = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'DEIA respects your privacy. This page explains the general approach to handling information when you use our website.',
    sections: [
      {
        heading: 'Information We Collect',
        text:
          'Depending on the services you use, information may include your name, email address, phone number, shipping address, order details, and information you choose to provide.',
      },
      {
        heading: 'How Information Is Used',
        text:
          'Information may be used to respond to enquiries, fulfil orders, provide customer support, maintain website security, and meet applicable legal obligations.',
      },
      {
        heading: 'Payments and Security',
        text:
          'Payments should be handled through a secure payment provider. DEIA should not store full payment card details on its own website servers.',
      },
      {
        heading: 'Cookies and Third Parties',
        text:
          'The website may use cookies or third-party services where configured. The final policy should identify the services actually used and explain relevant choices.',
      },
      {
        heading: 'Contact',
        text:
          'For privacy-related questions, use the Contact page to reach DEIA.',
      },
    ],
  },

  terms: {
    title: 'Terms and Conditions',
    intro:
      'These terms describe the general conditions for browsing and purchasing from the DEIA website. They must be reviewed and finalized for your business before publication.',
    sections: [
      {
        heading: 'Website Use',
        text:
          'You agree to use the website lawfully and not to interfere with its operation, security, or availability.',
      },
      {
        heading: 'Product Information',
        text:
          'Product descriptions, images, prices, and availability should be reviewed for accuracy. Natural materials and handmade products may have variations where applicable.',
      },
      {
        heading: 'Orders and Payments',
        text:
          'Orders are subject to confirmation, stock availability, and successful payment where required. The final terms should explain order acceptance, cancellation, and refunds.',
      },
      {
        heading: 'Intellectual Property',
        text:
          'Website text, branding, photographs, graphics, and other materials may be protected by applicable intellectual property laws.',
      },
      {
        heading: 'Changes to These Terms',
        text:
          'DEIA may update these terms when necessary. The final published policy should specify the effective date and any applicable customer rights.',
      },
    ],
  },

  shipping: {
    title: 'Shipping and Returns',
    intro:
      'We want your DEIA order to reach you safely. The details below are a framework that must be completed with your actual shipping and return arrangements.',
    sections: [
      {
        heading: 'Order Processing',
        text:
          'Orders are prepared after the required order and payment checks. Actual processing times should be communicated clearly before checkout.',
      },
      {
        heading: 'Shipping and Delivery',
        text:
          'Delivery times and shipping charges depend on the delivery location, courier, product availability, and the shipping option selected. Publish your actual delivery estimates and charges before accepting orders.',
      },
      {
        heading: 'Damaged or Incorrect Items',
        text:
          'Customers should be given a clear way to report damaged, defective, or incorrect products, including the information and evidence required to investigate a claim.',
      },
      {
        heading: 'Returns and Refunds',
        text:
          'Your final policy must explain return eligibility, time limits, product-condition requirements, return shipping costs, refund processing, and any applicable legal exceptions.',
      },
      {
        heading: 'Contact for Order Support',
        text:
          'For delivery or return enquiries, visit the Contact page. Add your actual customer-support contact details before publishing this policy.',
      },
    ],
  },
};

export default function Policies({ type = 'privacy' }) {
  const policy = policyContent[type] ?? policyContent.privacy;

  return (
    <section className="page-container policies-page">
      <header className="page-header">
        <p className="eyebrow">DEIA CUSTOMER INFORMATION</p>
        <h1>{policy.title}</h1>
        <p>{policy.intro}</p>
      </header>

      <div className="policy-content">
        {policy.sections.map((section) => (
          <article key={section.heading} className="policy-section">
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </div>

      <p className="policy-notice">
        Please review and customize this draft to reflect DEIA's actual
        business practices before publishing it as a binding policy.
      </p>
    </section>
  );
}