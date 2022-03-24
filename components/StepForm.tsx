import { Stepper, Center, Select, Box, TextInput, Textarea, Button, Group } from '@mantine/core';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';

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
            message: '' as string,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            phone: (value) => (value.length < 10 ? 'Please Enter Valid Phone Number' : null),
            message: (value) => (value.length < 2 ? 'Please give us sufficient information about your problem' : null),
        },
    });

  return (
    <>
        <form onSubmit={form.onSubmit(nextStep)}>
            <Stepper active={active} onStepClick={setActive} breakpoint="sm" size="lg" orientation="horizontal">
                <Stepper.Step label="Language" description="Select A Language">
                    <Center>
                        <Select
                          name="language"
                          value={language}
                          label="Select Your Language"
                          placeholder="Pick one"
                          data={['English', 'Spanish']}
                          sx={{ width: '40%', padding: '3%' }}
                          onChange={e => setLanguage(e)}
                        />
                    </Center>
                </Stepper.Step>
            <Stepper.Step label="Affiliate" description="Select Your Affiliate">
                <Center>
                <Select
                  size="lg"
                  label="Select Your Affiliate"
                  placeholder="Pick one"
                  data={affiliates}
                  sx={{ width: '40%', padding: '3%' }}
                  required

                />
                </Center>
            </Stepper.Step>

            <Stepper.Step label="Address" description="Select Your Address">
                <Center>
                <Select
                  size="lg"
                  label="Select Your Address"
                  searchable
                  placeholder="Pick one"
                  data={addresses}
                  sx={{ width: '40%', padding: '3%' }}
                  required

                />
                </Center>
            </Stepper.Step>

            <Stepper.Step label="Issue" description="Select You Issue">
                <Center>
                <Select
                  size="lg"
                  label="Select Your Issue"
                  placeholder="Pick one"
                  data={issues}
                  sx={{ width: '40%', padding: '3%' }}
                  required
                />
                </Center>
            </Stepper.Step>

            <Stepper.Step label="Contact" description="Give us more info">
                <Center>
                <Box sx={{ width: '70%' }}>
                <TextInput
                  size="lg"
                  placeholder="Your name"
                  label="Full Name"
                  required

                />
                <TextInput
                  size="lg"
                  placeholder="Phone Number"
                  label="Phone"
                  required

                />
                <Textarea
                  size="lg"
                  placeholder="Tell us more about your problem..."
                  label="More Info"
                  required
                />
                </Box>
                </Center>
            </Stepper.Step>
            <Stepper.Completed>
                <Center sx={{ paddingTop: '5%', paddingBottom: '5%' }}>
                    Thank you for your submission!
                </Center>
            </Stepper.Completed>
            </Stepper>

            {active < 5 &&
            <Group position="center" mt="xl">
            {active >= 1 && <Button size="lg" variant="default" onClick={prevStep}>Back</Button>}
            {active <= 3 && <Button size="lg" onClick={nextStep}>Next step</Button> }
            {active === 4 && <Button size="lg" type="submit">Submit</Button>}
            </Group>
            }
        </form>
    </>
  );
};

export default StepForm;
