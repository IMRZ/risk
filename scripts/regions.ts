import * as fs from "fs-extra";
import * as xml2js from "xml2js";
import * as twdb from "tw-db";

function rgbToHexString({ r, g, b }) {
  function toHexString(value) {
    return ("00" + Number(value).toString(16)).slice(-2).toUpperCase();
  }
  return `${toHexString(r)}${toHexString(g)}${toHexString(b)}`;
}

async function getRegionPaths(path: string) {
  const file = fs.readFileSync(path);
  const json = await xml2js.parseStringPromise(file);

  const result = {};

  json.svg.path.reduce((accumulator, path) => {
    const { fill, d } = path.$;
    accumulator[fill] = { fill, d };
    return accumulator;
  }, result);

  json.svg.g.reduce((accumulator, g) => {
    const fill = g.$.fill;
    const paths = g.path;

    const d = paths.reduce((combinedPath, path) => {
      if (combinedPath) { combinedPath += " " }
      return combinedPath += path.$.d;
    }, "");

    accumulator[fill] = { fill, d };

    return accumulator;
  }, result); // no need to merge with existing object

  return result;
}

const allowedProvinces = [
  "wh_main_reikland",
  "wh_main_middenland",
  "wh_main_stirland",
  "wh_main_wissenland",
  "wh_main_hochland",
  "wh_main_nordland",
  "wh_main_talabecland",
  "wh_main_ostermark",
  "wh_main_ostland",
  "wh2_main_solland",
  "wh_main_averland",
  "wh2_main_the_moot",
  "wh_main_the_wasteland",
  "wh_main_eastern_sylvania",
  "wh_main_western_sylvania",
  "wh2_main_laurelorn_forest",
  "wh2_main_misty_hills"
];

export async function getRegions(path: string) {
  const regionPaths = await getRegionPaths(path);
  const wh2Db = twdb.createInstanceWarhammer2("D:\\Program Files (x86)\\Steam\\steamapps\\common\\Total War WARHAMMER II\\assembly_kit\\raw_data\\db");

  const result = Object.values(wh2Db.regions).reduce((accumulator, region) => {
    const provinceJunction = wh2Db.regionToProvinceJunctions.find(entry => entry._region === region.key && allowedProvinces.includes(entry._province));
    const regionFill = `#${rgbToHexString(region)}`;

    // this region is in allowed set of provinces
    if (provinceJunction) {
      accumulator[region.key] = {
        key: region.key,
        fill: regionFill,
        d: regionPaths[regionFill].d
      }
    }

    return accumulator;
  }, {});

  return result;
}
