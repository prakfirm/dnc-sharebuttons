"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareButton = /** @class */ (function () {
    function ShareButton(provider, template, classes) {
        this.provider = provider;
        this.template = template;
        this.classes = classes;
    }
    return ShareButton;
}());
exports.ShareButton = ShareButton;
var ShareArgs = /** @class */ (function () {
    function ShareArgs(url, title, description, image, tags, via, mobile) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.image = image;
        this.tags = tags;
        this.via = via;
        this.mobile = mobile;
    }
    return ShareArgs;
}());
exports.ShareArgs = ShareArgs;
//# sourceMappingURL=share-buttons.class.js.map