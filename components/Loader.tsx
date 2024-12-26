'use client'

import React , {useState} from 'react'
import MoonLoader from "react-spinners/MoonLoader";

function Loader({visible , setVisible}:{visible:boolean , setVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div style={{display:visible? "flex":"none"}} className={`fixed left-0 top-0 z-20 w-full flex justify-center items-center h-screen bg-white/30 backdrop-blur-md`}>
               <div className=' w-5/6 lg:w-3/6 h-[250px] bg-white rounded-md relative shadow-lg'>
                    <span onClick={()=>setVisible(!visible)} className='flex absolute right-2 top-2 border px-3 rounded-full cursor-pointer text-black justify-center items-center'>x</span>
                  
                  <div className='w-full  h-3/4'>
                       <div className="w-full text-center my-4">File conversion ongoing 🚀 😊 </div>
                           <div className="border-t w-full flex justify-center item-center items-center h-full">

                           <MoonLoader
                               loading={visible}
                               size={50}
                           />
                            
                           </div>

                  </div>
               </div>

    </div>
  )
}

export default Loader
