function createApp() {

    function createLayoutRoute() {
        const breadCrumbs = new RcdMaterialBreadcrumbs().init().
            addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.getInstance().setState()).init()).
            addBreadcrumb(new RcdMaterialBreadcrumb('Layout').init());
        const layout = new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init());
        return {
            state: 'layout',
            name: 'Layout',
            iconArea: new RcdGoogleMaterialIconArea('open_in_new').init(),
            callback: (main) => main.addChild(breadCrumbs).addChild(layout).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init())).
                addChild(new RcdMaterialLayout().init().addChild(new RcdTextElement('Test').init()))
    };
}

function createDialogsRoute() {
    const breadCrumbs = new RcdMaterialBreadcrumbs().init().
        addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.getInstance().setState()).init()).
        addBreadcrumb(new RcdMaterialBreadcrumb('Dialogs').init());

    return {
        state: 'dialogs',
        name: 'Dialogs',
        iconArea: new RcdGoogleMaterialIconArea('open_in_new').init(),
        callback: (main) => main.addChild(breadCrumbs)
    };
}

function createTablesRoute() {
    const view = new RcdTextElement('Tables').init();
    return {
        state: 'tables',
        name: 'Tables',
        iconArea: new RcdGoogleMaterialIconArea('grid_on').init(),
        callback: (main) => main.addChild(view)
    };
}

function createDefaultRoute() {
    const view = new RcdTextElement('Default').init();
    return {
        callback: (main) => main.addChild(view)
    };
}

return new RcdMaterialSinglePageApplication('Demo').
    init().
    setDefaultRoute(createDefaultRoute()).
    addRoute(createLayoutRoute()).
    addRoute(createDialogsRoute()).
    addRoute(createTablesRoute());
}

createApp().start(document.body);