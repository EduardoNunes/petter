interface ProfileContextType {
    numberImagesGallery: number;
    setNumberImagesGallery: (value: number) => void;
    showImage: boolean;
    setShowImage: (value: boolean) => void;
    imageSelected: string;
    setImageSelected: (value: string) => void;
    imageSrc: string[];
    setImageSrc: (value: string[]) => void;
    loadImagesProfile: (petterId: number, newPage: number) => Promise<void>;
    loadPetterVisitantInfos: (petterId: number) => Promise<void>;
    visitantSelected: any; 
    setVisitantSelected: (value: any) => void; 
  }

export default ProfileContextType;
