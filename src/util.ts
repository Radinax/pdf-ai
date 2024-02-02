const EXTRACT_MD_REGEX = /\((?<url>https?:\/\/[^)]*)\)/;

export function extractCitationUrl(text: string): string | undefined {
  const match = EXTRACT_MD_REGEX.exec(text);
  if (!match) return undefined;
  return match.groups?.url;
}
