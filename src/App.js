import WeatherMain from './components/WeatherMain';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WeatherMain />} />
      </Routes>
    </div>
  );
}

export default App;
