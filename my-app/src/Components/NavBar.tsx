import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    localStorage.removeItem("user"); // Clear user
    window.location.reload(); // Optionally refresh or redirect
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
    
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">ReactDocs</span>
        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <a href="#getting-started" className="hover:text-blue-600">Getting Started</a>
          <a href="#components" className="hover:text-blue-600">Components</a>
          <a href="#hooks" className="hover:text-blue-600">Hooks</a>
          <a href="#faq" className="hover:text-blue-600">FAQ</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Search Bar  */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md pl-9 pr-3 py-1.5 text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
          </div>

          
          <button
            onClick={handleSignOut}
            className="text-sm text-red-600 hover:underline"
          >
            Sign Out
          </button>
        </div>

        
      </div>

      
    </nav>
  );
};

export default NavBar;
