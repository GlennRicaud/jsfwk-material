class RcdMaterialBreadcrumb extends RcdTextDivElement{
    constructor(name, callback) {
        super(name);
        this.name = name;
        this.callback = callback;
    }

    init() {
        return super.init().addClass('rcd-material-breadcrumb');
    }
}

class RcdMaterialBreadcrumbs extends RcdDivElement {
    constructor() {
        super();
        this.breadcrumbs = [];
    }

    init() {
        return this.addClass('rcd-material-breadcrumbs');
    }

    setBreadcrumbs(breadcrumbs) {
        this.breadcrumbs = [];
        this.removeAllChildren();
        this.addPathElements(breadcrumbs);
    }

    addBreadcrumbs(breadcrumbs) {
        breadcrumbs.forEach(this.addBreadcrumb, this);
        return this;
    }

    addBreadcrumb(breadcrumb) {
        this.breadcrumbs.push(breadcrumb);
        if (this.breadcrumbs.length > 1) {
            this.addChild(new RcdTextElement(' / ').init());
        }
        if (breadcrumb.callback) {
            breadcrumb.addClickListener(breadcrumb.callback);
        }
        return this.addChild(breadcrumb);
    }
}