"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJSON = void 0;
function isJSON(str) {
    try {
        return JSON.parse(str) && !!str;
    }
    catch (e) {
        return false;
    }
}
exports.isJSON = isJSON;
