"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var share_buttons_component_1 = require("./components/share-buttons/share-buttons.component");
exports.ShareButtonsComponent = share_buttons_component_1.ShareButtonsComponent;
var share_button_component_1 = require("./components/share-button/share-button.component");
exports.ShareButtonComponent = share_button_component_1.ShareButtonComponent;
var share_button_directive_1 = require("./directives/share-button/share-button.directive");
exports.ShareButtonDirective = share_button_directive_1.ShareButtonDirective;
var share_buttons_service_1 = require("./services/share-buttons.service");
exports.ShareButtonsService = share_buttons_service_1.ShareButtonsService;
var window_service_1 = require("./services/window.service");
var n_formatter_pipe_1 = require("./helpers/n-formatter.pipe");
exports.NFormatterPipe = n_formatter_pipe_1.NFormatterPipe;
var index_1 = require("./helpers/index");
exports.ShareButton = index_1.ShareButton;
exports.ShareArgs = index_1.ShareArgs;
exports.ShareProvider = index_1.ShareProvider;
var ShareButtonsModule = /** @class */ (function () {
    function ShareButtonsModule() {
    }
    ShareButtonsModule.forRoot = function () {
        return {
            ngModule: ShareButtonsModule,
            providers: [
                share_buttons_service_1.ShareButtonsService,
                window_service_1.WindowService
            ]
        };
    };
    ShareButtonsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        share_buttons_component_1.ShareButtonsComponent,
                        share_button_component_1.ShareButtonComponent,
                        share_button_directive_1.ShareButtonDirective,
                        n_formatter_pipe_1.NFormatterPipe
                    ],
                    imports: [
                        common_1.CommonModule,
                        http_1.JsonpModule
                    ],
                    exports: [
                        share_buttons_component_1.ShareButtonsComponent,
                        share_button_component_1.ShareButtonComponent,
                        share_button_directive_1.ShareButtonDirective,
                        n_formatter_pipe_1.NFormatterPipe
                    ]
                },] },
    ];
    /** @nocollapse */
    ShareButtonsModule.ctorParameters = function () { return []; };
    return ShareButtonsModule;
}());
exports.ShareButtonsModule = ShareButtonsModule;
//# sourceMappingURL=share-buttons.module.js.map