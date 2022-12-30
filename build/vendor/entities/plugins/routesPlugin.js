"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesPlugin = void 0;
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const routes_1 = require("@/app/routes");
exports.routesPlugin = {
    plug() {
        return async (app) => {
            app
                .setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler)
                .setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
            for (const route of routes_1.routes) {
                app.withTypeProvider().route(route);
            }
        };
    },
};
