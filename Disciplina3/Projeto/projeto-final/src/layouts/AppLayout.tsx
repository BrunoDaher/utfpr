import React from 'react';
import {
  AppShell,
  Container,
  Group,
  Text,
  Button,
  Badge,
  ActionIcon,
  Menu,
  Avatar,
} from '@mantine/core';
import {
  IconShoppingCart,
  IconBuildingStore,
  IconLogout,
  IconDashboard,
  IconLogin,
} from '@tabler/icons-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const AppLayout: React.FC = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppShell
      header={{ height: 70 }}
      footer={{ height: 60 }}
      padding="md"
      styles={{
        main: {
          backgroundColor: '#f8f9fa',
          minHeight: 'calc(100vh - 130px)',
        },
      }}
    >
      <AppShell.Header px="md">
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            {/* Logo */}
            <Group
              gap="xs"
              style={{ cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => navigate('/')}
            >
              <ActionIcon variant="filled" color="indigo" size="lg" radius="md">
                <IconBuildingStore size={22} />
              </ActionIcon>
              <div>
                <Text fw={800} size="lg" c="indigo.8" lh={1.1}>
                  UTFPR Store
                </Text>
                <Text size="xs" c="dimmed">
                  React + TypeScript + Mantine
                </Text>
              </div>
            </Group>

            {/* Navigation links */}
            <Group gap="sm">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#4c6ef5' : '#495057',
                  fontWeight: isActive ? 700 : 500,
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: isActive ? '#edf2ff' : 'transparent',
                  transition: 'all 0.2s',
                })}
              >
                Catálogo
              </NavLink>

              <NavLink
                to="/carrinho"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#4c6ef5' : '#495057',
                  fontWeight: isActive ? 700 : 500,
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: isActive ? '#edf2ff' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                })}
              >
                <IconShoppingCart size={18} />
                <span>Carrinho</span>
                {totalItems > 0 && (
                  <Badge color="red" size="sm" circle>
                    {totalItems}
                  </Badge>
                )}
              </NavLink>

              <NavLink
                to="/admin"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#4c6ef5' : '#495057',
                  fontWeight: isActive ? 700 : 500,
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: isActive ? '#edf2ff' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                })}
              >
                <IconDashboard size={18} />
                <span>Painel Admin</span>
              </NavLink>
            </Group>

            {/* User auth action */}
            <Group gap="xs">
              {isAuthenticated && user ? (
                <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                    <Button
                      variant="subtle"
                      color="gray"
                      leftSection={
                        <Avatar
                          src={user.image}
                          alt={user.username}
                          radius="xl"
                          size="sm"
                          color="indigo"
                        >
                          {user.username.slice(0, 2).toUpperCase()}
                        </Avatar>
                      }
                    >
                      <Text size="sm" fw={600}>
                        {user.firstName ? `${user.firstName}` : user.username}
                      </Text>
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Conectado como {user.username}</Menu.Label>
                    <Menu.Item
                      leftSection={<IconDashboard size={14} />}
                      onClick={() => navigate('/admin')}
                    >
                      Área Administrativa
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red"
                      leftSection={<IconLogout size={14} />}
                      onClick={handleLogout}
                    >
                      Sair da Conta
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button
                  variant="filled"
                  color="indigo"
                  size="sm"
                  leftSection={<IconLogin size={16} />}
                  onClick={() => navigate('/login')}
                >
                  Entrar
                </Button>
              )}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="md">
          <Outlet />
        </Container>
      </AppShell.Main>

      <AppShell.Footer px="md">
        <Container size="xl" h="100%">
          <Group justify="space-between" align="center" h="100%">
            <Text size="xs" c="dimmed">
              © {new Date().getFullYear()} UTFPR — Especialização em Engenharia de Software.
            </Text>
            <Group gap="md">
              <Text size="xs" c="dimmed">
                Dados fornecidos por DummyJSON API
              </Text>
              <Text size="xs" fw={600} c="indigo">
                React + Mantine + CI/CD
              </Text>
            </Group>
          </Group>
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
};

export default AppLayout;
