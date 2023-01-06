import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import Layout from '../components/Layout';
import { NotificationsProvider } from '@mantine/notifications';

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          cyan: ["#652B19", "#7B341E", "#9C4221", "#C05621", "#DD6B20", "#ED8936", "#F6AD55", "#FBD38D", "#FEEBC8", "#FFFAF0"]
        },
        primaryColor: 'orange',
        colorScheme: 'light'
      }}
      > 
      <NotificationsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationsProvider>
    </MantineProvider>
  )
}
