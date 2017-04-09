class RcdMaterialSnackbar extends RcdDivElement {
    constructor(message) {
        super();
        this.message = new RcdTextDivElement(message).
            init().
            addClass('rcd-material-snackbar-message');
    }

    init() {
        return this.addClass('rcd-material-snackbar').
            addChild(this.message);
    }

    addAction(label, callback) {
        const action = new RcdTextDivElement(label).
            init().
            addClass('rcd-material-snackbar-action').
            addClickListener(() => {
                this.close();
                callback();
            });
        return this.addChild(action);
    }

    close() {
        this.removeParent();
    }

    open(parent, timeout = 3000) {
        this.setParent(parent);
        setTimeout(() => this.close(), timeout);
    }

}