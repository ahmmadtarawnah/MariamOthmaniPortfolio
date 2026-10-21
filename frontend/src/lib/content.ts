export type Lang = "ar" | "en";

export const SITE = {
  email: "business@officialmariamothmani.com",
  youtube: "https://www.youtube.com/@MariemOthmanii",
  instagram: "https://www.instagram.com/maryem_othmanii/",
  developer: "Ahmad Altarawneh",
} as const;

export const MEDIA = {
  interview: "/media/mariam-interview.jpg",
  award: "/media/mariam-award.jpg",
  stage: "/media/mariam-stage.jpg",
  backstage: "/media/mariam-backstage.jpg",
  video: "/media/mariam-performance.mp4",
  jusour: "/media/jusour-logo.png",
} as const;

type Dict = {
  meta: { title: string; description: string };
  loader: { name: string; tagline: string; enter: string };
  nav: {
    home: string;
    about: string;
    journey: string;
    repertoire: string;
    gallery: string;
    stage: string;
    management: string;
    contact: string;
  };
  langLabel: string;
  langSwitchTo: string;
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    lede: string;
    ctaListen: string;
    ctaBook: string;
    scroll: string;
    marquee: string[];
  };
  stats: { value: string; label: string }[];
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    pull: string;
    captionInterview: string;
    captionAward: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { year: string; title: string; text: string; tag: string }[];
  };
  repertoire: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      title: string;
      sub: string;
      meta: string;
      note: string;
      kind: string;
    }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { src: string; caption: string }[];
    close: string;
    prev: string;
    next: string;
  };
  stage: {
    eyebrow: string;
    title: string;
    intro: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
  };
  management: {
    eyebrow: string;
    title: string;
    org: string;
    role: string;
    text: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    emailLabel: string;
    bookingNote: string;
    followLabel: string;
    copy: string;
    copied: string;
  };
  footer: {
    tagline: string;
    rights: string;
    managed: string;
    powered: string;
    nav: string;
    back: string;
  };
};

