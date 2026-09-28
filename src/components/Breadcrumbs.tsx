import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
 name: string;
 path: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
 return (
  <nav aria-label="Breadcrumb" className="mb-6">
   <ol className="flex flex-wrap items-center gap-1 text-sm">
    <li>
     <Link
      href="/"
      className="hover:underline"
      style={{ color: 'var(--color-primary)' }}
     >
      Home
     </Link>
    </li>
    {items.map((item, i) => (
     <li key={item.path} className="flex items-center gap-1">
      <ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} />
      {i === items.length - 1 ? (
       <span aria-current="page" style={{ color: 'var(--color-text-muted)' }}>
        {item.name}
       </span>
      ) : (
       <Link
        href={item.path}
        className="hover:underline"
        style={{ color: 'var(--color-primary)' }}
       >
        {item.name}
       </Link>
      )}
     </li>
    ))}
   </ol>
  </nav>
 );
}
