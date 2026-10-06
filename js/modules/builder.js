App.modules.builder = {
  init() {
    this.bindEvents();
    this.renderRollsList();
    this.renderSummary();
  },
  bindEvents() {
    const sizeBtns = document.querySelectorAll('.btn-size');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        App.state.builder.size = parseInt(btn.dataset.size, 10);
        if (App.state.builder.selectedRolls.length > App.state.builder.size) {
          App.state.builder.selectedRolls = App.state.builder.selectedRolls.slice(0, App.state.builder.size);
        }
        this.renderSummary();
      });
    });

    const addBoxBtn = document.getElementById('btn-add-builder-to-cart');
    if (addBoxBtn) {
      addBoxBtn.addEventListener('click', () => {
        const { size, selectedRolls } = App.state.builder;
        if (selectedRolls.length !== size) return;

        const boxPrice = selectedRolls.reduce((sum, r) => sum + r.price, 0) * 0.95; // 5% discount
        const customBoxItem = {
          id: 'custom-box-' + Date.now(),
          title: `Дегустационный сет из ${size} мини-рулетов`,
          price: Math.round(boxPrice),
          image: selectedRolls[0].image,
          isCustomSet: true,
          details: selectedRolls.map(r => r.title).join(', ')
        };

        App.modules.cart.addItem(customBoxItem);
        App.state.builder.selectedRolls = [];
        this.renderSummary();
      });
    }
  },
  renderRollsList() {
    const list = document.getElementById('builder-rolls-list');
    if (!list) return;

    list.innerHTML = AppContent.products.map(product => `
      <div class="builder-roll-card">
        <img src="${product.image}" alt="${product.title}">
        <strong>${product.title}</strong>
        <span style="font-size: 0.8rem; color: var(--color-accent);">${product.price} ₸</span>
        <button type="button" class="btn-add-cart" style="margin-top: 8px;" data-id="${product.id}">+ Добавить</button>
      </div>
    `).join('');

    list.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const roll = AppContent.products.find(p => p.id === id);
        if (roll && App.state.builder.selectedRolls.length < App.state.builder.size) {
          App.state.builder.selectedRolls.push(roll);
          this.renderSummary();
        }
      });
    });
  },
  renderSummary() {
    const { size, selectedRolls } = App.state.builder;
    const progressFill = document.getElementById('builder-progress');
    const countText = document.getElementById('builder-count-text');
    const slotsGrid = document.getElementById('box-slots');
    const weightEl = document.getElementById('builder-total-weight');
    const calEl = document.getElementById('builder-total-calories');
    const priceEl = document.getElementById('builder-total-price');
    const addBtn = document.getElementById('btn-add-builder-to-cart');

    const fillPercent = (selectedRolls.length / size) * 100;
    if (progressFill) progressFill.style.width = fillPercent + '%';
    if (countText) countText.textContent = `${selectedRolls.length} / ${size} шт заполнено`;

    if (slotsGrid) {
      let slotsHtml = '';
      for (let i = 0; i < size; i++) {
        if (i < selectedRolls.length) {
          slotsHtml += `<div class="box-slot filled" title="${selectedRolls[i].title}">✓</div>`;
        } else {
          slotsHtml += `<div class="box-slot">+</div>`;
        }
      }
      slotsGrid.innerHTML = slotsHtml;
    }

    const totalWeight = selectedRolls.length * 80;
    const totalPrice = selectedRolls.reduce((sum, r) => sum + r.price, 0) * 0.95;

    if (weightEl) weightEl.textContent = `${totalWeight} г`;
    if (calEl) calEl.textContent = `~${selectedRolls.length * 220} ккал`;
    if (priceEl) priceEl.textContent = `${Math.round(totalPrice).toLocaleString()} ₸`;

    if (addBtn) {
      addBtn.disabled = selectedRolls.length !== size;
    }
  }
};