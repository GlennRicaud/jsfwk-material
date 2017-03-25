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
            addClass('rcd-material-table-checkbox');
    }

    select(selected) {
        super.select(selected);
        this.icon.setText(selected ? 'check_box' : 'check_box_outline_blank');
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

    select(selected) {
        super.select(selected);
        this.iconArea.select(selected);
        return this;
    }

    setCallback(callback) {
        this.iconArea.setCallback(callback);
        return this;
    }
}

class RcdMaterialTableRow extends RcdTrElement {
    constructor() {
        super();
        this.checkbox = new RcdMaterialTableCheckboxCell().init().
            setCallback(() => {
                this.select(!this.isSelected());
            });
        this.selectionListeners = [];
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

    select(selected, silent) {
        super.select(selected);
        this.checkbox.select(selected);
        if (!silent) {
            this.fireSelectionEvent();
        }
    }

    fireSelectionEvent() {
        this.selectionListeners.forEach((listener) => listener());
    }

    addSelectionListener(listener) {
        this.selectionListeners.push(listener);
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
        this.selectionListeners = [];
    }

    init() {
        return this.addClass('rcd-material-table-body');
    }

    createRow() {
        const row = new RcdMaterialTableRow().init();
        row.addSelectionListener(() => this.fireSelectionEvent());
        this.rows.push(row);
        this.addChild(row);
        return row;
    }

    clear() {
        super.clear();
        this.rows.length = 0;
        this.fireSelectionEvent();
        return this;
    }

    selectAllRows(selected) {
        this.rows.forEach((row) => row.select(selected, true));
        this.fireSelectionEvent();
        return this;
    }

    getSelectedRows() {
        return this.rows.filter((row) => row.isSelected());
    }

    fireSelectionEvent() {
        this.selectionListeners.forEach((selectionListener) => {
            selectionListener();
        }, this);
    }

    addSelectionListener(selectionListener) {
        this.selectionListeners.push(selectionListener);
        return this;
    }
}

class RcdMaterialTable extends RcdTableElement {
    constructor() {
        super();
        this.header = new RcdMaterialTableHeader().init();
        this.body = new RcdMaterialTableBody().init();
        this.header.row.addSelectionListener(() => this.body.selectAllRows(this.header.row.isSelected()));
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