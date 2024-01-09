import predefinedPrompts from '@/assets/constants/predefinedPrompts';
import { Box, Button, createStyles, useMantineTheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.colors.gray[0],
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    borderRadius: theme.radius.xl,
    border: `1px solid ${theme.colors.gray[3]}`,
    width: '100%',
    overflowX: 'scroll',
    padding: '15px 10px',
    marginTop: 10,
    alignItems: 'center',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

type OptionsSliderProps = {
  handleOptionClick: (value: string) => void;
  handleGeneratePdf: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const OptionsSlider = ({
  handleOptionClick,
  handleGeneratePdf,
  isLoading,
  disabled,
}: OptionsSliderProps) => {
  const { classes } = useStyles();
  const { colors, radius } = useMantineTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  return (
    <Box className={classes.mainContainer}>
      {predefinedPrompts.map(({ prompt, name }) => (
        <Button
          variant="light"
          color={colors.blue[3]}
          key={name}
          radius={radius.xl}
          onClick={() => handleOptionClick(prompt)}
          disabled={isLoading || disabled}
        >
          {name}
        </Button>
      ))}
      <Button
        variant="light"
        color={colors.blue[3]}
        radius={radius.xl}
        onClick={handleGeneratePdf}
        disabled={isLoading || disabled}
      >
        {t('generate')}
      </Button>
    </Box>
  );
};

export default OptionsSlider;
