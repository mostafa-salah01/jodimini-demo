import { Product, BundleItem, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'floral-pink-dress',
    name: {
      ar: 'فستان وردي بطبعة زهور صغيرة',
      en: 'Floral Pink Summer Dress',
    },
    shortDesc: {
      ar: 'فستان صيفي ناعم بنقشة زهور رقيقة وأكمام مكشكشة مريحة لحركة الطفلة.',
      en: 'Soft summer dress with delicate floral print and breathable ruffled sleeves.',
    },
    fullDesc: {
      ar: 'مصنوع من قطن عضوي 100% عالي النقاء، خفيف وبارد ومثالي لأيام الصيف والمناسبات العائلية في السعودية. أزرار خلفية خشبية أنيقة وسهلة اللبس.',
      en: 'Crafted from 100% pure organic cotton, lightweight and breathable for hot days and family gatherings. Featuring cute wooden back buttons.',
    },
    price: 149,
    ageCategory: '4-6y',
    ageLabel: {
      ar: '4-6 سنين',
      en: '4-6 Years',
    },
    badge: {
      ar: 'الأكثر طلباً',
      en: 'Best Seller',
      color: '#F497A9',
    },
    image: '/images/product-01.webp',
    sizes: ['4 سنوات', '5 سنوات', '6 سنوات'],
    fabric: {
      ar: '100% قطن عضوي منسوج',
      en: '100% Organic Woven Cotton',
    },
    care: {
      ar: 'غسيل لطيف 30 درجة مئوية، لا تستخدم مبيضات',
      en: 'Gentle wash 30°C, do not bleach',
    },
  },
  {
    id: 'prod-02',
    slug: 'rainbow-orange-tee',
    name: {
      ar: 'تيشيرت برتقالي بقوس قزح',
      en: 'Sunset Rainbow Orange Tee',
    },
    shortDesc: {
      ar: 'تيشيرت مبهج بألوان دافئة ورسمة قوس قزح مطرزة بجودة فائقة.',
      en: 'Cheerful sunset orange t-shirt featuring vibrant embroidered rainbow artwork.',
    },
    fullDesc: {
      ar: 'تصميم مرح يضفي بهجة فورية على طفلك، قطن ناعم معتدل المرونة يتحمل اللعب والغسيل المتكرر بدون أن يفقد بريقه أو يتمدد.',
      en: 'Playful design crafted from durable stretchable cotton that stays soft and vibrant after countless washes and outdoor play.',
    },
    price: 69,
    ageCategory: '4-6y',
    ageLabel: {
      ar: '4-6 سنين',
      en: '4-6 Years',
    },
    badge: {
      ar: 'وصل حديثاً',
      en: 'New Arrival',
      color: '#F26B4E',
    },
    image: '/images/product-02.webp',
    sizes: ['4 سنوات', '5 سنوات', '6 سنوات'],
    fabric: {
      ar: '95% قطن ممشط، 5% إيلاستين',
      en: '95% Combed Cotton, 5% Elastane',
    },
    care: {
      ar: 'غسيل في الغسالة، كوي على درجة متوسطة من الداخل',
      en: 'Machine washable, iron medium on reverse',
    },
  },
  {
    id: 'prod-03',
    slug: 'white-tee-turquoise-shorts-set',
    name: {
      ar: 'طقم تيشيرت أبيض وشورت تركواز',
      en: 'White Tee & Turquoise Shorts Set',
    },
    shortDesc: {
      ar: 'طقم ولادي كلاسيكي أنيق يجمع بين البساطة والانتعاش الصيفي.',
      en: 'Classic duo set blending crisp white top with vibrant turquoise active shorts.',
    },
    fullDesc: {
      ar: 'شورت بخصر مطاطي مرن مع رباط تعديل، وتيشيرت قطني ناعم جداً على بشرة الطفل الحساسة. طقم جاهز لكل المشاوير اليومية والرحلات.',
      en: 'Elasticated drawstring waistband shorts paired with an ultra-soft hypoallergenic cotton top. Ready for daily adventures and family trips.',
    },
    price: 99,
    ageCategory: '4-6y',
    ageLabel: {
      ar: '4-6 سنين',
      en: '4-6 Years',
    },
    badge: {
      ar: 'طقم متكامل',
      en: '2-Piece Set',
      color: '#20969B',
    },
    image: '/images/product-03.webp',
    sizes: ['4 سنوات', '5 سنوات', '6 سنوات'],
    fabric: {
      ar: '100% قطن جيرسي خفيف وناعم',
      en: '100% Soft Cotton Jersey',
    },
    care: {
      ar: 'غسيل بارد مع الألوان المشابهة',
      en: 'Cold wash with similar colors',
    },
  },
  {
    id: 'prod-04',
    slug: 'cozy-yellow-hoodie-pants',
    name: {
      ar: 'هودي أصفر دافئ مع بنطلون أبيض',
      en: 'Cozy Yellow Hoodie & Jogger Set',
    },
    shortDesc: {
      ar: 'طقم شتوي أنيق بلون الخردل الدافئ مع بطانة داخلية مخملية لطيفة.',
      en: 'Warm mustard yellow hooded sweater matched with comfy white joggers.',
    },
    fullDesc: {
      ar: 'يوفر الدفء المثالي في الأيام الباردة بفضل قطن الفليس الفاخر، قبعة مريحة وجيب أمامي كلاسيكي كانجارو مع بنطلون بأساور مرنة مريحة.',
      en: 'Delivers snug warmth with premium brushed fleece interior. Features cozy front kangaroo pocket and fitted jogger cuffs.',
    },
    price: 179,
    originalPrice: 219,
    ageCategory: '7-9y',
    ageLabel: {
      ar: '7-9 سنين',
      en: '7-9 Years',
    },
    badge: {
      ar: 'خصم 18%',
      en: '18% OFF',
      color: '#F9A620',
    },
    image: '/images/product-04.webp',
    sizes: ['7 سنوات', '8 سنوات', '9 سنوات'],
    fabric: {
      ar: '80% قطن فليس، 20% بوليستر مدعم',
      en: '80% Fleece Cotton, 20% Poly Core',
    },
    care: {
      ar: 'غسيل لطيف، تجفيف على حبل الغسيل',
      en: 'Gentle cycle, line dry recommended',
    },
  },
  {
    id: 'prod-05',
    slug: 'turquoise-tulle-party-dress',
    name: {
      ar: 'فستان حفلات تركواز بتنورة تول',
      en: 'Turquoise Party Tulle Dress',
    },
    shortDesc: {
      ar: 'فستان مناسبات ساحر بتنورة منفوشة من التول الناعم المزين ببريق هادئ.',
      en: 'Enchanting party dress with tiered soft tulle flare and subtle glimmer.',
    },
    fullDesc: {
      ar: 'مصمم خصيصاً للمناسبات والأعياد وحفلات أعياد الميلاد. بطانة داخلية قطنية 100% تحمي بشرة الطفلة وتمنع أي احتكاك مع التول، مع فيونكة ظهرية ناعمة.',
      en: 'Tailored for joyful celebrations, Eid and birthdays. Lined with 100% breathable cotton against sensitive skin, finished with an elegant satin bow.',
    },
    price: 199,
    ageCategory: '4-6y',
    ageLabel: {
      ar: '4-6 سنين',
      en: '4-6 Years',
    },
    badge: {
      ar: 'فاخر ومناسبات',
      en: 'Occasion Luxury',
      color: '#20969B',
    },
    image: '/images/product-05.webp',
    sizes: ['4 سنوات', '5 سنوات', '6 سنوات'],
    fabric: {
      ar: 'تول ناعم مضاعف مع بطانة قطن 100%',
      en: 'Ultra-soft Tulle with 100% Cotton Lining',
    },
    care: {
      ar: 'تنظيف جاف أو غسيل يدوي بماء بارد',
      en: 'Dry clean or cold hand wash',
    },
  },
  {
    id: 'prod-06',
    slug: 'starry-navy-tee-shorts',
    name: {
      ar: 'تيشيرت كحلي بنجوم مع شورت بيج',
      en: 'Starry Navy Tee & Beige Shorts',
    },
    shortDesc: {
      ar: 'طقم متناسق بطابع كلاسيكي، تيشيرت كحلي مزدان بالنجوم مع شورت برمودا بيج.',
      en: 'Sophisticated contrast set with navy star graphic tee and tailored beige shorts.',
    },
    fullDesc: {
      ar: 'مزيج فاخر بين الكاجوال والأناقة الرسمية للزيارات. شورت يحتوي على جيوب عملية وقماش قطن تويل عالي التحمل ضد التمزق وسريع الجفاف.',
      en: 'Smart-casual balance for family visits. Features durable twill cotton shorts with deep functional pockets and breathable starry crewneck.',
    },
    price: 89,
    ageCategory: '7-9y',
    ageLabel: {
      ar: '7-9 سنين',
      en: '7-9 Years',
    },
    badge: {
      ar: 'طقم أنيق',
      en: 'Smart Set',
      color: '#3B4B59',
    },
    image: '/images/product-06.webp',
    sizes: ['7 سنوات', '8 سنوات', '9 سنوات'],
    fabric: {
      ar: 'تيشيرت قطن 100%، شورت قطن تويل فاخر',
      en: '100% Cotton Top, Premium Twill Bottom',
    },
    care: {
      ar: 'غسيل عادي 40 درجة مئوية',
      en: 'Normal wash 40°C',
    },
  },
  {
    id: 'prod-07',
    slug: 'soft-pink-hoodie-denim',
    name: {
      ar: 'هودي وردي ناعم مع جينز',
      en: 'Soft Pastel Pink Hoodie & Denim',
    },
    shortDesc: {
      ar: 'طقم شتوي مريح يجمع بين هودي بلون الباستيل الوردي وبنطلون جينز مرن.',
      en: 'Effortless cool look featuring pastel pink hoodie paired with flex-fit denim.',
    },
    fullDesc: {
      ar: 'مفضل للفتيات في عمر المدارس، قماش قطني فاخر ثقيل وناعم، الجينز بخصر قابل للتعديل ليتناسب مع نمو الطفلة ويوفر أقصى راحة في الحركة.',
      en: 'Beloved by school-age girls, heavyweight velvety cotton hoodie paired with adjustable waistband stretch denim for seamless movement.',
    },
    price: 169,
    ageCategory: '10-12y',
    ageLabel: {
      ar: '10-12 سنة',
      en: '10-12 Years',
    },
    badge: {
      ar: 'الأحدث',
      en: 'Trending',
      color: '#F497A9',
    },
    image: '/images/product-07.webp',
    sizes: ['10 سنوات', '11 سنة', '12 سنة'],
    fabric: {
      ar: '85% قطن، 15% بوليستر، جينز ستريتش مرن',
      en: '85% Cotton, 15% Poly, Stretch Denim',
    },
    care: {
      ar: 'غسيل على البارد بدون مبيضات',
      en: 'Cold cycle, wash dark colors separately',
    },
  },
  {
    id: 'prod-08',
    slug: 'baby-cotton-yellow-romper',
    name: {
      ar: 'رومبر أصفر قطني للرضع',
      en: 'Sunny Yellow Organic Cotton Romper',
    },
    shortDesc: {
      ar: 'رومبر قطعة واحدة مريح ولطيف مع أزرار كبس سهلة لتبديل الحفاض بسرعة.',
      en: 'One-piece sunny yellow onesie with nickel-free snaps for swift diaper changes.',
    },
    fullDesc: {
      ar: 'معقم ومصمم خصيصاً لبشرة حديثي الولادة الحساسة بدون أي بطاقات حياكة مسببة للحكة. أزرار كبس خالية من النيكل وفتحة رقبة متسعة مريحة.',
      en: 'Sanitized and tailored for newborn sensitive skin. Tagless label to prevent itching, nickel-free snaps, and envelope neck for easy changes.',
    },
    price: 79,
    ageCategory: '0-12m',
    ageLabel: {
      ar: '0-12 شهر',
      en: '0-12 Months',
    },
    badge: {
      ar: 'أولى خطوات طفلك',
      en: 'Baby First',
      color: '#F9A620',
    },
    image: '/images/product-08.webp',
    sizes: ['0-3 شهور', '3-6 شهور', '6-9 شهور', '9-12 شهر'],
    fabric: {
      ar: '100% قطن عضوي ناعم معتمد OEKO-TEX',
      en: '100% OEKO-TEX Certified Organic Cotton',
    },
    care: {
      ar: 'غسيل بمساحيق ملابس الرضع المعتمدة',
      en: 'Wash with baby-safe sensitive detergents',
    },
  },
  {
    id: 'prod-09',
    slug: 'navy-pinafore-white-blouse',
    name: {
      ar: 'فستان كحلي (بينافور) مع بلوزة بيضاء',
      en: 'Navy Pinafore & White Blouse Set',
    },
    shortDesc: {
      ar: 'إطلالة كلاسيكية ساحرة لفستان صدار كحلي مع قميص أبيض بياقة بيتر بان.',
      en: 'Charming vintage aesthetic navy pinafore paired with Peter Pan collar blouse.',
    },
    fullDesc: {
      ar: 'تصميم أوروبي عريق يناسب الزيارات والتقاط صور الذكريات الأولى. أزرار أمامية أنيقة وقماش مقاوم للتجعد يحافظ على رونقه طوال اليوم.',
      en: 'Timeless European cut ideal for family celebrations and milestone photos. Wrinkle-resistant cotton blend with elegant pearlescent buttons.',
    },
    price: 119,
    ageCategory: '1-3y',
    ageLabel: {
      ar: '1-3 سنين',
      en: '1-3 Years',
    },
    badge: {
      ar: 'كلاسيك راقي',
      en: 'Timeless Classic',
      color: '#3B4B59',
    },
    image: '/images/product-09.webp',
    sizes: ['1 سنة', '2 سنة', '3 سنوات'],
    fabric: {
      ar: 'مزيج قطن وبوليفيسكوز فائق النعومة',
      en: 'Soft Cotton & Poly-viscose Blend',
    },
    care: {
      ar: 'غسيل يدوي أو دورة أقمشة رقيقة',
      en: 'Hand wash or delicate machine cycle',
    },
  },
];

