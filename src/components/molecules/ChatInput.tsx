import { InputNames } from '@/assets/constants/inputNames';
import { ContentObj } from '@/models/chat';
import {
  ActionIcon,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type ChatInputProps = TextInputProps & {
  register: UseFormRegister<ContentObj>;
};

export const ChatInput = ({ register, ...props }: ChatInputProps) => {
  const { primaryColor } = useMantineTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  return (
    <TextInput
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={primaryColor}
          variant="filled"
          type="submit"
        >
          <IconArrowRight size="1.1rem" stroke={1.5} />
        </ActionIcon>
      }
      placeholder={t('ask')}
      rightSectionWidth={42}
      {...register(InputNames.Content, { required: true })}
      {...props}
    />
  );
};

export default ChatInput;
