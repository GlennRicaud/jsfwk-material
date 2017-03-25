class RcdMaterialTableCell extends RcdTdElement {
    constructor() {
        super();
    }

    init() {
        return this.addClass('rcd-material-table-cell');
    }
}

class RcdMaterialTableCheckbox extends RcdGoogleMaterialIconArea {
    constructor() {
        super('check_box_outline_blank');
    }

    init() {
        return super.init().
            addClass('rcd-material-table-checkbox').
            setCallback(() => {
                const wasSelected = this.isSelected();
                this.select(!wasSelected);
                this.icon.setText(wasSelected ? 'check_box_outline_blank' : 'check_box');
            });
    }
}

class RcdMaterialTableCheckboxCell extends RcdMaterialTableCell {
    constructor() {
        super();
        this.iconArea = new RcdMaterialTableCheckbox().init();
    }

    init() {
        return super.init().
            addClass('rcd-material-table-checkbox-cell').
            addChild(this.iconArea);
    }
}

class RcdMaterialTableRow extends RcdTrElement {
    constructor() {
        super();
        this.checkbox = new RcdMaterialTableCheckboxCell().init();
    }

    init() {
        return super.init().
            addClass('rcd-material-table-row').
            addChild(this.checkbox);
    }

    addCell(value, options) {
        const cell = new RcdMaterialTableCell(value).
            init().
            setText(value);
        if (options && options.numeric) {
            cell.addClass('numeric');
        }
        this.addChild(cell);
        return this;
    }
}

class RcdMaterialTableHeader extends RcdTheadElement {
    constructor() {
        super();
        this.row = new RcdMaterialTableRow().init();
    }

    init() {
        return this.addClass('rcd-material-table-header').
            addChild(this.row);
    }

    addCell(value, options) {
        this.row.addCell(value, options);
        return this;
    }
}

class RcdMaterialTableBody extends RcdTbodyElement {
    constructor() {
        super();
        this.rows = [];
    }

    init() {
        return this.addClass('rcd-material-table-body');
    }

    createRow() {
        const row = new RcdMaterialTableRow().init();
        this.rows.push(row);
        this.addChild(row);
        return row;
    }
}

class RcdMaterialTable extends RcdTableElement {
    constructor() {
        super();
        this.header = new RcdMaterialTableHeader().init();
        this.body = new RcdMaterialTableBody().init();
    }

    init() {
        return super.init().
            addClass('rcd-material-table').
            addChild(this.header).
            addChild(this.body);
    }

    addColumn(value, options) {
        this.header.addCell(value, options);
        return this;
    }

    createRow() {
        return this.body.createRow();
    }
}


class RcdMaterialTableCardHeader extends RcdHeaderElement {
    constructor(title) {
        super();
        this.title = new RcdTextElement(title).init().
            addClass('rcd-material-table-card-title');
    }

    init() {
        return super.init().
            addClass('rcd-material-table-card-header').
            addChild(this.title);
    }
}

class RcdMaterialTableCard extends RcdDivElement {
    constructor(title) {
        super();
        this.header = new RcdMaterialTableCardHeader(title).init();
        this.table = new RcdMaterialTable().init();
    }

    init() {
        return super.init().
            addClass('rcd-material-table-card').
            addChild(this.header).
            addChild(this.table);
    }

    addColumn(value, options) {
        this.table.addColumn(value, options);
        return this;
    }

    createRow() {
        return this.table.createRow();
    }
}