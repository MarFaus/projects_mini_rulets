App.modules.modal = {
  init() {
    this.bindEvents();
  },
  bindEvents() {
    // Settings dropdown toggle
    const settingsToggle = document.getElementById('btn-settings-toggle');
    const settingsDropdown = document.getElementById('settings-dropdown');

    if (settingsToggle && settingsDropdown) {
      settingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsDropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!settingsDropdown.contains(e.target) && e.target !== settingsToggle) {
          settingsDropdown.classList.add('hidden');
        }
      });
    }

    // Search overlay toggle
    const searchToggle = document.getElementById('btn-search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('btn-search-close');

    if (searchToggle && searchOverlay) {
      searchToggle.addEventListener('click', () => searchOverlay.classList.remove('hidden'));
    }
    if (searchClose && searchOverlay) {
      searchClose.addEventListener('click', () => searchOverlay.classList.add('hidden'));
    }

    // Booking modal
    const heroBookingBtn = document.getElementById('btn-hero-booking');
    const bookingLink = document.getElementById('nav-tasting-link');
    const bookingModal = document.getElementById('modal-booking');

    const openBooking = (e) => {
      if (e) e.preventDefault();
      if (bookingModal) bookingModal.classList.remove('hidden');
    };

    if (heroBookingBtn) heroBookingBtn.addEventListener('click', openBooking);
    if (bookingLink) bookingLink.addEventListener('click', openBooking);

    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-overlay').classList.add('hidden');
      });
    });

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showToast('Заявка на дегустацию принята!');
        if (bookingModal) bookingModal.classList.add('hidden');
        bookingForm.reset();
      });
    }
  },
  openProduct(product) {
    const modal = document.getElementById('modal-product');
    const body = document.getElementById('product-modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <img src="${product.image}" alt="${product.title}" style="width: 220px; height: 220px; object-fit: cover; border-radius: 8px;">
        <div style="flex: 1; min-width: 200px;">
          <h3 style="font-size: 1.8rem; margin-bottom: 8px; color: var(--color-text);">${product.title}</h3>
          <p style="color: var(--color-accent); font-weight: 600; font-size: 1.2rem; margin-bottom: 12px;">${product.price} ₸</p>
          <p style="font-size: 0.9rem; margin-bottom: 12px; color: var(--color-text-muted);">${product.description}</p>
          <p style="font-size: 0.8rem; color: var(--color-text-light); margin-bottom: 16px;"><strong>Состав:</strong> ${product.ingredients}</p>
          <button type="button" class="btn btn-glass-primary btn-block" onclick="App.modules.cart.addItem(AppContent.products.find(p=>p.id==='${product.id}'))">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  },
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
};