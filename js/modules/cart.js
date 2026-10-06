App.modules.cart = {
  init() {
    App.state.cart = App.modules.storage.loadCart();
    this.bindEvents();
    this.render();
  },
  bindEvents() {
    const cartBtn = document.getElementById('btn-cart-toggle');
    const closeBtn = document.getElementById('btn-cart-close');
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');

    const toggleCart = (show) => {
      if (show) {
        drawer.classList.remove('hidden');
        backdrop.classList.remove('hidden');
      } else {
        drawer.classList.add('hidden');
        backdrop.classList.add('hidden');
      }
    };

    if (cartBtn) cartBtn.addEventListener('click', () => toggleCart(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleCart(false));
    if (backdrop) backdrop.addEventListener('click', () => toggleCart(false));

    const checkoutBtn = document.getElementById('btn-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (App.state.cart.length === 0) return;
        App.modules.modal.showToast('Заказ успешно оформлен! Наш менеджер свяжется с вами.');
        App.state.cart = [];
        this.saveAndRender();
        toggleCart(false);
      });
    }
  },
  addItem(product) {
    const existing = App.state.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      App.state.cart.push({ ...product, quantity: 1 });
    }
    this.saveAndRender();
    App.modules.modal.showToast(`«${product.title}» добавлен в корзину`);
  },
  removeItem(id) {
    App.state.cart = App.state.cart.filter(item => item.id !== id);
    this.saveAndRender();
  },
  updateQty(id, delta) {
    const item = App.state.cart.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.saveAndRender();
      }
    }
  },
  saveAndRender() {
    App.modules.storage.saveCart(App.state.cart);
    this.render();
  },
  render() {
    const badge = document.getElementById('cart-badge');
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-sum');

    const totalCount = App.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalSum = App.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (badge) badge.textContent = totalCount;
    if (totalEl) totalEl.textContent = `${totalSum.toLocaleString()} ₸`;

    if (!container) return;

    if (App.state.cart.length === 0) {
      container.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 40px 0;">Ваша корзина пуста</div>';
      return;
    }

    container.innerHTML = App.state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <strong>${item.title}</strong>
          <div>${item.price.toLocaleString()} ₸</div>
          <div style="margin-top: 4px; display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn-qty" onclick="App.modules.cart.updateQty('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button type="button" class="btn-qty" onclick="App.modules.cart.updateQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button type="button" style="color: var(--color-text-muted);" onclick="App.modules.cart.removeItem('${item.id}')">&times;</button>
      </div>
    `).join('');
  }
};