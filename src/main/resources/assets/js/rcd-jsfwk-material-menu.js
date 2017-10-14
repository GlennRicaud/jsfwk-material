const RcdMaterialMenuAlignment = {
    LEFT: 0,
    RIGHT: 1
};

class RcdMaterialMenuItem extends RcdTextDivElement {
    constructor(params) {
        super(params.text);
        this.callback = params.callback;
    }

    init() {
        super.init().addClass('rcd-material-menu-item');

        if (this.callback) {
            this.addClass('rcd-clickable').addClickListener((target, event) => {
                this.callback(this, event);
            });
        }
        return this;
    }
}

class RcdMaterialMenuDialog extends RcdDivElement {
    constructor() {
        super();
    }

    init() {
        return this.addClass('rcd-material-menu-dialog').
            addClass('rcd-material-shadow');
    }
    
    addItem(item) {
        const menuItem = new RcdMaterialMenuItem(item).init();
        return this.addChild(menuItem);
    }
    
    addItems(items) {
        items.forEach((item) => this.addItem(item));
        return this;
    }
}

class RcdMaterialMenu extends RcdDivElement {
    constructor() {
        super();
        this.dialog = new RcdMaterialMenuDialog().init();
    }

    init() {
        return this.addClass('rcd-material-menu').
            addChild(this.dialog).
            addClickListener((target, event) => {
                event.stopPropagation();
                this.removeParent();
             });
    }

    addItem(item) {
        this.dialog.addItem(item);
        return this;
    }

    addItems(items) {
        this.dialog.addItems(items);
        return this;
    }
}

class RcdMaterialMenuHelper {
    static displayMenu(target, items, width = 112) {
        const menu = new RcdMaterialMenu().init().addItems(items);
        
        
        const boundingClientRect = target.domElement.getBoundingClientRect();
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        const height = 16 + items.length * (window.matchMedia("(min-width: 600px)").matches ? 32 : 48);
        const isTooWide = boundingClientRect.x + width > clientWidth;
        const isTooTall = boundingClientRect.y + height > clientHeight;
        menu.dialog.setStyle({
            position:'absolute',
            top: boundingClientRect.y - (isTooTall ? (boundingClientRect.y + height - clientHeight) : 0),
            left: boundingClientRect.x - (isTooWide ? (boundingClientRect.x + width - clientWidth) : 0)
        });
        
        menu.dialog.setStyle({width: width + 'px'});
        menu.setParent();
    }
}

