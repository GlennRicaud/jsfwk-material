class RcdGoogleMaterialIcon extends RcdIElement {
    constructor(iconName) {
        super();
        this.iconName = iconName;
    }

    init() {
        return this.addClass('rcd-icon').
            addClass('rcd-gmaterial-icon').
            setText(this.iconName);
    }
}

class RcdImageIcon extends RcdImgElement {
    constructor(src) {
        super(src);
    }

    init() {
        super.init();
        return this.addClass('rcd-icon').
            addClass('rcd-image-icon');
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
            addClass('rcd-material-action').
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
        return this;
    }

    setTooltip(text, parent) {
        const tooltip = new RcdMaterialTooltip({text: text}).init();
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

class RcdMaterialIconArea extends RcdMaterialAction {
    constructor(callback) {
        super(callback);
    }

    init() {
        super.init().
            addClass('rcd-material-icon-area');
        return this;
    }

    setLight(light) {
        if (light) {
            return this.addClass('light');
        } else {
            return this.removeClass('light');
        }
    }
}

class RcdGoogleMaterialIconArea extends RcdMaterialIconArea {
    constructor(iconName, callback) {
        super(callback);
        this.iconArea = new RcdGoogleMaterialIcon(iconName).init();
    }

    init() {
        return super.init().
            addClass('rcd-gmaterial-icon-area').
            addChild(this.iconArea);
    }
}

class RcdImageActionIconArea extends RcdMaterialIconArea {
    constructor(callback, src) {
        super(callback);
        this.iconArea = new RcdImageIcon(src).init();
    }

    init() {
        return super.init().
            addClass('rcd-image-icon-area').
            addChild(this.iconArea);
    }
}

class RcdMaterialActionText extends RcdMaterialAction {
    constructor(text, callback) {
        super(callback);
        this.textElement = new RcdTextElement(text).init();
    }

    init() {
        return super.init().
            addClass('rcd-material-action-text').
            addChild(this.textElement);
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
        return this;
    }
}