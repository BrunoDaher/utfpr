import { ThemeProvider, useTheme } from './contexts/ThemeContext'

function Header() {
    //useState para armazenar o estado do tema, 
    // xuseEffect para atualizar o localStorage e o atributo data-theme do documento, useMemo para memorizar o valor do contexto e useContext para acessar o contexto do tema.
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Sistema de Preferências</p>
        <h1>Theme Global</h1>
      </div>

      <button className="theme-toggle" onClick={toggleTheme} type="button">
        {theme === 'light' ? '☀️ Claro' : '🌙 Escuro'}
      </button>
    </header>
  )
}

function ContentCard() {
  const { theme } = useTheme()

  return (
    <main className={`content-card ${theme}`}>
      <span className="tag">Tema ativo: {theme}</span>
      <h2>Bem-vindo ao laboratório</h2>
      <p>
        Esta interface reage ao contexto global do tema. Quando você alterna o estado, todos os
        componentes conectados ao provider refletem a mudança em tempo real.
      </p>
      <button type="button">Acessar painel</button>
    </main>
  )
}

function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <Header />
        <ContentCard />
      </div>
    </ThemeProvider>
  )
}

export default App
