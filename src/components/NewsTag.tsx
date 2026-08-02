import React from 'react';

type TagType = '百科' | '新闻' | '公告' | '活动' | string;

interface TagProps {
  category: TagType;
  className?: string;
}

const tagStyles: Record<string, string> = {
  '公告': 'bg-[#ff9408]/10 text-[#ff9408] border-[#ff9408]/20',
  '新闻': 'bg-blue-400/10 text-blue-400 border-blue-400/25',
  '百科': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25',
  '活动': 'bg-purple-400/10 text-purple-400 border-purple-400/25',
  'default': 'bg-slate-400/10 text-slate-400 border-slate-400/25'
};

export default function NewsTag({ category, className = "" }: TagProps) {
  const style = tagStyles[category] || tagStyles['default'];
  
  return (
    <span className={`shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded-none border leading-none tracking-wider ${style} ${className}`}>
      {category}
    </span>
  );
}
