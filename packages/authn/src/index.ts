/** @see https://developers.cloudflare.com/workers/ */

const EXPORTED_HANDLER: Pick<ExportedHandler<Env>, 'fetch'> = {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response("Hello World!");
	},
};

export default EXPORTED_HANDLER;
