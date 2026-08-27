/* ==========================================================================
   data.js — all content for the site, in one place.
   Every user-visible string is a { en, ru } pair.
   ========================================================================== */

export const PROFILE = {
  name: { en: 'Vitaliy Vostrikov', ru: 'Виталий Востриков' },
  handle: '@Hecatoncheir',
  role: {
    en: 'Full-stack developer',
    ru: 'Full-stack разработчик',
  },
  roleAlt: {
    en: '& designer',
    ru: '& дизайнер',
  },
  tagline: {
    en: 'I build products end to end — Flutter on the front, Go on the back, and I draw them myself.',
    ru: 'Делаю продукты целиком — Flutter на клиенте, Go на сервере, и сам их рисую.',
  },
  location: { en: 'Moscow, Russia', ru: 'Москва, Россия' },
  email: 'vostrikov.vitaliy.mikhailovich@gmail.com',
  links: {
    github: 'https://github.com/Hecatoncheir',
    behance: 'https://www.behance.net/Hecatoncheir',
    hh: 'https://hh.ru/resume/b3f6fa32ff07d426220039ed1f387946515558',
    codersrank: 'https://profile.codersrank.io/user/rasarts',
  },
};

export const STATS = [
  { value: '13+', label: { en: 'years shipping', ru: 'лет в разработке' } },
  { value: '136', label: { en: 'repos on GitHub', ru: 'репозиториев на GitHub' } },
  { value: '8.2K', label: { en: 'design views', ru: 'просмотров дизайна' } },
  { value: '~20%', label: { en: 'team gain delivered', ru: 'рост эффективности' } },
];

/* --------------------------------------------------------------------------
   About — the "what I do" split, straight from the profile card
   -------------------------------------------------------------------------- */

export const ABOUT = {
  body: {
    en: [
      'I have spent the last decade inside one telecom, turning the parts of it that ran on paper and phone calls into software people actually open every morning.',
      'That means the whole stack: a BPMN platform where the business edits its own processes, an SSO service the other apps authenticate against, a field app that let technicians close jobs from the roof instead of the office.',
      'Before writing code I studied design, and I never stopped — so the interface, the type and the colour are mine too, not someone else’s handoff.',
    ],
    ru: [
      'Последние десять лет я работаю внутри одного телекома и перевожу в софт те его части, которые жили на бумаге и телефонных звонках.',
      'Это весь стек: BPMN-платформа, где бизнес сам правит свои процессы, сервис аутентификации, через который логинятся остальные приложения, полевое приложение, позволившее техникам закрывать задачи с крыши, а не из офиса.',
      'До кода я учился дизайну и не бросил — поэтому интерфейс, шрифт и цвет тоже мои, а не переданные со стороны.',
    ],
  },
  columns: [
    {
      title: { en: 'Frontend', ru: 'Фронтенд' },
      lines: {
        en: ['I use **Flutter** for mobile & web.', 'Outstanding **Dart**. I use it every day.'],
        ru: ['**Flutter** для мобильных и веба.', 'Прекрасный **Dart**. Пишу на нём каждый день.'],
      },
    },
    {
      title: { en: 'Backend', ru: 'Бэкенд' },
      lines: {
        en: ['On server-side **Go language** helps me make perfect services in less time.'],
        ru: ['На сервере **Go** позволяет делать хорошие сервисы за меньшее время.'],
      },
    },
    {
      title: { en: 'Now learning', ru: 'Сейчас изучаю' },
      lines: {
        en: ['**Rust** in production — a Telegram bot already runs on it.', 'Curious about **WebAssembly** and everything cross-platform.'],
        ru: ['**Rust** в проде — на нём уже работает Telegram-бот.', 'Интересен **WebAssembly** и всё кроссплатформенное.'],
      },
    },
  ],
  toolsLabel: { en: 'I prefer some cool tools', ru: 'Любимые инструменты' },
  tools: ['Docker', 'Kubernetes', 'GraphQL', 'Dgraph', 'Knative', 'GitLab CI', 'Hasura', 'PostgreSQL', 'RabbitMQ', 'gRPC', 'Neovim'],
  brandsLabel: { en: 'Worked with brands', ru: 'Работал с брендами' },
  brands: ['Tic Tac', 'Beeline', 'WestCall', 'Ростелеком', 'Raffaello', 'Связной', 'Choco-Pai', 'Росатом', 'Nutella', 'Домик в деревне'],
};

