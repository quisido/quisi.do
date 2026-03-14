import { StatusCode } from "cloudflare-utils";
import AnalyticsResponseInit from "./analytics-response-init.js";

export default class AnalyticsOptionsResponse extends Response {
  public constructor(accessControlAllowOrigin: string) {
    super(
      null,
      new AnalyticsResponseInit(StatusCode.OK, {
        accessControlAllowOrigin,
      })
    );
  }
}
