//TODO Label should move above the field on focus. Directly above for now
//TODO Not reviewed during 2.0 refact

class RcdMaterialField extends RcdDivElement {
    constructor(labelText) {
        super();
        this.label = new RcdTextElement(labelText).init().addClass('rcd-material-textfield-label');
    }

    init() {
        return this.addClass('rcd-material-field').addChild(this.label);
    }

    clear() {
        return this;
    }
}

class RcdMaterialTextField extends RcdMaterialField {
    constructor(labelText, placeholder = '') {
        super(labelText);
        this.input = new RcdInputElement().init()
            .setPlaceholder(placeholder)
            .addClass('rcd-material-field-input')
            .addClass('rcd-material-textfield-input')
            .addFocusListener(() => {
                this.addClass('focused')
            })
            .addBlurListener(() => {
                this.removeClass('focused')
            });
    }

    init() {
        return super.init()
            .addClass('rcd-material-textfield').addChild(this.input);
    }

    clear() {
        this.input.setValue(null);
        return this;
    }

    getValue() {
        return this.input.getValue();
    }

    setValue(value) {
        this.input.setValue(value);
        return this;
    }

    focus() {
        this.input.focus();
        return this;
    }

    select() {
        this.input.select();
        return this;
    }

    setPattern(pattern) {
        this.input.setAttribute('pattern', pattern);
        return this;
    }

    checkValidity() {
        return this.input.domElement.checkValidity();
    }

    addInputListener(listener) {
        this.input.addInputListener(listener);
        return this;
    }

    removeInputListener(listener) {
        this.input.removeInputListener(listener);
        return this;
    }
}

class RcdMaterialTextArea extends RcdMaterialField {
    constructor(labelText, placeholder = '') {
        super(labelText);
        this.textArea = new RcdTextAreaElement().init()
            .setPlaceholder(placeholder)
            .addClass('rcd-material-field-input')
            .addClass('rcd-material-textarea-input')
            .addKeyDownListener('Enter', (source, event) => {
                event.stopPropagation();
            })
            .addFocusListener(() => {
                this.addClass('focused')
            })
            .addBlurListener(() => {
                this.removeClass('focused')
            });
    }

    init() {
        return super.init()
            .addClass('rcd-material-textarea')
            .addChild(this.textArea)
            .addClickListener(() => {
                this.textArea.domElement.focus();
            });
    }

    clear() {
        this.textArea.setValue(null);
        return this;
    }

    getValue() {
        return this.textArea.getValue();
    }

    setValue(value) {
        this.textArea.setValue(value);
        return this;
    }

    setRows(rows) {
        this.textArea.setRows(rows);
        return this;
    }

    setCols(cols) {
        this.textArea.setCols(cols);
        return this;
    }

    focus() {
        this.textArea.focus();
        return this;
    }

    select() {
        this.textArea.select();
        return this;
    }

    checkValidity() {
        return this.textArea.domElement.checkValidity();
    }

    addInputListener(listener) {
        this.textArea.addInputListener(listener);
        return this;
    }

    removeInputListener(listener) {
        this.textArea.removeInputListener(listener);
        return this;
    }
}

class RcdMaterialDropdown extends RcdMaterialField {
    constructor(labelText, options) {
        super(labelText);
        this.select =
            new RcdSelectElement().init()
                .addOptions(options)
                .addClass('rcd-material-dropdown-select')
                .addClass('rcd-material-field-input');
    }

    init() {
        return super.init().addClass('rcd-material-dropdown').addChild(this.select);
    }

    focus() {
        this.select.focus();
        return this;
    }

    clear() {
        this.select.clear();
    }

    addOptions(options) {
        this.select.addOptions(options);
        return this;
    }

    addOption(option) {
        this.select.addOption(option);
        return this;
    }

    selectOption(option) {
        this.select.selectOption(option);
        return this;
    }

    getSelectedValue() {
        return this.select.getSelectedValue();
    }

    addChangeListener(listener) {
        this.select.addChangeListener(listener);
        return this;
    }

    removeChangeListener(listener) {
        this.select.removeChangeListener(listener);
        return this;
    }
}