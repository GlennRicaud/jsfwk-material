function createDialogsRoute() {
    const breadcrumbsLayout = new RcdMaterialBreadcrumbsLayout().init().
        addBreadcrumb(new RcdMaterialBreadcrumb('Demo', () => RcdHistoryRouter.getInstance().setState()).init()).
        addBreadcrumb(new RcdMaterialBreadcrumb('Dialogs').init());

    const displayDetailsDialog = () => new RcdMaterialDetailsDialog({
        title: 'Details dialog',
        text: 'Details dialog text'
    }).init().open();
    const displayDetailsButton = new RcdMaterialButtonArea('Details dialog', displayDetailsDialog).init();

    const displayConfirmationDialog = () => new RcdMaterialConfirmationDialog({
        title: 'Confirmation dialog',
        text: 'Confirmation dialog text',
        callback: () => alert('Confirmation')
    }).init().
        open();
    const displayConfirmationButton = new RcdMaterialButtonArea('Confirmation dialog', displayConfirmationDialog).init();
    
    const displaySelectionDialog = () => new RcdMaterialSelectionDialog({
        title: 'Selection dialog',
        label: 'Label',
        options: ['Option1', 'Option2'],
        callback: (selectedValue) => alert('Selected value: ' + selectedValue)
    }).init().
        open();
    const displaySelectionButton = new RcdMaterialButtonArea('Selection dialog', displaySelectionDialog).init();


    const sectionContent = new RcdDivElement().init().
        addChild(displayDetailsButton).
        addChild(displayConfirmationButton).
        addChild(displaySelectionButton);
    const layout = new RcdMaterialSectionLayout('Dialogs', sectionContent).init();

    return {
        state: 'dialogs',
        name: 'Dialogs',
        iconArea: new RcdGoogleMaterialIconArea('open_in_new').init(),
        callback: (main) => main.addChild(breadcrumbsLayout).addChild(layout)
    };
}