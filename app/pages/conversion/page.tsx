"use client";
import Image from "next/image";
import Loader from "@/components/Loader";
import React, { useState, useRef, useEffect } from "react";
import SelectOptionModal from "@/components/SelectOptionModal";
import { UseFileContext } from "@/utils/context/FileContext";
import { ClientReactQuery } from "../../infrastructure/react-query/clientReactQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession, signIn, signOut } from "next-auth/react";
import useDrivePicker from "react-google-drive-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dragbox from "@/components/Dragbox";
import { Button } from "@/components/ui/button";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DropBoxComponent from "@/components/DropBoxComponent";
import GoogleDriveComponent from "@/components/GoogleDriveComponent";
import GooglePicker from "@/components/GooglePicker";
import DragAndDropZone from "@/components/DragAndDropZone";
import FileDropZone from "@/components/fileDropZone";
import { Rotate, SlideInLeft, SlideOutRight } from "react-animated-components";

export function ExternalSourceButton() {
  return (
    <div className="w-full  flex justify-center items-center">
      <div className="lg:w-[50vw] space-y-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"secondary"}
              className="bg-black text-white hover:text-black"
            >
              <span>✨ More Document import sources</span>
              <span className="flex-col -space-y-2">
                <RiArrowDropUpLine />
                <RiArrowDropDownLine />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="w-full">
              <div className="w-full space-y-2 mb-2">
                <h4 className="font-semibold text-sm">More Document Sources</h4>
                <hr />
              </div>
              <div className="w-full">
                <DropBoxComponent />
                <hr />

                {/* <GoogleDriveComponent /> */}
                <GooglePicker />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default function Conversion() {
  const [getToken, setToken] = useState("");
  const { data: session, status } = useSession();

  return (
    <div className="w-100  flex justify-center items-center -mt-10">
        <SlideInLeft durationMs={300}>
           <div className="lg:w-[50vw] space-y-2">
          <ExternalSourceButton />
          <div className="w-full">
            <FileDropZone />
          </div>
            </div>
        </SlideInLeft>
    </div>
  );
}

// export default function Home() {
//   const [showFrom , setShowFrom] = useState(false)
//   const [showTo , setShowTo] = useState(false)
//   const clientQuery = new ClientReactQuery
//   const [getFileConversionMetadata , setFileConversionMetadata] = useState<File | any>()
//    const fileInputRef  = useRef<HTMLInputElement | null>(null)
//    const [getSelectedFileTypeFrom,setSelectedFileTypeFrom] = useState({fileName:"", fileType:""})
//    const [getSelectedFileTypeTo,setSelectedFileTypeTo] = useState({fileName:"", fileType:""})
//      const {mutate , isError , isPending , isSuccess }  =   clientQuery.convertDocsToHtml()

// const convertDocx2HtmlWithmammoth = ()=>{
//   if(!getFileConversionMetadata || !getSelectedFileTypeFrom.fileType || !getSelectedFileTypeTo.fileType) return ;
//     mutate({file:getFileConversionMetadata , from:getSelectedFileTypeFrom.fileType,to:getSelectedFileTypeTo.fileType})
//       console.log( isError , isPending , isSuccess)
//     }

//   return (

//     //  <UseFileContext filePropableData={""}>
//     <div className=" w-full h-screen flex justify-center p-4">
//     <SelectOptionModal setSelectedFileType={setSelectedFileTypeFrom} visible={showFrom}  setVisible={setShowFrom} modalType="from" />
//     <SelectOptionModal setSelectedFileType={setSelectedFileTypeTo} visible={showTo}  setVisible={setShowTo} modalType="To" />
//              <div className="w-full   lg:w-4/6 border border-slate-200 h-[420px] mx-auto">
//                 <div className="text-lg h-14 flex items-center px-5" >
//                     Convert All Files 🚀 🗄 📁 📂
//                 </div>
//                 <hr />
//                 <div className="w-full h-full space-y-3 py-6 px-4">
//                  <div className="w-full ">
//                   <label className="text-sm">From </label>
//                         <input   onClick={()=>setShowFrom(true)}
//                          readOnly={true}
//                          value={getSelectedFileTypeFrom.fileType}
//                          placeholder="Select File original Format"
//                         //  onChange={(e)=>setFileConversionMetadata((prev)=>({...prev, from:e.target.value}))}
//                           className="border w-full h-7 text-xs px-2" />
//                           {/* <option className="!text-sm">Select File Extension</option> */}

//                  </div>

//                  <div className="w-full mb-5">
//                   <label className="text-sm">To </label>
//                         <input
//                          onClick={()=>setShowTo(true)}
//                          readOnly={true}
//                          value={getSelectedFileTypeTo.fileType}
//                          placeholder="Select File conversion Format"
//                         className="border w-full h-7 text-xs   px-2" />

//                  </div>
//               <div className="w-full h-[140px] relative cursor-pointer flex justify-center items-center  mx-auto  border-2 border-dotted border-spacing-2 border-silver-200">
//                   <input ref={fileInputRef}
//                   //@ts-ignore
//                      onChange={(e)=>setFileConversionMetadata(e.target.files[0] as unknown as File)}
//                      type="file"  className="absolute h-full  w-full" style={{appearance:"none" , opacity:0}} />
//                    <div className="w-fit text-sm text-slate-300">
//                     {
//                       !!getFileConversionMetadata? getFileConversionMetadata?.name  :" Clicking is functional for now. No dragging"
//                     }

//                    </div>

//               </div>

//               <div className="flex w-full">
//                      <button onClick={()=>convertDocx2HtmlWithmammoth()}  className="w-20 h-12 rounded-md hover:bg-white border hover:text-black bg-black text-white ">
//                           convert
//                      </button>
//               </div>
//                 </div>

//              </div>

//     </div>
//     //  </UseFileContext>
//   );
// }
