import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    white: ['#fff'],
  },
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  headings: {
    fontFamily: 'Roboto, sans-serif',
  },
};

export default theme;
