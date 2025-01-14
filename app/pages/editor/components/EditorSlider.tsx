'use client'

import React from 'react'
import {Slider} from "@nextui-org/react";
import { useFileEditorStore } from '@/app/infrastructure/zustand/useFileEditorStore';

type EditorProps = {
    label:string;
    defaultValue?:number | number[];
    step?:number;
    color?:"foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    minValue?:number;
    maxValue?:number;
    isDoubleRange?:boolean;
    doubleDefaultValue?:number[]
    // setRotate: React.Dispatch<React.SetStateAction<number>>;
    setOnChange:(data:number | number[])=>void;
}

function EditorSlider({label , defaultValue , step , color ,minValue, maxValue , isDoubleRange,setOnChange}:EditorProps) {
  return (
        
            <Slider
              className="max-w-md"
              color={color ?? "foreground"}
              defaultValue={defaultValue!! ?? 10}
              label={label}
              size="sm"
              step={step!! ?? 10}
              maxValue={maxValue}
              minValue={minValue}
              onChange={setOnChange}
            />
  );

}

export default EditorSlider
