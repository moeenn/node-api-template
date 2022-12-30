"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const request_context_1 = require("@fastify/request-context");
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const plugins_1 = require("@/vendor/entities/plugins");
const config_1 = require("@/app/config");
const errorHandler_1 = require("./errorHandler");
class Server {
    constructor() {
        this.app = (0, fastify_1.default)({ logger: true });
        this.app.setErrorHandler(errorHandler_1.errorHandler);
        this.registerPlugins();
        this.registerRoutes();
    }
    registerPlugins() {
        this.app
            .register(cors_1.default)
            .register(helmet_1.default, { global: true })
            .register(rate_limit_1.default, plugins_1.rateLimitPluginOptions)
            .register(request_context_1.fastifyRequestContextPlugin, plugins_1.requestContextPluginOptions);
    }
    registerRoutes() {
        this.app.register(plugins_1.routesPlugin.plug(), {
            prefix: config_1.serverConfig.apiPrefix,
        });
    }
    run() {
        return new Promise((resolve, reject) => {
            this.app.listen(config_1.serverConfig, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}
exports.Server = Server;
