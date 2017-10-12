"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/empty");
var window_service_1 = require("./window.service");
var index_1 = require("../helpers/index");
var ShareButtonsService = /** @class */ (function () {
    function ShareButtonsService(window, http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        /** Optional parameters */
        this.windowWidth = 500;
        this.windowHeight = 400;
        this.window = window.nativeWindow;
    }
    ShareButtonsService.prototype.validateUrl = function (url) {
        /** If URL is specified then validate it, otherwise use window URL */
        if (url) {
            var r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if (r.test(url)) {
                return encodeURIComponent(url);
            }
            else {
                console.warn('[ShareButtons]: Invalid URL, fallback to Window URL');
            }
        }
        /** fallback to "Window" URL, or to "Global" in universal */
        return (this.window) ? encodeURIComponent(this.window.location.href) : global.url || '';
    };
    /** Open share window */
    ShareButtonsService.prototype.share = function (type, args, popUpClosed) {
        var _this = this;
        /** include twitterAccount in args for twitter button */
        if (this.twitterAccount) {
            args = Object.assign({}, args, { via: this.twitterAccount });
        }
        /** check for mobile browser (this won't detect tablets browser) */
        if (this.window.innerWidth <= 480) {
            args = Object.assign({}, args, { mobile: true });
        }
        var popUp = this.window.open(index_1.Helper.shareFactory(type, args), 'newwindow', this.windowAttr());
        /** Emit clicked button */
        if (this.window && popUp) {
            var pollTimer_1 = this.window.setInterval(function () {
                if (popUp.closed) {
                    _this.window.clearInterval(pollTimer_1);
                    popUpClosed.emit(type);
                }
            }, 200);
        }
    };
    /** Share Counts */
    ShareButtonsService.prototype.count = function (type, url, count) {
        switch (type) {
            case index_1.ShareProvider.FACEBOOK:
                this.fbCount(url, count);
                break;
            case index_1.ShareProvider.LINKEDIN:
                this.linkedInCount(url, count);
                break;
            case index_1.ShareProvider.REDDIT:
                this.redditCount(url, count);
                break;
            case index_1.ShareProvider.TUMBLR:
                this.tumblrCount(url, count);
                break;
            case index_1.ShareProvider.GOOGLEPLUS:
                this.gPlusCount(url, count);
                break;
            case index_1.ShareProvider.PINTEREST:
                this.pinCount(url, count);
                break;
            default:
        }
    };
    ShareButtonsService.prototype.fbCount = function (url, count) {
        this.fetch("https://graph.facebook.com/?id=" + url)
            .subscribe(function (data) {
            data = data.json();
            if (data.hasOwnProperty('share') && data.share.hasOwnProperty('share_count')) {
                count.emit(data.share.share_count);
                return;
            }
            count.emit(0);
        });
    };
    ShareButtonsService.prototype.linkedInCount = function (url, count) {
        this.fetchJsonp("https://www.linkedin.com/countserv/count/share?url=" + url)
            .subscribe(function (data) {
            data = data.json();
            count.emit(data.count || 0);
        });
    };
    ShareButtonsService.prototype.redditCount = function (url, count) {
        this.fetch("https://buttons.reddit.com/button_info.json?url=" + url)
            .subscribe(function (data) {
            data = data.json();
            if (data.hasOwnProperty('data') && data.data.hasOwnProperty('children')) {
                if (data.data.children.length) {
                    count.emit(data.data.children[0].data.score);
                    return;
                }
            }
            count.emit(0);
        });
    };
    ShareButtonsService.prototype.gPlusCount = function (url, count) {
        var body = index_1.Helper.gplusCountBody(url);
        this.post('https://clients6.google.com/rpc?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ', body)
            .subscribe(function (data) {
            data = data.json();
            if (data[0] && data[0].hasOwnProperty('result')) {
                count.emit(data[0].result.metadata.globalCounts.count);
                return;
            }
            count.emit(0);
        });
    };
    ShareButtonsService.prototype.pinCount = function (url, count) {
        this.fetch("https://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url=" + url)
            .subscribe(function (data) {
            data = data.text();
            var result = JSON.parse(data.replace(/^receiveCount\((.*)\)/, '$1'));
            count.emit(result.count || 0);
        });
    };
    ShareButtonsService.prototype.tumblrCount = function (url, count) {
        this.fetchJsonp("https://api.tumblr.com/v2/share/stats?url=" + url)
            .subscribe(function (data) {
            data = data.json();
            if (data.hasOwnProperty('response') && data.response.hasOwnProperty('note_count')) {
                count.emit(data.response.note_count);
                return;
            }
            count.emit(0);
        });
    };
    ShareButtonsService.prototype.post = function (url, body) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .catch(function (err) { return Observable_1.Observable.empty(); });
    };
    ShareButtonsService.prototype.fetch = function (url) {
        return this.http.get(url)
            .catch(function (err) { return Observable_1.Observable.empty(); });
    };
    ShareButtonsService.prototype.fetchJsonp = function (url) {
        return this.jsonp.request(url + "&format=jsonp&callback=JSONP_CALLBACK")
            .catch(function (err) { return Observable_1.Observable.empty(); });
    };
    ShareButtonsService.prototype.windowAttr = function () {
        return 'width=' + this.windowWidth + ', height=' + this.windowHeight;
    };
    ShareButtonsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ShareButtonsService.ctorParameters = function () { return [
        { type: window_service_1.WindowService, },
        { type: http_1.Http, },
        { type: http_1.Jsonp, },
    ]; };
    return ShareButtonsService;
}());
exports.ShareButtonsService = ShareButtonsService;
//# sourceMappingURL=share-buttons.service.js.map