class RcdMaterialBreadcrumb extends RcdAElement {
    constructor(name, params) {
        super(name, params && params.href);
        this.name = name;
        this.callback = params && params.callback;
    }

    init() {
        return super.init()
            .addClass('rcd-material-breadcrumb');
    }
}

class RcdMaterialBreadcrumbs extends RcdDivElement {
    constructor() {
        super();
        this.breadcrumbs = [];
    }

    init() {
        return super.init()
            .addClass('rcd-material-breadcrumbs');
    }

    setBreadcrumbs(breadcrumbs) {
        this.breadcrumbs = [];
        this.removeAllChildren();
        this.addBreadcrumbs(breadcrumbs);
    }

    addBreadcrumbs(breadcrumbs) {
        breadcrumbs.forEach((breadcrumb) => this.addBreadcrumb(breadcrumb));
        return this;
    }

    addBreadcrumb(breadcrumb, separator = ' / ') {
        this.breadcrumbs.push(breadcrumb);
        if (this.breadcrumbs.length > 1) {
            this.addChild(new RcdTextElement(separator).init());
        }
        if (breadcrumb.callback) {
            breadcrumb.addClickListener(breadcrumb.callback);
        }
        return this.addChild(breadcrumb);
    }
}

class RcdMaterialBreadcrumbsLayout extends RcdMaterialLayout {
    constructor() {
        super();
        this.breadcrumbs = new RcdMaterialBreadcrumbs().init();
    }

    init() {
        return super.init().addClass('rcd-material-breadcrumbs-layout').addChild(this.breadcrumbs);
    }

    setBreadcrumbs(breadcrumbs) {
        this.breadcrumbs.setBreadcrumbs(breadcrumbs);
        return this;
    }

    addBreadcrumbs(breadcrumbs) {
        this.breadcrumbs.addBreadcrumbs(breadcrumbs);
        return this;
    }

    addBreadcrumb(breadcrumb, separator) {
        this.breadcrumbs.addBreadcrumb(breadcrumb, separator);
        return this;
    }
}