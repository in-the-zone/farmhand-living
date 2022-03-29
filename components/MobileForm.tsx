/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Box, Button, Center, Group, RingProgress, Select, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const steps = [
    {
        step: 0,
        percentage: 0 as number,
        prompt: 'Select Language',
        spanish: 'Selecciona Un Idioma',
    },
    {
        step: 1,
        percentage: 20 as number,
        prompt: 'Select Affiliate',
        spanish: 'Selecciona Un Equipo',
    },
    {
        step: 2,
        percentage: 40 as number,
        prompt: 'Select Address',
        spanish: 'Selecciona Un Dirección',
    },
    {
        step: 3,
        percentage: 60 as number,
        prompt: 'Select Issue',
        spanish: 'Selecciona Una Consulta',
    },
    {
        step: 4,
        percentage: 80 as number,
        prompt: 'More Info',
        spanish: 'Mas Informacion',

    },
    {
        step: 5,
        percentage: 100 as number,
        prompt: 'Complete!',
        spanish: 'Completo!',
    },
];

const affiliates = [
    { value: 'fresno', label: 'Fresno Grizzlies' },
    { value: 'roundRock', label: 'Round Rock Express' },
];

const addresses = [
    { value: '123', label: '123 Fake Street' },
    { value: '456', label: '456 Imaginary Lane' },
];

const issues = [
    { value: 'move', label: 'Move In/Out' },
    { value: 'maintenance', label: 'Maintenance Issue' },
];

interface Props {
    language: string | null,
    setLanguage: React.Dispatch<React.SetStateAction<string | null>>,
}

const MobileForm = ({ language, setLanguage }: Props) => {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const form = useForm({
        initialValues: {
            affiliate: 'Round Rock' as string | null,
            address: '' as string | null,
            issue: '' as string | null,
            name: '' as string,
            phone: '' as string,
            message: '' as string,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            phone: (value) => (value.length < 10 ? 'Please Enter Valid Phone Number' : null),
            message: (value) => (value.length < 2 ? 'Please give us sufficient information about your issue' : null),
        },
    });

  return (
    <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '3% 0' }}>
                <RingProgress
                  size={100}
                  sections={[
                      { value: steps[active].percentage, color: '#68b5e8' },
                    ]}
                  label={
                        <Text color="blue" weight={700} align="center" size="lg">
                        {`${steps[active].percentage}%`}
                        </Text>
                    }
                  roundCaps
                />
                <Text color="blue" weight={700} align="center" size="xl" sx={{ paddingLeft: '3%' }}>
                    {language === 'English' ? steps[active].prompt : steps[active].spanish}
                </Text>
            </Box>

            <Center sx={active === 0 ? { display: 'block' } : { display: 'none' }}>
                <Box sx={{ height: '50%' }}>
                    <Select
                      name="language"
                      value={language}
                      label={language === 'English' ? 'Select A Language/Idioma' : 'Selecciona Un Idioma'}
                      placeholder="Pick one"
                      data={['English', 'Spanish']}
                      sx={{ width: '100%', padding: '10%' }}
                      onChange={e => setLanguage(e)}
                    />
                </Box>
            </Center>

        <form onSubmit={form.onSubmit(nextStep)} name="mobileContactForm" method="POST" data-netlify="true" action="/form-success" data-netlify-honeypot="bot-field">
            <p hidden>
                <label>
                    Don’t fill this out: <input name="bot-field" />
                </label>
            </p>
            <Center sx={active === 1 ? { display: 'block' } : { display: 'none' }}>
                <Box>
                    <Select
                      {...form.getInputProps('affiliate')}
                      label={language === 'English' ? 'Select Your Affiliate' : 'Selecciona Tu Equipo'}
                      placeholder={language === 'English' ? 'Select Your Affiliate' : 'Selecciona Tu Equipo'}
                      data={affiliates}
                      sx={{ width: '100%', padding: '10%' }}
                    />
                </Box>
            </Center>

            <Center sx={active === 2 ? { display: 'block' } : { display: 'none' }}>
                <Box>
                    <Select
                      {...form.getInputProps('address')}
                      label={language === 'English' ? 'Select Your Address' : 'Selecciona Un Dirección'}
                      placeholder={language === 'English' ? 'Select Your Address' : 'Selecciona Un Dirección'}
                      data={addresses}
                      sx={{ width: '100%', padding: '10%' }}
                    />
                </Box>
            </Center>

            <Center sx={active === 3 ? { display: 'block' } : { display: 'none' }}>
                <Box>
                    <Select
                      {...form.getInputProps('issue')}
                      label={language === 'English' ? 'Select Your Issue' : 'Selecciona Una Consulta'}
                      placeholder={language === 'English' ? 'Select Your Issue' : 'Selecciona Una Consulta'}
                      data={issues}
                      sx={{ width: '100%', padding: '10%' }}
                    />
                </Box>
            </Center>

            <Center sx={active === 4 ? { display: 'block' } : { display: 'none' }}>
            <Box sx={{ width: '100%' }}>
                <TextInput
                  {...form.getInputProps('name')}
                  label={language === 'English' ? 'Full Name' : 'Nombre Completa'}
                  placeholder={language === 'English' ? 'Full Name' : 'Nombre Completa'}
                  required
                />
                <TextInput
                  {...form.getInputProps('phone')}
                  label={language === 'English' ? 'Phone Number' : 'Numero De Telefono'}
                  placeholder={language === 'English' ? 'Phone Number' : 'Numbero De Telefono'}
                  required
                />
                <Textarea
                  {...form.getInputProps('message')}
                  label={language === 'English' ? 'More Info' : 'Mas Informacion'}
                  placeholder={language === 'English' ? 'Tell us more about your inquiry...' : 'Danos más información sobre tu consulta'}
                  required
                />
            </Box>
            </Center>

            <Center sx={active === 5 ? { display: 'block' } : { display: 'none' }}>
                <Box sx={{ width: '100%' }}>
                    <Center>
                        <Text
                          sx={{
                            fontSize: 24,
                            fontWeight: 600,
                            padding: '20% 2% 2% 2%',
                            '@media (max-width: 755px)': {
                            fontSize: 20,
                            textAlign: 'center' },
                        }}
                        >
                            {language === 'English' ? 'Thank you for your submission!' : 'Gracias Por Tu Envío'}
                        </Text>
                    </Center>
                </Box>
            </Center>

            {active < 5 &&
            <Group position="center" mt="xl">
            {active >= 1 && <Button size="md" variant="default" onClick={prevStep}> {language === 'English' ? 'Back' : 'Atrás'} </Button>}
            {active <= 3 && <Button size="md" onClick={nextStep}>{language === 'English' ? 'Next Step' : 'Próximo Paso'}</Button> }
            {active === 4 && <Button type="submit" size="md">{language === 'English' ? 'Submit' : 'Enviar'}</Button>}
            </Group>
            }
        </form>
    </Box>
  );
};

export default MobileForm;
