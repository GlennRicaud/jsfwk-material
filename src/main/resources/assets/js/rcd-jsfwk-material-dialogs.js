class RcdMaterialDialogContentArea extends RcdDivElement {
    constructor(title) {
        super();
        this.title = title ? new RcdTextDivElement(title).init().
            addClass('rcd-material-dialog-title') : undefined;
        this.body = new RcdDivElement().init().
            addClass('rcd-material-dialog-body');
    }

    init() {
        super.init().
            addClass('rcd-material-dialog-content-area');
        if (this.title) {
            this.addChild(this.title);
        }
        return this.addChild(this.body);
    }

    addItem(item) {
        this.body.addChild(item);
        return this;
    }
}

class RcdMaterialDialog extends RcdDivElement {
    constructor(title, text) {
        super();
        this.contentArea = new RcdMaterialDialogContentArea(title).init();
        if (text) {
            const textItem = new RcdTextElement(text).init();
            this.contentArea.addItem(textItem);
        }
        this.actions = new RcdDivElement().init().
            addClass('rcd-material-dialog-actions');
    }

    init() {
        return this.addClass('rcd-material-dialog').
            addChild(this.contentArea).
            addChild(this.actions);
    }

    addItem(item) {
        this.contentArea.addChild(item);
    }

    addAction(label, callback) {
        const action = new RcdMaterialButtonArea(label, callback, RcdMaterialButtonType.FLAT).init().
            addClass('rcd-material-dialog-action');
        this.actions.addChild(action);
        return this;
    }
}

class RcdMaterialModalDialog extends RcdDivElement {
    constructor(title, text, overlay) {
        super();
        this.overlay = overlay;
        this.dialog = new RcdMaterialDialog(title, text).init();
    }

    init() {
        if (this.overlay) {
            this.addClass('rcd-material-overlay');
        }
        return this.addClass('rcd-material-cache').
            addClass('rcd-body'). //Workaround for widget
            addChild(this.dialog);
    }

    addItem(item) {
        this.dialog.addItem(item);
        return this;
    }

    addAction(label, callback) {
        this.dialog.addAction(label, callback);
        return this;
    }

    close() {
        this.removeParent();
    }
}

class RcdMaterialDetailsDialog extends RcdMaterialModalDialog {
    constructor(title, text) {
        super(title, text, true);
    }

    init() {
        const closeCallback = () => this.close();
        super.init().
            addAction('CLOSE', closeCallback).
            addKeyUpListener('Enter', closeCallback).
            addKeyUpListener('Escape', closeCallback);
        return this;
    }

    open(parent) {
        return this.setParent(parent).
            focus();
    }
}
