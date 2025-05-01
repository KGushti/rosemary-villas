
export interface Chalet {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  rating: number;
  features: string[];
  images: string[];
  location: string;
}

export const chalets: Chalet[] = [
  {
    id: "chalet-1",
    name: "شاليه الزرقاء",
    description: "شاليه فاخر مع مسبح وإطلالة رائعة على الحدائق المحيطة",
    longDescription: "استمتع بإقامة فاخرة في شاليه الزرقاء الاستثنائي الذي يتميز بتصميم عصري وإطلالة مميزة. يضم الشاليه مسبحاً خاصاً ومناطق استرخاء واسعة مع حدائق محيطة خضراء. الشاليه مجهز بالكامل لمنحك إقامة مريحة ومميزة مع خدمات راقية وموقع مثالي.",
    price: 750,
    rating: 4.8,
    features: [
      "مسبح خاص",
      "منطقة شواء",
      "واي فاي مجاني",
      "موقف سيارات مجاني",
      "نظام أمان متطور",
      "تراس خارجي",
      "مطبخ مجهز بالكامل"
    ],
    images: [
      "public/lovable-uploads/f33aa24b-d1a0-4a1a-885e-95773641f233.png",
      "public/lovable-uploads/1b9d47b8-6ef3-4454-85f7-e90ec2087a33.png",
      "public/lovable-uploads/66736bf9-6a12-4868-886d-5b832087aafd.png",
      "public/lovable-uploads/a5ebdd8e-0acc-4dca-a1ef-78b0161247ab.png"
    ],
    location: "منطقة الباعيش، تاجوراء، طرابلس"
  },
  {
    id: "chalet-2",
    name: "شاليه النخيل",
    description: "شاليه مع مسبح داخلي مدفأ ومنطقة العاب للأطفال",
    longDescription: "شاليه النخيل هو وجهتك المثالية للاسترخاء والمتعة مع العائلة والأصدقاء. يتميز الشاليه بمسبح داخلي مدفأ يمكنك الاستمتاع به في جميع الأوقات، بالإضافة إلى منطقة ألعاب للأطفال. التصميم الداخلي أنيق ومريح مع غرف واسعة ومجهزة بأحدث وسائل الراحة.",
    price: 850,
    rating: 4.7,
    features: [
      "مسبح داخلي مدفأ",
      "منطقة ألعاب للأطفال",
      "جاكوزي",
      "مطبخ حديث",
      "تلفاز مع قنوات فضائية",
      "تكييف مركزي",
      "نظام صوتي متكامل"
    ],
    images: [
      "public/lovable-uploads/26e54686-1603-4e59-a027-1c59f074f546.png",
      "public/lovable-uploads/c3936b60-1568-4fa1-ae11-9a4ca8bc894c.png",
      "public/lovable-uploads/562e0ef9-c9b1-4bff-b9d8-cd77e0578f67.png",
      "public/lovable-uploads/e44a96cb-676f-46a4-884c-def4df6d6a0b.png"
    ],
    location: "منطقة الباعيش، تاجوراء، طرابلس"
  },
  {
    id: "chalet-3",
    name: "شاليه المرجان",
    description: "شاليه فاخر مع حديقة واسعة وألعاب للأطفال ومساحات مفتوحة",
    longDescription: "شاليه المرجان هو الخيار المثالي للباحثين عن الراحة والخصوصية. يتميز بحديقة واسعة وألعاب للأطفال، مما يجعله مناسباً للعائلات. يضم الشاليه مساحات مفتوحة للاسترخاء وقضاء أوقات ممتعة مع الأصدقاء والعائلة. التصميم الداخلي عصري وأنيق مع كافة وسائل الراحة.",
    price: 700,
    rating: 4.6,
    features: [
      "حديقة واسعة",
      "منطقة ألعاب للأطفال",
      "ترامبولين",
      "أرجوحة",
      "منطقة شواء",
      "جلسات خارجية",
      "مطبخ مجهز"
    ],
    images: [
      "public/lovable-uploads/381d24d2-05c9-41c9-8bec-34721ac33003.png",
      "public/lovable-uploads/a5ebdd8e-0acc-4dca-a1ef-78b0161247ab.png",
      "public/lovable-uploads/1b9d47b8-6ef3-4454-85f7-e90ec2087a33.png",
      "public/lovable-uploads/f33aa24b-d1a0-4a1a-885e-95773641f233.png"
    ],
    location: "منطقة الباعيش، تاجوراء، طرابلس"
  }
];

export const reviews = [
  {
    id: "1",
    chaletId: "chalet-1",
    name: "محمد عبدالله",
    rating: 5,
    comment: "أفضل مكان قضيت فيه إجازتي! المسبح رائع والمكان نظيف جداً وموظفي الخدمة متعاونين.",
    date: "2023-08-15"
  },
  {
    id: "2",
    chaletId: "chalet-1",
    name: "فاطمة احمد",
    rating: 4,
    comment: "مكان جميل وهادئ، استمتعت كثيراً بالإقامة فيه. الخدمات ممتازة والمسبح نظيف.",
    date: "2023-07-22"
  },
  {
    id: "3",
    chaletId: "chalet-2",
    name: "خالد محمود",
    rating: 5,
    comment: "المكان أكثر من رائع، المسبح الداخلي كان ممتازاً والأطفال استمتعوا كثيراً بمنطقة الألعاب.",
    date: "2023-08-05"
  },
  {
    id: "4",
    chaletId: "chalet-2",
    name: "عائشة علي",
    rating: 4,
    comment: "قضينا وقتاً ممتعاً في شاليه النخيل. المكان نظيف ومرتب والتكييف ممتاز.",
    date: "2023-07-30"
  },
  {
    id: "5",
    chaletId: "chalet-3",
    name: "أحمد سالم",
    rating: 4,
    comment: "المكان جميل والحديقة واسعة والأطفال استمتعوا كثيراً بالألعاب الموجودة.",
    date: "2023-08-10"
  },
  {
    id: "6",
    chaletId: "chalet-3",
    name: "مريم حسن",
    rating: 5,
    comment: "شاليه رائع ومريح، قضينا فيه أجمل الأوقات. المنطقة هادئة والخدمات ممتازة.",
    date: "2023-07-18"
  }
];
