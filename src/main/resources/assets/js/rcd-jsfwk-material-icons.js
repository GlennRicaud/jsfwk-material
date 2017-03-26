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
        this.icon = new RcdGoogleMaterialIcon(iconName).init();
    }

    init() {
        return super.init().
            addClass('rcd-gmaterial-icon-area').
            addChild(this.icon);
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