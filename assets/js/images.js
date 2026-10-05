/* ==========================================================
   QazaqRepublic — генератор SVG-фолбэков.
   Основные фото берутся с qazaqrepublic.com; если картинка
   не загрузилась, рисуем градиент + диагональный паттерн +
   силуэт вещи. Логотип — монограмма QR, полоса-разделитель.
   ========================================================== */

const QR_PLACEHOLDER = (function () {
  'use strict';

const PALETTES = [
    ['#1b1b20', '#3a3a44'],
    ['#23262e', '#454b57'],
    ['#2a2f3a', '#4e5666'],
    ['#1f2933', '#3e4c59'],
    ['#26262b', '#4a4a52'],
    ['#33272a', '#5c4448'],
    ['#1d2b2a', '#3a4f4c'],
    ['#2b2722', '#544c42'],
    ['#232833', '#414a5c'],
    ['#2e2a33', '#544c60']
  ];


  /* Силуэты одежды, viewBox 0 0 120 140 */
  const GLYPH = {
    dress: {
      body: 'M42,22 L26,34 L18,58 L32,62 L38,48 L44,66 L26,126 L94,126 L76,66 L82,48 L88,62 L102,58 L94,34 L78,22 L60,33 Z',
      extra: ['M44,66 L76,66', 'M52,20 L60,33 L68,20']
    },
    coat: {
      body: 'M46,24 L26,34 L18,62 L32,66 L38,48 L40,128 L80,128 L82,48 L88,66 L102,62 L94,34 L74,24 L60,42 Z',
      extra: ['M60,42 L60,128', 'M60,42 L46,26 M60,42 L74,26', 'M40,104 L80,104']
    },
    shirt: {
      body: 'M44,22 L28,32 L20,58 L32,62 L38,46 L38,122 L82,122 L82,46 L88,62 L100,58 L92,32 L76,22 L60,34 Z',
      extra: ['M44,22 L60,34 L76,22', 'M60,34 L60,122']
    },
    vest: {
      body: 'M46,24 L32,34 L32,84 L44,92 L44,44 L76,44 L76,92 L88,84 L88,34 L74,24 L60,38 Z',
      extra: ['M32,78 L88,78', 'M60,38 L60,128', 'M38,128 L38,92', 'M82,128 L82,92']
    },
    pants: {
      body: 'M40,22 L34,124 L52,124 L60,66 L68,124 L86,124 L80,22 Z',
      extra: ['M36,22 L84,22', 'M60,26 L60,66']
    },
    hat: {
      body: 'M28,116 L28,84 C28,54 42,34 60,34 C78,34 92,54 92,84 L92,116 Z',
      extra: ['M18,116 L102,116 L102,128 L18,128 Z', 'M60,26 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0']
    },
    cap: {
      body: 'M32,86 L32,58 C32,40 44,32 60,32 C76,32 88,40 88,58 L88,86 Z',
      extra: ['M86,80 C98,80 108,86 108,92 C108,96 100,96 86,96 Z', 'M30,86 L90,86']
    },
    shoqal: {
      body: 'M46,124 L46,54 C46,38 52,28 60,19 C68,28 74,38 74,54 L74,124 Z',
      extra: ['M36,68 L46,72 L46,100 L36,96 Z', 'M84,68 L74,72 L74,100 L84,96 Z', 'M40,116 L80,116 L80,128 L40,128 Z']
    },
    scarf: {
      body: 'M42,16 C33,40 33,60 39,76 C45,92 39,106 32,120 L50,120 C59,104 63,88 57,72 C51,56 51,38 58,16 Z',
      extra: []
    },
    shoes: {
      body: 'M28,32 L46,32 L46,78 L76,78 C82,84 82,98 74,98 L26,98 C21,98 21,90 21,84 L21,36 Z',
      extra: ['M90,46 L104,46 L104,86 L118,86 C122,90 122,100 116,100 L92,100 C88,100 88,94 88,90 L88,50 Z',
              'M21,84 L26,84', 'M88,90 L92,90']
    },
acc: {
    body: 'M60,20 L94,62 L26,62 Z',
    extra: ['M38,74 L82,74 L60,110 Z', 'M60,30 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0']
  },
  hoodie: {
    body: 'M42,26 L26,40 L22,64 L34,68 L40,52 L38,124 L82,124 L80,52 L86,68 L98,64 L94,40 L78,26 L60,40 Z',
    extra: ['M46,30 C50,20 70,20 74,30 L74,40 C70,46 50,46 46,40 Z',
      'M60,40 L60,52 M52,52 L68,52', 'M38,96 L82,96']
  },
  knit: {
    body: 'M44,24 L28,34 L24,58 L36,62 L40,48 L40,124 L80,124 L80,48 L84,62 L96,58 L92,34 L76,24 L60,36 Z',
    extra: ['M44,24 C50,32 70,32 76,24', 'M60,36 L60,124', 'M48,56 L72,56 M48,72 L72,72 M48,88 L72,88']
  },
  cap: {
    body: 'M32,86 L32,58 C32,40 44,32 60,32 C76,32 88,40 88,58 L88,86 Z',
    extra: ['M86,80 C98,80 108,86 108,92 C108,96 100,96 86,96 Z', 'M30,86 L90,86']
  },
  bag: {
    body: 'M28,58 L92,58 L100,122 L20,122 Z',
    extra: ['M40,58 C40,34 80,34 80,58', 'M20,74 L100,74', 'M56,74 L64,74 L64,90 L56,90 Z']
  },
  mug: {
    body: 'M34,52 L86,52 L82,120 L38,120 Z',
    extra: ['M86,66 C104,66 104,96 86,96', 'M34,52 L86,52 L86,62 L34,62 Z', 'M60,34 L60,52']
  },
  gift: {
    body: 'M18,56 L102,56 L102,124 L18,124 Z',
    extra: ['M18,56 L18,36 L102,36 L102,56 Z', 'M60,36 L60,124', 'M60,36 C48,36 42,22 52,20 C60,19 60,36 60,36 Z',
      'M60,36 C72,36 78,22 68,20 C60,19 60,36 60,36 Z']
  },

    kids: {
      body: 'M46,30 L32,40 L26,60 L38,64 L43,52 L48,68 L32,122 L88,122 L72,68 L77,52 L82,64 L94,60 L88,40 L74,30 L60,40 Z',
      extra: ['M48,68 L72,68', 'M54,28 L60,40 L66,28']
    }
  };

  /* Иконки интерфейса (24×24, stroke) */
  const ICON = {
    dress: '<path d="M9 3l3 2 3-2 3 4-2 2v12H8V9L6 7z"/>',
    coat: '<path d="M9 3l3 2 3-2 3 2 3 3-2 2v14H8V8L6 6z"/><path d="M12 5v18"/>',
    shirt: '<path d="M9 3l3 2 3-2 4 2 2 5-3 1v12H6V11H3V6z"/><path d="M9 3l3 4 3-4"/>',
    pants: '<path d="M7 3h10v18l-3 0-2-11-2 11H7z"/>',
    hat: '<path d="M5 17h14v3H5z"/><path d="M6 17c0-7 2-12 6-12s6 5 6 12"/>',
    scarf: '<path d="M8 3c-3 5-2 8 0 11s2 6-1 7h4c3-4 3-7 1-10s-1-6 2-8z"/><path d="M16 3c3 5 2 8 0 11s-2 6 1 7h-4c-3-4-3-7-1-10s1-6-2-8z"/>',
    shoes: '<path d="M3 8h4v8h9c1 0 1 3 0 3H4c-1 0-1-2-1-3z"/><path d="M15 11h3v6h8c1 0 1 3 0 3h-11z"/>',
    acc: '<path d="M12 3l8 8H4z"/><path d="M6 15h12l-6 6z"/>',
    kids: '<circle cx="12" cy="7" r="4"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7z"/>',
  hoodie: '<path d="M9 4l3 2 3-2 4 3 2 6-3 1v10H6V14H3v-6l2-3z"/><path d="M9 4a3 3 0 016 0"/><path d="M12 8v3M10 11h4"/>',
  knit: '<path d="M9 4l3 2 3-2 4 3 2 5-3 1v11H6V13H3V8l2-3z"/><path d="M6 10h12M6 14h12M6 18h12"/>',
  cap: '<path d="M5 15h14v3H5z"/><path d="M6 15c0-6 2-10 6-10s6 4 6 10"/><path d="M19 14c2 0 3 1 3 2h-3z"/>',
  bag: '<path d="M6 8h12l2 13H4z"/><path d="M9 8V6a3 3 0 016 0v2"/><path d="M4 12h16"/>',
  mug: '<path d="M5 7h10v13H5z"/><path d="M15 10c3 0 3 6 0 6"/>',
    cart: '<path d="M3 4h2l3 12h10l3-9H6"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/>',
    heart: '<path d="M12 20s-8-5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5-8 10-8 10z"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    arrow: '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="M4 13l5 5L20 6"/>',
    star: '<path d="M12 3l2.7 6 6.3.6-4.8 4.2 1.4 6.2L12 16.8 6.4 20l1.4-6.2L3 9.6 9.3 9z"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    phone: '<path d="M6 3h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z"/>',
    mail: '<path d="M3 6h18v12H3z"/><path d="M3 6l9 7 9-7"/>',
    pin: '<path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
    truck: '<path d="M2 7h11v10H2z"/><path d="M13 10h4l3 3v4h-7z"/><circle cx="6" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    gift: '<path d="M3 11h18v9H3z"/><path d="M3 7h18v4H3z"/><path d="M12 7v13"/><path d="M12 7S9 3 7 5s5 2 5 2zM12 7s3-4 5-2-5 2-5 2z"/>',
    filter: '<path d="M3 5h18M6 12h12M10 19h4"/>',
    sliders: '<path d="M4 8h10M18 8h2M4 16h4M12 16h8"/><circle cx="16" cy="8" r="2"/><circle cx="10" cy="16" r="2"/>',
    grid: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
    copy: '<path d="M9 9h11v11H9z"/><path d="M4 15V4h11"/>',
    refresh: '<path d="M20 12a8 8 0 11-2.3-5.6"/><path d="M20 4v5h-5"/>',
    whatsapp: '<path d="M12 3a9 9 0 00-7.7 13.7L3 21l4.4-1.3A9 9 0 1012 3z"/><path d="M9 9c0 3 2 5 5 5l1-1.5-2-1-1 1a4 4 0 01-2-2l1-1-1-2z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1"/>'
  };

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h;
  }

  function svg(inner, w, h) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '">' + inner + '</svg>'
    );
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function icon(name, cls) {
    const d = ICON[name] || ICON.grid;
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }

  /* ---- картинка товара ---- */
  function fallbackImage(p) {
    return productImage({ id: (p && p.id) || 'qr', glyph: (p && p.glyph) || 'shirt' }, 0);
  }

  function productImage(p, variant) {
    variant = variant || 0;
    if (p && p.img && p.img.length) return p.img[variant % p.img.length];
    const seed = hash((p && p.id ? p.id : 'x') + ':' + variant);
    const pal = PALETTES[(hash(p.id) + variant * 3) % PALETTES.length];
    const angle = [135, 45, 160, 20][variant % 4];
    const gid = 'g' + seed.toString(36);
    const glyph = GLYPH[p.glyph] || GLYPH.dress;
    const scale = [1, 1.06, 2.3, 1.12][variant % 4];
    const tx = [0, 0, -55, 0][variant % 4];
    const ty = [0, 0, -95, 0][variant % 4];
    const rot = [0, 0, 0, 6][variant % 4];

    const extra = glyph.extra
      .map(function (d) { return '<path d="' + d + '"/>'; }).join('');

    const inner =
      '<defs>' +
        '<linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1" ' +
          'gradientTransform="rotate(' + angle + ' 0.5 0.5)">' +
          '<stop offset="0" stop-color="' + pal[0] + '"/>' +
          '<stop offset="1" stop-color="' + pal[1] + '"/>' +
        '</linearGradient>' +
        '<radialGradient id="' + gid + 'v" cx="0.5" cy="0.42" r="0.75">' +
          '<stop offset="0" stop-color="#fff" stop-opacity="0.30"/>' +
          '<stop offset="1" stop-color="#000" stop-opacity="0.22"/>' +
        '</radialGradient>' +
        '<pattern id="' + gid + 'p" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
          '<rect width="23" height="46" fill="#ffffff" fill-opacity="0.055"/>' +
        '</pattern>' +
      '</defs>' +
      '<rect width="600" height="750" fill="url(#' + gid + ')"/>' +
      '<rect width="600" height="750" fill="url(#' + gid + 'p)"/>' +
      '<rect width="600" height="750" fill="url(#' + gid + 'v)"/>' +
      '<g transform="translate(300,395) rotate(' + rot + ') scale(' + scale + ') translate(' + tx + ',' + ty + ')" ' +
        'fill="#ffffff" fill-opacity="0.16" stroke="#ffffff" stroke-opacity="0.5" ' +
        'stroke-width="2" stroke-linejoin="round" stroke-linecap="round">' +
        '<path d="' + glyph.body + '"/>' + extra +
      '</g>' +
      '<rect x="18" y="18" width="564" height="714" fill="none" stroke="#ffffff" ' +
        'stroke-opacity="0.22" stroke-width="1.5"/>' +
      '<g fill="#ffffff" fill-opacity="0.28">' +
        '<path d="M0,0 L600,0 L600,8 L0,8 Z"/><path d="M0,742 L600,742 L600,750 L0,750 Z"/>' +
      '</g>';

    return svg(inner, 600, 750);
  }

  /* ---- обложка категории / баннер ---- */
  function sceneImage(seedStr, opts) {
    opts = opts || {};
    const seed = hash(seedStr);
    const pal = PALETTES[seed % PALETTES.length];
    const glyphs = opts.glyphs || ['dress', 'coat', 'hat'];
    const gid = 's' + seed.toString(36);
    const items = glyphs.map(function (g, i) {
      const gl = GLYPH[g] || GLYPH.dress;
      const x = 150 + i * 150 + (seed % 30);
      const y = 400 + ((seed >> (i * 3)) % 60);
      const s = 0.9 + (((seed >> (i * 2)) % 20) / 100);
      return '<g transform="translate(' + x + ',' + y + ') rotate(' + ((seed >> i) % 24 - 12) + ') scale(' + s + ') translate(-60,-70)" ' +
        'fill="#ffffff" fill-opacity="0.13" stroke="#ffffff" stroke-opacity="0.42" stroke-width="2" stroke-linejoin="round">' +
        '<path d="' + gl.body + '"/>' +
        gl.extra.map(function (d) { return '<path d="' + d + '"/>'; }).join('') + '</g>';
    }).join('');

    const inner =
      '<defs>' +
        '<linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="' + pal[0] + '"/><stop offset="1" stop-color="' + pal[1] + '"/>' +
        '</linearGradient>' +
'<pattern id="' + gid + 'p" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
          '<rect width="23" height="46" fill="#fff" fill-opacity="0.05"/>' +
        '</pattern>' +

      '</defs>' +
      '<rect width="600" height="750" fill="url(#' + gid + ')"/>' +
      '<rect width="600" height="750" fill="url(#' + gid + 'p)"/>' +
      items +
      '<rect x="18" y="18" width="564" height="714" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5"/>';

    return svg(inner, 600, 750);
  }

