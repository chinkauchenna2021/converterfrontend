"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Ruler from "@scena/ruler";
import { CropIcon, EllipsisVertical, Fullscreen, Images } from "lucide-react";
import { Button, Image } from "@nextui-org/react";
import { ImagePicker } from "@abak/react-image-picker";
import { CustomEmptyPopover } from "../conversion/ActiveConversion";
import Dropzone, { useDropzone } from "react-dropzone";
import { handleImageChange } from "@/lib/convertFileUrl";
import EditorSlider from "./components/EditorSlider";
import  Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import EditorCropper from "./components/EditorCropper";
import { useFilesStore } from "@/app/infrastructure/zustand/useFilesStore";
import { useFileEditorStore } from "@/app/infrastructure/zustand/useFileEditorStore";
import { truncateSync } from "fs";

export function MainPanel() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [getImage , setImage] = useState<HTMLImageElement>()
  const imageRef = useRef<HTMLImageElement>(null)
  const uploadFiles = useFileEditorStore((state)=>state.addEditorFile)

  useEffect(()=>{
    if(imageRef.current == undefined)return;
  setImage(imageRef.current);
   const cropper =  new Cropper(imageRef?.current,{
      ready(event: Cropper.ReadyEvent<HTMLImageElement>){
      },
      crop(event){
               
      }
    })


  },[imageRef.current, setImage])

const handleDropFile = (acceptedFiles:File[])=>{
  setSelectedFiles(acceptedFiles);
  uploadFiles(acceptedFiles[0])

}


  return (
    <div className="w-full col-span-4 h-screen flex ">
      <div className="w-full h-5/6 pb-10 flex justify-center mt-4">
        <div className="w-[650px] h-4/5 ">

            {selectedFiles.length > 0 ? (
                 <EditorCropper
                 imageSrc={handleImageChange(selectedFiles) as string}
                 onCrop={(canvasUrl , cropData) =>undefined}
                 onSave={(imageUrl)=>undefined}
                 setSelectedFile={setSelectedFiles}
               />
            ) : (
              <div
              className="w-full h-full border-2 overflow-hidden flex justify-center items-center rounded-md border-dashed border-slate-200 hover:border-slate-300 cursor-pointer"
            >
              <Dropzone
                maxFiles={1}
                onDrop={handleDropFile}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="w-full h-full flex justify-center items-center">
                    <div
                      {...getRootProps()}
                      className="w-full h-full flex justify-center items-center"
                    >
                      <input {...getInputProps()} className="w-full h-full" />
                      <div className="flex flex-col justify-center items-center space-y-2">
                        <Images size={40} color={"silver"} />
                        <span className="text-md text-slate-400">
                          Select image or drag and drop image 👨‍👧‍👦 🚚 🚲 🗄 💖
                        </span>
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export function SideBar() {
   const updateEditorFile = useFileEditorStore((state)=>state.updateFileAttribute)


  return (
    <div className="w-full col-span-1 border-l border-slate-100 h-screen flex flex-col px-4 pt-8 space-y-4">
      <div className="w-full h-14 flex items-center  text-slate-800 text-md tracking-wider">Settings</div>
       <EditorSlider  label={'Contrast'} setOnChange={(data)=>updateEditorFile("contrast", data as unknown as number)}  />
       <EditorSlider   label={'Rotate'} maxValue={360} step={90} setOnChange={(data)=>updateEditorFile("rotate", data as unknown as number)}  />
       <EditorSlider   label={'ScaleX'}  defaultValue={1} maxValue={100} setOnChange={(data)=>updateEditorFile("scaleX", data as unknown as number)}  />
       <EditorSlider   label={'ScaleY'}  defaultValue={1} maxValue={100} setOnChange={(data)=>updateEditorFile("scaleY", data as unknown as number)}  />
       <EditorSlider   label={'Zoom-in'}  defaultValue={-0.1} minValue={-0.001} maxValue={-0.1} setOnChange={(data)=>updateEditorFile("zoom", data as unknown as number)} />
       <EditorSlider   label={'Zoom-out'}  defaultValue={0.1} minValue={0.1} maxValue={100} setOnChange={(data)=>updateEditorFile("zoom", data as unknown as number)} step={0.1} />
      
       {/* <EditorSlider   label={'ScaleX & ScaleY'}  defaultValue={[40,100]} setOnChange={(data)=>updateEditorFile("brightness", data as unknown as number)}  isDoubleRange={true} /> */}
    </div>
  );
}

function Editor() {
  return (
    <div className="max-w-full min-h-screen grid grid-cols-5">
      <MainPanel />
      <SideBar />
    </div>
  );
}

export default Editor;
