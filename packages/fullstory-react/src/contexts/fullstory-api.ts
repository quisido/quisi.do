import { createContext } from "react";
import type FullStoryAPI from "../types/fullstory-api";

export default createContext<FullStoryAPI | null>(null);
