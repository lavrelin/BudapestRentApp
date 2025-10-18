// БАЗА ДАННЫХ КВАРТИР И КОМНАТ
// Cyberpunk Edition

const apartmentsData = [
  // ПРИМЕР 1: Квартира - Центр
  {
    id: 1,
    category: "apartment", // apartment / room / daily
    status: "available",
    
    title: {
      ru: "Студия в центре Будапешта",
      en: "Studio in Budapest Center"
    },
    
    description: {
      ru: "Современная студия в самом сердце города. Полностью меблирована.",
      en: "Modern studio in the heart of the city. Fully furnished."
    },
    
    district: "Central", // Central / East / West / South / North
    specificDistrict: "V", // Конкретный район (V, VI, VII и т.д.)
    address: "Váci utca 45",
    
    rooms: 1, // Количество комнат (для квартир: 1, 2, 3)
    
    pricePerMonth: 180000, // ЦЕНА В ФОРИНТАХ
    deposit: 1, // 1 или 2 месяца
    
    moveInDate: "2025-11-01",
    
    // Для кого подходит
    suitableFor: ["male", "female", "couple"], // male / female / couple
    
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260066-6bc35f0a1c84?w=800"
    ],
    
    // Ссылка на полное описание в Telegram
    telegramLink: "https://t.me/c/123456789/1",
    
    // Координаты для карты
    coordinates: {
      lat: 47.4979,
      lng: 19.0402
    },
    
    verified: "2025-10-18"
  },

  // ПРИМЕР 2: Квартира 2 комнаты - Восток
  {
    id: 2,
    category: "apartment",
    status: "available",
    
    title: {
      ru: "2-комнатная квартира в Восточном районе",
      en: "2-room apartment in East district"
    },
    
    description: {
      ru: "Просторная квартира рядом с метро Keleti. Идеально для студентов.",
      en: "Spacious apartment near Keleti metro. Perfect for students."
    },
    
    district: "East",
    specificDistrict: "VIII",
    address: "Rákóczi út 20",
    
    rooms: 2,
    
    pricePerMonth: 220000,
    deposit: 2,
    
    moveInDate: "2025-11-15",
    
    suitableFor: ["male", "female", "couple"],
    
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    
    telegramLink: "https://t.me/your_telegram",
    
    coordinates: {
      lat: 47.4925,
      lng: 19.0742
    },
    
    verified: "2025-10-19"
  },

  // ПРИМЕР 3: Квартира 3 комнаты - Запад (Buda)
  {
    id: 3,
    category: "apartment",
    status: "available",
    
    title: {
      ru: "3-комнатная квартира в Буде",
      en: "3-room apartment in Buda"
    },
    
    description: {
      ru: "Элитная квартира в тихом районе с видом на холмы.",
      en: "Luxury apartment in quiet area with hill view."
    },
    
    district: "West",
    specificDistrict: "II",
    address: "Margit körút 45",
    
    rooms: 3,
    
    pricePerMonth: 320000,
    deposit: 2,
    
    moveInDate: "2025-12-01",
    
    suitableFor: ["couple"],
    
    photos: [
      "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800"
    ],
    
    telegramLink: "https://t.me/your_telegram",
    
    coordinates: {
      lat: 47.5167,
      lng: 19.0460
    },
    
    verified: "2025-10-17"
  },

  // ПРИМЕР 4: Комната - Центр
  {
    id: 4,
    category: "room",
    status: "available",
    
    title: {
      ru: "Комната в центре (District VI)",
      en: "Room in center (District VI)"
    },
    
    description: {
      ru: "Уютная комната в 3-комнатной квартире. Общая кухня и ванная.",
      en: "Cozy room in 3-room apartment. Shared kitchen and bathroom."
    },
    
    district: "Central",
    specificDistrict: "VI",
    address: "Andrássy út 30",
    
    pricePerMonth: 95000,
    deposit: 1, // Для комнат: 1 или 2 месяца
    
    moveInDate: "2025-10-25",
    
    suitableFor: ["male", "female"],
    
    photos: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800"
    ],
    
    telegramLink: "https://t.me/your_telegram",
    
    coordinates: {
      lat: 47.5069,
      lng: 19.0633
    },
    
    verified: "2025-10-20"
  },

  // ПРИМЕР 5: Комната - Восток
  {
    id: 5,
    category: "room",
    status: "available",
    
    title: {
      ru: "Комната для студента (District IX)",
      en: "Room for student (District IX)"
    },
    
    description: {
      ru: "Недорогая комната рядом с университетами.",
      en: "Budget room near universities."
    },
    
    district: "East",
    specificDistrict: "IX",
    address: "Üllői út 10",
    
    pricePerMonth: 75000,
    deposit: 1,
    
    moveInDate: "2025-11-01",
    
    suitableFor: ["male", "female"],
    
    photos: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"
    ],
    
    telegramLink: "https://t.me/your_telegram",
    
    coordinates: {
      lat: 47.4780,
      lng: 19.0820
    },
    
    verified: "2025-10-18"
  },

  // ПРИМЕР 6: Посуточная аренда - Центр
  {
    id: 6,
    category: "daily",
    status: "available",
    
    title: {
      ru: "Апартаменты в центре (посуточно)",
      en: "Apartment in center (daily rent)"
    },
    
    description: {
      ru: "Стильные апартаменты для туристов. WiFi, кухня.",
      en: "Stylish apartment for tourists. WiFi, kitchen."
    },
    
    district: "Central",
    specificDistrict: "VII",
    address: "Kazinczy utca 15",
    
    pricePerNight: 22000, // ЦЕНА ЗА НОЧЬ В ФОРИНТАХ
    
    moveInDate: "2025-10-20",
    
    suitableFor: ["male", "female", "couple"],
    
    photos: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
    ],
    
    telegramLink: "https://t.me/your_telegram",
    
    coordinates: {
      lat: 47.4950,
      lng: 19.0630
    },
    
    verified: "2025-10-19"
  },

  // ПРИМЕР 7: Посуточная аренда - Запад
  {
    id: 7,
    category: "daily",
    status: "available",
    
    title: {
      ru: "Квартира на Буде (посуточно)",
      en: "Apartment in Buda (daily rent)"
    },
    
    description: {
      ru: "Тихое место с видом на Дунай. Парковка.",
      en: "Quiet place with Danube view. Parking."
    },
    
    district: "West",
    specificDistrict: "I",
    address: "Attila út 20",
    
    pricePerNight: 28000,
    
    moveInDate: "2025-10-21",
    
    suitableFor: ["couple"],
    
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
    ],
    
    telegramLink: "https://t.me/your_telegram",
    
    coordinates: {
      lat: 47.4960,
      lng: 19.0340
    },
    
    verified: "2025-10-20"
  },

  // ПРИМЕР 8: Комната - Юг
  {
    id: 8,
    category: "room",
    status: "available",
    
    title: {
      ru: "Комната в южном районе",
      en: "Room in South district"
    },
    
    description: {
      ru: "Бюджетная комната в спокойном районе.",
      en: "Budget room in quiet area."
    },
    
    district: "South",
    specificDistrict: "XXI",
    address: "Csepeli út 50",
    
    pricePerMonth: 68000,
    deposit: 1,
    
    moveInDate: "2025-11-05",
    
    suitableFor: ["male", "female"],
    
    photos: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800"
    ],
    
    telegramLink: "https://t.me/your_telegram",
    
    coordinates: {
      lat: 47.4250,
      lng: 19.0750
    },
    
    verified: "2025-10-17"
  },

  // ПРИМЕР 9: Квартира - Север
  {
    id: 9,
    category: "apartment",
    status: "available",
    
    title: {
      ru: "1-комнатная квартира на севере",
      en: "1-room apartment in North"
    },
    
    description: {
      ru: "Доступная квартира в зеленом районе.",
      en: "Affordable apartment in green area."
    },
    
    district: "North",
    specificDistrict: "XV",
    address: "Rákospalota, Fő út 100",
    
    rooms: 1,
    
    pricePerMonth: 145000,
    deposit: 1,
    
    moveInDate: "2025-11-10",
    
    suitableFor: ["male", "female", "couple"],
    
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    
    telegramLink: "https://t.me/your_telegram",
    
    coordinates: {
      lat: 47.5650,
      lng: 19.1320
    },
    
    verified: "2025-10-16"
  }

  // Добавляй свои объекты здесь...
  /*
  {
    id: 10,
    category: "apartment", // или "room" или "daily"
    status: "available",
    title: { ru: "...", en: "..." },
    description: { ru: "...", en: "..." },
    district: "Central", // Central/East/West/South/North
    specificDistrict: "V",
    rooms: 2, // Только для category: "apartment"
    pricePerMonth: 200000, // Для apartment/room
    // pricePerNight: 25000, // Для daily
    deposit: 1,
    moveInDate: "2025-11-20",
    suitableFor: ["male", "female", "couple"],
    photos: ["images/apt10.jpg"],
    telegramLink: "https://t.me/your_telegram",
    coordinates: { lat: 47.5000, lng: 19.0500 },
    verified: "2025-10-21"
  }
  */
];

