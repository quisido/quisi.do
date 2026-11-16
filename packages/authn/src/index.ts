const EXPORTED_HANDLER: Pick<ExportedHandler<Env>, 'fetch'> = {
	async fetch(_request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
		return new Response(JSON.stringify({code: 1}), { "headers": { "Content-Type": "application/json" } });
	},
};

export default EXPORTED_HANDLER;
