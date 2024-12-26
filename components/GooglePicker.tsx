import React, { useState } from 'react';
import type { FC } from 'react';
import useDrivePicker from 'react-google-drive-picker';
import Image from 'next/image'
import { convertDriveContentToBuffer } from '@/app/hooks/convertDriveToBuffer';

const GooglePicker: FC = () => {
  const [openPicker] = useDrivePicker();
  
  const handleOpenPicker = () => {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_DEVELOPER_KEY!,
        })
        .then(() => {
          let tokenInfo = gapi.auth.getToken();
          console.log(tokenInfo)
          const pickerConfig: any = {
            clientId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID!,
            developerKey: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_DEVELOPER_KEY!,
            viewId: 'DOCS',
            viewMimeTypes: 'image/jpeg,image/png,image/gif,application/pdf,application/doc,application/docx',
            token: tokenInfo ? tokenInfo.access_token : null,
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            callbackFunction: (data:any) => {
              const elements = Array.from(
                document.getElementsByClassName(
                  'picker-dialog'
                ) as HTMLCollectionOf<HTMLElement>
              );
              for (let i = 0; i < elements.length; i++) {
                elements[i].style.zIndex = '2000';
              }
              if (data.action === 'picked') {
                //Add your desired workflow when choosing a file from the Google Picker popup
                //In this below code, I'm attempting to get the file's information. 
                if (!tokenInfo) {
                  tokenInfo = gapi.auth.getToken();
                }
                const fetchOptions = {
                  headers: {
                    Authorization: `Bearer ${tokenInfo.access_token}`,
                  },
                };
                const driveFileUrl = 'https://www.googleapis.com/drive/v3/files';
                data.docs.map(async (item:any) => {
                  const response = await fetch(
                    `${driveFileUrl}/${item.id}?alt=media`,
                    fetchOptions
                  );
                  console.log(item.id);
                 const driveBuffer = await convertDriveContentToBuffer(item.id , tokenInfo.access_token);
                 console.log(driveBuffer)
                });
              }
            },
          };
          openPicker(pickerConfig);
        });
    });
  };

  return (
    <span 
    //  onClick={handleGoogleDriveSelect}
    onClick={handleOpenPicker}
      className="w-full rounded-sm px-2 flex h-14 items-center space-x-5 cursor-pointer hover:bg-slate-100">
           <Image alt="dropbox" src={'./googledrive.svg'}  height={30} width={30}   />
           <span className="text-sm text-slate-600">
               Google Drive
           </span>
     </span>
  );
};

export default GooglePicker;