/* ---- разделительная полоса (streetwear) ---- */
  function ornamentStrip(color) {
    const c = color || '#ff4d1f';
    const W = 1400, H = 80, step = 46;
    let bars = '';
    for (let x = -H; x < W + H; x += step * 2) {
      bars += '<path d="M' + x + ',' + H + ' L' + (x + H) + ',0 L' + (x + H + step) + ',0 L' + (x + step) + ',' + H + ' Z"/>';
    }
    const dots = [];
    for (let x = 20; x < W; x += step * 2) dots.push('<circle cx="' + x + '" cy="' + (H / 2) + '" r="3.4"/>');
    return svg(
      '<g fill="' + c + '" fill-opacity="0.85">' + bars + '</g>' +
      '<g fill="' + c + '" fill-opacity="0.5">' + dots.join('') + '</g>',
      W, H
    );
  }

  /* ---- монограмма QR ---- */
  function logoMark(mono) {
    const c = mono ? 'currentColor' : '#ff4d1f';
    const inner =
      '<rect x="1" y="1" width="50" height="38" rx="3" fill="none" stroke="' + c + '" stroke-width="2.6"/>' +
      '<path d="M10,32 L20,12 L30,32 L40,12 L44,32" fill="none" stroke="' + c + '" stroke-width="3" stroke-linejoin="miter" stroke-linecap="square"/>' +
      '<path d="M27,32 L33,20 L39,32" fill="none" stroke="' + c + '" stroke-width="2.2" stroke-linejoin="miter"/>';
    return svg(inner, 52, 40);
  }


  return {
    icon: icon,
    productImage: productImage,
  fallbackImage: fallbackImage,
    sceneImage: sceneImage,
    ornamentStrip: ornamentStrip,
    logoMark: logoMark,
    esc: esc
  };
})();