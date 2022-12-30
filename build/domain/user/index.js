"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.userService = void 0;
var userService_1 = require("./userService");
Object.defineProperty(exports, "userService", { enumerable: true, get: function () { return userService_1.userService; } });
var userController_1 = require("./userController");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return userController_1.userController; } });
__exportStar(require("./userController.schema"), exports);
