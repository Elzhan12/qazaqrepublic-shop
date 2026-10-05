/* ==========================================================
   QazaqRepublic — данные каталога
   Данные синхронизированы с qazaqrepublic.com
   ========================================================== */

const CONFIG = {
  currency: '₸',
  locale: 'ru-RU',
  freeShippingFrom: 20000,
  deliveryPrice: 1500,
  promo: { code: 'QAZAQ10', discount: 0.1 },
  site: 'https://qazaqrepublic.com'
};

const CONTACT = {
  phone: '+7 701 572 24 40',
  phoneHref: '+77015722440',
  email: 'customerservice@qazaqrepublic.com',
  partners: 'partners@qazaqrepublic.com',
  whatsapp: 'https://wa.me/77082405949',
  instagram: 'https://www.instagram.com/qazaq.republic',
  telegram: 'https://t.me/qazaqrepublic',
  legal: {
    ru: 'Казахстан, г. Астана, шоссе Коргалжын, 31, н.п. 30',
    kz: 'Қазақстан, Астана қ., Корғалжын тас жолы, 31, қ.с. 30'
  },
  pickup: {
    ru: ['Астана, пр. Туран 89/3, ЖК «Cosmic City», офис 2',
        'Алматы, ул. Маметовой 47',
        'Астана, стор ТРЦ Mega Silk Way'],
    kz: ['Астана, Тұран даңғ. 89/3, «Cosmic City» тұрғын үйі, кеңсе 2',
        'Алматы, Маметова көш. 47',
        'Астана, Mega Silk Way сауда орталығы жанындағы стор']
  },
  hours: { ru: 'Ежедневно 11:00 — 21:00', kz: 'Күнделікті 11:00 — 21:00' }
};

