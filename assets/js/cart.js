/* ==========================================================
   QazaqRepublic — корзина
   ========================================================== */

function boot() {
  const P = QR_PLACEHOLDER;
  const $ = function (s, r) { return (r || document).querySelector(s); };

  const box = $('#qrCartBox');
  let promo = null;

  function emptyState() {
    $('#qrOrnCart').hidden = true;
    $('#qrCartRel').hidden = true;
    box.innerHTML = '<div class="empty">' +
      '<span class="empty__ic">' + P.icon('cart') + '</span>' +
      '<h2 class="h-md">' + P.esc(QR.t('cart.empty')) + '</h2>' +
      '<p class="muted">' + P.esc(QR.t('cart.emptyText')) + '</p>' +
      '<a class="btn btn-gold btn-lg" href="catalog.html">' + P.icon('arrow') + ' ' + P.esc(QR.t('cart.go')) + '</a>' +
      '</div>';
    $('#qrCartRelT').textContent = QR.t('cat.hit');
    rel();
  }

  function render() {
    const cart = QR.cart();
    if (!cart.length) return emptyState();

    const T = QR.totals(promo);
    const left = Math.max(0, CONFIG.freeShippingFrom - T.subtotal);
    const pct = Math.min(100, Math.round((T.subtotal / CONFIG.freeShippingFrom) * 100));

    box.innerHTML = '' +
    '<div class="cart-layout">' +

      '<div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:6px">' +
          '<span class="muted small">' + QR.num(cart.reduce(function (a, x) { return a + x.qty; }, 0)) + ' ' +
            P.esc(QR.t('cart.items')) + '</span>' +
          '<button class="btn btn-ghost btn-sm" id="cClear">' + P.icon('trash') + ' ' + P.esc(QR.t('cart.clear')) + '</button>' +
        '</div>' +
        '<div id="cItems">' +
          cart.map(function (it, i) {
            const p = QR.product(it.id);
            if (!p) return '';
            const off = QR.discount(p);
            return '' +
            '<div class="citem" style="animation-delay:' + (i * 0.05) + 's">' +
              '<a class="citem__media" href="product.html?id=' + encodeURIComponent(p.id) + '">' +
                '<img src="' + P.productImage(p, 0) + '" alt="' + P.esc(QR.L(p.name)) + '" loading="lazy"></a>' +
              '<div>' +
                '<a href="product.html?id=' + encodeURIComponent(p.id) + '"><div class="citem__t">' + P.esc(QR.L(p.name)) + '</div></a>' +
                '<div class="citem__meta">' +
                  '<span><i class="citem__sw" style="background:' + QR.color(it.color).hex + '"></i>' + P.esc(QR.L(QR.color(it.color))) + '</span>' +
                  '<span>' + P.esc(QR.t('product.size') + ': ' + P.esc(it.size)) + '</span>' +
                  '<span>' + P.esc(p.sku) + '</span>' +
                '</div>' +
                '<div class="citem__meta" style="margin-top:8px">' +
                  '<button class="link-u" style="font-size:.72rem" data-details="' + p.id + '">' +
                    P.esc(QR.t('product.desc')) + '</button>' +
                '</div>' +
              '</div>' +
              '<div class="citem__right">' +
                '<div class="citem__price"><b>' + QR.money(p.price * it.qty) + '</b>' +
                  (off > 0 ? '<s>' + QR.money(p.oldPrice * it.qty) + '</s>' : '') + '</div>' +
                '<div class="qty">' +
                  '<button type="button" data-line="' + P.esc(QR.lineKey(it)) + '" data-step="-1" aria-label="−">' + P.icon('minus') + '</button>' +
                  '<span>' + it.qty + '</span>' +
                  '<button type="button" data-line="' + P.esc(QR.lineKey(it)) + '" data-step="1" aria-label="+">' + P.icon('plus') + '</button>' +
                '</div>' +
                '<button class="citem__del" data-line="' + P.esc(QR.lineKey(it)) + '" data-del="1" aria-label="' + P.esc(QR.t('cart.remove')) + '">' +
                  P.icon('trash') + '</button>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +

        '<div style="margin-top:26px"><a class="link-u" href="catalog.html">' +
          P.icon('arrow') + ' ' + P.esc(QR.t('cart.continue')) + '</a></div>' +
      '</div>' +

      '<aside class="summary">' +
        '<h3>' + P.esc(QR.t('cart.summary')) + '</h3>' +

        '<div class="summary__row"><span>' + P.esc(QR.t('cart.item')) + '</span><span>' + QR.money(T.subtotal) + '</span></div>' +
        (T.discount > 0 ? '<div class="summary__row disc"><span>' + P.esc(QR.lang === 'ru' ? 'Скидка' : 'Арзандау') +
          '</span><span>−' + QR.money(T.discount) + '</span></div>' : '') +
        (T.promoOff > 0 ? '<div class="summary__row disc"><span>' + P.esc(CONFIG.promo.code) +
          '</span><span>−' + QR.money(T.promoOff) + '</span></div>' : '') +
        '<div class="summary__row"><span>' + P.esc(QR.t('cart.delivery')) + '</span><span>' +
          (T.delivery === 0 ? P.esc(QR.t('cart.free')) : QR.money(T.delivery)) + '</span></div>' +

        '<div class="freeship">' +
          '<div class="freeship__t">' +
            (left > 0
              ? P.esc(QR.t('cart.leftText')) + ' <b>' + QR.money(left) + '</b>'
              : '<b>' + P.esc(QR.t('cart.free')) + '</b> ✓') +
          '</div>' +
          '<div class="freeship__bar"><div class="freeship__fill" data-pct="' + pct + '"></div></div>' +
        '</div>' +

        '<form class="promo" id="cPromo">' +
          '<input class="input" id="cPromoIn" placeholder="' + P.esc(QR.t('cart.promo')) + '" autocomplete="off">' +
          '<button class="btn btn-ghost" type="submit">' + P.icon('check') + '</button>' +
        '</form>' +

        '<div class="summary__row total"><span>' + P.esc(QR.t('cart.total')) + '</span><span>' + QR.money(T.total) + '</span></div>' +

        '<a class="btn btn-gold btn-lg btn-block" style="margin-top:20px" href="checkout.html">' +
          P.icon('check') + ' ' + P.esc(QR.t('cart.checkout')) + '</a>' +

        '<div class="usps" style="grid-template-columns:1fr;margin-top:20px">' +
          '<div class="usp">' + P.icon('shield') + '<span><b>' + P.esc(QR.lang === 'ru' ? 'Оплата при получении' : 'Қолма-қол') +
            '</b><span>' + P.esc(QR.lang === 'ru' ? 'Осмотрите перед оплатой' : 'Төлемнен бұрын тексеріңіз') + '</span></span></div>' +
        '</div>' +
      '</aside>' +

    '</div>';

    requestAnimationFrame(function () {
      const f = box.querySelector('.freeship__fill');
      if (f) f.style.width = f.dataset.pct + '%';
    });

    $('#cClear').addEventListener('click', function () {
      if (confirm(QR.lang === 'ru' ? 'Очистить корзину?' : 'Себетті тастау керек пе?')) QR.clearCart();
    });

    $('#cItems').addEventListener('click', function (e) {
      const step = e.target.closest('[data-step]');
      if (step) {
        const key = step.dataset.line;
        const it = QR.cart().find(function (x) { return QR.lineKey(x) === key; });
        if (it) QR.setQty(key, it.qty + (+step.dataset.step));
        return;
      }
      const del = e.target.closest('[data-del]');
      if (del) { QR.removeLine(del.dataset.line); return; }
      const det = e.target.closest('[data-details]');
      if (det) {
        const p = QR.product(det.dataset.details);
        if (p) QR.openModal('<div class="modal__body">' +
          '<button class="icon-btn modal__close" data-close>' + P.icon('close') + '</button>' +
          '<h2 class="h-md">' + P.esc(QR.L(p.name)) + '</h2>' +
          '<p class="lead" style="margin-top:14px;font-size:.95rem">' + P.esc(QR.L(p.desc)) + '</p>' +
          '<p class="muted" style="margin-top:14px;font-size:.86rem">' + P.esc(QR.t('product.careText')) + '</p>' +
          '</div>', 'search-panel');
      }
    });

    const pf = $('#cPromo');
    pf.addEventListener('submit', function (e) {
      e.preventDefault();
      const v = $('#cPromoIn').value.trim().toUpperCase();
      if (v === CONFIG.promo.code) {
        promo = v;
        QR.toast(QR.t('cart.promoOk'));
        render();
      } else {
        QR.toast(QR.t('cart.promoBad'), 'err');
      }
    });
  }

  function rel() {
    const sec = $('#qrCartRel');
    const grid = $('#qrCartRelGrid');
    sec.hidden = false;
    const inCart = {};
    QR.cart().forEach(function (it) { inCart[it.id] = 1; });
    const list = QR.products.filter(function (p) { return !inCart[p.id]; }).slice(0, 4);
    grid.innerHTML = QR.skeletons(4);
    setTimeout(function () {
      grid.innerHTML = QR.productGrid(list);
      QR.reveal(grid);
      document.dispatchEvent(new CustomEvent('qr:cards'));
    }, 260);
  }

  document.addEventListener('qr:cart', render);
  render();
  $('#qrCartRelT').textContent = QR.lang === 'ru' ? 'Дополните заказ' : 'Тапсырысты толықтырыңыз';
  rel();
}

if (document.readyState === 'loading') document.addEventListener('qr:ready', boot);
else boot();