/* --------------------------------------------------------------------------
   Stack
   -------------------------------------------------------------------------- */

export const STACK = [
  {
    group: { en: 'Languages', ru: 'Языки' },
    items: [
      { name: 'Dart', level: 5 },
      { name: 'Go', level: 5 },
      { name: 'Rust', level: 3 },
      { name: 'Lua', level: 3 },
      { name: 'JavaScript', level: 4 },
      { name: 'HTML / CSS / Sass', level: 5 },
    ],
  },
  {
    group: { en: 'Client', ru: 'Клиент' },
    items: [
      { name: 'Flutter', level: 5 },
      { name: 'Angular', level: 4 },
      { name: 'Polymer', level: 3 },
      { name: 'ReactiveX', level: 4 },
      { name: 'bpmn-js', level: 4 },
      { name: 'PWA', level: 4 },
    ],
  },
  {
    group: { en: 'Server & data', ru: 'Сервер и данные' },
    items: [
      { name: 'gRPC / Protobuf', level: 5 },
      { name: 'GraphQL / Hasura', level: 4 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'RabbitMQ / MQTT', level: 4 },
      { name: 'WebSocket', level: 5 },
      { name: 'Dgraph', level: 3 },
    ],
  },
  {
    group: { en: 'Platform', ru: 'Платформа' },
    items: [
      { name: 'Docker', level: 5 },
      { name: 'Kubernetes', level: 4 },
      { name: 'GitLab CI/CD', level: 5 },
      { name: 'Knative', level: 3 },
      { name: 'Active Directory / JWT', level: 4 },
      { name: 'Code generation', level: 5 },
    ],
  },
];

/* --------------------------------------------------------------------------
   Experience
   -------------------------------------------------------------------------- */

