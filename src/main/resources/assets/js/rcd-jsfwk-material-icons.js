class RcdGoogleMaterialIcon extends RcdIElement {
    constructor(params) {
        super();
        this.iconName = params.iconName;
    }

    init() {
        return this.addClass('rcd-icon').
            addClass('rcd-gmaterial-icon').
            setText(this.iconName);
    }
}

class RcdImageIcon extends RcdImgElement {
    constructor(params) {
        super(params.src);
    }

    init() {
        super.init();
        return this.addClass('rcd-icon').
            addClass('rcd-custom-icon');
    }
}

class RcdMaterialTooltip extends RcdTextDivElement {
    constructor(params) {
        super(params.text);
    }

    init() {
        return super.init().
            addClass('rcd-material-tooltip');
    }
}

class RcdMaterialAction extends RcdDivElement {
    constructor(params) {
        super();
        this.callback = params.callback;
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
    constructor(params) {
        super(params);
        this.light = params.light;
    }

    init() {
        super.init().
            addClass('rcd-material-icon-area');
        if (this.light) {
            this.addClass('light');
        }
        return this;
    }
}

class RcdGoogleMaterialIconArea extends RcdMaterialIconArea {
    constructor(params) {
        super(params);
        this.icon = new RcdGoogleMaterialIcon({iconName: params.iconName}).init();
    }

    init() {
        return super.init().
            addClass('rcd-gmaterial-icon-area').
            addChild(this.icon);
    }
}

class RcdImageActionIconArea extends RcdMaterialIconArea {
    constructor(params) {
        super(params);
        this.icon = new RcdCustomIcon(params.src).init();
    }

    init() {
        return super.init().
            addClass('rcd-image-icon-area').
            addChild(this.icon);
    }
}

class RcdMaterialActionText extends RcdMaterialAction {
    constructor(text, callback) {
        super(params);
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