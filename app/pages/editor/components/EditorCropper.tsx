'use client'

import React, { useEffect, useMemo, useRef, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { Button } from "@nextui-org/react";
import { CustomEmptyPopover } from "../../conversion/ActiveConversion";
import { CropIcon, EllipsisVertical, FileStack, Fullscreen } from "lucide-react";

import ModalImage from "react-modal-image";
import { useFileEditorStore } from "@/app/infrastructure/zustand/useFileEditorStore";

{/* <ModalImage
  small={urlToTinyImageFile}
  large={urlToHugeImageFile}
  alt="Hello World!"
/>; */}




type CropperProps = {
  imageSrc: string; // Source of the image to crop
  onCrop: (croppedImage: string, croppedData: ICropData) => void; // Callback to return cropped image as base64
  onSave: (editedImage: string) => void;
  setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>;
};

type ICropData = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
};

const EditorCropper: React.FC<CropperProps> = ({
  imageSrc,
  onCrop,
  onSave,
  setSelectedFile,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [isCropBoxActive, setIsCropBoxActive] = useState<boolean>(true);
  const fileStore = useFileEditorStore((state)=>state.file);
  const updatefileStore = useFileEditorStore((state)=>state.updateFileAttribute);
  const getFileEditorState = useFileEditorStore((state)=>state.file)
  



  const [filterStyles, setFilterStyles] = useState({
    brightness: 100,
    contrast: 100,
    blur: 0,
    saturate: 100,
    grayscale: 0,
  });

  useEffect(() => {
    if (imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: NaN,
        autoCrop: isCropBoxActive,
        viewMode: 1,
        scalable: true,
        zoomable: true,
        rotatable: true,
        cropBoxResizable: true,
        cropBoxMovable: true,
        ready: () => {
          if (cropperRef.current) {
            const canvasData = cropperRef.current.getCanvasData();
            cropperRef.current.crop();
            cropperRef.current.setCropBoxData({
              left: canvasData.left,
              top: canvasData.top,
              width: canvasData.width,
              height: canvasData.height,
            });
          }
        },
        crop: () => {
          if (cropperRef.current) {
            const canvasUrl = cropperRef.current.getCroppedCanvas().toDataURL();
            const cropData = cropperRef.current.getData(); // Get crop box data

            onCrop(canvasUrl, cropData);
          }
        },
      });
    }

    return () => {
      cropperRef.current?.destroy();
    };
    }, [imageSrc, onCrop]);

  const toggleCropBox = () => {
    if (!cropperRef.current) return;

    if (isCropBoxActive) {
      cropperRef.current.clear();
    } else {
      cropperRef.current.crop();
    }
    setIsCropBoxActive(!isCropBoxActive);
  };



useEffect(()=>{
    if (!cropperRef.current) return;
     if(getFileEditorState.rotate!!){
        cropperRef.current.rotate(getFileEditorState.rotate || 0);

    }
    
    // switch (getFileEditorState.) {
    //     case "rotate":
    //       cropperRef.current.rotate(value || 0);
    //     break;
    //   case "flip":
    //     const data = cropperRef.current.getData();
    //     const scaleX = value === 1 ? -data.scaleX : data.scaleX;
    //     const scaleY = value === 2 ? -data.scaleY : data.scaleY;
    //     cropperRef.current.scale(scaleX, scaleY);
    //     break;
    //   case "zoom":
    //     cropperRef.current.zoom(value || 0);
    //     break;
    //   case "reset":
    //     cropperRef.current.reset();
    //     setFilterStyles({
    //       brightness: 100,
    //       contrast: 100,
    //       blur: 0,
    //       saturate: 100,
    //     });
    //     applyFilterStyles();
    //     break;
    // }
},[cropperRef.current , getFileEditorState.rotate])

























































//   const handleAction = (
//     action: "rotate" | "flip" | "zoom" | "reset",
//     value?: number
//   ) => {
//     if (!cropperRef.current) return;

//     switch (action) {
//       case "rotate":
//         cropperRef.current.rotate(value || 0);
//         break;
//       case "flip":
//         const data = cropperRef.current.getData();
//         const scaleX = value === 1 ? -data.scaleX : data.scaleX;
//         const scaleY = value === 2 ? -data.scaleY : data.scaleY;
//         cropperRef.current.scale(scaleX, scaleY);
//         break;
//       case "zoom":
//         cropperRef.current.zoom(value || 0);
//         break;
//       case "reset":
//         cropperRef.current.reset();
//         setFilterStyles({
//           brightness: 100,
//           contrast: 100,
//           blur: 0,
//           saturate: 100,
//         });
//         applyFilterStyles();
//         break;
//     }
//   };

// useEffect(() => {
//     if (cropperRef.current) {
//       const canvas = cropperRef.current.getCroppedCanvas();
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.filter = `
//           brightness(${filterStyles.brightness}%) 
//           contrast(${filterStyles.contrast}%) 
//           blur(${filterStyles.blur}px) 
//           saturate(${filterStyles.saturate}%)
//         `;
//         ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
//       }

//       const editedImage = canvas.toDataURL("image/jpeg");
//       onSave(editedImage);
//     }
//   },[cropperRef.current]);




const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterStyles((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const getFilterStyle = () => {
    return `
      brightness(10%)
      contrast(${filterStyles.contrast}%)
      blur(${filterStyles.blur}px)
      saturate(${filterStyles.saturate}%)
      grayscale(${filterStyles.grayscale}%)
    `;
  };


  useEffect(()=>{
    if(imageRef.current!!){
        imageRef.current.style.cssText = `filter:${getFilterStyle()}`
    }


  },[imageRef.current])



  return (
    <div className="w-[650px] h-5/6 ">
      <div className="w-full flex justify-between items-center h-10 ">
        <span className="text-xs text-slate-600 tracking-wide">
          {/* Image Name */}
        </span>
        <div className="w-fit h-fit">
          <CustomEmptyPopover
            triggerButton={
              <EllipsisVertical
                color={"gray"}
                className="cursor-pointer hover:text-slate-700"
                size={17}
              />
            }
          >
            <Button
              variant="solid"
              size="md"
              className="text-sm w-full bg-slate-950 text-white cursor-pointer"
              onClick={() => setSelectedFile([])}
            >
              Delete
            </Button>
          </CustomEmptyPopover>
        </div>
      </div>
      <div className="w-full h-full border-2 overflow-hidden flex justify-center items-center rounded-md border-dashed border-slate-200 hover:border-slate-300 cursor-pointer">
        <div className="w-full h-full flex justify-center items-center">
          <div className="relative w-full h-full">
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Image Editor"
              className="w-full my-10 filter"
            />
          </div>
        </div>
      </div>
      <div className="space-x-2 h-20 w-full flex justify-center items-center">
        <Button
          className={`w-[100px] rounded-lg text-xs flex justify-center items-center ${isCropBoxActive? "bg-black text-white" : ""}`}
          variant="solid"
          size="md"
          onClick={toggleCropBox}
        >
          <CropIcon color={`${isCropBoxActive? "white" : "black"}`} size={15} className="" />
          <span className={`text-[10px] font-bold  ${isCropBoxActive? "text-white" : "text-black"}`}>CROP</span>
        </Button>
        <Button
          className="w-[120px] rounded-lg text-xs p-0 m-0 flex justify-center items-center"
          variant="bordered"
          size="md"
        >
          <Fullscreen color="black" size={15} className="" />
          <span className="text-[10px] text-slate-800 font-bold ">
            FULLSCREEN
          </span>
        </Button>
      </div>
    </div>
  );
};

export default EditorCropper;