export const EXPERIENCE = [
  {
    company: { en: 'WestCall Ltd.', ru: 'ООО «ВЕСТ КОЛЛ ЛТД»' },
    field: {
      en: 'Internet provider · IT & systems integration',
      ru: 'Интернет-провайдер · ИТ и системная интеграция',
    },
    position: { en: 'Software developer', ru: 'Программист' },
    period: { en: 'Dec 2015 — present', ru: 'Декабрь 2015 — наст. время' },
    duration: { en: '10 yrs 9 mos', ru: '10 лет 9 мес' },
    current: true,
    summary: {
      en: 'Ten years of building the internal platform a regional ISP runs on — process engine, identity, and the field apps that touch it.',
      ru: 'Десять лет строю внутреннюю платформу провайдера: движок процессов, аутентификация и полевые приложения вокруг них.',
    },
    projects: [
      {
        title: { en: 'Business-process platform', ru: 'Платформа бизнес-процессов' },
        text: {
          en: 'A PWA with an embedded BPMN editor, so the business edits its own processes instead of filing a ticket for every change. Still the piece I keep improving.',
          ru: 'PWA со встроенным BPMN-редактором: бизнес правит свои процессы сам, а не заводит задачу на каждое изменение. Продолжаю развивать её и сейчас.',
        },
        tech: ['Flutter', 'bpmn-js', 'Go', 'gRPC', 'Protobuf', 'Hasura', 'PostgreSQL'],
      },
      {
        title: { en: 'Authentication service', ru: 'Сервис аутентификации' },
        text: {
          en: 'Single sign-on across the internal apps using existing Active Directory accounts. Issues JWT access and refresh tokens; a web console assigns rights per employee.',
          ru: 'Единый вход во внутренние приложения по существующим аккаунтам Active Directory. Выдаёт JWT access и refresh токены, права сотрудникам назначаются через веб-интерфейс.',
        },
        tech: ['Go', 'Active Directory', 'JWT', 'gRPC'],
      },
      {
        title: { en: 'Field app for the line-cable department', ru: 'Приложение линейно-кабельного отдела' },
        text: {
          en: 'Technicians close jobs from the site instead of driving back to the office. Real-time over WebSocket with several devices signed into one account, 1C ASUP over SOAP, and a GraphQL service that bridges two phone numbers through the voice platform and hands back a link to the recording when the call ends.',
          ru: 'Техники закрывают задачи прямо на объекте, а не возвращаясь в офис. Реальное время по WebSocket с несколькими устройствами на один аккаунт, обмен с 1С АСУП по SOAP и GraphQL-сервис, который соединяет два номера через голосовую платформу и возвращает ссылку на запись разговора по завершении.',
        },
        tech: ['Flutter', 'Dart', 'Angular', 'WebSocket', 'ReactiveX', 'GraphQL', 'SOAP', '1C'],
        impact: {
          en: 'Department efficiency up ~20%',
          ru: 'Эффективность отдела выросла на ~20%',
        },
      },
      {
        title: { en: 'Technician dispatch planner', ru: 'Планировщик выездов техников' },
        text: {
          en: 'Web app for assembling crews by day of the week, synced across devices and talking to 1C over RabbitMQ for live task status.',
          ru: 'Веб-приложение для формирования бригад по дням недели: синхронизация нескольких устройств и обмен с 1С через RabbitMQ для актуальных статусов задач.',
        },
        tech: ['Flutter', 'RabbitMQ', 'Hasura', 'PostgreSQL'],
      },
      {
        title: { en: 'Telegram image bot', ru: 'Telegram-бот для изображений' },
        text: {
          en: 'Uploads images to the server and lets the sender add or edit their descriptions afterwards. Written in Rust.',
          ru: 'Отправляет изображения на сервер и позволяет добавлять или менять описания к загруженным. Написан на Rust.',
        },
        tech: ['Rust', 'Telegram Bot API'],
      },
      {
        title: { en: 'Project management app', ru: 'Приложение управления проектами' },
        text: {
          en: 'Earlier internal tool, talking to RabbitMQ over MQTT.',
          ru: 'Более раннее внутреннее приложение, взаимодействие с RabbitMQ по протоколу MQTT.',
        },
        tech: ['Dart', 'Polymer', 'Firebase', 'MQTT'],
      },
    ],
  },
  {
    company: { en: 'TANAIS Group', ru: 'TANAIS Group' },
    field: { en: 'IT integrator', ru: 'ИТ-интегратор' },
    position: {
      en: 'Developer, software implementation dept.',
      ru: 'Программист отдела внедрения ПО',
    },
    period: { en: 'Feb 2014 — Nov 2015', ru: 'Февраль 2014 — Ноябрь 2015' },
    duration: { en: '1 yr 10 mos', ru: '1 год 10 мес' },
    summary: {
      en: 'Building client sites on 1C-Bitrix, fully remote. The stretch where the design side and the code side started being the same job.',
      ru: 'Сайты клиентов на 1С-Битрикс, полностью удалённо. Период, когда дизайн и код окончательно стали одной работой.',
    },
    projects: [],
    tech: ['1C-Bitrix', 'PHP', 'JavaScript', 'Sass'],
  },
  {
    company: { en: 'Russian State Library', ru: 'ФГБУ «Российская государственная библиотека»' },
    field: { en: 'Federal institution', ru: 'Федеральное учреждение' },
    position: { en: 'Lead developer', ru: 'Ведущий программист' },
    period: { en: 'Dec 2011 — Sep 2012', ru: 'Декабрь 2011 — Сентябрь 2012' },
    duration: { en: '10 mos', ru: '10 мес' },
    summary: {
      en: 'Terminal interfaces and front-ends for the library’s public services — screens used by visitors who had never seen them before and would get exactly one try.',
      ru: 'Интерфейсы терминалов и сервисов библиотеки — экраны для посетителей, которые видят их впервые и разбираются с одной попытки.',
    },
    projects: [],
    tech: ['JavaScript', 'HTML', 'CSS'],
  },
];

