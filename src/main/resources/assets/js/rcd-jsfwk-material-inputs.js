//TODO Label should move above the field on focus. Directly above for now


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
    constructor(labelText, placeholderText) {
        super(labelText);
        this.input = new RcdInputElement(placeholderText).init().
            addClass('rcd-material-field-input').
            addClass('rcd-material-textfield-input');
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

class RcdMaterialDropdownInput extends RcdDivElement {
    constructor(options) {
        super();
        this.select = new RcdSelectElement().init().
            addOptions(options).
            addClass('rcd-material-dropdown-select');
        this.icon = new RcdGoogleMaterialIcon('arrow_drop_down').init().
            addClass('rcd-material-dropdown-icon');
    }

    init() {
        return this.addClass('rcd-material-field-input').
            addClass('rcd-material-dropdown-input').
            addChild(this.select).
            addChild(this.icon);
    }

    focus() {
        this.select.focus();
        return this;
    }

    getValue() {
        return this.select.getValue();
    }
}

class RcdMaterialDropdown extends RcdMaterialField {
    constructor(labelText, options) {
        super(labelText);
        this.input = new RcdMaterialDropdownInput(options).init();
    }

    init() {
        return super.init().
            addClass('rcd-material-dropdown').
            addChild(this.input);
    }

    focus() {
        this.input.focus();
        return this;
    }

    getValue() {
        return this.input.getValue();
    }
}