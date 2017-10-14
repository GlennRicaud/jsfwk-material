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
    static setTooltip(target, text, alignment = RcdMaterialTooltipAlignment.CENTERED) {
        target.addClass('rcd-material-tooltip-container');
        const tooltip = new RcdMaterialTooltip(text).init();
        target.addMouseOverListener(() => {
            const boundingClientRect = target.domElement.getBoundingClientRect();

            if (RcdMaterialTooltipAlignment.CENTERED === alignment) {
                tooltip.setStyle({
                    position: 'fixed',
                    left: boundingClientRect.left + (boundingClientRect.right - boundingClientRect.left) / 2 + 'px',
                    top: boundingClientRect.bottom + 2 + 'px'
                });
                tooltip.addClass('centered');
            } else if (RcdMaterialTooltipAlignment.LEFT === alignment) {
                tooltip.setStyle({position: 'fixed', left: boundingClientRect.left + 'px', top: boundingClientRect.bottom + 2 + 'px'});
            } else {
                tooltip.setStyle({position: 'fixed', right: document.documentElement.clientWidth - boundingClientRect.right + 'px', top: boundingClientRect.bottom + 2 + 'px'});
            }
            tooltip.setParent(target);
        });
    }
}
