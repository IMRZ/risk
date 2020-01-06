import * as fs from "fs-extra";
import * as path from "path";

import { getRegions } from "./regions";

function outputJson(filePath: string, data: any) {
  fs.outputJson(path.resolve(__dirname, filePath), data, { spaces: 2 });
}

async function generateData() {
  const regionDataPath = path.resolve(__dirname, "elector_counts_small_lookup.svg");
  const regionPaths = await getRegions(regionDataPath);

  outputJson("../src/data/regions.json", regionPaths);
}

generateData();
