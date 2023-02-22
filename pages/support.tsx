/* eslint-disable no-console */
import React, { useState } from 'react';
import { Box, MediaQuery, Text, Center } from '@mantine/core';
import SVG from '../components/svg';
import SimpleForm from '../components/SimpleForm';

const welcomeMessage = {
  english: 'Welcome to the Player Help Portal',
  spanish: 'Bienvenido al Portal de Ayuda',
};

export default function Support() {
  const [language, setLanguage] = useState<string | null>('English');

  return (
    <>
    {/* mobile logo */}
    <MediaQuery
      largerThan="sm"
      styles={{ display: 'none' }}
    >
      <Center pt={30} pb={10}>
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
      <Center pt={30} pb={10}>
          <SVG.Logo
            fill="white"
            style={{ width: '30%' }}
          />
      </Center>
    </MediaQuery>

      <MediaQuery
        smallerThan="sm"
        styles={{ display: 'none' }}
      >
        <Box>
          <SimpleForm />
        </Box>
      </MediaQuery>

      <MediaQuery
        largerThan="sm"
        styles={{ display: 'none' }}
      >
        <Box>
        <SimpleForm />
        </Box>
      </MediaQuery>

    </>
  );
}