// ТВОИ КОНТАКТЫ - ОБЯЗАТЕЛЬНО ЗАМЕНИ!
const ownerContacts = {
  name: {
    ru: "Александр",
    en: "Alexander"
  },
  telegram: "@your_telegram", // ТВОЙ TELEGRAM
  whatsapp: "+36701234567",   // ТВОЙ WHATSAPP
  facebook: "https://facebook.com/yourpage" // ТВОЙ FACEBOOK
};

// РАЙОНЫ БУДАПЕШТА
const districts = {
  Central: {
    name: { ru: "Центр", en: "Central" },
    description: { 
      ru: "V, VI, VII • Туристический центр, дорогие квартиры, рестораны, бары",
      en: "V, VI, VII • Tourist center, expensive apartments, restaurants, bars"
    },
    specificDistricts: ["V", "VI", "VII"]
  },
  East: {
    name: { ru: "Восточный", en: "East" },
    description: { 
      ru: "VIII, IX, X, XIV • Студенческие районы, вокзал Keleti, средние цены",
      en: "VIII, IX, X, XIV • Student areas, Keleti station, medium prices"
    },
    specificDistricts: ["VIII", "IX", "X", "XIV"]
  },
  West: {
    name: { ru: "Западный (Buda)", en: "West (Buda)" },
    description: { 
      ru: "I, II, III, XI, XII • Элитные районы, зеленые холмы, семьи",
      en: "I, II, III, XI, XII • Luxury areas, green hills, families"
    },
    specificDistricts: ["I", "II", "III", "XI", "XII"]
  },
  South: {
    name: { ru: "Южный", en: "South" },
    description: { 
      ru: "XI (часть), XX, XXI • Жилые районы, средние цены, хороший транспорт",
      en: "XI (part), XX, XXI • Residential areas, medium prices, good transport"
    },
    specificDistricts: ["XX", "XXI"]
  },
  North: {
    name: { ru: "Северный", en: "North" },
    description: { 
      ru: "III, XV-XIX, XXII, XXIII • Окраины, бюджетная аренда, зелень",
      en: "III, XV-XIX, XXII, XXIII • Suburbs, budget rent, greenery"
    },
    specificDistricts: ["III", "XV", "XVI", "XVII", "XVIII", "XIX", "XXII", "XXIII"]
  }
};
