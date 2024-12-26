import React from "react";
import { IFileOptions } from "../app/entities/fileTypes";

function FileOptionsInput({ fileType , setSelectedFile }: { fileType: IFileOptions[] , setSelectedFile:React.Dispatch<React.SetStateAction<{fileName:string; fileType:string}>> }) {


  const getFileFormat = (mainFileType:string , subFileFormat:string)=>{
          setSelectedFile({fileName:mainFileType , fileType:subFileFormat})
  }
  return (
    <div className="w-full h-full px-4">
      {fileType.map((item, index) => {
        return (
          <div key={index}>
          <hr className="" />
            <div className="text-lg space-y-2 text-center py-2 font-bold capitalize">{item.type}</div>
            <hr className="" />
            {item.data.map((filetypes, fileIndex) => {
              return (
                <div key={fileIndex}>
                    <div onClick={()=>getFileFormat(item.type , filetypes)} className="text-sm my-1 py-2 flex justify-center items-center  cursor-pointer " >{filetypes}</div>
                </div>
              )
            })}
          </div>
        );
      })}
    </div>
  );
}

export default FileOptionsInput;
