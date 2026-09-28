import Image from 'next/image';

interface TreatmentPhotoBandProps {
 src: string;
 caption?: string;
 alt?: string;
}

export default function TreatmentPhotoBand({ src, caption, alt }: TreatmentPhotoBandProps) {
 return (
  <section className="reveal w-full">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div
     className="relative w-full overflow-hidden aspect-[4/3]"
     style={{
      borderRadius: '16px',
      boxShadow:
       '0 10px 30px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
     }}
    >
     <Image
      src={src}
      alt={alt ?? caption ?? 'Treatment photo'}
      fill
      sizes="(max-width: 1280px) 100vw, 1280px"
      className="object-cover"
     />
     {caption && (
      <div
       className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-10 sm:px-6 sm:pb-4 sm:pt-14"
       style={{
        background:
         'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 60%, transparent 100%)',
       }}
      >
       <span className="text-sm sm:text-base font-semibold text-white">
        {caption}
       </span>
      </div>
     )}
    </div>
   </div>
  </section>
 );
}
