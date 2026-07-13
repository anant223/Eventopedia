const ALLOWED_PROVIDERS = ["google", "discord"];

const getAuthURL = async (provider) => {
  if (!ALLOWED_PROVIDERS.includes(provider))
    throw new Error(`Invalid provider: ${provider}`);

  return `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${provider}/auth`;
};
export { getAuthURL };
