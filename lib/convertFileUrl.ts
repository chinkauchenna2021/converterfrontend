export const  handleImageChange = (files:File[]) => {
    const  file = files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
    //   return () => URL.revokeObjectURL(imageUrl);
    return imageUrl
    }
  };
