import './App.css';
import { HOME } from './apiinterface';

function App() {

  const handleButtonClick = async () => {
    fetch(HOME, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "TEST"
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1>React & ASP.NET Core Demo</h1>
        <button onClick={handleButtonClick}>Fetch Data</button>
      </header>
    </div>
  );
}

export default App;
