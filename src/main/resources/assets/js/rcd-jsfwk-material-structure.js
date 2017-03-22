class RcdMaterialApplicationBar extends RcdHeaderElement {
    constructor(title) {
        super();
        this.title = new RcdTextDivElement(title).
            init().
            addClass('rcd-material-application-title');
        this.iconArea = new RcdGoogleMaterialIconArea('menu').
            init().
            setLight(true).
            addClass('rcd-material-application-bar-icon');
    }

    init() {
        return this.addClass('rcd-material-application-bar').
            addChild(this.iconArea).
            addChild(this.title);
    }

    linkNavigationDrawer(navigationDrawer) {
        this.iconArea.addClickListener(() => navigationDrawer.toggle());
        return this;
    }
}

class RcdMaterialNavigationDrawerItem extends RcdDivElement {
    constructor(params) {
        super();
        this.key = params.key;
        this.iconArea = params.iconArea;
        this.text = new RcdTextElement(params.text).
            init().
            addClass('rcd-material-nav-drawer-item-label');
        this.callback = params.callback;
    }

    init() {
        return super.init().
            addClass('rcd-material-nav-drawer-item').
            addChild(this.iconArea).
            addChild(this.text);
    }
}

class RcdMaterialNavigationDrawer extends RcdNavElement {
    constructor() {
        super();
        this.items = [];
        this.toggled = false;
    }

    init() {
        super.init().
            addClass('rcd-material-nav-drawer');
        return this;
    }

    addItem(item) {
        this.items.push(item);
        return this.addChild(item);
    }

    toggle() {
        if (this.toggled) {
            this.toggled = false;
            this.removeClass('toggled');
        } else {
            this.toggled = true;
            this.addClass('toggled');
        }
        return this;
    }
}

class RcdMaterialApplication extends RcdDivElement {
    constructor(params) {
        super();
        this.nav = params.nav;
        this.bar = params.bar.linkNavigationDrawer(params.nav);
        this.main = new RcdMainElement().init();
    }

    init() {
        return super.init().
            addClass('rcd-material-application').
            addChild(this.bar).
            addChild(this.nav).
            addChild(this.main);
    }
}