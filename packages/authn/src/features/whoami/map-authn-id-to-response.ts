import { WhoAmIResponseCode } from "@quisido/authn-shared";
import { Snapshot } from "proposal-async-context/src/index.js";
import MetricName from "../../constants/metric-name.js";
import StatusCode from "../../constants/status-code.js";
import getTelemetry from "../../utils/get-telemetry.js";
import getAuthnUserIdsNamespace from "../get-authn-user-ids-namespace.js";
import getResponseHeaders from "./get-response-headers.js";
import handleInvalidAuthnId from "./handle-invalid-authn-id.js";

const BASE = 10;

export default async function mapAuthnIdToResponse(authnId: string): Promise<Response> {
  const authnUserIds: KVNamespace = getAuthnUserIdsNamespace();

  const snapshot: Snapshot = new Snapshot();
  const id: string | null = await authnUserIds.get(authnId, 'text');
  return snapshot.run((): Response => {
    const { emitPrivateMetric, emitPublicMetric } = getTelemetry();

    /**
     *   Authentication is eventually consistent. We don't want to delete the
     * invalid authentication cookie in case the ID exists in the future.
     */
    if (id === null) {
      return handleInvalidAuthnId(authnId);
    }

    // User found! 🎉
    emitPrivateMetric({
      authnId,
      id,
      name: MetricName.UncachedAuthnId,
    });

    emitPublicMetric({
      name: MetricName.UncachedAuthnId,
    });

    return new Response(
      JSON.stringify({
        code: WhoAmIResponseCode.Uncached,
        id: parseInt(id, BASE),
      }),
      {
        headers: getResponseHeaders(),
        status: StatusCode.OK,
      },
    );
  });
}
