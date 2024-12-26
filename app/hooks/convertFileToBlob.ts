export const convertFileToBlob = (file:File, fileType:string)=> URL. createObjectURL(new Blob([file],{type: fileType}))







export const convertBufferToBlob = (fileBuffer:Buffer, fileType:string)=>{
    return bufferToBlob(fileBuffer , fileType);
}



function bufferToBlob(buffer: Buffer , fileType:string): Blob {
    const uint8Array = new Uint8Array(buffer);
    return new Blob([uint8Array], { type: fileType });
  }