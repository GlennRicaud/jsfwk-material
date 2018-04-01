function createProgressRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().init()
        .addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.setState()).init())
        .addBreadcrumb(new RcdMaterialBreadcrumb('Progress').init());

    const progressIndicator = new RcdLinearProgressIndicator({width: 200, height: 200}).init().setProgress(0.3);

    const sectionContent = new RcdDivElement().init()
        .addChild(progressIndicator);
    const layout = new RcdMaterialSectionLayout('Progress', sectionContent).init();

    return new RcdMaterialRoute({
        state: 'progress',
        name: 'Progress',
        callback: (main) => main.addChild(breadcrumbsLayout).addChild(layout)
    });
}