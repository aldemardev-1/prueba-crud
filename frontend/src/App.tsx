import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 font-sans antialiased">
        <Header />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<ProductList />} />
            {/* Aquí puedes agregar más rutas si lo necesitas */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;