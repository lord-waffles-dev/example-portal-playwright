/**
 * Safely retrieves configuration values from nested objects
 * @param obj The configuration object to extract values from
 * @param key The primary key to access
 * @param subKey Optional secondary key for nested objects
 * @param defaultValue Default value to return if the key/subKey is not found
 * @returns The parsed numeric value or the default value
 */
export function getConfigValue<T extends object>(
  obj: T,
  key: string,
  subKey: string | null = null,
  defaultValue: number
): number {
  try {
    if (key in obj) {
      const typedKey = key as keyof T;

      if (subKey) {
        const value = (obj[typedKey] as Record<string, unknown>)?.[subKey];
        return (typeof value === 'string' || typeof value === 'number')
          ? parseInt(String(value))
          : defaultValue;
      }

      return typeof obj[typedKey] === 'string' ? parseInt(obj[typedKey] as unknown as string) : defaultValue;
    }
    return defaultValue;
  } catch (error) {
    console.warn(`Error accessing config value for ${key}${subKey ? '.' + subKey : ''}, using default:`, error, defaultValue);
    return defaultValue;
  }
}
