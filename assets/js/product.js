/* ==========================================================
   QazaqRepublic — карточка товара
   ========================================================== */

function boot() {
  const P = QR_PLACEHOLDER;
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  const id = new URLSearchParams(location.search).get('id');
  const p = QR.product(id);

  const box = $('#qrPd');

  if (!p) {
    document.title = QR.t('product.notFound') + ' — QazaqRepublic';
    box.innerHTML = '<div class="empty">' +
      '<span class="empty__ic">' + P.icon('search') + '</span>' +
      '<h2 class="h-md">' + P.esc(QR.t('product.notFound')) + '</h2>' +
      '<p class="muted">' + P.esc(QR.t('products.empty')) + '</p>' +
      '<a class="btn btn-gold" href="catalog.html">' + P.esc(QR.t('cart.go')) + '</a></div>';
    return;
  }

  /* ---------- Шапка ---------- */
  document.title = QR.L(p.name) + ' — QazaqRepublic';
  $('#qrPName').textContent = QR.L(p.name);
  $('#qrCrumbName').textContent = QR.L(p.name);
  const cc = $('#qrCrumbCat');
  cc.textContent = QR.category(p.cat);
  cc.href = 'catalog.html?cat=' + p.cat;
  const meta = $('#qrMeta');
  if (meta) meta.setAttribute('content', QR.L(p.desc).slice(0, 160));

  /* ---------- Состояние выбора ---------- */
  const state = { size: p.sizes.length === 1 ? p.sizes[0] : '', color: p.colors[0], qty: 1, view: 0 };

  const off = QR.discount(p);
  const low = p.stock != null && p.stock <= 10;
  const gallery = [0, 1, 2, 3].map(function (v) { return P.productImage(p, v); });

  const sizesLine = p.sizes.length > 1
    ? QR.t('product.size') + ': ' + p.sizes.join(' / ')
    : QR.t('product.size') + ': ' + p.sizes[0];

  box.innerHTML = '' +
  '<div class="pd">' +
    '<div class="gal" data-rv="left">' +
      '<div class="gal__thumbs" id="qrThumbs">' +
        gallery.map(function (src, i) {
          return '<button type="button" class="gal__thumb' + (i === 0 ? ' on' : '') + '" data-g="' + i + '">' +
            '<img src="' + src + '" alt="" loading="lazy"></button>';
        }).join('') +
      '</div>' +
      '<div class="gal__main" id="qrMain">' +
        '<div class="sk"></div>' +
        '<img id="qrMainImg" src="' + gallery[0] + '" alt="' + P.esc(QR.L(p.name)) + '" style="opacity:0">' +
        '<span class="gal__hint">' + P.icon('search') + P.esc(QR.lang === 'ru' ? 'Наведите' : 'Тінтур') + '</span>' +
      '</div>' +
    '</div>' +

    '<div data-rv="right">' +
      '<div class="pcard__badges" style="position:static;flex-direction:row;margin-bottom:14px">' +
        (p.badge === 'new' ? '<span class="badge badge-new">' + (QR.lang === 'ru' ? 'новинка' : 'жаңа') + '</span>' : '') +
        (p.badge === 'hit' ? '<span class="badge badge-hit">' + (QR.lang === 'ru' ? 'хит' : 'таңдаулы') + '</span>' : '') +
        (off > 0 ? '<span class="badge badge-sale">−' + off + '%</span>' : '') +
        (p.badge === 'sale' && off === 0 ? '<span class="badge badge-sale">' + (QR.lang === 'ru' ? 'акция' : 'акция') + '</span>' : '') +
      '</div>' +

      '<div class="pd__meta muted" style="font-size:.82rem">' +
        P.esc(QR.category(p.cat)) + ' · ' + P.esc(QR.typeLabel(p.type)) + ' · ' + P.esc(QR.fabricLabel(p.fabric)) +
      '</div>' +

      '<h2 class="pd__t">' + P.esc(QR.L(p.name)) + '</h2>' +

      '<div class="pd__price">' +
        '<b>' + QR.priceLabel(p) + '</b>' +
        (off > 0 ? '<s>' + QR.money(p.oldPrice) + '</s><em>' + (QR.lang === 'ru' ? 'выгодно' : 'тиімді') + '</em>' : '') +
      '</div>' +

      '<div class="pd__row">' +
        '<span class="stock' + (low ? ' low' : '') + '"><i></i>' +
          (QR.inStock(p) ? (low ? QR.t('product.left') + ': ' + p.stock + ' ' + (QR.lang === 'ru' ? 'шт.' : 'дана') + ' · ' : '') + QR.t('product.stock') : (QR.lang === 'ru' ? 'нет в наличии' : 'жоқ')) +
        '</span>' +
        '<span class="muted">' + P.esc(sizesLine) + '</span>' +
      '</div>' +

      '<div class="pd__label"><span data-i18n="product.size">Размер</span><button type="button" id="qrSizeTbl">' + P.esc(QR.t('product.sizetable')) + '</button></div>' +
      '<div class="opt-row" id="qrSizes">' + QR.sizesHtml(p, 'opt') + '</div>' +

      '<div class="pd__label"><span data-i18n="product.color">Цвет</span><span class="muted" id="qrColorName" style="font-weight:600;text-transform:none;letter-spacing:0"></span></div>' +
      '<div class="opt-row" id="qrColors">' +
        p.colors.map(function (c) {
          return '<button type="button" class="opt opt--color' + (c === state.color ? ' on' : '') + '" data-c="' + c + '" ' +
            'style="--c:' + QR.color(c).hex + '" title="' + P.esc(QR.L(QR.color(c))) + '" aria-label="' + P.esc(QR.L(QR.color(c))) + '"></button>';
        }).join('') +
      '</div>' +

      '<div class="pd__label"><span>' + P.esc(QR.lang === 'ru' ? 'Количество' : 'Саны') + '</span></div>' +
      '<div class="qty">' +
        '<button type="button" data-q="-1" aria-label="−">' + P.icon('minus') + '</button>' +
        '<span id="qrQty">1</span>' +
        '<button type="button" data-q="1" aria-label="+">' + P.icon('plus') + '</button>' +
      '</div>' +

      '<div class="pd__buy">' +
        '<button class="btn btn-gold btn-lg" id="qrAdd" ' + (QR.inStock(p) ? '' : 'disabled') + '>' +
          P.icon('cart') + '<span>' + P.esc(QR.t('products.add')) + '</span></button>' +
        '<button class="btn btn-ghost btn-lg btn-icon" id="qrWish" title="" aria-label="' + P.esc(QR.t('nav.wishlist')) + '">' + P.icon('heart') + '</button>' +
      '</div>' +

      '<div class="usps">' +
        '<div class="usp">' + P.icon('truck') + '<span><b>' + P.esc(QR.lang === 'ru' ? 'Доставка' : 'Жеткізу') + '</b><span>' + (QR.lang === 'ru' ? 'Алматы — 1 день, 1 500 ₸' : 'Алматы — 1 күн, 1 500 ₸') + '</span></span></div>' +
        '<div class="usp">' + P.icon('shield') + '<span><b>' + P.esc(QR.lang === 'ru' ? 'Оплата при получении' : 'Қолма-қол алу') + '</b><span>' + (QR.lang === 'ru' ? 'Можно осмотреть вещь' : 'Киімді қарап алуға болады') + '</span></span></div>' +
        '<div class="usp">' + P.icon('refresh') + '<span><b>' + P.esc(QR.t('strip.5')) + '</b><span>' + (QR.lang === 'ru' ? 'Обмен без лишних вопросов' : 'Қиындықсыз ауыстыру') + '</span></span></div>' +
        '<div class="usp">' + P.icon('gift') + '<span><b>' + P.esc(QR.lang === 'ru' ? 'Подарочная упаковка' : 'Сыйлық орама') + '</b><span>' + (QR.lang === 'ru' ? 'Бесплатно' : 'Тегін') + '</span></span></div>' +
      '</div>' +

      '<div class="acc">' +
        '<div class="acc__item open"><button type="button" class="acc__btn"><span data-i18n="product.desc">Описание</span>' + P.icon('chevron') + '</button>' +
          '<div class="acc__body" style="height:auto"><div>' + P.esc(QR.L(p.desc)) + '</div></div></div>' +
        '<div class="acc__item"><button type="button" class="acc__btn"><span data-i18n="product.care">Уход</span>' + P.icon('chevron') + '</button>' +
          '<div class="acc__body"><div>' + P.esc(QR.t('product.careText')) + '</div></div></div>' +
        '<div class="acc__item"><button type="button" class="acc__btn"><span data-i18n="product.deliver">Доставка и оплата</span>' + P.icon('chevron') + '</button>' +
          '<div class="acc__body"><div>' + P.esc(QR.t('product.deliverText')) + '</div></div></div>' +
        '<div class="acc__item"><button type="button" class="acc__btn"><span>' + P.esc(QR.t('product.sku')) + '</span>' + P.icon('chevron') + '</button>' +
          '<div class="acc__body"><div>' + P.esc(p.sku + ' · ' + QR.fabricLabel(p.fabric) + ' · ' + QR.typeLabel(p.type)) + '</div></div></div>' +
      '</div>' +
    '</div>' +
  '</div>';

  /* ---------- Галерея ---------- */
  const mainImg = $('#qrMainImg');
  const main = $('#qrMain');
  setTimeout(function () {
    mainImg.style.transition = 'opacity .5s ease';
    mainImg.style.opacity = '1';
    const sk = main.querySelector('.sk');
    if (sk) sk.remove();
  }, 120);

  $('#qrThumbs').addEventListener('click', function (e) {
    const b = e.target.closest('[data-g]');
    if (!b) return;
    state.view = +b.dataset.g;
    $$('#qrThumbs .gal__thumb').forEach(function (x) { x.classList.toggle('on', x === b); });
    mainImg.style.opacity = '0';
    setTimeout(function () {
      mainImg.src = gallery[state.view];
      mainImg.style.opacity = '1';
    }, 160);
  });

  main.addEventListener('mousemove', function (e) {
    const r = main.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    mainImg.style.transformOrigin = x + '% ' + y + '%';
  });
  main.addEventListener('mouseenter', function () { main.classList.add('zoomed'); });
  main.addEventListener('mouseleave', function () { main.classList.remove('zoomed'); });

  /* ---------- Размер ---------- */
  $('#qrSizes').addEventListener('click', function (e) {
    const b = e.target.closest('[data-size]');
    if (!b) return;
    state.size = b.getAttribute('data-size');
    $$('#qrSizes .opt').forEach(function (x) { x.classList.toggle('on', x === b); });
  });

  /* ---------- Цвет ---------- */
  $('#qrColors').addEventListener('click', function (e) {
    const b = e.target.closest('[data-c]');
    if (!b) return;
    state.color = b.getAttribute('data-c');
    $$('#qrColors .opt').forEach(function (x) { x.classList.toggle('on', x === b); });
    $('#qrColorName').textContent = QR.L(QR.color(state.color));
    /* меняем основной цвет фото */
    const alt = gallery[(state.view + 1) % gallery.length];
    mainImg.style.opacity = '0';
    setTimeout(function () { mainImg.src = alt; mainImg.style.opacity = '1'; }, 160);
  });
  $('#qrColorName').textContent = QR.L(QR.color(state.color));

  /* ---------- Количество ---------- */
  box.addEventListener('click', function (e) {
    const q = e.target.closest('[data-q]');
    if (!q) return;
    state.qty = Math.max(1, Math.min(99, state.qty + (+q.dataset.q)));
    $('#qrQty').textContent = state.qty;
  });

  /* ---------- В корзину / избранное ---------- */
  const addBtn = $('#qrAdd');
  addBtn.addEventListener('click', function () {
    if (!state.size) { QR.toast(QR.t('toast.size'), 'err'); return; }
    if (QR.addToCart(p.id, state.size, state.color, state.qty)) {
      const sp = addBtn.querySelector('span');
      const old = sp.textContent;
      sp.textContent = QR.t('products.added');
      addBtn.classList.add('done');
      setTimeout(function () { sp.textContent = old; addBtn.classList.remove('done'); }, 1600);
    }
  });

  const wishBtn = $('#qrWish');
  function paintWish() { wishBtn.classList.toggle('done', QR.inWish(p.id)); }
  wishBtn.innerHTML = P.icon('heart');
  wishBtn.addEventListener('click', function () { QR.toggleWish(p.id); paintWish(); });
  paintWish();

  /* ---------- Таблица размеров ---------- */
  $('#qrSizeTbl').addEventListener('click', function () {
    const rows = Object.keys(SIZE_TABLE).map(function (k) {
      return '<tr><td>' + k + '</td><td>' + SIZE_TABLE[k][QR.lang] + '</td></tr>';
    }).join('');
    QR.openModal(
      '<div class="modal__body">' +
        '<button class="icon-btn modal__close" data-close>' + P.icon('close') + '</button>' +
        '<h2 class="h-md">' + P.esc(QR.t('product.sizetable')) + '</h2>' +
        '<p class="muted" style="margin:10px 0 20px">' + (QR.lang === 'ru'
          ? 'Рост / обхват груди, см. Между двумя размерами выбирайте больший.'
          : 'Бой / кеуде айнашы, см. Екі өлшем арасында үлкенін таңдаңыз.') + '</p>' +
        '<table class="sizetbl"><thead><tr><th>' + P.esc(QR.t('product.size')) + '</th><th>' +
          (QR.lang === 'ru' ? 'Рост / грудь' : 'Бой / кеуде') + '</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '</div>', 'search-panel'
    );
  });

  /* ---------- Похожие ---------- */
  const rel = QR.products.filter(function (x) {
    return x.id !== p.id && (x.type === p.type || x.cat === p.cat);
  }).slice(0, 4);
  if (rel.length) {
    $('#qrRelSec').hidden = false;
    const grid = $('#qrRel');
    grid.innerHTML = QR.skeletons(4);
    setTimeout(function () {
      grid.innerHTML = QR.productGrid(rel);
      QR.reveal(grid);
      document.dispatchEvent(new CustomEvent('qr:cards'));
    }, 320);
  }

  QR.reveal(box);
  QR.initAcc(box);
}

if (document.readyState === 'loading') document.addEventListener('qr:ready', boot);
else boot();