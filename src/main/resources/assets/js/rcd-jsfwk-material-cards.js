class RcdMaterialCard extends RcdDivElement {
    constructor(params = {}) {
        super();
        this.header = new RcdMaterialCardHeader({
            title: params.title
        }).init()
            .addClass('rcd-material-card-title');
    }

    init() {
        return super.init()
            .addClass('rcd-material-card')
            .addChild(this.header);
    }
}

class RcdMaterialCardHeader extends RcdDivElement {
    constructor(params = {}) {
        super();
        this.title = new RcdTextDivElement(params.title).init();
    }

    init() {
        return super.init()
            .addClass('rcd-material-card-header')
            .addChild(this.title);
    }
}