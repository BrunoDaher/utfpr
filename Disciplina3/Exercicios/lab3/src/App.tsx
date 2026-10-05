import { useState } from 'react'
import { AppShell, Button, Card, Container, Group, Image, Pagination, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { cars } from './mocks/cars'

function AppLayout() {
  return (
    <AppShell
      header={{ height: 72 }}
      padding="md"
      styles={(theme) => ({
        main: {
          background: theme.colors.gray[0],
          minHeight: '100vh',
        },
      })}
    >
      <AppShell.Header>
        <Group h="100%" px="lg" justify="space-between">
          <Group gap="sm">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #1f6feb, #7c3aed)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
              }}
            >
              P
            </div>
            <Title order={3}>Premium Motors</Title>
          </Group>

          <Button component={Link} to="/" variant="light">
            Home
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

function HomePage() {
  const pageSize = 10
  const [activePage, setActivePage] = useState(1)
  const totalPages = Math.ceil(cars.length / pageSize)
  const currentCars = cars.slice((activePage - 1) * pageSize, activePage * pageSize)

  return (
    <Container py="xl">
      <Stack gap="lg">
        <Title order={1}>Catálogo de veículos</Title>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {currentCars.map((car) => (
            <Card key={car.id} shadow="sm" radius="md" withBorder p="lg">
              <Card.Section>
                <Image src={car.imageUrl} alt={car.name} height={180} fit="cover" />
              </Card.Section>

              <Stack gap="xs" mt="md">
                <Text fw={700} size="lg">{car.name}</Text>
                <Text c="dimmed">{car.brand}</Text>
                <Text fw={700} size="xl">R$ {car.price.toLocaleString('pt-BR')}</Text>
                <Text size="sm">{car.year} • {car.km.toLocaleString('pt-BR')} km • {car.category}</Text>
                <Button component={Link} to={`/carros/${car.id}`} mt="sm">
                  Ver Detalhes
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        <Group justify="center">
          <Pagination total={totalPages} value={activePage} onChange={setActivePage} />
        </Group>
      </Stack>
    </Container>
  )
}

function CarDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = cars.find((item) => item.id === id)

  if (!car) {
    return (
      <Container py="xl">
        <Stack gap="md">
          <Title order={2}>Veículo não encontrado</Title>
          <Button onClick={() => navigate(-1)}>Voltar ao Catálogo</Button>
        </Stack>
      </Container>
    )
  }

  return (
    <Container py="xl">
      <Stack gap="lg">
        <Button variant="light" onClick={() => navigate(-1)} style={{ alignSelf: 'flex-start' }}>
          Voltar ao Catálogo
        </Button>

        <Card withBorder radius="lg" p="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Image src={car.imageUrl} alt={car.name} radius="md" h={400} fit="cover" />

            <Stack gap="sm">
              <Text c="dimmed" tt="uppercase" fw={700}>{car.brand}</Text>
              <Title order={1}>{car.name}</Title>
              <Text fw={700} size="xl" c="blue.7">
                R$ {car.price.toLocaleString('pt-BR')}
              </Text>

              <Group gap="sm">
                <Text fw={600}>Ano: {car.year}</Text>
                <Text fw={600}>•</Text>
                <Text fw={600}>{car.km.toLocaleString('pt-BR')} km</Text>
                <Text fw={600}>•</Text>
                <Text fw={600}>{car.category}</Text>
              </Group>

              <Title order={3}>Ficha técnica</Title>
              <Stack gap={4}>
                {car.specs.map((spec) => (
                  <Text key={spec}>• {spec}</Text>
                ))}
              </Stack>
            </Stack>
          </SimpleGrid>
        </Card>
      </Stack>
    </Container>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/carros/:id" element={<CarDetailsPage />} />
      </Route>
    </Routes>
  )
}

export default App
