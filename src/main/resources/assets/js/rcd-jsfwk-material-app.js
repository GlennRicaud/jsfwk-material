class RcdMaterialRoute {
    constructor(params) {
        this.state = params.state;
        this.view = params.view;
        this.callback = params.callback;
    }
}

class RcdMaterialSinglePageApplication {
    constructor(shell) {
        this.shell = shell;
        this.routes = {};
    }

    init() {
        return this;
    }

    addRoute(route) {
        this.routes[route.state] = route;
        RcdHistoryRouter.getInstance().addRoute(route.state, () => {
            route.callback();
            //TODO Display view
            this.shell.refresh();
        });
        return this;
    }

    setParent(parent) {
        this.shell.setParent(parent);
    }
}

