const megSchema = {
    type: "object",
    properties: {
        content: {
            type: "string",
            maxLength: 255,
            minLength: 1
        },
        name: {
            type: "string",
            maxLength: 255,
            minLength: 1
        },
        email: {
            type: "string",
            pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
            maxLength: 255,
            minLength: 1
        },
        type: {
            type: "string",
            pattern: '^[0-9]',
            maxLength: 255,
            minLength: 1
        },
    },
    required: ["content","name","email","type"]
}
module.exports = megSchema;