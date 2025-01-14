"use client";

import React from "react";
import { Select, SelectSection, SelectItem, Button } from "@nextui-org/react";
import { imageSizes } from "@/app/entities/dto/editor.data";
import { ArrowDown, ImageMinus } from "lucide-react";
import {useDropzone} from 'react-dropzone'

function EditorNavbar() {
  const {getRootProps, getInputProps} = useDropzone()

  return (
    <div className="w-full h-16 flex justify-evenly items-center mt-2 border-b border-slate-100">
      <div className=" w-2/6 h-full flex justify-center items-center">
        <div className="flex w-full justify-center items-center space-x-2">
          <span className="w-fit items-center flex justify-center mx-2 text-sm">
            Dimensions
          </span>

            {/* dimesions */}
            <Select
              className={" w-[120px]"}
              labelPlacement="inside"
              variant="bordered"
              label="790x515"
              size="sm"
            >
              {imageSizes.map((dimensions) => (
                <SelectItem key={dimensions.key}>{dimensions.label}</SelectItem>
              ))}
            </Select>
            <Button className="w-[140px] rounded-lg text-xs flex justify-center items-center" variant="bordered" size="lg" >
              <ImageMinus color="black" size={15}  className=""/>
              <span className="text-[10px] text-slate-800 font-bold ">
                REMOVE BG
              </span>
            </Button>
            </div>
      </div>
      {/* Second section */}
      <div className=" w-2/6  h-full"></div>
      {/* Third section */}
      <div className=" w-2/6 h-full">
         <div className="w-5/6 h-full flex items-center justify-end">
         <Button className="w-[120px] rounded-lg -space-x-7 text-xs p-0 m-0  -pl-4 flex justify-center items-center bg-slate-950 text-white" variant="flat" size="lg" >
              <ArrowDown color="#ffffff" size={15}  className="mr-5"/>
              <span className="font-bold ">
                Download
              </span>
            </Button>
         </div>
      </div>
    </div>
  );
}

export default EditorNavbar;
