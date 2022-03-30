/* eslint-disable jsx-a11y/label-has-associated-control */
import { Stepper, Center, Select, Box, TextInput, Textarea, Button, Group, Text } from '@mantine/core';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';

const affiliates = [
    { value: 'roundRock', label: 'Round Rock Express' },
];

const addresses = [
    { value: '10101 W. Parmer Lane. Austin, TX 78717 #1616', label: '10101 W. Parmer Lane. Austin, TX 78717 #1616' },
    { value: '9400 W Parmer Lane. Austin, TX 78717 #932', label: '9400 W Parmer Lane. Austin, TX 78717 #932' },
    { value: '9400 W Parmer Lane. Austin, TX 78717 #1838', label: '9400 W Parmer Lane. Austin, TX 78717 #1838' },
    { value: '14199 N. Interstate Highway 35, Pflugerville, TX 78660 #03102', label: '14199 N. Interstate Highway 35, Pflugerville, TX 78660 #03102' },
    { value: '10101 W. Parmer Lane. Austin, TX 78717 #1335', label: '10101 W. Parmer Lane. Austin, TX 78717 #1335' },
    { value: '4301 Grand Ave Parkway. Austin, TX 78728 #1806', label: '4301 Grand Ave Parkway. Austin, TX 78728 #1806' },
    { value: '1316 Town Center Drive. Pflugerville, TX 78660 #1501', label: '1316 Town Center Drive. Pflugerville, TX 78660 #1501' },
    { value: '14199 N. Interstate Highway 35, Pflugerville, TX 78660 #12102', label: '14199 N. Interstate Highway 35, Pflugerville, TX 78660 #12102' },
    { value: '1316 Town Center Drive. Pflugerville, TX 78660 #102', label: '1316 Town Center Drive. Pflugerville, TX 78660 #102' },
    { value: '14199 N. Interstate Highway 35, Pflugerville, TX 78660 #07102', label: '14199 N. Interstate Highway 35, Pflugerville, TX 78660 #07102' },
];

const issues = [
    { value: 'move', label: 'Move In/Out' },
    { value: 'maintenance', label: 'Maintenance Issue' },
];

interface Props {
    language: string | null,
    setLanguage: React.Dispatch<React.SetStateAction<string | null>>,
}

