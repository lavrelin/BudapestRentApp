// Инициализация карты
function initMap() {
  map = L.map('map').setView([47.4979, 19.0402], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO',
    maxZoom: 18
  }).addTo(map);

  markersLayer = L.markerClusterGroup({
    iconCreateFunction: function(cluster) {
      const count = cluster.getChildCount();
      return L.divIcon({
        html: `<div style="background: var(--gold); color: var(--dark-navy); border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 0 25px var(--gold); font-size: 1.1rem;">${count}</div>`,
        className: 'custom-cluster',
        iconSize: L.point(45, 45)
      });
    }
  });

  map.addLayer(markersLayer);
  updateMapMarkers();
}

// Обновление маркеров на карте
function updateMapMarkers() {
  markersLayer.clearLayers();

  filteredApartments.forEach(apt => {
    if (!apt.coordinates) return;

    const color = apt.category === 'room' ? '#4A90E2' : '#D4AF37';
    const icon = L.divIcon({
      html: `<div style="background: ${color}; border: 3px solid #fff; border-radius: 50%; width: 24px; height: 24px; box-shadow: 0 0 20px ${color};"></div>`,
      className: 'custom-marker',
      iconSize: L.point(24, 24)
    });

    const marker = L.marker([apt.coordinates.lat, apt.coordinates.lng], { icon: icon });

    const price = apt.category === 'daily' ? 
      `${apt.pricePerNight.toLocaleString()} Ft${translations[currentLang].perNight}` :
      `${apt.pricePerMonth.toLocaleString()} Ft${translations[currentLang].perMonth}`;

    const type = apt.category === 'apartment' ? 
      `${apt.rooms} ${translations[currentLang].roomsCount}` :
      translations[currentLang].legendRoom;

    const popupContent = `
      <div style="font-family: 'Inter', sans-serif; min-width: 220px; padding: 0.5rem;">
        <h3 style="margin: 0 0 0.75rem 0; color: #000; font-weight: 700; font-size: 1.1rem;">${apt.title[currentLang]}</h3>
        <p style="margin: 0.5rem 0; font-size: 1.2rem; font-weight: 800; color: ${color};">${price}</p>
        <p style="margin: 0.5rem 0; color: #666;">${districts[apt.district].name[currentLang]}</p>
        <p style="margin: 0.// ГЛАВНАЯ ЛОГИКА САЙТА - Premium Edition

let currentLang = 'en';
let activeTab = 'longterm';
let filteredApartments = [];
let currentSort = 'newest';
let map;
let markersLayer;

// Переводы
const translations = {
  en: {
    longterm: "Long-term",
    daily: "Daily",
    offer: "Offer Your Apartment",
    search: "Search",
    featured: "Featured Properties",
    featuredDesc: "Handpicked exclusive apartments just for you",
    legendApartment: "Apartment",
    legendRoom: "Room",
    apply: "Apply",
    reset: "Reset",
    sortBy: "Sort by",
    sortNewest: "Newest",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    district: "District",
    allDistricts: "All Districts",
    price: "Price",
    from: "from",
    to: "to",
    propertyType: "Type",
    allTypes: "All Types",
    apartments: "Apartments",
    rooms: "Rooms",
    roomsCount: "Rooms",
    deposit: "Deposit",
    "1month": "1 month",
    "2months": "2 months",
    availableFrom: "Available from",
    perMonth: "/mo",
    perNight: "/night",
    fullDescription: "Full Description",
    contact: "Contact",
    suitableFor: "Suitable for",
    male: "Male",
    female: "Female",
    couple: "Couple",
    verified: "Verified",
    about: "About",
    aboutText: "Premium platform for finding apartments and rooms in Budapest. Verified properties, direct contact with owners, no commissions.",
    districts: "Districts",
    noResults: "No results found",
    tryFilters: "Try adjusting filters",
    description: "Description",
    details: "Details",
    priceLabel: "Price",
    depositLabel: "Deposit",
    districtLabel: "District",
    typeLabel: "Type",
    moveInLabel: "Available from",
    searchTitle: "Property Search",
    searchDesc: "Fill out the form and we'll notify you as soon as a suitable property becomes available",
    searchName: "Your Name",
    searchContact: "Contact (Telegram/WhatsApp)",
    searchDistrict: "Preferred District",
    searchBudget: "Budget (Ft/month)",
    searchType: "Property Type",
    searchComment: "Additional Requirements",
    searchSubmit: "🔔 Notify Me"
  },
  ru: {
    longterm: "Долгосрочно",
    daily: "Посуточно",
    offer: "Предложить квартиру",
    search: "Поиск",
    featured: "Избранные объекты",
    featuredDesc: "Отобранные эксклюзивные квартиры специально для вас",
    legendApartment: "Квартира",
    legendRoom: "Комната",
    apply: "Применить",
    reset: "Сбросить",
    sortBy: "Сортировка",
    sortNewest: "Новые",
    sortPriceAsc: "Цена: по возрастанию",
    sortPriceDesc: "Цена: по убыванию",
    district: "Район",
    allDistricts: "Все районы",
    price: "Цена",
    from: "от",
    to: "до",
    propertyType: "Тип",
    allTypes: "Все типы",
    apartments: "Квартиры",
    rooms: "Комнаты",
    roomsCount: "Комнат",
    deposit: "Депозит",
    "1month": "1 месяц",
    "2months": "2 месяца",
    availableFrom: "Доступна с",
    perMonth: "/мес",
    perNight: "/ночь",
    fullDescription: "Полное описание",
    contact: "Связаться",
    suitableFor: "Подходит для",
    male: "Парень",
    female: "Девушка",
    couple: "Пара",
    verified: "Проверено",
    about: "О сайте",
    aboutText: "Премиум-платформа для поиска квартир и комнат в Будапеште. Проверенные объекты, прямой контакт с владельцами, без комиссий.",
    districts: "Районы",
    noResults: "Ничего не найдено",
    tryFilters: "Попробуйте изменить фильтры",
    description: "Описание",
    details: "Детали",
    priceLabel: "Цена",
    depositLabel: "Депозит",
    districtLabel: "Район",
    typeLabel: "Тип",
    moveInLabel: "Доступна с",
    searchTitle: "Поиск недвижимости",
    searchDesc: "Заполните форму, и мы уведомим вас, как только появится подходящий вариант",
    searchName: "Ваше имя",
    searchContact: "Контакт (Telegram/WhatsApp)",
    searchDistrict: "Предпочтительный район",
    searchBudget: "Бюджет (Ft/мес)",
    searchType: "Тип недвижимости",
    searchComment: "Дополнительные требования",
    searchSubmit: "🔔 Уведомить меня"
  }
};

// Фильтры
let filters = {
  district: 'all',
  priceMin: '',
  priceMax: '',
  propertyType: 'all',
  rooms: 'all',
  deposit: 'all',
  moveInDate: ''
};

// Рендер избранных квартир (первые 3-6)
function renderFeatured() {
  const featured = apartmentsData
    .filter(apt => apt.status === 'available')
    .slice(0, 6);
  
  if (featured.length === 0) return;
  
  const html = `<div class="apartments-grid">${featured.map(apt => createApartmentCard(apt)).join('')}</div>`;
  document.getElementById('featuredContainer').innerHTML = html;
}

// Создание карточки квартиры
function createApartmentCard(apt) {
  const title = apt.title[currentLang];
  const price = apt.category === 'daily' ? apt.pricePerNight : apt.pricePerMonth;
  const priceLabel = apt.category === 'daily' ? 
    translations[currentLang].perNight : 
    translations[currentLang].perMonth;

  const typeLabel = apt.category === 'room' ? 
    translations[currentLang].legendRoom :
    `${apt.rooms} ${translations[currentLang].roomsCount}`;

  const suitableForText = apt.suitableFor.map(s => translations[currentLang][s]).join(', ');

  return `
    <div class="apartment-card">
      <div class="apartment-image">
        <img src="${apt.photos[0]}" alt="${title}" loading="lazy">
        <div class="badge badge-type">${typeLabel}</div>
        ${apt.verified ? `<div class="badge badge-verified">✓ ${translations[currentLang].verified}</div>` : ''}
      </div>

      <div class="apartment-info">
        <h3 class="apartment-title">${title}</h3>
        
        <div class="apartment-details">
          <div class="detail-row">
            <span class="detail-icon">📍</span>
            <span>${districts[apt.district].name[currentLang]}</span>
          </div>

          <div class="detail-row">
            <span class="detail-icon">💎</span>
            <span class="price">${price.toLocaleString()} Ft${priceLabel}</span>
          </div>

          ${apt.category !== 'daily' ? `
            <div class="detail-row">
              <span class="detail-icon">💰</span>
              <span>${translations[currentLang].deposit}: ${apt.deposit} ${apt.deposit === 1 ? translations[currentLang]['1month'] : translations[currentLang]['2months']}</span>
            </div>
          ` : ''}

          ${apt.moveInDate ? `
            <div class="detail-row">
              <span class="detail-icon">📅</span>
              <span>${translations[currentLang].availableFrom} ${apt.moveInDate}</span>
            </div>
          ` : ''}

          <div class="detail-row">
            <span class="detail-icon">👤</span>
            <span>${translations[currentLang].suitableFor}: ${suitableForText}</span>
          </div>
        </div>

        <div class="apartment-actions">
          <button onclick="openDetails(${apt.id})">
            ${translations[currentLang].fullDescription}
          </button>
          <div class="contact-row">
            <a href="https://t.me/${ownerContacts.telegram.replace('@', '')}" target="_blank" class="contact-btn">TG</a>
            <a href="https://wa.me/${ownerContacts.whatsapp.replace(/\D/g, '')}" target="_blank" class="contact-btn">WA</a>
            <a href="${ownerContacts.facebook}" target="_blank" class="contact-btn">FB</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Инициализация карты
function initMap() {
  // Центр Будапешта
  map = L.map('map').setView([47.4979, 19.0402], 12);

  // Темная киберпанк-тема карты
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO',
    maxZoom: 18
  }).addTo(map);

  // Слой для маркеров с кластеризацией
  markersLayer = L.markerClusterGroup({
    iconCreateFunction: function(cluster) {
      const count = cluster.getChildCount();
      let color = '#00f3ff';
      
      return L.divIcon({
        html: `<div style="background: ${color}; color: #000; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 0 20px ${color};">${count}</div>`,
        className: 'custom-cluster',
        iconSize: L.point(40, 40)
      });
    }
  });

  map.addLayer(markersLayer);
  updateMapMarkers();
}

// Обновление маркеров на карте
function updateMapMarkers() {
  markersLayer.clearLayers();

  filteredApartments.forEach(apt => {
    if (!apt.coordinates) return;

    // Цвет маркера: синий для квартир, зеленый для комнат
    const color = apt.category === 'room' ? '#39ff14' : '#00f3ff';
    const icon = L.divIcon({
      html: `<div style="background: ${color}; border: 3px solid #fff; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 0 15px ${color};"></div>`,
      className: 'custom-marker',
      iconSize: L.point(20, 20)
    });

    const marker = L.marker([apt.coordinates.lat, apt.coordinates.lng], { icon: icon });

    // Popup с информацией
    const price = apt.category === 'daily' ? 
      `${apt.pricePerNight.toLocaleString()} Ft${translations[currentLang].perNight}` :
      `${apt.pricePerMonth.toLocaleString()} Ft${translations[currentLang].perMonth}`;

    const type = apt.category === 'apartment' ? 
      `${apt.rooms} ${translations[currentLang].roomsCount}` :
      translations[currentLang].legendRoom;

    const popupContent = `
      <div style="font-family: 'Rajdhani', sans-serif; min-width: 200px;">
        <h3 style="margin: 0 0 10px 0; color: ${color}; font-weight: 700;">${apt.title[currentLang]}</h3>
        <p style="margin: 5px 0; font-size: 1.1rem; font-weight: 700;">${price}</p>
        <p style="margin: 5px 0; color: #666;">${districts[apt.district].name[currentLang]}</p>
        <p style="margin: 5px 0; color: #666;">${type}</p>
        <a href="${apt.telegramLink}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: linear-gradient(135deg, #00f3ff 0%, #b026ff 100%); color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">${translations[currentLang].fullDescription}</a>
      </div>
    `;

    marker.bindPopup(popupContent);
    markersLayer.addLayer(marker);
  });
}

// Переключение языка
function toggleLang() {
  currentLang = currentLang === 'en' ? 'ru' : 'en';
  document.getElementById('langText').textContent = currentLang === 'en' ? 'RU' : 'EN';
  translatePage();
  renderFilters();
  applyFilters();
}

function translatePage() {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}

// Переключение вкладок
function setActiveTab(tab) {
  activeTab = tab;
  
  // Обновляем активную кнопку
  const buttons = document.querySelectorAll('.nav-desktop button');
  buttons.forEach((btn, idx) => {
    btn.classList.remove('active');
    if ((tab === 'longterm' && idx === 0) || 
        (tab === 'daily' && idx === 1)) {
      btn.classList.add('active');
    }
  });
  
  renderFilters();
  applyFilters();
}

// Обновление сортировки
function updateSort(sortType) {
  currentSort = sortType;
  applyFilters();
}

// Рендер фильтров
function renderFilters() {
  let html = `
    <div class="filter-group">
      <label>${translations[currentLang].district}</label>
      <select id="filterDistrict" onchange="updateFilter('district', this.value)">
        <option value="all">${translations[currentLang].allDistricts}</option>
        ${Object.keys(districts).map(key => 
          `<option value="${key}" ${filters.district === key ? 'selected' : ''}>${districts[key].name[currentLang]}</option>`
        ).join('')}
      </select>
    </div>

    <div class="filter-group">
      <label>${translations[currentLang].price}</label>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <input type="number" id="filterPriceMin" placeholder="${translations[currentLang].from}" 
               value="${filters.priceMin}" onchange="updateFilter('priceMin', this.value)" 
               style="flex: 1;">
        <span>-</span>
        <input type="number" id="filterPriceMax" placeholder="${translations[currentLang].to}" 
               value="${filters.priceMax}" onchange="updateFilter('priceMax', this.value)"
               style="flex: 1;">
      </div>
    </div>
  `;

  // Фильтры для долгосрочной аренды
  if (activeTab === 'longterm') {
    html += `
      <div class="filter-group">
        <label>${translations[currentLang].propertyType}</label>
        <select id="filterPropertyType" onchange="updateFilter('propertyType', this.value)">
          <option value="all">${translations[currentLang].allTypes}</option>
          <option value="apartment" ${filters.propertyType === 'apartment' ? 'selected' : ''}>${translations[currentLang].apartments}</option>
          <option value="room" ${filters.propertyType === 'room' ? 'selected' : ''}>${translations[currentLang].rooms}</option>
        </select>
      </div>
    `;

    // Показываем фильтр комнат только если выбраны квартиры
    if (filters.propertyType === 'all' || filters.propertyType === 'apartment') {
      html += `
        <div class="filter-group">
          <label>${translations[currentLang].roomsCount}</label>
          <select id="filterRooms" onchange="updateFilter('rooms', this.value)">
            <option value="all">${translations[currentLang].allTypes}</option>
            <option value="1" ${filters.rooms === '1' ? 'selected' : ''}>1</option>
            <option value="2" ${filters.rooms === '2' ? 'selected' : ''}>2</option>
            <option value="3" ${filters.rooms === '3' ? 'selected' : ''}>3</option>
          </select>
        </div>
      `;
    }

    html += `
      <div class="filter-group">
        <label>${translations[currentLang].deposit}</label>
        <select id="filterDeposit" onchange="updateFilter('deposit', this.value)">
          <option value="all">${translations[currentLang].allTypes}</option>
          <option value="1" ${filters.deposit === '1' ? 'selected' : ''}>${translations[currentLang]['1month']}</option>
          <option value="2" ${filters.deposit === '2' ? 'selected' : ''}>${translations[currentLang]['2months']}</option>
        </select>
      </div>
    `;
  }

  document.getElementById('filtersGrid').innerHTML = html;
  
  // Обновляем селект сортировки
  const sortOptions = document.querySelectorAll('#sortSelect option');
  sortOptions.forEach((opt, idx) => {
    const keys = ['sortNewest', 'sortPriceAsc', 'sortPriceDesc'];
    opt.textContent = translations[currentLang][keys[idx]];
  });
  document.querySelector('label[data-translate="sortBy"]').textContent = translations[currentLang].sortBy + ':';
}

// Обновление фильтра
function updateFilter(key, value) {
  filters[key] = value;
}

// Применение фильтров
function applyFilters() {
  let filtered = apartmentsData.filter(apt => {
    // Фильтр по категории (долгосрочно = квартиры + комнаты)
    if (activeTab === 'longterm' && apt.category === 'daily') return false;
    if (activeTab === 'daily' && apt.category !== 'daily') return false;

    // Фильтр по району
    if (filters.district !== 'all' && apt.district !== filters.district) return false;

    // Фильтр по цене
    const price = apt.category === 'daily' ? apt.pricePerNight : apt.pricePerMonth;
    if (filters.priceMin && price < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && price > parseInt(filters.priceMax)) return false;

    // Фильтр по типу недвижимости (только для долгосрочной)
    if (activeTab === 'longterm' && filters.propertyType !== 'all') {
      if (filters.propertyType !== apt.category) return false;
    }

    // Фильтр по количеству комнат (только для квартир)
    if (filters.rooms !== 'all' && apt.category === 'apartment') {
      if (apt.rooms !== parseInt(filters.rooms)) return false;
    }

    // Фильтр по депозиту
    if (filters.deposit !== 'all' && apt.deposit !== parseInt(filters.deposit)) return false;

    return true;
  });

  // Сортировка
  filtered.sort((a, b) => {
    const priceA = a.category === 'daily' ? a.pricePerNight : a.pricePerMonth;
    const priceB = b.category === 'daily' ? b.pricePerNight : b.pricePerMonth;

    switch (currentSort) {
      case 'newest':
        // Сортируем по ID (предполагаем, что больший ID = новее)
        return b.id - a.id;
      case 'priceAsc':
        return priceA - priceB;
      case 'priceDesc':
        return priceB - priceA;
      default:
        return 0;
    }
  });

  filteredApartments = filtered;
  renderApartments();
  updateMapMarkers();
}

// Сброс фильтров
function resetFilters() {
  filters = {
    district: 'all',
    priceMin: '',
    priceMax: '',
    propertyType: 'all',
    rooms: 'all',
    deposit: 'all',
    moveInDate: ''
  };
  currentSort = 'newest';
  document.getElementById('sortSelect').value = 'newest';
  renderFilters();
  applyFilters();
} false;
    }

    // Фильтр по депозиту
    if (filters.deposit !== 'all' && apt.deposit !== parseInt(filters.deposit)) return false;

    return true;
  });

  filteredApartments = filtered;
  renderApartments();
  updateMapMarkers();
}