/* ---------- ПЕРЕВОДЫ ---------- */
const I18N = {
  ru: {
    'meta.home': 'QazaqRepublic — казахский streetwear',
    'meta.desc': 'QazaqRepublic — казахский streetwear-бренд: худи, свитшоты, футболки, рубашки, брюки, куртки и аксессуары.',
    'nav.home': 'Главная',
    'nav.catalog': 'Магазин',
    'nav.about': 'О бренде',
    'nav.contacts': 'Контакты',
    'nav.hudi': 'Худи',
    'nav.svitshot': 'Свитшоты',
    'nav.futbolka': 'Футболки',
    'nav.niz': 'Брюки',
    'nav.sumka': 'Сумки',
    'nav.accessories': 'Аксессуары',
    'nav.search': 'Поиск',
    'nav.wishlist': 'Избранное',
    'nav.cart': 'Корзина',
    'nav.menu': 'Меню',

    'hero.kicker': 'Дроп 2026',
    'hero.title1': 'Сделано',
    'hero.title2': 'в Казахстане',
    'hero.text': 'Streetwear-бренд из Астаны и Алматы: худи, свитшоты, футболки и рубашки оверсайз. Своё лекало, плотный футер и принты, которые не смываются.',
    'hero.cta': 'Смотреть магазин',
    'hero.cta2': 'О бренде',
    'hero.scroll': 'листайте',
    'hero.stat1': 'моделей в каталоге',
    'hero.stat2': 'городов доставки',
    'hero.stat3': 'лет бренду',

    'strip.1': 'своё лекало',
    'strip.2': 'плотный футер',
    'strip.3': 'принты не смываются',
    'strip.4': 'доставка по Казахстану',
    'strip.5': 'кэшбэк 5% через QR+',

    'cat.title': 'Категории',
    'cat.sub': 'Вещи, которые носят каждый день',
    'cat.filterType': 'Тип изделия',
    'cat.filterFabric': 'Ткань',
    'cat.all': 'Смотреть все',
    'cat.new': 'Новинки',
    'cat.sale': 'Скидки',
    'cat.hit': 'Хиты продаж',

    'products.title': 'Избранное',
    'products.sub': 'То, что забирают чаще всего',
    'products.all': 'Весь каталог',
    'products.add': 'В корзину',
    'products.added': 'Добавлено',
    'products.quickview': 'Быстрый просмотр',
    'products.none': 'Пока пусто',
    'products.empty': 'В этой категории пока нет товаров. Загляните в другие.',
    'products.reset': 'Сбросить фильтры',
    'products.filters': 'Фильтры',
    'products.from': 'от',
    'products.results': 'Найдено',

    'craft.title': 'Как мы делаем вещь',
    'craft.sub': 'От лекала до готовой партии',
    'craft.1.t': 'Лекало',
    'craft.1.d': 'Разрабатываем посадку сами: оверсайз, широкие плечи, спущенное плечо. Не копируем чужие размеры.',
    'craft.2.t': 'Ткань',
    'craft.2.d': 'Берём плотный футер и флис, которые держат форму и не садятся после стирок.',
    'craft.3.t': 'Принт',
    'craft.3.d': 'Печатаем шелкографией по грунту. Принт не трескается и не выцветает.',
    'craft.4.t': 'Контроль',
    'craft.4.d': 'Каждая партия проходит осмотр: швы, фурнитура, размерная сетка.',

    'about.title': 'Бренд из Казахстана',
    'about.text1': 'QazaqRepublic — это streetwear-бренд, который вырос из любви к Казахстану. Мы делаем вещи, в которых удобно жить: худи оверсайз, свитшоты, широкие брюки и рубашки с принтами.',
    'about.text2': 'Всё шивается небольшими партиями в Казахстане по собственным лекалам. В коллекциях — казахская айдентика, орнамент и типографика, но в современном streetwear-прочтении.',
    'about.f1': 'Своё лекало',
    'about.f2': 'Печать в Казахстане',
    'about.f3': 'Небольшие партии',
    'about.f4': 'Кэшбэк через QR+',

    'reviews.title': 'Что говорят покупатели',
    'reviews.sub': '4.9 из 5 — 412 отзывов',

    'news.title': 'Письма из цеха',
    'news.sub': 'Скидки, новые дропы и распродажи',
    'news.placeholder': 'Ваш email',
    'news.button': 'Подписаться',
    'news.ok': 'Готово! Мы напишем первыми',

    'cart.title': 'Корзина',
    'cart.empty': 'В корзине пока пусто',
    'cart.emptyText': 'Загляните в магазин — там новый дроп, худи оверсайз и много чего красивого.',
    'cart.go': 'В магазин',
    'cart.item': 'Товар',
    'cart.price': 'Цена',
    'cart.qty': 'Количество',
    'cart.total': 'Итого',
    'cart.remove': 'Удалить',
    'cart.clear': 'Очистить корзину',
    'cart.checkout': 'Оформить заказ',
    'cart.continue': 'Продолжить покупки',
    'cart.promo': 'Промокод',
    'cart.promoOk': 'Промокод применён',
    'cart.promoBad': 'Такой промокод не найден',
    'cart.delivery': 'Доставка',
    'cart.free': 'бесплатно',
    'cart.summary': 'Итого',
    'cart.left': 'До бесплатной доставки',
    'cart.leftText': 'Добавьте товаров ещё на',
    'cart.order': 'Заказ',
    'cart.items': 'товаров',

    'product.sku': 'Артикул',
    'product.size': 'Размер',
    'product.color': 'Цвет',
    'product.pickSize': 'Выберите размер',
    'product.pickColor': 'Выберите цвет',
    'product.desc': 'Описание',
    'product.care': 'Уход',
    'product.deliver': 'Доставка и оплата',
    'product.careText': 'Стирка при 30° в режиме «деликатный», не отжимать на сильных оборотах. Сушить горизонтально. Гладить через ткань при средней температуре.',
    'product.deliverText': 'Алматы и Астана — доставка на следующий день. Остальные города Казахстана — от 3 до 10 рабочих дней. Казпочта или курьер Avis, экспресс через Яндекс. Оплата картой, QR+ и наличными при получении.',
    'product.sizetable': 'Таблица размеров',
    'product.stock': 'в наличии',
    'product.left': 'Осталось',
    'product.related': 'Похожие товары',
    'product.brandline': 'Streetwear made in Kazakhstan',
    'product.notFound': 'Товар не найден',
    'product.cashback': 'Кэшбэк',

    'checkout.title': 'Оформление заказа',
    'checkout.step1': 'Доставка',
    'checkout.step2': 'Оплата',
    'checkout.step3': 'Готово',
    'checkout.name': 'Имя и фамилия',
    'checkout.phone': 'Телефон',
    'checkout.email': 'Email',
    'checkout.city': 'Город',
    'checkout.addr': 'Адрес',
    'checkout.addrPh': 'Улица, дом, квартира',
    'checkout.comment': 'Комментарий к заказу',
    'checkout.commentPh': 'Например: позвонить за час',
    'checkout.method': 'Способ оплаты',
    'checkout.card': 'Картой онлайн',
    'checkout.cash': 'Наличными при получении',
    'checkout.kaspi': 'QR+ / Kaspi.kz',
    'checkout.next': 'Дальше',
    'checkout.prev': 'Назад',
    'checkout.confirm': 'Подтвердить заказ',
    'checkout.success': 'Спасибо, заказ принят!',
    'checkout.successText': 'Мы перезвоним в течение 15 минут и подтвердим детали.',
    'checkout.orderNum': 'Номер заказа',
    'checkout.nextText': 'Что дальше?',
    'checkout.n1': 'Подтвердим заказ по телефону',
    'checkout.n2': 'Соберём и проверим каждое изделие',
    'checkout.n3': 'Отправим на следующий день',
    'checkout.summary': 'Ваш заказ',
    'checkout.req': 'Это поле обязательно',
    'checkout.phoneReq': 'Введите телефон полностью',
    'checkout.emailReq': 'Проверьте email',
    'checkout.agree': 'Согласен с условиями обработки данных',

    'contact.title': 'Связаться с нами',
    'contact.sub': 'Магазин, самовывоз и доставка',
    'contact.addr': 'Адрес',
    'contact.phone': 'Телефон',
    'contact.email': 'Почта',
    'contact.hours': 'Часы работы',
    'contact.form': 'Написать нам',
    'contact.msg': 'Сообщение',
    'contact.send': 'Отправить',
    'contact.sent': 'Сообщение отправлено. Ответим в течение рабочего дня.',
    'contact.faq': 'Частые вопросы',
    'faq.q1': 'Как заказать?',
    'faq.a1': 'Выберите вещь, размер и цвет, добавьте в корзину и оформите заказ. Оплата картой онлайн, через QR+ или наличными при получении.',
    'faq.q2': 'Что если размер не подошёл?',
    'faq.a2': 'Обмен в течение 14 дней. Вещь должна быть непоношенной, с бирками. Стоимость доставки при обмене оплачивает покупатель.',
    'faq.q3': 'Как быстро придёт заказ?',
    'faq.a3': 'Алматы и Астана — на следующий день после оплаты. Другие города — от 3 до 10 рабочих дней через Казпочту или курьера Avis.',
    'faq.q4': 'Есть ли кэшбэк?',
    'faq.a4': 'Да, 5% кэшбэка при оплате через QR+. Начисление приходит в приложении банка в течение суток.',

    'common.loading': 'Загружаем...',
    'common.close': 'Закрыть',
    'common.currency': 'Тенге',
    'err.notFoundPage': 'Страница не найдена',
    'err.notFoundText': 'Кажется, такой страницы нет. Вернёмся в каталог?',
    'toast.cart': 'Добавлено в корзину',
    'toast.wish': 'Добавлено в избранное',
    'toast.unwish': 'Удалено из избранного',
    'toast.size': 'Сначала выберите размер',
    'toast.removed': 'Товар удалён',
    'toast.copied': 'Ссылка скопирована'
  },

  kz: {
    'meta.home': 'QazaqRepublic — қазақ стритвери',
    'meta.desc': 'QazaqRepublic — қазақ стритвери бренді: бүржейде, кеңжейде, футболка, жейде, шалбар, куртка және аксессуарлар.',
    'nav.home': 'Басты бет',
    'nav.catalog': 'Дүкен',
    'nav.about': 'Бренд туралы',
    'nav.contacts': 'Байланыс',
    'nav.hudi': 'Бүржейде',
    'nav.svitshot': 'Кеңжейде',
    'nav.futbolka': 'Футболка',
    'nav.niz': 'Шалбар',
    'nav.sumka': 'Сөмке',
    'nav.accessories': 'Аксессуарлар',
    'nav.search': 'Іздеу',
    'nav.wishlist': 'Таңдаулы',
    'nav.cart': 'Себет',
    'nav.menu': 'Мәзір',

    'hero.kicker': '2026 дропы',
    'hero.title1': 'Қазақстанда',
    'hero.title2': 'жасалған',
    'hero.text': 'Астана мен Алматыдан стритвери бренді: бүржейде, кеңжейде, футболка және оверсайз жейде. Өз лекалымыз, тығыз футер және жуылмайтын принттер.',
    'hero.cta': 'Дүкенді көру',
    'hero.cta2': 'Бренд туралы',
    'hero.scroll': 'төмен сырғытыңыз',
    'hero.stat1': 'модель каталогта',
    'hero.stat2': 'қала жеткізу',
    'hero.stat3': 'жыл бренд',

    'strip.1': 'өз лекалымыз',
    'strip.2': 'тығыз футер',
    'strip.3': 'принт жуылмайды',
    'strip.4': 'Қазақстан бойынша жеткізу',
    'strip.5': 'QR+ арқылы кэшбэк 5%',

    'cat.title': 'Категориялар',
    'cat.sub': 'Күнделікті киілетін заттар',
    'cat.filterType': 'Бұйым түрі',
    'cat.filterFabric': 'Мата',
    'cat.all': 'Барлығын көру',
    'cat.new': 'Жаңалықтар',
    'cat.sale': 'Жеңілдіктер',
    'cat.hit': 'Ең көп сатылатын',

    'products.title': 'Таңдалғандары',
    'products.sub': 'Ең көп алынатын нәрселер',
    'products.all': 'Бүкіл каталог',
    'products.add': 'Себетке',
    'products.added': 'Қосылды',
    'products.quickview': 'Жылдам көру',
    'products.none': 'Әзірге бос',
    'products.empty': 'Бұл категорияда әлі тауар жоқ. Басқасына қараңыз.',
    'products.reset': 'Сүзгіні тастау',
    'products.filters': 'Сүзгі',
    'products.from': 'бастап',
    'products.results': 'Табылды',

    'craft.title': 'Қалай жасаймыз',
    'craft.sub': 'Лекаладан дайын партияға дейін',
    'craft.1.t': 'Лекало',
    'craft.1.d': 'Өз тілімізді жасаймыз: оверсайз, кең иық, түсірілген иық. Бөлгі өлшемді көшірмейміз.',
    'craft.2.t': 'Мата',
    'craft.2.d': 'Пішімін ұстайтын және жуылғаннан кейін тартылмайтын тығыз футер мен флис аламыз.',
    'craft.3.t': 'Принт',
    'craft.3.d': 'Грунт бойынша шілкосинфомен басамыз. Принт жарылмайды, түсі кетпейді.',
    'craft.4.t': 'Бақылау',
    'craft.4.d': 'Әр партия тексеріледі: тігіс, фурнитура, өлшем кестесі.',

    'about.title': 'Қазақстан бренді',
    'about.text1': 'QazaqRepublic — Қазақстанға деген махаббаттан өскен стритвери бренді. Тұрғанды қалай өмір сүруге ыңғайлы: оверсайз бүржейде, кеңжейде, кең шалбар және принтті жейде.',
    'about.text2': 'Бәрі Қазақстанда кіші партиялармен, өз лекалымыз бойынша тігіледі. Коллекцияларда қазақ айдентикасы, ою және типографика бар, бірақ заманауи стритвери тілінде.',
    'about.f1': 'Өз лекалымыз',
    'about.f2': 'Қазақстанда басылған',
    'about.f3': 'Кіші партиялар',
    'about.f4': 'QR+ арқылы кэшбэк',

    'reviews.title': 'Сатып алушылар пікірі',
    'reviews.sub': '5 ішінде 4.9 — 412 пікір',

    'news.title': 'Цехтен хабарлар',
    'news.sub': 'Жеңілдіктер, жаңа дроп және сатылым',
    'news.placeholder': 'Сіздің email',
    'news.button': 'Жазылу',
    'news.ok': 'Дайын! Біз бірінші хабарлаймыз',

    'cart.title': 'Себет',
    'cart.empty': 'Себет әлі бос',
    'cart.emptyText': 'Дүкенге кіріңіз — онда жаңа дроп, оверсайз бүржейде және тағы бағасы бар.',
    'cart.go': 'Дүкенге',
    'cart.item': 'Бұйым',
    'cart.price': 'Баға',
    'cart.qty': 'Саны',
    'cart.total': 'Барлығы',
    'cart.remove': 'Жою',
    'cart.clear': 'Себетті тастау',
    'cart.checkout': 'Тапсырыс беру',
    'cart.continue': 'Сатып алуды жалғастыру',
    'cart.promo': 'Промокод',
    'cart.promoOk': 'Промокод қолданылды',
    'cart.promoBad': 'Мұндай промокод табылмады',
    'cart.delivery': 'Жеткізу',
    'cart.free': 'тегін',
    'cart.summary': 'Барлығы',
    'cart.left': 'Тегін жеткізуге дейін',
    'cart.leftText': 'Тағы осынша қосыңыз',
    'cart.order': 'Тапсырыс',
    'cart.items': 'бұйым',

    'product.sku': 'Артикул',
    'product.size': 'Өлшем',
    'product.color': 'Түс',
    'product.pickSize': 'Өлшемді таңдаңыз',
    'product.pickColor': 'Түсті таңдаңыз',
    'product.desc': 'Сипаттама',
    'product.care': 'Күту',
    'product.deliver': 'Жеткізу және төлем',
    'product.careText': '30° бағдармасыз жуу, қатты сығумен сығмаңыз. Көлденең кептіріңіз. Үткіні ортасынан, мата астынан қолданыңыз.',
    'product.deliverText': 'Алматы және Астана — келесі күні. Қазақстанның басқа қалалары — 3-тен 10 жұмыс күніне дейін. Қазпошта немесе Avis курьері, Яндекс экспресі. Төлем картамен, QR+ немесе қолмақол.',
    'product.sizetable': 'Өлшем кестесі',
    'product.stock': 'қолда бар',
    'product.left': 'Қалды',
    'product.related': 'Ұқсас бұйымдар',
    'product.brandline': 'Streetwear made in Kazakhstan',
    'product.notFound': 'Бұйым табылмады',
    'product.cashback': 'Кэшбэк',

    'checkout.title': 'Тапсырыс беру',
    'checkout.step1': 'Жеткізу',
    'checkout.step2': 'Төлем',
    'checkout.step3': 'Дайын',
    'checkout.name': 'Аты-жөні',
    'checkout.phone': 'Телефон',
    'checkout.email': 'Email',
    'checkout.city': 'Қала',
    'checkout.addr': 'Мекенжай',
    'checkout.addrPh': 'Көше, үй, пәтер',
    'checkout.comment': 'Тапсырысқа түсіндірме',
    'checkout.commentPh': 'Мысалы: бір сағат бұрын қоңырау шалу',
    'checkout.method': 'Төлем тәсілі',
    'checkout.card': 'Онлайн картамен',
    'checkout.cash': 'Қолма-қол алу кезінде',
    'checkout.kaspi': 'QR+ / Kaspi.kz',
    'checkout.next': 'Ары',
    'checkout.prev': 'Артқа',
    'checkout.confirm': 'Тапсырысты растау',
    'checkout.success': 'Рақмет, тапсырыс қабылданды!',
    'checkout.successText': '15 минут ішінде қоңырау шалып, деректерді растаймыз.',
    'checkout.orderNum': 'Тапсырыс нөмірі',
    'checkout.nextText': 'Кейін не?',
    'checkout.n1': 'Телефонмен тапсырысты растаймыз',
    'checkout.n2': 'Жинап, әр бұйымды тексереміз',
    'checkout.n3': 'Келесі күні жібереміз',
    'checkout.summary': 'Тапсырысыңыз',
    'checkout.req': 'Бұл өріс міндетті',
    'checkout.phoneReq': 'Телефонды толық енгізіңіз',
    'checkout.emailReq': 'Emailды тексеріңіз',
    'checkout.agree': 'Деректерді өңдеу шарттарымен келесемін',

    'contact.title': 'Бізбен байласысу',
    'contact.sub': 'Дүкен, өзімен алып кету және жеткізу',
    'contact.addr': 'Мекенжай',
    'contact.phone': 'Телефон',
    'contact.email': 'Пошта',
    'contact.hours': 'Жұмыс уақыты',
    'contact.form': 'Жазу',
    'contact.msg': 'Хабарлама',
    'contact.send': 'Жіберу',
    'contact.sent': 'Хабарлама жіберілді. Жұмыс күні ішінде жауап береміз.',
    'contact.faq': 'Жиі қойылатын сұрақтар',
    'faq.q1': 'Қалай тапсырыс беремін?',
    'faq.a1': 'Бұйымды, өлшем мен түсті таңдап, себетке салып, тапсырыс рәсімдейсіз. Төлем онлайн картамен, QR+ арқылы немесе қолма-қол.',
    'faq.q2': 'Өлшем сәйкес келмесе не істеймін?',
    'faq.a2': '14 күндік ауыстыру. Киім тағылмаған, белгісі бар болуы керек. Ауыстырудағы жеткізуді сатып алушы төлейді.',
    'faq.q3': 'Тапсырыс қаншалықты тез келеді?',
    'faq.a3': 'Алматы және Астана — төлемнен кейін келесі күні. Басқа қалалар — 3-тен 10 жұмыс күніне дейін, Қазпошта немесе Avis арқылы.',
    'faq.q4': 'Кэшбэк бар ма?',
    'faq.a4': 'Иә, QR+ арқылы төлегенде 5% кэшбэк. Банк қосымшасында бір түндің ішінде келеді.',

    'common.loading': 'Жүктелуде...',
    'common.close': 'Жабу',
    'common.currency': 'Теңге',
    'err.notFoundPage': 'Бет табылмады',
    'err.notFoundText': 'Мұндай бет жоқ сияқты. Каталогқа оралаймыз ба?',
    'toast.cart': 'Себетке қосылды',
    'toast.wish': 'Таңдаулыға қосылды',
    'toast.unwish': 'Таңдаулыдан алынды',
    'toast.size': 'Алдымен өлшем таңдаңыз',
    'toast.removed': 'Бұйым жойылды',
    'toast.copied': 'Сілтеме көшірілді'
  }
};

