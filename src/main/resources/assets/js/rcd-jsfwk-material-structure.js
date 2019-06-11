class RcdMaterialNavIconArea extends RcdGoogleMaterialIconArea {
    constructor() {
        super('menu');
        this.toggled = false;
        this.navigationDrawer;
    }

    init() {
        return super.init().
            addClass('rcd-material-application-nav-icon').
            setLight(true).
            addClickListener(() => {
                this.toggle();
                if (this.navigationDrawer) {
                    this.navigationDrawer.toggle()
                }
            });
    }


    toggle() {
        this.toggled = !this.toggled;
        return this.setToggled(this.toggled);
    }

    setToggled(toggled) {
        if (toggled) {
            this.icon.setText('close');
        } else {
            this.icon.setText('menu');
        }
    }

    setNavigationDrawer(navigationDrawer) {
        this.navigationDrawer = navigationDrawer;
        return this;
    }
}


class RcdMaterialApplicationBar extends RcdHeaderElement {
    constructor(title, params = {}) {
        super();
        this.title = new RcdTextDivElement(title).
            init().
            addClass('rcd-material-application-title');
        this.navIconArea = new RcdMaterialNavIconArea().init();
        this.actionItems = [];
        this.openSearchIconArea = params.search && new RcdGoogleMaterialIconArea('search', () => {
            this.title.hide();
            this.openSearchIconArea.hide();
            this.seachPanel.show();
            this.searchField.focus();
        })
            .init()
            .setLight(true);

        if (params.search) {
            const hideSearchPanel = () => {
                this.title.show();
                this.openSearchIconArea.show();
                this.seachPanel.hide();
            }
            const searchCallback = () => {
                const searchValue = this.searchField.getValue();
                hideSearchPanel();
                this.searchField.setValue('');
                params.search(searchValue);
            };
            this.searchIconArea = new RcdGoogleMaterialIconArea('search', searchCallback)
                .init()
                .setLight(true);
            this.searchField = new RcdMaterialTextField('', 'Search')
                .init()
                .addClass('rcd-material-application-bar-search-field')
                .addKeyUpListener('Enter', searchCallback);
            this.searchCancelIconArea = new RcdGoogleMaterialIconArea('clear', hideSearchPanel)
                .init()
                .setLight(true);
            this.seachPanel = new RcdDivElement().init()
                .addClass('rcd-material-application-bar-search')
                .addChild(this.searchIconArea)
                .addChild(this.searchField)
                .addChild(this.searchCancelIconArea)
                .hide();
        }
        this.leftPanel = new RcdDivElement().init()
            .addClass('rcd-material-application-bar-left')
            .addChild(this.navIconArea)
            .addChild(this.title);
        this.rightPanel = new RcdDivElement().init()
            .addClass('rcd-material-application-bar-right')
            .addChild(this.openSearchIconArea)
            .addChild(this.seachPanel);
    }

    init() {
        return this.addClass('rcd-material-application-bar')
            .addChild(this.leftPanel)
            .addChild(this.rightPanel);
    }

    setNavigationDrawer(navigationDrawer) {
        this.navIconArea.setNavigationDrawer(navigationDrawer);
        return this;
    }

    setTitle(title) {
        this.title.setText(title);
        return this;
    }
    
    setActionItems(actionItems) {
        this.actionItems.forEach(actionItem => this.rightPanel.removeChild(actionItem));
        this.actionItems = actionItems;
        this.actionItems.forEach(actionItem => {
            actionItem.setLight(true);
            this.rightPanel.addChild(actionItem)
        });
        return this;
    }
}

class RcdMaterialNavigationDrawerItem extends RcdAElement {
    constructor(params) {
        super('');
        console.log(params);
        this.iconArea = params.iconArea;
        this.textElement = new RcdTextElement(params.text).
            init().
            addClass('rcd-material-nav-drawer-item-label');
    }

    init() {
        return super.init().
            addClass('rcd-material-nav-drawer-item').
            addChild(this.iconArea).
            addChild(this.textElement);
    }
}

class RcdMaterialNavigationCache extends RcdDivElement {
    constructor() {
        super();
    }

    init() {
        return super.init().addClass('rcd-material-nav-cache');
    }

}

const RcdMaterialNavigationDrawerBehaviour = {
  PERMANENT: 'permanent', 
  TEMPORARY: 'temporary'  
};

class RcdMaterialNavigationDrawer extends RcdNavElement {
    constructor() {
        super();
        this.items = [];
        this.toggled = false;
        this.navIconArea;
        this.cache = new RcdMaterialNavigationCache().init();
    }

    init() {
        super.init().
            addClass('rcd-material-nav-drawer').
            addChild(this.cache);
        this.cache.addClickListener(() => {
            this.setToggled(false);
        });
        return this;
    }

    addItem(item) {
        item.addClickListener((clickedItem) => this.selectItem(clickedItem, true));
        this.items.push(item);
        return this.addChild(item);
    }

    selectItem(itemToSelect, highlight = false) {
        this.items.forEach((item) => item.removeClass('selected').removeClass('highlighted'));
        itemToSelect.addClass('selected');
        if (highlight) {
            itemToSelect.addClass('highlighted');
        }
        this.setToggled(false);
    }

    toggle() {
        return this.setToggled(!this.toggled);
    }

    setToggled(toggled) {
        this.toggled = toggled;
        if (this.navIconArea) {
            this.navIconArea.setToggled(toggled);
        }
        if (toggled) {
            return this.addClass('toggled');
        } else {
            return this.removeClass('toggled');
        }
    }

    setNavIconArea(navIconArea) {
        this.navIconArea = navIconArea;
        return this;
    }
}

class RcdMaterialMain extends RcdDivElement {
    constructor() {
        super();
    }

    init() {
        return super.init().
            addClass('rcd-material-main');
    }
}

class RcdMaterialApplicationShell extends RcdDivElement {
    constructor(params) {
        super();
        this.nav = params.nav.setNavIconArea(params.bar.navIconArea);
        this.bar = params.bar.setNavigationDrawer(params.nav);
        this.main = params.main;
        this.navBehaviour = params.navBehaviour;
    }

    init() {
        return super.init().
            addClass('rcd-material-application').
            setAttribute('nav-behaviour', this.navBehaviour).
            addChild(this.bar).
            addChild(this.nav).
            addChild(this.main);
    }
}