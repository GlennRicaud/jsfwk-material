function createTablesRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().
        init().
        addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.getInstance().setState()).init()).
        addBreadcrumb(new RcdMaterialBreadcrumb('Tables').init());


    const standaloneTable = new RcdMaterialTable().init().
        addColumn('First column').
        addColumn('Numeric column', {numeric: true}).
        addColumn('Last column');
    standaloneTable.createRow().
        addCell('First value').
        addCell('2', {numeric: true}).
        addCell('Last value');
    standaloneTable.createRow().
        addCell('Second col first value').
        addCell('234.0', {numeric: true}).
        addCell('');
    const standaloneTableLayout = new RcdMaterialLayout().init().
        addChild(standaloneTable);


    const tableCard = new RcdMaterialTableCard('Table card').init().
        addColumn('First column').
        addColumn('Numeric column', {numeric: true}).
        addColumn('Last column');
    tableCard.createRow().
        addCell('First value').
        addCell('2', {numeric: true}).
        addCell('Last value');
    tableCard.createRow().
        addCell('Second col first value').
        addCell('234.0', {numeric: true}).
        addCell('');
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