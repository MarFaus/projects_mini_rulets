App.modules.storage = {
  saveCart(cartData) {
    try {
      localStorage.setItem('mezon_cart', JSON.stringify(cartData));
    } catch (e) {
      console.error('Не удалось сохранить корзину:', e);
    }
  },
  loadCart() {
    try {
      const data = localStorage.getItem('mezon_cart');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
};