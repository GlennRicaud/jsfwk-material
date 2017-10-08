class RcdMaterialTableCell extends RcdTdElement {
    constructor() {
        super();
    }

    init() {
        return this.addClass('rcd-material-table-cell');
    }

    setTooltip(text, alignment) {
        RcdMaterialTooltipHelper.setTooltip(this, text, alignment);
        return this;
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
    constructor(params) {
        super();
        this.checkbox = params && params.selectable === false ? undefined : new RcdMaterialTableCheckboxCell().init().
            setCallback((source, event) => {
                this.select(!this.isSelected());
                event.stopPropagation();
            });
        this.selectionListeners = [];
    }

    init() {
        super.init().
            addClass('rcd-material-table-row');
        
        if(this.checkbox) {
            this.addChild(this.checkbox);
        } else {
            this.addChild(new RcdMaterialTableCell().init());
        }
        return this;
    }

    addCell(value, options) {
        const cell = new RcdMaterialTableCell().
            init();
        if (options && options.icon) {
            cell.addChild(value).
                addClass('icon');
        } else {
            cell.setText(value);
            if (options && options.numeric) {
                cell.addClass('numeric');
            }
            if (options && options.classes) {
                options.classes.forEach(columnClass => cell.addClass(columnClass));
            }
        }
        if (options && options.tooltip) {
            cell.setTooltip(options.tooltip.text, options.tooltip.alignment);
        }
        this.addChild(cell);
        return this;
    }

    select(selected, silent) {
        super.select(selected);
        if (this.checkbox) {
            this.checkbox.select(selected);
        }
        if (!silent) {
            this.fireSelectionEvent();
        }
    }
    
    isSelectable() {
        return !!this.checkbox;
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

    createRow(params) {
        const row = new RcdMaterialTableRow(params).init();
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
        this.rows.forEach((row) => row.isSelectable() && row.select(selected, true));
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
        this.cell = new RcdTdElement().init().
            addClass('rcd-material-table-empty-body-message').
            setText(message).
            setAttribute('colspan', 0);
        this.row = new RcdTrElement().init().
            addChild(this.cell);
    }

    init() {
        return super.init().
            addChild(this.row);
    }

    setColspan(value) {
        this.cell.setAttribute('colspan', value);
        return this;
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
        this.emptyBody.setColspan(this.header.row.children.length);
        return this;
    }

    clear() {
        this.body.clear();
        this.emptyBody.show(true);
        this.header.enableMultiSelection(false);
        return this;
    }

    createRow(params) {
        this.emptyBody.show(false);
        this.header.enableMultiSelection(true);
        return this.body.createRow(params);
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
        iconCondition.iconArea.enable((iconCondition.min == null || iconCondition.min <= this.count) &&
                                    (iconCondition.max == null || iconCondition.max >= this.count));
    }
    
    setTitle(title) {
        this.title.setText(title);
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
        this.previousCallback = params.previousCallback;
        this.nextCallback = params.nextCallback;
        this.previousIconArea =
            new RcdGoogleMaterialIconArea('navigate_before', () => this.previousCallback && this.previousCallback()).init().
                addClass('rcd-material-table-card-footer-icon');
        this.nextIconArea = new RcdGoogleMaterialIconArea('navigate_next', () => this.nextCallback && this.nextCallback()).init().
            addClass('rcd-material-table-card-footer-icon');
    }

    init() {
        return super.init().
            refresh().
            addClass('rcd-material-table-card-footer').
            addChild(this.iterator).
            addChild(this.previousIconArea).
            addChild(this.nextIconArea);
    }

    generateIteratorText() {
        return (this.start + 1) + ' - ' + (this.start + Math.max(1, this.count)) + ' of ' + this.total;
    }

    setValues(params) {
        this.start = params.start;
        this.count = params.count;
        this.total = params.total;
        this.previousCallback = params.previousCallback;
        this.nextCallback = params.nextCallback;
        return this.refresh();

    }

    refresh() {
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

    createRow(params) {
        return this.table.createRow(params);
    }

    getSelectedRows() {
        return this.table.getSelectedRows();
    }

    setFooter(params) {
        if (this.footer) {
            this.footer.setValues(params);
        } else {
            this.footer = new RcdMaterialTableCardFooter(params).init();
            this.addChild(this.footer);
        }
    }

    setTitle(title) {
        this.header.setTitle(title);
    }
}
