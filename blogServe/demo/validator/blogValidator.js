const blogSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            // pattern: '^[A-Za-z0-9]{3,255}$',
            maxLength: 255,
            minLength: 3
        },
        description: {
            type: "string",
            // pattern: '^[A-Za-z0-9]{6,200}$',
            maxLength: 200,
            minLength: 6 
        },
        content: {
            type: "string",
            // pattern: '^[A-Za-z0-9]{6,200}$',
            maxLength: 20000,
            minLength: 6 
        },
        classify: {
            type: "string",
            // pattern: '^[A-Za-z0-9]{6,200}$',
            maxLength: 200,
            minLength: 1
        },
        author: {
            type: "string",
            // pattern: '^[A-Za-z0-9]{6,200}$',
            maxLength: 200,
            minLength: 2
        }
    },
    required: ["author","content", "title","description"]
}
module.exports = blogSchema;