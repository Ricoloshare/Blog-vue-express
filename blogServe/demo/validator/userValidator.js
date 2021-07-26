const userSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
            maxLength: 255,
            minLength: 3
        },
        password: {
            type: "string",
            pattern: '^[A-Za-z0-9]{6,200}$',
            maxLength: 200,
            minLength: 6
        }
    },
    required: ["username", "password"]
}
module.exports = userSchema;