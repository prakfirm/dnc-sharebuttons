"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("./index");
var NFormatterPipe = /** @class */ (function () {
    function NFormatterPipe() {
    }
    NFormatterPipe.prototype.transform = function (num, digits) {
        if (typeof num !== 'number') {
            throw new Error('A number is expected for nFormatter');
        }
        return index_1.Helper.nFormatter(num, digits);
    };
    NFormatterPipe.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'nFormatter'
                },] },
    ];
    /** @nocollapse */
    NFormatterPipe.ctorParameters = function () { return []; };
    return NFormatterPipe;
}());
exports.NFormatterPipe = NFormatterPipe;
//# sourceMappingURL=n-formatter.pipe.js.map