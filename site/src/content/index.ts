import generated from "./generated.json";
import type { GeneratedContent } from "./types";

export const content = generated as unknown as GeneratedContent;

export const { icons, meta, counts } = content;

export * from "./types";
