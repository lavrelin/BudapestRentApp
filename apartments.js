// БАЗА ДАННЫХ КВАРТИР
// ЗАМЕНИ НА СВОИ ДАННЫЕ!

const apartmentsData = [
  // ПРИМЕР 1: Долгосрочная аренда
  {
    id: 1,
    category: "monthly", // monthly / daily
    status: "available", // available / rented
    
    title: {
      ru: "Уютная студия в центре",
      en: "Cozy studio in the center"
    },
    
    description: {
      ru: "Светлая студия 30м² в самом центре Будапешта. Свежий ремонт, мебель, техника. 5 минут до метро Deák Ferenc tér. Все удобства для комфортной жизни.",
      en: "Bright 30m² studio in the heart of Budapest. Fresh renovation, furniture, appliances. 5 minutes to Deák Ferenc tér metro. All amenities for comfortable living."
    },
    
    district: "District V",
    address: "Váci utca 45",
    
    pricePerMonth: 180000, // ЦЕНА В ФОРИНТАХ
    deposit: 1, // месяцев депозита
    
    moveInDate: "2025-10-28", // дата заселения (формат: YYYY-MM-DD)
    
    type: "studio", // studio / 1room / 2room / shared
    
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260066-6bc35f0a1c84?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    
    verified: "2025-10-15" // дата проверки
  },

  // ПРИМЕР 2: Однокомнатная квартира
  {
    id: 2,
    category: "monthly",
    status: "available",
    
    title: {
      ru: "1-комнатная в Терезвароше",
      en: "1-room in Terézváros"
    },
    
    description: {
      ru: "Отличная квартира в центре. Просторная, светлая, со всей необходимой мебелью. Рядом метро Oktogon.",
      en: "Great apartment in the center. Spacious, bright, with all necessary furniture. Near Oktogon metro."
    },
    
    district: "District VI",
    address: "Andrássy út 20",
    
    pricePerMonth: 220000,
    deposit: 2,
    
    moveInDate: "2025-11-01",
    
    type: "1room",
    
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
    ],
    
    verified: "2025-10-16"
  },

  // ПРИМЕР 3: Посуточная аренда
  {
    id: 3,
    category: "daily",
    status: "available",
    
    title: {
      ru: "Апартаменты у Дуная",
      en: "Apartment near Danube"
    },
    
    description: {
      ru: "Апартаменты с видом на Дунай. 2 спальных места, WiFi, полностью оборудованная кухня. Идеально для туристов.",
      en: "Apartment with Danube view. 2 beds, WiFi, fully equipped kitchen. Perfect for tourists."
    },
    
    district: "District XIII",
    address: "Szent István körút 12",
    
    pricePerNight: 22000, // ЦЕНА ЗА НОЧЬ В ФОРИНТАХ
    minNights: 2, // минимум ночей
    
    amenities: {
      cleaning: "included", // included / paid / not_available
      breakfast: false,
      parking: true,
      wifi: true
    },
    
    moveInDate: "2025-10-20",
    
    type: "1room",
    
    photos: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800"
    ],
    
    verified: "2025-10-17"
  },

  // ПРИМЕР 4: Посуточная студия
  {
    id: 4,
    category: "daily",
    status: "available",
    
    title: {
      ru: "Студия в еврейском квартале",
      en: "Studio in Jewish Quarter"
    },
    
    description: {
      ru: "Современная студия в самом сердце ночной жизни Будапешта. Руин-бары в шаговой доступности.",
      en: "Modern studio in the heart of Budapest nightlife. Ruin bars within walking distance."
    },
    
    district: "District VII",
    address: "Kazinczy utca 8",
    
    pricePerNight: 18000,
    minNights: 1,
    
    amenities: {
      cleaning: "paid",
      breakfast: false,
      parking: false,
      wifi: true
    },
    
    moveInDate: "2025-10-19",
    
    type: "studio",
    
    photos: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800"
    ],
    
    verified: "2025-10-18"
  },

  // ПРИМЕР 5: Двухкомнатная (уже сдана)
  {
    id: 5,
    category: "monthly",
    status: "rented",
    
    title: {
      ru: "2-комнатная на Margit körút",
      en: "2-room on Margit körút"
    },
    
    description: {
      ru: "Просторная 2-комнатная квартира с балконом. Отличный вид на город.",
      en: "Spacious 2-room apartment with balcony. Great city view."
    },
    
    district: "District II",
    
    pricePerMonth: 280000,
    deposit: 2,
    
    rentedDate: "2025-09-20", // дата когда сдали
    
    type: "2room",
    
    photos: [
      "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800"
    ]
  },

  // ПРИМЕР 6: Студия (уже сдана)
  {
    id: 6,
    category: "monthly",
    status: "rented",
    
    title: {
      ru: "Студия у парламента",
      en: "Studio near Parliament"
    },
    
    description: {
      ru: "Маленькая, но уютная студия с видом на парламент.",
      en: "Small but cozy studio with Parliament view."
    },
    
    district: "District V",
    
    pricePerMonth: 192000,
    deposit: 1,
    
    rentedDate: "2025-10-01",
    
    type: "studio",
    
    photos: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"
    ]
  },

  // Добавь свои квартиры здесь по этому шаблону...
  /*
  {
    id: 7,
    category: "monthly", // или "daily"
    status: "available", // или "rented"
    title: { ru: "...", en: "..." },
    description: { ru: "...", en: "..." },
    district: "District ...",
    address: "...",
    pricePerMonth: 200000, // для monthly
    // pricePerNight: 20000, // для daily
    deposit: 1,
    moveInDate: "2025-11-15",
    type: "1room",
    photos: ["path/to/photo1.jpg", "path/to/photo2.jpg"],
    verified: "2025-10-18"
  }
  */
];

// ТВОИ КОНТАКТЫ - ОБЯЗАТЕЛЬНО ЗАМЕНИ!
const ownerContacts = {
  name: {
    ru: "Александр",
    en: "Alexander"
  },
  phone: "+36 70 123 4567", // твой номер
  telegram: "@your_telegram", // твой Telegram (с @)
  whatsapp: "+36 70 123 4567", // твой WhatsApp
  email: "budapest@example.com" // твой email
};

// Курс форинта к евро (примерно, обновляй если нужно)
const FORINT_TO_EUR = 400; // 1 EUR ≈ 400 HUF

// Функция для конвертации форинтов в евро (для справки)
function hufToEur(huf) {
  return Math.round(huf / FORINT_TO_EUR);
}