/* ---------- СПРАВОЧНИКИ ---------- */
const CATEGORIES = [
  { id: 'hudi',        icon: 'hoodie', ru: 'Худи',            kz: 'Бүржейде' },
  { id: 'svitshot',    icon: 'shirt',  ru: 'Свитшоты',        kz: 'Кеңжейде' },
  { id: 'futbolka',    icon: 'shirt',  ru: 'Футболки',         kz: 'Футболка' },
  { id: 'rubashka',    icon: 'shirt',  ru: 'Рубашки',          kz: 'Жейделер' },
  { id: 'vverh',       icon: 'coat',   ru: 'Верх',             kz: 'Жоғарғы киім' },
  { id: 'niz',         icon: 'pants',  ru: 'Брюки',            kz: 'Шалбар' },
  { id: 'golovnoy',    icon: 'cap',    ru: 'Головные уборы',   kz: 'Бас киім' },
  { id: 'sumka',       icon: 'bag',    ru: 'Сумки',            kz: 'Сөмкелер' },
  { id: 'school',      icon: 'kids',   ru: 'Детям',            kz: 'Балаларға' },
  { id: 'aksessuary',  icon: 'acc',    ru: 'Аксессуары',      kz: 'Аксессуарлар' },
  { id: 'giftbox',     icon: 'gift',   ru: 'Гифтбоксы',       kz: 'Гифтбокстар' }
];

const TYPES = [
  { id: 'hoodie',     ru: 'Худи и толстовки', kz: 'Бүржейде мен тостаушалар', icon: 'hoodie' },
  { id: 'sweatshirt', ru: 'Свитшоты',          kz: 'Кеңжейде',                 icon: 'shirt' },
  { id: 'tshirt',     ru: 'Футболки',          kz: 'Футболкалар',              icon: 'shirt' },
  { id: 'shirt',      ru: 'Рубашки',           kz: 'Жейделер',                 icon: 'shirt' },
  { id: 'outer',      ru: 'Куртки и бомберы',  kz: 'Курткалар мен бомберлер',  icon: 'coat' },
  { id: 'knit',       ru: 'Свитеры',           kz: 'Көйлектер',                icon: 'knit' },
  { id: 'pants',      ru: 'Брюки',             kz: 'Шалбарлар',                icon: 'pants' },
  { id: 'vest',       ru: 'Жилетки',           kz: 'Жилеттер',                 icon: 'vest' },
  { id: 'cap',        ru: 'Кепки',             kz: 'Кепкалар',                 icon: 'cap' },
  { id: 'bag',        ru: 'Сумки',             kz: 'Сөмкелер',                 icon: 'bag' },
  { id: 'gift',       ru: 'Подарочные наборы', kz: 'Сыйлық жинақтар',          icon: 'gift' },
  { id: 'acc',        ru: 'Аксессуары',        kz: 'Аксессуарлар',             icon: 'acc' }
];

