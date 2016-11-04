class RcdMaterialDialogContent extends RcdDivElement {
    constructor(content, title) {
        super();
        this.title = title ? new RcdTextDivElement(title).
            init().
            addClass('rcd-material-dialog-content-title') : undefined;
        this.body = new RcdTextDivElement(content).
            init().
            addClass('rcd-material-dialog-content-body');
    }

    init() {
        this.addClass('rcd-material-dialog-content');

        if (this.title) {
            this.addChild(this.title);
        }
        return this.addChild(this.body);
    }
}


class RcdMaterialDialog extends RcdDivElement {
    constructor(content, title) {
        super();
        this.content = new RcdMaterialDialogContent(content, title).init();
        this.actions = new RcdDivElement().init().
            addClass('rcd-material-dialog-actions');
    }

    init() {
        return this.addClass('rcd-material-dialog').
            addChild(this.content).
            addChild(this.actions);
    }

    addField(field) {
        this.content.addChild(field);
    }

    addAction(action) {
        action.addClass('rcd-material-dialog-action');
        this.actions.addChild(action);
        return this;
    }
}

class RcdMaterialModalDialog extends RcdDivElement {
    constructor(content, title) {
        super();
        this.dialog = new RcdMaterialDialog(content, title).init();
    }

    init() {
        return this.addClass('rcd-material-cache').
            addClass('rcd-body'). //Workaround for widget
            addChild(this.dialog);
    }

    addField(field) {
        this.dialog.addField(field);
        return this;
    }

    addAction(action) {
        this.dialog.addAction(action);
        return this;
    }
}

var currentRcdDialog;
function showInputDialog(params) {
    var inputField = new RcdMaterialTextField(params.label, params.placeholder).init().
        setValue(params.value);
    var okCallback = () => {
        hideDialog(params.parent);
        params.callback(inputField.getValue());
    };
    var cancelAction = new RcdMaterialActionText("CANCEL", () => hideDialog(params.parent)).init();
    var okAction = new RcdMaterialActionText(params.ok || "OK", okCallback).init();
    currentRcdDialog = new RcdMaterialModalDialog("", params.title).
        init().
        addField(inputField).
        addAction(cancelAction).
        addAction(okAction).
        addKeyUpListener('Enter', okCallback).
        show(params.parent);
    inputField.select().focus();
}
function showConfirmationDialog(text, callback, parent) {
    var okCallback = () => {
        hideDialog(parent);
        callback();
    };
    var cancelAction = new RcdMaterialActionText("CANCEL", () => hideDialog(parent)).init();
    var okAction = new RcdMaterialActionText("OK", okCallback).init();
    currentRcdDialog = new RcdMaterialModalDialog(text).
        init().
        addAction(cancelAction).
        addAction(okAction).
        addKeyUpListener('Enter', okCallback).
        show(parent).
        focus();
}
function showInfoDialog(text, parent) {
    currentRcdDialog = new RcdMaterialModalDialog(text).init();
    currentRcdDialog.show(parent);
}
function hideDialog(parent) {
    currentRcdDialog.hide(parent);
}