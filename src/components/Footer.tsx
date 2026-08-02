"use client";

import FooterContent from './FooterContent';

export default function Footer() {
  return (
    <section 
      id="play" 
      className="text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/img/Get-bg.jpg")' }}
    >
      <div className="Center container mx-auto max-w-[1100px] text-center py-28">
        <h2 className="text-5xl md:text-[57px] font-normal uppercase leading-[60px] font-['Oswald',sans-serif]">现在开玩</h2>
        <p className="py-6"></p>
        <div className="w-64 h-[2px] bg-[#ff9408] mx-auto"></div>
        <div className="py-6">
          <a 
            href="https://staging.wangerhuoda.cn" 
            target="_blank" 
            rel="nofollow" 
            className="launch_game inline-block"
          >
            <span className="logo block w-[316px] h-[150px] bg-[url('/img/cd-logo.png')] bg-no-repeat mx-auto my-6 hover:filter hover:brightness-110 hover:drop-shadow-[0_0_20px_red] transition-all"></span>
          </a>
        </div>
      </div>
      <footer className="w-full text-center bg-black/60">
        <FooterContent />
      </footer>
    </section>
  );
} 