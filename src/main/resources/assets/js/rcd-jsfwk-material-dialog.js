class RcdMaterialDialogContentArea extends RcdDivElement {
    constructor(title) {
        super();
        this.title = title ? new RcdTextDivElement(title).init().
            addClass('rcd-material-dialog-title') : undefined;
        this.body = new RcdTextDivElement(content).init().
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
    constructor(title) {
        super();
        this.contentArea = new RcdMaterialDialogContentArea(title).init();
        this.actions = new RcdDivElement().init().
            addClass('rcd-material-dialog-actions');
    }

    init() {
        return this.addClass('rcd-material-dialog').
            addChild(this.contentArea).
            addChild(this.actions);
    }

    addItem(item) {
        this.contentArea.addChild(field);
    }

    addAction(text, callback) {
        //const action = new 
        //action.addClass('rcd-material-dialog-action');
        //this.actions.addChild(action);
        return this;
    }
}

class RcdMaterialModalDialog extends RcdDivElement {
    constructor(params) {
        super();
        this.overlay = params.overlay;
        this.dialog = new RcdMaterialDialog(params.content || '', params.title).init();
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
        this.dialog.addField(field);
        return this;
    }

    addAction(action) {
        this.dialog.addAction(action);
        return this;
    }
}