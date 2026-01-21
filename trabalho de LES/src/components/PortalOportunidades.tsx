import { User } from '../App';
import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon, 
  CalendarIcon,
  PlusIcon,
  BookOpenIcon,
  TrophyIcon,
  CheckCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  EyeIcon,
  UserPlusIcon,
  XCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { ModalConfirmacaoCriacao } from './ModalConfirmacaoCriacao';
import { ModalGerenciarOportunidade } from './ModalGerenciarOportunidade';

interface PortalOportunidadesProps {
  user: User;
}

type Status = 'Aberta' | 'Em Execução' | 'Encerrada';
type StatusGrupo = 'Pendente' | 'Aprovado' | 'Reprovado';
type Modalidade = 'Projeto' | 'Evento' | 'Curso' | 'Oficina' | 'Grupo Acadêmico';
type TipoGrupo = 'Liga Acadêmica' | 'Grupo de Estudos' | 'Projeto de Pesquisa' | 'Grupo de Extensão' | 'Outro';

interface Oportunidade {
  id: number;
  titulo: string;
  descricao: string;
  modalidade: Modalidade;
  cargaHoraria?: number;
  vagas?: number;
  inscritos?: number;
  responsavel: string;
  periodo: string;
  status: Status | StatusGrupo;
  local?: string;
  // Campos específicos para grupos
  tipoGrupo?: TipoGrupo;
  discenteLider?: {
    nome: string;
    matricula: string;
  };
  objetivo?: string;
  atividades?: string;
  membros?: number;
  motivoReprovacao?: string;
  dataAprovacao?: string;
}

