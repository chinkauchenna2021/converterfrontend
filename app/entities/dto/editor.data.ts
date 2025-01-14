
export type IImageSizes = {
    key: string;
    label: string;
    imageWidth: number;
    imageHeight: number;
}


export const imageSizes:IImageSizes[] = [
    { key: "790x515", label: "790x515", imageWidth: 790, imageHeight: 515 },
    { key: "1024x768", label: "1024x768", imageWidth: 1024, imageHeight: 768 },
    { key: "1920x1080", label: "1920x1080", imageWidth: 1920, imageHeight: 1080 },
    { key: "1280x720", label: "1280x720", imageWidth: 1280, imageHeight: 720 },
    { key: "640x480", label: "640x480", imageWidth: 640, imageHeight: 480 },
    { key: "320x240", label: "320x240", imageWidth: 320, imageHeight: 240 },
    { key: "800x600", label: "800x600", imageWidth: 800, imageHeight: 600 },
  ];
  