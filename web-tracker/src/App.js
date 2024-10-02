import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import MapView from './components/MapView';
import Home from './components/Home';
import { CoordenadesContextProvider } from './context/CoordenadesContextProvider';

function App() {
  return (
    <>
    <CoordenadesContextProvider>
    <Router>
      <Routes>
        <Route path='/map' element={<MapView/>}>
        </Route>
        <Route path='/' element={<Home/>}>
        </Route>
      </Routes>
    </Router>
    </CoordenadesContextProvider>
    </>
  );
}

export default App;
