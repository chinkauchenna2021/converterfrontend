'use client'

import { createContext, ReactNode, useContext } from "react";


export const FileContext = createContext(null)


export const FileContextProvider = createContext(null)

export const UseFileContext = ({children , filePropableData}:{children:ReactNode , filePropableData:any}) =>{
    return (
        <FileContextProvider.Provider value={filePropableData} >
            {children} 
        </FileContextProvider.Provider>
    )
    
}


