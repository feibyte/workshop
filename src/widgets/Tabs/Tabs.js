const classNames = {
  root: 'tabs',
  tabNavContainer: 'tabs-nav-container',
  tabNav: 'tabs-nav',
  tabPanelContainer: 'tabs-panel-container',
  tabPanel: 'tabs-panel',
  selected: 'selected',
};

const KeyCode = {
  isEnter: (keyCode) => keyCode === 13,
  isSpace: (keyCode) => keyCode === 32,
};

class Tabs {
  constructor($dom, options) {
    this.root = $dom;
    this.options = {
      // panelIdSuffix is Used for generating panel Id which used for accessibility
      panelIdSuffix: 'tabs-',
      ...options,
    };
    this.activeIndex = -1;
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.initialize();
  }

  initialize() {
    this.createNav();
    this.createPanels();
    this.activate(0);
    this.bindEvents();
  }

  createNav() {
    const navContainer = this.root.querySelector(`.${classNames.tabNavContainer}`);
    const navs = [...navContainer.children];
    const { panelIdSuffix } = this.options;
    navs.forEach((nav, index) => {
      nav.setAttribute('role', 'tab');
      nav.setAttribute('aria-controls', `${panelIdSuffix}${index}`);
      nav.classList.add(classNames.tabNav);
      // eslint-disable-next-line no-param-reassign
      nav.dataset.index = `${index}`;
    });
  }

  createPanels() {
    const panelsContainer = this.root.querySelector(`.${classNames.tabPanelContainer}`);
    const panels = [...panelsContainer.children];
    const { panelIdSuffix } = this.options;
    panels.forEach((tabPanel, index) => {
      tabPanel.classList.add(classNames.tabPanel);
      // eslint-disable-next-line no-param-reassign
      tabPanel.id = `${panelIdSuffix}${index}`;
    });
  }

  bindEvents() {
    this.root.addEventListener('click', this.onClick);
    this.root.addEventListener('keydown', this.onKeyDown);
  }

  onClick(event) {
    const { target } = event;
    if (target.classList && target.classList.contains(classNames.tabNav)) {
      const index = parseInt(target.dataset.index, 10);
      this.activate(index);
    }
  }

  onKeyDown(event) {
    const { target, keyCode } = event;
    if (target.classList && target.classList.contains(classNames.tabNav)) {
      if (KeyCode.isEnter(keyCode) || KeyCode.isSpace(keyCode)) {
        event.preventDefault();
        const index = parseInt(target.dataset.index, 10);
        this.activate(index);
      }
    }
  }

  getAllTabNavs() {
    return [...this.root.querySelectorAll(`.${classNames.tabNav}`)];
  }

  getAllPanels() {
    return [...this.root.querySelectorAll(`.${classNames.tabPanel}`)];
  }

  activate(index) {
    if (index !== this.activeIndex) {
      this.activeIndex = index;
      const tabNavs = this.getAllTabNavs();
      tabNavs.forEach((tabNav, i) => {
        tabNav.classList.remove(classNames.selected);
        tabNav.setAttribute('aria-selected', i === this.activeIndex);
      });
      tabNavs[index].classList.add(classNames.selected);

      const tabPanels = this.getAllPanels();
      tabPanels.forEach((tabPanel, i) => {
        tabPanel.classList.remove(classNames.selected);
        tabPanel.setAttribute('aria-hidden', i !== this.activeIndex);
      });
      tabPanels[index].classList.add(classNames.selected);
    }
  }

  destroy() {
    this.unbindEvents();
  }

  unbindEvents() {
    this.root.removeEventListener('click', this.onClick);
    this.root.removeEventListener('keydown', this.onKeyDown);
  }
}

export default Tabs;
