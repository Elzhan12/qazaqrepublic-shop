/* ==========================================================
   QazaqRepublic — оформление заказа (3 шага)
   ========================================================== */

function boot() {
  const P = QR_PLACEHOLDER;
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  const root = $('#qrCheckout');
  const RU = QR.lang === 'ru';

  const CITIES = RU
    ? ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Атырау', 'Тараз', 'Орал', 'Павлодар', 'Костанай', 'Семей', 'Усть-Каменогорск']
    : ['Алматы', 'Астана', 'Шымкент', 'Қарағанды', 'Ақтөбе', 'Атырау', 'Тараз', 'Орал', 'Павлодар', 'Қостанай', 'Семей', 'Өскемен'];

  const FORM = {
    name: { v: '', ph: RU ? 'Айгерим Сатыпбекова' : 'Айгерім Сәтінбекова' },
    phone: { v: '+7 ', ph: '+7 727 123 45 67' },
    email: { v: '', ph: 'name@mail.kz' },
    city: { v: 'Алматы', ph: '' },
    addr: { v: '', ph: RU ? 'пр. Абая, 40, кв. 12' : 'Абай даңғылы, 40, 12-бөлме' },
    comment: { v: '', ph: QR.t('checkout.commentPh') },
    method: 'cash'
  };

  const STEPS = [QR.t('checkout.step1'), QR.t('checkout.step2'), QR.t('checkout.step3')];
  let step = 1;

  /* ---------- Хлебные шаги ---------- */
  function stepsHtml() {
    let h = '<div class="steps" id="cSteps">';
    STEPS.forEach(function (s, i) {
      const n = i + 1;
      h += '<div class="step ' + (step === n ? 'on' : step > n ? 'done' : '') + '">' +
        '<span class="step__n">' + (step > n ? '✓' : n) + '</span><span class="step__t">' + P.esc(s) + '</span></div>';
      if (n < STEPS.length) h += '<span class="step__line"></span>';
    });
    return h + '</div>';
  }

  /* ---------- Сводка ---------- */
  function summaryHtml() {
    const cart = QR.cart();
    const T = QR.totals();
    if (!cart.length) return '';
    return '' +
    '<aside class="summary" data-rv="right">' +
      '<h3>' + P.esc(QR.t('checkout.summary')) + '</h3>' +
      '<div style="max-height:280px;overflow:auto;margin-bottom:12px">' +
        cart.map(function (it) {
          const p = QR.product(it.id);
          if (!p) return '';
          return '<div class="mini">' +
            '<span class="mini__media"><img src="' + P.productImage(p, 0) + '" alt=""></span>' +
            '<span><span class="mini__t">' + P.esc(QR.L(p.name)) + '</span><br>' +
              '<span class="muted small">' + P.esc(it.size + ' · ' + QR.L(QR.color(it.color)) + ' × ' + it.qty) + '</span></span>' +
            '<span class="mini__p">' + QR.money(p.price * it.qty) + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div class="summary__row"><span>' + P.esc(QR.t('cart.item')) + '</span><span>' + QR.money(T.subtotal) + '</span></div>' +
      (T.discount > 0 ? '<div class="summary__row disc"><span>' + P.esc(RU ? 'Скидка' : 'Арзандау') + '</span><span>−' + QR.money(T.discount) + '</span></div>' : '') +
      '<div class="summary__row"><span>' + P.esc(QR.t('cart.delivery')) + '</span><span>' +
        (T.delivery === 0 ? P.esc(QR.t('cart.free')) : QR.money(T.delivery)) + '</span></div>' +
      '<div class="summary__row total"><span>' + P.esc(QR.t('cart.total')) + '</span><span>' + QR.money(T.total) + '</span></div>' +
      '<a class="link-u" style="margin-top:16px;font-size:.74rem" href="cart.html">' + P.esc(QR.t('cart.continue')) + '</a>' +
    '</aside>';
  }

  /* ---------- Поля ---------- */
  function field(key, label, opts) {
    opts = opts || {};
    const f = FORM[key];
    return '<div class="field' + (opts.cls ? ' ' + opts.cls : '') + '" data-field="' + key + '">' +
      '<label for="cf_' + key + '">' + P.esc(label) + '</label>' +
      (opts.type === 'textarea'
        ? '<textarea class="textarea" id="cf_' + key + '" placeholder="' + P.esc(f.ph) + '">' + P.esc(f.v) + '</textarea>'
        : opts.type === 'select'
          ? '<select class="select" id="cf_' + key + '">' + CITIES.map(function (c) {
              return '<option' + (c === f.v ? ' selected' : '') + '>' + P.esc(c) + '</option>';
            }).join('') + '</select>'
          : '<input class="input" id="cf_' + key + '" type="' + (opts.type || 'text') + '" ' +
            'placeholder="' + P.esc(f.ph) + '" value="' + P.esc(f.v) + '" autocomplete="given-name"') +
      '<span class="err-msg" data-err="' + key + '"></span>' +
    '</div>';
  }

  function methodCard(v, ic, title, sub) {
    return '<label class="radio-card"><input type="radio" name="method" value="' + v + '"' +
      (FORM.method === v ? ' checked' : '') + '><span class="radio-card__dot"></span>' +
      '<span class="ic" style="color:var(--gold);font-size:1.2rem">' + P.icon(ic) + '</span>' +
      '<span><b style="display:block">' + P.esc(title) + '</b>' +
      '<span class="muted small">' + P.esc(sub) + '</span></span></label>';
  }

  /* ---------- Рендер ---------- */
  function render() {
    const cart = QR.cart();

    if (!cart.length) {
      root.innerHTML = '<div class="empty">' +
        '<span class="empty__ic">' + P.icon('cart') + '</span>' +
        '<h2 class="h-md">' + P.esc(QR.t('cart.empty')) + '</h2>' +
        '<p class="muted">' + P.esc(QR.t('cart.emptyText')) + '</p>' +
        '<a class="btn btn-gold btn-lg" href="catalog.html">' + P.esc(QR.t('cart.go')) + '</a></div>';
      return;
    }

    if (step === 3) { root.innerHTML = successHtml(); QR.reveal(root); return; }

    root.innerHTML = stepsHtml() +
      '<div class="cart-layout">' +
        '<div>' +
          (step === 1
            ? '<form class="panel fade-swap" id="cForm1" novalidate>' +
                '<h2 class="panel__t">' + P.esc(QR.t('checkout.step1')) + '</h2>' +
                '<div class="form-grid">' +
                  field('name', QR.t('checkout.name')) +
                  field('phone', QR.t('checkout.phone'), { type: 'tel' }) +
                  field('email', QR.t('checkout.email'), { type: 'email', cls: 'span2' }) +
                  field('city', QR.t('checkout.city'), { type: 'select' }) +
                  field('addr', QR.t('checkout.addr')) +
                  field('comment', QR.t('checkout.comment'), { type: 'textarea', cls: 'span2' }) +
                '</div>' +
                '<div style="display:flex;justify-content:flex-end;margin-top:26px">' +
                  '<button class="btn btn-gold btn-lg" type="submit">' + P.esc(QR.t('checkout.next')) + ' ' + P.icon('arrow') + '</button>' +
                '</div>' +
              '</form>'
            : '<div class="fade-swap">' +
                '<div class="panel">' +
                  '<h2 class="panel__t">' + P.esc(QR.t('checkout.method')) + '</h2>' +
                  '<div style="display:flex;flex-direction:column;gap:10px">' +
                    methodCard('cash', 'truck', QR.t('checkout.cash'), RU ? 'Осмотрите вещь, потом платите' : 'Киімді тексеріп, сосын төлейсіз') +
                    methodCard('card', 'shield', QR.t('checkout.card'), RU ? 'Visa, Mastercard, Kaspi' : 'Visa, Mastercard, Kaspi') +
                    methodCard('kaspi', 'refresh', QR.t('checkout.kaspi'), RU ? 'Через QR в приложении Kaspi.kz' : 'Kaspi.kz қосымшасының QR арқылы') +
                  '</div>' +
                  '<label class="check" style="margin-top:22px">' +
                    '<input type="checkbox" id="cAgree" checked><span class="check__box">' + P.icon('check') + '</span>' +
                    '<span>' + P.esc(QR.t('checkout.agree')) + '</span></label>' +
                  '<div class="err-msg" id="cAgreeErr"></div>' +
                '</div>' +
                '<div class="panel">' +
                  '<h2 class="panel__t">' + P.esc(QR.t('checkout.step1')) + '</h2>' +
                  '<div class="cinfo">' +
                    '<div class="cinfo__row"><span class="cinfo__ic">' + P.icon('user') + '</span>' +
                      '<span><b>' + P.esc(RU ? 'Получатель' : 'Алушы') + '</b><span>' + P.esc(FORM.name.v + ' · ' + FORM.phone.v) + '</span></span>' +
                      '<button class="link-u" style="margin-left:auto;font-size:.72rem" id="cEdit">' + P.esc(RU ? 'Изменить' : 'Өзгерту') + '</button></div>' +
                    '<div class="cinfo__row"><span class="cinfo__ic">' + P.icon('pin') + '</span>' +
                      '<span><b>' + P.esc(QR.t('checkout.addr')) + '</b><span>' + P.esc(FORM.city.v + ', ' + FORM.addr.v) + '</span></span>' +
                      '<button class="link-u" style="margin-left:auto;font-size:.72rem" id="cEdit2">' + P.esc(RU ? 'Изменить' : 'Өзгерту') + '</button></div>' +
                  '</div>' +
                '</div>' +
                '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:22px">' +
                  '<button class="btn btn-ghost btn-lg" id="cBack">' + P.esc(QR.t('checkout.prev')) + '</button>' +
                  '<button class="btn btn-gold btn-lg" style="flex:1 1 240px" id="cConfirm">' +
                    P.icon('check') + ' ' + P.esc(QR.t('checkout.confirm')) + ' · ' + QR.money(QR.totals().total) + '</button>' +
                '</div>' +
              '</div>') +
        '</div>' +
        summaryHtml() +
      '</div>';

    bind();
    QR.reveal(root);
  }

  /* ---------- Валидация ---------- */
  function readForm() {
    $$('#cForm1 [id^="cf_"]').forEach(function (el) {
      const k = el.id.replace('cf_', '');
      if (FORM[k]) FORM[k].v = el.value.trim();
    });
  }

  function validate1() {
    let ok = true;
    const rules = [
      ['name', function (v) { return v.length >= 2; }, QR.t('checkout.req')],
      ['phone', function (v) { return (v.replace(/\D/g, '').length >= 11); }, QR.t('checkout.phoneReq')],
      ['email', function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v); }, QR.t('checkout.emailReq')],
      ['addr', function (v) { return v.length >= 4; }, QR.t('checkout.req')]
    ];
    rules.forEach(function (r) {
      const wrap = root.querySelector('[data-field="' + r[0] + '"]');
      const err = root.querySelector('[data-err="' + r[0] + '"]');
      const good = r[1](FORM[r[0]].v);
      if (wrap) wrap.classList.toggle('bad', !good);
      if (err) err.textContent = good ? '' : r[2];
      if (!good && ok) {
        ok = false;
        const inp = wrap ? wrap.querySelector('.input,.textarea,.select') : null;
        if (inp) inp.focus();
      }
    });
    return ok;
  }

  function successHtml() {
    const num = 'QR-' + new Date().getFullYear() + '-' +
      String(Math.floor(Math.random() * 9000) + 1000);
    return '' +
    '<div class="panel success">' +
      '<div class="success__ic">' + P.icon('check') + '</div>' +
      '<h2 class="display h-md">' + P.esc(QR.t('checkout.success')) + '</h2>' +
      '<p class="lead" style="margin-top:12px">' + P.esc(QR.t('checkout.successText')) + '</p>' +
      '<div class="success__num">' + P.icon('copy') + ' ' + P.esc(QR.t('checkout.orderNum')) + ': ' + P.esc(num) + '</div>' +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:22px">' +
        '<button class="btn btn-ghost" id="cCopy">' + P.esc(RU ? 'Скопировать номер' : 'Нөмірді көшіру') + '</button>' +
        '<a class="btn btn-ghost" href="catalog.html">' + P.esc(QR.t('cart.continue')) + '</a>' +
        '<a class="btn btn-gold" href="index.html">' + P.icon('arrow') + ' ' + P.esc(QR.t('nav.home')) + '</a>' +
      '</div>' +
    '</div>' +
    '<h3 class="display h-sm" style="text-align:center;margin:clamp(30px,4vw,48px) 0 20px">' + P.esc(QR.t('checkout.nextText')) + '</h3>' +
    '<div class="success__steps">' +
      ['n1', 'n2', 'n3'].map(function (k, i) {
        return '<div class="success__st" data-rv style="--d:' + (i * 0.09) + 's">' +
          '<span class="n">' + (i + 1) + '</span>' +
          '<p style="margin-top:8px">' + P.esc(QR.t('checkout.' + k)) + '</p></div>';
      }).join('') +
    '</div>';

    setTimeout(function () {
      const b = $('#cCopy');
      if (b) b.addEventListener('click', function () {
        const txt = 'QR-' + num.split('-').pop();
        if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function () {});
        QR.toast(QR.t('toast.copied'));
      });
    }, 0);
  }

  /* ---------- События ---------- */
  function bind() {
    const f1 = $('#cForm1');
    if (f1) {
      f1.addEventListener('submit', function (e) {
        e.preventDefault();
        readForm();
        if (!validate1()) return;
        step = 2;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      f1.addEventListener('input', function (e) {
        const wrap = e.target.closest('.field');
        if (wrap && wrap.classList.contains('bad')) {
          wrap.classList.remove('bad');
          const err = wrap.querySelector('.err-msg');
          if (err) err.textContent = '';
        }
      });
    }

    const back = $('#cBack');
    if (back) back.addEventListener('click', function () {
      step = 1; render(); window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    ['#cEdit', '#cEdit2'].forEach(function (sel) {
      const b = $(sel);
      if (b) b.addEventListener('click', function () {
        step = 1; render(); window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    const pm = root.querySelectorAll('input[name="method"]');
    pm.forEach(function (r) {
      r.addEventListener('change', function () { FORM.method = r.value; });
    });

    const conf = $('#cConfirm');
    if (conf) conf.addEventListener('click', function () {
      const ag = $('#cAgree');
      if (ag && !ag.checked) {
        $('#cAgreeErr').textContent = QR.t('checkout.agree');
        ag.focus();
        return;
      }
      conf.innerHTML = '<span class="ic" style="animation:spinSlow 1s linear infinite;display:inline-block">' +
        P.icon('refresh') + '</span> …';
      setTimeout(function () {
        const T = QR.totals();
        QR.clearCart();
        step = 3;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        void T;
      }, 1100);
    });
  }

  render();
}

if (document.readyState === 'loading') document.addEventListener('qr:ready', boot);
else boot();