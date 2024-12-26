'use client'

import React , {useState} from 'react'
import FileOptionsInput from './FileOptionsInput'
import { fileTypes } from '../app/entities/fileTypes'

function SelectOptionModal({visible , setVisible , modalType , setSelectedFileType}:{visible:boolean , setVisible: React.Dispatch<React.SetStateAction<boolean>> , modalType:string , setSelectedFileType:React.Dispatch<React.SetStateAction<{fileName:string; fileType:string}>>}) {
  return (
    <div style={{display:visible? "flex":"none"}} className={`fixed left-0 top-0 z-50 w-full flex justify-center items-center h-screen bg-white/30 backdrop-blur-md`}>
               <div className=' w-5/6 lg:w-2/6 h-[250px] overflow-y-hidden bg-white rounded-md relative shadow-lg'>
                    <span onClick={()=>setVisible(!visible)} className='flex absolute right-2 top-2 border px-3 rounded-full cursor-pointer text-black justify-center items-center'>x</span>
                  
                  <div className='w-full  h-3/4'>
                       <div className="overflow-y-auto w-full text-center my-4 py-4">File conversion types  <span className=' mx-2 text-lg font-bold'>{modalType}</span>🚀 😊 </div>
                           <div  className=" overflow-y-auto border-t w-full flex justify-center item-center items-center h-full">
                               <FileOptionsInput fileType={fileTypes}  setSelectedFile={setSelectedFileType}  />   
                           </div>

                  </div>
               </div>

    </div>
  )
}

export default SelectOptionModal