const ar: Dict = {
  meta: {
    title: "مريم عثماني | مطربة تونسية",
    description:
      "الموقع الرسمي للمطربة التونسية مريم عثماني — صاحبة الميكروفون الذهبي في مهرجان الأغنية التونسية ومشاركة الموسم السادس من ذا فويس: أحلى صوت.",
  },
  loader: {
    name: "مريم عثماني",
    tagline: "صوتٌ من تونس",
    enter: "جارٍ التحميل",
  },
  nav: {
    home: "الرئيسية",
    about: "عنها",
    journey: "المسيرة",
    repertoire: "الأعمال",
    gallery: "المعرض",
    stage: "على المسرح",
    management: "الإدارة",
    contact: "تواصل",
  },
  langLabel: "العربية",
  langSwitchTo: "English",
  hero: {
    eyebrow: "مطربة تونسية",
    name: "مريم عثماني",
    role: "صوتٌ يجمع الأصالة بالحداثة",
    lede: "من خشبات المهرجانات التونسية إلى مسرح «ذا فويس» العربي — رحلةُ صوتٍ يحمل عبق الطرب ويتنفّس روح اليوم.",
    ctaListen: "تعرّف على مسيرتها",
    ctaBook: "للحجوزات والأعمال",
    scroll: "مرّر للأسفل",
    marquee: [
      "الميكروفون الذهبي ٢٠٢٣",
      "مهرجان الأغنية التونسية",
      "ذا فويس: أحلى صوت",
      "فريق رحمة رياض",
      "تونس",
    ],
  },
  stats: [
    { value: "٢٠٢٣", label: "الميكروفون الذهبي" },
    { value: "٢١", label: "دورة مهرجان الأغنية التونسية" },
    { value: "٠٦", label: "موسم ذا فويس: أحلى صوت" },
    { value: "MBC", label: "منصّة الظهور العربي" },
  ],
  about: {
    eyebrow: "من هي",
    title: "مريم عثماني",
    paragraphs: [
      "مريم عثماني مطربة تونسية شابّة، تملك صوتاً يجمع بين أصالة الطرب العربي وروح التجديد. بدأت مشوارها من المشهد الموسيقي التونسي، حيث صقلت أداءها على خشبات المهرجانات قبل أن يصل صوتها إلى الجمهور العربي الأوسع.",
      "كان التتويج الأبرز في مسيرتها سنة ٢٠٢٣، حين نالت رفقة الفنان أسامة النابلي جائزة «الميكروفون الذهبي» لمسابقة الأغنية الوترية، ضمن الدورة الحادية والعشرين لمهرجان الأغنية التونسية، عن أغنية «نغني» من كلمات سيرين الشكيلي وألحان وتوزيع محمد علي كمون. ونالت الأغنية كذلك جائزة مؤسسة التلفزة التونسية المتمثّلة في تصوير فيديو كليب.",
      "وفي سنة ٢٠٢٥ حملت صوتها التونسي إلى واحدة من أكبر المنصّات الغنائية العربية، حين شاركت في الموسم السادس من برنامج «ذا فويس: أحلى صوت» على شاشة MBC. وفي مرحلة «الصوت وبس» أدّت رائعة ليلى مراد «مين يشتري الورد مني»، فالتفت إليها المدرّبون، لتنضمّ إلى فريق المدرّبة رحمة رياض.",
    ],
    pull: "«الصوت الذي يحمل حكاية بلدٍ، لا يحتاج إلى ترجمة.»",
    captionInterview: "في لقاء تلفزيوني",
    captionAward: "تتويج بالميكروفون الذهبي — مهرجان الأغنية التونسية",
  },
  journey: {
    eyebrow: "المسيرة",
    title: "محطّات في الطريق",
    intro: "من البدايات التونسية إلى الحضور العربي — أبرز المحطّات التي رسمت ملامح صوتها.",
    items: [
      {
        year: "البدايات",
        tag: "تونس",
        title: "من المشهد التونسي",
        text: "نشأتها الفنية في تونس، حيث تشكّل حسّها الطربي بين المقام الشرقي والذائقة التونسية، وبدأت تقديم أعمالها على خشبات المهرجانات المحلّية.",
      },
      {
        year: "٢٠٢٣",
        tag: "جائزة",
        title: "الميكروفون الذهبي",
        text: "تتويج الثنائي مريم عثماني وأسامة النابلي بجائزة «الميكروفون الذهبي» لمسابقة الأغنية الوترية، في الدورة ٢١ لمهرجان الأغنية التونسية، عن أغنية «نغني».",
      },
      {
        year: "٢٠٢٣",
        tag: "تكريم",
        title: "جائزة مؤسسة التلفزة التونسية",
        text: "نالت أغنية «نغني» جائزة مؤسسة التلفزة التونسية، والمتمثّلة في إنتاج وتصوير فيديو كليب خاص بالعمل.",
      },
      {
        year: "٢٠٢٥",
        tag: "ذا فويس",
        title: "مرحلة «الصوت وبس»",
        text: "ظهورها في الموسم السادس من «ذا فويس: أحلى صوت» على MBC، بأداء «مين يشتري الورد مني» لليلى مراد، الذي استقطب التفات المدرّبين.",
      },
      {
        year: "٢٠٢٥",
        tag: "الفريق",
        title: "فريق رحمة رياض",
        text: "انضمامها إلى فريق المدرّبة رحمة رياض، ومشاركتها في مرحلة المواجهة بأداء أغنية «فوق».",
      },
      {
        year: "اليوم",
        tag: "الحاضر",
        title: "فصلٌ جديد",
        text: "تواصل مريم بناء مشروعها الغنائي بأعمال جديدة وحضور على خشبات المسارح، بإدارة أعمال مؤسسة جسور الإنجاز.",
      },
    ],
  },
  repertoire: {
    eyebrow: "الأعمال",
    title: "من رصيدها الغنائي",
    intro: "أعمالٌ خاصّة وأخرى من كلاسيكيات الطرب، أدّتها بصوتها على المسارح وأمام الكاميرا.",
    items: [
      {
        title: "نغني",
        sub: "ثنائي مع أسامة النابلي",
        meta: "٢٠٢٣ · أغنية وترية",
        note: "كلمات: سيرين الشكيلي — ألحان وتوزيع: محمد علي كمون. العمل الفائز بجائزة الميكروفون الذهبي.",
        kind: "عمل خاص",
      },
      {
        title: "مين يشتري الورد مني",
        sub: "من كلاسيكيات ليلى مراد",
        meta: "ذا فويس · الصوت وبس",
        note: "أداؤها في مرحلة «الصوت وبس» بالموسم السادس، الذي نالت به التفات المدرّبين.",
        kind: "أداء",
      },
      {
        title: "فوق",
        sub: "أداء ثنائي — مرحلة المواجهة",
        meta: "ذا فويس · فريق رحمة رياض",
        note: "مشاركتها في مرحلة المواجهة ضمن فريق المدرّبة رحمة رياض.",
        kind: "أداء",
      },
    ],
  },
  gallery: {
    eyebrow: "المعرض",
    title: "لحظات",
    intro: "مختارات من الكواليس والمسرح والتتويج.",
    items: [
      { src: MEDIA.stage, caption: "على خشبة المسرح" },
      { src: MEDIA.award, caption: "لحظة التتويج بالميكروفون الذهبي" },
      { src: MEDIA.interview, caption: "في لقاء تلفزيوني" },
      { src: MEDIA.backstage, caption: "خلف الكواليس" },
    ],
    close: "إغلاق",
    prev: "السابق",
    next: "التالي",
  },
  stage: {
    eyebrow: "على المسرح",
    title: "شاهد الأداء",
    intro: "لقطة من حضورها على المسرح — حيث يكتمل الصوت بالإحساس.",
    play: "تشغيل",
    pause: "إيقاف",
    mute: "كتم الصوت",
    unmute: "تشغيل الصوت",
  },
  management: {
    eyebrow: "إدارة الأعمال",
    title: "جسور الإنجاز",
    org: "مؤسسة جسور الإنجاز",
    role: "المدير الحصري لأعمال مريم عثماني",
    text: "تتولّى مؤسسة جسور الإنجاز إدارة أعمال الفنانة مريم عثماني؛ من تنظيم الحفلات والمشاركات الفنية، إلى التعاقدات الإعلامية والرعايات والارتباطات التجارية. لأي طلب رسمي، يُرجى التواصل عبر البريد المعتمد أدناه.",
    cta: "راسل إدارة الأعمال",
  },
  contact: {
    eyebrow: "تواصل",
    title: "للحجوزات والأعمال",
    text: "للحفلات والمهرجانات والمقابلات الصحفية والرعايات — التواصل حصراً عبر البريد الرسمي لإدارة الأعمال.",
    emailLabel: "البريد الرسمي",
    bookingNote: "يُرجى تضمين التاريخ والمكان وطبيعة المشاركة في رسالتك.",
    followLabel: "تابعيها",
    copy: "نسخ البريد",
    copied: "تم النسخ",
  },
  footer: {
    tagline: "مطربة تونسية · صوتٌ بين الأصالة والحداثة",
    rights: "جميع الحقوق محفوظة",
    managed: "إدارة الأعمال: مؤسسة جسور الإنجاز",
    powered: "Powered by Ahmad Altarawneh",
    nav: "روابط سريعة",
    back: "العودة للأعلى",
  },
};

