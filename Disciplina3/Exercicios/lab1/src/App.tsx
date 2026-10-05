import './App.css'
import PropertyCard from './components/PropertyCard'
import cssMod from './components/PropertyCard.module.css'
import { propertiesMock } from './mocks/properties'

function App() {
  return (
    <>
      <header className="header" style={{ alignContent: "center" }}>
        <div className="brand flex">
          <img src="/favicon.svg" alt="" width="35px" height="35px" />
          <span>Get Home</span>
        </div>
        <nav className="nav">
          <a href="#">Catálogo</a>
          <a href="#">Reservas</a>
        </nav>
      </header>

      <div className={`appContainer ${cssMod.fundoMain}`}>
        <main className={`propertyGrid`}>
          {propertiesMock.map((property) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              location={property.location}
              pricePerNight={property.pricePerNight}
              imageUrl={property.imageUrl}
              isAvailable={property.isAvailable}
              tags={property.tags}
            >
              {property.isAvailable ? (
                <button className="btn-primary" onClick={() => alert(`Reserva solicitada para ${property.title}!`)}>
                  Solicitar Reserva
                </button>
              ) : (
                <button className="btn-secondary" onClick={() => alert(`Você entrou na lista de espera para ${property.title}.`)}>
                  Entrar na Lista de Espera
                </button>
              )}
            </PropertyCard>
          ))}
        </main>
      </div>
    </>
  )
}

export default App
