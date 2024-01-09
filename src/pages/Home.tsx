import { useUploadDocument } from '@/api/document';
import { RoutePaths } from '@/assets/constants/paths';
import ConversationTile from '@/components/atoms/ConversationTile';
import ScrollArea from '@/components/atoms/ScrollArea';
import DropzoneWithButton from '@/components/organisms/DropzoneWithButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  addConversation,
  selectConversations,
} from '@/store/slices/conversationsSlice';
import { Box, Text, createStyles } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  buttonBox: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 800,
    color: theme.colors.gray[8],
  },
  placeholder: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 800,
    color: theme.colors.gray[4],
  },
  scrollContainer: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    borderRadius: theme.radius.lg,
    minHeight: '50%',
  },
  mainContainer: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column-reverse',
    },
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    height: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const Home = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'homePage' });
  const { classes } = useStyles();
  const [document, setDocument] = useState<FileWithPath>();
  const { uploadDocument, isUploading, isUploadError } = useUploadDocument();
  const conversations = useAppSelector((state) => selectConversations(state));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUpload = () => {
    if (document)
      uploadDocument(document, {
        onSuccess: (data) => {
          dispatch(
            addConversation({
              name: document.name,
              timestamp: dayjs().valueOf(),
              sourceId: data.sourceId,
            })
          );
          navigate(`${RoutePaths.Chat}/${data.sourceId}`);
        },
      });
  };
  return (
    <Box className={classes.mainContainer}>
      <ScrollArea className={classes.scrollContainer}>
        {conversations.map(({ name, timestamp, sourceId }) => (
          <ConversationTile
            key={sourceId}
            name={name}
            timestamp={timestamp}
            sourceId={sourceId}
          />
        ))}
        {!conversations.length && (
          <Text className={classes.placeholder}>{t('noConversations')}</Text>
        )}
      </ScrollArea>

      <DropzoneWithButton
        isError={isUploadError}
        disabled={isUploading}
        buttonDisabled={isUploading || !document}
        handleSubmit={handleUpload}
        loading={isUploading}
        handleDrop={setDocument}
      />
    </Box>
  );
};

export default Home;
