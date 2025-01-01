import React, { ReactNode, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  CardFooter,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import CustomButton from "./components/CustomButton";
import {
  ChevronDown,
  Delete,
  EllipsisVertical,
  File,
  Pen,
  Plus,
  Trash,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, Tab } from "@nextui-org/react";
import {
  fileMimeTypes,
  fileTypes,
  IFileOptions,
} from "@/app/entities/fileTypes";
import {
  UploadedFile,
  useFilesStore,
} from "../../infrastructure/zustand/useFilesStore";
import { getFileExtension } from "@/app/hooks/getFileExtension";
import { useConversionStore } from "@/app/infrastructure/zustand/useConversionStore";
import { convertBytesToMegabytes } from "@/app/hooks/convertBytesToMegabytes";
import {
  IConversion,
  IDocumentResponse,
  IFileConversionResponse,
} from "@/types/Conversion";
import { ExternalSourceButton } from ".";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@nextui-org/react";
import FileDropZone from "@/components/fileDropZone";
import { toast } from "react-toastify";
import {
  convertBufferToBlob,
  convertFileToBlob,
} from "@/app/hooks/convertFileToBlob";
import { convertWithQuery } from "@/app/infrastructure/react-query/clientReactQuery";
import { SlideInDown } from "react-animated-components";
import { downloadFile } from "@/app/hooks/downloadFile";
import { isConversionPathValid } from "@/app/hooks/isConversionPathValid";

type IUploadStatus = "idle" | "pending" | "success" | "error";

function SelectFromDeviceButtonWithModal({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="w-fit flex flex-wrap gap-3">
        <Button
          onClick={() => onOpen()}
          size="md"
          className="w-[275px] rounded-sm bg-black"
        >
          <span className=" capitalize h-fit text-white text-xs">
            📁 Add from system
          </span>
          <Plus size={16} color="#ffffff" />
        </Button>
      </div>
      <Modal
        backdrop={"blur"}
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function DeleteAllButtonWithModal({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => onOpen()}
          variant="bordered"
          className="text-sm rounded-sm font-semibold text-white mt-4 capitalize  flex justify-between items-center"
        >
          <span className=" font-semibold text-slate-700 capitalize text-sm">
            Delete All
          </span>
          <span>
            <Trash size={15} color="black" />
          </span>
        </Button>
      </div>
      <Modal
        backdrop={"blur"}
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function EditAllButtonWithModal({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => onOpen()}
          variant="shadow"
          className="text-sm rounded-sm font-semibold text-white mt-4 capitalize  flex justify-between items-center"
        >
          <span className=" font-semibold text-slate-700 capitalize text-sm">
            Edit All
          </span>
          <span>
            <Pen size={15} color="black" />
          </span>
        </Button>
      </div> */}
      <Modal
        backdrop={"blur"}
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function EditTextButtonWithModal({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div
          onClick={() => onOpen()}
          className="w-full h-10 px-4 flex items-center justify-between cursor-pointer  bg-slate-100 py-2 rounded-sm"
        >
          <span className="w-fit h-fit text-gray-600 font-semibold tracking-wide text-xs">
            Edit Name
          </span>
          <Pen color="black" size={16} />
        </div>
      </div>
      <Modal
        backdrop={"blur"}
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function DeleteAllButtonWithDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="bordered"
          className="text-sm rounded-sm font-semibold text-white mt-4 capitalize  flex justify-between items-center"
        >
          <span className=" font-semibold text-slate-700 capitalize text-sm">
            Delete All
          </span>
          <span>
            <Trash size={15} color="black" />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteButtonWithDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="w-fit h-fit text-gray-600 font-semibold tracking-wide text-xs">
          Delete
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function GetFileFromOtherSources({ children }: { children: ReactNode }) {
  return (
    <Card className="w-full  lg:w-4/6 min-h-20 rounded-small bg-[url('/pattern.png')] bg-center bg-cover ">
      <CardBody className="backdrop-blur-sm bg-white/30 h-full w-full flex justify-between items-center">
        <div className="flex flex-col lg:flex-row w-full h-full justify-center  space-y-1 lg:justify-around items-center">
          <span className="w-full lg:w-2/6 h-fit">
            {" "}
            <ExternalSourceButton />{" "}
          </span>
          <SelectFromDeviceButtonWithModal title={"Select From Device"}>
            <FileDropZone />
          </SelectFromDeviceButtonWithModal>
        </div>
      </CardBody>
    </Card>
  );
}

function DisplayTabs({
  filedata,
  section,
  onclick,
  singleFile,
}: {
  filedata: IFileOptions[];
  section: string;
  onclick: (
    fileId: string,
    fromFormat: string,
    toFormat: string,
    file: File
  ) => void;
  singleFile: UploadedFile;
}) {
  const fileReturnData = filedata.filter((item) => item.type == section);
  const fileOptionData = fileReturnData[0].data;
  return fileOptionData?.map((item, index) => {
    return (
      <FileFormatPiles
        key={index}
        onclick={onclick}
        title={item}
        singleFile={singleFile}
      />
    );
  });
}

function FileFormatPiles({
  title,
  onclick,
  singleFile,
}: {
  title: string;
  onclick: (
    fileId: string,
    fromFormat: string,
    toFormat: string,
    file: File
  ) => void;
  singleFile: UploadedFile;
}) {
  return (
    <div
      onClick={() =>
        onclick(
          singleFile.id,
          getFileExtension(singleFile.name),
          title,
          singleFile.file
        )
      }
      className="w-12 h-8 rounded-sm cursor-pointer bg-black text-white tracking-wide text-xs flex items-center justify-center"
    >
      {title}
    </div>
  );
}

function CustomPopover({
  children,
  setGetFormat,
  singleFile,
}: {
  children: ReactNode;
  setGetFormat: (
    fileId: string,
    fromFormat: string,
    toFormat: string,
    file: File
  ) => void;
  singleFile: UploadedFile;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="max-w-full flex  flex-col items-center justify-center h-full  ">
          <Tabs size={"sm"} variant="underlined" aria-label="Tabs sizes">
            <Tab key="documents" title="Documents">
              <div className="max-h-[120px] w-full pb-4 overflow-y-auto overflow-x-hidden scrollbar-thin">
                <div className="min-h-[100px] w-full flex flex-wrap justify-center gap-1 p-2 ">
                  <DisplayTabs
                    singleFile={singleFile}
                    onclick={setGetFormat}
                    filedata={fileTypes}
                    section="documents"
                  />
                </div>
              </div>
            </Tab>
            <Tab key="images" title="Images">
              <div className="max-h-[120px] pb-4 w-full overflow-y-auto overflow-x-hidden scrollbar-thin">
                <div className="min-h-[100px] w-full flex flex-wrap justify-center gap-1 p-2 ">
                  <DisplayTabs
                    singleFile={singleFile}
                    onclick={setGetFormat}
                    filedata={fileTypes}
                    section="images"
                  />
                </div>
              </div>
            </Tab>
            <Tab key="video" title="Videos">
              <div className="max-h-[120px] pb-4 w-full overflow-y-auto overflow-x-hidden scrollbar-thin">
                <div className="min-h-[100px] w-full flex flex-wrap justify-center gap-1 p-2 ">
                  <DisplayTabs
                    singleFile={singleFile}
                    onclick={setGetFormat}
                    filedata={fileTypes}
                    section="video"
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CustomEmptyPopover({
  children,
  triggerButton,
}: {
  children: ReactNode;
  triggerButton: ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent className=" border-none ">{children}</PopoverContent>
    </Popover>
  );
}

function FileDetailComponents({
  getFormat,
  setGetFormat,
  download,
  fileName,
  singleFile,
  fileSize,
  isConverting,
  conversionState,
  fromExtension,
  isLoading,
  singleIsLoading,
  singleIsConverting,
  downloadSingleFile,
}: {
  getFormat: IConversion[];
  setGetFormat: (
    fileId: string,
    fromFormat: string,
    toFormat: string,
    file: File
  ) => void;
  download: (id: string) => void;
  fileName: string;
  singleFile: UploadedFile;
  fileSize: string;
  isConverting: boolean;
  conversionState: IUploadStatus;
  fromExtension: string;
  isLoading: boolean;
  singleIsLoading:boolean;
  singleIsConverting:boolean;
  downloadSingleFile: (id: string) => void;
}) {
  const conversion = useConversionStore((state) => state.conversions);
  const currentConversion = conversion.filter(
    (item) => item.fileId == singleFile.id
  )[0];

  return (
    <>
      <div className="w-full h-fit py-2 flex justify-between ">
        <div className="flex items-center space-x-6 w-4/6">
          <div className="w-fit h-fit  rounded-full bg-slate-100 flex items-center justify-center">
            <Avatar
              size="sm"
              isBordered
              src={URL.createObjectURL(singleFile.file as unknown as File)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-[#1C325B] font-semibold tracking-wide">
              {fileName}
            </span>
            <div className="flex  space-x-3">
              <span className="text-[11px] font-light text-slate-400">
                {fromExtension}
              </span>
              <span className="text-[11px] text-slate-400">
                {convertBytesToMegabytes(Number(fileSize))}MB
              </span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-2/6 items-center space-x-2">
          <CustomPopover singleFile={singleFile} setGetFormat={setGetFormat}>
            <div className="flex justify-around items-center ">
              <span className="text-sm text-slate-500 px-2">to:</span>
              <div className="h-10 w-[80px] cursor-pointer border px-1 rounded-sm flex items-center justify-between border-slate-200 hover:border-orange-200">
                <div className="w-5/6 h-fit flex justify-center items-center text-sm text-slate-600">
                  {currentConversion?.toFormat}
                </div>
                <ChevronDown size={15} />
              </div>
            </div>
          </CustomPopover>
          { (isLoading || singleIsLoading) && currentConversion ? (
            <CustomButton
              onclick={() => downloadSingleFile(singleFile.id)}
              styles="capitalize"
              isLoading={
                currentConversion?.fileId == singleFile.id
                  ? isConverting
                  : false
              }
              title="download"
            />
          ) : (
            <CustomButton
              onclick={() => download(singleFile.id)}
              styles="capitalize"
              isLoading={
                currentConversion?.fileId == singleFile.id
                  ? isConverting
                  : false
              }
              singleIsConverting ={singleIsConverting}
              title="convert"
            />
          )}

          <div className="h-10 flex items-center justify-center ">
            <CustomEmptyPopover
              triggerButton={
                <EllipsisVertical
                  size={20}
                  color="gray"
                  className="cursor-pointer"
                />
              }
            >
              <div className="w-full px-4 flex items-center justify-between  cursor-pointer  bg-slate-100 h-10 my-2 rounded-md text-white text-xs font-semibold">
                <DeleteButtonWithDialog />
                <Trash color="black" size={16} />
              </div>
              <EditTextButtonWithModal title={""}>
                <div className="w-full mt-4">
                  <span className="text-sm font-semibold pb-2 tracking-wide ">
                    Edit Document Title
                  </span>
                  <Input variant="flat" label="Change Text" className="mt-2" />
                </div>
                <div>
                  <Button
                    className="bg-black text-white capitalize tracking-wide size-10 rounded-sm"
                    size="md"
                  >
                    save
                  </Button>
                </div>
              </EditTextButtonWithModal>
            </CustomEmptyPopover>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

function ActiveConversion() {
  const [getFormat, setGetFormat] = useState({ format: "docx" });
  const [convertAll, setConvertAll] = useState(false);
  const [convertSingleFile , setConvertSingleFile] = useState(false)
  const [conversionState, setConversionState] = useState<IUploadStatus>("idle");
  const [isConverting, setIsConveting] = useState(false);
  const setConversion = useConversionStore((state) => state.setConversion);
  const conversion = useConversionStore((state) => state.conversions);
  const {
    mutate,
    isPending,
    isError,
    isSuccess,
    data: conversionData,
  } = convertWithQuery.convertDocsToHtml();

  const {
    mutate:singleFileMutate,
    isPending:singleFileIsPending,
    isError:singleFileIsError,
    isSuccess:singleFileIsSuccess,
    data: singleFileConversionData,
  } = convertWithQuery.convertDocsToHtml();






  const [getResponseData, setResponseData] = useState<
    IFileConversionResponse[]
  >([]);
  const fileStore = useFilesStore((state) => state.files);

  /**
   *
   * @param id from all documents
   * @description used for sending individual file to database
   *
   */

  const download = async (id: string) => {
    const selectedContent = conversion.filter((item) => item.fileId == id);
    try {
      if (conversion.length == 0 || selectedContent.length == 0) {
        toast("No Convertion format selected!", {
          isLoading: false,
        });
        return;
      }
        const singleCollectionObj = selectedContent[0];
        if(!isConversionPathValid(singleCollectionObj.fromFormat , singleCollectionObj.toFormat)){
           toast.info(`conversion path ${singleCollectionObj.fromFormat} - ${singleCollectionObj.toFormat} is no valid`);
           return;
        }
      const filterConversion = selectedContent?.map((data) => ({
        file: data?.file,
        from: data?.fromFormat,
        to: data?.toFormat,
        fileId: data?.fileId,
      }));
      singleFileMutate(filterConversion);

    } catch (error: any) {}
  };
  
  if(singleFileIsSuccess!){
    console.log(singleFileConversionData , singleFileIsError , " file response")
  }
  const convertAllDocments = async () => {
    setResponseData([]);
    try {
      if (conversion.length == 0) {
        toast("No Convertion format selected!", {
          isLoading: false,
        });
        return;
      }

      for(const conversionData of conversion){
        if(!isConversionPathValid(conversionData.fromFormat , conversionData.toFormat)){
           toast.info(`conversion path ${conversionData.fromFormat} - ${conversionData.toFormat} is no valid`);
           return
        }
      }

      const filterConversion = conversion.map((data) =>{
        return({
          file: data.file,
          from: data.fromFormat,
          to: data.toFormat,
          fileId: data.fileId,
        })
      });
      console.log(
        conversion,
        filterConversion,
        "conversion collection testing "
      );
      mutate(filterConversion);

      /**
       * @description this is the document conversion core
       */

      toast.success("Conversion In Progress");
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @description when file conversion is successfull
   */

  if (isSuccess) {
      toast.success("Conversion was successfull")
  }

  const downloadSingleFile = async (id: string) => {
    const mime = conversionData?.responseDocument?.filter(
      (data: IDocumentResponse) => data.conversionIndex === id
    ) as IDocumentResponse[];
    const mimeType = fileMimeTypes[mime[0]?.toFormat] ?? "text/plain";
    try {
      console.log(id, mime, `id from file conversion `);
      const blobData = convertBufferToBlob(
        mime[0].fileContent.data as unknown as Buffer,
        mimeType
      );
      downloadFile(blobData, mime[0]?.fileName as string);
    } catch (error: any) {
      console.log(error?.message, `error message`);
    }
  };

  return (
    <div className="w-full  flex flex-col flex-grow items-center space-y-2 min-h-screen mb-10  ">
      <GetFileFromOtherSources>
        <div></div>
      </GetFileFromOtherSources>
      <Card className="w-full lg:w-4/6">
        <CardHeader className="w-full py-4 flex justify-between items-center">
          <div className="text-[#1C325B] font-semibold capitalize w-fit ">
            Document Conversion
          </div>
          <div className="w-fit flex justify-end items-center space-x-3 h-full">
            <EditAllButtonWithModal title={"Select From Device"}>
              <div>Edit drag and drop</div>
            </EditAllButtonWithModal>
            <DeleteAllButtonWithDialog />
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {fileStore.map((file, index) => {
            return (
              <FileDetailComponents
                key={index}
                fileName={file.name}
                fileSize={String(file.size)}
                singleFile={file}
                fromExtension={getFileExtension(file.name)}
                getFormat={conversion}
                setGetFormat={setConversion}
                isConverting={isConverting}
                conversionState={conversionState}
                download={() => download(file.id)}
                isLoading={isSuccess}
                singleIsLoading={singleFileIsSuccess}
                singleIsConverting={singleFileIsPending}
                downloadSingleFile={() => downloadSingleFile(file.id)}
              />
            );
          })}
        </CardBody>
        <CardFooter>
          <div className="w-full h-full">
            <Button
              onClick={convertAllDocments}
              variant="flat"
              className="tracking-wide text-sm rounded-sm w-full font-semibold text-white  bg-orange-500 mt-4  "
            >
              {isPending ? (
                <ClipLoader
                  color={"#000000"}
                  loading={isPending}
                  size={18}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <span> Convert All ✈ ✈ ✈</span>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ActiveConversion;
