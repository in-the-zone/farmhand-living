/* eslint-disable no-console */
import React, { useState } from 'react';
import Link from 'next/link'
import { Box, MediaQuery, Text, Center, Button } from '@mantine/core';
import SVG from '../components/svg';

const welcomeMessage = {
  english: 'Welcome to the Player Help Portal',
  spanish: 'Bienvenido al Portal de Ayuda',
};

export default function HomePage() {

  return (
    <>
      {/* mobile logo */}
      <MediaQuery
        largerThan="sm"
        styles={{ display: 'none' }}
      >
        <Center pt={'20%'} pb={10}>
          <SVG.Logo
            fill="white"
            style={{ width: '90%' }}
          />
        </Center>
      </MediaQuery>

      {/* desktop logo */}
      <MediaQuery
        smallerThan="sm"
        styles={{ display: 'none' }}
      >
        <Center pt={'10%'} pb={20}>
          <SVG.Logo
            fill="white"
            style={{ width: '50%' }}
          />
        </Center>
      </MediaQuery>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text
          sx={{
            fontSize: 24,
            fontWeight: 600,
            padding: '2% 2% 2% 2%',
            '@media (max-width: 755px)': {
              padding: '4% 2% 4% 2%',
              fontSize: 16
            },
          }}
        >
          Welcome to Farmhand Living
        </Text>
        <Box pt={20}>
          <Link href="/support">
            <Button size="xl">Support</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
