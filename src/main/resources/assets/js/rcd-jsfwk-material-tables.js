class RcdMaterialTableCardHeader extends RcdHeaderElement {
    constructor(title) {
        super();
        this.title = new RcdTextElement(title).init().
            addClass('rcd-material-table-card-title');
    }

    init() {
        return super.init().
            addClass('rcd-material-table-card-header').
            addChild(this.title);
    }
}

class RcdMaterialTableCard extends RcdDivElement {
    constructor(title) {
        super();
        this.header = new RcdMaterialTableCardHeader(title).init();
    }

    init() {
        return super.init().
            addClass('rcd-material-table-card').
            addChild(this.header);
    }
}