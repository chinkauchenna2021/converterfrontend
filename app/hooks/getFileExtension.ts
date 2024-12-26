import { extname } from "path";

export const getFileExtension = (fileName:string)=> extname(fileName).replace(".","")