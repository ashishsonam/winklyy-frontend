import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { AxiosContext } from '../Context/AxiosContext';

export const useUploadForm = (url: string) => {
  const axios = useContext(AxiosContext).authAxios;

  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadForm = async (formData: FormData) => {
    try {
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent && progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            console.log(progress);
            setProgress(progress);
          }
        },
        onDownloadProgress: (progressEvent) => {
          if (progressEvent && progressEvent.total) {
            const progress =
              50 + (progressEvent.loaded / progressEvent.total) * 50;
            console.log(progress);
            setProgress(progress);
          }
        },
      });

      setIsSuccess(true);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log('Error in upload image:', axiosError?.response?.data);
      }
    }
  };

  return { uploadForm, isSuccess, progress, setProgress, setIsSuccess };
};
