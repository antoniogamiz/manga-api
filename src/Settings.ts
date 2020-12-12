const env = Deno.env.toObject();

export const MANGA_URL = env.MANGA_URL || "https://manganelo.com/";
export const API_ROOT = env.API_ROOT || "";