export const EDUCATION = [
  {
    place: {
      en: 'Moscow Academy of Economics and Law',
      ru: 'Московская академия экономики и права',
    },
    detail: {
      en: 'Economics — accounting, analysis and audit',
      ru: 'Экономика — бухгалтерский учёт, анализ и аудит',
    },
    year: '2011',
  },
  {
    place: {
      en: 'Lyceum №1511 at the Moscow Engineering Physics Institute (MEPhI)',
      ru: 'Лицей №1511 при МИФИ',
    },
    detail: { en: 'Physics and mathematics', ru: 'Физико-математический профиль' },
    year: '2006',
  },
];

export const LANGUAGES = [
  { name: { en: 'Russian', ru: 'Русский' }, level: { en: 'Native', ru: 'Родной' } },
  { name: { en: 'English', ru: 'Английский' }, level: { en: 'B2 — Upper-intermediate', ru: 'B2 — Средне-продвинутый' } },
];

/* --------------------------------------------------------------------------
   Open source — curated highlights.
   The full list is fetched live from the GitHub API; this is what gets
   promoted to the top and what renders if the API is unreachable.
   -------------------------------------------------------------------------- */

export const FEATURED_REPOS = [
  {
    name: 'lazyrest',
    lang: 'Go',
    stars: 1,
    year: '2026',
    desc: {
      en: 'A terminal UI for the .http and .hurl requests already sitting in your project. Chains requests so a token is captured rather than pasted, speaks GraphQL properly, and navigates like Vim.',
      ru: 'Терминальный интерфейс для .http и .hurl запросов, которые уже лежат в проекте. Связывает запросы, чтобы токен подхватывался, а не копировался руками; корректно говорит на GraphQL; навигация как в Vim.',
    },
    tags: ['Go', 'TUI', 'HTTP', 'GraphQL', 'Neovim'],
    url: 'https://github.com/Hecatoncheir/lazyrest',
  },
  {
    name: 'treesitter_cyclomatic_complexity',
    lang: 'Lua',
    stars: 0,
    year: '2026',
    desc: {
      en: 'Cyclomatic and cognitive complexity as inline virtual text in Neovim, computed purely from tree-sitter — no LSP, no external binaries. Verified against gocyclo and luacheck over the Go standard library and the Neovim runtime.',
      ru: 'Цикломатическая и когнитивная сложность прямо в строке Neovim, считается только по tree-sitter — без LSP и внешних бинарников. Сверено с gocyclo и luacheck на стандартной библиотеке Go и рантайме Neovim.',
    },
    tags: ['Lua', 'Neovim', 'tree-sitter', 'Static analysis'],
    url: 'https://github.com/Hecatoncheir/treesitter_cyclomatic_complexity',
  },
  {
    name: 'bpmn_dart',
    lang: 'Dart',
    stars: 5,
    year: '2024',
    desc: {
      en: 'Dart wrapper around bpmn-js — the bridge that let the BPMN editor live inside a Flutter web app.',
      ru: 'Dart-обёртка над bpmn-js — то, что позволило встроить BPMN-редактор внутрь Flutter-приложения для веба.',
    },
    tags: ['Dart', 'Flutter', 'BPMN'],
    url: 'https://github.com/Hecatoncheir/bpmn_dart',
  },
  {
    name: 'spoiler',
    lang: 'Dart',
    stars: 4,
    year: '2023',
    desc: {
      en: 'A spoiler widget for Flutter with configurable open and close curves — elasticOut on the way in, elasticIn on the way out.',
      ru: 'Spoiler-виджет для Flutter с настраиваемыми кривыми открытия и закрытия — elasticOut при раскрытии, elasticIn при сворачивании.',
    },
    tags: ['Dart', 'Flutter', 'Widget'],
    url: 'https://github.com/Hecatoncheir/spoiler',
  },
  {
    name: 'espresso_light_theme',
    lang: 'Theme',
    stars: 8,
    year: '2026',
    desc: {
      en: 'The Espresso Light colour scheme for JetBrains IDEs. Most-starred thing I have published, which says something about how many people read code in daylight.',
      ru: 'Цветовая схема Espresso Light для IDE от JetBrains. Самый «звёздный» мой репозиторий — видимо, читать код при дневном свете любят многие.',
    },
    tags: ['Theme', 'JetBrains', 'Design'],
    url: 'https://github.com/Hecatoncheir/espresso_light_theme',
  },
  {
    name: 'env_configurable.dart',
    lang: 'Dart',
    stars: 2,
    year: '2026',
    desc: {
      en: 'Build-time code generation that turns environment variables into a typed Dart class, so a missing key fails at compile time instead of at 3am.',
      ru: 'Кодогенерация на этапе сборки: превращает переменные окружения в типизированный Dart-класс, чтобы пропущенный ключ падал при компиляции, а не в три часа ночи.',
    },
    tags: ['Dart', 'Codegen', 'build_runner'],
    url: 'https://github.com/Hecatoncheir/env_configurable.dart',
  },
  {
    name: 'groups_field',
    lang: 'Dart',
    stars: 3,
    year: '2024',
    desc: {
      en: 'Group Flutter widgets by an arbitrary attribute, scrollable or not, with creation handled inline.',
      ru: 'Группировка Flutter-виджетов по произвольному атрибуту, со скроллом или без, с созданием элементов на месте.',
    },
    tags: ['Dart', 'Flutter', 'Widget'],
    url: 'https://github.com/Hecatoncheir/groups_field',
  },
  {
    name: 'Springel',
    lang: 'Dart',
    stars: 3,
    year: '2023',
    desc: {
      en: 'Elements that follow the cursor to a limit, with a spring easing them back. An old experiment, and the reason the buttons on this page pull toward your pointer.',
      ru: 'Элементы, следующие за курсором до предела, с пружиной на возврате. Старый эксперимент — и причина, по которой кнопки на этой странице тянутся к указателю.',
    },
    tags: ['Dart', 'Animation', 'Interaction'],
    url: 'https://github.com/Hecatoncheir/Springel',
  },
  {
    name: 'mini.parser',
    lang: 'Dart',
    stars: 3,
    year: '2021',
    desc: {
      en: 'A web-page parser in Dart, the front half of a crawler I was writing at the time.',
      ru: 'Парсер веб-страниц на Dart — передняя часть краулера, который я тогда писал.',
    },
    tags: ['Dart', 'Parsing', 'Crawler'],
    url: 'https://github.com/Hecatoncheir/mini.parser',
  },
  {
    name: 'hecatoncheir_crawler',
    lang: 'Go',
    stars: 1,
    year: '2022',
    desc: {
      en: 'The back half: a crawler in Go exposing both a WebSocket and a REST API.',
      ru: 'Задняя часть: краулер на Go с WebSocket и REST API одновременно.',
    },
    tags: ['Go', 'WebSocket', 'REST'],
    url: 'https://github.com/Hecatoncheir/hecatoncheir_crawler',
  },
  {
    name: 'EspressoVsCode',
    lang: 'Theme',
    stars: 2,
    year: '2024',
    desc: {
      en: 'The same Espresso palette ported to VS Code, in light and dark.',
      ru: 'Та же палитра Espresso, портированная в VS Code, в светлом и тёмном вариантах.',
    },
    tags: ['Theme', 'VS Code', 'Design'],
    url: 'https://github.com/Hecatoncheir/EspressoVsCode',
  },
  {
    name: 'jetbrains-webstorm-theme',
    lang: 'Theme',
    stars: 4,
    year: '2017',
    desc: {
      en: 'Where the Espresso themes started — a colour scheme for JetBrains IDEs, still picking up stars nine years later.',
      ru: 'С чего начались темы Espresso — схема для IDE JetBrains, которая собирает звёзды девять лет спустя.',
    },
    tags: ['Theme', 'JetBrains', 'Design'],
    url: 'https://github.com/Hecatoncheir/jetbrains-webstorm-theme',
  },
];

