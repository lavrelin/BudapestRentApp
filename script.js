// ГЛАВНАЯ ЛОГИКА САЙТА

// Текущий язык и активная вкладка
let currentLang = 'ru';
let activeTab = 'monthly';
let filteredApartments = [];

// Переводы
const translations = {
  ru: {
    siteName: "BudapestRent",
    monthly: "Долгосрочно",
    daily: "Посуточно",
    rented: "Уже сдано",
    about: "О проекте",
    needApt: "Нужна квартира?",
    filters: "Фильтры",
    district: "Район",
    allDistricts: "Все районы",
    price: "Цена",
    pricePerMonth: "Ft/мес",
    pricePerNight: "Ft/ночь",
    from: "от",
    to: "до",
    type: "Тип жилья",
    allTypes: "Все типы",
    studio: "Студия",
    "1room": "1 комната",
    "2room": "2 комнаты",
    shared: "Комната в квартире",
    deposit: "Депозит",
    "1month": "1 месяц",
    "2months": "2 месяца",
    moveInFrom: "Доступна с",
    minNights: "Минимум ночей",
    anyDate: "Любая дата",
    applyFilters: "Применить",
    resetFilters: "Сбросить",
    verified: "Проверено",
    availableFrom: "Доступна с",
    contact: "Связаться",
    details: "Подробнее",
    rentedOn: "Сдана",
    findSimilar: "Найти похожую",
    noResults: "Ничего не найдено",
    adjustFilters: "Попробуйте изменить фильтры",
    contacts: "Контакты владельца",
    noCommission: "Без комиссий",
    directContact: "Прямой контакт с владельцем",
    workingHours: "Работаю 09:00-21:00 (Будапешт)",
    responseTime: "Отвечаю обычно в течение 1-2 часов",
    requestFormTitle: "ИЩЕТЕ КВАРТИРУ?",
    requestFormSubtitle: "Заполните форму — я подберу варианты!",
    needAptFrom: "Нужна квартира с",
    yourBudget: "Бюджет (мес)",
    yourContacts: "Ваши контакты",
    yourName: "Имя",
    commentOptional: "Комментарий (необязательно)",
    sendRequest: "Отправить запрос",
    cancel: "Отмена",
    requestSent: "✅ Запрос отправлен!",
    willContact: "Свяжусь с вами в течение 2 часов",
    amenities: "Удобства",
    cleaning: "Уборка",
    included: "включена",
    paid: "платная",
    breakfast: "Завтрак",
    parking: "Парковка",
    wifi: "WiFi",
    yes: "да",
    no: "нет",
    perMonth: "мес",
    perNight: "ночь",
    night: "ночь",
    month: "месяц",
    ft: "Ft"
  },
  en: {
    siteName: "BudapestRent",
    monthly: "Long-term",
    daily: "Daily",
    rented: "Already Rented",
    about: "About",
    needApt: "Need apartment?",
    filters: "Filters",
    district: "District",
    allDistricts: "All districts",
    price: "Price",
    pricePerMonth: "Ft/month",
    pricePerNight: "Ft/night",
    from: "from",
    to: "to",
    type: "Property type",
    allTypes: "All types",
    studio: "Studio",
    "1room": "1 room",
    "2room": "2 rooms",
    shared: "Shared room",
    deposit: "Deposit",
    "1month": "1 month",
    "2months": "2 months",
    moveInFrom: "Available from",
    minNights: "Min nights",
    anyDate: "Any date",
    applyFilters: "Apply",
    resetFilters: "Reset",
    verified: "Verified",
    availableFrom: "Available from",
    contact: "Contact",
    details: "Details",
    rentedOn: "Rented on",
    findSimilar: "Find similar",
    noResults: "No results found",
    adjustFilters: "Try adjusting filters",
    contacts: "Owner contacts",
    noCommission: "No commission",
    directContact: "Direct contact with owner",
    workingHours: "Working hours: 09:00-21:00 (Budapest)",
    responseTime: "Usually respond within 1-2 hours",
    requestFormTitle: "LOOKING FOR APARTMENT?",
    requestFormSubtitle: "Fill the form - I'll find options!",
    needAptFrom: "Need apartment from",
    yourBudget: "Budget (month)",
    yourContacts: "Your contacts",
    yourName: "Name",
    commentOptional: "Comment (optional)",
    sendRequest: "Send request",
    cancel: "Cancel",
    requestSent: "✅ Request sent!",
    willContact: "Will contact you within 2 hours",
    amenities: "Amenities",
    cleaning: "Cleaning",
    included: "included",
    paid: "paid",
    breakfast: "Breakfast",
    parking: "Parking",
    wifi: "WiFi",
    yes: "yes",
    no: "no",
    perMonth: "mo",
    perNight: "night",
    night: "night",
    month: "month",
    ft: "Ft"
  }
};

