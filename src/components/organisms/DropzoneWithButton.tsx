import {
  Box,
  Button,
  Group,
  Text,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  PDF_MIME_TYPE,
} from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type DropzoneWithButtonProps = {
  handleDrop: (files: FileWithPath) => void;
  handleSubmit: () => void;
  isError?: boolean;
  buttonDisabled?: boolean;
} & Partial<DropzoneProps>;

const MAX_FILE_SIZE = 10 * 1024 ** 2;

const useStyles = createStyles(
  (theme, { isError }: Partial<DropzoneWithButtonProps>) => ({
    textContainer: {
      width: 350,
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
      },
    },
    dropzone: {
      borderRadius: theme.radius.lg,
      '.mantine-Group-root': {
        height: '100%',
        pointerEvents: 'none',
        [theme.fn.largerThan('sm')]: {
          minHeight: '13.5rem',
        },
      },
    },
    buttonBox: {
      [theme.fn.smallerThan('sm')]: {
        width: '100%',
      },
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      [theme.fn.smallerThan('sm')]: {
        marginTop: 10,
      },
      marginTop: 40,
      minHeight: 30,
      backgroundColor: isError ? theme.colors.red[6] : theme.colors.blue[6],
      '&:hover': {
        backgroundColor: isError ? theme.colors.red[7] : theme.colors.blue[7],
      },
    },
  })
);

const DropzoneWithButton = ({
  handleDrop,
  handleSubmit,
  disabled,
  isError,
  buttonDisabled,
  ...props
}: DropzoneWithButtonProps) => {
  const { colors, primaryColor, colorScheme } = useMantineTheme();
  const { classes } = useStyles({ isError });
  const { t } = useTranslation('translation', { keyPrefix: 'dropzone' });
  const [fileName, setFileName] = useState<string>();

  const onDrop = (files: FileWithPath[]) => {
    setFileName(files[0].name);
    handleDrop(files[0]);
  };
  return (
    <Box className={classes.buttonBox}>
      <Dropzone
        onDrop={onDrop}
        maxSize={MAX_FILE_SIZE}
        accept={PDF_MIME_TYPE}
        multiple={false}
        {...props}
        className={classes.dropzone}
        disabled={disabled}
      >
        <Group position="center">
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={colors[primaryColor][colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={colors.red[colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>
          <div className={classes.textContainer}>
            <Text size="xl" inline>
              {fileName ? t('uploadSuccess') : t('title')}
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              {fileName || t('description')}
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Button
        className={classes.button}
        fullWidth
        variant="filled"
        color="blue"
        radius="xl"
        disabled={buttonDisabled}
        onClick={handleSubmit}
      >
        {isError ? t('error') : t('submitPdf')}
      </Button>
    </Box>
  );
};

export default DropzoneWithButton;
