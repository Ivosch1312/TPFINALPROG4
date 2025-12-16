import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RutinasProvider } from './contexts/RutinasContext';
import Navbar from './components/Navbar';
import RutinasList from './components/RutinasList';
import RutinaForm from './components/RutinaForm';
import RutinaDetail from './components/RutinaDetail';
import './App.css';

function App() {
  return (
    <RutinasProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<RutinasList />} />
              <Route path="/rutinas/nueva" element={<RutinaForm />} />
              <Route path="/rutinas/:id/editar" element={<RutinaForm />} />
              <Route path="/rutinas/:id" element={<RutinaDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RutinasProvider>
  );
}

export default App;