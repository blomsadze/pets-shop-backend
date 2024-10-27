import DatauriParser from 'datauri/parser.js';
import { DataURI } from 'datauri/types.js';
const parser = new DatauriParser();

export const bufferToDataURI = (fileFormat: string, buffer: DataURI.Input) =>
  parser.format(fileFormat, buffer);
