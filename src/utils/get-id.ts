/**
 * return a random id
 */
export const getId = (): string => {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).substring(2);
  }
};
