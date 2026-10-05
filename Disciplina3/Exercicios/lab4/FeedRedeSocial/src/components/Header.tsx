import { Container, Group, Text, Badge, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconBrandTwitter, IconSun, IconMoon } from '@tabler/icons-react';

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <header
      style={{
        borderBottom: '1px solid var(--mantine-color-default-border)',
        backgroundColor: 'var(--mantine-color-body)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container size="md" py="sm">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <ActionIcon variant="filled" size="lg" radius="md" color="blue">
              <IconBrandTwitter size={20} />
            </ActionIcon>
            <div>
              <Text fw={700} size="lg" style={{ lineHeight: 1.2 }}>
                SocialFeed
              </Text>
              <Text size="xs" c="dimmed">
                UTFPR • Laboratório 4
              </Text>
            </div>
          </Group>

          <Group gap="sm">
            <Badge variant="dot" color="teal">
              JSONPlaceholder API
            </Badge>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size="lg"
              radius="md"
              aria-label="Alternar tema"
            >
              {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </header>
  );
}

export default Header;
