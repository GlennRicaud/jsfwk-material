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

class RcdMaterialApplicationBar extends RcdHeaderElement {
    constructor(params = {}) {
        super();
        this.title = new RcdTextDivElement(params.title).init();
    }

    init() {
        return this.addClass('rcd-material-application-bar').
            addChild(this.title);
    }
}