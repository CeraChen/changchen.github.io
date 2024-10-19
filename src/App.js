import EntryPage from './page/entry';
import { Route, Routes } from 'react-router-dom';
import './css/App.css';

function App() {
  return (
    <Routes>
      {/* <Route  path='/changchen.github.io/' element = {<EntryPage />} /> */}
      <Route  path='/' element = {<EntryPage />} />
  </Routes>
  );
}

export default App;
