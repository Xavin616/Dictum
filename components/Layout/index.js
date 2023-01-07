import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { FooterSocial } from './Footer';
import { HeaderMegaMenu } from './Header';
import Head from 'next/head';

export default function AppShellDemo({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Head>
        <title>Dictum: Cover Letter Generator</title>
        <meta property="og:title" content="Dictum AI Assistant" />
        <meta property="og:url" content="https://dictum-production.up.railway.app/cover-letter" />
        <meta property="og:description" content="Generate the best cover letters and essays" />
        <meta property="og:image” itemprop=“image” content=“https://cdn.cp.adobe.io/content/2/dcx/ed87c3d0-db06-428c-9cde-997533dfd069/rendition/preview.jpg/version/1/format/jpg/dimension/width/size/1200" />
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <AppShell
        styles={{
          main: {
            border: 'none',
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white,
          },
        }}
        footer={
          <FooterSocial />
        }
        header={
          <HeaderMegaMenu/>
        }
      >
        {children}
      </AppShell>
    </>
  );
}