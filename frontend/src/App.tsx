import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './styles/theme';
import { MainPage, ClientPage, HostPage } from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/live" element={<ClientPage />} />
          <Route path="/live/:id" element={<ClientPage />} />

          <Route path="/host" element={<HostPage />} />
          <Route path="/host/:id" element={<HostPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