export const BUNDLES: BundleItem[] = [
  {
    id: 'bundle-01',
    title: {
      ar: 'باقة "أميرتي الأنيقة"',
      en: '"My Little Princess" Duo Bundle',
    },
    desc: {
      ar: 'فستان الورد الصيفي + فستان حفلات التول الفاخر لمناسبات طفلتك السعيدة.',
      en: 'Floral Summer Dress + Luxury Tulle Party Gown for unforgettable occasions.',
    },
    productIds: ['prod-01', 'prod-05'],
    originalPrice: 348,
    discountedPrice: 313,
    discountPercent: 10,
    badge: {
      ar: 'خصم 10% تلقائي',
      en: 'Save 10%',
    },
    tagline: {
      ar: 'وفّري 35 ر.س عند شراء الفستانين معاً',
      en: 'Save 35 SAR when bought together',
    },
  },
  {
    id: 'bundle-02',
    title: {
      ar: 'باقة "المغامر الصغير"',
      en: '"Little Adventurer" Explorer Bundle',
    },
    desc: {
      ar: 'طقم التيشيرت الأبيض والشورت التركواز + تيشيرت قوس قزح البرتقالي.',
      en: 'White & Turquoise Duo Set + Sunset Rainbow Orange Tee for active summer days.',
    },
    productIds: ['prod-03', 'prod-02'],
    originalPrice: 168,
    discountedPrice: 151,
    discountPercent: 10,
    badge: {
      ar: 'الأكثر توفيراً',
      en: 'Best Value',
    },
    tagline: {
      ar: 'وفّري 17 ر.س وتألّقي بإطلالتين صيفيتين',
      en: 'Save 17 SAR on 2 cheerful summer looks',
    },
  },
  {
    id: 'bundle-03',
    title: {
      ar: 'باقة "شتاء دافئ"',
      en: '"Cozy Winter" Snuggle Bundle',
    },
    desc: {
      ar: 'هودي أصفر دافئ مع بنطلون + هودي وردي ناعم مع جينز مرن.',
      en: 'Cozy Yellow Hoodie Set + Soft Pink Hoodie & Flex Denim for chilly seasons.',
    },
    productIds: ['prod-04', 'prod-07'],
    originalPrice: 348,
    discountedPrice: 313,
    discountPercent: 10,
    badge: {
      ar: 'دفء وأناقة',
      en: 'Warmth & Style',
    },
    tagline: {
      ar: 'وفّري 35 ر.س مع قطن الفليس الفاخر',
      en: 'Save 35 SAR with premium winter fleece',
    },
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: {
      ar: 'أم فيصل',
      en: 'Om Faisal',
    },
    city: {
      ar: 'الرياض',
      en: 'Riyadh',
    },
    rating: 5,
    comment: {
      ar: 'الخامة قطنية باردة وتغسيلها ممتاز، والأهم المقاس مظبوط بالملي!',
      en: 'The cotton fabric is super breathable and washes like a dream. Most importantly, sizing was 100% spot on!',
    },
    verified: true,
    highlight: {
      ar: 'المقاس مظبوط بالملي',
      en: 'Exact true to size',
    },
  },
  {
    id: 'rev-02',
    author: {
      ar: 'سارة العتيبي',
      en: 'Sarah Al-Otaibi',
    },
    city: {
      ar: 'جدة',
      en: 'Jeddah',
    },
    rating: 5,
    comment: {
      ar: 'التطريز طالع يجنن وفخم كأنه هدية ملكية، ووصلني الطلب خلال يومين فقط بتغليف راقي.',
      en: 'The custom embroidery looks so royal and exquisite! Delivered in just two days with gorgeous packaging.',
    },
    verified: true,
    highlight: {
      ar: 'تطريز اسم ملكي فخم',
      en: 'Royal custom embroidery',
    },
  },
  {
    id: 'rev-03',
    author: {
      ar: 'نورة الشمري',
      en: 'Noura Al-Shammari',
    },
    city: {
      ar: 'الدمام',
      en: 'Dammam',
    },
    rating: 5,
    comment: {
      ar: 'ألوان مبهجة وتفاصيل الخياطة نظيفة جداً، طفلي حب التيشيرت وما يبي يفسخه من الراحة!',
      en: 'Vibrant happy colors and flawless stitching. My little one loves the tee and refuses to take it off!',
    },
    verified: true,
    highlight: {
      ar: 'ألوان مبهجة وخياطة نظيفة',
      en: 'Vibrant and clean stitching',
    },
  },
];