const COLORS = [
  { id: 'black',       hex: '#1b1b1d', ru: 'Чёрный',            kz: 'Қара' },
  { id: 'white',       hex: '#f0ece4', ru: 'Белый',             kz: 'Ақ' },
  { id: 'bordeaux',    hex: '#7c2b3c', ru: 'Бордовый',          kz: 'Қою' },
  { id: 'navy',        hex: '#1e3a5f', ru: 'Тёмно-синий',       kz: 'Қою көк' },
  { id: 'blueClassic', hex: '#3d6ea3', ru: 'Классический синий',kz: 'Классикалық көк' },
  { id: 'sky',         hex: '#a9c9e2', ru: 'Небесно-голубой',   kz: 'Көгілдір' },
  { id: 'green',       hex: '#2c4638', ru: 'Тёмно-зелёный',    kz: 'Қою жасыл' },
  { id: 'yellow',      hex: '#e5b52a', ru: 'Жёлтый',            kz: 'Сары' },
  { id: 'greyMeln',    hex: '#a6a29c', ru: 'Серый меланж',     kz: 'Сұр меланж' },
  { id: 'darkGrey',    hex: '#53565a', ru: 'Тёмно-серый',      kz: 'Қою сұр' },
  { id: 'lightGrey',   hex: '#b7b4ae', ru: 'Светло-серый',     kz: 'Ашық сұр' },
  { id: 'brown',       hex: '#6b4a34', ru: 'Коричневый',        kz: 'Қоңыр' },
  { id: 'anthracite',  hex: '#33363a', ru: 'Антрацит',         kz: 'Антрацит' },
  { id: 'kaki',        hex: '#6f6c4b', ru: 'Хаки',              kz: 'Хаки' },
  { id: 'orange',      hex: '#cf6a2a', ru: 'Оранжевый',         kz: 'Қызғылт сары' }
];

const FABRICS = [
  { id: 'cotton',   ru: 'Хлопок',     kz: 'Мақта',      comp: { ru: '100% хлопок',        kz: '100% мақта' } },
  { id: 'futer',    ru: 'Футер',      kz: 'Футер',      comp: { ru: '80% хлопок, 20% полиэстер', kz: '80% мақта, 20% полиэстер' } },
  { id: 'fleece',   ru: 'Флис',       kz: 'Флис',       comp: { ru: '70% хлопок, 30% полиэстер', kz: '70% мақта, 30% полиэстер' } },
  { id: 'knit',     ru: 'Трикотаж',   kz: 'Трикотаж',   comp: { ru: '60% хлопок, 40% полиэстер', kz: '60% мақта, 40% полиэстер' } },
  { id: 'denim',    ru: 'Деним',      kz: 'Деним',      comp: { ru: '100% хлопок',        kz: '100% мақта' } },
  { id: 'velvet',   ru: 'Вельвет',    kz: 'Велвет',     comp: { ru: '100% полиэстер',     kz: '100% полиэстер' } },
  { id: 'poly',     ru: 'Полиэстер',  kz: 'Полиэстер',  comp: { ru: '100% полиэстер',     kz: '100% полиэстер' } },
  { id: 'nylon',    ru: 'Нейлон',     kz: 'Нейлон',     comp: { ru: '100% нейлон',        kz: '100% нейлон' } },
  { id: 'terry',    ru: 'Терри',      kz: 'Терри',      comp: { ru: '80% хлопок, 20% полиэстер', kz: '80% мақта, 20% полиэстер' } },
  { id: 'leather',  ru: 'Экокожа',    kz: 'Экожірі',    comp: { ru: 'экокожа',            kz: 'экожірі' } },
  { id: 'ceramic',  ru: 'Керамика',   kz: 'Керамика',   comp: { ru: 'керамика',            kz: 'керамика' } }
];

const SIZES_APPAREL = ['S', 'M', 'L', 'XL'];
const SIZES_SHOE    = ['36', '37', '38', '39', '40', '41', '42', '43'];
const SIZES_KIDS    = ['128', '134', '146', '158'];
const SIZES_ONE     = ['ONE'];

const SZ = { ad: SIZES_APPAREL, kids: SIZES_KIDS, one: SIZES_ONE };

const SIZE_TABLE = {
  S:  { ru: '58 / 65 / 62',  kz: '58 / 65 / 62' },
  M:  { ru: '62 / 68 / 65',  kz: '62 / 68 / 65' },
  L:  { ru: '66 / 71 / 68',  kz: '66 / 71 / 68' },
  XL: { ru: '70 / 74 / 71',  kz: '70 / 74 / 71' },
  '128': { ru: '52 / 59', kz: '52 / 59' },
  '134': { ru: '54 / 62', kz: '54 / 62' },
  '146': { ru: '56 / 65', kz: '56 / 65' },
  '158': { ru: '58 / 68', kz: '58 / 68' },
  'ONE': { ru: 'Один размер', kz: 'Бір өлшем' }
};

/* ---------- ОПИСАНИЯ ПО ТИПАМ ---------- */
const DESC = {
  hoodie: {
    ru: 'Свободный крой оверсайз со спущенным плечом, капюшон со шнурками и карманы на молнии. Плотная ткань держит форму и не садится после стирок.',
    kz: 'Түсірілген иықты еркін оверсайз кесуі, тартыпты капюшон және zip жәндікті қалталар. Тығыз мата пішімін ұстайды, жуылғаннан кейін тартылмайды.',
    word: { ru: 'Худи', kz: 'Бүржейде' }
  },
  sweatshirt: {
    ru: 'Классический свитшот прямого кроя. Широкая резинка на низу и манжетах держит форму, внутри мягкий футер.',
    kz: 'Тік кесулі классикалық кеңжейде. Асты мен жең басындағы кең резинке пішімді ұстайды, ішінде жұмсақ футер.',
    word: { ru: 'Свитшот', kz: 'Кеңжейде' }
  },
  tshirt: {
    ru: 'Базовая футболка прямого кроя. Плотное плечо, аккуратные швы, принт не трескается после носки и стирок.',
    kz: 'Тік кесулі негізгі футболка. Тығыз иық, ұқыпты тігіс, принт тауып жүргеннен кейін жарылмайды.',
    word: { ru: 'Футболка', kz: 'Футболка' }
  },
  shirt: {
    ru: 'Рубашка оверсайз с заниженным плечом. Мягкая ворсовая ткань, широкие манжеты, вместительный крой — работает и как верх, и как овержакет.',
    kz: 'Түсірілген иықты оверсайз жейде. Жұмсақ түкті мата, кең манжет, кең кесу — үстен киім ретінде де, овержакет ретінде де жарайды.',
    word: { ru: 'Рубашка', kz: 'Жейде' }
  },
  outer: {
    ru: 'Верхняя одежда с водоотталкивающей пропиткой. Крой оверсайз, регулируемые манжеты и капюшон, внутри — мягкая подкладка.',
    kz: 'Су өткізбейтін өңдеумен жасалған сырт киім. Оверсайз кесу, реттелетін манжет пен капюшон, ішінде жұмсақ төсем.',
    word: { ru: 'Куртка', kz: 'Куртка' }
  },
  knit: {
    ru: 'Вязаный свитер с объёмной вязкой. Тёплый и мягкий, с широкой резинкой и высоким воротом.',
    kz: 'Көлемді тоқымамен көйлек. Жылы және жұмсақ, кең резинке мен биік жауымен.',
    word: { ru: 'Свитер', kz: 'Көйлек' }
  },
  pants: {
    ru: 'Широкие брюки оверсайз с регулируемым поясом и манжетами. Глубокие карманы и мягкая подкладка — сидят комфортно весь день.',
    kz: 'Реттелетін белі мен манжеті бар кең оверсайз шалбар. Терең қалталар мен жұмсақ төсем — күні бойы ыңғайлы.',
    word: { ru: 'Брюки', kz: 'Шалбар' }
  },
  vest: {
    ru: 'Жилетка оверсайз с капюшоном и большими карманами. Мягкий флис внутри, отворот можно носить вверх или вниз.',
    kz: 'Капюшон мен үлкен қалталары бар оверсайз жилет. Ішінде жұмсақ флис, жағасын жоғары да, төмен де киюге болады.',
    word: { ru: 'Жилетка', kz: 'Жилет' }
  },
  cap: {
    ru: 'Кепка с изогнутой козырьком и регулировкой по затылку. Плотный хлопковый твил, вышитый логотип.',
    kz: 'Иілген қалпақпен және артқы жағынан реттелетін кепка. Тығыз мақта твилі, терілген логотип.',
    word: { ru: 'Кепка', kz: 'Кепка' }
  },
  bag: {
    ru: 'Сумка с широкой лентой и металлической фурнитурой. Помещает ноутбук, большой объём для повседневных вещей.',
    kz: 'Кең лента мен металл фурнитурасы бар сөмке. Ноутбуқ сыйды, күнделікті заттарға орын көп.',
    word: { ru: 'Сумка', kz: 'Сөмке' }
  },
  gift: {
    ru: 'Подарочная упаковка с вещами бренда. Состав подбирается по вашему выбору или тематике.',
    kz: 'Бренд заттары бар сыйлық орама. Құрамы сіздің таңдауыңызға немесе тақырыпқа байланысты жиналады.',
    word: { ru: 'Гифтбокс', kz: 'Гифтбокс' }
  },
  acc: {
    ru: 'Аксессуар в фирменной упаковке. Подходит как подарок и дополнение к образу.',
    kz: 'Фирмалық орамадағы аксессуар. Сыйлық ретінде де, образға қосымша ретінде де жарайды.',
    word: { ru: 'Аксессуар', kz: 'Аксессуар' }
  }
};

