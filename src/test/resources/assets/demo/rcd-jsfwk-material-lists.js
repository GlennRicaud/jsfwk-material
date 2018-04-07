function createListsRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().init()
        .addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.setState()).init())
        .addBreadcrumb(new RcdMaterialBreadcrumb('Lists').init());

    const list = new RcdMaterialList().init().
        addRow('Single line').
        addRow('Two line row', 'Second line').
        addRow('Three line row', 'Second line but with a longer text');

    const sectionContent = new RcdDivElement().init()
        .addChild(list);
    const layout = new RcdMaterialSectionLayout('Lists', sectionContent).init();

    return new RcdMaterialRoute({
        state: 'lists',
        name: 'Lists',
        callback: (main) => main.addChild(breadcrumbsLayout).addChild(layout)
    });
}