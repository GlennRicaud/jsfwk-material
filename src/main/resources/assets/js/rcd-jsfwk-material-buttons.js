const RcdMaterialButtonType = {
    FLAT: 0,
    RAISED: 1,
    FLOATING: 2
};

class RcdMaterialButton extends RcdTextDivElement {
    constructor(label, type = RcdMaterialButtonType.RAISED) {
        super(label);
        this.type = type;
    }

    init() {
        super.init().
            addClass('rcd-material-button');
        if (RcdMaterialButtonType.RAISED = this.type) {
            this.addClass('raised');
        } else if (RcdMaterialButtonType.FLAT = this.type) {
            this.addClass('flat');
        }
        return this;
    }
}


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