/* ---------- ТОВАРЫ (данные с qazaqrepublic.com) ---------- */
const IMG = 'https://qazaqrepublic.com/uploads/products/';
const IMG_GB = 'https://qazaqrepublic.com/uploads/giftboxes/';

const RAW = [
  /* --- ФУТБОЛКИ --- */
  ['futbolka','tshirt',12990,0,'new',SZ.ad,['yellow'],'cotton','shirt','футболка kunder жёлтая','футболка kunder сары','a1f3e28c-1696-4584-914b-260410daf00c.png'],
  ['futbolka','tshirt',12990,0,'new',SZ.ad,['greyMeln'],'cotton','shirt','футболка kunder серый меланж','футболка kunder сұр меланж','25286ec6-af02-4c7a-b39d-f8da2918b3ff.png'],
  ['futbolka','tshirt',13990,0,'new',SZ.ad,['white'],'cotton','shirt','футболка sandwich белая','футболка sandwich ақ','faae5d68-ebac-484a-b50c-57fcdb5288eb.png'],
  ['futbolka','tshirt',11990,0,'new',SZ.ad,['darkGrey'],'cotton','shirt','футболка buginemes темно-серая','футболка buginemes қою сұр','53826f5d-4df3-4656-bb44-0cc936e4c3ec.png'],
  ['futbolka','tshirt',11990,0,'new',SZ.ad,['greyMeln'],'cotton','shirt','футболка buginemes серый меланж','футболка buginemes сұр меланж','2576a78b-d3a5-468e-a227-399334e5bfae.png'],
  ['futbolka','tshirt',9990,0,'new',SZ.ad,['green'],'cotton','shirt','футболка basic qrd темно-зелёная','футболка basic qrd қою жасыл','dda92640-9d3c-4df6-a017-b163a436026a.png'],
  ['futbolka','tshirt',12790,15990,'sale',SZ.ad,['kaki'],'cotton','shirt','ls футболка striped хаки','ls футболка striped хаки','6d5fee81-9087-495f-9cbc-7996f2cb8297.png'],

  /* --- РУБАШКИ --- */
  ['rubashka','shirt',18990,0,'new',SZ.ad,['sky'],'cotton','shirt','рубашка qrc basic небесно-голубая','жейде qrc basic көгілдір','c0026edb-0ffa-4f11-bd61-5d6ffd24db51.png'],
  ['rubashka','shirt',18990,0,'new',SZ.ad,['darkGrey'],'cotton','shirt','рубашка ls qrc basic темно-серая','жейде ls qrc basic қою сұр',['f7af43ee-a37f-425d-8068-815d400de195.png','f24bc93b-e803-4227-98e0-103ccef54370.jpg','3789e622-964d-4af8-9ed7-29e8737da9a2.jpg','cd34662e-313e-45af-a7dc-9e2d14731857.jpg']],
  ['rubashka','shirt',18990,0,'new',SZ.ad,['blueClassic'],'cotton','shirt','рубашка ls qrc basic классический синий','жейде ls qrc basic классикалық көк','d2d7f8f9-4a8f-4ec6-a459-ead11cde803f.png'],
  ['rubashka','shirt',19990,0,'new',SZ.ad,['navy'],'cotton','shirt','рубашка street тёмно-синяя','жейде street қою көк','0fd370e5-d89c-4539-a074-2f67bf82fb58.png'],
  ['rubashka','shirt',19990,0,'new',SZ.ad,['green'],'cotton','shirt','рубашка street зелёная','жейде street жасыл','c5dd5c51-d2ef-4822-9bf9-a5f4795b0fa0.png'],
  ['rubashka','shirt',22990,0,'new',SZ.ad,['navy'],'cotton','shirt','рубашка street collective тёмно-синяя','жейде street collective қою көк','06a09faa-3705-418f-bd0f-006fdcd13a6d.png'],
  ['rubashka','shirt',22990,0,'new',SZ.ad,['brown'],'cotton','shirt','рубашка street collective коричневая','жейде street collective қоңыр','0764006f-91db-40dd-84fd-c290292c4f6e.png'],

  /* --- СВИТШОТЫ --- */
  ['svitshot','sweatshirt',22990,0,'new',SZ.ad,['navy'],'futer','shirt','свитшот polo basic темно-синий','кеңжейде polo basic қою көк','ac3745b8-5b4b-4b52-9af6-8fbd0a12876b.png'],
  ['svitshot','sweatshirt',22990,0,'new',SZ.ad,['greyMeln'],'futer','shirt','свитшот polo basic серый меланж','кеңжейде polo basic сұр меланж','3e326a41-35df-41b0-acbf-ad586996f6c5.png'],
  ['svitshot','sweatshirt',22990,0,'new',SZ.ad,['bordeaux'],'futer','shirt','свитшот polo basic бордовый','кеңжейде polo basic қою',['4da78aa3-a508-42c3-b223-3812547d6e7a.jpg','030c8138-00e6-4518-8585-04f06b64e34e.png','6492101d-5892-4bb6-8ce7-5c2a2fe20651.jpg','cee409e3-925d-41fe-90db-922191ea06a8.jpg']],
  ['svitshot','sweatshirt',19990,0,'new',SZ.ad,['green'],'futer','shirt','свитшот basic qrd темно-зелёная','кеңжейде basic qrd қою жасыл','384ced8a-0249-493b-8204-f5769f7a04a3.png'],
  ['svitshot','sweatshirt',22990,0,'new',SZ.ad,['greyMeln'],'futer','shirt','свитшот kunder серый меланж','кеңжейде kunder сұр меланж','be596552-6655-413f-9fc7-d94403a1d10c.png'],
  ['svitshot','sweatshirt',22990,0,'new',SZ.ad,['yellow'],'futer','shirt','свитшот kunder жёлтый','кеңжейде kunder сары','10727821-3ad0-404a-bd54-b9f5256c1865.png'],
  ['svitshot','sweatshirt',23990,0,'new',SZ.ad,['black'],'futer','shirt','свитшот polo senbiclub чёрный','кеңжейде polo senbiclub қара','77d624ce-9683-4a19-b538-eba589d37ea3.png'],
  ['svitshot','sweatshirt',23990,0,'new',SZ.ad,['greyMeln'],'futer','shirt','свитшот polo senbiclub серый меланж','кеңжейде polo senbiclub сұр меланж','b2e5a0cb-1d22-43bf-b289-d73a7ea3512a.png'],
  ['svitshot','sweatshirt',20990,0,'new',SZ.ad,['blueClassic'],'futer','shirt','свитшот qrl classic blue','кеңжейде qrl classic blue','01d5c30c-e201-4f2a-acb7-4f25e8dd5199.png'],
  ['svitshot','sweatshirt',20990,0,'new',SZ.ad,['bordeaux'],'futer','shirt','свитшот qrl бордовый','кеңжейде qrl қою','3e266aad-6355-412d-8332-f5452fab3109.png'],
  ['svitshot','sweatshirt',22990,0,'new',SZ.ad,['greyMeln'],'futer','shirt','свитшот bq серый меланж','кеңжейде bq сұр меланж','ba4a2f83-5d59-4380-8fc8-3101f2ad92c3.png'],
  ['svitshot','sweatshirt',25990,0,'new',SZ.ad,['anthracite'],'futer','shirt','свитшот over qrm антрацит','кеңжейде over qrm антрацит','3c7ebe1d-bbb0-43ac-8425-1b4b7c54de5b.png'],
  ['svitshot','sweatshirt',25990,0,'new',SZ.ad,['navy'],'futer','shirt','свитшот over qrm синий','кеңжейде over qrm көк','7ef89215-801a-44f8-b026-510d55bbb724.png'],
  ['svitshot','sweatshirt',26990,0,'new',SZ.ad,['blueClassic'],'futer','shirt','свитшот over qrc синий','кеңжейде over qrc көк','3036a393-ea01-4c4f-95d0-69d689b9ec8c.png'],
  ['svitshot','sweatshirt',26990,0,'new',SZ.ad,['yellow'],'futer','shirt','свитшот over qrc жёлтый','кеңжейде over qrc сары','bd74b857-e8d9-4ca9-9c9b-a35a9b9f2381.png'],
  ['svitshot','sweatshirt',26990,0,'new',SZ.ad,['darkGrey'],'futer','shirt','свитшот over qrc темно-серая','кеңжейде over qrc қою сұр','106985bf-62a7-4bb7-8a7b-801cdf59c781.png'],
  ['svitshot','sweatshirt',26990,0,'new',SZ.ad,['anthracite'],'futer','shirt','свитшот over sandwich антрацит','кеңжейде over sandwich антрацит','8964c2a4-2462-4273-a012-8bb8c26793ed.png'],
  ['svitshot','sweatshirt',26990,0,'new',SZ.ad,['white'],'futer','shirt','свитшот over sandwich белый','кеңжейде over sandwich ақ','9e0ca566-54ba-495e-8c3c-d342e7bca58c.png'],

  /* --- ХУДИ --- */
  ['hudi','hoodie',24990,0,'new',SZ.ad,['bordeaux'],'futer','hoodie','худи QAZAQ REPUBLIC бордовая','бүржейде QAZAQ REPUBLIC қою',['06b394a6-c490-4474-9fe6-1391f6a3f44a.jpg','ca006dfa-6d24-476f-9092-55ce0766b824.png','d476075d-e362-4965-99df-2963df97156e.jpg','a3c6a4b0-e67a-4cec-a82b-bff2305a722d.jpg']],
  ['hudi','hoodie',24990,0,'new',SZ.ad,['blueClassic'],'futer','hoodie','худи QAZAQ REPUBLIC classic blue','бүржейде QAZAQ REPUBLIC classic blue','cdc6c614-42ff-4d8e-a3ee-612037870ec9.png'],
  ['hudi','hoodie',26990,0,'new',SZ.ad,['darkGrey'],'futer','hoodie','худи bq тёмно-серая','бүржейде bq қою сұр','1ec7ee63-bc80-48f2-bc3f-11d64af957a3.png'],
  ['hudi','hoodie',25990,0,'new',SZ.ad,['navy'],'futer','hoodie','худи wrq тёмно-синяя','бүржейде wrq қою көк','2e4a0e74-b59a-48ac-b50a-5d66642501e5.png'],
  ['hudi','hoodie',25990,0,'new',SZ.ad,['yellow'],'futer','hoodie','худи wrq жёлтая','бүржейде wrq сары','1e88578f-ee91-44c9-8dbb-d3aedd81aa8e.png'],
  ['hudi','hoodie',25990,0,'new',SZ.ad,['greyMeln'],'futer','hoodie','худи ayu серый меланж','бүржейде ayu сұр меланж','7067ae3f-90e3-4774-9fcf-12a42a29df61.png'],
  ['hudi','hoodie',25990,0,'new',SZ.ad,['brown'],'futer','hoodie','худи ayu коричневая','бүржейде ayu қоңыр','0f42dc10-8936-47b6-b454-d0d79516b321.png'],
  ['hudi','hoodie',25990,0,'new',SZ.ad,['greyMeln'],'futer','hoodie','худи kop soz серый меланж','бүржейде kop soz сұр меланж','e3a5c1f2-d293-4c0b-adad-d5aff505e121.png'],
  ['hudi','hoodie',25990,0,'new',SZ.ad,['black'],'futer','hoodie','худи kop soz чёрная','бүржейде kop soz қара','34200df9-e754-47d9-a2a7-ac464aa4c2d4.png'],
  ['hudi','hoodie',26990,0,'new',SZ.ad,['black'],'futer','hoodie','худи collective чёрная','бүржейде collective қара','82c3a030-9013-45ce-ba58-fb8c2d79d6a1.png'],
  ['hudi','hoodie',26990,0,'new',SZ.ad,['blueClassic'],'futer','hoodie','худи collective синий','бүржейде collective көк','5dee952b-3b7f-4c7c-af52-fc2c476e21d4.png'],
  ['hudi','hoodie',24990,0,'new',SZ.ad,['brown'],'futer','hoodie','худи bear коричневая','бүржейде bear қоңыр','d47af97c-9eee-43ec-9821-1245afcd2206.png'],
  ['hudi','hoodie',26990,0,'new',SZ.ad,['greyMeln'],'futer','hoodie','худи kunder серый меланж','бүржейде kunder сұр меланж','4ac940d7-be47-4159-95bf-122f061f2d99.png'],
  ['hudi','hoodie',22990,0,'new',SZ.ad,['green'],'futer','hoodie','худи basic qrd темно зелёная','бүржейде basic qrd қою жасыл','04e25ecc-f043-44c0-9062-c26ef637812e.png'],
  ['hudi','hoodie',22990,0,'new',SZ.ad,['yellow'],'futer','hoodie','худи basic qrd жёлтая','бүржейде basic qrd сары','bb93599a-6476-4fae-ae2d-ec910e71df74.png'],
  ['hudi','hoodie',26990,0,'new',SZ.ad,['brown'],'futer','hoodie','худи overfit qrc коричневая','бүржейде overfit qrc қоңыр','50591cef-1c71-4c3a-8bf9-4c9c3cfd5abb.png'],
  ['hudi','hoodie',26990,0,'new',SZ.ad,['bordeaux'],'futer','hoodie','худи overfit qrc бордовая','бүржейде overfit qrc қою','b9cf340e-543f-402c-8fc3-f49fe0d2caae.png'],
  ['hudi','hoodie',27990,0,'new',SZ.ad,['yellow'],'futer','hoodie','худи over senbiclub жёлтая','бүржейде over senbiclub сары','e70d5d45-e55a-4f8a-9113-1151818b3ddc.png'],
  ['hudi','hoodie',27990,0,'new',SZ.ad,['blueClassic'],'futer','hoodie','худи over senbiclub classic blue','бүржейде over senbiclub classic blue','3c81a86f-f3d8-42e7-8559-4a5573ec185e.png'],
  ['hudi','hoodie',27990,0,'new',SZ.ad,['anthracite'],'futer','hoodie','худи over senbiclub антрацит','бүржейде over senbiclub антрацит','58ce563a-5225-4e72-98df-a3cd2bf600a3.png'],
  ['hudi','hoodie',28990,0,'new',SZ.ad,['sky'],'futer','hoodie','худи over qrc небесно-голубая','бүржейде over qrc көгілдір','8104989b-bdd8-4764-8ba6-0ecbc8de0e2f.png'],
  ['hudi','hoodie',28990,0,'new',SZ.ad,['darkGrey'],'futer','hoodie','худи over qrc темно-серая','бүржейде over qrc қою сұр','4b289b06-4bc5-478d-a212-bf9b736b3f6c.jpg'],
  ['hudi','hoodie',28990,0,'new',SZ.ad,['green'],'futer','hoodie','худи over qrc темно-зелёная','бүржейде over qrc қою жасыл',['c64e8b01-352a-4283-b72a-fed3ed2116a1.png','8405630d-5d63-47c2-b364-1e969f193273.jpg','f2ce8409-1e92-4236-b046-f50e1f2fd246.jpg']],
  ['hudi','hoodie',28990,0,'new',SZ.ad,['navy'],'futer','hoodie','худи over qrc темно-синяя','бүржейде over qrc қою көк','3af94d68-6366-4612-86d9-b970e0e66153.png'],
  ['hudi','hoodie',27990,0,'new',SZ.ad,['darkGrey'],'futer','hoodie','худи over buginemes темно-серая','бүржейде over buginemes қою сұр','81896a4c-27f5-4202-9014-873a45f18440.png'],
  ['hudi','hoodie',27990,0,'new',SZ.ad,['greyMeln'],'futer','hoodie','худи over buginemes серый меланж','бүржейде over buginemes сұр меланж','a077db9a-8dc3-4695-94f6-80f4d00b3cec.png'],
  ['hudi','hoodie',26990,0,'new',SZ.ad,['navy'],'futer','hoodie','зиппер худи basic синий','зиппер бүржейде basic көк','eda7b3b5-4f3f-433d-a1d7-856ca813d674.jpg'],
  ['hudi','hoodie',28990,0,'new',SZ.ad,['anthracite'],'futer','hoodie','зиппер худи over qrc антрацит','зиппер бүржейде over qrc антрацит','e487e8e6-8a6f-44c5-889b-f12cbd27aea9.png'],

  /* --- ВЕРХ --- */
  ['vverh','outer',27990,0,'new',SZ.ad,['black'],'poly','coat','куртка track qrd чёрная','куртка track qrd қара','f36bbb72-263d-460a-94fb-a789736c0364.png'],
  ['vverh','outer',27990,0,'new',SZ.ad,['bordeaux'],'poly','coat','куртка track qrd бордовая','куртка track qrd қою','1fa9649d-a6f3-4e98-a808-04871533cc19.png'],
  ['vverh','outer',27990,0,'new',SZ.ad,['green'],'poly','coat','куртка track qrd темно-зелёная','куртка track qrd қою жасыл','32645b9d-f5d7-4363-b733-0a932b011397.png'],
  ['vverh','outer',29990,0,'new',SZ.ad,['blueClassic'],'denim','coat','куртка 90’s qrc синяя','куртка 90’s qrc көк','5b538230-9a1b-4437-a87e-f1bf4b2a5246.png'],
  ['vverh','outer',29990,0,'new',SZ.ad,['lightGrey'],'denim','coat','куртка 90’s qrc серая','куртка 90’s qrc сұр','566366c8-b0a4-45fb-bd1b-429533d78378.png'],
  ['vverh','outer',27990,34990,'sale',SZ.ad,['navy'],'poly','coat','бомбер overfit qr темно-синий','бомбер overfit qr қою көк','825ab645-25e3-45ea-8af0-d53dee9bde24.png'],
  ['vverh','outer',27990,34990,'sale',SZ.ad,['darkGrey'],'poly','coat','бомбер overfit qr темно-серый','бомбер overfit qr қою сұр','bc51e04f-2553-4c9f-ac91-86da87450be8.png'],
  ['vverh','knit',21990,0,'new',SZ.ad,['blueClassic'],'knit','knit','свитер waffle wrq classic blue','көйлек waffle wrq classic blue','6271b278-5c6f-41c9-8ab6-f6bfd56fdfe5.png'],
  ['vverh','knit',21990,0,'new',SZ.ad,['lightGrey'],'knit','knit','свитер waffle wrq светло-серый','көйлек waffle wrq ашық сұр','87e66705-b381-4ee1-b2d1-3cc938e3ecb2.png'],
  ['vverh','knit',19990,0,'new',SZ.ad,['navy'],'knit','knit','свитер waffle qrd тёмно-синий','көйлек waffle qrd қою көк',['7e3bda83-3ff5-4804-8565-0604c0403a22.jpg','56c64107-c7c2-4647-8666-0e125a00621d.png','78819d92-d709-4fc1-9bc1-86b09ecdeb2b.jpg','2f1bf0d0-dbb7-4251-804e-56c2111b8f30.jpg','afe66f57-c623-491a-bd09-53b2c7ba84c2.jpg']],
  ['vverh','knit',19990,0,'new',SZ.ad,['greyMeln'],'knit','knit','свитер waffle qrd серый меланж','көйлек waffle qrd сұр меланж',['8b2cc72c-796d-418f-90fc-af909f4657d1.png','c5ec9380-3fda-418d-8666-b02dbdff3528.jpg','49edcd9c-bae1-4330-95a8-dd01084bb5dc.jpg']],
  ['vverh','knit',19990,0,'new',SZ.ad,['bordeaux'],'knit','knit','свитер waffle qrd бордовый','көйлек waffle qrd қою','6098379f-df8e-45c7-85c3-2220a19ed002.png'],

  /* --- НИЗ --- */
  ['niz','pants',17590,21990,'sale',SZ.ad,['black'],'poly','pants','брюки track qrd чёрные','шалбар track qrd қара','8fb1aa0c-5971-4947-ac4e-96864b101487.png'],
  ['niz','pants',17590,21990,'sale',SZ.ad,['green'],'poly','pants','брюки track qrd темно-зелёные','шалбар track qrd қою жасыл','bbddba1d-cd3b-4ef6-9886-0979d608fffb.png'],
  ['niz','pants',17590,21990,'sale',SZ.ad,['bordeaux'],'poly','pants','брюки track qrd бордовые','шалбар track qrd қою','7958a65a-c2db-4f18-bd67-dea2939de87c.png'],
  ['niz','pants',23990,0,'new',SZ.ad,['greyMeln'],'cotton','pants','брюки jogger qrc серый меланж','шалбар jogger qrc сұр меланж',['3398b1a9-1b3a-45c5-96ef-8845c02c834e.png','f10d8bf3-582b-41e4-912e-93460bdac8d0.jpg','295fab01-33bf-400d-b223-7f8b19bc2ae9.jpg','9b77b843-aec6-4949-adf9-702c6d182518.jpg']],
  ['niz','pants',23990,0,'new',SZ.ad,['black'],'cotton','pants','брюки jogger qrc чёрные','шалбар jogger qrc қара','f5e601bd-e7ad-4c5f-a7e5-2514525b3bfd.jpg'],
  ['niz','pants',23990,0,'new',SZ.ad,['green'],'cotton','pants','брюки jogger qrc темно-зелёные','шалбар jogger qrc қою жасыл','70513902-fdd1-4393-a004-f884be8f0cf2.png'],
  ['niz','pants',23990,0,'new',SZ.ad,['navy'],'cotton','pants','брюки jogger qrc темно-синие','шалбар jogger qrc қою көк',['cfb5f623-6ae3-4479-bbc8-767a66373d97.png','ee33ab2d-8451-408e-b762-7186029d7a67.jpg','4d07869c-746f-45e6-8886-c49587d867dd.jpg','fed3d405-bbaf-4682-9250-64cad6790630.jpg']],
  ['niz','pants',25990,0,'new',SZ.ad,['greyMeln'],'fleece','pants','брюки sweat basic серый меланж','шалбар sweat basic сұр меланж','200c157b-bc02-45fe-b23e-4c41d357e9fb.png'],
  ['niz','pants',25990,0,'new',SZ.ad,['darkGrey'],'fleece','pants','брюки sweat basic тёмно-серые','шалбар sweat basic қою сұр','f19277dd-cbc8-4874-9f7c-3068db4c4079.png'],
  ['niz','pants',25990,0,'new',SZ.ad,['navy'],'fleece','pants','брюки sweat basic тёмно-синие','шалбар sweat basic қою көк','dd69bee0-d9cc-478e-ad6c-fa7b3ec2dcb1.png'],

  /* --- ГОЛОВНЫЕ УБОРЫ --- */
  ['golovnoy','cap',8990,0,'new',SZ.one,['blueClassic'],'cotton','cap','КЕПКА BASIC СИНЯЯ','КЕПКА BASIC КӨК','e2f9c7aa-1e32-446c-b8e8-d370dfe3bc90.png'],
  ['golovnoy','cap',11990,0,'new',SZ.one,['blueClassic'],'denim','cap','КЕПКА DENIM СИНЯЯ','КЕПКА DENIM КӨК','4f545ca8-6334-417d-926e-152c91a70b44.png'],

  /* --- СУМКИ --- */
  ['sumka','bag',16990,0,'new',SZ.one,['blueClassic'],'poly','bag','сумка crossbody классический синий','сөмке crossbody классикалық көк','b78a1207-754c-43b2-b868-32def7f79483.jpg'],
  ['sumka','bag',16990,0,'new',SZ.one,['bordeaux'],'poly','bag','сумка crossbody бордовая','сөмке crossbody қою','ba98268e-5f06-4a6c-88ac-bd43e092970c.jpg'],
  ['sumka','bag',8990,0,'new',SZ.one,['orange'],'velvet','bag','сумка velvet buginemes оранжевая','сөмке velvet buginemes қызғылт сары','30838ed5-a3b3-44b3-802e-0519c0f81831.jpg'],
  ['sumka','bag',8990,0,'new',SZ.one,['navy'],'velvet','bag','сумка velvet buginemes темно-синяя','сөмке velvet buginemes қою көк','2eceedc8-4a3c-4372-994c-fece58811953.jpg'],
  ['sumka','bag',10990,0,'new',SZ.one,['blueClassic'],'leather','bag','mini сумка qazaq republic синяя','mini сөмке qazaq republic көк','e444cf69-e5a0-4451-b405-28f69f063285.jpg'],
  ['sumka','bag',10990,0,'new',SZ.one,['darkGrey'],'leather','bag','mini сумка qazaq republic темно-серая','mini сөмке qazaq republic қою сұр','2e1a0cf5-792c-4bd9-9129-411d175c2dc7.jpg'],
  ['sumka','bag',14990,0,'new',SZ.one,['darkGrey'],'nylon','bag','сумка messenger темно-серая','сөмке messenger қою сұр','737cb40a-086b-412c-b244-fc143f0d5cf5.jpg'],
  ['sumka','bag',14990,0,'new',SZ.one,['black'],'nylon','bag','СУМКА MESSENGER ЧЁРНАЯ','СӨМКЕ MESSENGER ҚАРА','2699f7f3-3486-4ffc-8a7d-619e30f7abf4.jpg'],

  /* --- ДЕТИ / ШКОЛА --- */
  ['school','vest',13990,0,'new',SZ.kids,['navy'],'terry','vest','ДЕТСКАЯ ЖИЛЕТКА TERRY BEAR ТЕМНО-СИНЯЯ','ЖИЛЕТ БАЛА TERRY BEAR ҚОЮ КӨК','cbac37aa-a1be-485f-99ea-5c1727a2aa74.png'],
  ['school','shirt',13990,0,'new',SZ.kids,['white'],'cotton','shirt','ДЕТСКАЯ РУБАШКА LS BASIC БЕЛАЯ','ЖЕЙДЕ БАЛА LS BASIC АҚ','dbcb814e-9ab3-4762-aad5-e0b638722621.png'],
  ['school','knit',15990,0,'new',SZ.kids,['navy'],'knit','knit','ДЕТСКИЙ КАРДИГАН BEAR ТЕМНО-СИНИЙ','КАРДИГАН БАЛА BEAR ҚОЮ КӨК','ba2c6213-b952-4d98-abb1-2408275cb4ef.png'],
  ['school','pants',14990,0,'new',SZ.kids,['navy'],'cotton','pants','ДЕТСКИЕ БРЮКИ SCHOOL ТЕМНО-СИНЯЯ','ШАЛБАР БАЛА SCHOOL ҚОЮ КӨК','42eab600-9467-4396-bdac-33f33dba6a40.png'],
  ['school','vest',18990,0,'new',SZ.kids,['navy'],'terry','vest','ЖИЛЕТКА TERRY BEAR ТЕМНО-СИНЯЯ','ЖИЛЕТ TERRY BEAR ҚОЮ КӨК','f790dc31-c81a-4373-a37f-a6f575287f80.png'],
  ['school','tshirt',13990,0,'new',SZ.kids,['white'],'cotton','shirt','ФУТБОЛКА POLO QRC БЕЛАЯ','ФУТБОЛКА POLO QRC АҚ','62e5d36a-0eb9-462c-b4a5-1c6f142d5340.png'],
  ['school','tshirt',13990,0,'new',SZ.kids,['navy'],'cotton','shirt','ФУТБОЛКА POLO QRC ТЕМНО-СИНЯЯ','ФУТБОЛКА POLO QRC ҚОЮ КӨК','d75ef51e-94c3-4574-86fd-90dcaf56b3ea.png'],
  ['school','tshirt',10990,0,'new',SZ.kids,['white'],'cotton','shirt','ДЕТСКАЯ ФУТБОЛКА POLO QRC БЕЛАЯ','ФУТБОЛКА POLO БАЛА QRC АҚ','1478431d-1e62-4055-92d2-14c00289e43a.png'],

  /* --- АКСЕССУАРЫ --- */
  ['aksessuary','acc',4990,0,'new',SZ.one,['black'],'ceramic','mug','керамика кружка qrd чёрная','керамика кептас qrd қара','e96c75c0-5ee7-47e5-9a4e-09b9f5f4be0a.png'],

  /* --- ГИФТБОКСЫ --- */
  ['giftbox','gift',9500,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС S набор 1','ГИФТБОКС S жинағы 1','579e9e39-b2c9-4777-a650-06a6a01f0681.jpg',true],
  ['giftbox','gift',22990,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС S набор 2','ГИФТБОКС S жинағы 2','2169441f-d2f4-4c6d-988f-c93b501820e9.jpg',true],
  ['giftbox','gift',22990,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС S набор 3','ГИФТБОКС S жинағы 3','c8a0bab0-5c4c-40d8-b467-73c372f75848.jpg',true],
  ['giftbox','gift',12000,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС S набор 4','ГИФТБОКС S жинағы 4','d78fe6e0-d4e9-4de1-859d-58a3adf1552a.jpg',true],
  ['giftbox','gift',9500,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС S набор 5','ГИФТБОКС S жинағы 5','a5fc8c07-9519-447a-85c9-c48f37081999.jpg',true],
  ['giftbox','gift',26990,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС L набор 1','ГИФТБОКС L жинағы 1','9652e672-7d1d-4eed-8760-c116c98a7111.jpg',true],
  ['giftbox','gift',21990,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС L набор 2','ГИФТБОКС L жинағы 2','2e0b6604-c209-4b4f-b6cc-2278d421999e.jpg',true],
  ['giftbox','gift',23990,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС L набор 3','ГИФТБОКС L жинағы 3','0fbdc97c-209b-4d06-87bd-3d0750ebffe2.jpg',true],
  ['giftbox','gift',16000,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС S набор 6','ГИФТБОКС S жинағы 6','5d029310-b993-48bb-8643-b19a8791f5d0.jpg',true],
  ['giftbox','gift',16000,0,'new',SZ.one,['black'],'poly','gift','ГИФТБОКС S набор 7','ГИФТБОКС S жинағы 7','88542f2b-5e40-43ab-83f3-7a1164667240.jpg',true]
];

/* ---------- СБОРКА ---------- */
const TR = {
  а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',
  н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'sh',
  ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'
};

function slugify(s) {
  return s.toLowerCase().split('').map(function (ch) {
    if (TR[ch] !== undefined) return TR[ch];
    return /[a-z0-9]/.test(ch) ? ch : '-';
  }).join('').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
}

function buildDesc(type, fabric, colorId) {
  const d = DESC[type] || DESC.acc;
  const f = FABRICS.find(function (x) { return x.id === fabric; }) || FABRICS[0];
  const c = COLORS.find(function (x) { return x.id === colorId; }) || COLORS[0];
  return {
    ru: d.word.ru + '. ' + d.ru + ' ' + f.ru + ', ' + c.ru.toLowerCase() + '.',
    kz: d.word.kz + '. ' + d.kz + ' ' + f.kz + ', ' + c.kz.toLowerCase() + '.'
  };
}

const FABRIC_COMP = FABRICS.reduce(function (m, f) { m[f.id] = f.comp; return m; }, {});
const FABRIC_LABEL = FABRICS.reduce(function (m, f) { m[f.id] = f; return m; }, {});
const PRODUCTS_DUP = {};

const PRODUCTS = RAW.map(function (r, i) {
  const cat = r[0], type = r[1], price = r[2], oldPrice = r[3], badge = r[4];
  const sizes = r[5], colors = r[6], fabric = r[7], glyph = r[8];
  const ru = r[9], kz = r[10], file = r[11], from = !!r[12];

  let id = slugify(ru);
  let n = 2;
  while (PRODUCTS_DUP[id]) { id = slugify(ru) + '-' + (n++); }
  PRODUCTS_DUP[id] = 1;

  return {
    id: id,
    sku: 'QR-' + (1001 + i),
    cat: cat,
    type: type,
    price: price,
    oldPrice: oldPrice || 0,
    from: from,
    badge: badge,
    sizes: sizes,
    colors: colors,
    fabric: fabric,
    glyph: glyph,
    stock: 3 + ((i * 7) % 21),
    name: { ru: ru, kz: kz },
    desc: buildDesc(type, fabric, colors[0]),
    img: (Array.isArray(file) ? file : [file]).map(function (f) {
      return (cat === 'giftbox' ? IMG_GB : IMG) + f;
    })
  };
});

const REVIEWS = [
  {
    name: { ru: 'Айгерим Сатыпбекова', kz: 'Айгерім Сәтінбекова' },
    city: { ru: 'Алматы', kz: 'Алматы' },
    rating: 5,
    text: {
      ru: 'Брала худи QAZAQ REPUBLIC на зиму. Свободный крой, капюшон не падает, ткань плотная. Пришло на следующий день, размер M сел идеально.',
      kz: 'Қыс үшін QAZAQ REPUBLIC бүржейде алдым. Еркін кесу, капюшон құламайды, мата тығыз. Келесі күні келді, M өлшем дәл отырды.'
    }
  },
  {
    name: { ru: 'Даулет Нурланов', kz: 'Дәулет Нұрланов' },
    city: { ru: 'Астана', kz: 'Астана' },
    rating: 5,
    text: {
      ru: 'Свитшот over qrc — то, что искал. Плотный футер, резинка держит форму после стирок. Забрал самовывозом через два часа.',
      kz: 'over qrc кеңжейде — іздегенім. Тығыз футер, резинке жуылғаннан кейін де пішімін ұстайды. Екі сағаттан кейін өзімен алып кеттім.'
    }
  },
  {
    name: { ru: 'Мадина Кенжебаева', kz: 'Мадина Кенжебаева' },
    city: { ru: 'Шымкент', kz: 'Шымкент' },
    rating: 5,
    text: {
      ru: 'Взяла брюки jogger и сумку messenger. Всё пришло одной посылкой за четыре дня. Кэшбэк через QR+ пришёл на следующий день.',
      kz: 'jogger шалбар мен messenger сөмке алдым. Бәрі бір хатымен төрт күнде келді. QR+ арқылы кэшбэк келесі күні келді.'
    }
  },
  {
    name: { ru: 'Азамат Турсынов', kz: 'Азамат Тұрсынов' },
    city: { ru: 'Караганда', kz: 'Қарағанды' },
    rating: 4,
    text: {
      ru: 'Куртка track qrd отличная по посадке, но хотелось бы один размер меньше. Обмен оформили без проблем, сами переслали.',
      kz: 'track qrd курткасының тілігі жақсы, бірақ бір өлшем кіші болса екпекін. Ауыстыруды мәселесіз жасады, өздері жіберді.'
    }
  }
];
