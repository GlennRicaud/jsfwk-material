class RcdMaterialAction extends RcdButtonElement {
    constructor(callback) {
        super();
        this.enabled = true;
        this.callback = callback;
    }

    init() {
        super.init()
            .addClass('rcd-material-action');
        if (this.callback) {
            this.addClickListener(this.callback);
        }
        this.refreshTabIndex();
        return this;
    }

    enable(enabled) {
        if (this.enabled != enabled) {
            this.enabled = enabled;
            if (enabled) {
                this.removeClass('disabled')
                    .addClickListener(this.callback);
            } else {
                this.addClass('disabled')
                    .removeClickListener(this.callback);
            }
            this.refreshTabIndex();
        }
        return this;
    }

    refreshTabIndex() {
        return this.setAttribute('tabindex', (this.callback && this.enabled) ? null : '-1');
    }

    setCallback(callback) {
        if (this.callback) {
            this.removeClickListener(this.callback);
        }
        this.callback = callback;
        if (this.enabled) {
            this.addClickListener(callback);
        }
        return this;
    }

    setTooltip(text, alignment) {
        RcdMaterialTooltipHelper.setTooltip(this, text, alignment);
        return this;
    }
}
