/**
 * FM Abhaya (and legacy ASCII Sinhala fonts) to Unicode Sinhala Converter
 *
 * Converts legacy font encodings (like FMAbhaya, FM-Abhaya, FMBindumathi, FMDerana)
 * into modern, standardized Sinhala Unicode (U+0D80 to U+0DFF).
 *
 * Supports:
 * - Direct text conversion
 * - Tagged [fm]...[/fm] text blocks with [en]...[/en] English preservation
 * - Whole JSX subject content conversion
 * - Deep object traversal for parsed subject structures
 */

/**
 * Checks if a string contains Unicode Sinhala characters
 */
export function hasSinhalaUnicode(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  return /[\u0D80-\u0DFF]/.test(text);
}

/**
 * Checks if a string or file appears to be encoded in FM-Abhaya legacy font
 */
export function isFmSinhalaText(text: string, filename?: string): boolean {
  if (!text && !filename) return false;

  // Check filename pattern (e.g. BharathaNatyam7S, History7S, *S.jsx, *Sinhala*)
  if (filename) {
    const fn = filename.toLowerCase();
    if (
      /[0-9]s\s*(\(\d+\))?\.jsx?$/.test(fn) ||
      fn.includes('sinhala') ||
      fn.endsWith('7s.jsx') ||
      fn.endsWith('8s.jsx') ||
      fn.endsWith('9s.jsx') ||
      fn.endsWith('10s.jsx') ||
      fn.endsWith('11s.jsx')
    ) {
      return true;
    }
  }

  if (typeof text !== 'string') return false;

  // Check explicit tags
  if (/\[fm\]/i.test(text)) return true;

  // Check distinct FM Abhaya character sequences
  const fmPatterns = [
    /ks¾/,        // නි + ර්
    /k¾;/,        // න + ර් + ත
    /l=i/,        // කු + ස
    /m%o¾/,       // ප්‍ර + ද + ර්
    /m%d/,        // ප්‍රා
    /lrhs'/,      // කරයි.
    /fld/,        // කො
    /fõ/,         // වේ
    /rpkd/,       // රචනා
    /úiska/,      // විසින්
    /›\s*,xld/,   // ශ්‍රී ලංකා
    /b;sydih/,    // ඉතිහාසය
    /jxYl;dj/,    // වංශකතාව
    /ye¢kaùu/,    // හැඳින්වීම
    /l,dfõ/,      // කලාවේ
    /kdgHï/,      // නාට්‍යම්
    /l%shdldr/,   // ක්‍රියාකාර
  ];

  return fmPatterns.some((p) => p.test(text));
}

/**
 * Raw conversion of FM-Abhaya ASCII text to Unicode Sinhala
 */
