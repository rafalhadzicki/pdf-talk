import { useChatWithDocument } from '@/api/document';
import { ChatMessageRole } from '@/assets/constants/chatMessage';
import { RoutePaths } from '@/assets/constants/paths';
import ChatBubble from '@/components/atoms/ChatBubble';
import ScrollArea from '@/components/atoms/ScrollArea';
import ChatInput from '@/components/molecules/ChatInput';
import DownloadModal from '@/components/molecules/DownloadModal';
import OptionsSlider from '@/components/molecules/OptionsSlider';
import Pdf from '@/components/organisms/Pdf';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ContentObj, Message, Question } from '@/models/chat';
import {
  addMessageToConversation,
  selectConversationById,
} from '@/store/slices/conversationsSlice';
import { Box, Loader, createStyles, useMantineTheme } from '@mantine/core';
import { usePDF } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.colors.blue[3],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  loader: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const Chat = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  const { sourceId } = useParams();
  const { classes } = useStyles();
  const { register, handleSubmit, reset } = useForm<ContentObj>();
  const { chatWithDocument, isAnswerLoading, isAnswerError } =
    useChatWithDocument();
  const [isDownloadModalOpened, setIsDownloadModalOpened] = useState(true);
  const questionsAndAnswers = useAppSelector((state) =>
    selectConversationById(state, sourceId)
  );
  const dispatch = useAppDispatch();
  const { colors } = useMantineTheme();
  const [instance, update] = usePDF({});
  const navigate = useNavigate();

  const handleChat = (question: string) => {
    if (!sourceId || !questionsAndAnswers) return;
    const newMessage: Message = {
      content: question,
      role: ChatMessageRole.User,
    };
    const newQuestion: Question = {
      sourceId: sourceId,
      messages: [...questionsAndAnswers.messages, newMessage],
    };
    dispatch(
      addMessageToConversation({ message: newMessage, sourceId: sourceId })
    );
    chatWithDocument(newQuestion, {
      onSuccess: (answer) => {
        const newMessage: Message = {
          content: answer.content,
          role: ChatMessageRole.Assistant,
        };
        dispatch(
          addMessageToConversation({
            message: newMessage,
            sourceId: sourceId!,
          })
        );
      },
    });
  };

  const onSubmit = (data: ContentObj) => {
    handleChat(data.content);
    reset();
  };

  const handleGetSummary = async () => {
    if (instance.url) {
      setIsDownloadModalOpened(true);
      return;
    }
    update(<Pdf summaryData={questionsAndAnswers!.messages} />);
  };

  useEffect(
    () => {
      if (!questionsAndAnswers) {
        navigate(RoutePaths.Home);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <ScrollArea>
        {questionsAndAnswers &&
          questionsAndAnswers.messages.map(({ content, role }, i) => (
            <ChatBubble role={role} key={i}>
              {content}
            </ChatBubble>
          ))}
        {(isAnswerLoading || instance.loading) && (
          <Box className={instance.loading ? classes.loader : undefined}>
            <Loader
              size="xl"
              variant={instance.loading ? 'oval' : 'dots'}
              ml={20}
              mt={20}
              color={
                instance.loading || instance.loading
                  ? colors.blue[2]
                  : colors.gray[6]
              }
            />
          </Box>
        )}
        {isAnswerError && <ChatBubble>{t('error')}</ChatBubble>}
      </ScrollArea>
      {
        <OptionsSlider
          isLoading={isAnswerLoading || instance.loading}
          handleOptionClick={handleChat}
          handleGeneratePdf={handleGetSummary}
          disabled={!questionsAndAnswers}
        />
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <ChatInput
          disabled={isAnswerLoading || instance.loading || !questionsAndAnswers}
          register={register}
          mt={10}
        />
      </form>
      {instance.url && (
        <DownloadModal
          url={instance.url}
          opened={isDownloadModalOpened}
          onClose={() => setIsDownloadModalOpened(false)}
        />
      )}
    </>
  );
};

export default Chat;
