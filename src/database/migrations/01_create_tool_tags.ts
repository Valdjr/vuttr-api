import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('tool_tags', table => {
        table.increments('id').primary()
        table.string('id_tool').notNullable().references('id').inTable('tools').onDelete('CASCADE').onUpdate('CASCADE')
        table.string('tag').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropSchema('tool_tags')
}