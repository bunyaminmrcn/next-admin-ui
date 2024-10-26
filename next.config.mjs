/** @type {import('next').NextConfig} */

import i18nconfig from './next-i18next.config.mjs'

const nextConfig = {

  transpilePackages: [],
  i18n: i18nconfig.i18n,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
};

export default nextConfig;
