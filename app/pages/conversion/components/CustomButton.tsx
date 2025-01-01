import { cn } from '@/lib/utils'
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";



function checkIfLoaded(isLoading:boolean | undefined, singleFileLoading:boolean | undefined):boolean{
           if(isLoading || singleFileLoading ) return true;
            return false;   
}

function CustomButton({title,styles , isLoading, onclick, singleIsConverting, ...props}:{title:string , onclick:()=>void, styles?:string , isLoading?:boolean, singleIsConverting?:boolean}) {
      
     
  
  return (
        <button {...props} onClick={()=>onclick()}  className={cn("w-[120px]  lg:min-w-[50px] px-3 h-10 tracking-sm rounded-sm bg-black text-white border-none  text-sm ",styles)}>
              {
                (isLoading || singleIsConverting)?
            <ClipLoader
                color={'#ffffff'}
                loading={checkIfLoaded(isLoading,singleIsConverting)}
                size={18}
                aria-label="Loading Spinner"
                data-testid="loader"
              />

                :
               (title)
              }
        </button>
  )
}

export default CustomButton
