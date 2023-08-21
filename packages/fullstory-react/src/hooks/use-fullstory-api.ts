import { useContext } from "react";
import FULLSTORY_BROWSER_API from '../constants/fullstory-browser-api';
import FullStoryAPIContext from '../contexts/fullstory-api';
import type FullStoryAPIType from "../types/fullstory-api";

export default function useFullStoryAPI(): FullStoryAPIType {
  return useContext(FullStoryAPIContext) ?? FULLSTORY_BROWSER_API;
}
