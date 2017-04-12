function createTablesRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().init().
        addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.setState()).init()).
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

    const tableCard = new RcdMaterialTableCard('Table card').init().
        addColumn('First column').
        addColumn('Numeric column', {numeric: true}).
        addColumn('Last column').
        addIconArea(new RcdGoogleMaterialIconArea('add', () => alert('No selection action')).init().setTooltip('No selection action'),
        {max: 0}).
        addIconArea(new RcdGoogleMaterialIconArea('edit', () => alert('One item action')).init().setTooltip('One item action'),
        {min: 1, max: 1}).
        addIconArea(new RcdGoogleMaterialIconArea('delete', () => alert('Min one item action')).init(), {min: 1}).
        addIconArea(new RcdGoogleMaterialIconArea('info', () => alert('Always present action')).init());
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

    const emptyTableCard = new RcdMaterialTableCard('Table card').init().
        addColumn('First column').
        addColumn('Numeric column', {numeric: true}).
        addColumn('Last column');
    emptyTableCard.setFooter({start: 0, count: 0, total: 0});

    const sectionContent = new RcdPElement().init().
        setText('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
                'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
                'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
    const layout = new RcdMaterialSectionLayout('Tables', sectionContent).init().
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