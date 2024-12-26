import { useMutation , useQueryClient } from "@tanstack/react-query";
import { AxiosManager } from "../axios/clientUsecases";


export class ClientReactQuery {
      public docxtoHtml:AxiosManager;
    constructor(){
        this.docxtoHtml =  new AxiosManager()
    }

        convertDocsToHtml(){  
        const {mutate , isPending , isError , isSuccess , data} =  useMutation({
          mutationKey:['docx_to_html'],
          mutationFn:async (filedata:{file:File , from:string,to:string,fileId:string}[] )=> await this.docxtoHtml.handleDocxtoHtml(filedata),
          // mutationFn:async ({file,from ,to}:{file:File , from:string,to:string})=> await this.docxtoHtml.handleDocxtoHtml(file,from , to),
        })
        return {mutate , isPending , isError , isSuccess , data} ;
 }


}










export const convertWithQuery = new ClientReactQuery()


export const manageRequest = {

}