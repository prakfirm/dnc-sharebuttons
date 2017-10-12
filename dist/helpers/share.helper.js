"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var share_provider_enum_1 = require("./share-provider.enum");
var share_links_functions_1 = require("./share-links.functions");
/** Here is a collection of helper functions that can be used statically */
var Helper;
(function (Helper) {
    /** Prepare gPlus count request body   */
    Helper.gplusCountBody = function (url) {
        return [{
                method: 'pos.plusones.get',
                id: 'p',
                params: {
                    nolog: true,
                    id: decodeURIComponent(url),
                    source: 'widget',
                    userId: '@viewer',
                    groupId: '@self'
                },
                jsonrpc: '2.0',
                key: 'p',
                apiVersion: 'v1'
            }];
    };
    /** Create share links */
    Helper.shareFactory = function (type, args) {
        switch (type) {
            case share_provider_enum_1.ShareProvider.FACEBOOK:
                return share_links_functions_1.ShareLinks.fbShare(args);
            case share_provider_enum_1.ShareProvider.TWITTER:
                return share_links_functions_1.ShareLinks.twitterShare(args);
            case share_provider_enum_1.ShareProvider.LINKEDIN:
                return share_links_functions_1.ShareLinks.linkedInShare(args);
            case share_provider_enum_1.ShareProvider.REDDIT:
                return share_links_functions_1.ShareLinks.redditShare(args);
            case share_provider_enum_1.ShareProvider.TUMBLR:
                return share_links_functions_1.ShareLinks.tumblrShare(args);
            case share_provider_enum_1.ShareProvider.STUMBLEUPON:
                return share_links_functions_1.ShareLinks.stumbleShare(args);
            case share_provider_enum_1.ShareProvider.GOOGLEPLUS:
                return share_links_functions_1.ShareLinks.gPlusShare(args);
            case share_provider_enum_1.ShareProvider.PINTEREST:
                return share_links_functions_1.ShareLinks.pinShare(args);
            case share_provider_enum_1.ShareProvider.WHATSAPP:
                return share_links_functions_1.ShareLinks.whatsappShare(args);
            default:
                return '';
        }
    };
    /** Change share counts to a readable number e.g 35.6k */
    Helper.nFormatter = function (num, digits) {
        var si = [
            { value: 1E18, symbol: 'E' },
            { value: 1E15, symbol: 'P' },
            { value: 1E12, symbol: 'T' },
            { value: 1E9, symbol: 'G' },
            { value: 1E6, symbol: 'M' },
            { value: 1E3, symbol: 'K' }
        ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
        for (i = 0; i < si.length; i++) {
            if (num >= si[i].value) {
                return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
            }
        }
        return num.toFixed(digits).replace(rx, '$1');
    };
    Helper.getEnumValue = function (value, enumeration) {
        var result;
        if (typeof value !== 'undefined') {
            if (typeof value === 'string' && enumeration[value.toUpperCase()] >= 0) {
                result = enumeration[value.toUpperCase()];
            }
            else if (typeof value === 'number' && enumeration["" + value]) {
                result = enumeration[enumeration["" + value]];
            }
        }
        return result;
    };
})(Helper = exports.Helper || (exports.Helper = {}));
//# sourceMappingURL=share.helper.js.map