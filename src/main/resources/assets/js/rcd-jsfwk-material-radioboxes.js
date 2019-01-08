class RcdMaterialRadiobox extends RcdGoogleMaterialIconArea {
    constructor() {
        super('radio_button_unchecked');
    }

    init() {
        return super.init()
            .addClass('rcd-material-radiobox');
    }

    select(selected) {
        if (selected) {
            this.addClass('selected');
        } else {
            this.removeClass('selected');
        }
        this.icon.setText(selected ? 'radio_button_checked' : 'radio_button_unchecked');
        return this;
    }

    isSelected() {
        return this.hasClass('selected');
    }
}

class RcdMaterialRadioboxGroup extends RcdObject {
    constructor() {
        super();
        this.radioboxes = [];
    }

    init() {
        return super.init();
    }

    createRadiobox() {
        const radiobox = new RcdMaterialRadiobox().init();
        this.radioboxes.push(radiobox);
        return radiobox;
    }

    select(radiobox) {
        if (!radiobox.isSelected()) {
            this.radioboxes.forEach(radiobox => radiobox.select(false));
            radiobox.select(true);
        }
        return this;
    }
}

