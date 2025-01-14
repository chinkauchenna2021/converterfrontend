import { create } from "zustand";
type OperationProps =
  | "resize"
  | "rotate"
  | "crop"
  | "grayscale"
  | "flip"
  | "flop"
  | "blur"
  | "sharpen"
  | "brightness"
  | "contrast"
  | "saturation"
  | "border"
  | "text"
  | "watermark"
  | "zoom";

  export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    file: File;
    operation?: OperationProps;
    width?: number;
    height?: number;
    angle?: number;
    format?: string;
    text?: string;
    overlay?: string;
    brightness?: number;
    contrast?: number;
    rotate?: number;
    saturate?: number,
    blur?:number;
    x?: number;
    y?: number;
    scaleX?: number;
    scaleY?: number;
    zoom?:number | number[];
  }
interface FilesStore {
  file: UploadedFile;
  addEditorFile: (file: File) => void;
  deleteEditorFiles: () => void;
  updateFileAttribute: <K extends keyof UploadedFile>(key: K, value: UploadedFile[K]) => void;
  getFileAttribute: <K extends keyof UploadedFile>(key: K) => UploadedFile[K];
  mergeAttributes: (attributes: Partial<UploadedFile>) => void;
}

export const useFileEditorStore = create<FilesStore>((set, get) => ({
  file: {
    id: "0",
    name: "",
    size: 0,
    type: "",
    file: {} as File,
    brightness: 100,
    contrast: 100,
    blur: 0,
    saturate: 100,
    scaleX:1,
    scaleY:1,
  },

  addEditorFile: (file) =>
    set({
      file: {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      },
    }),

  deleteEditorFiles: () =>
    set({
      file: {
        id: "",
        name: "",
        size: 0,
        type: "",
        file: {} as File,
        brightness: 100,
        contrast: 100,
        blur: 0,
        saturate: 100,
        scaleX:1,
        scaleY:1
      },
    }),


  updateFileAttribute: (key, value) =>
    set((state) => ({
      file: {
        ...state.file,
        [key]: value,
      },
    })),

  getFileAttribute: (key) => get().file[key],

  mergeAttributes: (attributes) =>
    set((state) => ({
      file: {
        ...state.file,
        ...attributes,
      },
    })),
}));
