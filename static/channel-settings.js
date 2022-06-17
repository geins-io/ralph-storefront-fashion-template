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
    accentColor: baseColors.primaryAccent,
    secondaryAccentColor: baseColors.secondaryAccent,
    lightestColor: baseColors.lightest,
    darkestColor: baseColors.darkest,
    topBarBackground: baseColors.darkest,
    topBarColor: baseColors.lightest,
    headerTheme: 'dark',
    footerBackground: baseColors.darkest,
    footerColor: baseColors.lightest,
    primaryTextColor: baseColors.primaryText,
    secondaryTextColor: baseColors.secondaryText,
    inverseTextColor: baseColors.inverseText
  },
  {
    channelId: '2|en',
    locale: 'en',
    domain: process.env.DOMAIN_EN
  }
];
