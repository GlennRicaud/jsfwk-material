function createTablesRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().
        init().
        addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.getInstance().setState()).init()).
        addBreadcrumb(new RcdMaterialBreadcrumb('Tables').init());


    const standaloneTable = new RcdMaterialTable().init().
        addColumn('First column').
        addColumn('Numeric column').
        addColumn('Last column');
    standaloneTable.createRow().
        addCell('First value').
        addCell('2').
        addCell('Last value');
    const standaloneTableLayout = new RcdMaterialLayout().init().
        addChild(standaloneTable);


    const tableCard = new RcdMaterialTableCard('Table card').init();
    const tableCardLayout = new RcdMaterialLayout().init().
        addChild(tableCard);


    return {
        state: 'tables',
        name: 'Tables',
        iconArea: new RcdGoogleMaterialIconArea('grid_on').init(),
        callback: (main) => main.addChild(breadcrumbsLayout).
            addChild(standaloneTableLayout).
            addChild(tableCardLayout)
    };
}