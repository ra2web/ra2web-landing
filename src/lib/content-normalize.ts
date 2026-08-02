/**
 * 将纯文本（含换行）转为 HTML 段落；已是 HTML 的内容原样返回。
 */
export function normalizeEditorContent(content: string): string {
  if (!content?.trim()) return '';

  const trimmed = content.trim();

  if (/<(?:p|div|h[1-6]|ul|ol|li|img|br|blockquote)\b/i.test(trimmed)) {
    return trimmed;
  }

  return trimmed
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      if (!lines.length) return '';
      return `<p>${lines.join('<br>')}</p>`;
    })
    .filter(Boolean)
    .join('');
}
