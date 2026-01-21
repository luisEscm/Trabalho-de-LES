import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { DashboardDiscente } from './components/DashboardDiscente';
import { DashboardCoordenador } from './components/DashboardCoordenador';
import { DashboardDocente } from './components/DashboardDocente';
import { PortalOportunidades } from './components/PortalOportunidades';
import { GestaoSolicitacoes } from './components/GestaoSolicitacoes';
import { Certificados } from './components/Certificados';
import { Comunidade } from './components/Comunidade';
import { NavBar } from './components/NavBar';
import { NotificacoesPanel, Notificacao } from './components/NotificacoesPanel';
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
  
  // Novos estados para notificações
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  // Dados mockados de notificações
  const notificacoesDiscente: Notificacao[] = [
    {
      id: 1,
      tipo: 'sucesso',
      titulo: 'Certificado Disponível',
      mensagem: 'O certificado do "Desenvolvimento Web para ONGs" está disponível para download.',
      data: '30/11/2024 14:30',
      lida: false
    },
    {
      id: 2,
      tipo: 'alerta',
      titulo: 'Solicitação Indeferida',
      mensagem: 'Sua solicitação de "Curso de Cloud Computing" foi indeferida. Você tem 5 dias para ajustar e reenviar.',
      data: '29/11/2024 10:15',
      lida: false
    },
    {
      id: 3,
      tipo: 'sucesso',
      titulo: 'Inscrição Aprovada',
      mensagem: 'Sua inscrição no "Hackathon de Inovação Social" foi aprovada!',
      data: '28/11/2024 16:45',
      lida: true
    },
    {
      id: 4,
      tipo: 'info',
      titulo: 'Nova Oportunidade',
      mensagem: 'Nova oportunidade disponível: "Programação Python para Jovens" - 30 vagas abertas.',
      data: '27/11/2024 09:00',
      lida: true
    },
    {
      id: 5,
      tipo: 'alerta',
      titulo: 'Atenção ao Prazo',
      mensagem: 'Faltam apenas 30 horas para completar sua meta de extensão deste semestre.',
      data: '26/11/2024 11:20',
      lida: true
    }
  ];

  const notificacoesCoordenacao: Notificacao[] = [
    {
      id: 1,
      tipo: 'alerta',
      titulo: 'Prazo Crítico',
      mensagem: 'Solicitação de Pedro Oliveira vence em 2 dias. Análise pendente.',
      data: '30/11/2024 15:00',
      lida: false
    },
    {
      id: 2,
      tipo: 'info',
      titulo: 'Nova Solicitação',
      mensagem: 'Lucas Ferreira enviou uma nova solicitação de aproveitamento de 16 horas.',
      data: '30/11/2024 13:20',
      lida: false
    },
    {
      id: 3,
      tipo: 'info',
      titulo: 'Nova Inscrição',
      mensagem: 'Nova inscrição no "Projeto Saúde da Família" - 5 vagas restantes.',
      data: '29/11/2024 14:30',
      lida: false
    },
    {
      id: 4,
      tipo: 'alerta',
      titulo: 'Alunos em Risco',
      mensagem: '85 alunos estão com menos de 50% da carga horária necessária.',
      data: '28/11/2024 10:00',
      lida: true
    },
    {
      id: 5,
      tipo: 'sucesso',
      titulo: 'Meta Alcançada',
      mensagem: '115 alunos completaram a carga horária mínima neste semestre.',
      data: '27/11/2024 16:45',
      lida: true
    }
  ];

  // Carregar notificações corretas quando o usuário logar
  useEffect(() => {
    if (user) {
      const listaInicial = user.role === 'discente' ? notificacoesDiscente : notificacoesCoordenacao;
      setNotificacoes(listaInicial);
      setHasUnreadNotifications(listaInicial.some(n => !n.lida));
    }
  }, [user]);

  // Função para fechar e marcar como lidas
  const handleCloseNotifications = () => {
    setShowNotifications(false);
    // Marca todas como lidas ao fechar o painel
    setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
  };

  const handleToggleNotifications = () => {
    if (showNotifications) {
      // Se estava aberto e vai fechar, marca como lidas
      handleCloseNotifications();
    } else {
      // Se vai abrir, apenas remove a bolinha global da NavBar
      setShowNotifications(true);
      setHasUnreadNotifications(false);
    }
  };

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
        onNotificationsClick={handleToggleNotifications}
        hasUnread={hasUnreadNotifications}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>

      {showNotifications && (
        <NotificacoesPanel
          user={user}
          notificacoes={notificacoes}
          onClose={handleCloseNotifications}
        />
      )}
      
      {/* <Toaster /> */}
    </div>
  );
}