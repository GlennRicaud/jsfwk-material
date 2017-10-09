const RcdMaterialMenuAlignment = {
    LEFT: 0,
    RIGHT: 1
};

class RcdMaterialMenuItem extends RcdTextDivElement {
    constructor(text) {
        super(text);
    }

    init() {
        return super.init().addClass('rcd-material-menu-item');
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
    static displayMenu(target, items, alignment = RcdMaterialTooltipAlignment.CENTERED) {
        target.addClass('rcd-material-menu-container');
        const menu = new RcdMaterialMenu().init().addItems(items);
        target.addClickListener(() => {
            const boundingClientRect = target.domElement.getBoundingClientRect();

            if (RcdMaterialMenuAlignment.RIGHT === alignment) {
                menu.dialog.setPosition({right: document.documentElement.clientWidth - boundingClientRect.right, top: boundingClientRect.top});
            } else {
                menu.dialog.setPosition({left: boundingClientRect.left, top: boundingClientRect.top});
            }
            menu.setParent(target);
        });
    }
}

