
class RcdMaterialBreadcrumbs extends RcdDivElement {
    constructor() {
        super();
        this.breadcrumbs = [];
    }

    init() {
        return this.addClass('rcd-material-breadcrumbs');
    }

    setPathElements(pathElements) {
        this.breadcrumbs = [];
        this.removeAllChildren();
        this.addPathElements(pathElements);
    }

    addPathElements(pathElements) {
        pathElements.forEach(this.addPathElement, this);
        return this;
    }

    addPathElement(pathElement) {
        this.breadcrumbs.push(pathElement.name);
        if (this.breadcrumbs.length > 1) {
            this.addChild(new RcdTextElement(' / ').init());
        }
        const breadcrumb = new RcdTextDivElement(pathElement.name).init().
            addClass('rcd-material-breadcrumb');

        if (pathElement.callback) {
            breadcrumb.addClickListener(pathElement.callback);
        }
        return this.addChild(breadcrumb);
    }
}

class RcdMaterialView extends RcdDivElement {
    constructor(viewId, pathElements, description) {
        super();
        this.viewId = viewId;
        this.title = new RcdTextDivElement(pathElements[pathElements.length - 1].name).
            init().
            addClass('rcd-material-content-title');
        this.breadcrumbs = new RcdMaterialBreadcrumbs().
            init().
            addPathElements(pathElements);
        this.header = new RcdDivElement().
            init().
            addClass('rcd-material-content-header').
            addChild(this.title).
            addChild(this.breadcrumbs);

        this.description = new RcdParagraphDivElement(description).init().addClass('rcd-material-content-description');
    }

    init() {
        return this.addClass('rcd-material-view').
            addChild(this.header).
            addChild(this.description);
    }

    setPathElements(pathElements) {
        const title = pathElements[pathElements.length - 1].name;
        this.title.setText(title);
        this.breadcrumbs.setPathElements(pathElements);
    }
}

class RcdMaterialContent extends RcdDivElement {
    constructor() {
        super();
        this.views = {};
        this.currentView;
    }

    init() {
        return this.addClass('rcd-material-content');
    }

    addView(view) {
        this.views[view.viewId] = view;
        return this;
    }

    displayView(viewId) {
        if (this.currentView) {
            this.removeChild(this.currentView);
        }
        this.currentView = this.views[viewId];
        this.addChild(this.currentView);
        return this;
    }
}

class RcdMaterialMain extends RcdMainElement {
    constructor() {
        super();
        this.nav = new RcdMaterialNav().init();
        this.content = new RcdMaterialContent().init();
    }

    init() {
        return this.addClass('rcd-material-main').
            addChild(this.nav).
            addChild(this.content);
    }
}