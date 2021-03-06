import { Controller } from 'egg';

class BlogController extends Controller {
    async query() {
        const { ctx, service } = this;
        const { query } = ctx;

        ctx.helper.validate('query', query);

        const result = await service.blog.query(query).catch(() => 32000);
        ctx.helper.send(result);
    }

    async info() {
        const { ctx, service } = this;
        const id = ctx.params.id;

        ctx.helper.validate('id', { id });

        const result = await service.blog.info(id).catch(() => 32001);
        ctx.helper.send(result);
    }

    async create() {
        const { ctx, service } = this;
        const data = ctx.request.body;
        const userId = ctx.state.user.id;

        data.author = userId;
        ctx.helper.validate('blog', data, true);

        const result = await service.blog.create(data).catch(() => 32002);
        ctx.helper.send(result);
    }

    async update() {
        const { ctx, service } = this;
        const data = ctx.request.body;
        const id = ctx.params.id;

        ctx.helper.validate('id', { id });
        ctx.helper.validate('blog', data);

        const result = await service.blog.update([id], data).catch(() => 32003);
        ctx.helper.send(result);
    }

    async updateMany() {
        const { ctx, service } = this;
        const data = ctx.request.body;
        const { ids } = data;

        ctx.helper.validate('ids', { ids });
        ctx.helper.validate('blog', data);

        const result = await service.blog.update(ids, data).catch(() => 32003);
        ctx.helper.send(result);
    }

    async destroy() {
        const { ctx, service } = this;
        const id = ctx.params.id;

        ctx.helper.validate('id', { id });

        const result = await service.blog.destroy([id]).catch(() => 32004);
        ctx.helper.send(result);
    }

    async destroyMany() {
        const { ctx, service } = this;
        const { ids } = ctx.request.body;

        ctx.helper.validate('ids', { ids });

        const result = await service.blog.destroy(ids).catch(() => 32004);
        ctx.helper.send(result);
    }
}

export default BlogController;
