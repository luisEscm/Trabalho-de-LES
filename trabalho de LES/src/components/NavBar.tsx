import { User } from '../App';
import { 
  AcademicCapIcon, 
  BellIcon, 
  ArrowRightOnRectangleIcon, 
  Squares2X2Icon, 
  BookOpenIcon, 
  DocumentTextIcon, 
  TrophyIcon,
  Bars3Icon,
  XMarkIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

interface NavBarProps {
  user: User;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  onNotificationsClick: () => void;
  hasUnread?: boolean;
}

export function NavBar({ user, currentView, onViewChange, onLogout, onNotificationsClick, hasUnread }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Squares2X2Icon },
    { id: 'oportunidades', label: 'Oportunidades', icon: BookOpenIcon },
    { id: 'comunidade', label: 'Comunidade', icon: UsersIcon },
    ...(user.role === 'discente' ? [
      { id: 'solicitacoes', label: 'Solicitações', icon: DocumentTextIcon },
      { id: 'certificados', label: 'Certificados', icon: TrophyIcon },
    ] : user.role === 'docente' ? [
      { id: 'certificados', label: 'Certificação', icon: TrophyIcon },
    ] : [
      { id: 'solicitacoes', label: 'Análise de Solicitações', icon: DocumentTextIcon },
      { id: 'certificados', label: 'Certificação', icon: TrophyIcon },
    ]),
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Sistema de Extensão</h1>
              <p className="text-xs text-gray-600">
                {user.nome} - {
                  user.role === 'discente' ? 'Discente' : 
                  user.role === 'docente' ? 'Docente' : 
                  'Coordenação'
                }
              </p>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNotificationsClick}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <BellIcon className="w-5 h-5" />
              {hasUnread && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Sair</span>
            </button>

            {/* Botão Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}