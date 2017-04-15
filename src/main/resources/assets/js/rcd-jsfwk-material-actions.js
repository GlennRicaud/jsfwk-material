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

    setTooltip(text, parent, alignment = RcdMaterialTooltipAlignment.CENTERED) {
        const tooltip = new RcdMaterialTooltip(text).init();
        this.addMouseOverListener(() => {
            const boundingClientRect = this.domElement.getBoundingClientRect();

            if (RcdMaterialTooltipAlignment.CENTERED === alignment) {
                tooltip.setPosition({
                    left: boundingClientRect.left + (boundingClientRect.right - boundingClientRect.left) / 2,
                    top: boundingClientRect.bottom + 2
                });
                tooltip.addClass('centered');
            } else if (RcdMaterialTooltipAlignment.LEFT === alignment) {
                tooltip.setPosition({left: boundingClientRect.left, top: boundingClientRect.bottom + 2});
            } else {
                tooltip.setPosition({right: document.documentElement.clientWidth - boundingClientRect.right, top: boundingClientRect.bottom + 2});
            }
            tooltip.setParent(parent);
        });
        this.addMouseOutListener(() => {
            tooltip.removeParent();
        });
        return this;

    }
}
