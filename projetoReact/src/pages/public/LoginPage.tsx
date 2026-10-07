import React, { useState } from 'react';
import {
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Stack,
  Alert,
  Group,
  Badge,
  Code,
  Box,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { ExclamationCircle as BsExclamationCircle, Stars as BsStars, PersonCircle as BsPerson } from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginPayloadSchema, LoginPayload } from '../../schemas/auth.schema';
import { useAuth } from '../../hooks/useAuth';
import { notifications } from '@mantine/notifications';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redirection target from protected route
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  const form = useForm<LoginPayload>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(loginPayloadSchema),
  });

  const handleSubmit = async (values: LoginPayload) => {
    setErrorMessage(null);
    try {
      await login(values);
      notifications.show({
        title: 'Bem-vindo de volta!',
        message: 'Login realizado com sucesso. Acesso à área administrativa liberado.',
        color: 'teal',
      });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      const msg =
        errObj?.response?.data?.message ||
        errObj?.message ||
        'Credenciais inválidas. Tente novamente.';
      setErrorMessage(msg);
    }
  };

  const fillDemoCredentials = () => {
    form.setFieldValue('username', 'avat');
    form.setFieldValue('password', 'avatpass');
  };

  return (
    <Center py={40}>
      <Box style={{ width: '100%', maxWidth: 440 }}>
        <Paper p="xl" radius="xl" withBorder shadow="md">
          <Stack gap="md">
            <Box style={{ textAlign: 'center' }}>
              <Title order={2} c="green.8">
                <BsPerson size={16} />
                Login
              </Title>
              <Text c="green.4" size="md" mt={4} fw={600}>
                Area administrativa
              </Text>
            </Box>

            {errorMessage && (
              <Alert icon={<BsExclamationCircle size={16} />} title="Falha ao Entrar" color="red">
                {errorMessage}
              </Alert>
            )}

            <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  placeholder="Username"
                  radius="md"
                  size="md"
                  variant="filled"
                  required
                  {...form.getInputProps('username')}
                />

                <PasswordInput
                  placeholder="Password"
                  radius="md"
                  size="md"
                  variant="filled"
                  required
                  {...form.getInputProps('password')}
                />

                <Button type="submit" color="blue.4" radius="xl" size="md" fullWidth loading={isLoading} mt="sm">
                  Entrar
                </Button>
              </Stack>
            </form>

            {/* Demo Credentials Box */}
            <Paper p="sm" radius="md" bg="blue.1" withBorder style={{ borderColor: '#e9ecef', marginTop: 16 }}>
              <Group justify="space-between" mb={6}>
                <Group gap={6}>
                  <BsStars size={16} color="var(--mantine-color-blue-6)" />
                  <Text size="xs" fw={700} c="dark.7">
                    Credenciais de Demonstração
                  </Text>
                </Group>
                <Badge
                  size="xs"
                  color="blue.4"
                  variant="filled"
                  style={{ cursor: 'pointer' }}
                  onClick={fillDemoCredentials}
                >
                  Preencher
                </Badge>
              </Group>

              <Text size="xs" c="dark.6" mb={4}>
                Usuário: <Code color="gray">avat</Code> | Senha:{' '}
                <Code color="gray">avatpass</Code>
              </Text>
              <Text size="xs" c="dimmed">
                Clique em "Preencher" para inserir os dados.
              </Text>
            </Paper>
          </Stack>
        </Paper>
      </Box>
    </Center>
  );
};

export default LoginPage;
