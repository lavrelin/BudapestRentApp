// ГЛАВНАЯ ЛОГИКА САЙТА - Cyberpunk Edition

let currentLang = 'en';
let activeTab = 'apartments'; // apartments / rooms / daily
let filteredApartments = [];
let map;
let markersLayer;

// Переводы
const translations = {
  en: {
    apartments: "Apartments",
    rooms: "Rooms",
    daily: "Daily",
    offer: "Offer Your Apartment",
    looking: "Looking for Apartment",
    roommate: "Find Roommate",
    legendApartment: "Apartment",
    legendRoom: "Room",
    apply: "Apply",
    reset: "Reset",
    district: "District",
    allDistricts: "All Districts",
    price: "Price",
    from: "from",
    to: "to",
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
    aboutText: "Modern platform for finding apartments and rooms in Budapest. Cyberpunk style, convenient filters, interactive map.",
    districts: "Districts",
    noResults: "No results found",
    tryFilters: "Try adjusting filters"
  },
  ru: {
    apartments: "Квартиры",
    rooms: "Комнаты",
    daily: "Посуточно",
    offer: "Предложить квартиру",
    looking: "Ищу квартиру",
    roommate: "Ищу соседа",
    legendApartment: "Квартира",
    legendRoom: "Комната",
    apply: "Применить",
    reset: "Сбросить",
    district: "Район",
    allDistricts: "Все районы",
    price: "Цена",
    from: "от",
    to: "до",
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
    aboutText: "Современная платформа для поиска квартир и комнат в Будапеште. Киберпанк-стиль, удобные фильтры, интерактивная карта.",
    districts: "Районы",
    noResults: "Ничего не найдено",
    tryFilters: "Попробуйте изменить фильтры"
  }
};

// Фильтры
let filters = {
  district: 'all',
  priceMin: '',
  priceMax: '',
  rooms: 'all',
  deposit: 'all',
  moveInDate: ''
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  initMap();
  translatePage();
  renderFilters();
  applyFilters();
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
    if ((tab === 'apartments' && idx === 0) || 
        (tab === 'rooms' && idx === 1) || 
        (tab === 'daily' && idx === 2)) {
      btn.classList.add('active');
    }
  });
  
  renderFilters();
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

  // Фильтры для квартир
  if (activeTab === 'apartments') {
    html += `
      <div class="filter-group">
        <label>${translations[currentLang].roomsCount}</label>
        <select id="filterRooms" onchange="updateFilter('rooms', this.value)">
          <option value="all">${translations[currentLang].allDistricts}</option>
          <option value="1" ${filters.rooms === '1' ? 'selected' : ''}>1</option>
          <option value="2" ${filters.rooms === '2' ? 'selected' : ''}>2</option>
          <option value="3" ${filters.rooms === '3' ? 'selected' : ''}>3</option>
        </select>
      </div>
    `;
  }

  // Фильтр депозита для комнат и квартир
  if (activeTab !== 'daily') {
    html += `
      <div class="filter-group">
        <label>${translations[currentLang].deposit}</label>
        <select id="filterDeposit" onchange="updateFilter('deposit', this.value)">
          <option value="all">${translations[currentLang].allDistricts}</option>
          <option value="1" ${filters.deposit === '1' ? 'selected' : ''}>${translations[currentLang]['1month']}</option>
          <option value="2" ${filters.deposit === '2' ? 'selected' : ''}>${translations[currentLang]['2months']}</option>
        </select>
      </div>
    `;
  }

  document.getElementById('filtersGrid').innerHTML = html;
}

// Обновление фильтра
function updateFilter(key, value) {
  filters[key] = value;
}

// Применение фильтров
function applyFilters() {
  let filtered = apartmentsData.filter(apt => {
    // Фильтр по категории
    if (activeTab === 'apartments' && apt.category !== 'apartment') return false;
    if (activeTab === 'rooms' && apt.category !== 'room') return false;
    if (activeTab === 'daily' && apt.category !== 'daily') return false;

    // Фильтр по району
    if (filters.district !== 'all' && apt.district !== filters.district) return false;

    // Фильтр по цене
    const price = apt.category === 'daily' ? apt.pricePerNight : apt.pricePerMonth;
    if (filters.priceMin && price < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && price > parseInt(filters.priceMax)) return false;

    // Фильтр по количеству комнат (только для квартир)
    if (activeTab === 'apartments' && filters.rooms !== 'all') {
      if (apt.rooms !== parseInt(filters.rooms)) return false;
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
            <a href="${apt.telegramLink}" target="_blank" class="btn-details">
              ${translations[currentLang].fullDescription}
            </a>
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

// Закрытие модальных окон по клику вне их
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});
