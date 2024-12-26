/**
 * Converts a file size from bytes to megabytes.
 * @param fileSizeInBytes - The size of the file in bytes.
 * @returns The size of the file in megabytes, rounded to 2 decimal places.
 */
export function convertBytesToMegabytes(fileSizeInBytes: number): number {
    const bytesInOneMegabyte = 1024 * 1024; // 1 MB = 1024 KB * 1024 bytes
    return parseFloat((fileSizeInBytes / bytesInOneMegabyte).toFixed(2));
  }
