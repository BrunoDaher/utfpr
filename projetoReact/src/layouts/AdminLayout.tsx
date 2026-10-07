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
import { Shop as BsShop, BoxSeam as BsBoxSeam, BoxArrowRight as BsBoxArrowRight, ArrowLeft as BsArrowLeft, Shield as BsShield } from 'react-bootstrap-icons';
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
      header={{ height: { base: 60, md: 70 } }}
      navbar={{ width: 260, breakpoint: 'md', collapsed: { mobile: true } }}
      padding="md"
      styles={{
        main: {
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <AppShell.Header px="md" bg="white" style={{ borderBottom: '1px solid #e9ecef' }}>
        <Group justify="space-between" h="100%" wrap="nowrap">
          <Group gap="xs" wrap="nowrap">
            <ActionIcon variant="filled" color="green" size="md" radius="md">
              <BsShield size={20} />
            </ActionIcon>
            <div>
              <Text fw={800} size="sm" c="dark.8">
                Product Management
              </Text>
              <Text size="xs" c="dimmed" visibleFrom="sm">
                Dashboard
              </Text>
            </div>
          </Group>

          <Group gap="sm" wrap="nowrap">
            <ActionIcon
              variant="default"
              size="md"
              onClick={() => navigate('/')}
              hiddenFrom="sm"
            >
              <BsArrowLeft size={16} />
            </ActionIcon>
            <Button
              variant="default"
              size="xs"
              leftSection={<BsArrowLeft size={14} />}
              onClick={() => navigate('/')}
              visibleFrom="sm"
            >
              Voltar à Loja
            </Button>

            {user && (
              <Group gap="xs" wrap="nowrap">
                <Avatar src={user.image} alt={user.username} radius="xl" size="sm" color="indigo" />
                <Text size="xs" fw={600} visibleFrom="sm" c="dark.8">
                  {user.firstName || user.username}
                </Text>

                <ActionIcon
                  variant="subtle"
                  color="red"
                  size="md"
                  onClick={handleLogout}
                  hiddenFrom="sm"
                >
                  <BsBoxArrowRight size={16} />
                </ActionIcon>
                <Button
                  variant="subtle"
                  color="red"
                  size="xs"
                  leftSection={<BsBoxArrowRight size={14} />}
                  onClick={handleLogout}
                  visibleFrom="sm"
                >
                  Sair
                </Button>
              </Group>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" bg="#545b77" style={{ borderRight: 'none' }}>
        <Stack justify="space-between" h="100%">
          <Stack gap="xs">
            <Text size="xs" fw={700} c="gray.4" tt="uppercase" mb="sm">
              Navegação Interna
            </Text>

            <NavLink to="/admin" end style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <MantineNavLink
                  label="Gestão de Produtos"
                  leftSection={<BsBoxSeam size={18} />}
                  active={isActive}
                  color="indigo"
                  variant="filled"
                  component="div"
                  c={isActive ? 'white' : 'gray.3'}
                  style={{ borderRadius: '12px' }}
                />
              )}
            </NavLink>

            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <MantineNavLink
                label="Ver Loja Pública"
                leftSection={<BsShop size={18} />}
                component="div"
                c="gray.3"
                style={{ borderRadius: '12px' }}
              />
            </NavLink>
          </Stack>

          <Box p="xs" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Text size="xs" c="gray.4">
              Autenticado via JWT
            </Text>
          </Box>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container fluid px="xs" py="xs" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Outlet />
          </Box>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
