export const downloadFile =(blob:Blob | MediaSource,fileName:string ) => {
    try{
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      console.log('Failed to download file');
    }
};


