/* ==========================================================
   QazaqRepublic — избранное
   ========================================================== */

function boot() {
  const P = QR_PLACEHOLDER;
  const $ = function (s) { return document.querySelector(s); };

  function render() {
    const ids = QR.wish();
    const list = ids.map(function (id) { return QR.product(id); }).filter(Boolean);
    const box = $('#qrWishBox');

    if (!list.length) {
      box.innerHTML = '<div class="empty">' +
        '<span class="empty__ic">' + P.icon('heart') + '</span>' +
        '<h2 class="h-md">' + P.esc(QR.t('nav.wishlist')) + '</h2>' +
        '<p class="muted">' + P.esc(QR.lang === 'ru'
          ? 'Нажимайте на сердечко на карточке — товар окажется здесь.'
          : 'Карточкадағы жүрекшеге басыңыз — бұйым осында сақталады.') + '</p>' +
        '<a class="btn btn-gold btn-lg" href="catalog.html">' + P.esc(QR.t('cart.go')) + '</a></div>';
      return;
    }

    box.innerHTML = QR.productGrid(list);
    QR.reveal(box);
    document.dispatchEvent(new CustomEvent('qr:cards'));
  }

  document.addEventListener('qr:wish', render);
  render();
}

if (document.readyState === 'loading') document.addEventListener('qr:ready', boot);
else boot();