"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const marked_1 = require("marked");
class Email {
    constructor(subject) {
        this.subject = subject;
    }
    html() {
        const md = this.template();
        return marked_1.marked.parse(md);
    }
}
exports.Email = Email;
