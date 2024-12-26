import { create } from 'zustand';

interface Conversion {
  fileId: string;
  fromFormat: string;
  toFormat: string;
  file:File;
}

interface ConversionStore {
  conversions: Conversion[];
  setConversion: (fileId: string, fromFormat: string, toFormat: string , file:File) => void;
  clearConversions: () => void;
}

export const useConversionStore = create<ConversionStore>((set) => ({
  conversions: [],
  setConversion: (fileId, fromFormat, toFormat , file) =>
    set((state) => {
      const updated = state.conversions.filter((c) => c.fileId !== fileId);
      updated.push({ fileId, fromFormat, toFormat , file});
      return { conversions: updated };
    }),
  clearConversions: () => set({ conversions: [] }),
}));
