// pages/index.tsx
import React from 'react';
import FileUploader from '@/components/fileDropZone/FileUploader';
import { useFilesStore } from '@/app/infrastructure/zustand/useFilesStore';

const FileDropZone: React.FC = () => {
  const addFile = useFilesStore((state) => state.addFile);
  const filesStore = useFilesStore((state)=>state.files)
  const handleFilesSelected = async (files: File[]) => {
    files.forEach((file)=>{
     addFile(file);
     console.log(file)
    })
  };

  console.log(JSON.stringify(filesStore) , " this is from file store")
  return (
    <div className="h-fit flex flex-col  justify-center w-full ">
      <FileUploader onFilesSelected={handleFilesSelected} />
    </div>
  );
};

export default FileDropZone;
