export const AddCarSchema = {
  description: "Create a new car",
  tags: ["cars"],
  summary: "Creates new car with given values",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      brand: { type: "string" },
      price: { type: "string" },
      age: { type: "number" },
      services: { type: "object" },
    },
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        _id: { type: "string" },
        title: { type: "string" },
        brand: { type: "string" },
        price: { type: "string" },
        age: { type: "number" },
        services: { type: "object" },
        __v: { type: "number" },
      },
    },
  },
};

export const HealthSchema = {
  description: "Health check API for application",
  tags: ["health"],
  summary:
    "Provides API health details and echos any string you send as message",
  //   body: {
  //     type: "object",
  //     properties: {
  //       message: { type: "string" },
  //     },
  //   },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        message: { type: "string" },
        // your_message: { type: "string" },
      },
    },
  },
};
