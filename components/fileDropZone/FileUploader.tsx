// components/FileUploader.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'image/*': [], // All image types
    },
  });

  return (
    <div className="flex flex-col items-center space-y-4 w-full ">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 
          ${isDragActive ? 'border-slate-500 bg-blue-50' : 'border-gray-300 bg-gray-100'}
          hover:border-slate-800 hover:bg-slate-200 shadow-lg p-4`}
      >
        <input {...getInputProps()} />
        <div className="text-center space-y-2">
          <p className="text-gray-600 font-semibold">
            {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}
          </p>
          <p className="text-gray-400 text-sm">Drag and Drop file or click to select documents 💼</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
