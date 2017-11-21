//TODO Label should move above the field on focus. Directly above for now
//TODO Not reviewed during 2.0 refact

class RcdMaterialField extends RcdDivElement {
    constructor(labelText) {
        super();
        this.label = new RcdTextElement(labelText).init().
            addClass('rcd-material-textfield-label');
    }

    init() {
        return this.addClass('rcd-material-field').
            addChild(this.label);
    }
}

class RcdMaterialTextField extends RcdMaterialField {
    constructor(labelText, placeholder) {
        super(labelText);
        this.input = new RcdInputElement().init()
            .setPlaceholder(placeholder)
            .addClass('rcd-material-field-input')
            .addClass('rcd-material-textfield-input');
    }

    init() {
        return this.addClass('rcd-material-textfield').
            addChild(this.input);
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
}

class RcdMaterialDropdown extends RcdMaterialField {
    constructor(labelText, options) {
        super(labelText);
        this.select = new RcdSelectElement().init().
            addOptions(options).
            addClass('rcd-material-dropdown-select').
            addClass('rcd-material-field-input');
    }

    init() {
        return super.init().
            addClass('rcd-material-dropdown').
            addChild(this.select);
    }

    focus() {
        this.select.focus();
        return this;
    }
    
    selectOption(option) {
        return this.select.selectOption(option);
    }

    getSelectedValue() {
        return this.select.getSelectedValue();
    }
}