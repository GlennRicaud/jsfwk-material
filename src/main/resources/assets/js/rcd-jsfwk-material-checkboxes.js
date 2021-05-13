class RcdMaterialCheckbox extends RcdGoogleMaterialIconArea {
    constructor() {
        super('check_box_outline_blank');
    }

    init() {
        return super.init()
            .addClass('rcd-material-checkbox');
    }

    select(selected) {
        if (selected) {
            this.addClass('selected');
        } else {
            this.removeClass('selected');
        }
        this.icon.setText(selected ? 'check_box' : 'check_box_outline_blank');
        return this;
    }

    isSelected() {
        return this.hasClass('selected');
    }

    refreshTabIndex() {
        return this.setAttribute('tabindex', this.enabled ? null : '-1');
    }
}