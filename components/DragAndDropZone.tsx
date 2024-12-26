import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "PNG", "GIF","JPG"];

export default function DragAndDropZone() {
  const [file, setFile] = useState<FileList>();
  const handleChange = (file:FileList) => {
    setFile(file);
  };
  return (
    <div className='border-dashed border border-spacing-1 cursor-pointer rounded-md justify-center items-center flex border-slate-400 lg:w-100 lg:min-h-[150px]'>
    <div className='lg:w-full py-10 md:p-8 flex-col justify-center items-center space-y-3 '>
    <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
        <div className='text-sm  text-slate-300 w-full text-center'>Drag and drop file or click to select from your device</div>
        <p>{file ? `File name: ${file[0]?.name}` : "no files uploaded yet"}</p>
    </div>
</div>
  );
}
