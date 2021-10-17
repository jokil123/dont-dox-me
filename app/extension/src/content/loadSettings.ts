import * as storage from "./asyncChromeStorage";

export interface settings {}

export const loadSettings = async (): settings[] => {
  let storageBuckets: string[] = await storage.get("storageBuckets");
};
