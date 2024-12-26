export type IFileOptions = {
      id:number , 
      type:string;
      data:string[]
}


export const fileTypes:IFileOptions[] = [
     {
        id:0,
        type:"images",
        data:[
            "jpg",
             "jpeg",
             "png",
             "gif",
             "bmp",
             "tiff",
             "tif",
             "webp",
             "avif",
             "heif",
             "heic",
             "svg",
             "pdf",
             "ico",
             "exr",
             "dng",
             "cr2",
              "cr3",
              "nef",
              "raf",
              "orf",
              "sr2",
        ]
     },
     
     {
        id:1,
        type:"documents",
        data:[
            "pdf",
            "doc",
            "docx",
            "txt",
            "rtf",
            "odt",
            "html",
            "xls",
            "xlsx",
            "ppt",
            "pptx",
            "csv",
            "md",
            "xps",
            "eps",
            "tex",
            "dotx",
            "key",
            "wpd"
        ]
     },

     {
        id:2,
        type:"video",
        data:[
              "mp4",
              "avi",
              "mkv",
              "mov",
              "wmv",
              "flv",
              "webm",
              "mts",
              "m2ts",
              "hevc",
              "h265",
              "3gp",
              "mpeg",
              "mpg",
              "ogv",
              "rm",
              "rmvb",
              "dsf",
              "cavs",
              "ivf",
              "pmp",
        ]
     }

]



export const FileImageData = [
   {
      id:0,
      name:'pdf',
      source:""
   }
]



export const fileMimeTypes:Record<string,string>= {
     txt: "text/plain",
     html: "text/html",
     htm: "text/html",
     css: "text/css",
     csv: "text/csv",
     json: "application/json",
     xml: "application/xml",
     js: "application/javascript",
     ts: "application/typescript",
     md: "text/markdown",
     yaml: "application/x-yaml",
     yml: "application/x-yaml",
     pdf: "application/pdf",
     doc: "application/msword",
     docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
     rtf: "application/rtf",
     odt: "application/vnd.oasis.opendocument.text",
     ods: "application/vnd.oasis.opendocument.spreadsheet",
     xls: "application/vnd.ms-excel",
     xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
     ppt: "application/vnd.ms-powerpoint",
     pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
     zip: "application/zip",
     rar: "application/vnd.rar",
     "7z": "application/x-7z-compressed",
     tar: "application/x-tar",
     gz: "application/gzip",
     iso: "application/x-iso9660-image",
     mp3: "audio/mpeg",
     wav: "audio/wav",
     ogg: "audio/ogg",
     flac: "audio/flac",
     aac: "audio/aac",
     m4a: "audio/x-m4a",
     mp4: "video/mp4",
     mkv: "video/x-matroska",
     mov: "video/quicktime",
     avi: "video/x-msvideo",
     wmv: "video/x-ms-wmv",
     webm: "video/webm",
     flv: "video/x-flv",
     "3gp": "video/3gpp",
     png: "image/png",
     jpg: "image/jpeg",
     jpeg: "image/jpeg",
     gif: "image/gif",
     bmp: "image/bmp",
     tiff: "image/tiff",
     tif: "image/tiff",
     webp: "image/webp",
     svg: "image/svg+xml",
     ico: "image/vnd.microsoft.icon",
     heic: "image/heic",
     heif: "image/heif",
     psd: "image/vnd.adobe.photoshop",
     ai: "application/postscript",
     eps: "application/postscript",
     mpg: "video/mpeg",
     mpeg: "video/mpeg",
     exe: "application/x-msdownload",
     apk: "application/vnd.android.package-archive",
     dmg: "application/x-apple-diskimage",
     bin: "application/octet-stream",
     deb: "application/vnd.debian.binary-package",
     rpm: "application/x-rpm",
     sh: "application/x-sh",
     bat: "application/x-msdos-program",
     otf: "font/otf",
     ttf: "font/ttf",
     woff: "font/woff",
     woff2: "font/woff2"
   }
 
 