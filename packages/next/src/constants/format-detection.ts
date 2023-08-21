import type { FormatDetection } from "next/dist/lib/metadata/types/extra-types";

const FORMAT_DETECTION: FormatDetection = {
  address: false,
  date: true,
  email: false,
  telephone: false,
  url: false,
};

export default FORMAT_DETECTION;
