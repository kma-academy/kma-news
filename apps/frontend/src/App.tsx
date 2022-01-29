import React from 'react';
import './App.css';
import './grid.css';
import './index.css';
import { RootRouter } from './routes/Root';
function App() {
  return (
    <div className="App">
      <RootRouter />
    </div>
  );
}
export default App;
