"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define section IDs for scroll spying
const SECTION_IDS = ['home', 'about', 'features', 'community', 'media', 'donate', 'play'];
// Define navigation items
const NAV_ITEMS = [
  { href: '#home', label: '首页' },
  { href: '#features', label: '核心特色' },
  { href: '#community', label: '社区' },
  { href: '#media', label: '频道' },
  { href: '/news', label: '新闻中心', isPageLink: true },
  { href: 'https://staging.wangerhuoda.cn', label: '点此开玩！', isExternal: true },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - (isScrolled ? 56 : 102), // 修正高度为102px (小版本为56px)
          behavior: 'smooth'
        });
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // 设置header是否显示为较小版本
      setIsScrolled(scrollPosition > 50);

      // 滚动监听逻辑 - 判断哪个部分在视口内
      // 阈值为视口高度的40%
      const viewportHeight = window.innerHeight;
      const scrollThreshold = viewportHeight * 0.4;

      // 从底部向上遍历，找到第一个在阈值以上的section
      let currentSection = '';
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const element = document.getElementById(id);
        if (element) {
          const elementTop = element.getBoundingClientRect().top;
          if (elementTop < scrollThreshold) {
            currentSection = id;
            break;
          }
        }
      }

      // 如果页面顶部，默认选中home
      if (scrollPosition < viewportHeight * 0.3) {
        currentSection = 'home';
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // 使用防抖处理滚动事件
    let timeoutId: NodeJS.Timeout | null = null;
    const debouncedScrollHandler = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    handleScroll(); // 初始检查

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out h-[56px] md:h-auto bg-black/50">
      <div className="h-full w-full">
        <div className="container mx-auto px-4 max-w-[1100px] h-full flex justify-between items-center">
          {/* 在移动设备上固定小尺寸，在桌面设备上根据滚动状态变化 */}
          <Link 
            href="/#home" 
            onClick={(e) => handleNavClick(e, '#home')} 
            className={`site-logo bg-contain bg-no-repeat bg-left-top w-[106px] h-[50px] mt-[3px] md:transition-all md:duration-500 ${isScrolled ? 'md:w-[106px] md:h-[50px] md:mt-[3px]' : 'md:w-[158px] md:h-[75px] md:mt-[15px]'}`}
            style={{ backgroundImage: "url('/img/logo.png')" }}
            aria-label="返回首页"
          />

          {/* 移动端菜单按钮 - 紧贴边缘 */}
          <button 
            onClick={toggleMenu} 
            className={`md:hidden text-white focus:outline-none ${mobileMenuOpen ? 'bg-[#e3860e]' : 'bg-[#ff9408]'} w-[55px] h-[56px] flex items-center justify-center transition-colors absolute top-0 right-0`}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex md:items-center md:ml-auto">
            <ul className="md:flex md:flex-row list-none m-0">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.startsWith('#') ? item.href.substring(1) : null;
                const isActive = sectionId === activeSection;
                const Tag = item.isPageLink ? Link : 'a';
                const linkProps = item.isExternal 
                  ? { target: "_blank", rel: "nofollow noopener noreferrer" } 
                  : { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item.href) }; 

                return (
                  <li 
                    key={item.href} 
                    className={`m-0 p-0 relative transition-all duration-500 group ${isActive ? 'active' : ''} ${isScrolled ? 'h-[56px]' : 'h-[102px]'}`}
                  >
                    <Tag
                      href={item.href}
                      {...linkProps}
                      className={`relative flex items-center font-normal font-['Open_Sans'] text-base text-white no-underline h-full transition-all duration-300 
                        ${isScrolled 
                          ? 'md:py-[16px] md:px-[10px] lg:py-[16px] lg:px-[36px] xl:py-[16px] xl:px-[41px]' 
                          : 'md:pt-[30px] md:pb-[30px] md:px-[10px] lg:pt-[30px] lg:pb-[30px] lg:px-[30px] xl:pt-[42px] xl:pb-[33px] xl:px-[41px]'
                        }`}
                    >
                      {item.label}
                      <span 
                        className={`absolute inset-0 z-[-10] border-b-[5px] border-[#ff9000] transition-opacity duration-500 bg-gradient-to-b from-[#57120d] to-[#FF5722] opacity-0 group-hover:opacity-100 ${isActive ? '!opacity-100' : ''}`}
                      />
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* 移动导航菜单 */}
      <nav 
        className={`md:hidden fixed top-[56px] left-0 w-full bg-black/95 shadow-lg transition-all duration-300 ease-in-out z-40 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ maxHeight: mobileMenuOpen ? '80vh' : '0', overflow: 'auto' }}
      >
        <ul className="flex flex-col list-none m-0">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.startsWith('#') ? item.href.substring(1) : null;
            const isActive = sectionId === activeSection;
            const Tag = item.isPageLink ? Link : 'a';
            const linkProps = item.isExternal 
              ? { target: "_blank", rel: "nofollow noopener noreferrer", onClick: () => setMobileMenuOpen(false) } 
              : { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item.href) };

            return (
              <li 
                key={item.href} 
                className={`w-full border-b border-gray-700 last:border-b-0 ${isActive ? 'bg-[#ff9000]' : ''}`}
              >
                <Tag
                  href={item.href}
                  {...linkProps}
                  className={`block w-full py-4 px-6 text-white font-normal font-['Open_Sans'] text-base no-underline hover:bg-[#333] transition-colors duration-200`}
                >
                  {item.label}
                </Tag>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
} 