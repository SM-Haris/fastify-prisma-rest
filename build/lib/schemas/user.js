"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserSchema = void 0;
exports.currentUserSchema = {
    description: "Provides details of current user",
    tags: ["user"],
    summary: "Shares the details of the current authroized/logged-in user",
    response: {
        200: {
            description: "Successful response",
            type: "object",
            properties: {
                user: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        username: { type: "string" },
                        email: { type: "string" },
                    },
                },
            },
        },
    },
};