// Фильтры
let filters = {
  district: 'all',
  priceMin: '',
  priceMax: '',
  type: 'all',
  deposit: 'all',
  moveInDate: '',
  minNights: 'all'
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  renderContactBar();
  renderFooterContacts();
  renderFilters();
  applyFilters();
  updateFloatingButton();
  translatePage();
}

// Переключение языка
function toggleLang() {
  currentLang = currentLang === 'ru' ? 'en' : 'ru';
  document.getElementById('langText').textContent = currentLang === 'ru' ? 'EN' : 'RU';
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
  document.getElementById('ownerNameFooter').textContent = ownerContacts.name[currentLang];
}

// Переключение вкладок
function setActiveTab(tab) {
  activeTab = tab;
  
  // Обновляем активную кнопку в десктопе
  const desktopBtns = document.querySelectorAll('.nav-desktop button');
  desktopBtns.forEach((btn, idx) => {
    btn.classList.remove('active');
    if ((tab === 'monthly' && idx === 0) || 
        (tab === 'daily' && idx === 1) || 
        (tab === 'rented' && idx === 2)) {
      btn.classList.add('active');
    }
  });
  
  // Обновляем активную кнопку в мобильном меню
  const mobileBtns = document.querySelectorAll('.mobile-nav button');
  mobileBtns.forEach((btn, idx) => {
    if (idx < 3) { // Только кнопки вкладок, не "Нужна квартира"
      btn.classList.remove('active');
      if ((tab === 'monthly' && idx === 0) || 
          (tab === 'daily' && idx === 1) || 
          (tab === 'rented' && idx === 2)) {
        btn.classList.add('active');
      }
    }
  });
  
  renderFilters();
  applyFilters();
}

// Мобильное меню
function toggleMobileMenu() {
  const menu = document.getElementById('mobileNav');
  menu.classList.toggle('active');
}

// Рендер контактов в шапке
function renderContactBar() {
  const html = `
    <a href="tel:${ownerContacts.phone}">
      <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      ${ownerContacts.phone}
    </a>
    <a href="https://t.me/${ownerContacts.telegram.replace('@', '')}" target="_blank">
      <svg class="icon-sm" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      ${ownerContacts.telegram}
    </a>
    <a href="mailto:${ownerContacts.email}">
      <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
      ${ownerContacts.email}
    </a>
  `;
  document.getElementById('contactBar').innerHTML = html;
}

// Рендер контактов в футере
function renderFooterContacts() {
  const html = `
    <a href="tel:${ownerContacts.phone}">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      ${ownerContacts.phone}
    </a>
    <a href="https://t.me/${ownerContacts.telegram.replace('@', '')}" target="_blank">
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      ${ownerContacts.telegram}
    </a>
    <a href="https://wa.me/${ownerContacts.whatsapp.replace(/\D/g, '')}" target="_blank">
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      WhatsApp: ${ownerContacts.whatsapp}
    </a>
    <a href="mailto:${ownerContacts.email}">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
      ${ownerContacts.email}
    </a>
  `;
  document.getElementById('footerContacts').innerHTML = html;
}

// Обновление плавающей кнопки
function updateFloatingButton() {
  const btn = document.getElementById('floatingTelegram');
  btn.href = `https://t.me/${ownerContacts.telegram.replace('@', '')}`;
}

