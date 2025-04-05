"use client";

import { useState } from 'react';

export default function Media() {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  
  const screenshots = [
    { thumb: "/img/scr/screen1c_thumb.jpg", full: "/img/scr/screen1c.jpg" },
    { thumb: "/img/scr/screen2c_thumb.jpg", full: "/img/scr/screen2c.jpg" },
    { thumb: "/img/scr/screen3c_thumb.jpg", full: "/img/scr/screen3c.jpg" },
    { thumb: "/img/scr/screen4b_thumb.jpg", full: "/img/scr/screen4b.jpg" },
    { thumb: "/img/scr/screen5b_thumb.jpg", full: "/img/scr/screen5b.jpg" },
    { thumb: "/img/scr/screen6c_thumb.jpg", full: "/img/scr/screen6c.jpg" }
  ];
  
  return (
    <section id="media" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">频道</h2>
        <div className="w-20 h-1 bg-red-500 mx-auto mb-12"></div>
        
        {/* Video Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="//player.bilibili.com/player.html?isOutside=true&aid=408967329&bvid=BV1VG411i7c9&cid=1344632796&p=1"
              scrolling="no" 
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <button 
                onClick={() => setActiveImg(screenshot.full)}
                className="w-full h-full"
              >
                <img 
                  src={screenshot.thumb} 
                  alt={`游戏截图 ${index + 1}`} 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {activeImg && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveImg(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              onClick={() => setActiveImg(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={activeImg} 
              alt="游戏截图大图" 
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
} 