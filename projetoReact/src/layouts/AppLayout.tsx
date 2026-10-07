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
  Box,
  TextInput,
} from '@mantine/core';
import { Cart as BsCart, Shop as BsShop, FilePersonFill as FilePersonFill, Speedometer2 as BsSpeedometer2, BoxArrowInRight as BsBoxArrowInRight, Search as BsSearch, FilePerson } from 'react-bootstrap-icons';
import { NavLink, Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

// Gradientes de fundo por rota da loja (Outlet)
const ROUTE_BACKGROUNDS: { match: (path: string) => boolean; background: string }[] = [
  {
    // Catálogo
    match: (p) => p === '/',
    background: 'conic-gradient(from 45deg at 50% 50%, #33CCFF, #FFFFFF, #FFCC33, #66FF66, #33CCFF)',
  },
  {
    // Detalhe do produto: halos suaves azul e âmbar sobre base clara
    match: (p) => p.startsWith('/produtos/'),
    background:
      'radial-gradient(circle at 0% 0%, #a5d8ff 0%, transparent 45%), ' +
      'radial-gradient(circle at 100% 100%, #ffe8a3 0%, transparent 50%), ' +
      'linear-gradient(135deg, #f1f8ff 0%, #ffffff 50%, #fffaf0 100%)',
  },
  {
    // Carrinho: menta, ciano e lavanda
    match: (p) => p.startsWith('/carrinho'),
    background: 'conic-gradient(from 210deg at 70% 30%, #b2f2bb, #ffffff, #99e9f2, #e5dbff, #b2f2bb)',
  },
  {
    // Login: azul profundo para claro, destacando o card branco
    match: (p) => p.startsWith('/login'),
    background: 'linear-gradient(160deg, #1971c2 0%, #4dabf7 45%, #e7f5ff 100%)',
  },
];

const getRouteBackground = (pathname: string) =>
  ROUTE_BACKGROUNDS.find((r) => r.match(pathname))?.background ?? '#f8f9fa';

export const AppLayout: React.FC = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    // Se não está no catálogo nem no carrinho, redireciona para o catálogo já buscando
    if (location.pathname !== '/' && location.pathname !== '/carrinho') {
      if (val) {
        navigate(`/?q=${encodeURIComponent(val)}`);
      } else {
        navigate('/');
      }
      return;
    }

    if (val) {
      searchParams.set('q', val);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <AppShell
      header={{ height: { base: 60, md: 70 } }}
      footer={{ height: { base: 40, md: 60 } }}
      padding="0"
      styles={{
        main: {
          backgroundColor: '#f8f9fa',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <AppShell.Header>
        <Container fluid px="md" h="100%">
          <Group justify="space-between" h="100%" wrap="nowrap" gap="xs">
            {/* Logo */}
            <Group
              wrap="nowrap"
              gap="0"
              align='center'
              justify='baseline'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => navigate('/')}
            >
              <ActionIcon variant="transparent" color="blue.3" size="lg" radius="md">
                <BsShop size={22} />
              </ActionIcon>
              <Box visibleFrom="xs" mt={4}>
                <Text fw={600}
                  size="md" c="blue.4" lh={1.1} component="span">
                  The Goods Market
                </Text>
              </Box>
            </Group>

            {/* Global Search Bar */}
            <TextInput
              placeholder={location.pathname === '/carrinho' ? "Buscar no carrinho..." : "Buscar produtos..."}
              leftSection={<BsSearch size={16} />}
              value={searchParams.get('q') || ''}
              onChange={handleSearchChange}
              style={{ flex: 1, maxWidth: 400 }}
              size="sm"
              radius="xl"
            />

            {/* Navigation links */}
            <Group gap="sm" wrap="nowrap">

              {isAuthenticated && (
                <NavLink
                  to="/carrinho"
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? 'var(--mantine-primary-color-filled)' : '#495057',
                    fontWeight: isActive ? 700 : 500,
                    padding: '8px 14px',
                    borderRadius: '16px',

                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  })}
                >
                  <BsCart size={18} />
                  <Text component="span" visibleFrom="md">Carrinho</Text>
                  {totalItems > 0 && (
                    <Badge color="red" size="sm" circle>
                      {totalItems}
                    </Badge>
                  )}
                </NavLink>
              )}

            </Group>

            {/* User auth action */}
            <Group gap="xs" wrap="nowrap">
              {isAuthenticated && user ? (
                <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                    <Button
                      variant="transparent"
                      bg="transparent"
                      value={user.username.slice(0, 2).toUpperCase()}
                    >
                      <Avatar
                        alt={user.username}
                        radius="xl"
                        size="md"
                        bg='transparent'
                      >
                      </Avatar>
                      <Text fw={600} >
                        {user.username.slice(0, 2).toUpperCase()}
                      </Text>
                    </Button>

                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Conectado como {user.username}</Menu.Label>
                    <Menu.Item
                      leftSection={<BsSpeedometer2 size={14} />}
                      onClick={() => navigate('/admin')}
                    >
                      Perfil
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red.1"
                      leftSection={<FilePersonFill size={14} />}
                      onClick={handleLogout}
                    >
                      Sair da Conta
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <>
                  <ActionIcon
                    variant="filled"
                    color="blue.3"
                    size="lg"
                    radius="md"
                    onClick={() => navigate('/login')}
                    hiddenFrom="md"
                    aria-label="Entrar"
                  >
                    <FilePerson size={18} />
                  </ActionIcon>

                  <Button
                    variant="filled"
                    color="blue.3"
                    size="sm"
                    leftSection={<BsBoxArrowInRight size={16} />}
                    onClick={() => navigate('/login')}
                    visibleFrom="md"
                  >
                    Entrar
                  </Button>
                </>
              )}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main
        style={{
          background: getRouteBackground(location.pathname),
          backgroundAttachment: 'fixed',
        }}
      >
        <Container fluid px={{ base: 'xs', sm: 'md', lg: 'lg' }} py="xs" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </Container>
      </AppShell.Main>

      <AppShell.Footer>
        <Container fluid px="md" h="100%">
          <Group justify="space-between" align="center" h="100%" wrap="nowrap">
            <Text size="xs" c="dimmed" visibleFrom="md">
              © {new Date().getFullYear()} UTFPR — Especialização em Engenharia de Software.
            </Text>
            <Group gap="md" wrap="nowrap">
              <Text size="xs" c="dimmed" visibleFrom="md">
                Dados fornecidos por DummyJSON API
              </Text>
              <Text size="xs" fw={600} c="blue.6">
                React + Mantine + CI/CD
              </Text>
            </Group>
          </Group>
        </Container>
      </AppShell.Footer>
    </AppShell >
  );
};

export default AppLayout;
