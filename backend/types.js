const z = require('zod')


const todoZod = z.object({
    title: z.string(),
    description: z.string(),
});

const updateTodoZod = z.object({
    id: z.string(),
})

module.exports = {
    todoZod,
    updateTodoZod
}