'use client'
import React , {useState , useEffect} from 'react'
import Image from "next/image";

function DropBoxComponent() {
    useEffect(() => {
        // Load the Dropbox Chooser SDK
        const script = document.createElement('script');
        script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
        script.id = 'dropboxjs';
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute('data-app-key', process.env.NEXT_PUBLIC_GOOGLEDROPBOX_API_KEY as string); // Use an environment variable for security
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
    
    
    
      const handleDropboxChoose = () => {
       (window as any)?.Dropbox.choose({
          success: (files: any[]) => {
            console.log('Selected files:', files);
            files.forEach(file => {
              fetch(file.link)
                .then(response =>  response.blob())
                .then((blob:Blob) => {
                  // Implement file conversion or further processing here
                  (async()=>{
                   const file =  await blob.arrayBuffer();
                   const buffer = Buffer.from(file)
                   console.log(buffer)
                  })()
                })
                .catch(error => console.error('Error fetching file:', error));
            });
          },
          linkType: 'direct',
          multiselect: false,
          extensions: ['.pdf', '.docx'], // Adjust based on the file types you want to support
        });
      };
    
    
    
    
  return (
    <span onClick={handleDropboxChoose} className="w-full rounded-sm px-2 flex h-14 items-center space-x-5 cursor-pointer hover:bg-slate-100">
    <Image alt="dropbox" src={'./dropbox.svg'}  height={30} width={30}    />
    <span className="text-sm text-slate-600">
        Dropbox
    </span>
</span>
  )
}

export default DropBoxComponent
