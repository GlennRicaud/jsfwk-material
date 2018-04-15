function createApp() {
    function createDefaultRoute() {
        const view = new RcdTextElement('Default').init();
        return new RcdMaterialRoute({
            callback: (main) => main.addChild(view)
        });
    }

    return new RcdMaterialSinglePageApplication(
        {title: 'RCD Material framework - Demo', search: (value) => alert('Searching for ' + value), nav: {behaviour: RcdMaterialNavigationDrawerBehaviour.PERMANENT}}).init()
        .setDefaultRoute(createDefaultRoute())
        .addRoute(createDialogsRoute())
        .addRoute(createTablesRoute())
        .addRoute(createListsRoute())
        .addRoute(createSnackbarsRoute())
        .addRoute(createFieldsRoute())
        .addRoute(createProgressRoute());
}

createApp().start(document.body);