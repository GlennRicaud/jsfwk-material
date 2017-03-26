class RcdMaterialLayout extends RcdDivElement {
    constructor() {
        super();
    }

    init() {
        return super.init().addClass('rcd-material-layout')
    }
}

class RcdMaterialSectionLayout extends RcdMaterialLayout {
    constructor(title) {
        super();
        this.title = new RcdH1Element().init().
            addClass('rcd-material-section-title').
            setText(title);
        this.section = new RcdSectionElement().init().
            addClass('rcd-material-section').
            addChild(this.title);
    }

    init() {
        return super.init().
            addClass('rcd-material-layout').
            addChild(this.section);
    }

    addSubSection(title, content) {
        const subsectionTitle = new RcdH2Element().init().
            addClass('rcd-material-subsection-title').
            setText(title);
        const subsection = new RcdSectionElement().init().
            addClass('rcd-material-subsection').
            addChild(subsectionTitle).
            addChild(content);
        return this.addChild(subsection);
    }
}

class RcdMaterialFullWidthLayout extends RcdDivElement {
    constructor() {
        super();
    }

    init() {
        return super.init().addClass('rcd-material-full-width-layout')
    }
}

