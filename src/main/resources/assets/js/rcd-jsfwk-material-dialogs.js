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
        this.contentArea.addItem(item);
        return this;
    }

    addAction(label, callback) {
        const action = new RcdMaterialButtonArea(label, callback, RcdMaterialButtonType.FLAT).init().
            addClass('rcd-material-dialog-action');
        this.actions.addChild(action);
        return this;
    }
}

class RcdMaterialModalDialog extends RcdDivElement {
    constructor(title, text, overlay, cancellable) {
        super();
        this.overlay = overlay;
        this.cancellable = cancellable;
        this.dialog = new RcdMaterialDialog(title, text).init();
    }

    init() {
        if (this.overlay) {
            this.addClass('rcd-material-overlay');
        }
        if (this.cancellable) {
            this.dialog.addClickListener((source, event) => event.stopPropagation());
            this.addClickListener(() => this.close());
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

    open(parent) {
        return this.setParent(parent).
            focus();
    }

    close() {
        this.removeParent();
    }
}

class RcdMaterialInfoDialog extends RcdMaterialModalDialog {
    constructor(params) {
        super(params.title, params.text, params.overlay, false);
    }
    
    setInfoText(infoText) {
        //TODO Clean
        this.dialog.contentArea.body.children[0].setText(infoText);
    }
}

class RcdMaterialDetailsDialog extends RcdMaterialModalDialog {
    constructor(params) {
        super(params.title, params.text, true, true);
        this.callback = params.callback;
    }

    init() {
        const closeCallback = () => {
            this.close();
            if (this.callback) {
                this.callback();
            }
        };
        super.init().
            addAction('CLOSE', closeCallback).
            addKeyUpListener('Enter', closeCallback).
            addKeyUpListener('Escape', closeCallback);
        return this;
    }
}

class RcdMaterialConfirmationDialog extends RcdMaterialModalDialog {
    constructor(params) {
        super(params.title, params.text, true, true);
        this.callback = params.callback;
        this.confirmationLabel = params.confirmationLabel || 'OK';
    }

    init() {
        const closeCallback = () => this.close();
        const confirmationCallback = (source, event) => {
            this.close();
            this.callback();
            event.stopPropagation();
        };
        return super.init().
            addAction('CANCEL', closeCallback).
            addAction(this.confirmationLabel, confirmationCallback).
            addKeyUpListener('Enter', confirmationCallback).
            addKeyUpListener('Escape', closeCallback);
    }
}

class RcdMaterialSelectionDialog extends RcdMaterialModalDialog {
    constructor(params) {
        super(params.title, params.text, true, true);
        this.callback = params.callback;
        this.dropdownField = new RcdMaterialDropdown(params.label, params.options).init();
        this.confirmationLabel = params.confirmationLabel || 'OK';
    }

    init() {
        const closeCallback = () => this.close();
        const confirmationCallback = (source, event) => {
            this.close();
            this.callback(this.dropdownField.getSelectedValue());
            event.stopPropagation();
        };
        return super.init().
            addAction('CANCEL', closeCallback).
            addAction(this.confirmationLabel, confirmationCallback).
            addKeyUpListener('Enter', confirmationCallback).
            addKeyUpListener('Escape', closeCallback).
            addItem(this.dropdownField);
    }

    open(parent) {
        super.open(parent);
        this.dropdownField.focus();
        return this;
    }
}

class RcdMaterialInputDialog extends RcdMaterialModalDialog {
    constructor(params) {
        super(params.title, params.text, true, true);
        this.callback = params.callback;
        this.inputField = new RcdMaterialTextField(params.label, params.placeholder).init().
            setValue(params.value || '');
        this.confirmationLabel = params.confirmationLabel || 'OK';
    }

    init() {
        const closeCallback = () => this.close();
        const confirmationCallback = (source, event) => {
            this.close();
            this.callback(this.inputField.getValue());
            event.stopPropagation();
        };
        return super.init().
            addAction('CANCEL', closeCallback).
            addAction(this.confirmationLabel, confirmationCallback).
            addKeyUpListener('Enter', confirmationCallback).
            addKeyUpListener('Escape', closeCallback).
            addItem(this.inputField);
    }

    open(parent) {
        super.open(parent);
        this.inputField.focus().select();
        return this;
    }
}