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
    var cancelCallback = () => hideDialog(rcdDialog);
    var okCallback = () => {
        hideDialog(rcdDialog);
        params.callback(inputField.getValue());
    };
    var cancelAction = new RcdMaterialActionText("CANCEL", cancelCallback).init();
    var okAction = new RcdMaterialActionText(params.ok || "OK", okCallback).init();
    var rcdDialog = new RcdMaterialModalDialog({title: params.title, overlay: true}).
        init().
        addField(inputField).
        addAction(cancelAction).
        addAction(okAction).
        addKeyUpListener('Enter', okCallback).
        addKeyUpListener('Escape', cancelCallback).
        setParent(params.parent);
    inputField.select().focus();
}

function showSelectionDialog(params) {
    var dropdownField = new RcdMaterialDropdown(params.label, params.options).init();
    var cancelCallback = () => hideDialog(rcdDialog);
    var okCallback = () => {
        hideDialog(rcdDialog);
        params.callback(dropdownField.getValue());
    };
    var cancelAction = new RcdMaterialActionText("CANCEL", cancelCallback).init();
    var okAction = new RcdMaterialActionText(params.ok || "OK", okCallback).init();
    var rcdDialog = new RcdMaterialModalDialog({title: params.title, overlay: true}).
        init().
        addField(dropdownField).
        addAction(cancelAction).
        addAction(okAction).
        addKeyUpListener('Enter', okCallback).
        addKeyUpListener('Escape', cancelCallback).
        setParent(params.parent);
    dropdownField.focus();
}

function showConfirmationDialog(text, callback, parent) {
    var cancelCallback = () => hideDialog(rcdDialog);
    var okCallback = () => {
        hideDialog(rcdDialog);
        callback();
    };
    var cancelAction = new RcdMaterialActionText("CANCEL", cancelCallback).init();
    var okAction = new RcdMaterialActionText("OK", okCallback).init();
    var rcdDialog = new RcdMaterialModalDialog({content: text, overlay: true}).
        init().
        addAction(cancelAction).
        addAction(okAction).
        addKeyUpListener('Enter', okCallback).
        addKeyUpListener('Escape', cancelCallback).
        setParent(parent).
        focus();
}

function showDetailsDialog(params) {
    var closeCallback = () => hideDialog(rcdDialog);
    var closeAction = new RcdMaterialActionText("CLOSE", closeCallback).init();
    var rcdDialog = new RcdMaterialModalDialog({content: params.text, title: params.title, overlay: true}).
        init().
        addAction(closeAction).
        addKeyUpListener('Enter', closeCallback).
        addKeyUpListener('Escape', closeCallback).
        setParent(params.parent).
        focus();
}

function showInfoDialog(text, parent) {
    var rcdDialog = new RcdMaterialModalDialog({content: text}).init();
    rcdDialog.setParent(parent);
    return rcdDialog;
}
function hideDialog(dialog) {
    dialog.removeParent();
}