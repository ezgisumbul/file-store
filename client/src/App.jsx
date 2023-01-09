import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/index';
import Navbar from './components/navbar/index';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileContext from './context/file';
import { useEffect, useState } from 'react';
import { loadFiles } from './services/api';

const App = () => {
  // context is used for the fileList and setList to be used
  // throughout the app and prevent prop drilling
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    loadFiles().then((files) => {
      setFileList(files.data);
    });
  }, []);

  return (
    <FileContext.Provider value={{ fileList, setFileList }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </FileContext.Provider>
  );
};

export default App;
