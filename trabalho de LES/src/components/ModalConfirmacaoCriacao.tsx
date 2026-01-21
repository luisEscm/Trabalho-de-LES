import { 
  CheckCircleIcon, 
  XMarkIcon, 
  ClockIcon, 
  ExclamationCircleIcon, 
  Cog6ToothIcon, 
  BookOpenIcon, 
  UsersIcon 
} from '@heroicons/react/24/outline';

interface ModalConfirmacaoCriacaoProps {
  tipo: 'oportunidade' | 'grupo';
  titulo: string;
  onClose: () => void;
}

export function ModalConfirmacaoCriacao({ tipo, titulo, onClose }: ModalConfirmacaoCriacaoProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header de Sucesso */}
        <div className="bg-green-50 border-b border-green-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900">
                  {tipo === 'oportunidade' ? 'Oportunidade Criada com Sucesso!' : 'Grupo Criado com Sucesso!'}
                </h3>
                <p className="text-green-700 text-sm">
                  {tipo === 'oportunidade' 
                    ? 'A oportunidade já está disponível no Portal'
                    : 'Aguardando aprovação da coordenação'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Detalhes da Criação */}
          <div className="space-y-4 mb-6">
            {/* Título e Tipo */}
            <div className={`${
              tipo === 'oportunidade' 
                ? 'bg-teal-50 border-teal-200' 
                : 'bg-indigo-50 border-indigo-200'
            } border rounded-lg p-4`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`${
                  tipo === 'oportunidade' 
                    ? 'bg-teal-100 text-teal-600' 
                    : 'bg-indigo-100 text-indigo-600'
                } p-2 rounded-lg`}>
                  {tipo === 'oportunidade' ? (
                    <BookOpenIcon className="w-6 h-6" />
                  ) : (
                    <UsersIcon className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900">{titulo}</h3>
                  <p className={`text-sm ${
                    tipo === 'oportunidade' ? 'text-teal-700' : 'text-indigo-700'
                  }`}>
                    {tipo === 'oportunidade' ? 'Oportunidade de Extensão' : 'Grupo Acadêmico'}
                  </p>
                </div>
                <div className={`${
                  tipo === 'oportunidade'
                    ? 'bg-green-100 text-green-700 border-green-200'
                    : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                } px-3 py-1 rounded-full text-xs border`}>
                  {tipo === 'oportunidade' ? 'Ativa' : 'Pendente'}
                </div>
              </div>
            </div>

            {/* Status do Processo - Diferente para cada tipo */}
            {tipo === 'oportunidade' ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  Status da Oportunidade
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 rounded-full p-1 mt-0.5">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">Oportunidade criada e publicada</p>
                      <p className="text-gray-600 text-xs">
                        {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 rounded-full p-1 mt-0.5">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">Visível no Portal de Oportunidades</p>
                      <p className="text-gray-600 text-xs">Discentes já podem se inscrever</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-500 rounded-full p-1 mt-0.5">
                      <UsersIcon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">Aguardando inscrições</p>
                      <p className="text-gray-600 text-xs">Você pode gerenciar inscritos na aba "Gerenciar"</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-indigo-600" />
                  Status do Processo
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 rounded-full p-1 mt-0.5">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">Solicitação enviada</p>
                      <p className="text-gray-600 text-xs">
                        {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-500 rounded-full p-1 mt-0.5 animate-pulse">
                      <ClockIcon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">Aguardando análise da coordenação</p>
                      <p className="text-gray-600 text-xs">Em breve você receberá uma resposta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-300 rounded-full p-1 mt-0.5">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 text-sm">Aprovação/Reprovação</p>
                      <p className="text-gray-500 text-xs">Você será notificado quando houver uma decisão</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botão */}
          <button
            onClick={onClose}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}