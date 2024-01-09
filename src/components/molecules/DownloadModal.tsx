import { Button, Modal, ModalProps, Text, createStyles } from '@mantine/core';
import { IconDownload, IconFileTypePdf } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

type DownloadModalProps = ModalProps & {
  url: string | null;
  isError?: boolean;
};

const useStyles = createStyles(
  (theme, { isError }: Partial<DownloadModalProps>) => ({
    innerModal: {
      '.mantine-Modal-inner': {
        alignItems: 'center',
      },
      '.mantine-Modal-body': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
      },
    },
    text: {
      fontSize: 20,
      fontWeight: 600,
      color: isError ? theme.colors.red[8] : theme.colors.gray[8],
    },
  })
);

const DownloadModal = ({ url, isError, ...props }: DownloadModalProps) => {
  const { classes } = useStyles({ isError });
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  return (
    <Modal className={classes.innerModal} {...props}>
      <Text className={classes.text}>
        {isError ? t('error') : t('fileReady')}
      </Text>
      {url && (
        <>
          <Button
            component="a"
            target="_blank"
            href={url}
            rel="noreferrer"
            leftIcon={<IconFileTypePdf />}
          >
            {t('open')}
          </Button>
          <Button
            component="a"
            href={url}
            download={`${t('fileName')}.pdf`}
            leftIcon={<IconDownload />}
          >
            {t('download')}
          </Button>
        </>
      )}
    </Modal>
  );
};

export default DownloadModal;
