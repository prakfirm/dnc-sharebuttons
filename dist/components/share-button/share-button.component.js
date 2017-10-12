"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ShareButtonComponent = /** @class */ (function () {
    function ShareButtonComponent() {
        /** Show count, disabled by default */
        this.showCount = false;
        /** Output button count to calculate total share counts */
        this.count = new core_1.EventEmitter();
        /** Output pop up closed*/
        this.popUpClosed = new core_1.EventEmitter();
    }
    ShareButtonComponent.prototype.counter = function (count) {
        this.shareCount = count;
        this.count.emit(count);
    };
    /** emits closed button type: so user can tell which button has been clicked */
    ShareButtonComponent.prototype.shareClosed = function (provider) {
        this.popUpClosed.emit(provider);
    };
    ShareButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'share-button',
                    template: "\n      <button [shareButton]=\"button.provider\"\n              [sbUrl]=\"url\"\n              [sbImage]=\"image\"\n              [sbTitle]=\"title\"\n              [sbDescription]=\"description\"\n              [sbTags]=\"tags\"\n              [sbShowCount]=\"showCount\"\n              (sbCount)=\"counter($event)\"\n              (sbPopUpClosed)=\"shareClosed($event)\"\n              [class.sb-show-count]=\"showCount\"\n              [attr.aria-label]=\"button.provider\">\n\n        <div class=\"sb-template\" [innerHtml]=\"button.template\"></div>\n        <span *ngIf=\"showCount && shareCount\" class=\"sb-count\">{{ shareCount | nFormatter: 1 }}</span>\n      </button>\n    ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    ShareButtonComponent.ctorParameters = function () { return []; };
    ShareButtonComponent.propDecorators = {
        'url': [{ type: core_1.Input },],
        'title': [{ type: core_1.Input },],
        'description': [{ type: core_1.Input },],
        'image': [{ type: core_1.Input },],
        'tags': [{ type: core_1.Input },],
        'button': [{ type: core_1.Input },],
        'showCount': [{ type: core_1.Input },],
        'count': [{ type: core_1.Output },],
        'popUpClosed': [{ type: core_1.Output },],
    };
    return ShareButtonComponent;
}());
exports.ShareButtonComponent = ShareButtonComponent;
//# sourceMappingURL=share-button.component.js.map