export function fmAbhayaToUnicode(text: string): string {
  if (!text || typeof text !== 'string') return '';

  let s = text;

  // 1. Pre-substitutions for legacy markers
  s = s.replace(/'/g, "Ã"); // Sinhala fullstop key in FM
  s = s.replace(/›/g, "ශ්‍රී");

  // 2. Triple and quad ligatures with kombuwa
  s = s.replace(/ff;%/g, "ත්‍රෛ");
  s = s.replace(/ffY/g, "ශෛ");
  s = s.replace(/ffp/g, "චෛ");
  s = s.replace(/ffc/g, "ජෛ");
  s = s.replace(/ffk/g, "නෛ");
  s = s.replace(/ffl/g, "කෛ");
  s = s.replace(/ffu/g, "මෛ");
  s = s.replace(/ffm/g, "පෛ");
  s = s.replace(/ffo/g, "දෛ");
  s = s.replace(/ff;/g, "තෛ");
  s = s.replace(/ffO/g, "ධෛ");
  s = s.replace(/ffj/g, "වෛ");
  s = s.replace(/fm%!/g, "ප්‍රෞ");

  // Kombuwa + Yanshaya + Aela-pilla + Hal (e.g. kyo)
  s = s.replace(/fIHda/g, "ෂ්‍යෝ");
  s = s.replace(/fPHda/g, "ඡ්‍යෝ");
  s = s.replace(/fVHda/g, "ඪ්‍යෝ");
  s = s.replace(/f>Hda/g, "ඝ්‍යෝ");
  s = s.replace(/fLHda/g, "ඛ්‍යෝ");
  s = s.replace(/f<Hda/g, "ළ්‍යෝ");
  s = s.replace(/fMHda/g, "ඵ්‍යෝ");
  s = s.replace(/fGHda/g, "ඨ්‍යෝ");
  s = s.replace(/fYHda/g, "ශ්‍යෝ");
  s = s.replace(/fCIHda/g, "ක්‍ෂ්‍යෝ");
  s = s.replace(/fnHda/g, "බ්‍යෝ");
  s = s.replace(/fpHda/g, "ච්‍යෝ");
  s = s.replace(/fvHda/g, "ඩ්‍යෝ");
  s = s.replace(/f\*Hda/g, "ෆ්‍යෝ");
  s = s.replace(/f\.Hda/g, "ග්‍යෝ");
  s = s.replace(/fcHda/g, "ජ්‍යෝ");
  s = s.replace(/flHda/g, "ක්‍යෝ");
  s = s.replace(/f,Hda/g, "ල්‍යෝ");
  s = s.replace(/fuHda/g, "ම්‍යෝ");
  s = s.replace(/fkHda/g, "න්‍යෝ");
  s = s.replace(/fmHda/g, "ප්‍යෝ");
  s = s.replace(/foHda/g, "ද්‍යෝ");
  s = s.replace(/fiHda/g, "ස්‍යෝ");
  s = s.replace(/fgHda/g, "ට්‍යෝ");
  s = s.replace(/fjHda/g, "ව්‍යෝ");
  s = s.replace(/f;Hda/g, "ත්‍යෝ");
  s = s.replace(/fNHda/g, "භ්‍යෝ");
  s = s.replace(/fOHda/g, "ධ්‍යෝ");
  s = s.replace(/f:Hda/g, "ථ්‍යෝ");

  // Kombuwa + Yanshaya + Aela-pilla
  s = s.replace(/fIHd/g, "ෂ්‍යො");
  s = s.replace(/fYHd/g, "ශ්‍යො");
  s = s.replace(/fLHd/g, "ඛ්‍යො");
  s = s.replace(/fCIHd/g, "ක්‍ෂ්‍යො");
  s = s.replace(/fnHd/g, "බ්‍යො");
  s = s.replace(/fjHd/g, "ව්‍යො");
  s = s.replace(/fvHd/g, "ඩ්‍යො");
  s = s.replace(/f\*Hd/g, "ෆ්‍යො");
  s = s.replace(/f\.Hd/g, "ග්‍යො");
  s = s.replace(/fcHd/g, "ජ්‍යො");
  s = s.replace(/flHd/g, "ක්‍යො");
  s = s.replace(/fuHd/g, "ම්‍යො");
  s = s.replace(/fmHd/g, "ප්‍යො");
  s = s.replace(/foHd/g, "ද්‍යො");
  s = s.replace(/fiHd/g, "ස්‍යො");
  s = s.replace(/fgHd/g, "ට්‍යො");
  s = s.replace(/fjHd/g, "ව්‍යො");
  s = s.replace(/f;Hd/g, "ත්‍යො");
  s = s.replace(/fNHd/g, "භ්‍යො");
  s = s.replace(/fOHd/g, "ධ්‍යො");
  s = s.replace(/f:Hd/g, "ථ්‍යො");

  // Kombuwa + Yanshaya
  s = s.replace(/fIH/g, "ෂ්‍යෙ");
  s = s.replace(/fPH/g, "ඡ්‍යෙ");
  s = s.replace(/f<H/g, "ළ්‍යෙ");
  s = s.replace(/fKH/g, "ණ්‍යෙ");
  s = s.replace(/fpH/g, "ච්‍යෙ");
  s = s.replace(/f,H/g, "ල්‍යෙ");
  s = s.replace(/fkH/g, "න්‍යෙ");
  s = s.replace(/fYH/g, "ශ්‍යෙ");
  s = s.replace(/fLH/g, "ඛ්‍යෙ");
  s = s.replace(/fCIH/g, "ක්‍ෂ්‍යෙ");
  s = s.replace(/fnH/g, "බ්‍යෙ");
  s = s.replace(/fvH/g, "ඩ්‍යෙ");
  s = s.replace(/f\*H/g, "ෆ්‍යෙ");
  s = s.replace(/f\.H/g, "ග්‍යෙ");
  s = s.replace(/fcH/g, "ජ්‍යෙ");
  s = s.replace(/flH/g, "ක්‍යෙ");
  s = s.replace(/fuH/g, "ම්‍යෙ");
  s = s.replace(/fmH/g, "ප්‍යෙ");
  s = s.replace(/foH/g, "ද්‍යෙ");
  s = s.replace(/fiH/g, "ස්‍යෙ");
  s = s.replace(/fgH/g, "ට්‍යෙ");
  s = s.replace(/fjH/g, "ව්‍යෙ");
  s = s.replace(/f;H/g, "ත්‍යෙ");
  s = s.replace(/fNH/g, "භ්‍යෙ");
  s = s.replace(/fOH/g, "ධ්‍යෙ");
  s = s.replace(/f:H/g, "ථ්‍යෙ");

  // Kombuwa + Rakaranshaya + Aela-pilla + Hal
  s = s.replace(/hH_/g, "ර්ය");
  s = s.replace(/fI%da/g, "ෂ්‍රෝ");
  s = s.replace(/f>%da/g, "ඝ්‍රෝ");
  s = s.replace(/fY%da/g, "ශ්‍රෝ");
  s = s.replace(/fCI%da/g, "ක්‍ෂ්‍රෝ");
  s = s.replace(/fn%da/g, "බ්‍රෝ");
  s = s.replace(/fv%da/g, "ඩ්‍රෝ");
  s = s.replace(/f\*%da/g, "ෆ්‍රෝ");
  s = s.replace(/f\.%da/g, "ග්‍රෝ");
  s = s.replace(/fl%da/g, "ක්‍රෝ");
  s = s.replace(/fm%da/g, "ප්‍රෝ");
  s = s.replace(/føda/g, "ද්‍රෝ");
  s = s.replace(/fi%da/g, "ස්‍රෝ");
  s = s.replace(/fg%da/g, "ට්‍රෝ");
  s = s.replace(/f\;%da/g, "ත්‍රෝ");

  // Kombuwa + Rakaranshaya + Aela-pilla
  s = s.replace(/fY%d/g, "ශ්‍රො");
  s = s.replace(/fv%d/g, "ඩ්‍රො");
  s = s.replace(/f\*%d/g, "ෆ්‍රො");
  s = s.replace(/f\.%d/g, "ග්‍රො");
  s = s.replace(/fl%d/g, "ක්‍රො");
  s = s.replace(/fm%d/g, "ප්‍රො");
  s = s.replace(/fød/g, "ද්‍රො");
  s = s.replace(/fi%d/g, "ස්‍රො");
  s = s.replace(/fg%d/g, "ට්‍රො");
  s = s.replace(/f\;%d/g, "ත්‍රො");

  // Kombuwa + Rakaranshaya + Hal
  s = s.replace(/%a/g, "a%");
  s = s.replace(/fYa%/g, "ශ්‍රේ");
  s = s.replace(/fí%/g, "බ්‍රේ");
  s = s.replace(/fâ%/g, "ඩ්‍රේ");
  s = s.replace(/f\*%a/g, "ෆ්‍රේ");
  s = s.replace(/f\.%a/g, "ග්‍රේ");
  s = s.replace(/fl%a/g, "ක්‍රේ");
  s = s.replace(/fm%a/g, "ප්‍රේ");
  s = s.replace(/føa/g, "ද්‍රේ");
  s = s.replace(/fia%/g, "ස්‍රේ");
  s = s.replace(/f\;a%/g, "ත්‍රේ");
  s = s.replace(/fè%/g, "ධ්‍රේ");

  // Kombuwa + Rakaranshaya
  s = s.replace(/fI%/g, "ෂ්‍රෙ");
  s = s.replace(/fY%/g, "ශ්‍රෙ");
  s = s.replace(/fn%/g, "බ්‍රෙ");
  s = s.replace(/f\*%/g, "ෆ්‍රෙ");
  s = s.replace(/f\.%/g, "ග්‍රෙ");
  s = s.replace(/fl%/g, "ක්‍රෙ");
  s = s.replace(/fm%/g, "ප්‍රෙ");
  s = s.replace(/fø/g, "ද්‍රෙ");
  s = s.replace(/fi%/g, "ස්‍රෙ");
  s = s.replace(/f\;%/g, "ත්‍රෙ");
  s = s.replace(/fN%/g, "භ්‍රෙ");
  s = s.replace(/fO%/g, "ධ්‍රෙ");

  // Kombuwa + Gayanukitta (au)
  s = s.replace(/fI!/g, "ෂෞ");
  s = s.replace(/fP!/g, "ඡෞ");
  s = s.replace(/fY!/g, "ශෞ");
  s = s.replace(/fn!/g, "බෞ");
  s = s.replace(/fp!/g, "චෞ");
  s = s.replace(/fv!/g, "ඩෞ");
  s = s.replace(/f\*!/g, "ෆෞ");
  s = s.replace(/f\.!/g, "ගෞ");
  s = s.replace(/fc!/g, "ජෞ");
  s = s.replace(/fl!/g, "කෞ");
  s = s.replace(/f,!/g, "ලෞ");
  s = s.replace(/fu!/g, "මෞ");
  s = s.replace(/fk!/g, "නෞ");
  s = s.replace(/fm!/g, "පෞ");
  s = s.replace(/fo!/g, "දෞ");
  s = s.replace(/fr!/g, "රෞ");
  s = s.replace(/fi!/g, "සෞ");
  s = s.replace(/fg!/g, "ටෞ");
  s = s.replace(/f\;!/g, "තෞ");
  s = s.replace(/fN!/g, "භෞ");
  s = s.replace(/f\[!/g, "ඤෞ");

  // Kombuwa + Consonant + Aela-pilla + Hal (oo)
  s = s.replace(/fIda/g, "ෂෝ");
  s = s.replace(/fUda/g, "ඹෝ");
  s = s.replace(/fPda/g, "ඡෝ");
  s = s.replace(/fVda/g, "ඪෝ");
  s = s.replace(/f>da/g, "ඝෝ");
  s = s.replace(/fLda/g, "ඛෝ");
  s = s.replace(/f<da/g, "ළෝ");
  s = s.replace(/f`yda/g, "ඟෝ");
  s = s.replace(/fKda/g, "ණෝ");
  s = s.replace(/fMda/g, "ඵෝ");
  s = s.replace(/fGda/g, "ඨෝ");
  s = s.replace(/f~da/g, "ඬෝ");
  s = s.replace(/fYda/g, "ශෝ");
  s = s.replace(/f\{da/g, "ඥෝ");
  s = s.replace(/f\|da/g, "ඳෝ");
  s = s.replace(/fnda/g, "බෝ");
  s = s.replace(/fpda/g, "චෝ");
  s = s.replace(/fvda/g, "ඩෝ");
  s = s.replace(/f\*da/g, "ෆෝ");
  s = s.replace(/f\.da/g, "ගෝ");
  s = s.replace(/fyda/g, "හෝ");
  s = s.replace(/fcda/g, "ජෝ");
  s = s.replace(/flda/g, "කෝ");
  s = s.replace(/f,da/g, "ලෝ");
  s = s.replace(/fuda/g, "මෝ");
  s = s.replace(/fkda/g, "නෝ");
  s = s.replace(/fmda/g, "පෝ");
  s = s.replace(/foda/g, "දෝ");
  s = s.replace(/frda/g, "රෝ");
  s = s.replace(/fida/g, "සෝ");
  s = s.replace(/fgda/g, "ටෝ");
  s = s.replace(/fjda/g, "වෝ");
  s = s.replace(/f\;da/g, "තෝ");
  s = s.replace(/fNda/g, "භෝ");
  s = s.replace(/fhda/g, "යෝ");
  s = s.replace(/f\[da/g, "ඤෝ");
  s = s.replace(/fOda/g, "ධෝ");
  s = s.replace(/f\:da/g, "ථෝ");

  // Kombuwa + Consonant + Aela-pilla (o)
  s = s.replace(/fId/g, "ෂො");
  s = s.replace(/fUd/g, "ඹො");
  s = s.replace(/fPd/g, "ඡො");
  s = s.replace(/fVd/g, "ඪො");
  s = s.replace(/f>d/g, "ඝො");
  s = s.replace(/fLd/g, "ඛො");
  s = s.replace(/f<d/g, "ළො");
  s = s.replace(/f`yd/g, "ඟො");
  s = s.replace(/fKd/g, "ණො");
  s = s.replace(/fMd/g, "ඵො");
  s = s.replace(/fGd/g, "ඨො");
  s = s.replace(/f`Vd/g, "ඬො");
  s = s.replace(/fYd/g, "ශො");
  s = s.replace(/f\{d/g, "ඥො");
  s = s.replace(/f\|d/g, "ඳො");
  s = s.replace(/fnd/g, "බො");
  s = s.replace(/fpd/g, "චො");
  s = s.replace(/fvd/g, "ඩො");
  s = s.replace(/f\*d/g, "ෆො");
  s = s.replace(/f\.d/g, "ගො");
  s = s.replace(/fyd/g, "හො");
  s = s.replace(/fcd/g, "ජො");
  s = s.replace(/fld/g, "කො");
  s = s.replace(/f,d/g, "ලො");
  s = s.replace(/fud/g, "මො");
  s = s.replace(/fkd/g, "නො");
  s = s.replace(/fmd/g, "පො");
  s = s.replace(/fod/g, "දො");
  s = s.replace(/frd/g, "රො");
  s = s.replace(/fid/g, "සො");
  s = s.replace(/fgd/g, "ටො");
  s = s.replace(/fjd/g, "වො");
  s = s.replace(/f\;d/g, "තො");
  s = s.replace(/fNd/g, "භො");
  s = s.replace(/fhd/g, "යො");
  s = s.replace(/f\[d/g, "ඤො");
  s = s.replace(/fOd/g, "ධො");
  s = s.replace(/f\:d/g, "ථො");

  // Kombuwa + Consonant + Hal (ee)
  s = s.replace(/fIa/g, "ෂේ");
  s = s.replace(/fò/g, "ඹේ");
  s = s.replace(/fPa/g, "ඡේ");
  s = s.replace(/fVa/g, "ඪේ");
  s = s.replace(/f>a/g, "ඝේ");
  s = s.replace(/fÄ/g, "ඛේ");
  s = s.replace(/f<a/g, "ළේ");
  s = s.replace(/f`Na/g, "ඟේ");
  s = s.replace(/fKa/g, "ණේ");
  s = s.replace(/fMa/g, "ඵේ");
  s = s.replace(/fGa/g, "ඨේ");
  s = s.replace(/fâ/g, "ඬේ");
  s = s.replace(/fYa/g, "ශේ");
  s = s.replace(/f\{a/g, "ඥේ");
  s = s.replace(/f\|a/g, "ඳේ");
  s = s.replace(/fËa/g, "ක්‍ෂේ");
  s = s.replace(/fí/g, "බේ");
  s = s.replace(/fÉ/g, "චේ");
  s = s.replace(/f\*a/g, "ෆේ");
  s = s.replace(/f\.a/g, "ගේ");
  s = s.replace(/fya/g, "හේ");
  s = s.replace(/fca/g, "ජේ");
  s = s.replace(/fla/g, "කේ");
  s = s.replace(/f,a/g, "ලේ");
  s = s.replace(/fï/g, "මේ");
  s = s.replace(/fka/g, "නේ");
  s = s.replace(/fma/g, "පේ");
  s = s.replace(/foa/g, "දේ");
  s = s.replace(/f¾/g, "රේ");
  s = s.replace(/fia/g, "සේ");
  s = s.replace(/fÜ/g, "ටේ");
  s = s.replace(/fõ/g, "වේ");
  s = s.replace(/f\;a/g, "තේ");
  s = s.replace(/fNa/g, "භේ");
  s = s.replace(/fha/g, "යේ");
  s = s.replace(/f\[a/g, "ඤේ");
  s = s.replace(/fè/g, "ධේ");
  s = s.replace(/f\:a/g, "ථේ");
  s = s.replace(/fÊ/g, "ජේ");

  // Kombuwa + Consonant (e)
  s = s.replace(/ta/g, "ඒ");
  s = s.replace(/wE/g, "ඈ");
  s = s.replace(/fI/g, "ෂෙ");
  s = s.replace(/fU/g, "ඹෙ");
  s = s.replace(/ft/g, "ඓ");
  s = s.replace(/fP/g, "ඡෙ");
  s = s.replace(/fV/g, "ඪෙ");
  s = s.replace(/f>/g, "ඝෙ");
  s = s.replace(/fL/g, "ඛෙ");
  s = s.replace(/f</g, "ළෙ");
  s = s.replace(/f`y/g, "ඟෙ");
  s = s.replace(/fK/g, "ණෙ");
  s = s.replace(/fM/g, "ඵෙ");
  s = s.replace(/fG/g, "ඨෙ");
  s = s.replace(/f~/g, "ඬෙ");
  s = s.replace(/fY/g, "ශෙ");
  s = s.replace(/f\{/g, "ඥෙ");
  s = s.replace(/f\|/g, "ඳෙ");
  s = s.replace(/fCI/g, "ක්‍ෂෙ");
  s = s.replace(/fn/g, "බෙ");
  s = s.replace(/fp/g, "චෙ");
  s = s.replace(/fv/g, "ඩෙ");
  s = s.replace(/f\*/g, "ෆෙ");
  s = s.replace(/f\./g, "ගෙ");
  s = s.replace(/fy/g, "හෙ");
  s = s.replace(/fc/g, "ජෙ");
  s = s.replace(/fl/g, "කෙ");
  s = s.replace(/f,/g, "ලෙ");
  s = s.replace(/fu/g, "මෙ");
  s = s.replace(/fk/g, "නෙ");
  s = s.replace(/fm/g, "පෙ");
  s = s.replace(/fo/g, "දෙ");
  s = s.replace(/fr/g, "රෙ");
  s = s.replace(/fi/g, "සෙ");
  s = s.replace(/fg/g, "ටෙ");
  s = s.replace(/fj/g, "වෙ");
  s = s.replace(/f\;/g, "තෙ");
  s = s.replace(/fN/g, "භෙ");
  s = s.replace(/fh/g, "යෙ");
  s = s.replace(/f\[/g, "ඤෙ");
  s = s.replace(/fO/g, "ධෙ");
  s = s.replace(/f\:/g, "ථෙ");

  // Diga Gayanukitta (ruu)
  s = s.replace(/IDD/g, "ෂෲ");
  s = s.replace(/YDD/g, "ශෲ");
  s = s.replace(/nDD/g, "බෲ");
  s = s.replace(/vDD/g, "ඩෲ");
  s = s.replace(/\*DD/g, "ෆෲ");
  s = s.replace(/\.DD/g, "ගෲ");
  s = s.replace(/lDD/g, "කෲ");
  s = s.replace(/mDD/g, "පෲ");
  s = s.replace(/iDD/g, "සෲ");
  s = s.replace(/gDD/g, "ටෲ");
  s = s.replace(/\;DD/g, "තෲ");
  s = s.replace(/NDD/g, "භෲ");
  s = s.replace(/ODD/g, "ධෲ");

  // Independent and complex vowels
  s = s.replace(/rE/g, "රූ");
  s = s.replace(/W!/g, "ඌ");
  s = s.replace(/T!/g, "ඖ");
  s = s.replace(/Ï/g, "ඐ");
  s = s.replace(/Æ/g, "ලූ");
  s = s.replace(/re/g, "රු");
  s = s.replace(/R/g, "ඍ");
  s = s.replace(/¨/g, "ලූ");
  s = s.replace(/§/g, "දී");
  s = s.replace(/ø/g, "ද්‍ර");
  s = s.replace(/÷/g, "ඳු");
  s = s.replace(/ÿ/g, "දු");
  s = s.replace(/ü/g, "ඤූ");
  s = s.replace(/û/g, "ඤු");
  s = s.replace(/£/g, "ඳී");
  s = s.replace(/°/g, "ඣී");
  s = s.replace(/Á/g, "ඨී");
  s = s.replace(/Â/g, "ඡී");
  s = s.replace(/Ç/g, "ඛී");
  s = s.replace(/Í/g, "රී");
  s = s.replace(/Ð/g, "ඪී");
  s = s.replace(/Ò/g, "ථී");
  s = s.replace(/Ô/g, "ජී");
  s = s.replace(/Ö/g, "චී");
  s = s.replace(/Ú/g, "ඵී");
  s = s.replace(/Ý/g, "ඵී");
  s = s.replace(/à/g, "ටී");
  s = s.replace(/ã/g, "ඞී");
  s = s.replace(/é/g, "ඬී");
  s = s.replace(/ë/g, "ධී");
  s = s.replace(/î/g, "බී");
  s = s.replace(/ó/g, "මී");
  s = s.replace(/ö/g, "ඹී");
  s = s.replace(/ù/g, "වී");
  s = s.replace(/Œ/g, "ණී");
  s = s.replace(/B/g, "ඊ");
  s = s.replace(/b/g, "ඉ");
  s = s.replace(/¢/g, "ඳි");
  s = s.replace(/È/g, "දි");
  s = s.replace(/¯/g, "ඣි");
  s = s.replace(/À/g, "ඨි");
  s = s.replace(/Å/g, "ඛි");
  s = s.replace(/ß/g, "රි");
  s = s.replace(/Î/g, "ඪි");
  s = s.replace(/Ñ/g, "චි");
  s = s.replace(/Ó/g, "ථි");
  s = s.replace(/á/g, "ටි");
  s = s.replace(/ä/g, "ඩි");
  s = s.replace(/ç/g, "ඬි");
  s = s.replace(/ê/g, "ධි");
  s = s.replace(/ì/g, "බි");
  s = s.replace(/ñ/g, "මි");
  s = s.replace(/ð/g, "ජි");
  s = s.replace(/ô/g, "ඹි");
  s = s.replace(/ú/g, "වි");
  s = s.replace(/ˉ/g, "ඣි");
  s = s.replace(/‚/g, "ණි");
  s = s.replace(/þ/g, "ඡ්");
  s = s.replace(/Ü/g, "ට්");
  s = s.replace(/Ù/g, "ඩ්");
  s = s.replace(/õ/g, "ව්");
  s = s.replace(/ò/g, "ඹ්");
  s = s.replace(/ï/g, "ම්");
  s = s.replace(/í/g, "බ්");
  s = s.replace(/è/g, "ධ්");
  s = s.replace(/å/g, "ඬ්");
  s = s.replace(/â/g, "ඞ්");
  s = s.replace(/´/g, "ඕ");
  s = s.replace(/¾/g, "ර්");
  s = s.replace(/Ä/g, "ඛ්");
  s = s.replace(/É/g, "ච්");
  s = s.replace(/Ê/g, "ජ්");
  s = s.replace(/wd/g, "ආ");
  s = s.replace(/we/g, "ඇ");
  s = s.replace(/P/g, "ඡ");
  s = s.replace(/X/g, "ඞ");
  s = s.replace(/Ì/g, "ඏ");
  s = s.replace(/“/g, "ර්‍ණ");
  s = s.replace(/I/g, "ෂ");
  s = s.replace(/U/g, "ඹ");
  s = s.replace(/V/g, "ඪ");
  s = s.replace(/>/g, "ඝ");
  s = s.replace(/CO/g, "ඣ");
  s = s.replace(/L/g, "ඛ");
  s = s.replace(/</g, "ළ");
  s = s.replace(/\`y/g, "ඟ");
  s = s.replace(/K/g, "ණ");
  s = s.replace(/M/g, "ඵ");
  s = s.replace(/G/g, "ඨ");
  s = s.replace(/¿/g, "ළු");
  s = s.replace(/~/g, "ඬ");
  s = s.replace(/Y/g, "ශ");
  s = s.replace(/\{/g, "ඥ");
  s = s.replace(/\|/g, "ඳ");
  s = s.replace(/Ë/g, "ක්‍ෂ");
  s = s.replace(/CI/g, "ක්‍ෂ");
  s = s.replace(/®/g, "ඣ");
  s = s.replace(/Õ/g, "ඟ");
  s = s.replace(/×/g, "ඥ");
  s = s.replace(/Ø/g, "ඤ");
  s = s.replace(/t/g, "එ");
  s = s.replace(/w/g, "අ");
  s = s.replace(/n/g, "බ");
  s = s.replace(/p/g, "ච");
  s = s.replace(/v/g, "ඩ");
  s = s.replace(/\*/g, "ෆ");
  s = s.replace(/\./g, "ග");
  s = s.replace(/y/g, "හ");
  s = s.replace(/c/g, "ජ");
  s = s.replace(/l/g, "ක");
  s = s.replace(/,/g, "ල");
  s = s.replace(/u/g, "ම");
  s = s.replace(/k/g, "න");
  s = s.replace(/T/g, "ඔ");
  s = s.replace(/m/g, "ප");
  s = s.replace(/o/g, "ද");
  s = s.replace(/r/g, "ර");
  s = s.replace(/i/g, "ස");
  s = s.replace(/g/g, "ට");
  s = s.replace(/W/g, "උ");
  s = s.replace(/j/g, "ව");
  s = s.replace(/;/g, "ත");
  s = s.replace(/N/g, "භ");
  s = s.replace(/h/g, "ය");
  s = s.replace(/\[/g, "ඤ");
  s = s.replace(/O/g, "ධ");
  s = s.replace(/\:/g, "ථ");

  // Joint consonants (Bandi Akuru)
  s = s.replace(/\…/g, "ත්‍ව");
  s = s.replace(/‡/g, "න්‍ද");
  s = s.replace(/†/g, "ත්‍ථ");
  s = s.replace(/F/g, "ත්‍");
  s = s.replace(/J/g, "න්‍");
  s = s.replace(/C/g, "ක්‍");
  s = s.replace(/Þ/g, "දා");
  s = s.replace(/±/g, "දැ");
  s = s.replace(/ˆ/g, "න්‍දා");

  // Pillam & Modifiers
  s = s.replace(/H/g, "්‍ය");
  s = s.replace(/%/g, "්‍ර");
  s = s.replace(/f/g, "ෙ");
  s = s.replace(/e/g, "ැ");
  s = s.replace(/E/g, "ෑ");
  s = s.replace(/q/g, "ු");
  s = s.replace(/s/g, "ි");
  s = s.replace(/Q/g, "ූ");
  s = s.replace(/=/g, "ු");
  s = s.replace(/\+/g, "ූ");
  s = s.replace(/S/g, "ී");
  s = s.replace(/D/g, "ෘ");
  s = s.replace(/!/g, "ෟ");
  s = s.replace(/d/g, "ා");
  s = s.replace(/A/g, "්");
  s = s.replace(/a/g, "්");
  s = s.replace(/x/g, "ං");
  s = s.replace(/½/g, "ඃ");
  s = s.replace(/#/g, "ඃ");
  s = s.replace(/œ/g, "ර්‍්‍ය");

  // Punctuation and quotes
  s = s.replace(/˜/g, "”");
  s = s.replace(/—/g, "”");
  s = s.replace(/™/g, "{");
  s = s.replace(/š/g, "}");
  s = s.replace(/@/g, "?");
  s = s.replace(/Z/g, "’");
  s = s.replace(/z/g, "‘");
  s = s.replace(/Ã/g, "."); // converted period

  // 3. Normalize rakaranshaya and yanshaya Unicode standard sequences
  // Replace duplicate or misplaced Zero-Width Joiners (ZWJ) with canonical Unicode Sinhala
  s = s.replace(/\u200D\u0DCA\u200D/g, "\u0DCA\u200D");
  s = s.replace(/\u200D\u0DCA/g, "\u0DCA\u200D");

  return s;
}

/**
 * Converts a text string containing [fm]...[/fm] tags to Sinhala Unicode.
 * Keeps [en]...[/en] Latin/English text intact.
 * If text doesn't contain [fm] tags but is detected as FM-Abhaya, converts the entire string.
 */
export function convertTaggedFmToUnicode(text: string): string {
  if (!text || typeof text !== 'string') return text;

  // Case 1: Tagged with [fm]...[/fm]
  if (/\[fm\]/i.test(text)) {
    return text.replace(/\[fm\]([\s\S]*?)\[\/fm\]/gi, (_match, inner) => {
      // If inner text contains [en]...[/en], protect English parts
      if (/\[en\]/i.test(inner)) {
        return inner.replace(
          /(\[en\][\s\S]*?\[\/en\])|([^\[]+)/gi,
          (_m: string, enPart?: string, fmPart?: string) => {
            if (enPart) {
              return enPart.replace(/\[\/?en\]/gi, '');
            }
            return fmAbhayaToUnicode(fmPart || '');
          }
        );
      }
      return fmAbhayaToUnicode(inner);
    });
  }

  // Case 2: Contains [en]...[/en] tags only
  if (/\[en\]/i.test(text)) {
    return text.replace(/\[\/?en\]/gi, '');
  }

  // Case 3: Untagged string but clearly FM-Abhaya text
  if (isFmSinhalaText(text)) {
    return fmAbhayaToUnicode(text);
  }

  return text;
}

/**
 * Converts a complete JSX or JS subject code string:
 * Transforms all [fm]...[/fm] tags and FM-encoded string values into clean Sinhala Unicode.
 */
export function convertJsxToUnicode(jsxCode: string): string {
  if (!jsxCode || typeof jsxCode !== 'string') return jsxCode;

  // 1. Process explicit [fm]...[/fm] tags anywhere in the file
  let result = jsxCode.replace(/\[fm\]([\s\S]*?)\[\/fm\]/gi, (_match, inner) => {
    // If inner contains [en]...[/en], protect English
    if (/\[en\]/i.test(inner)) {
      return inner.replace(
        /(\[en\][\s\S]*?\[\/en\])|([^\[]+)/gi,
        (_m: string, enPart?: string, fmPart?: string) => {
          if (enPart) return enPart.replace(/\[\/?en\]/gi, '');
          return fmAbhayaToUnicode(fmPart || '');
        }
      );
    }
    return fmAbhayaToUnicode(inner);
  });

  // Strip any remaining [en] and [/en] tags
  result = result.replace(/\[\/?en\]/gi, '');

  return result;
}

/**
 * Deeply traverses any object, converting all string fields that contain
 * FM-Abhaya tags or content into Sinhala Unicode.
 */
export function convertSubjectObjectToUnicode<T>(obj: T): T {
  if (!obj) return obj;

  if (typeof obj === 'string') {
    return convertTaggedFmToUnicode(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertSubjectObjectToUnicode(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const copy: any = {};
    for (const [key, value] of Object.entries(obj)) {
      copy[key] = convertSubjectObjectToUnicode(value);
    }
    return copy as T;
  }

  return obj;
}
