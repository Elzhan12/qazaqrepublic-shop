/* ==========================================================
   QazaqRepublic — главная страница
   ========================================================== */

function boot() {
  const P = QR_PLACEHOLDER;
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* --- сцены-картинки (реальные фото бренда) --- */
  const SLIDE = 'https://qazaqrepublic.com/uploads/main_slide/';
  const REAL = {
    hero1:  SLIDE + '6d1ee971-a471-443f-b19e-5c1e97d12453.jpg',
    hero2:  SLIDE + 'e681ce33-1fca-43e4-a74a-348f62caaec8.jpeg',
    hero3:  SLIDE + '410113c1-968d-4ea0-8b41-386ed19c7fb3.jpeg',
    about1: SLIDE + '66791330-40db-44f8-9903-b1690a9c99dc.jpeg',
    about2: SLIDE + 'ddd6e9e1-8151-4861-838a-35543d89cade.jpeg'
  };
  const FALLBACK = {
    hero1:  { glyphs: ['hoodie', 'shirt', 'cap'] },
    hero2:  { glyphs: ['pants', 'bag'] },
    hero3:  { glyphs: ['cap', 'shirt'] },
    about1: { glyphs: ['coat', 'hoodie', 'shirt'] },
    about2: { glyphs: ['bag', 'acc'] }
  };
  $$('[data-scene]').forEach(function (el) {
    const k = el.dataset.scene;
    el.src = REAL[k] || P.sceneImage(k, FALLBACK[k] || {});
    el.decoding = 'async';
  });

  /* обложка категории — реальное фото товара из этой категории */
  function catCover(id, icon) {
    const list = QR.products.filter(function (p) { return p.cat === id; });
    const star = list.filter(function (p) { return p.badge === 'sale'; })[0] || list[0];
    return star && star.img ? star.img[0] : P.sceneImage('cat' + id, { glyphs: [icon || 'shirt'] });
  }

  /* --- бегущая строка --- */
  const mq = $('#qrMarquee');
  if (mq) {
    const keys = ['strip.1', 'strip.2', 'strip.3', 'strip.4', 'strip.5'];
    let html = '';
    for (let pass = 0; pass < 2; pass++) {
      keys.forEach(function (k) {
        html += '<span class="marquee__item">' + P.esc(QR.t(k)) + '</span>';
      });
    }
    mq.innerHTML = html;
  }

  /* --- категории --- */
  const cats = $('#qrCats');
  if (cats) {
    cats.innerHTML = CATEGORIES.map(function (c, i) {
      const n = QR.products.filter(function (p) { return p.cat === c.id; }).length;
      return '' +
      '<a class="cat" href="catalog.html?cat=' + c.id + '" data-rv style="--d:' + (i * 0.08) + 's">' +
        '<span class="cat__img"><img src="' + catCover(c.id, c.icon) + '" alt="' + P.esc(QR.L(c)) + '" loading="lazy"></span>' +
        '<span class="cat__body">' +
          '<span class="cat__ic">' + P.icon(c.icon) + '</span>' +
          '<span class="cat__t">' + P.esc(QR.L(c)) + '</span>' +
          '<span class="cat__n">' + n + ' ' + (QR.lang === 'ru' ? 'мод.' : 'мод.') + '</span>' +
          '<span class="cat__go">' + P.esc(QR.lang === 'ru' ? 'Смотреть' : 'Көру') + P.icon('arrow') + '</span>' +
        '</span>' +
      '</a>';
    }).join('');
    QR.reveal(cats);
  }

  /* --- хиты: сперва со скидкой, потом новинки --- */
  const hits = $('#qrHits');
  if (hits) {
    hits.innerHTML = QR.skeletons(8);
    setTimeout(function () {
      const sale = QR.products.filter(function (p) { return p.badge === 'sale'; });
      const rest = QR.products.filter(function (p) { return p.badge !== 'sale'; });
      hits.innerHTML = QR.productGrid(sale.concat(rest).slice(0, 8));
      QR.reveal(hits);
      document.dispatchEvent(new CustomEvent('qr:cards'));
    }, 520);
  }

  /* --- этапы работы --- */
  const craft = $('#qrCraft');
  if (craft) {
    craft.innerHTML = [1, 2, 3, 4].map(function (n, i) {
      return '' +
      '<div class="craft__step" data-rv style="--d:' + (i * 0.09) + 's">' +
        '<div class="craft__n">' + n + '</div>' +
        '<h3 class="craft__t">' + P.esc(QR.t('craft.' + n + '.t')) + '</h3>' +
        '<p class="craft__d">' + P.esc(QR.t('craft.' + n + '.d')) + '</p>' +
      '</div>';
    }).join('');
    QR.reveal(craft);
  }

  /* --- преимущества --- */
  const feats = $('#qrFeats');
  if (feats) {
    feats.innerHTML = ['about.f1', 'about.f2', 'about.f3', 'about.f4'].map(function (k) {
      return '<div class="about__feat">' + P.icon('check') + '<span>' + P.esc(QR.t(k)) + '</span></div>';
    }).join('');
  }

  /* --- отзывы --- */
  const rev = $('#qrReviews');
  if (rev) {
    rev.innerHTML = REVIEWS.map(function (r, i) {
      const stars = Array.from({ length: 5 }, function (_, n) {
        return '<span class="ic ' + (n < r.rating ? '' : 'off') + '">' + P.icon('star') + '</span>';
      }).join('');
      const initials = QR.L(r.name).split(' ').map(function (w) { return w.charAt(0); }).slice(0, 2).join('');
      return '' +
      '<article class="review" data-rv style="--d:' + (i * 0.07) + 's">' +
        '<div class="review__stars">' + stars + '</div>' +
        '<p class="review__t">«' + P.esc(QR.L(r.text)) + '»</p>' +
        '<div class="review__a"><span class="review__av">' + P.esc(initials) + '</span>' +
          '<span><b>' + P.esc(QR.L(r.name)) + '</b><span>' + P.esc(QR.L(r.city)) + '</span></span></div>' +
      '</article>';
    }).join('');
    QR.reveal(rev);
  }

  /* --- подписи цифр --- */
  const stitch = $('#qrStatStitch');
  if (stitch) stitch.textContent = QR.lang === 'ru' ? 'категорий' : 'санаттары';
  const rate = $('#qrStatRate');
  if (rate) rate.textContent = QR.lang === 'ru' ? 'оценка покупателей' : 'сатып алушы бағасы';

  /* --- рассылка --- */
  const nf = $('#qrNews');
  if (nf) {
    nf.addEventListener('submit', function (e) {
      e.preventDefault();
      const inp = nf.querySelector('input');
      if (!inp.value || inp.value.indexOf('@') < 1) {
        QR.toast(QR.lang === 'ru' ? 'Проверьте email' : 'Emailды тексеріңіз', 'err');
        inp.focus();
        return;
      }
      QR.toast(QR.t('news.ok'));
      inp.value = '';
    });
  }

  /* --- мета-описание --- */
  const meta = $('#qrMeta');
  if (meta) meta.setAttribute('content', QR.t('meta.desc'));
}

if (document.readyState === 'loading') document.addEventListener('qr:ready', boot);
else boot();