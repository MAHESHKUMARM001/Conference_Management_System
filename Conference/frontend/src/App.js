import './App.css';
import Home001 from './components/Home001';
import Upload1 from './components/Upload';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import AllDocuments from './components/AllDocuments';
import DocumentDetail from './components/DocumentDetail';
import Profile001 from './components/Profile001';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home001 />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/' element={<Login />} />
          
          <Route path='/upload' element={ <Upload1 /> } />
          <Route path='/documents' element={ <AllDocuments /> } />
          <Route path='/document/:id' element={ <DocumentDetail /> } />
          <Route path='/profile' element={ <Profile001 /> } />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
