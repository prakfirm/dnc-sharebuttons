"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var share_buttons_service_1 = require("../../services/share-buttons.service");
var index_1 = require("../../helpers/index");
var ShareButtonDirective = /** @class */ (function () {
    function ShareButtonDirective(sbService) {
        this.sbService = sbService;
        /** Output button count to calculate total share counts */
        this.sbCount = new core_1.EventEmitter();
        /** Output pop up closed*/
        this.sbPopUpClosed = new core_1.EventEmitter();
    }
    Object.defineProperty(ShareButtonDirective.prototype, "shareButton", {
        set: function (value) {
            this.provider = index_1.Helper.getEnumValue(value, index_1.ShareProvider);
            if (typeof this.provider === 'undefined') {
                throw new Error("[shareButton] must be set to one of the values (numeric or string) of ShareProvider enum: was '" + value + "'");
            }
        },
        enumerable: true,
        configurable: true
    });
    ShareButtonDirective.prototype.onClick = function () {
        this.share();
    };
    ShareButtonDirective.prototype.ngOnChanges = function (changes) {
        /** Validate URL */
        this.sbUrl = this.sbService.validateUrl(this.sbUrl);
        if (changes['sbUrl']) {
            var currUrl = changes['sbUrl'].currentValue;
            var prevUrl = changes['sbUrl'].previousValue;
            if (currUrl && currUrl !== prevUrl) {
                /** Add share count if enabled */
                if (this.sbShowCount) {
                    this.sbService.count(this.provider, this.sbUrl, this.sbCount);
                }
            }
        }
    };
    /** Open share window */
    ShareButtonDirective.prototype.share = function () {
        var args = new index_1.ShareArgs(this.sbUrl, this.sbTitle, this.sbDescription, this.sbImage, this.sbTags);
        this.sbService.share(this.provider, args, this.sbPopUpClosed);
    };
    ShareButtonDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[shareButton]'
                },] },
    ];
    /** @nocollapse */
    ShareButtonDirective.ctorParameters = function () { return [
        { type: share_buttons_service_1.ShareButtonsService, },
    ]; };
    ShareButtonDirective.propDecorators = {
        'shareButton': [{ type: core_1.Input },],
        'sbUrl': [{ type: core_1.Input },],
        'sbTitle': [{ type: core_1.Input },],
        'sbDescription': [{ type: core_1.Input },],
        'sbImage': [{ type: core_1.Input },],
        'sbTags': [{ type: core_1.Input },],
        'sbShowCount': [{ type: core_1.Input },],
        'sbCount': [{ type: core_1.Output },],
        'sbPopUpClosed': [{ type: core_1.Output },],
        'onClick': [{ type: core_1.HostListener, args: ['click',] },],
    };
    return ShareButtonDirective;
}());
exports.ShareButtonDirective = ShareButtonDirective;
//# sourceMappingURL=share-button.directive.js.map