"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import type { PersonalSponsorRecord, PersonalSponsorsFile } from '@/types/personal-sponsor';

const SPONSOR_SEPARATOR = '　　｜　　';

function formatSponsorLine(sponsor: PersonalSponsorRecord): string {
  return `${sponsor.name}（${sponsor.deed}）`;
}

function PersonalSponsorList({ sponsors }: { sponsors: PersonalSponsorRecord[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);
  const [paused, setPaused] = useState(false);

  const lineText = useMemo(
    () => sponsors.map(formatSponsorLine).join(SPONSOR_SEPARATOR),
    [sponsors]
  );

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;
      setShouldMarquee(measure.offsetWidth > container.clientWidth);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [lineText]);

  const durationSec = Math.max(lineText.length * 0.15, 16);

  return (
    <div
      ref={containerRef}
      className="relative max-w-3xl mx-auto overflow-hidden rounded border border-[#2a4660] bg-[#122a40]/50 py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span
        ref={measureRef}
        className="absolute left-0 top-0 whitespace-nowrap invisible pointer-events-none text-base px-4"
        aria-hidden
      >
        {lineText}
      </span>

      {shouldMarquee ? (
        <div
          className="sponsor-marquee-track whitespace-nowrap text-base px-4"
          style={{
            ['--sponsor-marquee-distance' as string]: '-50%',
            ['--sponsor-marquee-duration' as string]: `${durationSec}s`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          <span className="text-[#e8f1f8] shrink-0">{lineText}</span>
          <span className="text-[#e8f1f8] shrink-0" aria-hidden>
            {SPONSOR_SEPARATOR}
            {lineText}
          </span>
        </div>
      ) : (
        <p className="text-center text-[#e8f1f8] text-base px-4 whitespace-nowrap">{lineText}</p>
      )}
    </div>
  );
}

export default function Sponsors() {
  const [personalSponsors, setPersonalSponsors] = useState<PersonalSponsorRecord[]>([]);
  const [personalLoadState, setPersonalLoadState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/personal-sponsors.json');
        if (!res.ok) throw new Error('Failed to fetch personal sponsors');
        const data: PersonalSponsorsFile = await res.json();
        if (!Array.isArray(data.sponsors)) throw new Error('Invalid personal sponsors format');
        setPersonalSponsors(data.sponsors.filter((s) => s.published !== false));
        setPersonalLoadState('ready');
      } catch (err) {
        console.error('Error fetching personal sponsors:', err);
        setPersonalLoadState('error');
      }
    };
    load();
  }, []);

  return (
    <section 
      id="sponsors" 
      className="py-16 bg-[#081522] text-[#e8f1f8]"
    >
      <div className="container mx-auto px-4 max-w-[1100px]">
        <h2 className="text-4xl md:text-[50px] font-normal uppercase font-['Oswald',sans-serif] leading-[60px] text-center mb-8">赞助与合作</h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-[#b9c7d4]">
          感谢以下伙伴对红色井界™的支持与合作
        </p>
        <div className="w-64 h-[2px] bg-[#ff9408] mx-auto mb-12"></div>
        
        <div className="sponsors-content">
          <div className="sponsor-tier mb-12">
            <h3 className="text-2xl font-semibold text-center mb-6 text-[#ff9408]">金牌赞助商</h3>
            <div className="flex justify-center items-center">
              <a 
                href="https://www.pzds.com/?pzfrom=RWKTDJ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sponsor-logo block transition-transform hover:scale-105 duration-300 bg-white/95 border border-[#274763] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
              >
                <Image 
                  src="/logo2-2.png" 
                  alt="金牌赞助商" 
                  width={300}
                  height={150}
                  className="max-w-full h-auto"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </div>
          </div>

          <div className="sponsor-tier">
            <h3 className="text-2xl font-semibold text-center mb-6 text-[#ff9408]">个人赞助</h3>
            {personalLoadState === 'loading' && (
              <p className="text-center text-[#9eb1c3] text-sm">加载中…</p>
            )}
            {personalLoadState === 'ready' && personalSponsors.length === 0 && (
              <p className="text-center text-[#9eb1c3] text-sm">暂无个人赞助记录</p>
            )}
            {personalLoadState === 'ready' && personalSponsors.length > 0 && (
              <PersonalSponsorList sponsors={personalSponsors} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
