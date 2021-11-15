export function removeBlanks(stringValue: string): number {
    return Number(stringValue.replace(/\s+/g, ''));
  }

  // Convert bytes array and print resulting pdf file in a new tab from the browser.
export function printPdfFile(bytes) {
  window.open(URL.createObjectURL(new Blob([bytes], {type: 'application/pdf'})), '_blank');
}