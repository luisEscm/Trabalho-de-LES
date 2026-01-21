import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  MapPinIcon, 
  UsersIcon, 
  ClockIcon, 
  BookOpenIcon, 
  TrophyIcon, 
  LightBulbIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';

interface Oportunidade {
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

interface PaginaDetalhesOportunidadePublicaProps {
  oportunidade: Oportunidade;
  onVoltar: () => void;
  onLoginClick?: () => void;
}

export function PaginaDetalhesOportunidadePublica({ 
  oportunidade, 
  onVoltar,
  onLoginClick 
}: PaginaDetalhesOportunidadePublicaProps) {
  const vagasDisponiveis = oportunidade.vagas - oportunidade.inscritos;
  const percentualPreenchido = (oportunidade.inscritos / oportunidade.vagas) * 100;

  const getIconeModalidade = (modalidade: string) => {
    switch (modalidade) {
      case 'Projeto': return BookOpenIcon;
      case 'Programa': return TrophyIcon;
      case 'Evento': return CalendarIcon;
      case 'Grupo Acadêmico': return UsersIcon;
      case 'Oficina': return LightBulbIcon;
      default: return BookOpenIcon;
    }
  };

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'Aberta': return 'bg-green-100 text-green-700';
      case 'Em Execução': return 'bg-blue-100 text-blue-700';
      case 'Encerrada': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const Icon = getIconeModalidade(oportunidade.modalidade);

  return (
    <div className="space-y-6">
      {/* Botão Voltar */}
      <button
        onClick={onVoltar}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Voltar para Oportunidades
      </button>

      {/* Header da Página */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-lg bg-teal-100">
            <Icon className="w-8 h-8 text-teal-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-gray-900 text-2xl">{oportunidade.titulo}</h1>
              <span className={`px-3 py-1 rounded-full text-sm ${getCorStatus(oportunidade.status)}`}>
                {oportunidade.status}
              </span>
            </div>
            <p className="text-gray-600">{oportunidade.modalidade}</p>
          </div>
        </div>

        {/* Botão de Inscrição Principal */}
        {vagasDisponiveis > 0 ? (
          <button
            onClick={onLoginClick}
            className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Fazer Inscrição (Login necessário)
          </button>
        ) : (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 py-4 rounded-lg flex items-center justify-center gap-2">
            <ExclamationCircleIcon className="w-5 h-5" />
            Vagas Esgotadas
          </div>
        )}
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal - Descrição */}
        <div className="lg:col-span-2 space-y-6">
          {/* Descrição Completa */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-900 mb-4">Sobre a Oportunidade</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {oportunidade.descricao}
            </p>
          </div>
        </div>

        {/* Coluna Lateral - Informações */}
        <div className="space-y-6">
          {/* Disponibilidade de Vagas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-900 mb-4">Disponibilidade de Vagas</h3>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-2xl text-gray-900">{oportunidade.vagas}</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-blue-600">{oportunidade.inscritos}</p>
                <p className="text-xs text-gray-600">Inscritos</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl ${vagasDisponiveis > 0 ? 'text-teal-600' : 'text-red-600'}`}>
                  {vagasDisponiveis}
                </p>
                <p className="text-xs text-gray-600">Livres</p>
              </div>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full transition-all ${
                  vagasDisponiveis > 0 ? 'bg-teal-600' : 'bg-red-600'
                }`}
                style={{ width: `${percentualPreenchido}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-600">
              {Math.round(percentualPreenchido)}% das vagas preenchidas
            </p>
          </div>

          {/* Informações Detalhadas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-900 mb-4">Informações</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Local</p>
                  <p className="text-gray-900">{oportunidade.local}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Período</p>
                  <p className="text-gray-900">{oportunidade.periodo}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Carga Horária</p>
                  <p className="text-gray-900">{oportunidade.cargaHoraria} horas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UsersIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Responsável</p>
                  <p className="text-gray-900">{oportunidade.responsavel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Destaque */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
            <h3 className="text-teal-900 mb-3">Certificação</h3>
            <p className="text-teal-800 text-sm">
              Ao concluir esta atividade, você receberá um certificado digital com código de autenticidade único.
            </p>
          </div>
        </div>
      </div>

      {/* Botão de Inscrição Inferior */}
      <div className="bg-white rounded-lg shadow p-6">
        {vagasDisponiveis > 0 ? (
          <div>
            <div className="flex items-start gap-3 mb-4">
              <CheckCircleIcon className="w-6 h-6 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="text-gray-900 mb-1">Interessado(a) nesta oportunidade?</h3>
                <p className="text-gray-600 text-sm">
                  Faça login ou crie uma conta para se inscrever e começar sua jornada de extensão universitária.
                </p>
              </div>
            </div>
            <button
              onClick={onLoginClick}
              className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Fazer Inscrição
            </button>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <ExclamationCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-gray-900 mb-1">Vagas Esgotadas</h3>
              <p className="text-gray-600 text-sm">
                Infelizmente todas as vagas para esta oportunidade já foram preenchidas. 
                Explore outras oportunidades disponíveis no portal.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}