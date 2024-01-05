import { Anchor, Center, Group, Stack } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import HermoneyLogo from '@/components/IconComponents/HermoneyLogo';
import { appColors } from '@/components/SharedComponents/Color';

export default function Home() {
  return (
    <div>
      <Head>
        <title>HerMoney</title>
        <meta name="description" content="Plateumed Web Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center
        style={{
          backgroundColor: appColors.grayBackground,
          minHeight: '100vh',
        }}
      >
        <Stack>
          <div>
            <HermoneyLogo />
          </div>
          <div style={{ margin: 'auto' }}>
            <Group>
              <Link href="/auth/onboarding/registration" passHref>
                <Anchor size="lg" c="brand.5" component="p">
                  Register
                </Anchor>
              </Link>
            </Group>
          </div>
        </Stack>
      </Center>
    </div>
  );
}
