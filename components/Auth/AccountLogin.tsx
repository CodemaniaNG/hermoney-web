import {
  Grid,
  TextInput,
  Image,
  rem,
  Text,
  ScrollArea,
  Stack,
  Button,
  Flex,
  Anchor,
  PasswordInput,
  Box,
} from '@mantine/core';
import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { appColors } from '../SharedComponents/Color';
import HermoneyLogo from '../IconComponents/HermoneyLogo';
import HeadTitle from '../HeaderTitle';
import { ResponseAlertIndicatorModal, Wrapper } from '@/styles';
import IconClose from '../IconComponents/IconClose';
import IconLady from '../IconComponents/IconLady';
import IconPointer from '../IconComponents/IconPointer';

const registrationSchema = z.object({
  password: z.string().min(1, { message: 'Password must be at least 1 characters' }),
  organizationName: z.string().min(5, {
    message: 'Your organization name should be at least 5 letters',
  }),
});
type RegistrationSchema = z.infer<typeof registrationSchema>;
const AccountLogin = () => {
  const { control, handleSubmit, formState } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    criteriaMode: 'all',
  });
  const [openModal, setModalClose] = useState(false);
  const { errors } = formState;
  const handleRegister = async (data: RegistrationSchema) => {
    console.log(data);
    setModalClose(true);
  };
  return (
    <Box>
      <HeadTitle title="Login" />
      <Grid>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <ScrollArea h="100vh" bg={appColors.white}>
            <Box
              px={{ base: rem(24), md: rem(67) }}
              mt={{ base: rem(28), md: rem(38) }}
              mb={{ base: rem(67), md: rem(119) }}
            >
              <Anchor href="/">
                <HermoneyLogo />
              </Anchor>
            </Box>

            <Box
              pl={{ base: rem(35), sm: rem(64), md: rem(67), lg: rem(162) }}
              pr={{ base: rem(50), sm: rem(77), md: rem(67), lg: rem(162) }}
              pos="relative"
            >
              <Box
                pos="absolute"
                right={{ base: rem(50), sm: rem(77), md: rem(67), lg: rem(162) }}
                top={rem(-40)}
              >
                <IconPointer />
              </Box>
              <Stack gap={2} mb={rem(32)}>
                <Text fz={{ base: rem(24), md: rem(28) }} fw={800}>
                  Log In
                </Text>
                <Text fz={rem(16)} fw={400} c={appColors.textGray}>
                  Enter your credentials to access your account
                </Text>
              </Stack>
              <form onSubmit={handleSubmit((data) => handleRegister(data))}>
                <Stack gap={24} mb={rem(24)}>
                  <Controller
                    name="organizationName"
                    render={({ field }) => (
                      <TextInput
                        label="Organization Name"
                        {...field}
                        placeholder="Enter Organization Name"
                        error={errors.organizationName?.message}
                      />
                    )}
                    control={control}
                  />
                  <Controller
                    name="password"
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        label="Password"
                        placeholder="Enter your password here"
                        error={errors.password?.message}
                      />
                    )}
                    control={control}
                  />
                </Stack>
                <Flex justify="flex-end" mb={rem(32)}>
                  <Anchor
                    href="/auth/forget-password"
                    component="a"
                    fw={500}
                    fz={rem(14)}
                    c={appColors.blueAccent}
                  >
                    Forgot Password?
                  </Anchor>
                </Flex>
                <Button type="submit" style={{ borderRadius: 1000 }} fullWidth mb={40}>
                  Log in
                </Button>
                <Flex align="center" columnGap={8} mb={40}>
                  <Text fw={400} fz={rem(14)} c={appColors.labelBlack}>
                    Are you new here?{' '}
                  </Text>
                  <Anchor
                    href="/auth/onboarding/registration"
                    component="a"
                    fw={500}
                    fz={rem(14)}
                    c={appColors.blueAccent}
                  >
                    Create Account
                  </Anchor>
                </Flex>
              </form>
            </Box>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }} display={{ base: 'none', md: 'block' }}>
          <ScrollArea h="100vh" bg={appColors.purpleBlue}>
            <Box pt={rem(205)} px={rem(53)} pb={rem(147)}>
              <Text
                fw={900}
                fz={rem(32)}
                ta="center"
                style={{ color: appColors.white }}
                lh="42px"
                mb={rem(78)}
              >
                Welcome Back!
              </Text>
              <Image src="/Image/OnboardingImage.svg" loading="lazy" />
            </Box>
          </ScrollArea>
        </Grid.Col>
      </Grid>
      <ResponseAlertIndicatorModal
        opened={openModal}
        onClose={() => setModalClose(false)}
        centered
        withCloseButton={false}
        title={
          <Flex justify="space-between" align="center" w="100%">
            <Box style={{ visibility: 'hidden' }}>Title</Box>
            <IconClose onclick={() => setModalClose(false)} />
          </Flex>
        }
        transitionProps={{
          transition: 'fade',
          duration: 500,
          timingFunction: 'linear',
        }}
      >
        <Wrapper>
          <Flex direction="column" align="center">
            <IconLady />
            <Text mt={rem(20)} fw={700} fz={rem(18)} c={appColors.darkText}>
              Kindly change your password
            </Text>
            <Text fw={400} fz={rem(14)} ta="center" c={appColors.darkGray} mb={rem(32)} mt={rem(8)}>
              Due to security reasons kindly change your password, this activity occurs every 30
              days
            </Text>
            <Button style={{ borderRadius: 1000 }}>Change password</Button>
          </Flex>
        </Wrapper>
      </ResponseAlertIndicatorModal>
    </Box>
  );
};

export default AccountLogin;
