// Based mostly on https://github.com/Uniswap/interface/blob/main/src/theme/index.tsx

const colors = {
  white: '#FFFFFF',
  black: '#000000',

  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray130: '#f0f0f0',
  gray200: '#e5e5e5',
  gray250: '#c9c9c9',
  gray300: '#d4d4d4',
  gray400: '#a3a3a3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray850: '#1e1e1e',
  gray900: '#171717',
  gray950: '#0a0a0a',
}

const commonTheme = {
  ...colors,

  accent1: '#5CB479',
}

export const lightTheme = {
  ...commonTheme,

  bg1: colors.gray130,
  bg2: colors.white,
  bg3: colors.gray200,

  neutral1: colors.gray950,
  neutral2: colors.gray500,
  neutral3: colors.gray200,

  border: colors.gray200,
}
