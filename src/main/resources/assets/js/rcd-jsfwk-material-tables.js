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

    enable(enabled) {
        this.iconArea.enable(enabled);
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
            setCallback((source, event) => {
                this.select(!this.isSelected());
                event.stopPropagation();
            });
        this.selectionListeners = [];
    }

    init() {
        return super.init().
            addClass('rcd-material-table-row').
            addChild(this.checkbox);
    }

    addCell(value, options) {
        const cell = new RcdMaterialTableCell().
            init();
        if (options && options.icon) {
            cell.addChild(value).
                addClass('icon');
        } else {
            cell.setText(value)
            if (options && options.numeric) {
                cell.addClass('numeric');
            }
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
        this.row.checkbox.enable(false);
    }

    init() {
        return this.addClass('rcd-material-table-header').
            addChild(this.row);
    }

    addCell(value, options) {
        this.row.addCell(value, options);
        return this;
    }

    enableMultiSelection(enabled) {
        this.row.checkbox.select(false);
        this.row.checkbox.enable(enabled);
    }

    addSelectionListener(selectionListener) {
        this.row.addSelectionListener(selectionListener);
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

class RcdMaterialTableEmptyBody extends RcdTbodyElement {
    constructor(message = 'No content') {
        super();
        const cell = new RcdTdElement().init().
            addClass('rcd-material-table-empty-body-message').
            setText(message).
            setAttribute('colspan', 100); //TODO Find proper fix
        this.row = new RcdTrElement().init().
            addChild(cell);
    }

    init() {
        return super.init().
            addChild(this.row);
    }
}

class RcdMaterialTable extends RcdTableElement {
    constructor() {
        super();
        this.header = new RcdMaterialTableHeader().init();
        this.body = new RcdMaterialTableBody().init();
        this.emptyBody = new RcdMaterialTableEmptyBody().init();
        this.header.row.addSelectionListener(() => this.body.selectAllRows(this.header.row.isSelected()));
    }

    init() {
        return super.init().
            addClass('rcd-material-table').
            addChild(this.header).
            addChild(this.body).
            addChild(this.emptyBody);
    }

    addColumn(value, options) {
        this.header.addCell(value, options);
        return this;
    }

    clear() {
        this.body.clear();
        this.emptyBody.show(true);
        this.header.enableMultiSelection(false);
        return this;
    }

    createRow() {
        this.emptyBody.show(false);
        this.header.enableMultiSelection(true);
        return this.body.createRow();
    }

    addSelectionListener(selectionListener) {
        this.header.addSelectionListener(selectionListener);
        this.body.addSelectionListener(selectionListener);
        return this;
    }

    getSelectedRows() {
        return this.body.getSelectedRows();
    }
}


class RcdMaterialTableCardHeader extends RcdHeaderElement {
    constructor(title) {
        super();
        this.title = new RcdTextElement(title).init().
            addClass('rcd-material-table-card-title');
        this.count = 0;
        this.selectionCount = new RcdTextElement(title).init().
            addClass('rcd-material-table-card-selection-count').
            show(false);
        this.iconsContainer = new RcdDivElement().init().
            addClass('rcd-material-table-card-icons');
        this.iconConditions = [];
    }

    init() {
        return super.init().
            addClass('rcd-material-table-card-header').
            addChild(this.title).
            addChild(this.selectionCount).
            addChild(this.iconsContainer);
    }

    addIconArea(iconArea, options) {
        this.iconsContainer.addChild(iconArea);
        const iconCondition = {
            iconArea: iconArea,
            min: options && options.min,
            max: options && options.max
        };
        this.applyIconCondition(iconCondition);
        this.iconConditions.push(iconCondition);
        return this;
    }

    displaySelectionCount(count) {
        this.count = count;
        this.title.show(count == 0);
        this.selectionCount.show(count > 0);
        if (count > 0) {
            this.addClass('selection');
            this.selectionCount.setText(count + ' item' + (count > 1 ? 's' : '') + ' selected');
        } else {
            this.removeClass('selection');
        }
        this.iconConditions.forEach((iconCondition) => this.applyIconCondition(iconCondition));
    }

    applyIconCondition(iconCondition) {
        iconCondition.iconArea.show((iconCondition.min == null || iconCondition.min <= this.count) &&
                                    (iconCondition.max == null || iconCondition.max >= this.count));
    }
}

class RcdMaterialTableCardFooter extends RcdFooterElement {
    constructor(params) {
        super();
        this.start = params.start == null ? 0 : params.start;
        this.count = params.count == null ? 0 : params.count;
        this.total = params.total == null ? 0 : params.total;
        this.iterator = new RcdTextDivElement('').init().
            addClass('rcd-material-table-card-footer-iterator');
        this.previousIconArea = new RcdGoogleMaterialIconArea('navigate_before', params.previousCallback).init().
            addClass('rcd-material-table-card-footer-icon');
        this.nextIconArea = new RcdGoogleMaterialIconArea('navigate_next', params.nextCallback).init().
            addClass('rcd-material-table-card-footer-icon');
    }

    init() {
        return super.init().
            setIteratorValues({start: this.start, count: this.count, total: this.total}).
            addClass('rcd-material-table-card-footer').
            addChild(this.iterator).
            addChild(this.previousIconArea).
            addChild(this.nextIconArea);
    }

    generateIteratorText() {
        return (this.start + 1) + ' - ' + (this.start + Math.max(1, this.count)) + ' of ' + this.total;
    }

    setIteratorValues(params) {
        this.start = params.start;
        this.count = params.count;
        this.total = params.total;
        this.previousIconArea.enable(this.start > 0);
        this.nextIconArea.enable((this.start + this.count) < this.total);
        this.iterator.setText(this.generateIteratorText());
        return this;
    }
}

class RcdMaterialTableCard extends RcdDivElement {
    constructor(title, options) {
        super();
        this.header = new RcdMaterialTableCardHeader(title).init();
        this.table = new RcdMaterialTable().init().
            addSelectionListener(() => {
                this.header.displaySelectionCount(this.table.getSelectedRows().length);
            });
        this.footer;
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

    addIconArea(iconArea, options) {
        this.header.addIconArea(iconArea, options);
        return this;
    }

    deleteRows() {
        this.table.clear();
        return this;
    }

    createRow() {
        return this.table.createRow();
    }

    getSelectedRows() {
        return this.table.getSelectedRows();
    }

    setFooter(params) {
        if (this.footer) {
            this.footer.setIteratorValues(params);
        } else {
            this.footer = new RcdMaterialTableCardFooter(params).init();
            this.addChild(this.footer);
        }

    }
}
