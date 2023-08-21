import { anonymize, identify, init, shutdown } from "@fullstory/browser";
import FullStoryAPI from "../types/fullstory-api";

export default {
  anonymize,
  identify,
  init,
  shutdown,
} satisfies FullStoryAPI;
