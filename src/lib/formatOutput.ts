import yaml from 'js-yaml';

export type OutputFormat = 'json' | 'yaml' | 'yml';

export const toYml = (jsonString: string): string => {
  const json = JSON.parse(jsonString);
  return yaml.safeDump(json);
};

export const toJson = (jsonString: string): string => {
  const json = JSON.parse(jsonString);
  return JSON.stringify(json, null, 2);
};

export const FORMATTERS = {
  json: toJson,
  yaml: toYml,
  yml: toYml,
};

export default (jsonString: string, format: OutputFormat) => {
  const formatter = FORMATTERS[format];
  return formatter(jsonString);
};
