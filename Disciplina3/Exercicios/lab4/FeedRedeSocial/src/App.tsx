import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, createTheme, AppShell } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Header } from './components/Header';
import { FeedPage } from './pages/FeedPage';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
});

export function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" zIndex={1000} />
      <BrowserRouter>
        <AppShell header={{ height: 60 }} padding="md">
          <AppShell.Header>
            <Header />
          </AppShell.Header>
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Navigate to="/feed" replace />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="*" element={<Navigate to="/feed" replace />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
