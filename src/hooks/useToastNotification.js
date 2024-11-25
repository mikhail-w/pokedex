// utils/useToastNotification.js
import { useToast } from '@chakra-ui/react';

export const useToastNotification = () => {
  const toast = useToast();

  const showToast = (title, status) => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  return { showToast };
};
