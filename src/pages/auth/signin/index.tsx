
//@ts-nocheck
"use client";


import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { useTranslation, Trans } from 'next-i18next'


type Props = {
  // Add custom props here
}

import { initEmulator } from '@/lib/firebase-auth';

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/built-in/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//import { useTranslation } from 'react-i18next';


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import i18n from '@/pages/_i18n';


import { signInWithEmailAndPassword } from 'firebase/auth';
import * as auth from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase-auth'

import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";
export default function Login(props: any) {

  const router = useRouter();


  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const { t } = useTranslation(('common'), { i18n, lng: 'en' })
  const [lang, setLang] = React.useState('en');

  const signin = () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    firebaseAuth.setPersistence(auth.browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (result) => {
          const user = result.user;
          //const currentUser = JSON.stringify(result.user);
          //const id = result.user.uid;
          const { displayName, photoURL } = user;

          signIn('credentials', { email, name: displayName, image: photoURL, callbackUrl: '/demo' })



          /*
          signIn("credentials", {
            idToken: result.user.getIdToken(true),
            callbackUrl: "/demo",
          })
    
          */
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            console.log('Wrong password.');
          } else {
            console.log(errorMessage);
          }
        });
    })


  }
  React.useEffect(() => {

    const jsonInit = JSON.stringify({ lang: 'en' })
    const jsonStr = (typeof (localStorage) !== "undefined" ? (localStorage.getItem('prefs') || jsonInit) : jsonInit);
    const json = (typeof (JSON) !== "undefined") ? JSON.parse(jsonStr) : { lang: 'en' };
    const { lang } = json;
    setLang(lang)
    initEmulator();
  }, []);
  const translate = React.useMemo(() => {
    return {
      h1: t('auth.h1', { lng: lang }),
      h2: t('auth.h2', { lng: lang }),
      h3: t('auth.h3', { lng: lang }),
      h4: t('auth.h4', { lng: lang }),
      h5: t('auth.h5', { lng: lang })
    }
  }, [lang])

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than
              ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      <div className="text-center mx-auto min-h-screen  my-auto flex flex-col justify-center space-y-6 items-center
      xs:w-[350px] x2s:w-[350px] x3s:w-[270px] x2s:min-h-screen xs:min-h-screen xs:items-center x2s:items-center x3s:items-center

      ">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {translate.h1}
          </h1>
          <p className="text-sm text-muted-foreground">
            {translate.h2}
          </p>
        </div>
        <div className={"grid gap-6 w-full"}>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  ref={emailRef}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  ref={passwordRef}
                  id="password"
                  placeholder="********"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button disabled={isLoading} onClick={() => {
                signin()
              }}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {translate.h3}
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {translate.h4}
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center">

            <Button variant="outline" type="button" className="w-[75%]" onClick={() => {
              router.push('/auth/signup')
            }}>
              {translate.h5}
            </Button>

          </div>

        </div>
      </div>

    </div>
  )
}
