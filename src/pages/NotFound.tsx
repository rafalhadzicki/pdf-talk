import { RoutePaths } from '@/assets/constants/paths';
import {
  Button,
  Container,
  Group,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },
  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },
  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

const NotFound = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('translation', { keyPrefix: 'notFound' });
  const navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>{t('title')}</div>
      <Title className={classes.title}>{t('description')}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        {t('subtitle')}
      </Text>
      <Group position="center">
        <Button
          variant="subtle"
          size="md"
          onClick={() => navigate(RoutePaths.Home)}
        >
          {t('button')}
        </Button>
      </Group>
    </Container>
  );
};

export default NotFound;
