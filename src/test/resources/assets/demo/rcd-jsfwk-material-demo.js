function createApp() {

    function createDialogsRoute() {
        const view = new RcdTextElement('Dialogs').init();
        return {
            state: 'dialogs',
            name: 'Dialogs',
            iconArea: new RcdGoogleMaterialIconArea('open_in_new').init(),
            callback: (main) => main.addChild(view)
        };
    }

    function createDefaultRoute() {
        const view = new RcdTextElement('Default').init();
        return {
            callback: (main) => main.addChild(view)
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

    return new RcdMaterialSinglePageApplication('Demo').
        init().
        setDefaultRoute(createDefaultRoute()).
        addRoute(createDialogsRoute()).
        addRoute(createTablesRoute());
}

createApp().start(document.body);