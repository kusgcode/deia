import { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announcement-bar" role="banner">
      <p className="announcement-bar-text">
        Discover the timeless essence of traditional Indian craftsmanship.
      </p>
      <button
        type="button"
        className="announcement-bar-close"
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
