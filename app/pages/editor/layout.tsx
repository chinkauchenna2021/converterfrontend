import React, { ReactNode } from 'react'
import EditorNavbar from './components/EditorNavbar'

function layout({children}:{children:ReactNode}) {
  return (
    <div className='w-full'>
         <EditorNavbar  />  
         {children}
    </div>
  )
}

export default layout
