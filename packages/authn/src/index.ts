/** @see https://developers.cloudflare.com/workers/ */

const EXPORTED_HANDLER: Pick<ExportedHandler<Env>, 'fetch'> = {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response(JSON.stringify({code: 1}), { "headers": { "Content-Type": "application/json" } });
	},
};

export default EXPORTED_HANDLER;
