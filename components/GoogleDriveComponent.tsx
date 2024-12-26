'use client'
import React , {useState , useEffect} from 'react'
import Image from "next/image";
import useDrivePicker from 'react-google-drive-picker'
import { useSession , signIn , signOut} from 'next-auth/react'
import { convertDriveContentToBuffer } from '@/app/hooks/convertDriveToBuffer';

function GoogleDriveComponent() {

    const {data:session , status} = useSession()
    const [getAccessToken , setAccessToken] = useState("")


    useEffect(()=>{
         (async()=>{
            if(status === 'unauthenticated'){
                signIn("google")
            }
           

         })()

    },[status])


  /**
   * @description Google Drive
   */

console.log(session?.user.accessToken, status)
  // useEffect(() => {
  //   const loadPickerScript = () => {
  //     const script = document.createElement('script');
  //     script.src = 'https://apis.google.com/js/api.js';
  //     script.onload = () => initializePicker();
  //     document.body.appendChild(script);
  //   };

  //   const initializePicker = () => {
  //    (window as any)?.gapi?.load('auth', { callback: onAuthApiLoad });
  //    (window as any)?.gapi?.load('picker', { callback: onPickerApiLoad });
  //   };

  //   const onAuthApiLoad = () => {
  //     // Load the Google Auth API
  //     console.log("auth loaded" , process.env.NEXT_PUBLIC_AUTH_SECRET)
  //   };

  //   const onPickerApiLoad = () => {
  //     // Load the Google Picker API
  //     console.log("api loaded")
  //   };

  //   loadPickerScript();
  // }, []);

  // const handleGoogleDriveSelect = async () => {
  //   // const oauthToken = await getOAuthToken(); 
  //   const oauthToken = session?.user?.accessToken;
  // if (status === 'unauthenticated'){
  //       signIn('google')
  // }else{
  //   const picker = new (window as any).google.picker.PickerBuilder()
  //     .setOAuthToken(oauthToken)
  //     .setDeveloperKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY) 
  //     .addView((window as any).google.picker.ViewId.DOCS) 
  //     .setCallback((data:any) => {
  //       if (data.action === (window as any).google.picker.Action.PICKED) { 
  //         const fileId = data.docs[0].id;
  //         downloadFile(fileId, oauthToken);
  //       }
  //     })
  //     .build();
    
  //   picker.setVisible(true);
  // }
  // };



  // const downloadFile = (fileId:any, oauthToken:any) => {
  //   fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
  //     headers: {
  //       Authorization: `Bearer ${oauthToken}`
  //     }
  //   })
  //     .then(response => response.blob())
  //     .then(blob => {
  //       console.log("File Blob:", blob); // Here you can process the file blob, send it to your backend, etc.
  //     })
  //     .catch(error => console.error("Error downloading file:", error));
  // };

  // const getOAuthToken = () => {
  //   console.log("issue with auth ")
  //   return new Promise((resolve, reject) => {
  //    (window as any)?.gapi?.auth.authorize(
  //       {
  //         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  //         scope: 'https://www.googleapis.com/auth/drive.file',
  //         immediate: false,
  //       },
  //       (authResult: any) => {
  //         if (authResult && !authResult.error) {
  //           resolve(authResult.access_token);
  //         } else {
  //           reject(authResult.error);
  //         }
  //       }
  //     );
  //   });
  // };
  
 
  const [openPicker, data] = useDrivePicker();  
  const handleGoogleDrive = () => {
    openPicker({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID!,
        developerKey: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_DEVELOPER_KEY!,
        viewId: 'DOCUMENTS',
        viewMimeTypes: 'application/vnd.google-apps.spreadsheet',
        setIncludeFolders: true,
        setSelectFolderEnabled: true,
        // customViews: customView,
        // token,
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: true,
        customScopes: ['https://www.googleapis.com/auth/gmail.readonly'],
        callbackFunction: (datas) => {
            ( async()=>{
                if (datas?.action === 'cancel') {
                  console.log('User clicked cancel/close button')
                }
                    const fileId = datas?.docs[0]?.id as string;
                    await convertDriveContentToBuffer(fileId , session?.user.accessToken!);
            })()
        },
      })
  }

  useEffect(() => {
    // do anything with the selected/uploaded files
    if(data){
    //   data?.docs?.map(i => console.log(i.name))
      setAccessToken(data?.access_token)
    }
  }, [data])

  





  return (
    <span 
    //  onClick={handleGoogleDriveSelect}
    onClick={handleGoogleDrive}
      className="w-full rounded-sm px-2 flex h-14 items-center space-x-5 cursor-pointer hover:bg-slate-100">
           <Image alt="dropbox" src={'./googledrive.svg'}  height={30} width={30}   />
           <span className="text-sm text-slate-600">
               Google Drive
           </span>
     </span>

  )
}

export default GoogleDriveComponent
