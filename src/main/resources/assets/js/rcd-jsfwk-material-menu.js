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
        const menuItem = new RcdMaterialMenuItem(item.text).init();
        if (item.callback) {
            menuItem.addClickListener((target, event) => {
                item.callback(menuItem, event);
            });
        }
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
    static displayMenu(target, items) {
        const boundingClientRect = target.domElement.getBoundingClientRect();
        const menu = new RcdMaterialMenu().init().addItems(items);
        menu.dialog.setPosition({
            position:'absolute',
            top: boundingClientRect.y,
            left: boundingClientRect.x,
        });
        menu.setParent();
    }
}

