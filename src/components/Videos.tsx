'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import MobileCarousel from '@/components/MobileCarousel';

const videos = [
 { id: 'jCkym_mbXY8', title: 'Dr. Varadharajan on the WHO cancer warning (Polimer News, Tamil)' },
 { id: 'i9x8mau2kGY', title: 'Myths and facts of mouth cancer (Iswarya Hospital)' },
 { id: 'FDpyrlgc6-U', title: 'Does fasting benefit the body? Dr. Varadharajan explains (Polimer News, Tamil)' },
];

export default function Videos() {
 const [activeVideo, setActiveVideo] = useState<string | null>(null);

 return (
  <section
   id="videos"
   className="reveal w-full"
   style={{ padding: 'var(--section-padding-y) 0' }}
  >
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2
     className="text-3xl sm:text-4xl font-bold text-center mb-12"
     style={{ color: 'var(--color-primary-dark)' }}
    >
     Videos
    </h2>

    <MobileCarousel until="md" desktopClassName="md:grid-cols-3 md:gap-8">
     {videos.map((video) => (
      <div
       key={video.id}
       className="relative rounded-2xl overflow-hidden"
       style={{
        aspectRatio: '16/9',
        backgroundColor: '#000',
        borderRadius: '16px',
       }}
      >
       {activeVideo === video.id ? (
        <iframe
         src={`https://www.youtube.com/embed/${video.id}`}
         title={video.title}
         className="w-full h-full"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
        />
       ) : (
        <div
         className="w-full h-full flex items-center justify-center cursor-pointer relative"
         onClick={() => setActiveVideo(video.id)}
         style={{
          backgroundImage: `url(https://img.youtube.com/vi/${video.id}/hqdefault.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
         }}
        >
         <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
         />
         <div
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
          style={{
           backgroundColor: 'var(--color-primary)',
           transition: 'transform 0.2s',
          }}
         >
          <Play size={32} fill="white" />
         </div>
        </div>
       )}
      </div>
     ))}
    </MobileCarousel>
   </div>
  </section>
 );
}