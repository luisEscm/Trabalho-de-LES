import { useState } from 'react';
import { User } from '../App';
import {
  ChatBubbleBottomCenterTextIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  MapPinIcon,
  ExclamationCircleIcon,
  MegaphoneIcon,
  BookOpenIcon,
  TrophyIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PaperAirplaneIcon,
  PlusIcon,
  XMarkIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface ComunidadeProps {
  user: User;
}

interface Comunicado {
  id: number;
  titulo: string;
  conteudo: string;
  autor: {
    nome: string;
    role: 'coordenador' | 'docente';
    avatar?: string;
  };
  categoria: 'geral' | 'oportunidades' | 'avisos' | 'eventos' | 'certificacao';
  dataCriacao: string;
  fixado: boolean;
  segmentacao?: {
    tipo: 'todos' | 'curso' | 'semestre' | 'grupo' | 'personalizado';
    cursos?: string[];
    semestres?: string[];
    grupos?: string[];
  };
}

// Dados para segmentação
const cursos = [
  'Medicina',
  'Engenharia Agronômica',
  'Enfermagem',
  'Ciências da Computação',
  'Administração',
  'Direito',
  'Psicologia',
  'Agronomia'
];

const semestres = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º'];

const grupos = [
  'Grupo de Estudos em Sustentabilidade',
  'Liga de Extensão Rural',
  'Grupo de Pesquisa em Saúde Pública',
  'Liga Acadêmica de Medicina',
  'Grupo de Inovação Tecnológica'
];

export function Comunidade({ user }: ComunidadeProps) {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroRole, setFiltroRole] = useState<string>('todos');
  const [busca, setBusca] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Estados para criação de comunicados
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setCategoria] = useState<'geral' | 'oportunidades' | 'avisos' | 'eventos' | 'certificacao'>('geral');
  const [tipoSegmentacao, setTipoSegmentacao] = useState<'todos' | 'curso' | 'semestre' | 'grupo' | 'personalizado'>('todos');
  const [cursosSelecionados, setCursosSelecionados] = useState<string[]>([]);
  const [semestresSelecionados, setSemestresSelecionados] = useState<string[]>([]);
  const [gruposSelecionados, setGruposSelecionados] = useState<string[]>([]);

  // Dados mockados de comunicados
  const comunicadosMockInitial: Comunicado[] = [
    {
      id: 1,
      titulo: 'Novo Edital de Extensão 2024/2',
      conteudo: 'Informamos que está aberto o novo edital de extensão universitária para o segundo semestre de 2024. As inscrições podem ser realizadas até 20/01/2025. Confira os requisitos e documentos necessários no portal. Prioritariamente, serão aprovadas atividades com impacto social direto nas comunidades locais.',
      autor: {
        nome: 'Profa. Dra. Maria Santos',
        role: 'coordenador'
      },
      categoria: 'avisos',
      dataCriacao: '13/12/2024 09:30',
      fixado: true,
      segmentacao: { tipo: 'todos' }
    },
    {
      id: 2,
      titulo: 'Sistema de Grupos Acadêmicos Disponível',
      conteudo: 'Docentes podem agora criar grupos acadêmicos (ligas, grupos de estudo, projetos) através do Portal de Oportunidades. Ao criar um grupo, você deve designar um discente líder que terá permissões para adicionar membros e criar sub-atividades vinculadas ao grupo. Todas as criações passam por aprovação da coordenação.',
      autor: {
        nome: 'Coord. Prof. Ricardo Mendes',
        role: 'coordenador'
      },
      categoria: 'avisos',
      dataCriacao: '12/12/2024 14:20',
      fixado: true,
      segmentacao: { tipo: 'todos' }
    },
    {
      id: 3,
      titulo: 'Workshop: Como Elaborar Projetos de Extensão',
      conteudo: 'Será realizado no dia 20/12/2024, das 14h às 17h, no Auditório Central, um workshop sobre elaboração de projetos de extensão universitária. Inscrições gratuitas pelo sistema. Vagas limitadas! Certificado de 3 horas será emitido aos participantes.',
      autor: {
        nome: 'Profa. Dra. Juliana Costa',
        role: 'docente'
      },
      categoria: 'eventos',
      dataCriacao: '10/12/2024 16:45',
      fixado: false,
      segmentacao: { tipo: 'todos' }
    },
    {
      id: 4,
      titulo: 'Certificados Digitais Já Disponíveis',
      conteudo: 'Os certificados digitais das atividades de extensão concluídas em novembro já estão disponíveis para download. Acesse a aba "Certificados" para visualizar e baixar seus documentos. Cada certificado possui código único de verificação e QR Code para autenticação.',
      autor: {
        nome: 'Prof. Dr. Fernando Lima',
        role: 'docente'
      },
      categoria: 'certificacao',
      dataCriacao: '09/12/2024 11:00',
      fixado: false,
      segmentacao: { tipo: 'todos' }
    },
    {
      id: 5,
      titulo: 'Prazo para Solicitações de Aproveitamento',
      conteudo: 'Lembramos que o prazo para envio de solicitações de aproveitamento de horas de atividades externas termina em 20/12/2024. Não esqueça de anexar todos os documentos comprobatórios (certificados, declarações, etc.). As solicitações serão analisadas em até 10 dias úteis.',
      autor: {
        nome: 'Coord. Prof. Ricardo Mendes',
        role: 'coordenador'
      },
      categoria: 'avisos',
      dataCriacao: '08/12/2024 08:15',
      fixado: false,
      segmentacao: { tipo: 'semestre', semestres: ['8º', '9º', '10º'] }
    },
    {
      id: 6,
      titulo: 'Desenvolvimento Web para ONGs - Vagas Abertas',
      conteudo: 'Estão abertas as inscrições para o projeto Desenvolvimento Web para ONGs, que acontecerá no primeiro semestre de 2025. A iniciativa oferece 30 vagas para alunos a partir do 3º período e proporcionará 40 horas de extensão. Local: Laboratório de Desenvolvimento Web. Inscrições até 15/01/2025.',
      autor: {
        nome: 'Prof. Dr. João Silva',
        role: 'docente'
      },
      categoria: 'oportunidades',
      dataCriacao: '07/12/2024 15:30',
      fixado: false,
      segmentacao: { tipo: 'curso', cursos: ['Ciências da Computação', 'Sistemas de Informação'] }
    },
    {
      id: 7,
      titulo: 'Congresso Nacional de Extensão Universitária',
      conteudo: 'Acontecerá entre os dias 5 e 8 de março de 2025 o Congresso Nacional de Extensão Universitária em Brasília. Alunos interessados em apresentar trabalhos ou participar como ouvintes podem se inscrever pelo site oficial. A universidade oferecerá apoio financeiro para apresentadores de trabalhos aprovados.',
      autor: {
        nome: 'Profa. Dra. Ana Paula',
        role: 'docente'
      },
      categoria: 'eventos',
      dataCriacao: '06/12/2024 13:45',
      fixado: false,
      segmentacao: { tipo: 'todos' }
    },
    {
      id: 8,
      titulo: 'Atualização no Sistema de Extensão',
      conteudo: 'Informamos que o sistema passará por manutenção no próximo domingo (15/12) das 8h às 12h. Durante este período, não será possível acessar o portal. A manutenção visa implementar melhorias de performance e novas funcionalidades solicitadas pela comunidade acadêmica.',
      autor: {
        nome: 'Coord. Prof. Ricardo Mendes',
        role: 'coordenador'
      },
      categoria: 'geral',
      dataCriacao: '05/12/2024 10:20',
      fixado: false,
      segmentacao: { tipo: 'todos' }
    }
  ];

  const [comunicados, setComunicados] = useState<Comunicado[]>(comunicadosMockInitial);

  // Handlers para segmentação
  const handleToggleCurso = (curso: string) => {
    setCursosSelecionados(prev =>
      prev.includes(curso) ? prev.filter(c => c !== curso) : [...prev, curso]
    );
  };

  const handleToggleSemestre = (semestre: string) => {
    setSemestresSelecionados(prev =>
      prev.includes(semestre) ? prev.filter(s => s !== semestre) : [...prev, semestre]
    );
  };

  const handleToggleGrupo = (grupo: string) => {
    setGruposSelecionados(prev =>
      prev.includes(grupo) ? prev.filter(g => g !== grupo) : [...prev, grupo]
    );
  };

  const calcularDestinatarios = () => {
    if (tipoSegmentacao === 'todos') return 450;
    if (tipoSegmentacao === 'curso') return cursosSelecionados.length * 60;
    if (tipoSegmentacao === 'semestre') return semestresSelecionados.length * 45;
    if (tipoSegmentacao === 'grupo') return gruposSelecionados.length * 12;
    
    let total = 0;
    if (cursosSelecionados.length > 0) total += cursosSelecionados.length * 60;
    if (semestresSelecionados.length > 0) total += semestresSelecionados.length * 45;
    if (gruposSelecionados.length > 0) total += gruposSelecionados.length * 12;
    return total;
  };

  const handleCriarComunicado = () => {
    if (!titulo.trim() || !conteudo.trim()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (tipoSegmentacao === 'curso' && cursosSelecionados.length === 0) {
      toast.error('Selecione pelo menos um curso');
      return;
    }

    if (tipoSegmentacao === 'semestre' && semestresSelecionados.length === 0) {
      toast.error('Selecione pelo menos um semestre');
      return;
    }

    if (tipoSegmentacao === 'grupo' && gruposSelecionados.length === 0) {
      toast.error('Selecione pelo menos um grupo');
      return;
    }

    if (tipoSegmentacao === 'personalizado' && 
        cursosSelecionados.length === 0 && 
        semestresSelecionados.length === 0 && 
        gruposSelecionados.length === 0) {
      toast.error('Selecione pelo menos um filtro (curso, semestre ou grupo)');
      return;
    }

    const novoComunicado: Comunicado = {
      id: comunicados.length + 1,
      titulo,
      conteudo,
      autor: {
        nome: user.nome,
        role: user.role as 'coordenador' | 'docente'
      },
      categoria,
      dataCriacao: new Date().toLocaleString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      fixado: false,
      segmentacao: {
        tipo: tipoSegmentacao,
        cursos: cursosSelecionados.length > 0 ? cursosSelecionados : undefined,
        semestres: semestresSelecionados.length > 0 ? semestresSelecionados : undefined,
        grupos: gruposSelecionados.length > 0 ? gruposSelecionados : undefined
      }
    };

    setComunicados([novoComunicado, ...comunicados]);
    
    // Limpar formulário
    setTitulo('');
    setConteudo('');
    setCategoria('geral');
    setTipoSegmentacao('todos');
    setCursosSelecionados([]);
    setSemestresSelecionados([]);
    setGruposSelecionados([]);
    setMostrarFormulario(false);

    toast.success('Comunicado publicado com sucesso!');
  };

  // Filtrar comunicados
  const comunicadosFiltrados = comunicados.filter((comunicado) => {
    const matchCategoria = filtroCategoria === 'todas' || comunicado.categoria === filtroCategoria;
    const matchRole = filtroRole === 'todos' || comunicado.autor.role === filtroRole;
    const matchBusca = 
      busca === '' ||
      comunicado.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      comunicado.conteudo.toLowerCase().includes(busca.toLowerCase()) ||
      comunicado.autor.nome.toLowerCase().includes(busca.toLowerCase());
    
    return matchCategoria && matchRole && matchBusca;
  });

  // Ordenar: fixados primeiro
  const comunicadosOrdenados = [...comunicadosFiltrados].sort((a, b) => {
    if (a.fixado && !b.fixado) return -1;
    if (!a.fixado && b.fixado) return 1;
    return 0;
  });

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'oportunidades':
        return <BookOpenIcon className="w-4 h-4" />;
      case 'avisos':
        return <ExclamationCircleIcon className="w-4 h-4" />;
      case 'eventos':
        return <CalendarIcon className="w-4 h-4" />;
      case 'certificacao':
        return <TrophyIcon className="w-4 h-4" />;
      default:
        return <MegaphoneIcon className="w-4 h-4" />;
    }
  };

  const getCategoriaLabel = (categoria: string) => {
    switch (categoria) {
      case 'oportunidades':
        return 'Oportunidades';
      case 'avisos':
        return 'Avisos';
      case 'eventos':
        return 'Eventos';
      case 'certificacao':
        return 'Certificação';
      default:
        return 'Geral';
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'oportunidades':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'avisos':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'eventos':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'certificacao':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    return role === 'coordenador' ? 'Coordenação' : 'Docente';
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'coordenador' ? 'bg-teal-600' : 'bg-blue-600';
  };

  const getSegmentacaoLabel = (comunicado: Comunicado) => {
    if (!comunicado.segmentacao) return 'Todos os alunos';
    
    switch (comunicado.segmentacao.tipo) {
      case 'todos':
        return 'Todos os alunos';
      case 'curso':
        return comunicado.segmentacao.cursos?.join(', ') || '';
      case 'semestre':
        return `Semestres: ${comunicado.segmentacao.semestres?.join(', ')}`;
      case 'grupo':
        return comunicado.segmentacao.grupos?.join(', ') || '';
      case 'personalizado':
        const partes = [];
        if (comunicado.segmentacao.cursos?.length) partes.push(`Cursos: ${comunicado.segmentacao.cursos.join(', ')}`);
        if (comunicado.segmentacao.semestres?.length) partes.push(`Semestres: ${comunicado.segmentacao.semestres.join(', ')}`);
        if (comunicado.segmentacao.grupos?.length) partes.push(`Grupos: ${comunicado.segmentacao.grupos.join(', ')}`);
        return partes.join(' | ');
      default:
        return '';
    }
  };

  // Verificar se o usuário pode criar comunicados
  const podePublicar = user.role === 'docente' || user.role === 'coordenador';

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
              <h1>Mural de Avisos</h1>
            </div>
            <p className="text-teal-100">
              {podePublicar 
                ? 'Publique comunicados e avisos para os discentes'
                : 'Acompanhe comunicados, avisos, oportunidades e eventos'
              }
            </p>
          </div>
          {podePublicar && !mostrarFormulario && (
            <Button
              onClick={() => setMostrarFormulario(true)}
              className="bg-white text-teal-700 hover:bg-teal-50"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Novo Comunicado
            </Button>
          )}
        </div>
      </div>

      {/* Formulário de Novo Comunicado */}
      {mostrarFormulario && podePublicar && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-900">Novo Comunicado</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMostrarFormulario(false);
                setTitulo('');
                setConteudo('');
                setCategoria('geral');
                setTipoSegmentacao('todos');
                setCursosSelecionados([]);
                setSemestresSelecionados([]);
                setGruposSelecionados([]);
              }}
            >
              <XMarkIcon className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Título */}
            <div>
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título do comunicado"
                className="mt-1.5"
              />
            </div>

            {/* Conteúdo */}
            <div>
              <Label htmlFor="conteudo">Conteúdo *</Label>
              <Textarea
                id="conteudo"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                placeholder="Digite o conteúdo do comunicado"
                rows={5}
                className="mt-1.5"
              />
            </div>

            {/* Categoria */}
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={categoria}
                onValueChange={(value: any) => setCategoria(value)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Geral</SelectItem>
                  <SelectItem value="oportunidades">Oportunidades</SelectItem>
                  <SelectItem value="avisos">Avisos</SelectItem>
                  <SelectItem value="eventos">Eventos</SelectItem>
                  <SelectItem value="certificacao">Certificação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Segmentação */}
            <div>
              <Label htmlFor="segmentacao">Destinatários</Label>
              <Select
                value={tipoSegmentacao}
                onValueChange={(value: any) => {
                  setTipoSegmentacao(value);
                  setCursosSelecionados([]);
                  setSemestresSelecionados([]);
                  setGruposSelecionados([]);
                }}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Alunos</SelectItem>
                  <SelectItem value="curso">Segmentar por Curso</SelectItem>
                  <SelectItem value="semestre">Segmentar por Semestre</SelectItem>
                  <SelectItem value="grupo">Segmentar por Grupo</SelectItem>
                  <SelectItem value="personalizado">Segmentação Personalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Segmentação por Curso */}
            {(tipoSegmentacao === 'curso' || tipoSegmentacao === 'personalizado') && (
              <div className="border border-gray-200 rounded-lg p-4">
                <Label className="mb-3 block">Selecione os Cursos</Label>
                <div className="grid grid-cols-2 gap-3">
                  {cursos.map(curso => (
                    <div key={curso} className="flex items-center space-x-2">
                      <Checkbox
                        id={`curso-${curso}`}
                        checked={cursosSelecionados.includes(curso)}
                        onCheckedChange={() => handleToggleCurso(curso)}
                      />
                      <label
                        htmlFor={`curso-${curso}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {curso}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Segmentação por Semestre */}
            {(tipoSegmentacao === 'semestre' || tipoSegmentacao === 'personalizado') && (
              <div className="border border-gray-200 rounded-lg p-4">
                <Label className="mb-3 block">Selecione os Semestres</Label>
                <div className="grid grid-cols-5 gap-3">
                  {semestres.map(semestre => (
                    <div key={semestre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`semestre-${semestre}`}
                        checked={semestresSelecionados.includes(semestre)}
                        onCheckedChange={() => handleToggleSemestre(semestre)}
                      />
                      <label
                        htmlFor={`semestre-${semestre}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {semestre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Segmentação por Grupo */}
            {(tipoSegmentacao === 'grupo' || tipoSegmentacao === 'personalizado') && (
              <div className="border border-gray-200 rounded-lg p-4">
                <Label className="mb-3 block">Selecione os Grupos</Label>
                <div className="space-y-2">
                  {grupos.map(grupo => (
                    <div key={grupo} className="flex items-center space-x-2">
                      <Checkbox
                        id={`grupo-${grupo}`}
                        checked={gruposSelecionados.includes(grupo)}
                        onCheckedChange={() => handleToggleGrupo(grupo)}
                      />
                      <label
                        htmlFor={`grupo-${grupo}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {grupo}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resumo de Destinatários */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">Total de Destinatários:</span>
                </div>
                <span className="text-teal-600 font-semibold">{calcularDestinatarios()} alunos</span>
              </div>
            </div>

            {/* Botão Publicar */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setMostrarFormulario(false);
                  setTitulo('');
                  setConteudo('');
                  setCategoria('geral');
                  setTipoSegmentacao('todos');
                  setCursosSelecionados([]);
                  setSemestresSelecionados([]);
                  setGruposSelecionados([]);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCriarComunicado}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                Publicar Comunicado
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Busca e Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        {/* Busca */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar comunicados..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Botão Filtros */}
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
        >
          <FunnelIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Filtros avançados</span>
          {mostrarFiltros ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>

        {/* Filtros Expandidos */}
        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            {/* Filtro por Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="todas">Todas as categorias</option>
                <option value="geral">Geral</option>
                <option value="oportunidades">Oportunidades</option>
                <option value="avisos">Avisos</option>
                <option value="eventos">Eventos</option>
                <option value="certificacao">Certificação</option>
              </select>
            </div>

            {/* Filtro por Autor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publicado por</label>
              <select
                value={filtroRole}
                onChange={(e) => setFiltroRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="todos">Todos</option>
                <option value="coordenador">Coordenação</option>
                <option value="docente">Docentes</option>
              </select>
            </div>
          </div>
        )}

        {/* Contadores */}
        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t border-gray-200">
          <span>
            <strong className="text-gray-900">{comunicadosOrdenados.length}</strong> comunicado(s) encontrado(s)
          </span>
          {comunicadosOrdenados.filter(c => c.fixado).length > 0 && (
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4 text-teal-600" />
              <strong className="text-gray-900">{comunicadosOrdenados.filter(c => c.fixado).length}</strong> fixado(s)
            </span>
          )}
        </div>
      </div>

      {/* Lista de Comunicados */}
      <div className="space-y-4">
        {comunicadosOrdenados.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ChatBubbleBottomCenterTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium mb-2">Nenhum comunicado encontrado</p>
            <p className="text-gray-500 text-sm">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          comunicadosOrdenados.map((comunicado) => (
            <div
              key={comunicado.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${
                comunicado.fixado ? 'ring-2 ring-teal-500' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {comunicado.fixado && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                          <MapPinIcon className="w-3.5 h-3.5" />
                          Fixado
                        </span>
                      )}
                      <span
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoriaColor(
                          comunicado.categoria
                        )}`}
                      >
                        {getCategoriaIcon(comunicado.categoria)}
                        {getCategoriaLabel(comunicado.categoria)}
                      </span>
                    </div>
                    <h3 className="text-gray-900 font-semibold mb-3">{comunicado.titulo}</h3>
                  </div>
                </div>

                {/* Informações do Autor */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {comunicado.autor.nome.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm">{comunicado.autor.nome}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 ${getRoleBadgeColor(
                          comunicado.autor.role
                        )} text-white rounded text-xs font-medium`}
                      >
                        {getRoleLabel(comunicado.autor.role)}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <ClockIcon className="w-3.5 h-3.5" />
                        {comunicado.dataCriacao}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <p className="text-gray-700 leading-relaxed mb-4">{comunicado.conteudo}</p>

                {/* Segmentação */}
                {comunicado.segmentacao && comunicado.segmentacao.tipo !== 'todos' && (
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <Badge variant="outline" className="text-teal-700 border-teal-300 bg-teal-50 font-medium">
                      <FunnelIcon className="w-3.5 h-3.5 mr-1.5" />
                      {getSegmentacaoLabel(comunicado)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
