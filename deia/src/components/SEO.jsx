import { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    const baseTitle = 'DEIA — Rooted in Tradition';
    document.title = title ? `${title} | DEIA` : baseTitle;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    return () => {
      document.title = baseTitle;
    };
  }, [title, description]);

  return null;
}
