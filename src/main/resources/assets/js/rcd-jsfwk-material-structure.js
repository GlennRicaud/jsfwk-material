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

    setTitle(title) {
        this.title.setText(title);
    }
}

class RcdMaterialNavigationDrawerItem extends RcdDivElement {
    constructor(params) {
        super();
        this.iconArea = params.iconArea;
        this.text = new RcdTextElement(params.text).
            init().
            addClass('rcd-material-nav-drawer-item-label');
    }

    init() {
        return super.init().
            addClass('rcd-material-nav-drawer-item').
            addChild(this.iconArea).
            addChild(this.text).
            addClickListener(() => {
                if (this.state) {
                    RcdHistoryRouter.getInstance().setState(this.state);
                }
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
        item.addClickListener((clickedItem) => {
            this.items.forEach((item) => item.removeClass('selected').removeClass('highlighted'));
            clickedItem.addClass('selected').
                addClass('highlighted');
            this.setToggled(false);
        });
        this.items.push(item);
        return this.addChild(item);
    }

    toggle() {
        this.toggled = !this.toggled;
        return this.setToggled(this.toggled);
    }

    setToggled(toggled) {
        if (toggled) {
            return this.addClass('toggled');
        } else {
            return this.removeClass('toggled');
        }
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
        this.nav = params.nav;
        this.bar = params.bar.setNavigationDrawer(params.nav);
        this.main = params.main;
    }

    init() {
        return super.init().
            addClass('rcd-material-application').
            addChild(this.bar).
            addChild(this.nav).
            addChild(this.main);
    }
}