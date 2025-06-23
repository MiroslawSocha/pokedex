import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Pokedex from "./pages/Pokedex/Pokedex";
import Pokemon from "./pages/Pokemon/Pokemon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