export const EMBROIDERY_COLORS = [
  { id: 'pink', name: { ar: 'وردي ناعم', en: 'Pastel Pink' }, hex: '#F497A9' },
  { id: 'turquoise', name: { ar: 'تركواز بحري', en: 'Ocean Turquoise' }, hex: '#20969B' },
  { id: 'orange', name: { ar: 'برتقالي مشرق', en: 'Bright Orange' }, hex: '#F26B4E' },
  { id: 'yellow', name: { ar: 'أصفر ذهبي', en: 'Golden Yellow' }, hex: '#F9A620' },
  { id: 'navy', name: { ar: 'كحلي ملكي', en: 'Royal Navy' }, hex: '#3B4B59' },
];

export const EMBROIDERY_FONTS = [
  {
    id: 'baloo',
    name: { ar: 'بالو الدائري المبهج (الأساسي)', en: 'Baloo Playful Rounded' },
    fontFamily: "'Baloo Bhaijaan 2', cursive",
  },
  {
    id: 'naskh',
    name: { ar: 'نسخ تقليدي أنيق', en: 'Classic Clean Naskh' },
    fontFamily: "'Baloo Bhaijaan 2', serif",
  },
  {
    id: 'script',
    name: { ar: 'تطريز يدوي انسيابي', en: 'Handwritten Thread Script' },
    fontFamily: "'Baloo Bhaijaan 2', cursive",
  },
];

