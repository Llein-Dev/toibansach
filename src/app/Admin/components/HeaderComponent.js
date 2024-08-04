import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSearch, faSync, faUser } from '@fortawesome/free-solid-svg-icons';

export default function HeaderComponents({ title, description }) {

  return (
    <header className="sticky top-0 z-0 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  space-x-4">
          <button className="sm:hidden">
            <span className="sr-only">Toggle menu</span>
            <div className="lucide h-5 w-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-none tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <span className="sr-only">Notifications</span>
            <FontAwesomeIcon icon={faBell} className="lucide h-5 w-5" />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <span className="sr-only">Search</span>
            <FontAwesomeIcon icon={faSearch} className="lucide h-5 w-5" />
          </button>
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <span className="sr-only">User</span>
            <FontAwesomeIcon icon={faUser} className="lucide h-5 w-5" />
          </button>
        </div>
      </div>
      
    </header>
  );
}
