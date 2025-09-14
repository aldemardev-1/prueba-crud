
const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
        <nav>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
            Inicio
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;