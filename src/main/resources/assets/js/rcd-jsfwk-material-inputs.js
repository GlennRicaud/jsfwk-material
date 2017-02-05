//TODO Label should move above the field on focus. Directly above for now
class RcdMaterialTextField extends RcdDivElement {
    constructor(labelText, placeholderText) {
        super();
        this.label = new RcdTextElement(labelText).init().
            addClass('rcd-material-textfield-label');
        this.input = new RcdInputElement(placeholderText).init().
            addClass('rcd-material-textfield-input');
    }

    init() {
        return this.addClass('rcd-material-textfield').
            addChild(this.label).
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

class RcdMaterialSelect extends RcdDivElement {
    constructor(labelText, options) {
        super();
        this.label = new RcdTextElement(labelText).init().
            addClass('rcd-material-combo-label');
        this.select = new RcdSelectElement().init().
            addOptions(options).
            addClass('rcd-material-combo-select');
    }

    init() {
        return this.addClass('rcd-material-combo').
            addChild(this.label).
            addChild(this.select);
    }

    focus() {
        this.select.focus();
        return this;
    }

    getValue() {
        return this.select.getValue();
    }
}