import { 
  AcademicCapIcon, 
  MagnifyingGlassIcon, 
  TrophyIcon, 
  InformationCircleIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

interface NavBarPublicaProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onLoginClick: () => void;
}

export function NavBarPublica({ currentView, onViewChange, onLoginClick }: NavBarPublicaProps) {
  const menuItems = [
    { id: 'oportunidades', label: 'Oportunidades', icon: MagnifyingGlassIcon },
    { id: 'certificados', label: 'Certificados', icon: TrophyIcon },
    { id: 'sobre', label: 'Sobre', icon: InformationCircleIcon },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Sistema de Extensão</h1>
              <p className="text-xs text-gray-600">Portal Público</p>
            </div>
          </div>

          {/* Menu de Navegação */}
          <div className="flex items-center gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
            
            {/* Botão de Login */}
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors ml-2"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span className="hidden md:inline">Entrar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}