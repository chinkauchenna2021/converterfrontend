import { create } from "zustand";

export interface UploadedFile {
  id: string; 
  name: string; 
  size: number; 
  type: string; 
  file: File; 
}

interface FilesStore {
  files: UploadedFile[];
  addFile: (file: File) => void; 
  removeFile: (id: string) => void; 
  clearFiles: () => void; 
}

export const useFilesStore = create<FilesStore>((set) => ({
  files: [],
  addFile: (file) =>
    set((state) => ({
      files: [
        ...state.files,
        {
          id: crypto.randomUUID(), 
          name: file.name,
          size: file.size,
          type: file.type,
          file, 
        },
      ],
    })),
  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    })),
  clearFiles: () => set({ files: [] }),
}));
