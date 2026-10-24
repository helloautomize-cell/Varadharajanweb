import Link from 'next/link';
import Image from 'next/image';
import type { Treatment } from '@/config/site';

export default function TreatmentCard({
 treatment,
 imageSize = 72,
}: {
 treatment: Treatment;
 imageSize?: number;
}) {
 return (
  <Link
   href={`/services/${treatment.slug}`}
   className="block p-8 rounded-2xl card-hover"
   style={{
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
   }}
  >
   <div className="mb-4">
    <Image
     src={`/images/treatments/photos/v2/${treatment.slug}.webp`}
     alt={`${treatment.title} at Iswarya Hospital, Chennai`}
     width={imageSize}
     height={imageSize}
     className="object-cover"
     style={{ borderRadius: '12px' }}
    />
   </div>
   <h3
    className="text-lg font-bold mb-2"
    style={{ color: 'var(--color-primary-dark)', fontSize: '18px' }}
   >
    {treatment.title}
   </h3>
   <p
    className="text-sm leading-relaxed"
    style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.6' }}
   >
    {treatment.shortDescription}
   </p>
  </Link>
 );
}
