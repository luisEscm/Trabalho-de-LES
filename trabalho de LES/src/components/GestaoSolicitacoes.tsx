import { User } from '../App';
import { useState } from 'react';
import { 
  ArrowUpTrayIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationCircleIcon, 
  CalendarIcon, 
  UsersIcon, 
  EyeIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

interface GestaoSolicitacoesProps {
  user: User;
}

type StatusSolicitacao = 'Pendente' | 'Aprovado' | 'Indeferido';
type AbaAtiva = 'aproveitamento' | 'grupos';

interface Solicitacao {
  id: number;
  aluno: string;
  atividade: string;
  horasSolicitadas: number;
  dataEnvio: string;
  status: StatusSolicitacao;
  prazoRestante: number;
  anexo: string;
  parecer?: string;
}

interface GrupoAcademico {
  id: number;
  nome: string;
  tipo: string;
  descricao: string;
  objetivo: string;
  atividades: string;
  docenteResponsavel: string;
  discenteLider: {
    nome: string;
    matricula: string;
  };
  status: 'Pendente' | 'Aprovado' | 'Reprovado';
  dataCriacao: string;
  motivoReprovacao?: string;
}

export function GestaoSolicitacoes({ user }: GestaoSolicitacoesProps) {
  const [showNovaSolicitacao, setShowNovaSolicitacao] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('aproveitamento');
  const [grupoSelecionado, setGrupoSelecionado] = useState<number | null>(null);
  const [parecerExpandido, setParecerExpandido] = useState<number | null>(null);
  const [solicitacaoReenvio, setSolicitacaoReenvio] = useState<Solicitacao | null>(null);

  // Dados mockados
  const solicitacoesDiscente: Solicitacao[] = [
    {
      id: 1,
      aluno: 'João Silva',
      atividade: 'Congresso Nacional de Medicina',
      horasSolicitadas: 20,
      dataEnvio: '25/11/2024',
      status: 'Aprovado',
      prazoRestante: 0,
      anexo: 'certificado_congresso.pdf',
      parecer: 'Atividade aprovada conforme regulamento.'
    },
    {
      id: 2,
      aluno: 'João Silva',
      atividade: 'Workshop de Tecnologia em Saúde',
      horasSolicitadas: 8,
      dataEnvio: '28/11/2024',
      status: 'Pendente',
      prazoRestante: 7,
      anexo: 'certificado_workshop.pdf'
    },
    {
      id: 3,
      aluno: 'João Silva',
      atividade: 'Curso de Primeiros Socorros',
      horasSolicitadas: 12,
      dataEnvio: '20/11/2024',
      status: 'Indeferido',
      prazoRestante: 3,
      anexo: 'certificado_curso.pdf',
      parecer: 'Certificado não possui carga horária discriminada. Por favor, anexe documento complementar.'
    }
  ];

  const solicitacoesCoordenacao: Solicitacao[] = [
    {
      id: 1,
      aluno: 'Pedro Oliveira',
      atividade: 'Congresso Nacional de Medicina',
      horasSolicitadas: 20,
      dataEnvio: '29/11/2024',
      status: 'Pendente',
      prazoRestante: 2,
      anexo: 'certificado.pdf'
    },
    {
      id: 2,
      aluno: 'Julia Santos',
      atividade: 'Workshop de Tecnologia',
      horasSolicitadas: 8,
      dataEnvio: '26/11/2024',
      status: 'Pendente',
      prazoRestante: 5,
      anexo: 'certificado.pdf'
    },
    {
      id: 3,
      aluno: 'Lucas Ferreira',
      atividade: 'Simpósio de Extensão',
      horasSolicitadas: 16,
      dataEnvio: '30/11/2024',
      status: 'Pendente',
      prazoRestante: 1,
      anexo: 'certificado.pdf'
    }
  ];

  const gruposAcademicos: GrupoAcademico[] = [
    {
      id: 1,
      nome: 'Liga de Saúde Mental Universitária',
      tipo: 'Liga Acadêmica',
      descricao: 'Liga focada em promover saúde mental no ambiente universitário e comunidade',
      objetivo: 'Conscientizar sobre saúde mental e oferecer apoio à comunidade acadêmica',
      atividades: 'Rodas de conversa, palestras sobre ansiedade e depressão, campanhas de prevenção ao suicídio (Setembro Amarelo)',
      docenteResponsavel: 'Profa. Dra. Juliana Costa',
      discenteLider: {
        nome: 'Pedro Oliveira',
        matricula: '202302891'
      },
      status: 'Pendente',
      dataCriacao: '10/12/2024'
    },
    {
      id: 2,
      nome: 'Projeto de Sustentabilidade Urbana',
      tipo: 'Projeto de Pesquisa',
      descricao: 'Projeto de pesquisa sobre soluções sustentáveis para cidades médias',
      objetivo: 'Desenvolver e testar soluções de sustentabilidade urbana aplicáveis à realidade local',
      atividades: 'Pesquisa de campo, desenvolvimento de protótipos, apresentação de resultados em eventos científicos',
      docenteResponsavel: 'Prof. Dr. Fernando Lima',
      discenteLider: {
        nome: 'Marina Silva',
        matricula: '202302456'
      },
      status: 'Pendente',
      dataCriacao: '05/12/2024'
    },
    {
      id: 3,
      nome: 'Grupo de Inovação Tecnológica Social',
      tipo: 'Grupo de Extensão',
      descricao: 'Grupo focado em desenvolver tecnologias sociais para comunidades carentes',
      objetivo: 'Aplicar conhecimentos técnicos na solução de problemas reais da comunidade',
      atividades: 'Desenvolvimento de aplicativos, oficinas de inclusão digital, consultoria tecnológica gratuita',
      docenteResponsavel: 'Prof. Dr. Carlos Oliveira',
      discenteLider: {
        nome: 'Rafael Santos',
        matricula: '202301678'
      },
      status: 'Pendente',
      dataCriacao: '08/12/2024'
    }
  ];

  const getStatusIcon = (status: StatusSolicitacao | string) => {
    switch (status) {
      case 'Pendente':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'Aprovado':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'Indeferido':
      case 'Reprovado':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: StatusSolicitacao | string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Aprovado':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Indeferido':
      case 'Reprovado':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const handleAprovarGrupo = (grupoId: number) => {
    console.log('Aprovando grupo:', grupoId);
    alert('Grupo aprovado com sucesso! O docente e o discente líder serão notificados.');
  };

  const handleReprovarGrupo = (grupoId: number) => {
    const motivo = prompt('Informe o motivo da reprovação:');
    if (motivo) {
      console.log('Reprovando grupo:', grupoId, 'Motivo:', motivo);
      alert('Grupo reprovado. O docente será notificado sobre o motivo.');
    }
  };

  if (user.role === 'discente' && showNovaSolicitacao) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">Nova Solicitação de Aproveitamento</h2>
          <button
            onClick={() => setShowNovaSolicitacao(false)}
            className="text-gray-600 hover:text-gray-700"
          >
            Cancelar
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
            <p className="text-teal-800 text-sm">
              Solicitação de aproveitamento de horas externas com documento comprobatório
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Nome da Atividade *</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Congresso Nacional de Medicina"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Descrição da Atividade *</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                rows={4}
                placeholder="Descreva brevemente a atividade realizada e sua relevância"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Carga Horária Pleiteada *</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Ex: 20"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Data de Realização</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Documento Comprobatório *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Clique para fazer upload ou arraste o arquivo</p>
                <p className="text-gray-500 text-sm">Certificado, declaração ou comprovante (PDF, até 5MB)</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-800 text-sm">
                    O coordenador tem até 10 dias para analisar sua solicitação.
                    Caso seja indeferida, você terá 5 dias para ajustar e reenviar.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                onClick={() => {
                  alert('Solicitação enviada com sucesso! O coordenador será notificado.');
                  setShowNovaSolicitacao(false);
                }}
              >
                Enviar Solicitação
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowNovaSolicitacao(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Página de Reenvio de Solicitação Indeferida
  if (user.role === 'discente' && solicitacaoReenvio) {
    return (
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">Reenviar Solicitação Corrigida</h2>
            <p className="text-gray-600 mt-1">Corrija os pontos destacados no parecer e reenvie sua solicitação</p>
          </div>
          <button
            onClick={() => setSolicitacaoReenvio(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
          >
            <XMarkIcon className="w-5 h-5" />
            Cancelar
          </button>
        </div>

        {/* Parecer do Indeferimento */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg overflow-hidden">
          <div className="bg-red-100 px-6 py-3 border-b border-red-200">
            <div className="flex items-center gap-2">
              <XCircleIcon className="w-5 h-5 text-red-700" />
              <h3 className="text-red-900 font-semibold">Motivo do Indeferimento</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-red-800 leading-relaxed font-medium mb-4">{solicitacaoReenvio.parecer}</p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-red-200">
              <div>
                <p className="text-xs text-red-700 uppercase tracking-wider mb-1">Solicitação Original</p>
                <p className="text-red-900 font-medium">{solicitacaoReenvio.atividade}</p>
              </div>
              <div>
                <p className="text-xs text-red-700 uppercase tracking-wider mb-1">Documento Anterior</p>
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="w-4 h-4 text-red-600" />
                  <p className="text-red-900">{solicitacaoReenvio.anexo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aviso de Prazo */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex gap-3">
            <ExclamationCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-800 text-sm font-medium mb-1">Atenção ao Prazo</p>
              <p className="text-yellow-700 text-sm">
                Você tem <strong>{solicitacaoReenvio.prazoRestante} dias</strong> para reenviar esta solicitação corrigida.
                Após este prazo, será necessário criar uma nova solicitação.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário de Reenvio */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-6">Dados da Solicitação Corrigida</h3>

          <form className="space-y-6">
            {/* Nome da Atividade */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nome da Atividade *</label>
              <input
                type="text"
                defaultValue={solicitacaoReenvio.atividade}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Congresso Nacional de Medicina"
              />
              <p className="text-gray-500 text-sm mt-1">Você pode manter ou alterar o nome da atividade</p>
            </div>

            {/* Descrição da Atividade */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Descrição da Atividade *</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                rows={4}
                placeholder="Descreva brevemente a atividade realizada e sua relevância para a extensão universitária"
              ></textarea>
              <p className="text-gray-500 text-sm mt-1">Forneça uma descrição mais detalhada se solicitado no parecer</p>
            </div>

            {/* Carga Horária e Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Carga Horária Pleiteada *</label>
                <input
                  type="number"
                  defaultValue={solicitacaoReenvio.horasSolicitadas}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Ex: 20"
                />
                <p className="text-gray-500 text-sm mt-1">Ajuste se necessário conforme o parecer</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Data de Realização</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Justificativa das Correções */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Justificativa das Correções Realizadas *</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                rows={3}
                placeholder="Descreva as correções que você realizou com base no parecer do coordenador"
              ></textarea>
              <p className="text-gray-500 text-sm mt-1">Explique como você atendeu aos pontos levantados no parecer</p>
            </div>

            {/* Novo Documento */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Novo Documento Comprobatório *</label>
              <div className="border-2 border-dashed border-teal-300 bg-teal-50 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                <ArrowUpTrayIcon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <p className="text-teal-800 font-medium mb-2">Clique para fazer upload do documento corrigido</p>
                <p className="text-teal-700 text-sm mb-1">Certificado, declaração ou comprovante atualizado</p>
                <p className="text-teal-600 text-xs">PDF, até 5MB</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                <p className="text-blue-800 text-sm flex items-start gap-2">
                  <DocumentTextIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Documento anterior: <strong>{solicitacaoReenvio.anexo}</strong></span>
                </p>
              </div>
            </div>

            {/* Informação Importante */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="flex gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-teal-800 text-sm font-medium mb-1">Nova Análise</p>
                  <p className="text-teal-700 text-sm">
                    Após o reenvio, o coordenador terá novos 10 dias para analisar sua solicitação corrigida.
                    Certifique-se de que todos os pontos do parecer foram atendidos.
                  </p>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                onClick={() => {
                  alert('Solicitação reenviada com sucesso! O coordenador será notificado para nova análise.');
                  setSolicitacaoReenvio(null);
                }}
              >
                <ArrowUpTrayIcon className="w-5 h-5" />
                Reenviar Solicitação Corrigida
              </button>
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                onClick={() => setSolicitacaoReenvio(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">
            {user.role === 'discente' ? 'Minhas Solicitações' : 'Análise de Solicitações'}
          </h2>
          <p className="text-gray-600 mt-1">
            {user.role === 'discente' 
              ? 'Gerencie suas solicitações de aproveitamento'
              : 'Analise solicitações de aproveitamento e grupos acadêmicos'
            }
          </p>
        </div>
        {user.role === 'discente' && (
          <button
            onClick={() => setShowNovaSolicitacao(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Nova Solicitação
          </button>
        )}
      </div>

      {/* Abas (apenas para coordenador) */}
      {user.role === 'coordenador' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setAbaAtiva('aproveitamento')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                abaAtiva === 'aproveitamento'
                  ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <DocumentTextIcon className="w-5 h-5" />
              <span>Aproveitamento de Horas</span>
              <span className="px-2 py-0.5 bg-yellow-500 text-white rounded-full text-xs">
                {solicitacoesCoordenacao.filter(s => s.status === 'Pendente').length}
              </span>
            </button>
            <button
              onClick={() => setAbaAtiva('grupos')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                abaAtiva === 'grupos'
                  ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <UsersIcon className="w-5 h-5" />
              <span>Grupos Acadêmicos</span>
              <span className="px-2 py-0.5 bg-indigo-500 text-white rounded-full text-xs">
                {gruposAcademicos.filter(g => g.status === 'Pendente').length}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      {user.role === 'coordenador' && abaAtiva === 'aproveitamento' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pendentes</p>
                <p className="text-gray-900 mt-1">
                  {solicitacoesCoordenacao.filter(s => s.status === 'Pendente').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Prazo Crítico</p>
                <p className="text-gray-900 mt-1">
                  {solicitacoesCoordenacao.filter(s => s.prazoRestante <= 2).length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Este Mês</p>
                <p className="text-gray-900 mt-1">24</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas Grupos */}
      {user.role === 'coordenador' && abaAtiva === 'grupos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Aguardando Aprovação</p>
                <p className="text-gray-900 mt-1">
                  {gruposAcademicos.filter(g => g.status === 'Pendente').length}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <UsersIcon className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Grupos Ativos</p>
                <p className="text-gray-900 mt-1">12</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Membros</p>
                <p className="text-gray-900 mt-1">78</p>
              </div>
              <div className="bg-teal-100 p-3 rounded-lg">
                <UsersIcon className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba de Aproveitamento */}
      {(user.role === 'discente' || abaAtiva === 'aproveitamento') && (
        <>
          {/* Lista de Solicitações */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900">
                {user.role === 'discente' ? 'Histórico de Solicitações' : 'Solicitações Pendentes'}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {user.role !== 'discente' && (
                      <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                        Aluno
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Atividade
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Horas
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Data Envio
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Prazo
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(user.role === 'discente' ? solicitacoesDiscente : solicitacoesCoordenacao).map((solicitacao) => (
                    <tr key={solicitacao.id} className="hover:bg-gray-50">
                      {user.role !== 'discente' && (
                        <td className="px-6 py-4 text-gray-900">{solicitacao.aluno}</td>
                      )}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{solicitacao.atividade}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{solicitacao.horasSolicitadas}h</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <CalendarIcon className="w-4 h-4" />
                          {solicitacao.dataEnvio}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(solicitacao.status)}
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(solicitacao.status)}`}>
                            {solicitacao.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {solicitacao.status === 'Pendente' && (
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                            solicitacao.prazoRestante <= 2 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {solicitacao.prazoRestante} dias
                          </span>
                        )}
                        {solicitacao.status !== 'Pendente' && <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === 'discente' ? (
                          <div className="flex gap-2">
                            {solicitacao.status === 'Indeferido' && (
                              <button
                                onClick={() => setSolicitacaoReenvio(solicitacao)}
                                className="text-teal-600 hover:text-teal-700 text-sm"
                              >
                                Reenviar
                              </button>
                            )}
                            <button className="text-gray-600 hover:text-gray-700 text-sm">
                              Ver Detalhes
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button className="text-green-600 hover:text-green-700 text-sm">
                              Aprovar
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm">
                              Indeferir
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pareceres (apenas para discente) */}
          {user.role === 'discente' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-900 mb-4">Últimos Pareceres</h3>
              <div className="space-y-4">
                {solicitacoesDiscente
                  .filter(s => s.parecer)
                  .map((solicitacao) => (
                    <div key={solicitacao.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setParecerExpandido(parecerExpandido === solicitacao.id ? null : solicitacao.id)}
                      >
                        <div className="flex items-start gap-3">
                          {getStatusIcon(solicitacao.status)}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-gray-900 font-medium mb-1">{solicitacao.atividade}</p>
                                <p className="text-gray-500 text-xs flex items-center gap-1">
                                  <CalendarIcon className="w-3.5 h-3.5" />
                                  Analisado em {solicitacao.dataEnvio}
                                </p>
                              </div>
                              <button className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm">
                                <EyeIcon className="w-4 h-4" />
                                {parecerExpandido === solicitacao.id ? 'Ocultar' : 'Ver detalhes'}
                              </button>
                            </div>
                            
                            {/* Preview do parecer quando não expandido */}
                            {parecerExpandido !== solicitacao.id && (
                              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                {solicitacao.parecer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Detalhes expandidos */}
                      {parecerExpandido === solicitacao.id && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200 space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                              Parecer Completo
                            </label>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <p className="text-gray-700 leading-relaxed">{solicitacao.parecer}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                                Carga Horária
                              </label>
                              <p className="text-gray-900 font-medium">{solicitacao.horasSolicitadas} horas</p>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                                Status Final
                              </label>
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(solicitacao.status)}`}>
                                {solicitacao.status}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
                              Documento Anexado
                            </label>
                            <div className="flex items-center gap-2">
                              <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 text-sm">{solicitacao.anexo}</span>
                            </div>
                          </div>

                          {solicitacao.status === 'Indeferido' && (
                            <div className="pt-3 border-t border-gray-200">
                              <button
                                onClick={() => setSolicitacaoReenvio(solicitacao)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                              >
                                <ArrowUpTrayIcon className="w-4 h-4" />
                                Reenviar Solicitação Corrigida
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Conteúdo da Aba de Grupos Acadêmicos */}
      {user.role === 'coordenador' && abaAtiva === 'grupos' && (
        <div className="space-y-6">
          {/* Lista de Grupos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {gruposAcademicos.map((grupo) => (
              <div key={grupo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                        <UsersIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">{grupo.nome}</h3>
                        <p className="text-gray-600 text-sm">{grupo.tipo}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(grupo.status)}`}>
                      {grupo.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{grupo.descricao}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <UsersIcon className="w-4 h-4" />
                      <span>Docente: {grupo.docenteResponsavel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <UsersIcon className="w-4 h-4 text-indigo-600" />
                      <span>Líder: {grupo.discenteLider.nome} ({grupo.discenteLider.matricula})</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Criado em: {grupo.dataCriacao}</span>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGrupoSelecionado(grupoSelecionado === grupo.id ? null : grupo.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm"
                    >
                      <EyeIcon className="w-4 h-4" />
                      {grupoSelecionado === grupo.id ? 'Ocultar' : 'Ver Detalhes'}
                    </button>
                  </div>

                  {/* Detalhes Expandidos */}
                  {grupoSelecionado === grupo.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1"><strong>Objetivo:</strong></p>
                        <p className="text-gray-700">{grupo.objetivo}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1"><strong>Atividades Planejadas:</strong></p>
                        <p className="text-gray-700">{grupo.atividades}</p>
                      </div>
                    </div>
                  )}

                  {/* Ações de Aprovação */}
                  {grupo.status === 'Pendente' && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                      <button
                        onClick={() => handleAprovarGrupo(grupo.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        Aprovar Grupo
                      </button>
                      <button
                        onClick={() => handleReprovarGrupo(grupo.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        Reprovar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {gruposAcademicos.filter(g => g.status === 'Pendente').length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Nenhum grupo aguardando aprovação</p>
              <p className="text-gray-500 text-sm">Novos grupos criados por docentes aparecerão aqui</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}