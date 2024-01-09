import { Box, BoxProps, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  scrollArea: {
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: theme.radius.xl,
    padding: '20px',
    overflowY: 'scroll',
    height: '100%',
    backgroundColor: theme.colors.gray[0],
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const ScrollArea = ({ className, ...props }: BoxProps) => {
  const { classes } = useStyles();

  return <Box className={`${classes.scrollArea} ${className}`} {...props} />;
};

export default ScrollArea;
