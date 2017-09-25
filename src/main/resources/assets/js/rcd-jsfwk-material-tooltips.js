const RcdMaterialTooltipAlignment = {
    LEFT: 0,
    RIGHT: 1,
    CENTERED: 2
};

class RcdMaterialTooltip extends RcdTextDivElement {
    constructor(text) {
        super(text);
    }

    init() {
        return super.init().
        addClass('rcd-material-tooltip');
    }
}

class RcdMaterialTooltipHelper {
    static setTooltip(target, text, parent, alignment = RcdMaterialTooltipAlignment.CENTERED) {
        const tooltip = new RcdMaterialTooltip(text).init();
        target.addMouseOverListener(() => {
            const boundingClientRect = target.domElement.getBoundingClientRect();

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
        target.addMouseOutListener(() => {
            tooltip.removeParent();
        });
    }
}
