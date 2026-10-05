/* ==========================================================
   QazaqRepublic — контакты + FAQ
   ========================================================== */

function boot() {
  const P = QR_PLACEHOLDER;
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const RU = QR.lang === 'ru';

  const C = QR.contact;

  const info = [
    ['pin', QR.t('contact.addr'), QR.L(C.legal)],
    ['phone', QR.t('contact.phone'), C.phone],
    ['mail', QR.t('contact.email'), C.email],
    ['clock', QR.t('contact.hours'), QR.L(C.hours)],
    ['pin', RU ? 'Пункты самовывоза' : 'Өзімен алып кету пункттері', QR.L(C.pickup).join(' · ')],
    ['gift', RU ? 'Партнёрам' : 'Серіктестерге', C.partners],
    ['whatsapp', 'WhatsApp', RU ? 'Отвечаем в среднем за 10 минут' : 'Орташа 10 минутта жауап береміз']
  ];

  const infoBox = $('#qrInfo');
  infoBox.innerHTML = info.map(function (row, i) {
    return '<div class="cinfo__row" data-rv style="--d:' + (i * 0.05) + 's">' +
      '<span class="cinfo__ic">' + P.icon(row[0]) + '</span>' +
      '<span><b>' + P.esc(row[1]) + '</b><span>' + P.esc(row[2]) + '</span></span></div>';
  }).join('');
  QR.reveal(infoBox);

  const lbl = $('#qrMapLabel');
  if (lbl) lbl.textContent = QR.L(C.pickup)[1];

  /* FAQ */
  const faqBox = $('#qrFaq');
  faqBox.innerHTML = [1, 2, 3, 4].map(function (n) {
    return '<div class="acc__item" data-rv>' +
      '<button type="button" class="acc__btn"><span>' + P.esc(QR.t('faq.q' + n)) + '</span>' + P.icon('chevron') + '</button>' +
      '<div class="acc__body"><div>' + P.esc(QR.t('faq.a' + n)) + '</div></div></div>';
  }).join('');
  QR.reveal(faqBox);

  /* Форма */
  const form = $('#cForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const map = [['cName', function (v) { return v.length >= 2; }], ['cPhone', function (v) { return v.replace(/\D/g, '').length >= 10; }],
      ['cMail', function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v); }]];
    let ok = true;
    map.forEach(function (r) {
      const el = document.getElementById(r[0]);
      const field = el.closest('.field');
      const good = r[1](el.value.trim());
      field.classList.toggle('bad', !good);
      field.querySelector('.err-msg').textContent = good ? '' : (RU ? 'Проверьте поле' : 'Өрісті тексеріңіз');
      if (!good && ok) { ok = false; el.focus(); }
    });
    if (!ok) return;
    form.reset();
    QR.toast(QR.t('contact.sent'));
  });

  form.addEventListener('input', function (e) {
    const f = e.target.closest('.field');
    if (f && f.classList.contains('bad')) {
      f.classList.remove('bad');
      f.querySelector('.err-msg').textContent = '';
    }
  });
}

if (document.readyState === 'loading') document.addEventListener('qr:ready', boot);
else boot();