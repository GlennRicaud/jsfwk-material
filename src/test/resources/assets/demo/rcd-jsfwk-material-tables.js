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


    const emptyTable = new RcdMaterialTable().init().
        addColumn('First column').
        addColumn('Numeric column', {numeric: true}).
        addColumn('Last column');
    const emptyTableLayout = new RcdMaterialLayout().init().
        addChild(emptyTable);

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
    const previousCallback = () => {
        tableCard.deleteRows();
        tableCard.createRow().
            addCell('First value').
            addCell('2', {numeric: true}).
            addCell('Last value');
        tableCard.createRow().
            addCell('Second col first value').
            addCell('234.0', {numeric: true}).
            addCell('');
        tableCard.setFooter({start: 0, count: 2, total: 3});
    };
    const nextCallback = () => {
        tableCard.deleteRows();
        tableCard.createRow().
            addCell('Third result').
            addCell('3/4', {numeric: true}).
            addCell('');
        tableCard.setFooter({start: 2, count: 1, total: 3});
    };
    tableCard.setFooter({start: 0, count: 2, total: 3, previousCallback: previousCallback, nextCallback: nextCallback});
    const tableCardLayout = new RcdMaterialLayout().init().
        addChild(tableCard);

    const emptyTableCard = new RcdMaterialTableCard('Table card').init().
        addColumn('First column').
        addColumn('Numeric column', {numeric: true}).
        addColumn('Last column');
    emptyTableCard.setFooter({start: 0, count: 0, total: 0});
    const emptyTableCardLayout = new RcdMaterialLayout().init().
        addChild(emptyTableCard);

    const layout = new RcdMaterialSectionLayout('Tables').init().
        addSubSection('Standalone table', standaloneTable).
        addSubSection('Empty standalone table', emptyTable).
        addSubSection('Table in a card', tableCard).
        addSubSection('Empty table in a card', emptyTableCard);


    return {
        state: 'tables',
        name: 'Tables',
        iconArea: new RcdGoogleMaterialIconArea('grid_on').init(),
        callback: (main) => main.addChild(breadcrumbsLayout).
            addChild(layout)
    };
}