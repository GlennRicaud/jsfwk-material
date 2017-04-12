class RcdMaterialAction extends RcdDivElement {
    constructor(callback) {
        super();
        this.enabled = true;
        this.callback = callback;
    }

    init() {
        super.init().addClass('rcd-material-action');
        if (this.callback) {
            this.addClickListener(this.callback);
        }
        return this;
    }

    enable(enabled) {
        if (this.enabled != enabled) {
            this.enabled = enabled;
            if (enabled) {
                return this.removeClass('disabled').
                    addClickListener(this.callback);
            } else {
                return this.addClass('disabled').
                    removeClickListener(this.callback);
            }
        }
        return this;
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

    setTooltip(text, parent) {
        const tooltip = new RcdMaterialTooltip(text).init();
        this.addMouseOverListener(() => {
            const boundingClientRect = this.domElement.getBoundingClientRect();

            tooltip.setPosition(boundingClientRect.left + (boundingClientRect.right - boundingClientRect.left) / 2,
                boundingClientRect.bottom + 2); //TODO
            tooltip.setParent(parent);
        });
        this.addMouseOutListener(() => {
            tooltip.removeParent();
        });
        return this;

    }
}
