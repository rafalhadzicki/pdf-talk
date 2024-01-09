import { RoutePaths } from '@/assets/constants/paths';
import {
  Box,
  Divider,
  Paper,
  Text,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[2],
  },
  card: {
    [theme.fn.smallerThan('md')]: {
      width: '90vw',
      padding: 20,
    },
    width: theme.breakpoints.md,
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 30,
    border: `1px solid ${theme.colors.gray[2]}`,
  },
  header: {
    [theme.fn.smallerThan('sm')]: {
      fontSize: 30,
    },
    fontSize: 40,
    fontWeight: 600,
    color: theme.colors.gray[7],
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.gray[5],
    },
  },
  description: {
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 10,
    },
    marginBottom: 20,
  },
  divider: {
    marginBottom: 20,
    borderRadius: 10,
  },
}));

const MainCard = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'homePage' });
  const { classes } = useStyles();
  const { colors } = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Box className={classes.mainContainer}>
      <Paper shadow="lg" radius="lg" className={classes.card}>
        <Text
          className={classes.header}
          onClick={() => navigate(RoutePaths.Home)}
        >
          {t('title')}
        </Text>
        <Text className={classes.description} c={colors.gray[6]}>
          {t('description')}
        </Text>
        <Divider size={3} color={colors.gray[2]} className={classes.divider} />
        <Outlet />
      </Paper>
    </Box>
  );
};

export default MainCard;
