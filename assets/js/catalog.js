/* ==========================================================
   QazaqRepublic — каталог: фильтры, сортировка, пагинация
   ========================================================== */

function boot() {
  const P = QR_PLACEHOLDER;
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  const ALL = QR.products;
  const PRICE_MIN = 3000;
  const PRICE_MAX = 45000;
  const PER_PAGE = 12;

  const S = {
    cats: new Set(), types: new Set(), sizes: new Set(), colors: new Set(), fabrics: new Set(),
    min: PRICE_MIN, max: PRICE_MAX, sort: 'pop', view: 'grid', page: 1
  };

  /* ---------- URL ---------- */
  const qp = new URLSearchParams(location.search);
  if (qp.get('cat')) S.cats.add(qp.get('cat'));
  if (qp.get('type')) S.types.add(qp.get('type'));

  /* ---------- Опции фильтров ---------- */
  function countBy(key, val) {
    return ALL.filter(function (p) {
      if (key === 'cat') return p.cat === val;
      if (key === 'type') return p.type === val;
      if (key === 'fabric') return p.fabric === val;
      return true;
    }).length;
  }

  $('#fCat').innerHTML = CATEGORIES.map(function (c) {
    return '<label class="check"><input type="checkbox" data-f="cat" value="' + c.id + '">' +
      '<span class="check__box">' + P.icon('check') + '</span>' +
      '<span>' + P.esc(QR.L(c)) + '</span><span class="check__n">' + countBy('cat', c.id) + '</span></label>';
  }).join('');

  $('#fType').innerHTML = TYPES.map(function (t2) {
    return '<label class="check"><input type="checkbox" data-f="type" value="' + t2.id + '">' +
      '<span class="check__box">' + P.icon('check') + '</span>' +
      '<span>' + P.esc(QR.L(t2)) + '</span><span class="check__n">' + countBy('type', t2.id) + '</span></label>';
  }).join('');

  $('#fFabric').innerHTML = FABRICS.map(function (f) {
    return '<label class="check"><input type="checkbox" data-f="fabric" value="' + f.id + '">' +
      '<span class="check__box">' + P.icon('check') + '</span>' +
      '<span>' + P.esc(QR.L(f)) + '</span><span class="check__n">' + countBy('fabric', f.id) + '</span></label>';
  }).join('');

  const allSizes = [];
  ALL.forEach(function (p) { p.sizes.forEach(function (s) { if (allSizes.indexOf(s) < 0) allSizes.push(s); }); });
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].concat(
    allSizes.filter(function (s) { return !/^(XS|S|M|L|XL|XXL|ONE)$/.test(s); }).sort()
  );
  $('#fSize').innerHTML = sizeOrder.map(function (s) {
    const n = ALL.filter(function (p) { return p.sizes.indexOf(s) > -1; }).length;
    if (!n) return '';
    return '<button type="button" class="size-btn" data-fsize="' + P.esc(s) + '">' + P.esc(s) + '</button>';
  }).join('');

  $('#fColor').innerHTML = COLORS.map(function (c) {
    return '<button type="button" class="swatch" data-fcolor="' + c.id + '" title="' + P.esc(QR.L(c)) + '" ' +
      'style="background:' + c.hex + '"><span class="swatch__check">' + P.icon('check') + '</span></button>';
  }).join('');

  /* ---------- Сортировка ---------- */
  const SORT_LABELS = QR.lang === 'ru'
    ? { pop: 'Сначала популярные', new: 'Сначала новинки', cheap: 'Сначала дешевле', expensive: 'Сначала дороже', discount: 'По скидке', name: 'По названию' }
    : { pop: 'Алдымен таңдаулы', new: 'Алдымен жаңалық', cheap: 'Алдымен арзан', expensive: 'Алдымен қымбат', discount: 'Арзандығы бойынша', name: 'Атауы бойынша' };
  const sortSel = $('#fSort');
  sortSel.innerHTML = Object.keys(SORT_LABELS).map(function (k) {
    return '<option value="' + k + '">' + P.esc(SORT_LABELS[k]) + '</option>';
  }).join('');

  /* ---------- Заголовок ---------- */
  function title() {
    const el = $('#qrTitle'), crumb = $('#qrCrumb');
    let txt = QR.t('nav.catalog'), sub = null;
    if (S.cats.size === 1) {
      const c = CATEGORIES.find(function (x) { return x.id === Array.from(S.cats)[0]; });
      if (c) { txt = QR.L(c); sub = 'catalog.html'; }
    } else if (S.types.size === 1) {
      txt = QR.typeLabel(Array.from(S.types)[0]);
    } else if (S.sort === 'new') {
      txt = QR.t('cat.new');
    }
    el.textContent = txt;
    if (sub) {
      crumb.hidden = false;
      crumb.innerHTML = '<span class="ic">' + P.icon('chevron') + '</span><span>' + P.esc(txt) + '</span>';
    } else crumb.hidden = true;
    document.title = txt + ' — QazaqRepublic';
  }

  /* ---------- Фильтрация ---------- */
  function filtered() {
    let list = ALL.filter(function (p) {
      if (S.cats.size && !S.cats.has(p.cat)) return false;
      if (S.types.size && !S.types.has(p.type)) return false;
      if (S.fabrics.size && !S.fabrics.has(p.fabric)) return false;
      if (S.colors.size && !p.colors.some(function (c) { return S.colors.has(c); })) return false;
      if (S.sizes.size && !p.sizes.some(function (s) { return S.sizes.has(s); })) return false;
      if (p.price < S.min || p.price > S.max) return false;
      return true;
    });

    const score = function (p) {
      let n = 0;
      if (p.badge === 'hit') n += 60;
      if (p.badge === 'new') n += 45;
      if (p.badge === 'sale') n += 35;
      n += QR.discount(p) * 2;
      n += Math.min(p.stock || 0, 20) * 0.6;
      return n;
    };

    list.sort(function (a, b) {
      switch (S.sort) {
        case 'cheap': return a.price - b.price;
        case 'expensive': return b.price - a.price;
        case 'discount': return QR.discount(b) - QR.discount(a);
        case 'new': return (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0) || score(b) - score(a);
        case 'name': return QR.L(a.name).localeCompare(QR.L(b.name));
        default: return score(b) - score(a);
      }
    });
    return list;
  }

  /* ---------- Рендер ---------- */
  const grid = $('#fGrid'), moreBtn = $('#fMore');

  function render(first) {
    const list = filtered();
    const slice = list.slice(0, S.page * PER_PAGE);

    $('#fCount').innerHTML = list.length
      ? '<b>' + QR.num(list.length) + '</b> ' + (QR.lang === 'ru' ? 'товаров' : 'бұйым')
      : '<b>0</b> ' + (QR.lang === 'ru' ? 'товаров' : 'бұйым');

    if (!list.length) {
      grid.innerHTML = '<div class="empty">' +
        '<span class="empty__ic">' + P.icon('search') + '</span>' +
        '<h3 class="h-sm">' + P.esc(QR.t('products.none')) + '</h3>' +
        '<p class="muted">' + P.esc(QR.t('products.empty')) + '</p>' +
        '<button class="btn btn-ghost btn-sm" id="fReset2">' + P.esc(QR.t('products.reset')) + '</button></div>';
      const r2 = $('#fReset2');
      if (r2) r2.addEventListener('click', reset);
      moreBtn.hidden = true;
      chips();
      return;
    }

    if (first) grid.innerHTML = QR.skeletons(Math.min(8, slice.length));
    setTimeout(function () {
      grid.innerHTML = QR.productGrid(slice, { list: S.view === 'list' });
      QR.reveal(grid);
      document.dispatchEvent(new CustomEvent('qr:cards'));
      if (first) {
        const box = $('#filters');
        if (box && getComputedStyle(box).position === 'fixed') QR.toggleFilters(true);
      }
    }, first ? 260 : 0);

    moreBtn.hidden = slice.length >= list.length;
    moreBtn.textContent = (QR.lang === 'ru' ? 'Показать ещё' : 'Толығырақ көрсету') +
      (list.length - slice.length > 0 ? ' (' + QR.num(list.length - slice.length) + ')' : '');
    chips();
  }

  /* ---------- Чипсы ---------- */
  function chips() {
    const box = $('#fChips');
    const items = [];
    S.cats.forEach(function (v) { items.push(['cat', v, QR.category(v)]); });
    S.types.forEach(function (v) { items.push(['type', v, QR.typeLabel(v)]); });
    S.sizes.forEach(function (v) { items.push(['size', v, QR.t('product.size') + ' ' + v]); });
    S.colors.forEach(function (v) { items.push(['color', v, QR.L(QR.color(v))]); });
    S.fabrics.forEach(function (v) { items.push(['fabric', v, QR.fabricLabel(v)]); });

    let html = items.map(function (it) {
      return '<span class="chip">' + P.esc(it[2]) +
        '<button type="button" data-chip="' + it[0] + '" data-val="' + P.esc(it[1]) + '" aria-label="×">×</button></span>';
    }).join('');

    if (items.length || S.min !== PRICE_MIN || S.max !== PRICE_MAX) {
      html += '<button type="button" class="chip chip--clear" id="fClear">' + P.esc(QR.t('products.reset')) + '</button>';
    }
    box.innerHTML = html;
  }

  /* ---------- Синхронизация контролов ---------- */
  const SET_OF = { cat: S.cats, type: S.types, fabric: S.fabrics };
  function sync() {
    $$('[data-f]').forEach(function (i) {
      i.checked = SET_OF[i.dataset.f].has(i.value);
    });
    $$('[data-fsize]').forEach(function (b) { b.classList.toggle('on', S.sizes.has(b.dataset.fsize)); });
    $$('[data-fcolor]').forEach(function (b) { b.classList.toggle('on', S.colors.has(b.dataset.fcolor)); });
    $('#fRange').value = S.max;
    $('#fMin').value = S.min === PRICE_MIN ? '' : S.min;
    $('#fMax').value = S.max === PRICE_MAX ? '' : S.max;
    $('#fSort').value = S.sort;
  }

  function push() { S.page = 1; sync(); render(true); }

  function reset() {
    S.cats.clear(); S.types.clear(); S.sizes.clear(); S.colors.clear(); S.fabrics.clear();
    S.min = PRICE_MIN; S.max = PRICE_MAX;
    push();
  }

  /* ---------- События ---------- */
  $('#fCat').addEventListener('change', function (e) {
    const v = e.target.value;
    if (e.target.checked) S.cats.add(v); else S.cats.delete(v);
    push();
  });
  $('#fType').addEventListener('change', function (e) {
    const v = e.target.value;
    if (e.target.checked) S.types.add(v); else S.types.delete(v);
    push();
  });
  $('#fFabric').addEventListener('change', function (e) {
    const v = e.target.value;
    if (e.target.checked) S.fabrics.add(v); else S.fabrics.delete(v);
    push();
  });
  $('#fSize').addEventListener('click', function (e) {
    const b = e.target.closest('[data-fsize]');
    if (!b) return;
    const v = b.dataset.fsize;
    if (S.sizes.has(v)) S.sizes.delete(v); else S.sizes.add(v);
    push();
  });
  $('#fColor').addEventListener('click', function (e) {
    const b = e.target.closest('[data-fcolor]');
    if (!b) return;
    const v = b.dataset.fcolor;
    if (S.colors.has(v)) S.colors.delete(v); else S.colors.add(v);
    push();
  });
  $('#fRange').addEventListener('input', function (e) {
    S.max = +e.target.value;
    if (S.min > S.max) S.min = S.max;
    $('#fMax').value = S.max === PRICE_MAX ? '' : S.max;
    render(false);
  });
  $('#fRange').addEventListener('change', function () { S.page = 1; render(true); });
  $('#fMin').addEventListener('change', function (e) {
    S.min = Math.max(PRICE_MIN, Math.min(+(e.target.value || PRICE_MIN), S.max));
    S.page = 1; sync(); render(true);
  });
  $('#fMax').addEventListener('change', function (e) {
    S.max = Math.min(PRICE_MAX, Math.max(+(e.target.value || PRICE_MAX), S.min));
    S.page = 1; sync(); render(true);
  });
  $('#fSort').addEventListener('change', function (e) { S.sort = e.target.value; push(); });
  $('#fReset').addEventListener('click', reset);
  moreBtn.addEventListener('click', function () { S.page++; render(false); });

  $('#fChips').addEventListener('click', function (e) {
    const c = e.target.closest('[data-chip]');
    if (c) {
      const set = c.dataset.chip === 'cat' ? S.cats : c.dataset.chip === 'type' ? S.types :
        c.dataset.chip === 'size' ? S.sizes : c.dataset.chip === 'color' ? S.colors : S.fabrics;
      set.delete(c.dataset.val);
      push();
      return;
    }
    if (e.target.closest('#fClear')) reset();
  });

  $$('.view-toggle button').forEach(function (b) {
    b.addEventListener('click', function () {
      S.view = b.dataset.view;
      $$('.view-toggle button').forEach(function (x) { x.classList.toggle('on', x === b); });
      const g = $('#fGrid .pgrid');
      if (g) g.classList.toggle('list', S.view === 'list');
    });
    b.innerHTML = P.icon(b.dataset.view === 'grid' ? 'grid' : 'menu');
  });

  /* мобильные фильтры */
  const openBtn = $('#fOpen'), closeBtn = $('.filters__close');
  function applyResponsive() {
    const mobile = window.matchMedia('(max-width:1024px)').matches;
    openBtn.style.display = mobile ? 'inline-flex' : 'none';
    closeBtn.style.display = mobile ? 'grid' : 'none';
    closeBtn.innerHTML = P.icon('close');
  }
  applyResponsive();
  window.addEventListener('resize', applyResponsive);

  /* ---------- Старт ---------- */
  const meta = $('#qrMeta');
  if (meta) meta.setAttribute('content', QR.t('meta.desc'));
  title();
  sync();
  render(true);
}

if (document.readyState === 'loading') document.addEventListener('qr:ready', boot);
else boot();