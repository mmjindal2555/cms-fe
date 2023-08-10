import React from 'react';
import './App.css';
import Body from './components/Body/Body';
import { withSnackbar } from './components/Snackbar/Snackbar';

function App() {
  return (
    <div className="App">
      <Body></Body>
    </div>
  );
}

export default withSnackbar(App);
