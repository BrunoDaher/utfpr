import type { PropertyCardProps } from '../components/PropertyCard'

export type PropertyMock = Omit<PropertyCardProps, 'children'> & { id: string }

export const propertiesMock: PropertyMock[] = [
  {
    id: '1',
    title: 'Aconchegante Apartamento Jardins',
    location: 'São Paulo, SP',
    pricePerNight: 350,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    tags: ['WiFi', 'Cozinha Completa', 'Estacionamento', 'Ar Condicionado'],
  },
  {
    id: '2',
    title: 'Casa de Campo em Campos',
    location: 'Ubatuba, SP',
    pricePerNight: 350,
    imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    tags: ['WiFi', 'Cozinha Completa', 'Estacionamento', 'Ar Condicionado'],
  },
  {
    id: '3',
    title: 'Loft Moderno Vila Izabel',
    location: 'Curitiba, PR',
    pricePerNight: 350,
    imageUrl: 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9mdHxlbnwwfHwwfHx8Mg%3D%3D',
    isAvailable: false,
    tags: ['WiFi', 'Cozinha Completa', 'Estacionamento', 'Ar Condicionado'],
  },
  {
    id: '4',
    title: 'Refúgio na Mata Atlântica',
    location: 'Ubatuba, SP',
    pricePerNight: 350,
    imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isAvailable: false,
    tags: ['WiFi', 'Cozinha Completa', 'Estacionamento', 'Ar Condicionado'],
  },
  {
    id: '5',
    title: 'Loft Moderno Vila Olímpia',
    location: 'São Paulo, SP',
    pricePerNight: 350,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    tags: ['WiFi', 'Cozinha Completa', 'Estacionamento', 'Ar Condicionado'],
  },
  {
    id: '6',
    title: 'Casa Couto Pereira',
    location: 'Curitiba, PR',
    pricePerNight: 350,
    imageUrl: 'https://images.unsplash.com/photo-1569834381479-174cc179ada0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFycmFjb3xlbnwwfHwwfHx8Mg%3D%3D',
    isAvailable: true,
    tags: ['WiFi', 'Cozinha Completa', 'Estacionamento', 'Ar Condicionado'],
  },
  {
    id: '7',
    title: 'Aconchegante Apartamento',
    location: 'São Paulo, SP',
    pricePerNight: 350,
    imageUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isAvailable: false,
    tags: ['WiFi', 'Cozinha Completa', 'Estacionamento', 'Ar Condicionado'],
  },
  {
    id: '8',
    title: 'Casa de Campo em Campos',
    location: 'São Paulo, SP',
    pricePerNight: 350,
    imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isAvailable: false,
    tags: ['WiFi', 'Cozinha Completa', 'Estacionamento', 'Ar Condicionado'],
  }
]
