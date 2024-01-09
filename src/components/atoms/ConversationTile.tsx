import { useDeleteDocument } from '@/api/document';
import { RoutePaths } from '@/assets/constants/paths';
import { useAppDispatch } from '@/hooks/redux';
import { SourcesToDelete } from '@/models/chat';
import {
  Conversation,
  deleteConversation,
} from '@/store/slices/conversationsSlice';
import { Button, Text, createStyles, useMantineTheme } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles(() => ({
  conversationTile: {
    '.mantine-Button-label': {
      gap: 10,
      width: '100%',
      justifyContent: 'space-between',
    },

    padding: 15,
    borderRadius: 10,
    height: 'fit-content',
  },
  name: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  icon: {
    minWidth: 30,
  },
}));

const ConversationTile = ({
  sourceId,
  timestamp,
  name,
}: Omit<Conversation, 'messages'>) => {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deleteDocument } = useDeleteDocument();

  const handleConversationDelete = (e: MouseEvent) => {
    e.stopPropagation();
    if (!sourceId) return;

    const sourceToDelete: SourcesToDelete = {
      sources: [sourceId],
    };

    deleteDocument(sourceToDelete, {
      onSuccess: () => {
        dispatch(deleteConversation({ sourceId }));
      },
    });
  };

  return (
    <Button
      variant="outline"
      fullWidth
      className={classes.conversationTile}
      onClick={() => navigate(`${RoutePaths.Chat}/${sourceId}`)}
    >
      <Text> {dayjs(timestamp).format('DD/MM/YYYY HH:mm')}</Text>
      <Text className={classes.name}>{name}</Text>
      <IconX
        onClick={handleConversationDelete}
        size={30}
        color={colors.red[4]}
        className={classes.icon}
      />
    </Button>
  );
};

export default ConversationTile;
