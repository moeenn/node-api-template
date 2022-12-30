"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordEmail = void 0;
const email_1 = require("@/vendor/entities/email");
class ForgotPasswordEmail extends email_1.Email {
    constructor(args) {
        super("Forgot Password");
        this.args = args;
    }
    template() {
        return `
# Reset forgotten password
A request was made for resetting the password of your account for ${this.args.appName}. Please click the following link to reset your account password.

[Reset Password](${this.args.resetLink})

**Note**: If you did not request a password reset for your account, you can safely ignore this email.
`;
    }
}
exports.ForgotPasswordEmail = ForgotPasswordEmail;
