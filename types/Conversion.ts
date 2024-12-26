export type IConversion ={
    fileId: string;
    fromFormat: string;
    toFormat: string;
}



export type IFileUploadResponse = {
      buffer: {
        type: string;
        data: number[];
      };
      encoding: string; 
      fieldname: string;
      mimetype: string; 
      originalname: string;
      size: number;
    };



export type IDocumentUploadResponse = {
    conversionTime: number | null; 
    createdAt: string; 
    fileContent: {
      type: string; 
      data: number[]; 
    };
    fileName: string;
    fileSize: number; 
    fromFormat: string; 
    id: string; 
    status:'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    toFormat: string;
    updatedAt: string;
    userId: string;
  };
  


  export type IFileConversionResponse = {
    documentUploadResponse: IDocumentResponse;
    from?: string;
    to?:string;
    message: string;
    responseDocument:IDocumentResponse[]
  }



  export type IDocumentResponse = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    fileContent: {
        type: string; 
        data: number[]; 
      };
    fileName: string;
    fileSize: number;
    fromFormat: string;
    toFormat: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    conversionIndex: string | null;
    conversionTime: Date | null;
}
  