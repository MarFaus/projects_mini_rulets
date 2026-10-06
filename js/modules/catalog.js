App.modules.catalog = {
  init() {
    this.bindEvents();
    this.render();
  },
  bindEvents() {
    const filterContainer = document.getElementById('category-filters');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        App.state.selectedCategory = btn.dataset.category;
        this.render();
      });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        App.state.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }
  },
  render() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    let items = AppContent.products;

    if (App.state.selectedCategory !== 'all') {
      items = items.filter(item => item.category === App.state.selectedCategory);
    }

    if (App.state.searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(App.state.searchQuery) ||
        item.description.toLowerCase().includes(App.state.searchQuery)
      );
    }

    if (items.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">По вашему запросу ничего не найдено.</div>';
      return;
    }

    grid.innerHTML = items.map(item => `
      <article class="product-card">
        <div class="product-image-wrap" data-id="${item.id}">
          ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
          <img src="${item.image}" alt="${item.title}" class="product-img" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${this.getCategoryName(item.category)}</span>
          <h3 class="product-title">${item.title}</h3>
          <p class="product-desc">${item.description}</p>
          <div class="product-footer">
            <span class="product-price">${item.price.toLocaleString()} ₸</span>
            <button type="button" class="btn-add-cart" data-id="${item.id}">В КОРЗИНУ</button>
          </div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const product = AppContent.products.find(p => p.id === id);
        if (product) {
          App.modules.cart.addItem(product);
        }
      });
    });

    grid.querySelectorAll('.product-image-wrap').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const id = wrap.dataset.id;
        const product = AppContent.products.find(p => p.id === id);
        if (product) {
          App.modules.modal.openProduct(product);
        }
      });
    });
  },
  getCategoryName(catKey) {
    const found = AppContent.categories.find(c => c.id === catKey);
    return found ? found.name : 'Рулет';
  }
};