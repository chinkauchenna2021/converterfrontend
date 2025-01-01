import {fileConversionPaths} from '../entities/dto/fileConversionPaths';

type ConversionPath = { from: string; to: string };

/**
 * Checks if a given file conversion path is valid.
 *
 * @param from - The source file extension.
 * @param to - The target file extension.
 * @returns True if the conversion path exists, otherwise false.
 */
export const isConversionPathValid = (from: string, to: string): boolean => {
  const paths: ConversionPath[] = fileConversionPaths.paths;

  return paths.some((path) => path.from === from && path.to === to);
};
