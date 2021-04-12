function createCardsRoute() {
    const card = new RcdMaterialCard({
        title: 'CardTitle'
    }).init();
    const layout = new RcdMaterialSectionLayout('Cards')
        .init()
        .addSubSection('Card', card);

    return new RcdMaterialRoute({
        state: 'cards',
        name: 'Cards',
        callback: (main) => main.addChild(layout)
    });
}