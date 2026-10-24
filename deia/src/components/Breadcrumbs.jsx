import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        <li className="breadcrumbs-item">
          <Link to="/" className="breadcrumbs-link">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="breadcrumbs-item">
            <ChevronRight size={14} className="breadcrumbs-separator" />
            {item.path ? (
              <Link to={item.path} className="breadcrumbs-link">{item.label}</Link>
            ) : (
              <span className="breadcrumbs-current" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
