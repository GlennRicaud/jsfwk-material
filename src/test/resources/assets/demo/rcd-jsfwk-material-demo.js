function createApp() {

    function createDialogsRoute() {
        const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().init().
            addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.getInstance().setState()).init()).
            addBreadcrumb(new RcdMaterialBreadcrumb('Dialogs').init());

        const displayDetailsDialog = () => new RcdMaterialDetailsDialog('Details dialog', 'Details dialog text').init().open();
        const displayDetailsButton = new RcdMaterialButtonArea('Details dialog', displayDetailsDialog).init();
        const displayConfirmationDialog = () => new RcdMaterialConfirmationDialog('Confirmation dialog', 'Confirmation dialog text',
            () => alert('Confirmation')).
            init().
            open();
        const displayConfirmationButton = new RcdMaterialButtonArea('Confirmation dialog', displayConfirmationDialog).init();
        const sectionContent = new RcdDivElement().init().
            addChild(displayDetailsButton).
            addChild(displayConfirmationButton);
        const layout = new RcdMaterialSectionLayout('Dialogs', sectionContent).init();

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