import { ApiPaths } from '@/assets/constants/paths';
import apiClient from '@/helpers/apiClient';
import {
  ContentObj,
  Question,
  SourcesToDelete,
  UploadFileResponse,
} from '@/models/chat';
import { FileWithPath } from '@mantine/dropzone';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

export const useUploadDocument = () => {
  const {
    mutate: uploadDocument,
    isLoading: isUploading,
    isError: isUploadError,
  } = useMutation<UploadFileResponse, AxiosError, FileWithPath>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      const data = await apiClient.post<UploadFileResponse, FormData>(
        ApiPaths.AddFile,
        formData
      );
      return data;
    },
  });
  return { uploadDocument, isUploading, isUploadError };
};

export const useChatWithDocument = () => {
  const {
    mutate: chatWithDocument,
    data: answer,
    isLoading: isAnswerLoading,
    isError: isAnswerError,
  } = useMutation<ContentObj, AxiosError, Question>({
    mutationFn: async (request) => {
      //modify request.messages to last 10 messages due to API limitation
      request.messages = request.messages.slice(
        request.messages.length - 10,
        request.messages.length
      );
      const data = await apiClient.post<ContentObj, Question>(
        ApiPaths.Chat,
        request
      );
      return data;
    },
  });
  return { chatWithDocument, answer, isAnswerLoading, isAnswerError };
};

export const useDeleteDocument = () => {
  const {
    mutate: deleteDocument,
    isLoading: isDeleting,
    isError: isDeleteError,
  } = useMutation<void, AxiosError, SourcesToDelete>({
    mutationFn: async (sources) => {
      await apiClient.post<void, SourcesToDelete>(
        ApiPaths.DeleteFiles,
        sources
      );
      return;
    },
  });
  return { deleteDocument, isDeleting, isDeleteError };
};
