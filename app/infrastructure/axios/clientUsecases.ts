import api from "@/app/config/axiosBaseUrl";
import { IFileConversionResponse } from "@/types/Conversion";
import { AxiosInstance } from "axios";

export class AxiosManager {
  private readonly api: AxiosInstance = api;
  constructor() {}

  async handleDocxtoHtml(
    fileData: { file: File; from: string; to: string , fileId:string }[]
  ): Promise<IFileConversionResponse> {
    const formdata = new FormData();
    console.log(fileData, " filedata from formdata");
    fileData.forEach((data, index) => {
      formdata.append(`files`, data.file);
      formdata.append(`from_${index}`, data.from);
      formdata.append(`to_${index}`, data.to);
      formdata.append(`fileId_${index}`,data.fileId)
    });

    const response = await api.post("/convertDocxHtml", formdata);
    return response.data as IFileConversionResponse;
  } 
}
