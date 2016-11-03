//TODO Label should move above the field on focus. Directly above for now
class RcdMaterialTextField extends RcdDivElement {
    constructor(labelText, placeholderText) {
        super();
        this.label = new RcdTextElement(labelText).init().
            addClass('rcd-material-textfield-label');
        this.input = new RcdInputElement().init().
            setText(placeholderText).
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
}