export const SIZE_CHART = [
  {
    age: { ar: '0-3 شهور', en: '0-3 Months' },
    height: '56 - 62 cm',
    weight: '3.5 - 5.5 kg',
  },
  {
    age: { ar: '3-6 شهور', en: '3-6 Months' },
    height: '62 - 68 cm',
    weight: '5.5 - 7.5 kg',
  },
  {
    age: { ar: '6-9 شهور', en: '6-9 Months' },
    height: '68 - 74 cm',
    weight: '7.5 - 9.0 kg',
  },
  {
    age: { ar: '9-12 شهر', en: '9-12 Months' },
    height: '74 - 80 cm',
    weight: '9.0 - 11 kg',
  },
  {
    age: { ar: '1-3 سنين', en: '1-3 Years' },
    height: '80 - 98 cm',
    weight: '11 - 15 kg',
  },
  {
    age: { ar: '4-6 سنين', en: '4-6 Years' },
    height: '104 - 116 cm',
    weight: '16 - 21 kg',
  },
  {
    age: { ar: '7-9 سنين', en: '7-9 Years' },
    height: '122 - 134 cm',
    weight: '22 - 30 kg',
  },
  {
    age: { ar: '10-12 سنة', en: '10-12 Years' },
    height: '140 - 152 cm',
    weight: '31 - 42 kg',
  },
];
