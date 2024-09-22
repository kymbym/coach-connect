export const extractPayload = (token) => {
  const jwtArray = token.split(".");
  const payload = jwtArray[1];
  if (!payload) {
    return {};
  }
  const decodedPayload = atob(payload);
  return JSON.parse(decodedPayload);
};

export const isValidToken = (token) => token.split(".").length === 3;
