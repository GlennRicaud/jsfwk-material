class RcdMaterialRoute {
    constructor(params) {
        this.state = params.state;
        this.name = params.name;
        this.iconArea = params.iconArea;
        this.view = params.view;
        this.callback = params.callback;
    }
}

class RcdMaterialSinglePageApplication {
    constructor(title) {
        this.title = title;
        this.bar = new RcdMaterialApplicationBar(title).init();
        this.nav = new RcdMaterialNavigationDrawer().init();

        this.shell = new RcdMaterialApplicationShell({
            bar: this.bar,
            nav: this.nav
        }).init();
        this.routes = {};
        this.defaultRoute;
    }

    init() {
        return this;
    }

    setDefaultRoute(route) {
        this.defaultRoute = route;
        RcdHistoryRouter.getInstance().setDefaultRoute(route.callback);
        return this;
    }

    addRoute(route) {
        this.routes[route.state] = route;
        RcdHistoryRouter.getInstance().addRoute(route.state, () => {
            this.bar.setTitle(route.name);
            route.callback();
            //this.shell.refresh();
        });
        let navDrawerItem = new RcdMaterialNavigationDrawerItem({
            iconArea: route.iconArea,
            text: route.name
        }).init().addClickListener(() => RcdHistoryRouter.getInstance().setState(route.state));
        this.nav.addItem(navDrawerItem);
        return this;
    }
    
    start(parent) {
        RcdHistoryRouter.getInstance().setState(RcdHistoryRouter.getInstance().getCurrentState());
        this.shell.setParent(parent);
    }
}

