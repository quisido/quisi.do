import { createContext } from "react";
import type FullStoryAPI from "../types/fullstory-api.js";

export default createContext<FullStoryAPI | null>(null);
