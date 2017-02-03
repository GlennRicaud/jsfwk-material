class RcdMaterialTableCell extends RcdTdElement {
    constructor() {
        super();
    }

    init() {
        return this.addClass('rcd-material-table-cell');
    }
}

class RcdMaterialTableCheckbox extends RcdMaterialTableCell {
    constructor() {
        super();
        this.checkbox = new RcdMaterialCheckbox().init();
    }

    init() {
        return this.addClass('rcd-material-table-checkbox').
            addChild(this.checkbox);
    }

    select(selected) {
        super.select(selected);
        this.checkbox.select(selected);
    }
}

class RcdMaterialTableRow extends RcdTrElement {
    constructor() {
        super();
        this.checkbox = new RcdMaterialTableCheckbox().init().
            setClickListener(() => {
                this.select(!this.isSelected());
            });
        this.selectListeners = [];
    }

    init() {
        return this.addClass('rcd-material-table-row').
            addChild(this.checkbox);
    }

    addCell(value) {
        var cell = new RcdMaterialTableCell().
            init().
            setText(value);
        if (this.icons) {
            this.removeChild(this.icons);
        }
        this.addChild(cell);
        if (this.icons) {
            this.addChild(this.icons);
        }
        return this;
    }

    addIcon(icon) {
        if (!this.icons) {
            this.icons = new RcdMaterialTableCell().init().
                addClass('rcd-material-table-icons');
            this.addChild(this.icons);
        }
        icon.addClass('rcd-material-table-icon'); //TODO
        this.icons.addChild(icon);
        return this;
    }

    select(selected, silent) {
        super.select(selected);
        this.checkbox.select(selected);
        if (!silent) {
            this.fireSelectEvent();
        }
    }

    fireSelectEvent() {
        this.selectListeners.forEach((listener) => listener());
    }

    addSelectListener(listener) {
        this.selectListeners.push(listener);
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

    addCell(value) {
        var cell = new RcdMaterialTableCell().
            init().
            setText(value);
        return this.row.addChild(cell);
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
        var row = new RcdMaterialTableRow().
            init();

        row.addSelectListener(() => this.fireSelectionEvent(row));
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
        this.fireSelectionEvent(this.rows[this.rows.length - 1]);
        return this;
    }

    getSelectedRows() {
        return this.rows.filter((row) => row.isSelected());
    }

    fireSelectionEvent(rowSelected) {
        this.selectionListeners.forEach((selectionListener) => {
            selectionListener(rowSelected);
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

        this.header.row.addClickListener(() => this.body.selectAllRows(this.header.row.checkbox.isSelected()));
    }

    init() {
        return this.addClass('rcd-material-table').
            addChild(this.header).
            addChild(this.body);
    }

    getSelectedRows() {
        return this.body.getSelectedRows();
    }

    addSelectionListener(listener) {
        this.body.addSelectionListener(listener);
        return this;
    }
}

class RcdMaterialTableNav extends RcdDivElement {
    constructor(beforeCallback, nextCallback) {
        super();
        this.start = 0;
        this.count = 1;
        this.total = 0;
        this.iterator = new RcdTextDivElement('').
            init().
            addClass('rcd-material-table-nav-iterator');
        this.beforeIcon = new RcdMaterialActionIcon('navigate_before', beforeCallback).
            init().
            addClass('rcd-material-table-nav-before');
        this.nextIcon = new RcdMaterialActionIcon('navigate_next', nextCallback).
            init().
            addClass('rcd-material-table-nav-after');
    }

    init() {
        this.iterator.setText(this.generateIteratorText());
        return this.addClass('rcd-material-table-nav').
            addChild(this.iterator).
            addChild(this.beforeIcon).
            addChild(this.nextIcon);
    }

    generateIteratorText() {
        return (parseInt(this.start) + 1) + ' - ' + (parseInt(this.start) + Math.max(1, this.count)) + ' of ' + this.total;
    }

    setValues(start, count, total) {
        this.start = start;
        this.count = count;
        this.total = total;
        this.iterator.setText(this.generateIteratorText());
    }
}