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
                this.iconArea.setText(this.toggled ? 'menu' : 'close');
                if (this.navigationDrawer) {
                    this.navigationDrawer.toggle()
                }
                this.toggled = !this.toggled;
            });
    }

    setNavigationDrawer(navigationDrawer) {
        this.navigationDrawer = navigationDrawer;
        return this;
    }
}


class RcdMaterialApplicationBar extends RcdHeaderElement {
    constructor(title) {
        super();
        this.title = new RcdTextDivElement(title).
            init().
            addClass('rcd-material-application-title');
        this.navIconArea = new RcdMaterialNavIconArea().init();
    }

    init() {
        return this.addClass('rcd-material-application-bar').
            addChild(this.navIconArea).
            addChild(this.title);
    }

    setNavigationDrawer(navigationDrawer) {
        this.navIconArea.setNavigationDrawer(navigationDrawer);
        return this;
    }
}

class RcdMaterialNavigationDrawerItem extends RcdDivElement {
    constructor(params) {
        super();
        this.state = params.state;
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
            addChild(this.text).
            addClickListener(() => {
                if (this.state) {
                    let router = RcdHistoryRouter.getInstance();
                    if (router) {
                        router.setState(this.state);
                    }
                }
                this.addClass('selected');
            });
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
            this.removeClass('toggled');
        } else {
            this.addClass('toggled');
        }
        this.toggled = !this.toggled;
        return this;
    }
}

class RcdMaterialApplication extends RcdDivElement {
    constructor(params) {
        super();
        this.nav = params.nav;
        this.bar = params.bar.setNavigationDrawer(params.nav);
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