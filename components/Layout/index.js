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

export default function AppShellDemo({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          border: 'none',
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
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
  );
}