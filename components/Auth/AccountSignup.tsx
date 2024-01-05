import {
  Box,
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
} from '@mantine/core';
import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { appColors } from '../SharedComponents/Color';
import HermoneyLogo from '../IconComponents/HermoneyLogo';
import IconEmail from '../IconComponents/IconEmail';
import IconAddress from '../IconComponents/IconAddress';
import IconPhone from '../IconComponents/IconPhone';
import HeadTitle from '../HeaderTitle';
import { ResponseAlertIndicatorModal, Wrapper } from '@/styles';
import IconClose from '../IconComponents/IconClose';
import IconClock from '../IconComponents/IconClock';
import IconPointer from '../IconComponents/IconPointer';

const pattern = /^(0?[89][01]|0?70)\d{0,8}$/;
const registrationSchema = z.object({
  registrationNumber: z.string().min(5, { message: 'Please enter your registration number' }),
  emailAddress: z.string().email({ message: 'Invalid email address' }),
  organizationName: z.string().min(5, {
    message: 'Your organization name should be at least 5 letters',
  }),
  address: z.string().min(1, { message: 'Please enter address' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .min(10, 'Phone number should be at least 10 characters long')
    .regex(pattern, 'Please enter a valid phone number'),
});
type RegistrationSchema = z.infer<typeof registrationSchema>;
const AccountSignup = () => {
  const { control, handleSubmit, formState } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    criteriaMode: 'all',
  });
  const [openModal, setModalClose] = useState(false);
  const { errors } = formState;
  const handleRegister = async (data: RegistrationSchema) => {
    setModalClose(true);
    console.log(data);
  };

  return (
    <Box>
      <HeadTitle title="Onboarding" />
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
                  Onboard your Organisation
                </Text>
                <Text fz={rem(16)} fw={400} c={appColors.textGray}>
                  Create your account here
                </Text>
              </Stack>
              <Box component="form" onSubmit={handleSubmit((data) => handleRegister(data))}>
                <Stack gap={24} mb={rem(32)}>
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
                    name="registrationNumber"
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        label="RC No"
                        placeholder="Enter RC No"
                        error={errors.registrationNumber?.message}
                      />
                    )}
                    control={control}
                  />
                  <Controller
                    name="emailAddress"
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        label="Email Address"
                        placeholder="Enter Email Address"
                        rightSection={<IconEmail />}
                        error={errors.emailAddress?.message}
                      />
                    )}
                    control={control}
                  />
                  <Controller
                    name="phoneNumber"
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        rightSection={<IconPhone />}
                        error={errors.phoneNumber?.message}
                      />
                    )}
                    control={control}
                  />
                  <Controller
                    name="address"
                    render={({ field }) => (
                      <TextInput
                        label="Addrress"
                        {...field}
                        placeholder="Enter Addrress"
                        error={errors.address?.message}
                        rightSection={<IconAddress />}
                      />
                    )}
                    control={control}
                  />
                </Stack>
                <Button type="submit" style={{ borderRadius: 1000 }} fullWidth mb={40}>
                  Next
                </Button>
                <Flex align="center" columnGap={8} mb={40}>
                  <Text fw={400} fz={rem(14)} c={appColors.labelBlack}>
                    Already have an account?{' '}
                  </Text>
                  <Anchor
                    href="/auth/login"
                    component="a"
                    fw={500}
                    fz={rem(14)}
                    c={appColors.blueAccent}
                  >
                    Log In
                  </Anchor>
                </Flex>
              </Box>
            </Box>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }} display={{ base: 'none', md: 'block' }}>
          <ScrollArea h="100vh" bg={appColors.purpleBlue}>
            <Box pt={rem(190)} px={rem(53)} pb={rem(96)} pos="relative">
              <Image src="/Image/OnboardingImage.svg" loading="lazy" />
              <Box mt={rem(64)}>
                <Text
                  fw={800}
                  fz={rem(42)}
                  ta="center"
                  mb={8}
                  style={{ color: appColors.white }}
                  lh="42px"
                >
                  Igniting Financial Freedom
                </Text>
                <Text
                  fw={500}
                  fz={rem(16)}
                  ta="center"
                  mb={8}
                  style={{ color: appColors.white }}
                  lh="24px"
                >
                  We empower you to gain confidence, knowledge and control over your finances,
                  achieving lifelong financialb security
                </Text>
              </Box>
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
            <IconClock />
            <Text mt={rem(20)} fw={700} fz={rem(18)} c={appColors.darkText}>
              Account creation pending
            </Text>
            <Text fw={400} fz={rem(14)} ta="center" mb={rem(32)} mt={rem(8)}>
              Approval email has been set to your email address, click on the link to log in to your
              account
            </Text>
            <Button style={{ borderRadius: 1000, width: rem(175) }}>Proceed</Button>
          </Flex>
        </Wrapper>
      </ResponseAlertIndicatorModal>
    </Box>
  );
};

export default AccountSignup;
