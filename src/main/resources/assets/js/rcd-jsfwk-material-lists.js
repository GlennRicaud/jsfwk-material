const RcdMaterialListRowType = {
    SINGLE_LINE: 'rcd-material-list-row-single',
    TWO_LINE: 'rcd-material-list-row-two',
    THREE_LINE: 'rcd-material-list-row-three'
};

class RcdMaterialListRow extends RcdDivElement {
    constructor(primaryText, secondaryText, type) {
        super();
        this.primaryText = new RcdTextElement(primaryText).init()
            .addClass('rcd-material-list-row-primary');
        this.secondaryText = secondaryText ? new RcdTextElement(secondaryText).init()
            .addClass('rcd-material-list-row-secondary') : undefined;
        this.rowType = type || (secondaryText ? RcdMaterialListRowType.TWO_LINE : RcdMaterialListRowType.SINGLE_LINE);
    }

    init() {
        return this.addClass('rcd-material-list-row')
            .addClass(this.rowType)
            .addChild(this.primaryText)
            .addChild(this.secondaryText);
    }
}

class RcdMaterialList extends RcdDivElement {
    constructor() {
        super();
        this.rows = [];
    }

    init() {
        return this.addClass('rcd-material-list');
    }

    addRow(primaryText, secondaryText, type) {
        const row = new RcdMaterialListRow(primaryText, secondaryText, type).init();
        this.rows.push(row);
        return this.addChild(row);
    }

    deleteRows() {
        this.removeAllChildren();
        this.rows = [];
        return this;
    }
}