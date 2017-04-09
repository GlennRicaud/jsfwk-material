class RcdMaterialRoute {
    constructor(params) {
        this.state = params.state;
        this.name = params.name;
        this.iconArea = params.iconArea;
        this.callback = params.callback;
    }
}

class RcdMaterialSinglePageApplication {
    constructor(title) {
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

    setDefaultRoute(route) {
        this.defaultRoute = route;
        RcdHistoryRouter.getInstance().setDefaultRoute(() => {
            this.bar.setTitle(this.title);
            this.main.removeAllChildren();
            route.callback(this.main);
        });
        return this;
    }

    addRoute(route) {
        this.routes[route.state] = route;
        RcdHistoryRouter.getInstance().addRoute(route.state, () => {
            this.bar.setTitle(route.name);
            //this.shell.refresh();
            this.main.removeAllChildren();
            route.callback(this.main);
        });
        //TODO
        if (route.iconArea) {
            let navDrawerItem = new RcdMaterialNavigationDrawerItem({
                iconArea: route.iconArea,
                text: route.name
            }).init().addClickListener(() => RcdHistoryRouter.getInstance().setState(route.state));
            this.nav.addItem(navDrawerItem);
        }
        return this;
    }

    start(parent) {
        RcdHistoryRouter.getInstance().setState(RcdHistoryRouter.getInstance().getCurrentState());
        this.shell.setParent(parent);
    }
}

