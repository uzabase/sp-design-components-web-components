import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";

const TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_DESIGN_FILE_KEY;

type FigmaResponseComponent = {
  [id: string]: {
    key: string;
    name: string;
    description: string;
    remote: boolean;
    documentationLinks: any[];
  };
};
type FigmaResponseImages = {
  [id: string]: string;
};

type Icon = {
  id: string;
  name: string;
  path: string;
};

const writeFile = promisify(fs.writeFile);

async function fetchFigma(
  target: string,
  figmaFileKey: string,
  options?: string,
): Promise<any> {
  const response: any = await fetch(
    `https://api.figma.com/v1/${target}/${figmaFileKey}?${options}`,
    {
      headers: {
        "X-FIGMA-TOKEN": TOKEN,
      },
    },
  ).then((response) => response.json());
  return response;
}

async function fetchImageAndExtractPath(url: string): Promise<string> {
  const response: any = await fetch(url).then((response) => response.text());
  const match = /<svg.*?>([\s\S]*?)<\/svg>/.exec(response);
  return match[1].replace(/\sfill=".*"/, "").replace(/\n|\r/g, "");
}

const main = async () => {
  const components: FigmaResponseComponent[] = await fetchFigma(
    "files",
    FIGMA_FILE_KEY,
    "ids=5835:6407",
  ).then((response) => response.components);
  let icons: Icon[] = [];
  const ids: string[] = [];

  Object.entries(components).map(([key, value]) => {
    const name = String(value.name).toLowerCase();
    const test = /^icon\/(?!globalnavigation|sectionmessage).*/.test(
      name.replace(/\s+/g, ""),
    );
    if (test) {
      ids.push(key);
      icons.push({
        id: key,
        name: name.split("/")[1].trim().replace(/\s+/g, "_"),
        path: "",
      });
    }
  });

  const images: FigmaResponseImages[] = await fetchFigma(
    "images",
    FIGMA_FILE_KEY,
    "ids=" + ids.join() + "&format=svg",
  ).then((response) => response.images);

  await Promise.all(
    Object.entries(images).map(async ([key, value]) => {
      const path = await fetchImageAndExtractPath(String(value)); // TODO:型がよくわからん
      icons.find((icon) => icon.id === key).path = path;
    }),
  );

  icons.sort((a, b) => (a.name > b.name ? 1 : -1));

  await writeFile(
    path.resolve(__dirname, "../src/components/icon/icons.ts"),
    "// Do not edit directly\n// Generated on " +
      new Date().toUTCString() +
      "\n\n" +
      "export const speedaIconTypes = [\n" +
      icons.map((value) => '"' + value.name + '",').join("\n") +
      "\n" +
      "] as const;\n" +
      "export type SpeedaIconTypes = (typeof speedaIconTypes)[number];\n\n" +
      "export const speedaIconPaths = {\n" +
      icons.map((value) => value.name + ": '" + value.path + "',").join("\n") +
      "\n" +
      "};\n",
  );

  console.log("DONE");
};

main();