const StepForm = ({ language, setLanguage }: Props) => {
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
            email: '' as string,
            message: '' as string,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            phone: (value) => (value.length < 10 ? 'Please Enter Valid Phone Number' : null),
            message: (value) => (value.length < 2 ? 'Please give us sufficient information about your issue' : null),
        },
    });

    const onSubmit = async () => {
              const res = await fetch('/api/sendgrid', {
                body: JSON.stringify({
                  affiliate: form.values.affiliate,
                  address: form.values.address,
                  issue: form.values.issue,
                  name: form.values.name,
                  phone: form.values.phone,
                  email: form.values.email,
                  message: form.values.message,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              });
              console.log('res', res);
              if (res.ok) {
                  nextStep();
              }
              const { error } = await res.json();
              if (error) {
                console.log(error);
              }
            };

  return (
    <>
        <form onSubmit={form.onSubmit(onSubmit)} name="desktopContactForm" method="POST" data-netlify="true" action="/" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="desktopContactForm" />
            <p hidden>
                <label>
                    Don’t fill this out: <input name="bot-field" />
                </label>
            </p>
            <Stepper active={active} onStepClick={setActive} breakpoint="sm" size="lg" orientation="horizontal">
                <Stepper.Step label={language === 'English' ? 'Language' : 'Idioma'} description={language === 'English' ? 'Select A Language' : 'Selecciona Un Idioma'}>
                    <Center>
                        <Select
                          size="lg"
                          name="language"
                          value={language}
                          label={language === 'English' ? 'Select A Language/Idioma' : 'Selecciona Un Idioma'}
                          placeholder="Pick one"
                          data={['English', 'Spanish']}
                          sx={{ width: '40%', padding: '3%' }}
                          onChange={e => setLanguage(e)}
                        />
                    </Center>
                </Stepper.Step>
            <Stepper.Step label={language === 'English' ? 'Affiliate' : 'Equipo'} description={language === 'English' ? 'Select A Language' : 'Selecciona Un Equipo'}>
                <Center>
                <Select
                  {...form.getInputProps('affiliate')}
                  size="lg"
                  label={language === 'English' ? 'Select Your Affiliate' : 'Selecciona Tu Equipo'}
                  placeholder={language === 'English' ? 'Select Your Affiliate' : 'Selecciona Tu Equipo'}
                  data={affiliates}
                  sx={{ width: '40%', padding: '3%' }}
                  name="affiliate"
                />
                </Center>
            </Stepper.Step>

            <Stepper.Step label={language === 'English' ? 'Address' : 'Dirección'} description={language === 'English' ? 'Select Your Address' : 'Selecciona Un Dirección'}>
                <Center>
                <Select
                  {...form.getInputProps('address')}
                  size="lg"
                  label={language === 'English' ? 'Select Your Address' : 'Selecciona Un Dirección'}
                  placeholder={language === 'English' ? 'Select Your Address' : 'Selecciona Un Dirección'}
                  data={addresses}
                  sx={{ width: '40%', padding: '3%' }}
                  required
                  name="address"
                />
                </Center>
            </Stepper.Step>

            <Stepper.Step label={language === 'English' ? 'Issue' : 'Consulta'} description={language === 'English' ? 'Select Your Issue' : 'Selecciona Una Consulta'}>
                <Center>
                <Select
                  {...form.getInputProps('issue')}
                  label={language === 'English' ? 'Select Your Issue' : 'Selecciona Una Consulta'}
                  placeholder={language === 'English' ? 'Select Your Issue' : 'Selecciona Una Consulta'}
                  size="lg"
                  data={issues}
                  sx={{ width: '40%', padding: '3%' }}
                  required
                  name="issue"
                />
                </Center>
            </Stepper.Step>

            <Stepper.Step label={language === 'English' ? 'Contact' : 'Contacto'} description={language === 'English' ? 'Give us more info' : 'Danos más información'}>
                <Center>
                <Box sx={{ width: '70%' }}>
                <TextInput
                  {...form.getInputProps('name')}
                  label={language === 'English' ? 'Full Name' : 'Nombre Completa'}
                  placeholder={language === 'English' ? 'Full Name' : 'Nombre Completa'}
                  size="md"
                  required
                  name="name"
                />
                <TextInput
                  size="md"
                  {...form.getInputProps('phone')}
                  label={language === 'English' ? 'Phone Number' : 'Numero De Telefono'}
                  placeholder={language === 'English' ? 'Phone Number' : 'Numbero De Telefono'}
                  required
                  name="phone"
                />
                <TextInput
                  size="md"
                  {...form.getInputProps('email')}
                  label={language === 'English' ? 'Email' : 'Email'}
                  placeholder={language === 'English' ? 'Email' : 'Email'}
                  name="email"
                />
                <Textarea
                  size="md"
                  {...form.getInputProps('message')}
                  label={language === 'English' ? 'More Info' : 'Mas Informacion'}
                  placeholder={language === 'English' ? 'Tell us more about your inquiry...' : 'Danos más información sobre tu consulta'}
                  required
                  name="message"
                />
                </Box>
                </Center>
            </Stepper.Step>
            <Stepper.Completed>
                <Center sx={{ paddingTop: '5%', paddingBottom: '5%' }}>
                    <Text sx={{ fontSize: 24, fontWeight: 600 }}>
                        {language === 'English' ? 'Thank you, we are getting to work on your issue now!' : '¡Gracias, nos estamos poniendo a trabajar en su problema ahora!'}
                    </Text>
                </Center>
            </Stepper.Completed>
            </Stepper>

            {active < 5 &&
            <Group position="center" mt="xl">
            {active >= 1 && <Button size="md" variant="default" onClick={prevStep}> {language === 'English' ? 'Back' : 'Atrás'} </Button>}
            {active <= 3 && <Button size="md" onClick={nextStep}>{language === 'English' ? 'Next Step' : 'Próximo Paso'}</Button> }
            {active === 4 && <Button name="submitButton" type="submit" size="md">{language === 'English' ? 'Submit' : 'Enviar'}</Button>}
            </Group>
            }
        </form>
    </>
  );
};

export default StepForm;
