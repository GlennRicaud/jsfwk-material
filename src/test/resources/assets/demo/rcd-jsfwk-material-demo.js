function createApp() {

    function createDialogsRoute() {
        const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().init().
            addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.getInstance().setState()).init()).
            addBreadcrumb(new RcdMaterialBreadcrumb('Dialogs').init());

        const button = new RcdMaterialButtonArea('Input dialog').init();
        const layout = new RcdMaterialSectionLayout('Dialogs', button).init();

        return {
            state: 'dialogs',
            name: 'Dialogs',
            iconArea: new RcdGoogleMaterialIconArea('open_in_new').init(),
            callback: (main) => main.addChild(breadcrumbsLayout).addChild(layout)
        };
    }

    function createDefaultRoute() {
        const view = new RcdTextElement('Default').init();
        return {
            callback: (main) => main.addChild(view)
        };
    }

    return new RcdMaterialSinglePageApplication('RCD Material framework - Demo').
        init().
        setDefaultRoute(createDefaultRoute()).
        addRoute(createDialogsRoute()).
        addRoute(createTablesRoute());
}

createApp().start(document.body);