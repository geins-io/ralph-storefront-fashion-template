const baseColors = {
  lightest: '#ffffff',
  lightGray: '#fafafa',
  darkGray: '#ededed',
  darkest: '#131313',
  primaryAccent: '#ffb802',
  secondaryAccent: '#9baea5',
  primaryText: '#131313',
  secondaryText: '#7e7e7e',
  inverseText: '#ffffff'
};
export default [
  {
    channelId: '1|se',
    locale: 'sv',
    domain: process.env.DOMAIN_SV,
    siteName: 'Ralph Fashion',
    themeSettings: {
      'header-theme': 'dark',
      'footer-theme': 'dark',
      'accent-color': baseColors.primaryAccent,
      'secondary-accent-color': baseColors.secondaryAccent,
      'lightest-color': baseColors.lightest,
      'darkest-color': baseColors.darkest,
      'top-bar-background': baseColors.darkest,
      'top-bar-color': baseColors.lightest,
      'footer-background': baseColors.darkest,
      'footer-color': baseColors.lightest,
      'primary-text-color': baseColors.primaryText,
      'secondary-text-color': baseColors.secondaryText,
      'inverse-text-color': baseColors.inverseText,
      'main-background': baseColors.lightGray,
      'body-font': '"Roboto", sans serif',
      'body-text-color': baseColors.secondaryText,
      'body-line-height': '1.4',
      'body-font-weight': '400',
      'body-font-size': '0.875rem',
      'title-font': '"Tinos", serif',
      'title-text-color': baseColors.primaryText,
      'title-line-height': '1',
      'title-font-weight': '400'
    }
  },
  {
    channelId: '2|en',
    locale: 'en',
    domain: process.env.DOMAIN_EN
  }
];
