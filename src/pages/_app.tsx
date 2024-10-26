import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.mjs'

import './globals.css'
import { I18nextProvider } from 'react-i18next';
import i18n from './_i18n';
import { Suspense } from 'react';
import { getSession, SessionProvider } from "next-auth/react"


const MyApp = ({ Component, ...pageProps }: AppProps) => {

  console.log({sessionMain: pageProps?.props.session})
  return (<Suspense>
    <SessionProvider session={pageProps?.props.session}>
      <I18nextProvider i18n={i18n} defaultNS={'common'}>
        <Component {...pageProps} />
      </I18nextProvider>
    </SessionProvider>
  </Suspense>)

}

MyApp.getInitialProps = async (ctx) =>  {

  const session = await getSession(ctx)

  console.log({ session1: session})
  if (!session) {
    return {
      props: {}
    }
  }
  //const { user } = session;
  return { props: { session }}
}

// https://github.com/i18next/next-iF18next#unserializable-configs
export default MyApp