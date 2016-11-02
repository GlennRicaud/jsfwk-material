class RcdGoogleMaterialIcon extends RcdIElement {
    constructor(iconName) {
        super();
        this.iconName = iconName;
    }

    init() {
        return this.addClass('material-icons').
            setText(this.iconName);
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
        var tooltip = new RcdMaterialTooltip(text).init();
        this.addMouseOverListener(() => {
            var boundingClientRect = this.domElement.getBoundingClientRect();
            tooltip.setPosition(boundingClientRect.left, boundingClientRect.bottom + 14);
            tooltip.show(parent);
        });
        this.addMouseOutListener(() => {
            //tooltip.hide(parent);
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
            addClass('rcd-material-action-icon').
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