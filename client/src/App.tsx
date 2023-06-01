import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
  );
}

export default App;
