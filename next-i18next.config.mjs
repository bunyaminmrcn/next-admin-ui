// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
import path from 'path';
import fs from "node:fs/promises";
import { createRequire } from "node:module";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); 

import HttpBackend from 'i18next-http-backend/cjs'
import ChainedBackend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'

import { fileURLToPath } from 'url';

const isBrowser = typeof window !== 'undefined'
const isDev = process.env.NODE_ENV === 'development'

const options =  {
    // https://www.i18next.com/overview/configuration-options#logging
    backend: {
      backendOptions: [
        { expirationTime: isDev ? 60 * 1000 : 60 * 60 * 1000 },
        {},
      ], // 1 hour
      backends: isBrowser ? [LocalStorageBackend, HttpBackend] : [],
    },
    // https://www.i18next.com/overview/configuration-options#logging
    debug: isDev,
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'tr'],
    },
    /** To avoid issues when deploying to some paas (vercel...) */
    localePath:
      typeof window === 'undefined'
        ? path.resolve(__dirname, 'public', 'locales')
        : '/public/locales',
  
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    ns: ['common'],
    partialBundledLanguages: isBrowser,
    use: isBrowser ? [ChainedBackend] : [],
    /**
     * @link https://github.com/i18next/next-i18next#6-advanced-configuration
     */
    // saveMissing: false,
    // strictMode: true,
    // serializeConfig: false,
    // react: { useSuspense: false }
  }
  export default options;

  export { options }