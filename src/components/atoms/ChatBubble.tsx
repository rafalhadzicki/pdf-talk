import { ChatMessageRole } from '@/assets/constants/chatMessage';
import { Box, BoxProps, createStyles } from '@mantine/core';
import { useEffect, useRef } from 'react';

type ChatBubbleProps = BoxProps & {
  role?: ChatMessageRole;
};

const useStyles = createStyles((theme, { role }: ChatBubbleProps) => ({
  bubbleContainer: {
    display: 'flex',
    justifyContent: role === ChatMessageRole.User ? 'flex-end' : 'flex-start',
    flexDirection: 'row',
  },
  bubble: {
    borderRadius: theme.radius.xl,
    padding: 10,
    backgroundColor:
      role === ChatMessageRole.Assistant
        ? theme.colors.gray[6]
        : role === ChatMessageRole.User
        ? theme.colors.blue[5]
        : theme.colors.red[5],
    color: theme.colors.white[0],
    maxWidth: '80%',
    marginTop: 10,
    whiteSpace: 'pre-line',
  },
}));

const ChatBubble = ({ role, children, ...props }: ChatBubbleProps) => {
  const { classes } = useStyles({ role });
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Box className={classes.bubbleContainer} ref={boxRef}>
      <Box className={classes.bubble} {...props}>
        {children}
      </Box>
    </Box>
  );
};

export default ChatBubble;
