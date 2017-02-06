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

function showInputDialog(params) {
    var inputField = new RcdMaterialTextField(params.label, params.placeholder).init().
        setValue(params.value || '');
    var cancelCallback = () => hideDialog(rcdDialog, params.parent);
    var okCallback = () => {
        hideDialog(rcdDialog, params.parent);
        params.callback(inputField.getValue());
    };
    var cancelAction = new RcdMaterialActionText("CANCEL", cancelCallback).init();
    var okAction = new RcdMaterialActionText(params.ok || "OK", okCallback).init();
    var rcdDialog = new RcdMaterialModalDialog("", params.title).
        init().
        addField(inputField).
        addAction(cancelAction).
        addAction(okAction).
        addKeyUpListener('Enter', okCallback).
        addKeyUpListener('Escape', cancelCallback).
        show(params.parent);
    inputField.select().focus();
}

function showSelectionDialog(params) {
    var comboField = new RcdMaterialSelect(params.label, params.options).init();
    var cancelCallback = () => hideDialog(rcdDialog, params.parent);
    var okCallback = () => {
        hideDialog(rcdDialog, params.parent);
        params.callback(comboField.getValue());
    };
    var cancelAction = new RcdMaterialActionText("CANCEL", cancelCallback).init();
    var okAction = new RcdMaterialActionText(params.ok || "OK", okCallback).init();
    var rcdDialog = new RcdMaterialModalDialog("", params.title).
        init().
        addField(comboField).
        addAction(cancelAction).
        addAction(okAction).
        addKeyUpListener('Enter', okCallback).
        addKeyUpListener('Escape', cancelCallback).
        show(params.parent);
    comboField.focus();
}

function showConfirmationDialog(text, callback, parent) {
    var cancelCallback = () => hideDialog(rcdDialog, parent);
    var okCallback = () => {
        hideDialog(rcdDialog, parent);
        callback();
    };
    var cancelAction = new RcdMaterialActionText("CANCEL", cancelCallback).init();
    var okAction = new RcdMaterialActionText("OK", okCallback).init();
    var rcdDialog = new RcdMaterialModalDialog(text).
        init().
        addAction(cancelAction).
        addAction(okAction).
        addKeyUpListener('Enter', okCallback).
        addKeyUpListener('Escape', cancelCallback).
        show(parent).
        focus();
}

function showDetailsDialog(params) {
    var closeCallback = () => hideDialog(rcdDialog, params.parent);
    var closeAction = new RcdMaterialActionText("CLOSE", closeCallback).init();
    var rcdDialog = new RcdMaterialModalDialog(params.text, params.title).
        init().
        addAction(closeAction).
        addKeyUpListener('Enter', closeCallback).
        addKeyUpListener('Escape', closeCallback).
        show(params.parent).
        focus();
}

function showInfoDialog(text, parent) {
    var rcdDialog = new RcdMaterialModalDialog(text).init();
    rcdDialog.show(parent);
    return rcdDialog;
}
function hideDialog(dialog, parent) {
    dialog.hide(parent);
}