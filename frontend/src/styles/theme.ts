import { TypographyToken, ColorToken } from '../types/style';

export const color = {
  gray: {
    100: '#DFE2EA',
    200: '#DDDDDD',
    300: '#C9CEDC',
    500: '#9DA5B6',
    700: '#697183',
    900: '#2E3033',
    black: '#141517',
    white: '#FFFFFF'
  },
  purple: {
    100: '#E4E3FA',
    500: '#4E41DB'
  },
  red: '#E02020',
  brand: '#01F89F'
};

export const tokenColor: Record<ColorToken, string> = {
  'surface-default': color.gray.black,
  'surface-alt': color.gray[900],
  'text-weak': color.gray[700],
  'text-default': color.gray[500],
  'text-bold': color.gray[300],
  'text-strong': color.gray[100],
  'color-white': color.gray.white,
  'brand-default': color.brand,
  'purple-default': color.purple[500],
  'purple-alt': color.purple[100],
  'border-default': color.gray[200]
};

export const typography = {
  fontWeights: {
    bold: 700,
    medium: 400
  },
  lineHeights: {
    default: 'auto'
  }
};

export const typographyStyle: Record<TypographyToken, string> = {
  'display-bold48': `font-size: 48px; font-weight: ${typography.fontWeights.bold}; line-height: ${typography.lineHeights.default};`,
  'display-bold24': `font-size: 24px; font-weight: ${typography.fontWeights.bold}; line-height: ${typography.lineHeights.default};`,
  'display-bold20': `font-size: 20px; font-weight: ${typography.fontWeights.bold};  line-height: ${typography.lineHeights.default};`,
  'display-bold16': `font-size: 16px; font-weight: ${typography.fontWeights.bold}; line-height: ${typography.lineHeights.default};`,
  'display-bold14': `font-size: 14px; font-weight: ${typography.fontWeights.bold}; line-height: ${typography.lineHeights.default};`,
  'display-bold12': `font-size: 12px; font-weight: ${typography.fontWeights.bold};  line-height: ${typography.lineHeights.default};`,
  'display-medium16': `font-size: 16px; font-weight: ${typography.fontWeights.medium}; line-height: ${typography.lineHeights.default};`,
  'display-medium14': `font-size: 14px; font-weight: ${typography.fontWeights.medium}; line-height: ${typography.lineHeights.default};`,
  'display-medium12': `font-size: 12px; font-weight: ${typography.fontWeights.medium}; line-height: ${typography.lineHeights.default};`
};

export const theme = {
  color,
  tokenColor,
  typographyStyle
};
