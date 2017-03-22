class RcdMaterialApplicationBar extends RcdHeaderElement {
    constructor(params = {}) {
        super();
        this.title = new RcdTextDivElement(params.title).
            init().
            addClass('rcd-material-application-title');
        this.icon = new RcdGoogleMaterialIconArea({iconName: 'menu', light: true}).
            init().
            addClass('rcd-material-application-bar-icon');
    }

    init() {
        return this.addClass('rcd-material-application-bar').
            addChild(this.icon).
            addChild(this.title);
    }
}

class RcdMaterialNavigationDrawerItem extends RcdDivElement {
    constructor(params = {}) {
        super();
        this.key = params.key;
        this.icon = params.icon;
        this.text = new RcdTextElement(params.text).
            init().
            addClass('rcd-material-nav-drawer-item-label');
        this.callback = params.callback;
    }

    init() {
        return super.init().
            addClass('rcd-material-nav-drawer').
            addChild(this.icon).
            addChild(this.text);
    }
}

class RcdMaterialNavigationDrawer extends RcdNavElement {
    constructor(params = {}) {
        super();
        //TODO header
        this.items = params.items || [];
    }

    init() {
        super.init().
            addClass('rcd-material-nav-drawer');
        this.items.forEach((item) => this.addChild(item));
        return this;
    }
}

class RcdMaterialApplication extends RcdDivElement {
    constructor(params = {}) {
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