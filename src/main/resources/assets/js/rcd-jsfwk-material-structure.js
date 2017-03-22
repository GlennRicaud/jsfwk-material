class RcdMaterialApplicationBar extends RcdHeaderElement {
    constructor(title) {
        super();
        this.title = new RcdTextDivElement(title).
            init().
            addClass('rcd-material-application-title');
        this.icon = new RcdGoogleMaterialIconArea('menu').
            init().
            setLight(true).
            addClass('rcd-material-application-bar-icon');
    }

    init() {
        return this.addClass('rcd-material-application-bar').
            addChild(this.icon).
            addChild(this.title);
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
}

class RcdMaterialApplication extends RcdDivElement {
    constructor(params) {
        super();
        this.bar = params.bar;
        this.nav = params.nav;
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