const en: Dict = {
  meta: {
    title: "Mariam Othmani | Tunisian Singer",
    description:
      "Official site of Tunisian singer Mariam Othmani — Golden Microphone winner at the Tunisian Song Festival and contestant on season 6 of The Voice: Ahla Sawt.",
  },
  loader: {
    name: "Mariam Othmani",
    tagline: "A Voice from Tunisia",
    enter: "Loading",
  },
  nav: {
    home: "Home",
    about: "About",
    journey: "Journey",
    repertoire: "Repertoire",
    gallery: "Gallery",
    stage: "On Stage",
    management: "Management",
    contact: "Contact",
  },
  langLabel: "English",
  langSwitchTo: "العربية",
  hero: {
    eyebrow: "Tunisian Singer",
    name: "Mariam Othmani",
    role: "Where tarab tradition meets a modern voice",
    lede: "From the festival stages of Tunisia to the screens of the Arab world — the journey of a voice that carries heritage and breathes today.",
    ctaListen: "Explore the journey",
    ctaBook: "Booking & business",
    scroll: "Scroll",
    marquee: [
      "Golden Microphone 2023",
      "Tunisian Song Festival",
      "The Voice: Ahla Sawt",
      "Team Rahma Riad",
      "Tunisia",
    ],
  },
  stats: [
    { value: "2023", label: "Golden Microphone" },
    { value: "21", label: "Tunisian Song Festival edition" },
    { value: "06", label: "The Voice: Ahla Sawt season" },
    { value: "MBC", label: "Pan-Arab stage" },
  ],
  about: {
    eyebrow: "About",
    title: "Mariam Othmani",
    paragraphs: [
      "Mariam Othmani is a young Tunisian singer whose voice holds both the depth of classic Arabic tarab and the openness of a contemporary artist. She grew out of the Tunisian music scene, refining her craft on festival stages long before her voice reached a wider Arab audience.",
      "Her defining moment came in 2023, when she and fellow artist Osama Al-Nabli were crowned with the Golden Microphone for the Stringed Song competition at the 21st edition of the Tunisian Song Festival, for the song “Naghanni” — written by Sirine Chkili, composed and arranged by Mohamed Ali Kammoun. The same song also received the Tunisian Television Foundation award, which produced an official music video.",
      "In 2025 she carried her Tunisian voice to one of the Arab world’s biggest musical platforms, taking part in season 6 of “The Voice: Ahla Sawt” on MBC. In the blind auditions she performed Layla Mourad’s classic “Meen Yeshteri El Ward Menni”, turning the coaches’ chairs and joining Team Rahma Riad.",
    ],
    pull: "“A voice that carries the story of a country needs no translation.”",
    captionInterview: "During a television interview",
    captionAward: "Receiving the Golden Microphone — Tunisian Song Festival",
  },
  journey: {
    eyebrow: "Journey",
    title: "Milestones along the way",
    intro: "From Tunisian beginnings to a pan-Arab stage — the moments that shaped her voice.",
    items: [
      {
        year: "Beginnings",
        tag: "Tunisia",
        title: "Out of the Tunisian scene",
        text: "Raised musically in Tunisia, her ear formed between Eastern maqam and Tunisian taste, she began performing her work on local festival stages.",
      },
      {
        year: "2023",
        tag: "Award",
        title: "The Golden Microphone",
        text: "Mariam Othmani and Osama Al-Nabli were crowned with the Golden Microphone for the Stringed Song competition at the 21st Tunisian Song Festival, for the song “Naghanni”.",
      },
      {
        year: "2023",
        tag: "Honour",
        title: "Tunisian Television Foundation award",
        text: "“Naghanni” also won the Tunisian Television Foundation prize — the production and filming of an official music video for the song.",
      },
      {
        year: "2025",
        tag: "The Voice",
        title: "The blind auditions",
        text: "Her appearance on season 6 of “The Voice: Ahla Sawt” on MBC, performing Layla Mourad’s “Meen Yeshteri El Ward Menni” and turning the coaches.",
      },
      {
        year: "2025",
        tag: "Team",
        title: "Team Rahma Riad",
        text: "She joined coach Rahma Riad’s team and took part in the battle round with the song “Fog”.",
      },
      {
        year: "Today",
        tag: "Present",
        title: "A new chapter",
        text: "Mariam continues to build her artistic project with new work and live performances, with her career managed by Jusour Al-Injaz.",
      },
    ],
  },
  repertoire: {
    eyebrow: "Repertoire",
    title: "From her songbook",
    intro: "Original work alongside classics of Arabic song, carried on stage and on camera.",
    items: [
      {
        title: "Naghanni",
        sub: "Duet with Osama Al-Nabli",
        meta: "2023 · Stringed song",
        note: "Lyrics: Sirine Chkili — Music & arrangement: Mohamed Ali Kammoun. The Golden Microphone winning work.",
        kind: "Original",
      },
      {
        title: "Meen Yeshteri El Ward Menni",
        sub: "A Layla Mourad classic",
        meta: "The Voice · Blind audition",
        note: "Her season 6 blind audition performance, the one that turned the coaches’ chairs.",
        kind: "Performance",
      },
      {
        title: "Fog",
        sub: "Duet — battle round",
        meta: "The Voice · Team Rahma Riad",
        note: "Her battle round performance within coach Rahma Riad’s team.",
        kind: "Performance",
      },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Moments",
    intro: "A selection from backstage, the stage, and the night of the award.",
    items: [
      { src: MEDIA.stage, caption: "On stage" },
      { src: MEDIA.award, caption: "Receiving the Golden Microphone" },
      { src: MEDIA.interview, caption: "During a television interview" },
      { src: MEDIA.backstage, caption: "Backstage" },
    ],
    close: "Close",
    prev: "Previous",
    next: "Next",
  },
  stage: {
    eyebrow: "On Stage",
    title: "Watch the performance",
    intro: "A glimpse of her stage presence — where the voice meets the feeling.",
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
  },
  management: {
    eyebrow: "Management",
    title: "Jusour Al-Injaz",
    org: "Jusour Al-Injaz Foundation",
    role: "Exclusive business manager for Mariam Othmani",
    text: "Jusour Al-Injaz Foundation manages the career of Mariam Othmani — from concerts and artistic appearances to media agreements, sponsorships and commercial partnerships. For any official request, please use the business email below.",
    cta: "Contact management",
  },
  contact: {
    eyebrow: "Contact",
    title: "Booking & business",
    text: "For concerts, festivals, press interviews and sponsorships — all enquiries go exclusively through the official management email.",
    emailLabel: "Official email",
    bookingNote: "Please include the date, venue and nature of the engagement in your message.",
    followLabel: "Follow",
    copy: "Copy email",
    copied: "Copied",
  },
  footer: {
    tagline: "Tunisian singer · a voice between heritage and today",
    rights: "All rights reserved",
    managed: "Management: Jusour Al-Injaz Foundation",
    powered: "Powered by Ahmad Altarawneh",
    nav: "Quick links",
    back: "Back to top",
  },
};

export const CONTENT: Record<Lang, Dict> = { ar, en };

export const SECTION_IDS = [
  "home",
  "about",
  "journey",
  "repertoire",
  "gallery",
  "stage",
  "management",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
