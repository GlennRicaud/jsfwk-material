function createApp() {
    function createDefaultRoute() {
        const view = new RcdTextElement('Default').init();
        return new RcdMaterialRoute({
            callback: (main) => main.addChild(view)
        });
    }

    return new RcdMaterialSinglePageApplication({title:'RCD Material framework - Demo', nav: {behaviour:RcdMaterialNavigationDrawerBehaviour.PERMANENT}}).
        init().
        setDefaultRoute(createDefaultRoute()).
        addRoute(createDialogsRoute()).
        addRoute(createTablesRoute()).
        addRoute(createSnackbarsRoute());
}

createApp().start(document.body);