class RcdMaterialApplicationBar extends RcdHeaderElement {
    constructor(params = {}) {
        super();
        this.title = new RcdTextDivElement(params.title).
            init().
            addClass('rcd-material-application-title');
        this.navIcon = new RcdGoogleMaterialIconArea({iconName: 'menu', light: true}).
            init();
    }

    init() {
        return this.addClass('rcd-material-application-bar').
            addChild(this.navIcon).
            addChild(this.title);
    }
}

class RcdMaterialApplication extends RcdDivElement {
    constructor(params = {}) {
        super();
        this.applicationBar = params.applicationBar;
        this.navigationDrawer = params.navigationDrawer;
        this.main = new RcdMainElement().init();
    }

    init() {
        return this.addClass('rcd-material-application').
            addChild(this.applicationBar).
            addChild(this.nav).
            addChild(this.main);
    }
}