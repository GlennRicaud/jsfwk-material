function createListsRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().init()
        .addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.setState()).init())
        .addBreadcrumb(new RcdMaterialBreadcrumb('Lists').init());

    const list = new RcdMaterialListCard().init()
        .setStyle({'width': '300px'})
        .addRow('Single line', null, {icon:new RcdGoogleMaterialIcon('open_in_new').init()})
        .addRow('Single line with action', null, {callback: () => alert('Action')})
        .addRow('Two line row', 'Second line with a long text that is going to be truncated')
        .addRow('Three line row',
            'Second line but with a longer text that will not fix on one row and is going to be truncated on the second line',
            {type: RcdMaterialListRowType.THREE_LINE});

    const sectionContent = new RcdDivElement().init()
        .addChild(list);
    const layout = new RcdMaterialSectionLayout('Lists', sectionContent).init();

    return new RcdMaterialRoute({
        state: 'lists',
        name: 'Lists',
        callback: (main) => main.addChild(breadcrumbsLayout).addChild(layout)
    });
}