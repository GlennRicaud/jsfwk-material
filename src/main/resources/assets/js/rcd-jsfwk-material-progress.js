class RcdLinearProgressIndicator extends RcdHtmlElement {
    constructor(params) {
        super('svg', 'http://www.w3.org/2000/svg');
        this.width = params.width;
        this.height = params.height;

        this.backgroundLine = new RcdHtmlElement('line', this.namespaceURI)
            .addClass('rcd-material-linear-background-line')
            .setAttributeNS(null, 'x1', '0')
            .setAttributeNS(null, 'y1', '0')
            .setAttributeNS(null, 'x2', this.width)
            .setAttributeNS(null, 'y2', '0');
        this.line = new RcdHtmlElement('line', this.namespaceURI)
            .addClass('rcd-material-linear-line')
            .setAttributeNS(null, 'stroke-dasharray', this.width + ' ' + this.width )
            .setAttributeNS(null, 'stroke-dashoffset', '100%' )
            .setAttributeNS(null, 'x1', '0')
            .setAttributeNS(null, 'y1', '0')
            .setAttributeNS(null, 'x2', this.width)
            .setAttributeNS(null, 'y2', '0');
    }

    init() {
        return super.init()
            .addClass('rcd-material-linear-progress')
            .setAttributeNS(null, 'width', this.width)
            .setAttributeNS(null, 'height', this.height)
            .addChild(this.backgroundLine)
            .addChild(this.line);
    }
    
    setProgress(progress) {
        const dashoffset = Math.ceil(this.width - (progress * this.width));
        this.line.setAttributeNS(null, 'stroke-dashoffset', dashoffset);
        return this;
    }
}