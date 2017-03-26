class RcdMaterialButton extends RcdTextDivElement {
    constructor(label, type = RcdMaterialButton.TYPE.RAISED) {
        super(label);
        this.type = type;
    }

    init() {
        super.init().
            addClass('rcd-material-button');
        if (RcdMaterialButton.TYPE.RAISED = this.type) {
            this.addClass('raised');
        } else if (RcdMaterialButton.TYPE.FLAT = this.type) {
            this.addClass('flat');
        }
        return this;
    }
}
RcdMaterialButton.TYPE = {
    FLAT: 0,
    RAISED: 1,
    FLOATING: 2
};


class RcdMaterialButtonArea extends RcdMaterialAction {
    constructor(label, callback, type) {
        super(callback);
        this.button = new RcdMaterialButton(label, type).init();
    }

    init() {
        return super.init().
            addClass('rcd-material-button-area').
            addChild(this.button);
    }
}

