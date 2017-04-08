class RcdMaterialLayout extends RcdDivElement {
    constructor() {
        super();
    }

    init() {
        return super.init().addClass('rcd-material-layout')
    }
}

class RcdMaterialSectionLayout extends RcdMaterialLayout {
    constructor(title, content) {
        super();
        const h1 = new RcdH1Element().init().
            addClass('rcd-material-section-title').
            addClass('component').
            setText(title);
        this.section = new RcdSectionElement().init().
            addClass('rcd-material-section').
            addChild(h1).
            addChild(content);
    }

    init() {
        return super.init().
            addClass('rcd-material-layout').
            addChild(this.section);
    }

    addSubSection(title, content) {
        const h2 = new RcdH2Element().init().
            addClass('rcd-material-subsection-title').
            addClass('component').
            setText(title);
        const subsection = new RcdSectionElement().init().
            addClass('rcd-material-subsection').
            addChild(h2).
            addChild(content);
        return this.addChild(subsection);
    }
}