/* --------------------------------------------------------------------------
   Behance
   -------------------------------------------------------------------------- */

export const BEHANCE = [
  {
    title: { en: 'Raven fight club', ru: 'Raven fight club' },
    kind: { en: 'Identity · Web', ru: 'Айдентика · Веб' },
    year: '2018',
    appreciations: 32,
    views: 493,
    url: 'https://www.behance.net/gallery/55931725/Raven-fight-club',
    cover: 'assets/img/work/55931725.webp',
    featured: true,
  },
  {
    title: { en: 'MMA Raven club — web design', ru: 'MMA Raven club — веб-дизайн' },
    kind: { en: 'Web design', ru: 'Веб-дизайн' },
    year: '2018',
    appreciations: 32,
    views: 312,
    url: 'https://www.behance.net/gallery/58998585/MMA-Raven-club-web-design',
    cover: 'assets/img/work/58998585.webp',
    featured: true,
  },
  {
    title: { en: 'Pulsar phone covers store', ru: 'Магазин чехлов Pulsar' },
    kind: { en: 'E-commerce · UI', ru: 'E-commerce · UI' },
    year: '2015',
    appreciations: 16,
    views: 214,
    url: 'https://www.behance.net/gallery/30470779/Pulsar-phone-covers-store',
    cover: 'assets/img/work/30470779.webp',
    featured: true,
  },
  {
    title: { en: 'HopUp for DIRECTUM', ru: 'HopUp для DIRECTUM' },
    kind: { en: 'Product UI', ru: 'Продуктовый UI' },
    year: '2015',
    appreciations: 7,
    views: 129,
    url: 'https://www.behance.net/gallery/27811431/HopUp-for-DIRECTUM',
    cover: 'assets/img/work/27811431.webp',
    featured: true,
  },
  {
    title: { en: 'Generated wallpapers', ru: 'Сгенерированные обои' },
    kind: { en: 'Generative', ru: 'Генеративное' },
    year: '2023',
    appreciations: 2,
    views: 49,
    url: 'https://www.behance.net/gallery/168979999/Generated-wallpapers',
    cover: 'assets/img/work/168979999.webp',
  },
  {
    title: { en: 'Generated images', ru: 'Сгенерированные изображения' },
    kind: { en: 'Generative', ru: 'Генеративное' },
    year: '2023',
    appreciations: 3,
    views: 40,
    url: 'https://www.behance.net/gallery/165365329/Ganerated-images',
    cover: 'assets/img/work/165365329.webp',
  },
  {
    title: { en: 'Generated icons', ru: 'Сгенерированные иконки' },
    kind: { en: 'Generative · Icons', ru: 'Генеративное · Иконки' },
    year: '2023',
    appreciations: 0,
    views: 35,
    url: 'https://www.behance.net/gallery/165660685/Generated-icons',
    cover: 'assets/img/work/165660685.webp',
  },
  {
    title: { en: 'Generated logo', ru: 'Сгенерированный логотип' },
    kind: { en: 'Generative · Logo', ru: 'Генеративное · Логотип' },
    year: '2023',
    appreciations: 0,
    views: 32,
    url: 'https://www.behance.net/gallery/165352517/Generated-logo',
    cover: 'assets/img/work/165352517.webp',
  },
  {
    title: { en: 'SDXL generated images', ru: 'Изображения SDXL' },
    kind: { en: 'Generative', ru: 'Генеративное' },
    year: '2023',
    appreciations: 0,
    views: 15,
    url: 'https://www.behance.net/gallery/177595649/SDXL-generated-images',
    cover: 'assets/img/work/177595649.webp',
  },
  {
    title: { en: 'Stable Diffusion generation', ru: 'Генерация Stable Diffusion' },
    kind: { en: 'Generative', ru: 'Генеративное' },
    year: '2024',
    appreciations: 0,
    views: 15,
    url: 'https://www.behance.net/gallery/200638945/Stable-Diffusion-Generation',
    cover: 'assets/img/work/200638945.webp',
  },
  {
    title: { en: 'Wallpapers', ru: 'Обои' },
    kind: { en: 'Generative', ru: 'Генеративное' },
    year: '2026',
    appreciations: 0,
    views: 22,
    url: 'https://www.behance.net/gallery/253348875/Wallpapers',
    cover: 'assets/img/work/253348875.webp',
  },
  {
    title: { en: 'Wallpapers II', ru: 'Обои II' },
    kind: { en: 'Generative', ru: 'Генеративное' },
    year: '2026',
    appreciations: 0,
    views: 66,
    url: 'https://www.behance.net/gallery/254420061/Wallpapers',
    cover: 'assets/img/work/254420061.webp',
  },
];

