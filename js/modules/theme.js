App.modules.theme = {
  defaults: {
    theme: 'dark',
    blur: 16,
    opacity: 12
  },
  init() {
    this.loadSettings();
    this.bindEvents();
  },
  loadSettings() {
    const saved = localStorage.getItem('mezon_settings');
    const settings = saved ? { ...this.defaults, ...JSON.parse(saved) } : { ...this.defaults };

    this.applyTheme(settings.theme, false);
    this.applyBlur(settings.blur, false);
    this.applyOpacity(settings.opacity, false);

    // Update Sliders UI
    const themeSlider = document.getElementById('theme-slider');
    const blurSlider = document.getElementById('glass-blur-slider');
    const opacitySlider = document.getElementById('glass-opacity-slider');

    if (themeSlider) themeSlider.value = settings.theme === 'light' ? 1 : 0;
    if (blurSlider) blurSlider.value = settings.blur;
    if (opacitySlider) opacitySlider.value = settings.opacity;
  },
  saveSettings() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const currentBlur = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--glass-blur')) || 16;
    const opacityVal = parseInt(document.getElementById('opacity-val-display')?.textContent) || 12;

    const data = {
      theme: currentTheme,
      blur: currentBlur,
      opacity: opacityVal
    };
    localStorage.setItem('mezon_settings', JSON.stringify(data));
  },
  bindEvents() {
    // Theme Slider (0 = Dark, 1 = Light)
    const themeSlider = document.getElementById('theme-slider');
    if (themeSlider) {
      themeSlider.addEventListener('input', (e) => {
        const isLight = parseInt(e.target.value, 10) === 1;
        this.applyTheme(isLight ? 'light' : 'dark', true);
      });
    }

    // Glass Blur Slider
    const blurSlider = document.getElementById('glass-blur-slider');
    if (blurSlider) {
      blurSlider.addEventListener('input', (e) => {
        this.applyBlur(parseInt(e.target.value, 10), true);
      });
    }

    // Glass Opacity Slider
    const opacitySlider = document.getElementById('glass-opacity-slider');
    if (opacitySlider) {
      opacitySlider.addEventListener('input', (e) => {
        this.applyOpacity(parseInt(e.target.value, 10), true);
      });
    }

    // Reset Defaults Button
    const resetBtn = document.getElementById('btn-reset-settings');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.applyTheme(this.defaults.theme, false);
        this.applyBlur(this.defaults.blur, false);
        this.applyOpacity(this.defaults.opacity, false);

        if (themeSlider) themeSlider.value = 0;
        if (blurSlider) blurSlider.value = this.defaults.blur;
        if (opacitySlider) opacitySlider.value = this.defaults.opacity;

        this.saveSettings();
        if (App.modules.modal) App.modules.modal.showToast('Настройки сброшены по умолчанию');
      });
    }
  },
  applyTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);

    const themeDisplay = document.getElementById('theme-val-display');
    if (themeDisplay) {
      themeDisplay.textContent = theme === 'light' ? 'Светлая ☀️' : 'Тёмная 🌙';
    }

    if (save) this.saveSettings();
  },
  applyBlur(val, save = true) {
    document.documentElement.style.setProperty('--glass-blur', `${val}px`);
    const blurDisplay = document.getElementById('blur-val-display');
    if (blurDisplay) blurDisplay.textContent = `${val}px`;

    if (save) this.saveSettings();
  },
  applyOpacity(val, save = true) {
    const decimal = (val / 100).toFixed(2);
    document.documentElement.style.setProperty('--glass-opacity-val', decimal);
    const opacityDisplay = document.getElementById('opacity-val-display');
    if (opacityDisplay) opacityDisplay.textContent = `${val}%`;

    if (save) this.saveSettings();
  }
};