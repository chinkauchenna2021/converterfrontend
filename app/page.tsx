"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Conversion from "./pages/conversion";
import ActiveConversion from "./pages/conversion/ActiveConversion";
import { useFilesStore } from "./infrastructure/zustand/useFilesStore";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Rotate , SlideInLeft, SlideInUp, SlideOutRight } from 'react-animated-components'

export default function Page() {
  const files = useFilesStore((state) => state.files);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <div className="w-100  flex justify-center items-center  mt-20 px-1">
      {files.length <= 0 ? 
         <Conversion /> 
      :
         <ActiveConversion />  
      }
    </div>
    </QueryClientProvider>
  );
}
