import React from 'react';
import {
  AppShell,
  Container,
  Group,
  Text,
  Button,
  Avatar,
  Stack,
  NavLink as MantineNavLink,
  ActionIcon,
  Box,
} from '@mantine/core';
import {
  IconBuildingStore,
  IconPackage,
  IconLogout,
  IconArrowLeft,
  IconShield,
} from '@tabler/icons-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{ width: 260, breakpoint: 'sm' }}
      padding="md"
      styles={{
        main: {
          backgroundColor: '#f1f3f5',
          minHeight: 'calc(100vh - 65px)',
        },
      }}
    >
      <AppShell.Header px="md">
        <Group justify="space-between" h="100%">
          <Group gap="xs">
            <ActionIcon variant="filled" color="dark" size="lg" radius="md">
              <IconShield size={22} />
            </ActionIcon>
            <div>
              <Text fw={800} size="md" c="dark.8">
                Painel Administrativo
              </Text>
              <Text size="xs" c="dimmed">
                Gestão de Estoque e Catálogo
              </Text>
            </div>
          </Group>

          <Group gap="sm">
            <Button
              variant="default"
              size="xs"
              leftSection={<IconArrowLeft size={14} />}
              onClick={() => navigate('/')}
            >
              Voltar à Loja Pública
            </Button>

            {user && (
              <Group gap="xs">
                <Avatar src={user.image} alt={user.username} radius="xl" size="sm" color="indigo" />
                <Text size="xs" fw={600}>
                  {user.firstName || user.username}
                </Text>
                <Button
                  variant="subtle"
                  color="red"
                  size="xs"
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </Group>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack justify="space-between" h="100%">
          <Stack gap="xs">
            <Text size="xs" fw={700} c="dimmed" tt="uppercase">
              Navegação Interna
            </Text>

            <NavLink to="/admin" end style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <MantineNavLink
                  label="Gestão de Produtos"
                  leftSection={<IconPackage size={18} />}
                  active={isActive}
                  color="indigo"
                  variant="light"
                  component="div"
                />
              )}
            </NavLink>

            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <MantineNavLink
                label="Ver Loja Pública"
                leftSection={<IconBuildingStore size={18} />}
                component="div"
              />
            </NavLink>
          </Stack>

          <Box p="xs" style={{ borderTop: '1px solid #dee2e6' }}>
            <Text size="xs" c="dimmed">
              Autenticado via JWT DummyJSON
            </Text>
          </Box>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl" py="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
