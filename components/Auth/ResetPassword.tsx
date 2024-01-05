import {
  Grid,
  Image,
  rem,
  Text,
  ScrollArea,
  Stack,
  Button,
  Flex,
  PasswordInput,
  Box,
  Anchor,
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
import IconResetPasswordLady from '../IconComponents/IconResetPasswordLady';

const registrationSchema = z
  .object({
    previousPassword: z.string().min(1, { message: 'Password must be at least 1 characters' }),
    newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
type RegistrationSchema = z.infer<typeof registrationSchema>;
const ResetPassword = () => {
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
      <HeadTitle title="Reset Password" />
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
              <Stack gap={2} mb={rem(32)}>
                <Text fz={{ base: rem(24), md: rem(28) }} fw={800}>
                  Reset Password
                </Text>
                <Text fz={rem(16)} fw={400} c={appColors.textGray}>
                  Enter your credentials to access your account
                </Text>
              </Stack>
              <form onSubmit={handleSubmit((data) => handleRegister(data))}>
                <Stack gap={24} mb={rem(32)}>
                  <Controller
                    name="previousPassword"
                    render={({ field }) => (
                      <PasswordInput
                        label="Previous Password"
                        {...field}
                        placeholder="Enter Previous Password"
                        error={errors.previousPassword?.message}
                      />
                    )}
                    control={control}
                  />
                  <Controller
                    name="newPassword"
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        label="New Password"
                        placeholder="Enter New Password"
                        error={errors.newPassword?.message}
                      />
                    )}
                    control={control}
                  />
                  <Controller
                    name="confirmPassword"
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        label="Confirm Password"
                        placeholder="Enter your Confirm Password"
                        error={errors.confirmPassword?.message}
                      />
                    )}
                    control={control}
                  />
                </Stack>

                <Button type="submit" style={{ borderRadius: 1000 }} fullWidth mb={40}>
                  Confirm
                </Button>
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
                Reset Password
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
            <IconResetPasswordLady />
            <Text mt={rem(20)} fw={700} fz={rem(18)} c={appColors.darkText}>
              Password changed successfully
            </Text>
            <Text fw={400} fz={rem(14)} ta="center" c={appColors.darkGray} mb={rem(32)} mt={rem(8)}>
              User password has been updated, click on the proceed to login button to access your
              account
            </Text>
            <Button style={{ borderRadius: 1000 }}>Proceed to login</Button>
          </Flex>
        </Wrapper>
      </ResponseAlertIndicatorModal>
    </Box>
  );
};

export default ResetPassword;