export function PortalOportunidades({ user }: PortalOportunidadesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroModalidade, setFiltroModalidade] = useState<string>('Todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todas');
  const [showNovaOportunidade, setShowNovaOportunidade] = useState(false);
  const [tipoFormulario, setTipoFormulario] = useState<'oportunidade' | 'grupo'>('oportunidade');
  const [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<number | null>(null);
  const [oportunidadeParaInscrever, setOportunidadeParaInscrever] = useState<Oportunidade | null>(null);
  const [oportunidadeDetalhes, setOportunidadeDetalhes] = useState<Oportunidade | null>(null);
  const [oportunidadeGerenciar, setOportunidadeGerenciar] = useState<Oportunidade | null>(null);
  const [abaGerenciar, setAbaGerenciar] = useState<'inscritos' | 'participantes' | 'detalhes'>('inscritos');
  const [inscricaoConfirmada, setInscricaoConfirmada] = useState(false);
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [dadosCriacao, setDadosCriacao] = useState<{ tipo: 'oportunidade' | 'grupo', titulo: string } | null>(null);
  const [buscaAluno, setBuscaAluno] = useState('');
  const [filtroStatusInscricao, setFiltroStatusInscricao] = useState<string>('Todos');
  const [abaGerenciamento, setAbaGerenciamento] = useState<'inscritos' | 'participantes' | 'detalhes'>('inscritos');
  const [modalReprovacao, setModalReprovacao] = useState<{ aberto: boolean; aluno: any | null }>({ aberto: false, aluno: null });
  const [motivoReprovacao, setMotivoReprovacao] = useState('');
  const [modalComunicado, setModalComunicado] = useState(false);
  const [assuntoComunicado, setAssuntoComunicado] = useState('');
  const [mensagemComunicado, setMensagemComunicado] = useState('');
  const [destinatariosComunicado, setDestinatariosComunicado] = useState<'todos' | 'aprovados' | 'pendentes'>('todos');
  const [modoEdicao, setModoEdicao] = useState(false);

  // Formulário de Grupo
  const [formularioGrupo, setFormularioGrupo] = useState({
    nome: '',
    tipoGrupo: 'Liga Acadêmica' as TipoGrupo,
    descricao: '',
    objetivo: '',
    atividades: '',
    discenteLiderNome: '',
    discenteLiderMatricula: ''
  });

  // Dados mockados
  const oportunidades: Oportunidade[] = [
    {
      id: 1,
      titulo: 'Desenvolvimento Web para ONGs',
      descricao: 'Criação de websites e sistemas web para organizações sem fins lucrativos da comunidade',
      modalidade: 'Projeto',
      cargaHoraria: 60,
      vagas: 30,
      inscritos: 25,
      responsavel: 'Prof. Dr. João Silva',
      periodo: 'Mar/2024 - Jun/2024',
      status: 'Aberta',
      local: 'Laboratório de Desenvolvimento Web'
    },
    {
      id: 2,
      titulo: 'Inclusão Digital para Comunidades Rurais',
      descricao: 'Capacitação em informática básica e internet para agricultores e comunidades do interior',
      modalidade: 'Projeto',
      cargaHoraria: 60,
      vagas: 20,
      inscritos: 18,
      responsavel: 'Profa. Maria Santos',
      periodo: 'Fev/2024 - Jul/2024',
      status: 'Em Execução',
      local: 'Comunidades Rurais'
    },
    {
      id: 3,
      titulo: 'Hackathon Social: Soluções para a Cidade',
      descricao: 'Maratona de programação focada em desenvolver aplicativos que resolvam problemas urbanos',
      modalidade: 'Evento',
      cargaHoraria: 30,
      vagas: 100,
      inscritos: 87,
      responsavel: 'Prof. Carlos Lima',
      periodo: '15/05/2024',
      status: 'Aberta',
      local: 'Auditório Central'
    },
    {
      id: 4,
      titulo: 'Programação para Terceira Idade',
      descricao: 'Introdução à lógica de programação e desenvolvimento de jogos educativos para idosos',
      modalidade: 'Curso',
      cargaHoraria: 45,
      vagas: 40,
      inscritos: 40,
      responsavel: 'Profa. Ana Paula',
      periodo: 'Abr/2024 - Mai/2024',
      status: 'Aberta',
      local: 'Laboratório de Informática'
    },
    {
      id: 5,
      titulo: 'Oficina de Robótica Educacional',
      descricao: 'Ensino de robótica e programação para crianças de escolas públicas',
      modalidade: 'Oficina',
      cargaHoraria: 30,
      vagas: 25,
      inscritos: 15,
      responsavel: 'Prof. Roberto Costa',
      periodo: 'Jun/2024',
      status: 'Aberta',
      local: 'Laboratório de Robótica'
    }
  ];

  // Verificar se o usuário é docente/coordenador e filtrar grupos criados por ele
  const gruposCriadosPorMim = user.role !== 'discente' 
    ? oportunidades.filter(op => op.modalidade === 'Grupo Acadêmico' && op.responsavel.includes(user.nome.split(' ')[0]))
    : [];

  // Verificar se o discente é líder de algum grupo
  const gruposQueEuLidero = user.role === 'discente'
    ? oportunidades.filter(op => 
        op.modalidade === 'Grupo Acadêmico' && 
        op.discenteLider?.matricula === user.matricula
      )
    : [];

  // Filtrar oportunidades com base no papel do usuário
  const oportunidadesVisiveis = oportunidades.filter(op => {
    // Coordenadores e Docentes veem tudo
    if (user.role === 'coordenador' || user.role === 'docente') {
      return true;
    }

    // Discentes
    if (user.role === 'discente') {
      // Oportunidades normais (não grupos): apenas aprovadas/abertas/em execução
      if (op.modalidade !== 'Grupo Acadêmico') {
        return op.status === 'Aberta' || op.status === 'Em Execução';
      }

      // Grupos Acadêmicos
      if (op.modalidade === 'Grupo Acadêmico') {
        // Se é líder do grupo, vê independente do status
        if (op.discenteLider?.matricula === user.matricula) {
          return true;
        }
        // Se não é líder, só vê grupos aprovados
        return op.status === 'Aprovado';
      }
    }

    return false;
  });

  const oportunidadesFiltradas = oportunidadesVisiveis.filter(op => {
    const matchSearch = op.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       op.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchModalidade = filtroModalidade === 'Todas' || op.modalidade === filtroModalidade;
    const matchStatus = filtroStatus === 'Todas' || op.status === filtroStatus;
    return matchSearch && matchModalidade && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta': return 'bg-green-100 text-green-700 border-green-200';
      case 'Em Execução': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'Encerrada': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Aprovado': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pendente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Reprovado': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getModalidadeIcon = (modalidade: Modalidade) => {
    switch (modalidade) {
      case 'Projeto': return <BookOpenIcon className="w-5 h-5" />;
      case 'Evento': return <CalendarIcon className="w-5 h-5" />;
      case 'Curso': return <TrophyIcon className="w-5 h-5" />;
      case 'Oficina': return <UsersIcon className="w-5 h-5" />;
      case 'Grupo Acadêmico': return <UsersIcon className="w-5 h-5" />;
    }
  };

  const handleSubmitGrupo = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Grupo criado:', formularioGrupo);
    
    // Mostrar modal de confirmação
    setDadosCriacao({
      tipo: 'grupo',
      titulo: formularioGrupo.nome
    });
    setShowModalConfirmacao(true);
    
    setFormularioGrupo({
      nome: '',
      tipoGrupo: 'Liga Acadêmica',
      descricao: '',
      objetivo: '',
      atividades: '',
      discenteLiderNome: '',
      discenteLiderMatricula: ''
    });
    setShowNovaOportunidade(false);
  };

  const handleCriarOportunidade = () => {
    // Simular criação de oportunidade
    setDadosCriacao({
      tipo: 'oportunidade',
      titulo: 'Nova Oportunidade' // Aqui seria o título do formulário
    });
    setShowModalConfirmacao(true);
    setShowNovaOportunidade(false);
  };

  const handleCloseModalConfirmacao = () => {
    setShowModalConfirmacao(false);
    setDadosCriacao(null);
  };

  const handleAprovarGrupo = (grupoId: number) => {
    console.log('Aprovando grupo:', grupoId);
    alert('Grupo aprovado com sucesso!');
  };

  const handleReprovarGrupo = (grupoId: number) => {
    const motivo = prompt('Informe o motivo da reprovação:');
    if (motivo) {
      console.log('Reprovando grupo:', grupoId, 'Motivo:', motivo);
      alert('Grupo reprovado.');
    }
  };

  // Verificar se o usuário é responsável pela oportunidade
  const ehResponsavelPelaOportunidade = (oportunidade: Oportunidade) => {
    if (user.role === 'coordenador') return true;
    if (user.role === 'discente') return false;
    const primeiroNome = user.nome.toLowerCase().split(' ')[0];
    return oportunidade.responsavel.toLowerCase().includes(primeiroNome);
  };

  // Página de Edição de Detalhes da Oportunidade
  if (oportunidadeGerenciar && user.role !== 'discente' && modoEdicao) {
    return (
      <div className="space-y-6">
        {/* Botão Voltar */}
        <button
          onClick={() => setModoEdicao(false)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Voltar para Gerenciamento
        </button>

        {/* Formulário de Edição */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-900 mb-6">Editar Detalhes da Oportunidade</h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Título da Oportunidade *</label>
                <input
                  type="text"
                  defaultValue={oportunidadeGerenciar.titulo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Digite o título da atividade"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Descrição *</label>
                <textarea
                  defaultValue={oportunidadeGerenciar.descricao}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  rows={4}
                  placeholder="Descreva os objetivos e atividades previstas"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Modalidade *</label>
                <select 
                  defaultValue={oportunidadeGerenciar.modalidade}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Projeto</option>
                  <option>Evento</option>
                  <option>Curso</option>
                  <option>Oficina</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Carga Horária (horas) *</label>
                <input
                  type="number"
                  defaultValue={oportunidadeGerenciar.cargaHoraria}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Ex: 40"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Número de Vagas *</label>
                <input
                  type="number"
                  defaultValue={oportunidadeGerenciar.vagas}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Ex: 30"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Local de Realização *</label>
                <input
                  type="text"
                  defaultValue={oportunidadeGerenciar.local}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Ex: Campus Principal"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Período</label>
                <input
                  type="text"
                  defaultValue={oportunidadeGerenciar.periodo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Ex: Mar/2024 - Jun/2024"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <select 
                  defaultValue={oportunidadeGerenciar.status}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Aberta</option>
                  <option>Em Execução</option>
                  <option>Encerrada</option>
                </select>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-yellow-900 font-medium mb-1">Atenção ao editar</p>
                  <p className="text-yellow-700">
                    Mudanças nos detalhes da oportunidade podem afetar os alunos já inscritos. Certifique-se de comunicar alterações significativas.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  alert('Alterações salvas com sucesso!');
                  setModoEdicao(false);
                }}
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={() => setModoEdicao(false)}
                className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Página de Visualização Somente Leitura (Docente não responsável)
  if (oportunidadeGerenciar && user.role === 'docente' && !ehResponsavelPelaOportunidade(oportunidadeGerenciar)) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setOportunidadeGerenciar(null)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Voltar para Oportunidades
        </button>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ExclamationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-blue-900 font-medium">Visualização Somente Leitura</p>
              <p className="text-blue-700 text-sm mt-1">
                Esta oportunidade pertence a outro docente. Apenas o responsável pode gerenciar e editar.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-teal-100">
              {getModalidadeIcon(oportunidadeGerenciar.modalidade)}
            </div>
            <div className="flex-1">
              <h1 className="text-gray-900 text-2xl mb-2">{oportunidadeGerenciar.titulo}</h1>
              <p className="text-gray-600">{oportunidadeGerenciar.descricao}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-gray-600 text-sm mb-1">Modalidade</p>
              <p className="text-gray-900 font-medium">{oportunidadeGerenciar.modalidade}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Carga Horária</p>
              <p className="text-gray-900 font-medium">{oportunidadeGerenciar.cargaHoraria}h</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Vagas</p>
              <p className="text-gray-900 font-medium">{oportunidadeGerenciar.inscritos}/{oportunidadeGerenciar.vagas}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(oportunidadeGerenciar.status)}`}>
                {oportunidadeGerenciar.status}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-1">Responsável</p>
            <p className="text-gray-900 font-medium">{oportunidadeGerenciar.responsavel}</p>
          </div>
        </div>
      </div>
    );
  }

  // Página de Gerenciamento da Oportunidade (Docentes/Coordenadores)
  if (oportunidadeGerenciar && user.role !== 'discente' && ehResponsavelPelaOportunidade(oportunidadeGerenciar)) {
    // Dados mockados de alunos inscritos
    const alunosInscritos = [
      {
        id: 1,
        nome: 'Ana Carolina Silva',
        matricula: '202301234',
        email: 'ana.silva@discente.ufma.br',
        curso: 'Ciências da Computação',
        periodo: '6º',
        dataInscricao: '10/12/2024',
        statusInscricao: 'Pendente'
      },
      {
        id: 2,
        nome: 'Bruno Oliveira Santos',
        matricula: '202301567',
        email: 'bruno.santos@discente.ufma.br',
        curso: 'Sistemas de Informação',
        periodo: '4º',
        dataInscricao: '09/12/2024',
        statusInscricao: 'Aprovado'
      },
      {
        id: 3,
        nome: 'Carla Mendes Ferreira',
        matricula: '202302891',
        email: 'carla.ferreira@discente.ufma.br',
        curso: 'Ciências da Computação',
        periodo: '5º',
        dataInscricao: '11/12/2024',
        statusInscricao: 'Pendente'
      },
      {
        id: 4,
        nome: 'Daniel Costa Lima',
        matricula: '202302456',
        email: 'daniel.lima@discente.ufma.br',
        curso: 'Engenharia de Software',
        periodo: '7º',
        dataInscricao: '08/12/2024',
        statusInscricao: 'Aprovado'
      },
      {
        id: 5,
        nome: 'Eduardo Pereira Souza',
        matricula: '202303123',
        email: 'eduardo.souza@discente.ufma.br',
        curso: 'Ciências da Computação',
        periodo: '3º',
        dataInscricao: '12/12/2024',
        statusInscricao: 'Reprovado'
      }
    ];

    const alunosFiltrados = alunosInscritos.filter(aluno => {
      const matchBusca = aluno.nome.toLowerCase().includes(buscaAluno.toLowerCase()) ||
                        aluno.matricula.includes(buscaAluno) ||
                        aluno.email.toLowerCase().includes(buscaAluno.toLowerCase()) ||
                        aluno.curso.toLowerCase().includes(buscaAluno.toLowerCase());
      const matchStatus = filtroStatusInscricao === 'Todos' || aluno.statusInscricao === filtroStatusInscricao;
      return matchBusca && matchStatus;
    });

    const getStatusInscricaoColor = (status: string) => {
      switch (status) {
        case 'Aprovado': return 'bg-green-100 text-green-700 border-green-200';
        case 'Pendente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'Reprovado': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    const vagasDisponiveis = (oportunidadeGerenciar.vagas || 0) - (oportunidadeGerenciar.inscritos || 0);
    const percentualPreenchido = ((oportunidadeGerenciar.inscritos || 0) / (oportunidadeGerenciar.vagas || 1)) * 100;

    return (
      <div className="space-y-6">
        {/* Botão Voltar */}
        <button
          onClick={() => setOportunidadeGerenciar(null)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Voltar para Oportunidades
        </button>

        {/* Header da Página */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-teal-100">
              {getModalidadeIcon(oportunidadeGerenciar.modalidade)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-gray-900 text-2xl mb-1">{oportunidadeGerenciar.titulo}</h1>
                  <p className="text-gray-600">{oportunidadeGerenciar.modalidade} • {oportunidadeGerenciar.cargaHoraria}h</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(oportunidadeGerenciar.status)}`}>
                  {oportunidadeGerenciar.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{oportunidadeGerenciar.descricao}</p>
            </div>
          </div>

          {/* Informações Resumidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <UsersIcon className="w-4 h-4" />
                <span className="text-sm">Total de Inscritos</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{oportunidadeGerenciar.inscritos}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <UsersIcon className="w-4 h-4" />
                <span className="text-sm">Vagas Totais</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{oportunidadeGerenciar.vagas}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm">Período</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{oportunidadeGerenciar.periodo}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <MapPinIcon className="w-4 h-4" />
                <span className="text-sm">Local</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{oportunidadeGerenciar.local}</p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Ocupação das vagas</span>
              <span className="font-medium text-gray-900">{percentualPreenchido.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  vagasDisponiveis > 0 ? 'bg-teal-600' : 'bg-red-600'
                }`}
                style={{ width: `${percentualPreenchido}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Modal de Reprovação */}
        {modalReprovacao.aberto && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Reprovar Inscrição</h3>
                      <p className="text-gray-600 text-sm">{modalReprovacao.aluno?.nome}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setModalReprovacao({ aberto: false, aluno: null });
                      setMotivoReprovacao('');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Motivo da Reprovação *
                  </label>
                  <textarea
                    value={motivoReprovacao}
                    onChange={(e) => setMotivoReprovacao(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={4}
                    placeholder="Descreva o motivo da reprovação da inscrição..."
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    O aluno receberá este feedback e poderá ajustar sua inscrição
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex gap-2">
                    <ExclamationCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <p className="text-yellow-800 text-sm">
                      O aluno será notificado sobre a reprovação e terá oportunidade de ajustar e reenviar a inscrição.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (!motivoReprovacao.trim()) {
                        alert('Por favor, informe o motivo da reprovação.');
                        return;
                      }
                      alert(`Inscrição de ${modalReprovacao.aluno?.nome} reprovada.\nMotivo: ${motivoReprovacao}`);
                      setModalReprovacao({ aberto: false, aluno: null });
                      setMotivoReprovacao('');
                    }}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Confirmar Reprovação
                  </button>
                  <button
                    onClick={() => {
                      setModalReprovacao({ aberto: false, aluno: null });
                      setMotivoReprovacao('');
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Envio de Comunicado */}
        {modalComunicado && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Enviar Comunicado</h3>
                      <p className="text-gray-600 text-sm">Notificar alunos sobre esta oportunidade</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setModalComunicado(false);
                      setAssuntoComunicado('');
                      setMensagemComunicado('');
                      setDestinatariosComunicado('todos');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Destinatários */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Destinatários *
                    </label>
                    <select
                      value={destinatariosComunicado}
                      onChange={(e) => setDestinatariosComunicado(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="todos">Todos os Inscritos</option>
                      <option value="aprovados">Apenas Aprovados</option>
                      <option value="pendentes">Apenas Pendentes</option>
                    </select>
                    <p className="text-gray-500 text-xs mt-1">
                      {destinatariosComunicado === 'todos' && 'Enviar para todos os alunos inscritos (5 alunos)'}
                      {destinatariosComunicado === 'aprovados' && 'Enviar apenas para alunos aprovados (2 alunos)'}
                      {destinatariosComunicado === 'pendentes' && 'Enviar apenas para alunos com inscrição pendente (2 alunos)'}
                    </p>
                  </div>

                  {/* Assunto */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      value={assuntoComunicado}
                      onChange={(e) => setAssuntoComunicado(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: Atualização sobre a atividade de extensão"
                    />
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      value={mensagemComunicado}
                      onChange={(e) => setMensagemComunicado(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={6}
                      placeholder="Digite a mensagem que será enviada aos alunos..."
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      A mensagem será enviada por email e notificação no sistema
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 font-medium mb-2 text-sm">Preview da Notificação:</p>
                    <div className="bg-white border border-gray-200 rounded p-3 text-sm">
                      <p className="text-gray-900 font-medium mb-1">
                        {assuntoComunicado || '[Assunto do comunicado]'}
                      </p>
                      <p className="text-gray-600 text-xs mb-2">
                        De: {user.nome} • {oportunidadeGerenciar.titulo}
                      </p>
                      <p className="text-gray-700">
                        {mensagemComunicado || '[Mensagem será exibida aqui]'}
                      </p>
                    </div>
                  </div>

                  {/* Aviso */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex gap-2">
                      <ExclamationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <p className="text-blue-800 text-sm">
                        Os alunos receberão este comunicado por email e poderão visualizá-lo nas notificações do sistema.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      if (!assuntoComunicado.trim() || !mensagemComunicado.trim()) {
                        alert('Por favor, preencha o assunto e a mensagem.');
                        return;
                      }
                      alert(`Comunicado enviado com sucesso!\nDestinatários: ${destinatariosComunicado}\nAssunto: ${assuntoComunicado}`);
                      setModalComunicado(false);
                      setAssuntoComunicado('');
                      setMensagemComunicado('');
                      setDestinatariosComunicado('todos');
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Enviar Comunicado
                  </button>
                  <button
                    onClick={() => {
                      setModalComunicado(false);
                      setAssuntoComunicado('');
                      setMensagemComunicado('');
                      setDestinatariosComunicado('todos');
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Abas de Navegação */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setAbaGerenciamento('inscritos')}
                className={`py-4 border-b-2 transition-colors ${
                  abaGerenciamento === 'inscritos'
                    ? 'border-teal-600 text-teal-700 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5" />
                  <span>Inscritos</span>
                </div>
              </button>
              <button
                onClick={() => setAbaGerenciamento('participantes')}
                className={`py-4 border-b-2 transition-colors ${
                  abaGerenciamento === 'participantes'
                    ? 'border-teal-600 text-teal-700 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Participantes Ativos</span>
                </div>
              </button>
              <button
                onClick={() => setAbaGerenciamento('detalhes')}
                className={`py-4 border-b-2 transition-colors ${
                  abaGerenciamento === 'detalhes'
                    ? 'border-teal-600 text-teal-700 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span>Detalhes e Configurações</span>
                </div>
              </button>
            </div>
          </div>

          {/* Conteúdo da Aba de Inscritos */}
          {abaGerenciamento === 'inscritos' && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-900 mb-4">Alunos Inscritos</h2>
            
            {/* Barra de Busca e Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={buscaAluno}
                    onChange={(e) => setBuscaAluno(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Buscar por nome, matrícula, email ou curso..."
                  />
                </div>
              </div>

              <div>
                <select
                  value={filtroStatusInscricao}
                  onChange={(e) => setFiltroStatusInscricao(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Todos</option>
                  <option>Pendente</option>
                  <option>Aprovado</option>
                  <option>Reprovado</option>
                </select>
              </div>
            </div>

            {/* Contador de Resultados */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
              <span>
                <strong className="text-gray-900">{alunosFiltrados.length}</strong> aluno(s) encontrado(s)
              </span>
              <span>•</span>
              <span>
                <strong className="text-yellow-700">{alunosInscritos.filter(a => a.statusInscricao === 'Pendente').length}</strong> pendente(s)
              </span>
              <span>•</span>
              <span>
                <strong className="text-green-700">{alunosInscritos.filter(a => a.statusInscricao === 'Aprovado').length}</strong> aprovado(s)
              </span>
            </div>
          </div>

          {/* Lista de Alunos */}
          <div className="overflow-x-auto">
            {alunosFiltrados.length === 0 ? (
              <div className="p-12 text-center">
                <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum aluno encontrado com os filtros selecionados</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aluno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Matrícula
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Curso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data Inscrição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alunosFiltrados.map((aluno) => (
                    <tr key={aluno.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900 font-medium">{aluno.nome}</p>
                          <p className="text-gray-500 text-sm">{aluno.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {aluno.matricula}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900">{aluno.curso}</p>
                          <p className="text-gray-500 text-sm">{aluno.periodo} período</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm">
                        {aluno.dataInscricao}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusInscricaoColor(aluno.statusInscricao)}`}>
                          {aluno.statusInscricao}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {aluno.statusInscricao === 'Pendente' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => alert(`Aprovar inscrição de ${aluno.nome}`)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <CheckCircleIcon className="w-4 h-4" />
                              Aprovar
                            </button>
                            <button
                              onClick={() => setModalReprovacao({ aberto: true, aluno })}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              <XCircleIcon className="w-4 h-4" />
                              Reprovar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => alert(`Ver detalhes de ${aluno.nome}`)}
                            className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            <EyeIcon className="w-4 h-4" />
                            Ver Detalhes
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba de Participantes */}
      {abaGerenciamento === 'participantes' && (
        <div className="p-6">
          <h2 className="text-gray-900 mb-4">Participantes Ativos</h2>
          <p className="text-gray-600 mb-6">
            Alunos que foram aprovados e estão participando ativamente da oportunidade
          </p>

          {/* Lista de Participantes */}
          <div className="space-y-3">
            {alunosInscritos
              .filter(a => a.statusInscricao === 'Aprovado')
              .map((aluno) => (
                <div key={aluno.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {aluno.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">{aluno.nome}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{aluno.matricula}</span>
                          <span>•</span>
                          <span>{aluno.curso}</span>
                          <span>•</span>
                          <span>{aluno.periodo} período</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        ✓ Ativo
                      </span>
                      <button
                        onClick={() => alert(`Ver perfil de ${aluno.nome}`)}
                        className="flex items-center gap-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors text-sm"
                      >
                        <EyeIcon className="w-4 h-4" />
                        Ver Perfil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Estatísticas */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-teal-700 mb-1">
                <UsersIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Total Participantes</span>
              </div>
              <p className="text-2xl font-bold text-teal-900">
                {alunosInscritos.filter(a => a.statusInscricao === 'Aprovado').length}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-700 mb-1">
                <CalendarIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Data de Início</span>
              </div>
              <p className="text-lg font-semibold text-blue-900">
                {oportunidadeGerenciar.periodo.split(' - ')[0] || oportunidadeGerenciar.periodo}
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-700 mb-1">
                <ClockIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Carga Horária</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {oportunidadeGerenciar.cargaHoraria}h
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba de Detalhes */}
      {abaGerenciamento === 'detalhes' && (
        <div className="p-6 space-y-6">
          {/* Informações da Oportunidade */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
            <h3 className="text-teal-900 mb-4">Informações da Oportunidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-teal-700 mb-1">Título</p>
                <p className="text-teal-900 font-medium">{oportunidadeGerenciar.titulo}</p>
              </div>
              <div>
                <p className="text-teal-700 mb-1">Modalidade</p>
                <p className="text-teal-900 font-medium">{oportunidadeGerenciar.modalidade}</p>
              </div>
              <div>
                <p className="text-teal-700 mb-1">Carga Horária</p>
                <p className="text-teal-900 font-medium">{oportunidadeGerenciar.cargaHoraria}h</p>
              </div>
              <div>
                <p className="text-teal-700 mb-1">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(oportunidadeGerenciar.status)}`}>
                  {oportunidadeGerenciar.status}
                </span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-900 mb-3">Descrição</h3>
            <p className="text-gray-700 leading-relaxed">{oportunidadeGerenciar.descricao}</p>
          </div>

          {/* Configurações */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-900 mb-4">Configurações</h3>
            <div className="space-y-4">
              <button 
                onClick={() => setModoEdicao(true)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="text-gray-900">Editar Detalhes</p>
                    <p className="text-gray-600 text-sm">Alterar informações da oportunidade</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>

              <button 
                onClick={() => setModalComunicado(true)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="text-gray-900">Enviar Comunicado</p>
                    <p className="text-gray-600 text-sm">Notificar todos os inscritos</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <div className="flex items-center gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <p className="text-red-900">Encerrar Oportunidade</p>
                    <p className="text-red-700 text-sm">Finalizar inscrições e atividades</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    );
  }

  // Página de Detalhes da Oportunidade (similar à página pública)
  if (oportunidadeDetalhes && oportunidadeDetalhes.modalidade !== 'Grupo Acadêmico') {
    const vagasDisponiveis = (oportunidadeDetalhes.vagas || 0) - (oportunidadeDetalhes.inscritos || 0);
    const percentualPreenchido = ((oportunidadeDetalhes.inscritos || 0) / (oportunidadeDetalhes.vagas || 1)) * 100;
    const Icon = (() => {
      switch (oportunidadeDetalhes.modalidade) {
        case 'Projeto': return BookOpenIcon;
        case 'Evento': return CalendarIcon;
        case 'Curso': return TrophyIcon;
        case 'Oficina': return UsersIcon;
        default: return BookOpenIcon;
      }
    })();

    return (
      <div className="space-y-6">
        {/* Botão Voltar */}
        <button
          onClick={() => setOportunidadeDetalhes(null)}
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
                <h1 className="text-gray-900 text-2xl">{oportunidadeDetalhes.titulo}</h1>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(oportunidadeDetalhes.status)}`}>
                  {oportunidadeDetalhes.status}
                </span>
              </div>
              <p className="text-gray-600">{oportunidadeDetalhes.modalidade}</p>
            </div>
          </div>

          {/* Botão de Inscrição Principal */}
          {user.role === 'discente' && oportunidadeDetalhes.status === 'Aberta' && (
            <>
              {vagasDisponiveis > 0 ? (
                <button
                  onClick={() => {
                    setOportunidadeParaInscrever(oportunidadeDetalhes);
                    setOportunidadeDetalhes(null);
                  }}
                  className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Fazer Inscrição
                </button>
              ) : (
                <div className="w-full bg-red-50 border border-red-200 text-red-700 py-4 rounded-lg flex items-center justify-center gap-2">
                  <ExclamationCircleIcon className="w-5 h-5" />
                  Vagas Esgotadas
                </div>
              )}
            </>
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
                {oportunidadeDetalhes.descricao}
              </p>
            </div>

            {/* Informações sobre Participação */}
            {user.role === 'discente' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-blue-900 mb-3">Como Participar</h3>
                <div className="space-y-2 text-blue-800 text-sm">
                  <p>• <strong>Passo 1:</strong> Clique no botão "Fazer Inscrição" acima</p>
                  <p>• <strong>Passo 2:</strong> Revise as informações e confirme sua inscrição</p>
                  <p>• <strong>Passo 3:</strong> Aguarde a análise do responsável pela oportunidade</p>
                  <p>• <strong>Passo 4:</strong> Acompanhe o status da sua inscrição no portal</p>
                </div>
              </div>
            )}
          </div>

          {/* Coluna Lateral - Informações */}
          <div className="space-y-6">
            {/* Disponibilidade de Vagas */}
            {oportunidadeDetalhes.vagas && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-900 mb-4">Disponibilidade de Vagas</h3>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{oportunidadeDetalhes.vagas}</p>
                    <p className="text-xs text-gray-600">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{oportunidadeDetalhes.inscritos}</p>
                    <p className="text-xs text-gray-600">Inscritos</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${vagasDisponiveis > 0 ? 'text-teal-600' : 'text-red-600'}`}>
                      {vagasDisponiveis}
                    </p>
                    <p className="text-xs text-gray-600">Disponíveis</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      vagasDisponiveis > 0 ? 'bg-teal-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${percentualPreenchido}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600">
                  {percentualPreenchido.toFixed(0)}% preenchido
                </p>
              </div>
            )}

            {/* Informações Detalhadas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-900 mb-4">Informações</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">Carga Horária</p>
                    <p className="text-gray-900">{oportunidadeDetalhes.cargaHoraria} horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">Período</p>
                    <p className="text-gray-900">{oportunidadeDetalhes.periodo}</p>
                  </div>
                </div>

                {oportunidadeDetalhes.local && (
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-600 text-sm">Local</p>
                      <p className="text-gray-900">{oportunidadeDetalhes.local}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <UsersIcon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">Responsável</p>
                    <p className="text-gray-900">{oportunidadeDetalhes.responsavel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <h3 className="text-teal-900 mb-3">Benefícios</h3>
              <div className="space-y-2 text-teal-800 text-sm">
                <p>✓ Certificado digital ao concluir</p>
                <p>✓ {oportunidadeDetalhes.cargaHoraria}h de extensão universitária</p>
                <p>✓ Experiência prática na área</p>
                <p>✓ Impacto social na comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showNovaOportunidade && user.role !== 'discente') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">
            {tipoFormulario === 'oportunidade' ? 'Nova Oportunidade de Extensão' : 'Criar Grupo Acadêmico'}
          </h2>
          <button
            onClick={() => {
              setShowNovaOportunidade(false);
              setTipoFormulario('oportunidade');
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
          >
            <XMarkIcon className="w-5 h-5" />
            Cancelar
          </button>
        </div>

        {/* Seletor de Tipo */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTipoFormulario('oportunidade')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                tipoFormulario === 'oportunidade'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BookOpenIcon className="w-5 h-5" />
              Oportunidade de Extensão
            </button>
            <button
              onClick={() => setTipoFormulario('grupo')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                tipoFormulario === 'grupo'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <UsersIcon className="w-5 h-5" />
              Grupo Acadêmico
            </button>
          </div>
        </div>

        {/* Formulário de Oportunidade */}
        {tipoFormulario === 'oportunidade' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
              <p className="text-teal-800 text-sm">
                Cadastro de novas oportunidades de extensão com validação obrigatória
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Título da Oportunidade *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Digite o título da atividade"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Descrição *</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    rows={4}
                    placeholder="Descreva os objetivos e atividades previstas"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Modalidade *</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option>Projeto</option>
                    <option>Evento</option>
                    <option>Curso</option>
                    <option>Oficina</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Carga Horária (horas) *</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Ex: 40"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Número de Vagas *</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Ex: 30"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Local de Realização *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Ex: Campus Principal"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Período de Inscrição (Início)</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Período de Inscrição (Fim)</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                  onClick={handleCriarOportunidade}
                >
                  Criar Oportunidade
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowNovaOportunidade(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Formulário de Grupo Acadêmico */}
        {tipoFormulario === 'grupo' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <p className="text-indigo-800 text-sm">
                <strong>Grupos Acadêmicos:</strong> Ao criar um grupo, você será o docente responsável e deverá designar 
                um discente líder. A criação será enviada para aprovação da coordenação.
              </p>
            </div>

            <form onSubmit={handleSubmitGrupo} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Nome do Grupo *</label>
                  <input
                    type="text"
                    required
                    value={formularioGrupo.nome}
                    onChange={(e) => setFormularioGrupo({ ...formularioGrupo, nome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: Liga Acadêmica de Cardiologia"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Tipo do Grupo *</label>
                  <select
                    required
                    value={formularioGrupo.tipoGrupo}
                    onChange={(e) => setFormularioGrupo({ ...formularioGrupo, tipoGrupo: e.target.value as TipoGrupo })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Liga Acadêmica</option>
                    <option>Grupo de Estudos</option>
                    <option>Projeto de Pesquisa</option>
                    <option>Grupo de Extensão</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Descrição Breve *</label>
                  <textarea
                    required
                    value={formularioGrupo.descricao}
                    onChange={(e) => setFormularioGrupo({ ...formularioGrupo, descricao: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={2}
                    placeholder="Descreva brevemente o que é o grupo"
                    maxLength={200}
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Objetivo do Grupo *</label>
                  <textarea
                    required
                    value={formularioGrupo.objetivo}
                    onChange={(e) => setFormularioGrupo({ ...formularioGrupo, objetivo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                    placeholder="Descreva os objetivos principais do grupo"
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Atividades Planejadas *</label>
                  <textarea
                    required
                    value={formularioGrupo.atividades}
                    onChange={(e) => setFormularioGrupo({ ...formularioGrupo, atividades: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                    placeholder="Descreva as atividades que o grupo pretende realizar"
                  ></textarea>
                </div>

                {/* Discente Líder */}
                <div className="md:col-span-2 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <UsersIcon className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-gray-900">Discente Líder</h3>
                  </div>
                  <p className="text-indigo-700 text-sm mb-4">
                    O discente líder poderá gerenciar membros e criar atividades vinculadas ao grupo.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        value={formularioGrupo.discenteLiderNome}
                        onChange={(e) => setFormularioGrupo({ ...formularioGrupo, discenteLiderNome: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: João Silva Santos"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Matrícula *</label>
                      <input
                        type="text"
                        required
                        value={formularioGrupo.discenteLiderMatricula}
                        onChange={(e) => setFormularioGrupo({ ...formularioGrupo, discenteLiderMatricula: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: 202301234"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Criar Grupo Acadêmico
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowNovaOportunidade(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Modal de Gerenciamento */}
      {oportunidadeGerenciar && (
        <ModalGerenciarOportunidade
          oportunidade={oportunidadeGerenciar}
          onClose={() => setOportunidadeGerenciar(null)}
        />
      )}

      {/* Modal de Confirmação de Inscrição */}
      {oportunidadeParaInscrever && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {!inscricaoConfirmada ? (
                <>
                  {/* Cabeçalho */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-gray-900 mb-2">Confirmar Inscrição</h2>
                      <p className="text-gray-600 text-sm">Revise as informações da oportunidade antes de confirmar</p>
                    </div>
                    <button
                      onClick={() => {
                        setOportunidadeParaInscrever(null);
                        setInscricaoConfirmada(false);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Detalhes da Oportunidade */}
                  <div className="space-y-4 mb-6">
                    {/* Título e Modalidade */}
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-teal-100 text-teal-600 p-2 rounded-lg">
                          {getModalidadeIcon(oportunidadeParaInscrever.modalidade)}
                        </div>
                        <div>
                          <h3 className="text-gray-900">{oportunidadeParaInscrever.titulo}</h3>
                          <p className="text-teal-700 text-sm">{oportunidadeParaInscrever.modalidade}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{oportunidadeParaInscrever.descricao}</p>
                    </div>

                    {/* Informações Principais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <ClockIcon className="w-4 h-4 text-teal-600" />
                          <span className="text-sm">Carga Horária</span>
                        </div>
                        <p className="text-gray-900">{oportunidadeParaInscrever.cargaHoraria} horas</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <CalendarIcon className="w-4 h-4 text-teal-600" />
                          <span className="text-sm">Período</span>
                        </div>
                        <p className="text-gray-900 text-sm">{oportunidadeParaInscrever.periodo}</p>
                      </div>

                      {oportunidadeParaInscrever.local && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <MapPinIcon className="w-4 h-4 text-teal-600" />
                            <span className="text-sm">Local</span>
                          </div>
                          <p className="text-gray-900 text-sm">{oportunidadeParaInscrever.local}</p>
                        </div>
                      )}

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <UsersIcon className="w-4 h-4 text-teal-600" />
                          <span className="text-sm">Vagas Disponíveis</span>
                        </div>
                        <p className="text-gray-900">
                          {(oportunidadeParaInscrever.vagas || 0) - (oportunidadeParaInscrever.inscritos || 0)} de {oportunidadeParaInscrever.vagas}
                        </p>
                      </div>
                    </div>

                    {/* Responsável */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 text-sm mb-1">Responsável pela Oportunidade</p>
                      <p className="text-gray-900">{oportunidadeParaInscrever.responsavel}</p>
                    </div>
                  </div>

                  {/* Confirmação */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="mt-1" 
                        id="confirmarLeitura"
                      />
                      <span className="text-gray-700 text-sm">
                        Declaro que li e compreendi todas as informações sobre esta oportunidade de extensão e confirmo meu interesse em participar.
                      </span>
                    </label>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const checkbox = document.getElementById('confirmarLeitura') as HTMLInputElement;
                        if (!checkbox?.checked) {
                          alert('Por favor, confirme que leu as informações antes de prosseguir.');
                          return;
                        }
                        setInscricaoConfirmada(true);
                      }}
                      className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                      Confirmar Inscrição
                    </button>
                    <button
                      onClick={() => {
                        setOportunidadeParaInscrever(null);
                        setInscricaoConfirmada(false);
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Tela de Confirmação de Sucesso */}
                  <div className="text-center py-8">
                    {/* Ícone de Sucesso */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="w-12 h-12 text-green-600" />
                    </div>

                    {/* Mensagem Principal */}
                    <h2 className="text-gray-900 mb-3">
                      Solicitação de inscrição confirmada!
                    </h2>

                    {/* Mensagem Secundária */}
                    <p className="text-gray-600 mb-8">
                      Aguarde o deferimento/indeferimento do responsável pela atividade
                    </p>

                    {/* Card da Oportunidade */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                      <p className="text-gray-600 text-sm mb-2">Oportunidade selecionada:</p>
                      <div className="flex items-center gap-3">
                        <div className="bg-teal-100 text-teal-600 p-2 rounded-lg">
                          {getModalidadeIcon(oportunidadeParaInscrever.modalidade)}
                        </div>
                        <div>
                          <p className="text-gray-900">{oportunidadeParaInscrever.titulo}</p>
                          <p className="text-gray-600 text-sm">{oportunidadeParaInscrever.cargaHoraria}h • {oportunidadeParaInscrever.responsavel}</p>
                        </div>
                      </div>
                    </div>

                    {/* Botão Fechar */}
                    <button
                      onClick={() => {
                        setOportunidadeParaInscrever(null);
                        setInscricaoConfirmada(false);
                      }}
                      className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Voltar ao Portal
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Criação */}
      {showModalConfirmacao && dadosCriacao && (
        <ModalConfirmacaoCriacao
          tipo={dadosCriacao.tipo}
          titulo={dadosCriacao.titulo}
          onClose={handleCloseModalConfirmacao}
        />
      )}

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Portal de Oportunidades</h2>
          <p className="text-gray-600 mt-1">Explore oportunidades de extensão e grupos acadêmicos</p>
        </div>
        {user.role !== 'discente' && (
          <button
            onClick={() => setShowNovaOportunidade(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Criar Nova
          </button>
        )}
      </div>

      {/* Alerta: Grupos Criados por Mim Aguardando Aprovação */}
      {user.role !== 'discente' && gruposCriadosPorMim.some(g => g.status === 'Pendente') && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ExclamationCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-indigo-900 mb-2">
                <strong>Você tem {gruposCriadosPorMim.filter(g => g.status === 'Pendente').length} grupo(s) aguardando aprovação da coordenação</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {gruposCriadosPorMim
                  .filter(g => g.status === 'Pendente')
                  .map((grupo) => (
                    <span key={grupo.id} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm">
                      {grupo.titulo}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Buscar oportunidades e grupos..."
              />
            </div>
          </div>

          <div>
            <select
              value={filtroModalidade}
              onChange={(e) => setFiltroModalidade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option>Todas</option>
              <option>Projeto</option>
              <option>Evento</option>
              <option>Curso</option>
              <option>Oficina</option>
              <option>Grupo Acadêmico</option>
            </select>
          </div>

          <div>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option>Todas</option>
              <option>Aberta</option>
              <option>Em Execução</option>
              <option>Encerrada</option>
              <option>Aprovado</option>
              <option>Pendente</option>
              <option>Reprovado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Oportunidades e Grupos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {oportunidadesFiltradas.map((oportunidade) => {
          const vagasDisponiveis = oportunidade.vagas !== undefined 
            ? (oportunidade.vagas || 0) - (oportunidade.inscritos || 0)
            : 0;
          const percentualPreenchido = oportunidade.vagas !== undefined
            ? ((oportunidade.inscritos || 0) / oportunidade.vagas) * 100
            : 0;

          return (
            <div key={oportunidade.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Renderização para Oportunidades Normais (estilo página pública) */}
                {oportunidade.modalidade !== 'Grupo Acadêmico' ? (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal-100">
                          <div className="w-6 h-6 text-teal-600">
                            {getModalidadeIcon(oportunidade.modalidade)}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-gray-900">{oportunidade.titulo}</h3>
                          <p className="text-gray-600 text-sm">{oportunidade.modalidade}</p>
                        </div>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {oportunidade.descricao}
                    </p>

                    {/* Informações */}
                    <div className="space-y-2 mb-4">
                      {oportunidade.local && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPinIcon className="w-4 h-4 text-gray-400" />
                          <span>{oportunidade.local}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span>{oportunidade.periodo}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span>{oportunidade.cargaHoraria}h</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <UsersIcon className="w-4 h-4 text-gray-400" />
                        <span>{oportunidade.responsavel}</span>
                      </div>
                    </div>

                    {/* Vagas */}
                    {oportunidade.vagas !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Vagas:</span>
                          <span className={vagasDisponiveis > 0 ? 'text-teal-600 font-medium' : 'text-red-600 font-medium'}>
                            {vagasDisponiveis > 0 
                              ? `${vagasDisponiveis} disponíveis` 
                              : 'Esgotadas'
                            }
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              vagasDisponiveis > 0 ? 'bg-teal-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${percentualPreenchido}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {oportunidade.inscritos}/{oportunidade.vagas} inscritos
                        </p>
                      </div>
                    )}

                    {/* Footer com Status e Ação */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(oportunidade.status)}`}>
                        {oportunidade.status}
                      </span>
                      
                      {/* Botões para Discentes */}
                      {user.role === 'discente' && oportunidade.status === 'Aberta' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOportunidadeDetalhes(oportunidade)}
                            className="flex items-center gap-1 px-3 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm"
                          >
                            <InformationCircleIcon className="w-4 h-4" />
                            Ver Detalhes
                          </button>
                          <button
                            onClick={() => setOportunidadeParaInscrever(oportunidade)}
                            disabled={vagasDisponiveis === 0}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                              vagasDisponiveis > 0
                                ? 'bg-teal-600 text-white hover:bg-teal-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {vagasDisponiveis > 0 ? (
                              <>
                                <UserPlusIcon className="w-4 h-4" />
                                Inscrever-se
                              </>
                            ) : (
                              <>
                                <CheckCircleIcon className="w-4 h-4" />
                                Esgotado
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Botões para Docentes/Coordenadores */}
                      {user.role !== 'discente' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOportunidadeGerenciar(oportunidade)}
                            className="flex items-center gap-1 px-3 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm"
                          >
                            <Cog6ToothIcon className="w-4 h-4" />
                            Gerenciar
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  /* Renderização para Grupos Acadêmicos */
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                          {getModalidadeIcon(oportunidade.modalidade)}
                        </div>
                        <div>
                          <h3 className="text-gray-900">{oportunidade.titulo}</h3>
                          <p className="text-gray-600 text-sm">{oportunidade.tipoGrupo}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(oportunidade.status)}`}>
                        {oportunidade.status}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{oportunidade.descricao}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <UsersIcon className="w-4 h-4 text-indigo-600" />
                        <span>Líder: {oportunidade.discenteLider?.nome}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <UsersIcon className="w-4 h-4" />
                        <span>{oportunidade.membros} membro(s)</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{oportunidade.periodo}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Responsável:</strong> {oportunidade.responsavel}
                    </p>

                    {/* Motivo de Reprovação (se houver) */}
                    {oportunidade.status === 'Reprovado' && oportunidade.motivoReprovacao && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-700 text-sm">
                          <strong>Motivo da Reprovação:</strong>
                        </p>
                        <p className="text-red-600 text-xs mt-1">{oportunidade.motivoReprovacao}</p>
                      </div>
                    )}

                    <button
                      onClick={() => setOportunidadeSelecionada(
                        oportunidadeSelecionada === oportunidade.id ? null : oportunidade.id
                      )}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      <EyeIcon className="w-4 h-4" />
                      {oportunidadeSelecionada === oportunidade.id ? 'Ocultar Detalhes' : 'Ver Detalhes'}
                    </button>

                    {/* Detalhes Expandidos */}
                    {oportunidadeSelecionada === oportunidade.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1"><strong>Objetivo:</strong></p>
                          <p className="text-gray-700">{oportunidade.objetivo}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1"><strong>Atividades:</strong></p>
                          <p className="text-gray-700">{oportunidade.atividades}</p>
                        </div>
                        {oportunidade.dataAprovacao && (
                          <div>
                            <p className="text-gray-600">
                              <strong>Aprovado em:</strong> {oportunidade.dataAprovacao}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ações para Coordenador */}
                    {user.role === 'coordenador' && oportunidade.status === 'Pendente' && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleAprovarGrupo(oportunidade.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                          Aprovar
                        </button>
                        <button
                          onClick={() => handleReprovarGrupo(oportunidade.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <XMarkIcon className="w-4 h-4" />
                          Reprovar
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {oportunidadesFiltradas.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <FunnelIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhuma oportunidade encontrada com os filtros selecionados</p>
        </div>
      )}
    </div>
  );
}