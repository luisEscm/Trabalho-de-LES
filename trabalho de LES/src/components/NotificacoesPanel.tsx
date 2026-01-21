import { User } from '../App';
import { 
  XMarkIcon, 
  BellIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

export interface Notificacao {
  id: number;
  tipo: 'sucesso' | 'alerta' | 'info';
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
}

interface NotificacoesPanelProps {
  user: User;
  onClose: () => void;
  notificacoes: Notificacao[];
}

export function NotificacoesPanel({ user, onClose, notificacoes }: NotificacoesPanelProps) {

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

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
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