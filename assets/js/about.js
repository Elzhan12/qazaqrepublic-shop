/* ==========================================================
   QazaqRepublic — страница «О мастерской»
   ========================================================== */

function boot() {
  const P = QR_PLACEHOLDER;
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  const RU = QR.lang === 'ru';

  const SLIDE = 'https://qazaqrepublic.com/uploads/main_slide/';
  const REAL = {
    about1: SLIDE + '66791330-40db-44f8-9903-b1690a9c99dc.jpeg',
    about2: SLIDE + '742a1b9c-0c95-45ce-ad8f-bff98d2f44bd.jpeg'
  };
  const FALLBACK = { about1: { glyphs: ['coat', 'hoodie', 'shirt'] }, about2: { glyphs: ['bag', 'acc'] } };
  $$('[data-scene]').forEach(function (el) {
    el.src = REAL[el.dataset.scene] || P.sceneImage(el.dataset.scene, FALLBACK[el.dataset.scene] || {});
    el.decoding = 'async';
  });

  const feats = $('#qrFeats');
  if (feats) {
    feats.innerHTML = ['about.f1', 'about.f2', 'about.f3', 'about.f4'].map(function (k) {
      return '<div class="about__feat">' + P.icon('check') + '<span>' + P.esc(QR.t(k)) + '</span></div>';
    }).join('');
  }

  const craft = $('#qrCraft');
  if (craft) {
    craft.innerHTML = [1, 2, 3, 4].map(function (n, i) {
      return '<div class="craft__step" data-rv style="--d:' + (i * 0.09) + 's">' +
        '<div class="craft__n">' + n + '</div>' +
        '<h3 class="craft__t">' + P.esc(QR.t('craft.' + n + '.t')) + '</h3>' +
        '<p class="craft__d">' + P.esc(QR.t('craft.' + n + '.d')) + '</p></div>';
    }).join('');
    QR.reveal(craft);
  }

  /* материалы — карточки товаров по ткани */
  const fabT = $('#qrFabT');
  if (fabT) fabT.textContent = RU ? 'Из чего мы шьём' : 'Немінен тігеміз';

  const fabBox = $('#qrFab');
  if (fabBox) {
    const first = QR.products.filter(function (p) { return p.fabric === 'silk'; }).slice(0, 2)
      .concat(QR.products.filter(function (p) { return p.fabric === 'felt'; }).slice(0, 1))
      .concat(QR.products.filter(function (p) { return p.fabric === 'wool'; }).slice(0, 1));
    fabBox.innerHTML = first.map(function (p, i) {
      return '<div data-rv style="--d:' + (i * 0.07) + 's">' + QR.productCard(p) + '</div>';
    }).join('');
    QR.reveal(fabBox);
    document.dispatchEvent(new CustomEvent('qr:cards'));
  }

  const st = $('#qrStitch');
  if (st) st.textContent = RU ? 'категорий' : 'санаттары';
  const rt = $('#qrRate');
  if (rt) rt.textContent = RU ? 'оценка покупателей' : 'сатып алушы бағасы';
  const relT = $('#qrRelT');
  if (relT) relT.textContent = RU ? 'Из цеха' : 'Шеберханадан';

  const rel = $('#qrRel');
  if (rel) {
    const list = QR.products.filter(function (p) { return p.badge === 'hit' || p.badge === 'sale'; }).slice(0, 4);
    rel.innerHTML = QR.skeletons(4);
    setTimeout(function () {
      rel.innerHTML = QR.productGrid(list);
      QR.reveal(rel);
      document.dispatchEvent(new CustomEvent('qr:cards'));
    }, 300);
  }
}

if (document.readyState === 'loading') document.addEventListener('qr:ready', boot);
else boot();