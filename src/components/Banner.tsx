"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/img/Slider-img1b.jpg",
      title: "激烈跨海苏盟对决",
      subtitle: "对战实况展示"
    },
    {
      image: "/img/Slider-img3b.jpg",
      title: "安卓平板上畅玩",
      subtitle: "移动端演示（图为摇杆高速移动地图中所以会有重影）"
    },
    {
      image: "/img/Slider-img2b.jpg",
      title: "击败敌人！",
      subtitle: "对战实况展示"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div 
      className="text-white pt-[56px] md:pt-[102px] bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: 'url("/img/Banner-bg.jpg")' }}
      id="home"
    >
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-[1100px]">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Side - Welcome Text */}
          <div className="lg:w-2/5 mb-8 lg:mb-0 lg:pr-8">
            <h3 className="text-5xl font-bold mb-6">欢迎回来, <br></br><span className="text-[#ff9000]">指挥官！</span></h3>
            <p className="text-xl mb-8">是时候体验和重温真正经典的即时战略游戏玩法…… <br /><br />……居然可以直接在您的浏览器！！</p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://game.ra2web.com/" 
                target="_blank" 
                rel="nofollow"
                className="bg-[#ff9000] hover:bg-[#e3860e] text-white font-bold py-3 px-8 text-lg transition-colors duration-300"
              >
                立即开始
              </a>
              <a 
                href="https://staging.wangerhuoda.cn/"
                target="_blank" 
                rel="nofollow"
                className="border border-white hover:border-[#ff9000] hover:text-[#ff9000] text-white font-bold py-3 px-8 text-lg transition-colors duration-300"
              >
                稳定服
              </a>
            </div>
          </div>
          
          {/* Right Side - Slider - 调整为更大比例 */}
          <div className="lg:w-3/5 w-full relative">
            <div className="slider-container overflow-hidden shadow-2xl relative lg:-mr-6" style={{ paddingBottom: '62%' }}>
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  className={`slider-item transition-opacity duration-1000 absolute inset-0 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                    <p className="text-xl font-bold">{slide.title} <span className="text-sm font-normal block text-[#ff9000]">{slide.subtitle}</span></p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slider Navigation Dots */}
            <div className="slider-dots flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-colors duration-300 ${index === currentSlide ? 'bg-[#ff9000]' : 'bg-gray-400'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 