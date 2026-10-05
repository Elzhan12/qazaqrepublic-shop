/* ==========================================================
   QazaqRepublic — ядро сайта
   Переводы, шапка/подвал, корзина, избранное, тосты, модалки
   ========================================================== */

const QR = (function () {
  'use strict';

  /* ---------- Хранилище ---------- */
  const LS = {
    get(k, fb) { try { const v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  const K = { cart: 'qr_cart_v1', wish: 'qr_wish_v1', lang: 'qr_lang_v1' };

  const qLang = new URLSearchParams(location.search).get('lang');
  if (qLang && I18N[qLang] && qLang !== LS.get(K.lang, 'ru')) LS.set(K.lang, qLang);

  let lang = LS.get(K.lang, 'ru');
  if (!I18N[lang]) lang = 'ru';

  let cart = LS.get(K.cart, []) || [];
  let wish = LS.get(K.wish, []) || [];

  /* ---------- Переводы ---------- */
  function t(key) {
    const pack = I18N[lang] || I18N.ru;
    return pack[key] != null ? pack[key] : (I18N.ru[key] != null ? I18N.ru[key] : key);
  }
  function L(obj) { return obj ? (obj[lang] != null ? obj[lang] : obj.ru) : ''; }

  function money(n) {
    const v = Math.round(n);
    try { return new Intl.NumberFormat(CONFIG.locale, { maximumFractionDigits: 0 }).format(v) + ' ' + CONFIG.currency; }
    catch (e) { return v + ' ' + CONFIG.currency; }
  }
  function num(n) {
    try { return new Intl.NumberFormat(CONFIG.locale, { maximumFractionDigits: 0 }).format(Math.round(n)); }
    catch (e) { return String(Math.round(n)); }
  }
  function priceLabel(p) {
    return (p && p.from ? t('products.from') + ' ' : '') + money(p.price);
  }

  /* ---------- Данные ---------- */
  const byId = {};
  PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  function product(id) { return byId[id]; }
  const colorById = {};
  COLORS.forEach(function (c) { colorById[c.id] = c; });
  function color(id) { return colorById[id] || { id: id, hex: '#8b7d6b', ru: id, kz: id }; }
  function catLabel(id) { const c = CATEGORIES.find(function (x) { return x.id === id; }); return c ? L(c) : id; }
  function typeLabel(id) { const t2 = TYPES.find(function (x) { return x.id === id; }); return t2 ? L(t2) : id; }
  function fabricLabel(id) { const f = FABRICS.find(function (x) { return x.id === id; }); return f ? L(f) : id; }

  function discount(p) {
    if (!p.oldPrice || p.oldPrice <= p.price) return 0;
    return Math.round((1 - p.price / p.oldPrice) * 100);
  }
  function inStock(p) { return (p.stock || 0) > 0; }

  /* ---------- Корзина ---------- */
  function lineKey(it) { return it.id + '|' + (it.size || '') + '|' + (it.color || ''); }

  function saveCart() {
    LS.set(K.cart, cart);
    document.dispatchEvent(new CustomEvent('qr:cart', { detail: cart }));
    paintBadges();
  }
  function saveWish() {
    LS.set(K.wish, wish);
    document.dispatchEvent(new CustomEvent('qr:wish', { detail: wish }));
    paintBadges();
  }

  function addToCart(id, size, colorId, qty) {
    const p = product(id);
    if (!p) return false;
    if (!size) {
      if (p.sizes.length > 1) { toast(t('toast.size'), 'err'); return false; }
      size = p.sizes[0];
    }
    qty = qty || 1;
    const key = lineKey({ id: id, size: size, color: colorId });
    const found = cart.find(function (x) { return lineKey(x) === key; });
    if (found) found.qty = Math.min(found.qty + qty, 99);
    else cart.push({ id: id, size: size, color: colorId, qty: qty });
    saveCart();
    toast(t('toast.cart'));
    return true;
  }

  function setQty(key, qty) {
    const it = cart.find(function (x) { return lineKey(x) === key; });
    if (!it) return;
    if (qty <= 0) return removeLine(key);
    it.qty = Math.min(qty, 99);
    saveCart();
  }
  function removeLine(key) {
    cart = cart.filter(function (x) { return lineKey(x) !== key; });
    saveCart();
    toast(t('toast.removed'));
  }
  function clearCart() { cart = []; saveCart(); }

  function cartCount() { return cart.reduce(function (a, x) { return a + x.qty; }, 0); }

  function totals(promo) {
    const subtotal = cart.reduce(function (s, it) {
      const p = product(it.id);
      return s + (p ? p.price * it.qty : 0);
    }, 0);
    const oldTotal = cart.reduce(function (s, it) {
      const p = product(it.id);
      return s + (p && p.oldPrice ? p.oldPrice * it.qty : p ? p.price * it.qty : 0);
    }, 0);
    let discount = oldTotal - subtotal;
    let promoOff = 0;
    if (promo === CONFIG.promo.code) promoOff = Math.round(subtotal * CONFIG.promo.discount);
    const delivery = (subtotal >= CONFIG.freeShippingFrom || subtotal === 0) ? 0 : CONFIG.deliveryPrice;
    return {
      subtotal: subtotal, oldTotal: oldTotal, discount: discount, promoOff: promoOff,
      delivery: delivery, total: subtotal - promoOff + delivery
    };
  }

  function toggleWish(id) {
    const i = wish.indexOf(id);
    if (i > -1) { wish.splice(i, 1); toast(t('toast.unwish')); }
    else { wish.unshift(id); toast(t('toast.wish')); }
    saveWish();
    document.querySelectorAll('[data-wish="' + id + '"]').forEach(function (b) { b.classList.toggle('on', wish.indexOf(id) > -1); });
  }
  function inWish(id) { return wish.indexOf(id) > -1; }

  /* ---------- Бейджи ---------- */
  function paintBadges() {
    const n = cartCount();
    document.querySelectorAll('[data-badge="cart"]').forEach(function (b) {
      const prev = b.textContent;
      b.textContent = n > 99 ? '99+' : n;
      b.classList.toggle('on', n > 0);
      if (prev !== b.textContent && n > 0) {
        b.classList.remove('pop');
        void b.offsetWidth;
        b.classList.add('pop');
      }
    });
    document.querySelectorAll('[data-badge="wish"]').forEach(function (b) {
      b.textContent = wish.length > 99 ? '99+' : wish.length;
      b.classList.toggle('on', wish.length > 0);
    });
  }

  /* ---------- Тосты ---------- */
  let toastBox = null;
  function toast(msg, kind) {
    if (!msg) return;
    if (!toastBox) {
      toastBox = document.createElement('div');
      toastBox.className = 'toasts';
      toastBox.setAttribute('role', 'status');
      toastBox.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastBox);
    }
    const el = document.createElement('div');
    el.className = 'toast' + (kind === 'err' ? ' toast--err' : '');
    el.innerHTML = QR_PLACEHOLDER.icon(kind === 'err' ? 'close' : 'check') + '<span>' + QR_PLACEHOLDER.esc(msg) + '</span>';
    toastBox.appendChild(el);
    setTimeout(function () {
      el.classList.add('out');
      setTimeout(function () { el.remove(); }, 360);
    }, 2400);
  }

  /* ---------- Модалка ---------- */
  let modalEl = null;
  function openModal(html, cls) {
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.className = 'modal';
      modalEl.innerHTML = '<div class="modal__bg" data-close></div><div class="modal__box" role="dialog" aria-modal="true"></div>';
      document.body.appendChild(modalEl);
      modalEl.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) closeModal();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalEl.classList.contains('open')) closeModal();
      });
    }
    const box = modalEl.querySelector('.modal__box');
    box.className = 'modal__box' + (cls ? ' ' + cls : '');
    box.innerHTML = html;
    modalEl.classList.add('open');
    document.body.classList.add('no-scroll');
    initInside(box);
  }
  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  /* ---------- Появление при скролле ---------- */
  let io = null;
  function reveal(root) {
    const nodes = (root || document).querySelectorAll('[data-rv]:not(.in)');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('in'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Счётчики ---------- */
  function countUp(el, to, dur) {
    if (!el) return;
    const from = parseFloat(el.dataset.from || '0') || 0;
    const t0 = performance.now();
    const span = (dur || 1600);
    const decimals = (to % 1) ? 1 : 0;
    function fmt(v) {
      try { return new Intl.NumberFormat(CONFIG.locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(v); }
      catch (e) { return String(+v.toFixed(decimals)); }
    }
    function step(now) {
      const k = Math.min(1, (now - t0) / span);
      const e = 1 - Math.pow(1 - k, 3);
      const v = from + (to - from) * e;
      el.textContent = (el.dataset.pre || '') + fmt(v) + (el.dataset.suf || '');
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function initCounters(root) {
    const nodes = (root || document).querySelectorAll('[data-count]');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window)) { nodes.forEach(function (n) { countUp(n, parseFloat(n.dataset.count), 1); }); return; }
    const o = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target, parseFloat(e.target.dataset.count)); o.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nodes.forEach(function (n) { o.observe(n); });
  }

  /* ---------- Аккордеоны ---------- */
  function initAcc(root) {
    (root || document).querySelectorAll('.acc__btn').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        const item = btn.closest('.acc__item');
        const body = item.querySelector('.acc__body');
        const open = item.classList.contains('open');
        item.closest('.acc').querySelectorAll('.acc__item.open').forEach(function (o) {
          if (o === item) return;
          o.classList.remove('open');
          const b = o.querySelector('.acc__body');
          if (b) b.style.height = b.scrollHeight + 'px';
          requestAnimationFrame(function () { if (b) b.style.height = '0px'; });
        });
        item.classList.toggle('open', !open);
        body.style.height = open ? '0px' : body.scrollHeight + 'px';
      });
    });
  }

  /* ---------- Карточка товара ---------- */
  function badges(p) {
    let h = '';
    if (p.badge === 'new') h += '<span class="badge badge-new">' + QR_PLACEHOLDER.esc(lang === 'ru' ? 'новинка' : 'жаңа') + '</span>';
    if (p.badge === 'hit') h += '<span class="badge badge-hit">' + QR_PLACEHOLDER.esc(lang === 'ru' ? 'хит' : 'таңдаулы') + '</span>';
    const d = discount(p);
    if (d > 0) h += '<span class="badge badge-sale">−' + d + '%</span>';
    if (!inStock(p)) h += '<span class="badge badge-out">' + QR_PLACEHOLDER.esc(lang === 'ru' ? 'нет в наличии' : 'жоқ') + '</span>';
    return h;
  }

  function sizesHtml(p, cls) {
    return p.sizes.map(function (s) {
      return '<button type="button" class="' + (cls || 'psize') + '" data-size="' + QR_PLACEHOLDER.esc(s) + '">' +
        QR_PLACEHOLDER.esc(s) + '</button>';
    }).join('');
  }

  function productCard(p) {
    const off = discount(p);
    const img1 = QR_PLACEHOLDER.productImage(p, 0);
    const multi = !p.img || p.img.length < 2;
    const img2 = multi ? '' : QR_PLACEHOLDER.productImage(p, 1);
    return '' +
    '<article class="pcard" data-id="' + p.id + '" data-pid="' + p.id + '">' +
      '<div class="pcard__media">' +
        '<a class="pcard__img' + (multi ? ' is-single' : '') + '" href="product.html?id=' + encodeURIComponent(p.id) + '" aria-label="' + QR_PLACEHOLDER.esc(L(p.name)) + '">' +
          '<img class="is-main" src="' + img1 + '" alt="' + QR_PLACEHOLDER.esc(L(p.name)) + '" loading="lazy" width="600" height="750">' +
          (img2 ? '<img class="is-alt" src="' + img2 + '" alt="" aria-hidden="true" loading="lazy" width="600" height="750">' : '') +
        '</a>' +
        '<div class="pcard__badges">' + badges(p) + '</div>' +
        '<div class="pcard__acts">' +
          '<button type="button" class="pcard__act' + (inWish(p.id) ? ' on' : '') + '" data-wish="' + p.id + '" title="">' + QR_PLACEHOLDER.icon('heart') + '</button>' +
          '<button type="button" class="pcard__act" data-qv="' + p.id + '" title="">' + QR_PLACEHOLDER.icon('search') + '</button>' +
        '</div>' +
        '<div class="pcard__swatches">' + p.colors.slice(0, 5).map(function (c) {
          return '<i class="swatch-dot" style="background:' + color(c).hex + '"></i>';
        }).join('') + '</div>' +
      '</div>' +
      '<div class="pcard__body">' +
        '<div class="pcard__meta"><span>' + QR_PLACEHOLDER.esc(catLabel(p.cat)) + '</span><span>' + QR_PLACEHOLDER.esc(fabricLabel(p.fabric)) + '</span></div>' +
        '<h3 class="pcard__t"><a href="product.html?id=' + encodeURIComponent(p.id) + '">' + QR_PLACEHOLDER.esc(L(p.name)) + '</a></h3>' +
        '<div class="pcard__sizes" data-sizes>' + sizesHtml(p) + '</div>' +
        '<div class="pcard__price"><b>' + priceLabel(p) + '</b>' + (off > 0 ? '<s>' + money(p.oldPrice) + '</s>' : '') + '</div>' +
        '<button type="button" class="pcard__add" data-add="' + p.id + '"' + (inStock(p) ? '' : ' disabled') + '>' +
          QR_PLACEHOLDER.icon('cart') + '<span>' + QR_PLACEHOLDER.esc(t('products.add')) + '</span>' +
        '</button>' +
      '</div>' +
    '</article>';
  }

  function productGrid(list, opts) {
    opts = opts || {};
    const cls = 'pgrid' + (opts.cols === 3 ? ' pgrid-3' : '') + (opts.list ? ' list' : '');
    return '<div class="' + cls + '">' + list.map(function (p) {
      return '<div data-rv style="--d:' + (list.indexOf(p) % 4 * 0.07) + 's">' + productCard(p) + '</div>';
    }).join('') + '</div>';
  }

  function skeletons(n) {
    let h = '<div class="pgrid">';
    for (let i = 0; i < (n || 8); i++) {
      h += '<div class="sk-card"><div class="sk sk-card__media"></div><div class="sk-card__body">' +
        '<div class="sk sk-line" style="width:40%"></div><div class="sk sk-line" style="width:80%;height:15px"></div>' +
        '<div class="sk sk-line" style="width:55%"></div><div class="sk sk-line" style="height:38px;margin-top:6px"></div></div></div>';
    }
    return h + '</div>';
  }

  /* ---------- Делегирование кликов ---------- */
  function delegate() {
    document.addEventListener('click', function (e) {
      const sizeBtn = e.target.closest('[data-size]');
      if (sizeBtn) {
        const box = sizeBtn.parentElement;
        box.querySelectorAll('[data-size]').forEach(function (b) { b.classList.remove('on'); });
        sizeBtn.classList.add('on');
        return;
      }

      const add = e.target.closest('[data-add]');
      if (add) {
        const id = add.getAttribute('data-add');
        const p = product(id);
        if (!p) return;
        const card = add.closest('.pcard');
        let size = '';
        if (card) {
          const on = card.querySelector('[data-size].on');
          size = on ? on.getAttribute('data-size') : (p.sizes.length === 1 ? p.sizes[0] : '');
        }
        if (addToCart(id, size, p.colors[0], 1)) {
          add.classList.add('done');
          const sp = add.querySelector('span');
          const old = sp ? sp.textContent : '';
          if (sp) sp.textContent = t('products.added');
          setTimeout(function () {
            add.classList.remove('done');
            if (sp) sp.textContent = old;
          }, 1500);
        }
        return;
      }

      const w = e.target.closest('[data-wish]');
      if (w) { toggleWish(w.getAttribute('data-wish')); return; }

      const qv = e.target.closest('[data-qv]');
      if (qv) { openQuick(qv.getAttribute('data-qv')); return; }

      const burger = e.target.closest('[data-burger]');
      if (burger) { burger.getAttribute('data-burger') === 'open' ? openMenu(true) : openMenu(false); return; }

      const fa = e.target.closest('[data-filters]');
      if (fa) {
        fa.getAttribute('data-filters') === 'open' ? toggleFilters(true) : toggleFilters(false);
        return;
      }
    });

    /* автовыбор единственного размера */
    document.addEventListener('qr:cards', function () {
      document.querySelectorAll('.pcard__sizes').forEach(function (box) {
        if (box.children.length === 1 && !box.querySelector('.on')) box.firstElementChild.classList.add('on');
      });
    });
  }

  /* ---------- Быстрый просмотр ---------- */
  function openQuick(id) {
    const p = product(id);
    if (!p) return;
    const off = discount(p);
    openModal(
      '<div class="modal__grid">' +
        '<div class="modal__media"><img src="' + QR_PLACEHOLDER.productImage(p, 0) + '" alt="' + QR_PLACEHOLDER.esc(L(p.name)) + '"></div>' +
        '<div class="modal__body">' +
          '<button class="icon-btn modal__close" data-close aria-label="' + QR_PLACEHOLDER.esc(t('common.close')) + '">' + QR_PLACEHOLDER.icon('close') + '</button>' +
          '<div class="pcard__meta"><span>' + QR_PLACEHOLDER.esc(catLabel(p.cat)) + '</span><span>' + QR_PLACEHOLDER.esc(t('product.sku') + ' ' + p.sku) + '</span></div>' +
          '<h2 class="h-md" style="margin:10px 0 0">' + QR_PLACEHOLDER.esc(L(p.name)) + '</h2>' +
          '<div class="pd__price"><b>' + priceLabel(p) + '</b>' + (off > 0 ? '<s>' + money(p.oldPrice) + '</s>' : '') + '</div>' +
          '<p class="lead" style="margin-top:14px;font-size:.95rem">' + QR_PLACEHOLDER.esc(L(p.desc)).slice(0, 220) + '…</p>' +
          '<div class="pd__label">' + QR_PLACEHOLDER.esc(t('product.size')) + '</div>' +
          '<div class="opt-row" data-sizes>' + sizesHtml(p, 'opt') + '</div>' +
          '<div class="pd__buy">' +
            '<button class="btn btn-gold" data-add="' + p.id + '" data-close>' + QR_PLACEHOLDER.icon('cart') + QR_PLACEHOLDER.esc(t('products.add')) + '</button>' +
            '<a class="btn btn-ghost" href="product.html?id=' + encodeURIComponent(p.id) + '">' + QR_PLACEHOLDER.esc(lang === 'ru' ? 'Подробнее' : 'Толығырақ') + '</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ---------- Поиск ---------- */
  function openSearch() {
    openModal(
      '<div class="search-head">' +
        QR_PLACEHOLDER.icon('search') +
        '<input class="input" id="qrSearch" type="search" placeholder="' + QR_PLACEHOLDER.esc(t('nav.search')) + '" autocomplete="off">' +
      '</div>' +
      '<div class="search-res" id="qrSearchRes">' +
        PRODUCTS.slice(0, 5).map(function (p) { return miniRow(p); }).join('') +
      '</div>', 'search-panel'
    );
    const inp = document.getElementById('qrSearch');
    const res = document.getElementById('qrSearchRes');
    function run() {
      const q = inp.value.trim().toLowerCase();
      const list = q
        ? PRODUCTS.filter(function (p) {
            return (p.name.ru + ' ' + p.name.kz + ' ' + p.sku).toLowerCase().indexOf(q) > -1;
          })
        : PRODUCTS.slice(0, 5);
      res.innerHTML = list.length
        ? list.map(function (p) { return miniRow(p); }).join('')
        : '<p class="muted" style="padding:22px 0">' + QR_PLACEHOLDER.esc(t('products.none')) + '</p>';
    }
    inp.addEventListener('input', run);
    setTimeout(function () { inp.focus(); }, 120);
  }

  function miniRow(p) {
    return '' +
    '<a class="mini" href="product.html?id=' + encodeURIComponent(p.id) + '" data-close>' +
      '<span class="mini__media"><img src="' + QR_PLACEHOLDER.productImage(p, 0) + '" alt=""></span>' +
      '<span><span class="mini__t">' + QR_PLACEHOLDER.esc(L(p.name)) + '</span><br>' +
        '<span class="muted small">' + QR_PLACEHOLDER.esc(catLabel(p.cat)) + ' · ' + QR_PLACEHOLDER.esc(p.sku) + '</span></span>' +
      '<span class="mini__p">' + priceLabel(p) + '</span>' +
    '</a>';
  }

  /* ---------- Мобильное меню / фильтры ---------- */
  function openMenu(on) {
    const m = document.getElementById('mmenu');
    if (!m) return;
    m.classList.toggle('open', on);
    document.body.classList.toggle('no-scroll', on);
    m.querySelectorAll('.mmenu__nav a').forEach(function (a, i) {
      a.style.setProperty('--d', (0.06 + i * 0.055) + 's');
    });
  }
  function toggleFilters(on) {
    const f = document.getElementById('filters');
    const s = document.getElementById('filtersScrim');
    if (!f) return;
    f.classList.toggle('open', on);
    if (s) s.classList.toggle('on', on);
    document.body.classList.toggle('no-scroll', on);
  }

  /* ---------- Шапка и подвал ---------- */
  function headerHtml() {
    const path = location.pathname.split('/').pop() || 'index.html';
    const link = function (href, key, extra) {
      return '<a class="nav__link' + (path === href ? ' active' : '') + (extra || '') + '" href="' + href + '">' + QR_PLACEHOLDER.esc(t(key)) + '</a>';
    };
    return '' +
    '<div class="topbar"><div class="wrap topbar__in">' +
      '<span>' + QR_PLACEHOLDER.icon('truck') + QR_PLACEHOLDER.esc(lang === 'ru' ? 'Доставка по всему Казахстану' : 'Қазақстан бойынша жеткізу') + '</span>' +
      '<span>' + QR_PLACEHOLDER.icon('phone') + QR_PLACEHOLDER.esc(CONTACT.phone) + '</span>' +
      '<span>' + QR_PLACEHOLDER.icon('clock') + QR_PLACEHOLDER.esc(L(CONTACT.hours)) + '</span>' +
    '</div></div>' +
    '<div class="wrap"><div class="navbar">' +
      '<a class="logo" href="index.html">' +
        '<img class="logo__mark" src="' + QR_PLACEHOLDER.logoMark() + '" alt="">' +
        '<span class="logo__txt"><span class="logo__name">Qazaq<b>Republic</b></span>' +
        '<span class="logo__sub">' + QR_PLACEHOLDER.esc(lang === 'ru' ? 'streetwear' : 'стритвери') + '</span></span>' +
      '</a>' +
      '<nav class="nav">' +
        link('index.html', 'nav.home') +
        link('catalog.html', 'nav.catalog') +
        link('catalog.html?cat=hudi', 'nav.hudi', ' data-cat="hudi"') +
        link('catalog.html?cat=svitshot', 'nav.svitshot', ' data-cat="svitshot"') +
        link('catalog.html?cat=niz', 'nav.niz', ' data-cat="niz"') +
        link('catalog.html?cat=sumka', 'nav.sumka', ' data-cat="sumka"') +
        link('about.html', 'nav.about') +
      '</nav>' +
      '<div class="nav-tools">' +
        '<div class="lang" role="group">' +
          '<button type="button" data-lang="ru" class="' + (lang === 'ru' ? 'on' : '') + '">RU</button>' +
          '<button type="button" data-lang="kz" class="' + (lang === 'kz' ? 'on' : '') + '">KZ</button>' +
        '</div>' +
        '<button class="icon-btn" data-search aria-label="' + QR_PLACEHOLDER.esc(t('nav.search')) + '">' + QR_PLACEHOLDER.icon('search') + '</button>' +
        '<a class="icon-btn" href="wishlist.html" aria-label="' + QR_PLACEHOLDER.esc(t('nav.wishlist')) + '">' + QR_PLACEHOLDER.icon('heart') +
          '<i class="icon-btn__badge" data-badge="wish">0</i></a>' +
        '<a class="icon-btn" href="cart.html" aria-label="' + QR_PLACEHOLDER.esc(t('nav.cart')) + '">' + QR_PLACEHOLDER.icon('cart') +
          '<i class="icon-btn__badge" data-badge="cart">0</i></a>' +
        '<button class="icon-btn burger" data-burger="open" aria-label="' + QR_PLACEHOLDER.esc(t('nav.menu')) + '">' + QR_PLACEHOLDER.icon('menu') + '</button>' +
      '</div>' +
    '</div></div>';
  }

  function mobileMenuHtml() {
    const item = function (href, key) { return '<a href="' + href + '">' + QR_PLACEHOLDER.esc(t(key)) + '</a>'; };
    const catItem = function (id) { return '<a href="catalog.html?cat=' + id + '">' + QR_PLACEHOLDER.esc(catLabel(id)) + '</a>'; };
    return '' +
    '<div class="mmenu__top">' +
      '<a class="logo" href="index.html">' +
        '<img class="logo__mark" src="' + QR_PLACEHOLDER.logoMark() + '" alt="">' +
        '<span class="logo__txt"><span class="logo__name" style="color:var(--cream)">Qazaq<b>Republic</b></span>' +
        '<span class="logo__sub">' + QR_PLACEHOLDER.esc(lang === 'ru' ? 'streetwear' : 'стритвери') + '</span></span>' +
      '</a>' +
      '<button class="mmenu__close" data-burger="close" aria-label="' + QR_PLACEHOLDER.esc(t('common.close')) + '">' + QR_PLACEHOLDER.icon('close') + '</button>' +
    '</div>' +
    '<nav class="mmenu__nav">' +
      item('index.html', 'nav.home') + item('catalog.html', 'nav.catalog') +
      catItem('hudi') + catItem('svitshot') +
      catItem('futbolka') + catItem('rubashka') +
      catItem('vverh') + catItem('niz') + catItem('sumka') +
      catItem('school') + catItem('golovnoy') + catItem('giftbox') +
      item('about.html', 'nav.about') + item('contacts.html', 'nav.contacts') +
    '</nav>' +
    '<div class="mmenu__foot">' +
      '<a href="tel:' + CONTACT.phoneHref + '">' + QR_PLACEHOLDER.icon('phone') + QR_PLACEHOLDER.esc(CONTACT.phone) + '</a>' +
      '<a href="mailto:' + CONTACT.email + '">' + QR_PLACEHOLDER.icon('mail') + QR_PLACEHOLDER.esc(CONTACT.email) + '</a>' +
      '<span style="display:inline-flex;align-items:center;gap:.5em">' + QR_PLACEHOLDER.icon('clock') + QR_PLACEHOLDER.esc(L(CONTACT.hours)) + '</span>' +
      '<button class="mmenu__tool" type="button" data-search>' + QR_PLACEHOLDER.icon('search') + QR_PLACEHOLDER.esc(t('nav.search')) + '</button>' +
      '<a href="wishlist.html">' + QR_PLACEHOLDER.icon('heart') + QR_PLACEHOLDER.esc(t('nav.wishlist')) + '</a>' +
      '<div class="lang" style="margin-top:6px">' +
        '<button type="button" data-lang="ru" class="' + (lang === 'ru' ? 'on' : '') + '">RU</button>' +
        '<button type="button" data-lang="kz" class="' + (lang === 'kz' ? 'on' : '') + '">KZ</button>' +
      '</div>' +
    '</div>';
  }

  function footerHtml() {
    const col = function (title, links) {
      return '<div><div class="footer__t">' + QR_PLACEHOLDER.esc(title) + '</div><div class="footer__links">' +
        links.map(function (l) { return '<a href="' + l[0] + '">' + QR_PLACEHOLDER.esc(l[1]) + '</a>'; }).join('') +
        '</div></div>';
    };
    return '' +
    '<div class="wrap footer__in"><div class="footer__grid">' +
      '<div class="footer__logo">' +
        '<a class="logo" href="index.html">' +
          '<img class="logo__mark" src="' + QR_PLACEHOLDER.logoMark() + '" alt="">' +
          '<span class="logo__txt"><span class="logo__name">Qazaq<b>Republic</b></span>' +
          '<span class="logo__sub">' + QR_PLACEHOLDER.esc(lang === 'ru' ? 'streetwear из Казахстана' : 'Қазақстан стритвери') + '</span></span>' +
        '</a>' +
        '<p class="lead" style="margin-top:18px;font-size:.92rem;max-width:34ch">' +
          QR_PLACEHOLDER.esc(lang === 'ru'
            ? 'Streetwear-бренд из Казахстана. Худи, свитшоты, футболки и брюки оверсайз по своему лекалу.'
            : 'Қазақстаннан стритвери бренді. Өз лекалымыз бойынша бүржейде, кеңжейде, футболка және оверсайз шалбар.') +
        '</p>' +
        '<div class="footer__soc">' +
          '<a href="' + CONTACT.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + QR_PLACEHOLDER.icon('instagram') + '</a>' +
          '<a href="' + CONTACT.whatsapp + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + QR_PLACEHOLDER.icon('whatsapp') + '</a>' +
          '<a href="' + CONTACT.telegram + '" target="_blank" rel="noopener" aria-label="Telegram">' + QR_PLACEHOLDER.icon('arrow') + '</a>' +
        '</div>' +
      '</div>' +
      col(lang === 'ru' ? 'Каталог' : 'Каталог', [
        ['catalog.html?cat=hudi', t('nav.hudi')],
        ['catalog.html?cat=svitshot', t('nav.svitshot')],
        ['catalog.html?cat=niz', t('nav.niz')],
        ['catalog.html?cat=sumka', t('nav.sumka')],
        ['catalog.html?cat=giftbox', lang === 'ru' ? 'Гифтбоксы' : 'Гифтбокстар']
      ]) +
      col(lang === 'ru' ? 'Покупателям' : 'Сатып алушыларға', [
        ['about.html', t('nav.about')],
        ['contacts.html', t('nav.contacts')],
        ['cart.html', t('nav.cart')],
        ['wishlist.html', t('nav.wishlist')]
      ]) +
      '<div>' +
        '<div class="footer__t">' + QR_PLACEHOLDER.esc(t('contact.phone')) + '</div>' +
        '<div class="footer__links"><a href="tel:' + CONTACT.phoneHref + '">' + QR_PLACEHOLDER.esc(CONTACT.phone) + '</a>' +
        '<a href="mailto:' + CONTACT.email + '">' + QR_PLACEHOLDER.esc(CONTACT.email) + '</a>' +
        '<a href="' + CONTACT.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a>' +
        '<a href="#">' + QR_PLACEHOLDER.esc(L(CONTACT.legal)) + '</a></div>' +
      '</div>' +
    '</div>' +
    '<div class="footer__bot">' +
      '<span>© ' + new Date().getFullYear() + ' QazaqRepublic. ' + QR_PLACEHOLDER.esc(lang === 'ru' ? 'Все права защищены.' : 'Барлық құқық қорғалған.') + '</span>' +
      '<div class="footer__pay"><span>VISA</span><span>MASTERCARD</span><span>QR+</span><span>KASPI</span></div>' +
    '</div>' +
    '</div>';
  }

  function mountShell() {
    const h = document.getElementById('qrHeader');
    if (h) { h.innerHTML = headerHtml(); h.setAttribute('data-js', '1'); }
    const m = document.getElementById('qrMenu');
    if (m) { m.className = 'mmenu'; m.id = 'mmenu'; m.innerHTML = mobileMenuHtml(); }
    const f = document.getElementById('qrFooter');
    if (f) f.innerHTML = footerHtml();

    /* разделительные полосы */
    document.querySelectorAll('[data-orn]').forEach(function (el) {
      el.style.backgroundImage = 'url("' + QR_PLACEHOLDER.ornamentStrip(el.dataset.ornColor || '#ff4d1f') + '")';
    });
    document.querySelectorAll('[data-ornlight]').forEach(function (el) {
      el.style.backgroundImage = 'url("' + QR_PLACEHOLDER.ornamentStrip('#ff7a52') + '")';
    });

    document.documentElement.lang = lang;

    /* авто-иконки */
    document.querySelectorAll('[data-chev]').forEach(function (el) { el.innerHTML = QR_PLACEHOLDER.icon('chevron'); });
    document.querySelectorAll('[data-chev-filter]').forEach(function (el) { el.innerHTML = QR_PLACEHOLDER.icon('filter'); });
    document.querySelectorAll('[data-ic]').forEach(function (el) { el.innerHTML = QR_PLACEHOLDER.icon(el.dataset.ic); });

    paintBadges();
  }

  /* ---------- Sticky header ---------- */
  function stickyHeader() {
    const h = document.getElementById('qrHeader');
    if (!h) return;
    let last = 0;
    function onScroll() {
      const y = window.scrollY;
      h.classList.toggle('stuck', y > 40);
      const open = document.getElementById('mmenu');
      if (open && open.classList.contains('open')) return;
      if (y > 260 && y > last) h.style.transform = 'translateY(-100%)';
      else h.style.transform = '';
      last = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Язык ---------- */
  function setLang(l) {
    if (!I18N[l] || l === lang) return;
    lang = l;
    LS.set(K.lang, l);
    location.reload();
  }

  /* ---------- Применение переводов к статике ---------- */
  function applyStatic() {
    document.title = t('meta.home');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (I18N[lang][key] != null) el.textContent = I18N[lang][key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-ph');
      if (I18N[lang][key] != null) el.setAttribute('placeholder', I18N[lang][key]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      if (I18N[lang][key] != null) el.setAttribute('aria-label', I18N[lang][key]);
    });
  }

  function initInside(root) {
    const r = root || document;
    r.querySelectorAll('[data-sizes]').forEach(function (box) {
      if (box.children.length === 1) box.firstElementChild.classList.add('on');
    });
    r.querySelectorAll('[data-swatch]').forEach(function (b) {
      b.style.setProperty('--c', color(b.getAttribute('data-swatch')).hex);
    });
    initAcc(r);
    reveal(r);
    initCounters(r);
  }

  function init() {
    applyStatic();
    mountShell();
    stickyHeader();
    delegate();
    initInside(document);
    paintBadges();

    /* если реальное фото не загрузилось — рисуем SVG-заглушку */
    document.addEventListener('error', function (e) {
      const img = e.target;
      if (!img || img.tagName !== 'IMG' || !img.src || img.dataset.qrFb) return;
      img.dataset.qrFb = '1';
      const m = img.closest('[data-pid]');
      const p = m ? product(m.getAttribute('data-pid')) : null;
      img.src = QR_PLACEHOLDER.fallbackImage(p || {});
    }, true);

    document.addEventListener('click', function (e) {
      const lg = e.target.closest('[data-lang]');
      if (lg) { setLang(lg.getAttribute('data-lang')); return; }
      if (e.target.closest('[data-search]')) { openSearch(); return; }
    });

    document.querySelectorAll('.mmenu__nav a').forEach(function (a) {
      a.addEventListener('click', function () { openMenu(false); });
    });

    document.dispatchEvent(new CustomEvent('qr:cards'));
    document.dispatchEvent(new CustomEvent('qr:ready'));
  }

  return {
    init: init, t: t, L: L, money: money, num: num, priceLabel: priceLabel,
    contact: CONTACT, config: CONFIG,
    product: product, products: PRODUCTS, category: catLabel, typeLabel: typeLabel, fabricLabel: fabricLabel, color: color,
    discount: discount, inStock: inStock,
    addToCart: addToCart, setQty: setQty, removeLine: removeLine, clearCart: clearCart,
    cart: function () { return cart; }, lineKey: lineKey, cartCount: cartCount, totals: totals,
    wish: function () { return wish; }, inWish: inWish, toggleWish: toggleWish,
    productCard: productCard, productGrid: productGrid, skeletons: skeletons,
    toast: toast, openModal: openModal, closeModal: closeModal,
    reveal: reveal, countUp: countUp, initAcc: initAcc, initInside: initInside,
    openSearch: openSearch, openQuick: openQuick,
    toggleFilters: toggleFilters, openMenu: openMenu,
    get lang() { return lang; },
    icon: function (n, c) { return QR_PLACEHOLDER.icon(n, c); },
    sizesHtml: sizesHtml,
    setQtyKey: function (k, q) { setQty(k, q); }
  };
})();

document.addEventListener('DOMContentLoaded', function () { QR.init(); });