// Рендер фильтров
function renderFilters() {
  const districts = [...new Set(apartmentsData.map(a => a.district))].sort();
  
  let html = `
    <div class="filter-group">
      <label>${translations[currentLang].district}</label>
      <select id="filterDistrict" onchange="updateFilter('district', this.value)">
        <option value="all">${translations[currentLang].allDistricts}</option>
        ${districts.map(d => `<option value="${d}" ${filters.district === d ? 'selected' : ''}>${d}</option>`).join('')}
      </select>
    </div>

    <div class="filter-group">
      <label>${translations[currentLang].price}</label>
      <div class="price-inputs">
        <input type="number" id="filterPriceMin" placeholder="${translations[currentLang].from}" 
               value="${filters.priceMin}" onchange="updateFilter('priceMin', this.value)">
        <span>-</span>
        <input type="number" id="filterPriceMax" placeholder="${translations[currentLang].to}" 
               value="${filters.priceMax}" onchange="updateFilter('priceMax', this.value)">
      </div>
    </div>

    <div class="filter-group">
      <label>${translations[currentLang].type}</label>
      <select id="filterType" onchange="updateFilter('type', this.value)">
        <option value="all">${translations[currentLang].allTypes}</option>
        <option value="studio" ${filters.type === 'studio' ? 'selected' : ''}>${translations[currentLang].studio}</option>
        <option value="1room" ${filters.type === '1room' ? 'selected' : ''}>${translations[currentLang]['1room']}</option>
        <option value="2room" ${filters.type === '2room' ? 'selected' : ''}>${translations[currentLang]['2room']}</option>
        <option value="shared" ${filters.type === 'shared' ? 'selected' : ''}>${translations[currentLang].shared}</option>
      </select>
    </div>
  `;

  if (activeTab === 'monthly') {
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

  html += `
    <div class="filter-group">
      <label>${translations[currentLang].moveInFrom}</label>
      <input type="date" id="filterMoveInDate" value="${filters.moveInDate}" 
             onchange="updateFilter('moveInDate', this.value)">
    </div>
  `;

  if (activeTab === 'daily') {
    html += `
      <div class="filter-group">
        <label>${translations[currentLang].minNights}</label>
        <select id="filterMinNights" onchange="updateFilter('minNights', this.value)">
          <option value="all">${translations[currentLang].allTypes}</option>
          <option value="1" ${filters.minNights === '1' ? 'selected' : ''}>1+</option>
          <option value="2" ${filters.minNights === '2' ? 'selected' : ''}>2+</option>
          <option value="3" ${filters.minNights === '3' ? 'selected' : ''}>3+</option>
          <option value="7" ${filters.minNights === '7' ? 'selected' : ''}>7+</option>
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
    if (activeTab === 'monthly' && apt.category !== 'monthly') return false;
    if (activeTab === 'daily' && apt.category !== 'daily') return false;
    if (activeTab === 'rented' && apt.status !== 'rented') return false;
    if (activeTab !== 'rented' && apt.status === 'rented') return false;

    // Фильтр по району
    if (filters.district !== 'all' && apt.district !== filters.district) return false;

    // Фильтр по цене
    const price = apt.category === 'monthly' ? apt.pricePerMonth : apt.pricePerNight;
    if (filters.priceMin && price < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && price > parseInt(filters.priceMax)) return false;

    // Фильтр по типу
    if (filters.type !== 'all' && apt.type !== filters.type) return false;

    // Фильтр по депозиту
    if (filters.deposit !== 'all' && apt.deposit !== parseInt(filters.deposit)) return false;

    // Фильтр по дате заселения
    if (filters.moveInDate && apt.moveInDate) {
      if (new Date(apt.moveInDate) > new Date(filters.moveInDate)) return false;
    }

    // Фильтр по минимуму ночей
    if (activeTab === 'daily' && filters.minNights !== 'all') {
      if (apt.minNights > parseInt(filters.minNights)) return false;
    }

    return true;
  });

  filteredApartments = filtered;
  renderApartments();
}

// Сброс фильтров
function resetFilters() {
  filters = {
    district: 'all',
    priceMin: '',
    priceMax: '',
    type: 'all',
    deposit: 'all',
    moveInDate: '',
    minNights: 'all'
  };
  renderFilters();
  applyFilters();
}

// Переключение панели фильтров
function toggleFilters() {
  const panel = document.getElementById('filtersPanel');
  panel.classList.toggle('active');
}

// Рендер квартир
function renderApartments() {
  const container = document.getElementById('apartmentsContainer');
  
  if (filteredApartments.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <h3>${translations[currentLang].noResults}</h3>
        <p>${translations[currentLang].adjustFilters}</p>
      </div>
    `;
    return;
  }

  const cardsHtml = filteredApartments.map(apt => {
    const title = apt.title[currentLang];
    const isRented = apt.status === 'rented';
    const price = apt.category === 'monthly' ? apt.pricePerMonth : apt.pricePerNight;
    const priceLabel = apt.category === 'monthly' 
      ? translations[currentLang].perMonth 
      : translations[currentLang].perNight;

    return `
      <div class="apartment-card ${isRented ? 'rented' : ''}">
        <div class="apartment-image">
          <img src="${apt.photos[0]}" alt="${title}">
          ${isRented ? `
            <div class="rented-overlay"></div>
            <div class="badge badge-rented">
              ${translations[currentLang].rentedOn} ${apt.rentedDate}
            </div>
          ` : ''}
          ${!isRented && apt.verified ? `
            <div class="badge badge-verified">
              ✓ ${translations[currentLang].verified} ${apt.verified}
            </div>
          ` : ''}
          ${!isRented && apt.category === 'daily' ? `
            <div class="badge badge-daily">${translations[currentLang].daily}</div>
          ` : ''}
        </div>

        <div class="apartment-info">
          <h3 class="apartment-title">${title}</h3>
          
          <div class="apartment-details">
            <div class="detail-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>${apt.district}</span>
            </div>

            <div class="detail-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span class="price">${price.toLocaleString()} Ft / ${priceLabel}</span>
            </div>

            ${apt.category === 'monthly' && !isRented ? `
              <div class="detail-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <span>${translations[currentLang].deposit}: ${apt.deposit} ${translations[currentLang].month}</span>
              </div>
            ` : ''}

            ${apt.category === 'daily' && !isRented ? `
              <div class="detail-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>${translations[currentLang].minNights}: ${apt.minNights}</span>
              </div>
            ` : ''}

            ${apt.moveInDate && !isRented ? `
              <div class="detail-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>${translations[currentLang].availableFrom} ${apt.moveInDate}</span>
              </div>
            ` : ''}
          </div>

          <div class="apartment-actions">
            ${isRented ? `
              <button class="btn-find-similar" onclick="openRequestForm()">
                ${translations[currentLang].findSimilar}
              </button>
            ` : `
              <button class="btn-details" onclick="openDetails(${apt.id})">
                ${translations[currentLang].details}
              </button>
              <a href="https://t.me/${ownerContacts.telegram.replace('@', '')}" 
                 target="_blank" class="btn-contact">
                ${translations[currentLang].contact}
              </a>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `<div class="apartments-grid">${cardsHtml}</div>`;
}

// Открыть форму запроса
function openRequestForm() {
  const modal = document.getElementById('requestModal');
  modal.classList.add('active');
  
  // Заполняем чекбоксы районов
  const districts = [...new Set(apartmentsData.map(a => a.district))].sort();
  const checkboxesHtml = districts.map(d => `
    <label class="checkbox-label">
      <input type="checkbox" name="districts" value="${d}">
      <span>${d}</span>
    </label>
  `).join('');
  document.getElementById('districtCheckboxes').innerHTML = checkboxesHtml;
}

// Закрыть форму запроса
function closeRequestForm() {
  document.getElementById('requestModal').classList.remove('active');
  document.getElementById('requestForm').reset();
}

// Отправка формы запроса
function handleRequestSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    needFrom: formData.get('needFrom'),
    districts: Array.from(document.querySelectorAll('input[name="districts"]:checked')).map(cb => cb.value),
    budgetMin: formData.get('budgetMin'),
    budgetMax: formData.get('budgetMax'),
    type: formData.get('type'),
    name: formData.get('name'),
    telegram: formData.get('telegram'),
    whatsapp: formData.get('whatsapp'),
    email: formData.get('email'),
    comment: formData.get('comment')
  };

  // В реальном приложении здесь был бы запрос на сервер
  console.log('Request data:', data);
  
  alert(`${translations[currentLang].requestSent}\n\n${translations[currentLang].willContact}:\nTelegram: ${data.telegram}\nWhatsApp: ${data.whatsapp}`);
  
  closeRequestForm();
}

// Открыть детали квартиры
function openDetails(aptId) {
  const apt = apartmentsData.find(a => a.id === aptId);
  if (!apt) return;

  const title = apt.title[currentLang];
  const description = apt.description[currentLang];
  const price = apt.category === 'monthly' ? apt.pricePerMonth : apt.pricePerNight;
  const priceLabel = apt.category === 'monthly' 
    ? translations[currentLang].perMonth 
    : translations[currentLang].perNight;

  let amenitiesHtml = '';
  if (apt.category === 'daily' && apt.amenities) {
    amenitiesHtml = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-weight: 600; margin-bottom: 0.75rem;">${translations[currentLang].amenities}</h3>
        <div style="display: grid; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="${apt.amenities.cleaning === 'included' ? '#16a34a' : '#dc2626'}" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span style="font-size: 0.875rem;">
              ${translations[currentLang].cleaning}: ${translations[currentLang][apt.amenities.cleaning]}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="${apt.amenities.breakfast ? '#16a34a' : '#dc2626'}" stroke-width="2">
              ${apt.amenities.breakfast ? '<polyline points="20 6 9 17 4 12"/>' : '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'}
            </svg>
            <span style="font-size: 0.875rem;">
              ${translations[currentLang].breakfast}: ${apt.amenities.breakfast ? translations[currentLang].yes : translations[currentLang].no}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="${apt.amenities.parking ? '#16a34a' : '#dc2626'}" stroke-width="2">
              ${apt.amenities.parking ? '<polyline points="20 6 9 17 4 12"/>' : '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'}
            </svg>
            <span style="font-size: 0.875rem;">
              ${translations[currentLang].parking}: ${apt.amenities.parking ? translations[currentLang].yes : translations[currentLang].no}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span style="font-size: 0.875rem;">${translations[currentLang].wifi}</span>
          </div>
        </div>
      </div>
    `;
  }

  const html = `
    <div style="position: relative;">
      <img src="${apt.photos[0]}" alt="${title}" style="width: 100%; height: 300px; object-fit: cover;">
      <button onclick="closeDetails()" style="position: absolute; top: 1rem; right: 1rem; padding: 0.5rem; background: white; border: none; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: pointer;">
        <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <div style="padding: 1.5rem;">
      <h2 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1.5rem;">${title}</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
            <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${apt.district}</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span style="font-size: 1.5rem; font-weight: bold; color: #0066cc;">${price.toLocaleString()} Ft</span>
            <span style="color: #6b7280;">/ ${priceLabel}</span>
          </div>

          ${apt.category === 'monthly' ? `
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
              <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <span>${translations[currentLang].deposit}: ${apt.deposit} ${translations[currentLang].month}</span>
            </div>
          ` : ''}

          ${apt.category === 'daily' ? `
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
              <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>${translations[currentLang].minNights}: ${apt.minNights}</span>
            </div>
          ` : ''}

          ${apt.moveInDate ? `
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
              <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>${translations[currentLang].availableFrom} ${apt.moveInDate}</span>
            </div>
          ` : ''}
        </div>

        ${amenitiesHtml ? `<div>${amenitiesHtml}</div>` : ''}
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1.125rem;">Описание</h3>
        <p style="color: #374151; line-height: 1.6;">${description}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
        <a href="https://t.me/${ownerContacts.telegram.replace('@', '')}" 
           target="_blank" 
           style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #0066cc; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 500;">
          <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Telegram
        </a>
        <a href="https://wa.me/${ownerContacts.whatsapp.replace(/\D/g, '')}" 
           target="_blank" 
           style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #16a34a; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 500;">
          <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          WhatsApp
        </a>
        <a href="tel:${ownerContacts.phone}" 
           style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #374151; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 500;">
          <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          ${translations[currentLang].contact}
        </a>
      </div>
    </div>
  `;

  document.getElementById('detailsContent').innerHTML = html;
  document.getElementById('detailsModal').classList.add('active');
}

// Закрыть детали квартиры
function closeDetails() {
  document.getElementById('detailsModal').classList.remove('active');
}

// Закрытие модальных окон по клику вне их
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});
