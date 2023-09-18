import { useContext } from "react";
import FULLSTORY_BROWSER_API from '../constants/fullstory-browser-api.js';
import FullStoryAPIContext from '../contexts/fullstory-api.js';
import type FullStoryAPIType from "../types/fullstory-api.js";

export default function useFullStoryAPI(): FullStoryAPIType {
  return useContext(FullStoryAPIContext) ?? FULLSTORY_BROWSER_API;
}
