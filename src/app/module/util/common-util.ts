export function removeBlanks(stringValue: string): number {
    return Number(stringValue.replace(/\s+/g, ''));
  }