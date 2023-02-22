/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Box, Button, Center, Group, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const SimpleForm = () => {
    const [view, setView] = useState("form");

    const form = useForm({
        initialValues: {
            name: '' as string,
            phone: '' as string,
            email: '' as string,
            message: '' as string,
        },

        validate: {
            name: (value: string) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            phone: (value: string) => (value.length < 10 ? 'Please Enter Valid Phone Number' : null),
            message: (value: string) => (value.length < 2 ? 'Please give us sufficient information about your issue' : null),
        },
    });

        const onSubmit = async () => {
            const res = await fetch('/api/sendgrid', {
            body: JSON.stringify({
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
                setView("complete");
            }
            const { error } = await res.json();
            if (error) {
            console.log(error);
            }
        };

  return (
    <Stack sx={{padding: "0 5%"}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       {view === "form" && <Text
          sx={{
            fontSize: 24,
            fontWeight: 600,
            padding: '2% 2% 2% 2%',
            '@media (max-width: 755px)': {
              padding: '4% 2% 4% 2%',
              fontSize: 16 },
          }}
        >
            Welcome to the Player Help Portal
        </Text>}
      </Box>
        <form onSubmit={form.onSubmit(onSubmit)} >
            <Center sx={view === "form" ? { display: 'block' } : { display: 'none' }}>
            <Box sx={{ width: '100%' }}>
                <TextInput
                  {...form.getInputProps('name')}
                  label={ 'Full Name'}
                  placeholder={ 'Full Name'}
                  required
                  name="name"
                />
                <TextInput
                  {...form.getInputProps('phone')}
                  label={ 'Phone Number' }
                  placeholder={ 'Phone Number'}
                  required
                  name="phone"
                />
                <TextInput
                  {...form.getInputProps('email')}
                  label={ 'Email'}
                  placeholder={ 'Email'}
                  name="email"
                />
                <Textarea
                  {...form.getInputProps('message')}
                  label={ 'More Info' }
                  placeholder={ 'Tell us more...' }
                  required
                  name="message"
                />
            </Box>
            </Center>

            <Center sx={view === "complete" ? { display: 'block' } : { display: 'none' }}>
                <Box sx={{ width: '100%' }}>
                    <Center>
                        <Text
                          sx={{
                            fontSize: 24,
                            fontWeight: 600,
                            padding: '5% 2% 2% 2%',
                            '@media (max-width: 755px)': {
                            fontSize: 20,
                            textAlign: 'center' },
                        }}
                        >
                        { 'Message received. Thank you!'}
                        </Text>
                    </Center>
                </Box>
            </Center>
            <Center sx={view === "form" ? { display: 'block' } : { display: 'none' }} mt="xl">
                <Button name="submitButton" type="submit" size="md">{ 'Submit'}</Button>
            </Center>
        </form>
    </Stack>
  );
};

export default SimpleForm;
