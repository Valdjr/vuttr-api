import {Request, Response} from 'express'
import db from '../database/connection';

interface Tag {
    tag: string;
}

interface Tool {
    id: number;
    title: string;
    link: string;
    description: string;
}

interface ToolTag {
    id: number;
    id_tool: number;
    tag: string;
}

export default class ConnectionsController {
    async index(req: Request, res: Response) {
        const filters = req.query
        const tag = filters.tag as string

        let query = db('tools')
        if (tag) {
            query.leftJoin('tool_tags', 'tool_tags.id_tool', '=', 'tools.id')
                .where('tool_tags.tag', '=', tag)
                .groupBy('tools.id')
        }

        const tools = await query.select('tools.*')
        const tools_id = tools.map((tool: Tool) => tool.id);
        const tool_tags = await db('tool_tags')
            .select('tool_tags.*')
            .whereIn('tool_tags.id_tool', tools_id)

        const toolsCollection = tools.map((tool : Tool) => {
            const filteredTags = tool_tags.filter((tool_tag: ToolTag) => tool_tag.id_tool == tool.id)
            const tags = filteredTags.map((tag: Tag) => tag.tag)
            return {
                ...tool,
                tags
            }
        })

        return res.json(toolsCollection)
    }

    async create(req: Request, res: Response) {
        const {
            title,
            link,
            description,
            tags
        } = req.body;

        const trx = await db.transaction()

        try {
            const insertedToolsIds = await trx('tools').insert({
                title,
                link,
                description
            })
            const id_tool = insertedToolsIds[0]

            const tool_tags = tags.map((tag: Tag) => {
                return {
                    id_tool,
                    tag
                }
            })
            await trx('tool_tags').insert(tool_tags)
            await trx.commit()

            return res.status(201).json({
                id: id_tool,
                title,
                link,
                description,
                tags
            })
        } catch (error) {
            await trx.rollback()
            return res.status(400).json({error: "Unexpected error"})
        }
    }

    async update(req: Request, res: Response) {
        // atualiza um
    }

    async show(req: Request, res: Response) {
        const params = req.params
        const id = params.id

        const tools = await db('tools').select('tools.*').where('tools.id', '=', id)
        const tool_tags = await db('tool_tags')
            .select('tool_tags.*')
            .where('tool_tags.id_tool', id)

        const toolsCollection = tools.map((tool : Tool) => {
            const filteredTags = tool_tags.filter((tool_tag: ToolTag) => tool_tag.id_tool == tool.id)
            const tags = filteredTags.map((tag: Tag) => tag.tag)
            return {
                ...tool,
                tags
            }
        })

        return res.json(toolsCollection[0])
    }

    async destroy(req: Request, res: Response) {
        const params = req.params
        const id = params.id

        await db('tools').where('tools.id', '=', id).del()

        return res.status(204).send()
    }
}