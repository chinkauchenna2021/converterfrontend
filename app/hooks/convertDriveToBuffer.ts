



export const convertDriveContentToBuffer = async (fileId: string , accessToken:string):Promise<Buffer | any> => {
      console.log(fileId , accessToken , " fron blob converter") 
  try {
      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
  
      const blob = await response.blob();
      console.log("Blob:", blob);
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };
 