import { User } from '../App';
import { 
  XMarkIcon, 
  BellIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  ClockIcon, 
  TrophyIcon, 
  DocumentTextIcon, 
  UsersIcon 
} from '@heroicons/react/24/outline';

interface NotificacoesPanelProps {
  user: User;
  onClose: () => void;
}

interface Notificacao {
  id: number;
  tipo: 'sucesso' | 'alerta' | 'info';
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
}

export function NotificacoesPanel({ user, onClose }: NotificacoesPanelProps) {
  // Notificações mockadas
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

  const notificacoes = user.role === 'discente' ? notificacoesDiscente : notificacoesCoordenacao;
  const naoLidas = notificacoes.filter(n => !n.lida).length;

  const getIcone = (tipo: string) => {
    switch (tipo) {
      case 'sucesso':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'alerta':
        return <ExclamationCircleIcon className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <BellIcon className="w-5 h-5 text-teal-600" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCor = (tipo: string) => {
    switch (tipo) {
      case 'sucesso':
        return 'bg-green-50 border-green-200';
      case 'alerta':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-teal-50 border-teal-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-white h-full w-full max-w-md shadow-xl overflow-hidden flex flex-col">
        {/* Cabeçalho */}
        <div className="bg-teal-600 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <BellIcon className="w-6 h-6" />
              <h2>Notificações</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-teal-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <p className="text-teal-100 text-sm">
            {naoLidas} não {naoLidas === 1 ? 'lida' : 'lidas'}
          </p>
        </div>

        {/* Informação */}
        <div className="bg-teal-50 border-b border-teal-200 p-4">
          <p className="text-teal-800 text-sm">
            Sistema de notificações automáticas para eventos relevantes
          </p>
        </div>

        {/* Lista de Notificações */}
        <div className="flex-1 overflow-y-auto">
          {notificacoes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
              <BellIcon className="w-16 h-16 mb-4" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notificacoes.map((notificacao) => (
                <div
                  key={notificacao.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notificacao.lida ? 'bg-teal-50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcone(notificacao.tipo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-gray-900">{notificacao.titulo}</p>
                        {!notificacao.lida && (
                          <span className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0 mt-1.5"></span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notificacao.mensagem}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <ClockIcon className="w-3 h-3" />
                        <span>{notificacao.data}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="border-t border-gray-200 p-4">
          <button className="w-full text-teal-600 hover:text-teal-700 text-sm py-2">
            Marcar todas como lidas
          </button>
        </div>
      </div>
    </div>
  );
}