/* --------------------------------------------------------------------------
   UI strings
   -------------------------------------------------------------------------- */

export const UI = {
  navAbout: { en: 'About', ru: 'О себе' },
  navWork: { en: 'Work', ru: 'Опыт' },
  navCode: { en: 'Code', ru: 'Код' },
  navDesign: { en: 'Design', ru: 'Дизайн' },
  navContact: { en: 'Contact', ru: 'Контакты' },

  scroll: { en: 'Scroll', ru: 'Листайте' },
  available: { en: 'Open to interesting work', ru: 'Открыт к интересным задачам' },

  secAbout: { en: 'About', ru: 'О себе' },
  secAboutNum: '01',
  secWork: { en: 'Experience', ru: 'Опыт работы' },
  secWorkNum: '02',
  secStack: { en: 'Stack', ru: 'Стек' },
  secStackNum: '03',
  secCode: { en: 'Open source', ru: 'Открытый код' },
  secCodeNum: '04',
  secDesign: { en: 'Design', ru: 'Дизайн' },
  secDesignNum: '05',
  secContact: { en: 'Contact', ru: 'Контакты' },
  secContactNum: '06',

  workIntro: {
    en: 'Three places in thirteen years. The last one for ten of them.',
    ru: 'Три места за тринадцать лет. Последнее — десять из них.',
  },
  codeIntro: {
    en: '136 public repositories, 89 of them written rather than forked. These are the ones worth your time — the rest is searchable below.',
    ru: '136 публичных репозиториев, 89 из них написаны, а не форкнуты. Вот те, что стоят вашего внимания — остальные можно найти ниже.',
  },
  designIntro: {
    en: 'Before the code there was Maya, two certificates and a lot of type. It never went away.',
    ru: 'До кода была Maya, два сертификата и много типографики. Никуда не делось.',
  },
  stackIntro: {
    en: 'What I reach for, and how often.',
    ru: 'К чему тянусь и как часто.',
  },

  allRepos: { en: 'All repositories', ru: 'Все репозитории' },
  filterAll: { en: 'All', ru: 'Все' },
  searchRepos: { en: 'Filter repositories…', ru: 'Фильтр репозиториев…' },
  loadingRepos: { en: 'Loading from GitHub…', ru: 'Загружаю с GitHub…' },
  reposOffline: {
    en: 'GitHub API unavailable right now — showing the curated set.',
    ru: 'GitHub API сейчас недоступен — показан отобранный список.',
  },
  noResults: { en: 'Nothing matches that.', ru: 'Ничего не нашлось.' },
  showMore: { en: 'Show more', ru: 'Показать ещё' },
  viewOnGithub: { en: 'View on GitHub', ru: 'Открыть на GitHub' },
  viewOnBehance: { en: 'View on Behance', ru: 'Открыть на Behance' },
  featured: { en: 'Featured', ru: 'Избранное' },

  education: { en: 'Education', ru: 'Образование' },
  langs: { en: 'Languages', ru: 'Языки' },

  contactLead: {
    en: 'Best reached by email. I read everything.',
    ru: 'Лучше всего писать на почту. Я читаю всё.',
  },
  copyEmail: { en: 'Copy', ru: 'Копировать' },
  copied: { en: 'Copied', ru: 'Скопировано' },

  themeToggle: { en: 'Toggle theme', ru: 'Сменить тему' },
  langToggle: { en: 'Switch language', ru: 'Сменить язык' },
  backToTop: { en: 'Back to top', ru: 'Наверх' },
  builtWith: {
    en: 'Hand-written HTML, CSS and JavaScript. No framework, no build step.',
    ru: 'Написано руками на HTML, CSS и JavaScript. Без фреймворка и без сборки.',
  },
};
