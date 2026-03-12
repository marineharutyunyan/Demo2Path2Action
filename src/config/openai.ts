export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY ?? "",
  model: "gpt-3.5-turbo",
  maxTokens: 500,
  isConfigured: Boolean(import.meta.env.VITE_OPENAI_API_KEY),
};
export const MAPBOX_CONFIG = {
  publicToken: import.meta.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "",
};