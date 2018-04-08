const RcdMaterialListRowType = {
    SINGLE_LINE: 'rcd-material-list-row-single',
    TWO_LINE: 'rcd-material-list-row-two',
    THREE_LINE: 'rcd-material-list-row-three'
};

class RcdMaterialListRowText extends RcdDivElement {
    constructor(primaryText, secondaryText, params) {
        super();
        this.primaryText = new RcdTextElement(primaryText).init()
            .addClass('rcd-material-list-row-primary');
        if (secondaryText) {
            if (RcdMaterialListRowType.THREE_LINE == params.type) {
                this.secondaryText = new RcdPElement().init().setText(secondaryText);
            } else {
                this.secondaryText = new RcdTextElement(secondaryText).init();
            }
            this.secondaryText.addClass('rcd-material-list-row-secondary');
        }
    }

    init() {
        console.log('q');
        return this.addClass('rcd-material-list-row-text')
            .addChild(this.primaryText)
            .addChild(this.secondaryText);
    }
}

class RcdMaterialListRow extends RcdDivElement {
    constructor(primaryText, secondaryText, params = {}) {
        super();
        this.rowText = new RcdMaterialListRowText(primaryText, secondaryText, params).init();
        this.rowType = params.type || (secondaryText ? RcdMaterialListRowType.TWO_LINE : RcdMaterialListRowType.SINGLE_LINE);
        this.icon = params.icon;
        this.callback = params.callback;
    }

    init() {
        this.addClass('rcd-material-list-row')
            .addClass(this.rowType)
            .addChild(this.icon)
            .addChild(this.rowText);

        if (this.callback) {
            this.addClass('rcd-clickable')
                .addClickListener((target, event) => {
                    this.callback(this, event);
                });
        }

        return this;
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

    addRow(primaryText, secondaryText, params) {
        this.createRow(primaryText, secondaryText, params);
        return this;
    }

    createRow(primaryText, secondaryText, params) {
        const row = new RcdMaterialListRow(primaryText, secondaryText, params).init();
        this.rows.push(row);
        this.addChild(row);
        return row;
    }

    deleteRows() {
        this.removeAllChildren();
        this.rows = [];
        return this;
    }
}

class RcdMaterialListCard extends RcdMaterialList {
    constructor() {
        super();
    }

    init() {
        return super.init().addClass('rcd-material-list-card');
    }
}