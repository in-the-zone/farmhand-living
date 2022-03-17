import { Title, Text } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <Title sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span">
            Farmhand Living
        </Text>
      </Title>
    </>
  );
}
