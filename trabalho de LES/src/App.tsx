import { useState } from 'react';
import { Login } from './components/Login';
import { DashboardDiscente } from './components/DashboardDiscente';
import { DashboardCoordenador } from './components/DashboardCoordenador';
import { DashboardDocente } from './components/DashboardDocente';
import { PortalOportunidades } from './components/PortalOportunidades';
import { GestaoSolicitacoes } from './components/GestaoSolicitacoes';
import { Certificados } from './components/Certificados';
import { Comunidade } from './components/Comunidade';
import { NavBar } from './components/NavBar';
import { NotificacoesPanel } from './components/NotificacoesPanel';
import { NavBarPublica } from './components/NavBarPublica';
import { PaginaOportunidadesPublica } from './components/PaginaOportunidadesPublica';
import { PaginaCertificadosPublica } from './components/PaginaCertificadosPublica';
import { PaginaSobre } from './components/PaginaSobre';
import { PaginaDetalhesOportunidadePublica } from './components/PaginaDetalhesOportunidadePublica';
// import { Toaster } from './components/ui/sonner';

export type UserRole = 'discente' | 'coordenador' | 'docente' | 'admin';

export interface User {
  id: string;
  nome: string;
  email: string;
  matricula: string;
  role: UserRole;
}

interface OportunidadePublica {
  id: number;
  titulo: string;
  descricao: string;
  modalidade: string;
  local: string;
  vagas: number;
  inscritos: number;
  periodo: string;
  cargaHoraria: number;
  responsavel: string;
  status: string;
}

type VisualizacaoMode = 'publica' | 'login' | 'autenticado';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('oportunidades');
  const [showNotifications, setShowNotifications] = useState(false);
  const [visualizacaoMode, setVisualizacaoMode] = useState<VisualizacaoMode>('publica');
  const [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<OportunidadePublica | null>(null);

  // Renderizar área pública
  if (visualizacaoMode === 'publica') {
    // Se há uma oportunidade selecionada, mostrar a página de detalhes
    if (oportunidadeSelecionada) {
      return (
        <div className="min-h-screen bg-gray-50">
          <NavBarPublica
            currentView={currentView}
            onViewChange={(view) => {
              setCurrentView(view);
              setOportunidadeSelecionada(null); // Limpa a oportunidade selecionada ao mudar de página
            }}
            onLoginClick={() => setVisualizacaoMode('login')}
          />
          
          <main className="container mx-auto px-4 py-8">
            <PaginaDetalhesOportunidadePublica
              oportunidade={oportunidadeSelecionada}
              onVoltar={() => setOportunidadeSelecionada(null)}
              onLoginClick={() => setVisualizacaoMode('login')}
            />
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="container mx-auto px-4 py-6">
              <div className="text-center text-gray-600 text-sm">
                <p>Sistema de Gestão de Extensão Universitária © 2024</p>
                <p className="mt-1">Desenvolvido para promover a integração universidade-comunidade</p>
              </div>
            </div>
          </footer>
        </div>
      );
    }

    const renderPublicView = () => {
      switch (currentView) {
        case 'oportunidades':
          return (
            <PaginaOportunidadesPublica 
              onLoginClick={() => setVisualizacaoMode('login')}
              onVerDetalhes={(oportunidade) => setOportunidadeSelecionada(oportunidade)}
            />
          );
        case 'certificados':
          return <PaginaCertificadosPublica />;
        case 'sobre':
          return <PaginaSobre onLoginClick={() => setVisualizacaoMode('login')} />;
        default:
          return (
            <PaginaOportunidadesPublica 
              onLoginClick={() => setVisualizacaoMode('login')}
              onVerDetalhes={(oportunidade) => setOportunidadeSelecionada(oportunidade)}
            />
          );
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <NavBarPublica
          currentView={currentView}
          onViewChange={setCurrentView}
          onLoginClick={() => setVisualizacaoMode('login')}
        />
        
        <main className="container mx-auto px-4 py-8">
          {renderPublicView()}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-600 text-sm">
              <p>Sistema de Gestão de Extensão Universitária © 2024</p>
              <p className="mt-1">Desenvolvido para promover a integração universidade-comunidade</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Renderizar tela de login
  if (visualizacaoMode === 'login' || !user) {
    return (
      <Login 
        onLogin={(user) => {
          setUser(user);
          setVisualizacaoMode('autenticado');
          setCurrentView('dashboard');
        }}
        onVoltar={() => setVisualizacaoMode('publica')}
      />
    );
  }

  // Renderizar área autenticada
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        if (user.role === 'discente') {
          return <DashboardDiscente user={user} />;
        } else if (user.role === 'docente') {
          return <DashboardDocente user={user} />;
        } else {
          return <DashboardCoordenador user={user} />;
        }
      case 'oportunidades':
        return <PortalOportunidades user={user} />;
      case 'solicitacoes':
        return <GestaoSolicitacoes user={user} />;
      case 'certificados':
        return <Certificados user={user} />;
      case 'comunidade':
        return <Comunidade user={user} />;
      default:
        if (user.role === 'discente') {
          return <DashboardDiscente user={user} />;
        } else if (user.role === 'docente') {
          return <DashboardDocente user={user} />;
        } else {
          return <DashboardCoordenador user={user} />;
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={() => {
          setUser(null);
          setVisualizacaoMode('publica');
          setCurrentView('oportunidades');
        }}
        onNotificationsClick={() => setShowNotifications(!showNotifications)}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>

      {showNotifications && (
        <NotificacoesPanel
          user={user}
          onClose={() => setShowNotifications(false)}
        />
      )}
      
      {/* <Toaster /> */}
    </div>
  );
}