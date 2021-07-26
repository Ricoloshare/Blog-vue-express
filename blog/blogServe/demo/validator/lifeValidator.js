const lifeSchema = {
    type: "object",
    properties: {
        content: {
            type: "string",
            maxLength: 255,
            minLength: 3
        }
    },
    required: ["content"]
}
module.exports = lifeSchema;