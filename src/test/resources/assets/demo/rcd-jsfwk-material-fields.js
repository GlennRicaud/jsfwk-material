function createFieldsRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().init()
        .addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.setState()).init())
        .addBreadcrumb(new RcdMaterialBreadcrumb('Fields').init());

    const textField = new RcdMaterialTextField('mylabel', 'myplaceholder').init();
    
    const textArea = new RcdMaterialTextArea('mylabel', 'myplaceholder').init();

    const sectionContent = new RcdDivElement().init()
        .addChild(textField)
        .addChild(textArea);
    const layout = new RcdMaterialSectionLayout('Dialogs', sectionContent).init();

    return new RcdMaterialRoute({
        state: 'fields',
        name: 'Fields',
        callback: (main) => main.addChild(breadcrumbsLayout).addChild(layout)
    });
}