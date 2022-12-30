"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const userRegister_1 = require("./user/userRegister");
const userLogin_1 = require("./auth/userLogin");
const adminLogin_1 = require("./auth/adminLogin");
const setFirstPassword_1 = require("./auth/setFirstPassword");
const getUserProfile_1 = require("./user/getUserProfile");
const approveDisapproveUser_1 = require("./user/approveDisapproveUser");
const removeUser_1 = require("./user/removeUser");
const requestPasswordReset_1 = require("./forgetPassword/requestPasswordReset");
const validatePasswordResetToken_1 = require("./forgetPassword/validatePasswordResetToken");
const resetForgottenPassword_1 = require("./forgetPassword/resetForgottenPassword");
exports.routes = [
    userRegister_1.userRegister,
    userLogin_1.userLogin,
    adminLogin_1.adminLogin,
    setFirstPassword_1.setFirstPassword,
    getUserProfile_1.getUserProfile,
    approveDisapproveUser_1.approveDisapproveUser,
    removeUser_1.removeUser,
    requestPasswordReset_1.requestPasswordReset,
    validatePasswordResetToken_1.validatePasswordResetToken,
    resetForgottenPassword_1.resetForgottenPassword,
];
