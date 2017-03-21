class RcdGoogleMaterialIcon extends RcdIElement {
    constructor(iconName) {
        super();
        this.iconName = iconName;
    }

    init() {
        return this.addClass('rcd-icon').
            addClass('material-icon').
            setText(this.iconName);
    }
}

class RcdCustomIcon extends RcdImgElement {
    constructor(src) {
        super(src);
    }

    init() {
        super.init();
        return this.addClass('rcd-icon').
            addClass('rcd-custom-icon');
    }
}

class RcdMaterialTooltip extends RcdTextDivElement {
    constructor(text) {
        super(text);
    }

    init() {
        return super.init().
            addClass('rcd-material-tooltip');
    }
}

class RcdMaterialAction extends RcdDivElement {
    constructor(callback) {
        super();
        this.callback = callback;
    }

    init() {
        return super.init().
            addClickListener(this.callback);
    }

    enable(enabled) {
        if (enabled) {
            return this.removeClass('disabled').
                addClickListener(this.callback);
        } else {
            return this.addClass('disabled').
                removeClickListener(this.callback);
        }
    }

    setTooltip(text, parent) {
        const tooltip = new RcdMaterialTooltip(text).init();
        this.addMouseOverListener(() => {
            const boundingClientRect = this.domElement.getBoundingClientRect();
            tooltip.setPosition(boundingClientRect.left, boundingClientRect.bottom + 14);
            tooltip.setParent(parent);
        });
        this.addMouseOutListener(() => {
            tooltip.removeParent();
        });
        return this;

    }
}

class RcdMaterialActionIcon extends RcdMaterialAction {
    constructor(iconName, callback) {
        super(callback);
        this.icon = new RcdGoogleMaterialIcon(iconName).init();
    }

    init() {
        return super.init().
            addClass('rcd-action-icon').
            addClass('rcd-material-action-icon').
            addChild(this.icon);
    }
}

class RcdCustomActionIcon extends RcdMaterialAction {
    constructor(src, callback) {
        super(callback);
        this.icon = new RcdCustomIcon(src).init();
    }

    init() {
        return super.init().
            addClass('rcd-action-icon').
            addClass('rcd-custom-action-icon').
            addChild(this.icon);
    }
}

class RcdMaterialActionText extends RcdMaterialAction {
    constructor(text, callback) {
        super(callback);
        this.tmp2 = new RcdTextElement(text).init(); //TODO
    }

    init() {
        return super.init().
            addClass('rcd-material-action-text').
            addChild(this.tmp2);
    }
}

class RcdMaterialCheckbox extends RcdGoogleMaterialIcon {
    constructor() {
        super('check_box_outline_blank');
    }

    init() {
        super.init();
        return this.addClass('rcd-material-checkbox');
    }

    select(selected) {
        super.select(selected);
        if (selected) {
            this.setText('check_box');
        } else {
            this.setText('check_box_outline_blank');
        }
    }
}