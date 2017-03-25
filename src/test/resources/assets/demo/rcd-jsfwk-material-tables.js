function createTablesRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().
        init().
        addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.getInstance().setState()).init()).
        addBreadcrumb(new RcdMaterialBreadcrumb('Tables').init());


    const tableCard = new RcdMaterialTableCard('Table card').init();

    const layout = new RcdMaterialLayout().init().
        addChild(tableCard);


    return {
        state: 'tables',
        name: 'Tables',
        iconArea: new RcdGoogleMaterialIconArea('grid_on').init(),
        callback: (main) => main.addChild(breadcrumbsLayout).addChild(layout)
    };
}