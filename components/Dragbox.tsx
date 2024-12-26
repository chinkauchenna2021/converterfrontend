import React from 'react'
import { FaFolderOpen } from "react-icons/fa6";

function Dragbox() {
  return (
    <div className='border-dashed border border-spacing-1 cursor-pointer rounded-md justify-center items-center flex border-slate-400 lg:w-100 lg:min-h-[150px]'>
          <div className='lg:w-full py-10 md:p-8 flex-col justify-center items-center space-y-3 '>
            <div className='flex justify-center'><FaFolderOpen color='' size={40} /></div>
              <div className='text-sm  text-slate-300 w-full text-center'>Drag and drop file or click to select from your device</div>

          </div>
    </div>
  )
}

export default Dragbox
