import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, NormalizeCSS, Container } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Farmhand Living</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width maximum-scale=1" />
      </Head>

      <MantineProvider
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}
      >
        <Container size="xl">
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </Container>
        <NormalizeCSS />
      </MantineProvider>
    </>
  );
}