// Сброс фильтров
function resetFilters() {
  filters = {
    district: 'all',
    priceMin: '',
    priceMax: '',
    rooms: 'all',
    deposit: 'all',
    moveInDate: ''
  };
  renderFilters();
  applyFilters();
}

// Рендер квартир
function renderApartments() {
  const container = document.getElementById('apartmentsContainer');
  
  if (filteredApartments.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem; color: var(--neon-blue);">
        <h2 style="font-family: 'Orbitron', sans-serif; font-size: 2rem; margin-bottom: 1rem;" class="neon-text">${translations[currentLang].noResults}</h2>
        <p style="color: rgba(255, 255, 255, 0.6);">${translations[currentLang].tryFilters}</p>
      </div>
    `;
    return;
  }

  const cardsHtml = filteredApartments.map(apt => {
    const title = apt.title[currentLang];
    const price = apt.category === 'daily' ? apt.pricePerNight : apt.pricePerMonth;
    const priceLabel = apt.category === 'daily' ? 
      translations[currentLang].perNight : 
      translations[currentLang].perMonth;

    const typeLabel = apt.category === 'room' ? 
      translations[currentLang].legendRoom :
      `${apt.rooms} ${translations[currentLang].roomsCount}`;

    const suitableForText = apt.suitableFor.map(s => translations[currentLang][s]).join(', ');

    return `
      <div class="apartment-card">
        <div class="apartment-image">
          <img src="${apt.photos[0]}" alt="${title}" loading="lazy">
          <div class="badge badge-type">${typeLabel}</div>
          ${apt.verified ? `<div class="badge badge-verified">✓ ${translations[currentLang].verified}</div>` : ''}
        </div>

        <div class="apartment-info">
          <h3 class="apartment-title">${title}</h3>
          
          <div class="apartment-details">
            <div class="detail-row">
              <span class="detail-icon">📍</span>
              <span>${districts[apt.district].name[currentLang]}</span>
            </div>

            <div class="detail-row">
              <span class="detail-icon">💎</span>
              <span class="price">${price.toLocaleString()} Ft${priceLabel}</span>
            </div>

            ${apt.category !== 'daily' ? `
              <div class="detail-row">
                <span class="detail-icon">💰</span>
                <span>${translations[currentLang].deposit}: ${apt.deposit} ${apt.deposit === 1 ? translations[currentLang]['1month'] : translations[currentLang]['2months']}</span>
              </div>
            ` : ''}

            ${apt.moveInDate ? `
              <div class="detail-row">
                <span class="detail-icon">📅</span>
                <span>${translations[currentLang].availableFrom} ${apt.moveInDate}</span>
              </div>
            ` : ''}

            <div class="detail-row">
              <span class="detail-icon">👤</span>
              <span>${translations[currentLang].suitableFor}: ${suitableForText}</span>
            </div>
          </div>

          <div class="apartment-actions">
            <button onclick="openDetails(${apt.id})" class="btn-details">
              ${translations[currentLang].fullDescription}
            </button>
            <div style="display: flex; gap: 0.5rem;">
              <a href="https://t.me/${ownerContacts.telegram.replace('@', '')}" target="_blank" 
                 style="flex: 1; padding: 0.75rem; border-radius: 8px; background: var(--neon-blue); color: #000; text-align: center; text-decoration: none; font-weight: 600; transition: all 0.3s;"
                 onmouseover="this.style.boxShadow='0 0 20px var(--neon-blue)'"
                 onmouseout="this.style.boxShadow='none'">
                TG
              </a>
              <a href="https://wa.me/${ownerContacts.whatsapp.replace(/\D/g, '')}" target="_blank" 
                 style="flex: 1; padding: 0.75rem; border-radius: 8px; background: var(--neon-green); color: #000; text-align: center; text-decoration: none; font-weight: 600; transition: all 0.3s;"
                 onmouseover="this.style.boxShadow='0 0 20px var(--neon-green)'"
                 onmouseout="this.style.boxShadow='none'">
                WA
              </a>
              <a href="${ownerContacts.facebook}" target="_blank" 
                 style="flex: 1; padding: 0.75rem; border-radius: 8px; background: var(--neon-purple); color: #fff; text-align: center; text-decoration: none; font-weight: 600; transition: all 0.3s;"
                 onmouseover="this.style.boxShadow='0 0 20px var(--neon-purple)'"
                 onmouseout="this.style.boxShadow='none'">
                FB
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `<div class="apartments-grid">${cardsHtml}</div>`;
}

// Открыть модальное окно с деталями
function openDetails(aptId) {
  const apt = apartmentsData.find(a => a.id === aptId);
  if (!apt) return;

  const title = apt.title[currentLang];
  const description = apt.description[currentLang];
  const price = apt.category === 'daily' ? apt.pricePerNight : apt.pricePerMonth;
  const priceLabel = apt.category === 'daily' ? 
    translations[currentLang].perNight : 
    translations[currentLang].perMonth;

  const typeLabel = apt.category === 'room' ? 
    translations[currentLang].legendRoom :
    `${apt.rooms} ${translations[currentLang].roomsCount}`;

  const suitableForText = apt.suitableFor.map(s => translations[currentLang][s]).join(', ');

  const galleryHtml = apt.photos.map(photo => 
    `<img src="${photo}" alt="${title}" loading="lazy">`
  ).join('');

  const html = `
    <div class="modal-classic-header">
      <h2 class="modal-classic-title">${title}</h2>
      <p class="modal-classic-subtitle">${districts[apt.district].name[currentLang]} • ${apt.specificDistrict}</p>
      <button class="modal-close-classic" onclick="closeDetails()">×</button>
    </div>

    <div class="modal-classic-body">
      <div class="modal-image-gallery">
        ${galleryHtml}
      </div>

      <div class="modal-info-grid">
        <div class="modal-info-item">
          <span class="modal-info-label">${translations[currentLang].priceLabel}</span>
          <span class="modal-info-value">${price.toLocaleString()} Ft${priceLabel}</span>
        </div>

        <div class="modal-info-item">
          <span class="modal-info-label">${translations[currentLang].districtLabel}</span>
          <span class="modal-info-value">${districts[apt.district].name[currentLang]}</span>
        </div>

        <div class="modal-info-item">
          <span class="modal-info-label">${translations[currentLang].typeLabel}</span>
          <span class="modal-info-value">${typeLabel}</span>
        </div>

        ${apt.category !== 'daily' ? `
          <div class="modal-info-item">
            <span class="modal-info-label">${translations[currentLang].depositLabel}</span>
            <span class="modal-info-value">${apt.deposit} ${apt.deposit === 1 ? translations[currentLang]['1month'] : translations[currentLang]['2months']}</span>
          </div>
        ` : ''}

        ${apt.moveInDate ? `
          <div class="modal-info-item">
            <span class="modal-info-label">${translations[currentLang].moveInLabel}</span>
            <span class="modal-info-value">${apt.moveInDate}</span>
          </div>
        ` : ''}

        <div class="modal-info-item">
          <span class="modal-info-label">${translations[currentLang].suitableFor}</span>
          <span class="modal-info-value">${suitableForText}</span>
        </div>
      </div>

      <div class="modal-description">
        <h3>${translations[currentLang].description}</h3>
        <p>${description}</p>
      </div>

      <div class="modal-contact-buttons">
        <a href="${apt.telegramLink}" target="_blank" class="modal-contact-btn telegram">
          📱 ${translations[currentLang].fullDescription}
        </a>
        <a href="https://t.me/${ownerContacts.telegram.replace('@', '')}" target="_blank" class="modal-contact-btn telegram">
          💬 Telegram
        </a>
        <a href="https://wa.me/${ownerContacts.whatsapp.replace(/\D/g, '')}" target="_blank" class="modal-contact-btn whatsapp">
          📞 WhatsApp
        </a>
        <a href="${ownerContacts.facebook}" target="_blank" class="modal-contact-btn facebook">
          👥 Facebook
        </a>
      </div>
    </div>
  `;

  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('detailsModal').classList.add('active');
}

// Закрыть модальное окно
function closeDetails() {
  document.getElementById('detailsModal').classList.remove('active');
}

// Закрытие модальных окон по клику вне их
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});
