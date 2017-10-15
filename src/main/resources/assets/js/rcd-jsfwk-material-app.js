class RcdMaterialRoute extends RcdObject{
    constructor(params) {
        super();
        this.state = params.state;
        this.name = params.name;
        this.iconArea = params.iconArea;
        this.callback = params.callback;
    }
}

class RcdMaterialSinglePageApplication extends RcdObject{
    constructor(title) {
        super();
        this.title = title;
        this.bar = new RcdMaterialApplicationBar(title).init();
        this.nav = new RcdMaterialNavigationDrawer().init();
        this.main = new RcdMaterialMain().init();

        this.shell = new RcdMaterialApplicationShell({
            bar: this.bar,
            nav: this.nav,
            main: this.main
        }).init();
        this.routes = {};
        this.defaultRoute;
    }

    init() {
        return this;
    }

    setTitle(title) {
        this.title = title;
        this.bar.setTitle(title);
    }

    setDefaultRoute(route) {
        this.defaultRoute = route;
        RcdHistoryRouter.setDefaultRoute(() => {
            this.setTitle(this.title);
            this.main.removeAllChildren();
            route.callback(this.main);
        });
        return this;
    }

    addRoute(route) {
        this.routes[route.state] = route;
        let navDrawerItem;
        if (route.name) {
            navDrawerItem = new RcdMaterialNavigationDrawerItem({
                iconArea: route.iconArea,
                text: route.name
            }).init().
                addClass(route.iconArea && 'icon-item').
                addClickListener(() => RcdHistoryRouter.setState(route.state));
            this.nav.addItem(navDrawerItem);
        }
        RcdHistoryRouter.addRoute(route.state, () => {
            this.setTitle(route.name);
            if(navDrawerItem) {
                this.nav.selectItem(navDrawerItem);
            }
            this.main.removeAllChildren();
            route.callback(this.main);
        });
        return this;
    }

    start(parent) {
        RcdHistoryRouter.refresh();
        this.shell.setParent(parent);
    }
}

