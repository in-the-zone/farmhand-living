/* eslint-disable max-len */
import React, { useState } from 'react';
import { Box, Button, Center, Group, RingProgress, Select, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const steps = [
    {
        step: 0,
        percentage: 0 as number,
        prompt: 'Select Language',
    },
    {
        step: 1,
        percentage: 20 as number,
        prompt: 'Select Affiliate',
    },
    {
        step: 2,
        percentage: 40 as number,
        prompt: 'Select Address',
    },
    {
        step: 3,
        percentage: 60 as number,
        prompt: 'Select Issue',
    },
    {
        step: 4,
        percentage: 80 as number,
        prompt: 'More Info',
    },
    {
        step: 5,
        percentage: 100 as number,
        prompt: 'Complete!',
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
    const [active, setActive] = useState(4);
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
            message: (value) => (value.length < 2 ? 'Please give us sufficient information about your problem' : null),
        },
    });

  return (
    <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '3% 0' }}>
                <RingProgress
                  size={100}
                  sections={[
                      { value: `${steps[active].percentage}` as unknown as number, color: '#68b5e8' },
                    ]}
                  label={
                        <Text color="blue" weight={700} align="center" size="lg">
                        {`${steps[active].percentage}%`}
                        </Text>
                    }
                  roundCaps
                />
                <Text color="blue" weight={700} align="center" size="xl" sx={{ paddingLeft: '5%' }}>
                    {steps[active].prompt}
                </Text>
            </Box>

            <Center sx={active === 0 ? { display: 'block' } : { display: 'none' }}>
                <Box sx={{ height: '50%' }}>
                    <Select
                      name="language"
                      value={language}
                      label="Select Your Language"
                      placeholder="Pick one"
                      data={['English', 'Spanish']}
                      sx={{ width: '100%', padding: '10%' }}
                      onChange={e => setLanguage(e)}
                    />
                </Box>
            </Center>

        <form onSubmit={form.onSubmit(nextStep)}>
            <Center sx={active === 1 ? { display: 'block' } : { display: 'none' }}>
                <Box>
                    <Select
                      {...form.getInputProps('affiliate')}
                      label="Select Your Affiliate"
                      placeholder="Select Your Affiliate"
                      data={affiliates}
                      sx={{ width: '100%', padding: '10%' }}
                    />
                </Box>
            </Center>

            <Center sx={active === 2 ? { display: 'block' } : { display: 'none' }}>
                <Box>
                    <Select
                      {...form.getInputProps('address')}
                      label="Select Your Address"
                      placeholder="Pick one"
                      data={addresses}
                      sx={{ width: '100%', padding: '10%' }}
                    />
                </Box>
            </Center>

            <Center sx={active === 3 ? { display: 'block' } : { display: 'none' }}>
                <Box>
                    <Select
                      {...form.getInputProps('issue')}
                      label="Select Your Issue"
                      placeholder="Pick one"
                      data={issues}
                      sx={{ width: '100%', padding: '10%' }}
                    />
                </Box>
            </Center>

            <Center sx={active === 4 ? { display: 'block' } : { display: 'none' }}>
            <Box sx={{ width: '100%' }}>
                <TextInput
                  {...form.getInputProps('name')}
                  placeholder="Your name"
                  label="Full Name"
                  required
                />
                <TextInput
                  {...form.getInputProps('phone')}
                  placeholder="Phone Number"
                  label="Phone"
                  required
                />
                <Textarea
                  {...form.getInputProps('message')}
                  placeholder="Tell us more about your problem..."
                  label="More Info"
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
                        Input Recieved. Thank You!
                        </Text>
                    </Center>
                </Box>
            </Center>

            {active < 5 &&
            <Group position="center" mt="xl">
            {active >= 1 && <Button size="md" variant="default" onClick={prevStep}>Back</Button>}
            {active <= 3 && <Button size="md" onClick={nextStep}>Next step</Button> }
            {active === 4 && <Button type="submit" size="md">Submit</Button>}
            </Group>
            }
        </form>
    </Box>
  );
};

export default MobileForm;
