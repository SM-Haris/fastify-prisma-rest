export const loginSchema = {
  description: "Endpoint for user to login",
  tags: ["auth"],
  summary:
    "Authenticates user by validating email and password and returns JWT tokens",
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 20,
      },
    },
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        access: { type: "string" },
        refresh: { type: "string" },
      },
    },
  },
};

export const signupSchema = {
  description: "Endpoint for user to signup",
  tags: ["auth"],
  summary:
    "Authorizes user by validating username, email and password and creates his account",
  body: {
    type: "object",
    properties: {
      username: { type: "string", maxLength: 20 },
      email: { type: "string", format: "email" },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 20,
      },
    },
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
