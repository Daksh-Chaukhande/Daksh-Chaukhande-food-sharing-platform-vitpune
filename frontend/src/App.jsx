import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Dev1: Add your routes here */}
        <Route path="/" element={<div>Dev1: Home page coming soon!</div>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
