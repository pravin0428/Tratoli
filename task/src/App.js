import './App.css';
import Nav from './Components/Navbar';
import PokemonList from './Pages/PokemonList';

function App() {
  return (
    <div className="App">
      <Nav/>
      <PokemonList  />
    </div>
  );
}

export default App;
