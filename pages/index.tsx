/* eslint-disable no-console */
import React, { useState } from 'react';
import { Box, MediaQuery, Text, Center } from '@mantine/core';
import StepForm from '../components/StepForm';
import MobileForm from '../components/MobileForm';
import SVG from '../components/svg';

const welcomeMessage = {
  english: 'Welcome to the Player Help Portal',
  spanish: 'Bienvenido al Portal de Ayuda',
};

export default function HomePage() {
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

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text
          sx={{
            fontSize: 24,
            fontWeight: 600,
            padding: '2% 2% 2% 2%',
            '@media (max-width: 755px)': {
              padding: '4% 2% 4% 2%',
              fontSize: 16 },
          }}
        >
            {language === 'English' ? welcomeMessage.english : welcomeMessage.spanish}
        </Text>
      </Box>

      <MediaQuery
        smallerThan="sm"
        styles={{ display: 'none' }}
      >
        <Box>
          <StepForm language={language} setLanguage={setLanguage} />
        </Box>
      </MediaQuery>

      <MediaQuery
        largerThan="sm"
        styles={{ display: 'none' }}
      >
        <Box>
          <MobileForm language={language} setLanguage={setLanguage} />
        </Box>
      </MediaQuery>

    </>
  );
}
