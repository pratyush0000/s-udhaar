import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Aboutus from './pages/aboutus';
import Home from './pages/home';
import Predict from './pages/predict';
import Error from './pages/error';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>} />
            <Route path='/home' element = {<Home/>}/>
            <Route path='/aboutus' element = {<Aboutus/>}/>
            <Route path='/predict' element = {<Predict/>}/>
            <Route path='*' element = {<Error/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App