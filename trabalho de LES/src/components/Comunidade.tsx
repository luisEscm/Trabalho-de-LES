import { useState, useEffect } from 'react';
import { User } from '../App';
import {
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ExclamationCircleIcon,
  MegaphoneIcon,
  BookOpenIcon,
  TrophyIcon,
  ClockIcon,
  PlusIcon,
  UsersIcon,
  TrashIcon,
  UserPlusIcon,
  IdentificationIcon,
  CheckBadgeIcon,
  CheckIcon,
  XMarkIcon,
  BellIcon,
  ShieldCheckIcon,
  UserMinusIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';

interface ComunidadeProps {
  user: User;
  initialGroupId?: number;
}

interface Comunicado {
  id: number;
  titulo: string;
  conteudo: string;
  autor: {
    nome: string;
    role: 'coordenador' | 'docente' | 'discente';
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

interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  lider: string;
  liderId: string;
  docenteResponsavel: string;
  membrosCount: number;
  atividadesCount: number;
  area: string;
  meuStatus: 'lider' | 'membro' | 'pendente' | 'nao_participa';
}

interface MembroGrupo {
  id: number;
  nome: string;
  matricula: string;
  curso: string;
  role: 'lider' | 'membro' | 'pendente' | 'docente'; // Adicionado 'docente'
  dataSolicitacao?: string;
}

interface AtividadeGrupo {
  id: number;
  titulo: string;
  data: string;
  status: 'planejada' | 'ativa' | 'concluida';
  inscritos: number;
}

// --- MOCK DATABASE ---

// Lista de cursos disponíveis
const cursosDisponiveis = [
  'Agronomia',
  'Zootecnia',
  'Engenharia',
  'Biologia',
  'Administração',
  'Sistemas de Informação'
];

// Lista de períodos disponíveis
const periodosDisponiveis = [
  '1º Período',
  '2º Período',
  '3º Período',
  '4º Período',
  '5º Período',
  '6º Período',
  '7º Período',
  '8º Período',
  '9º Período'
];

// Lista de docentes cadastrados no sistema (para seleção)
const docentesDisponiveis = [
  { id: 101, nome: 'Prof. Dr. Carlos Oliveira', matricula: 'DOC001', curso: 'Agronomia' },
  { id: 102, nome: 'Profa. Dra. Maria Santos', matricula: 'DOC002', curso: 'Zootecnia' },
  { id: 103, nome: 'Prof. Roberto Almeida', matricula: 'DOC003', curso: 'Engenharia' },
  { id: 104, nome: 'Profa. Ana Beatriz', matricula: 'DOC004', curso: 'Biologia' }
];

const initialGrupos: Grupo[] = [
  {
    id: 1,
    nome: 'Grupo de Estudos em Sustentabilidade',
    descricao: 'Focado em práticas sustentáveis na agricultura familiar e urbana.',
    lider: 'João Silva', 
    liderId: '1',
    docenteResponsavel: 'Prof. Dr. Carlos Oliveira',
    membrosCount: 5, // Ajustado contagem
    atividadesCount: 3,
    area: 'Agronomia',
    meuStatus: 'nao_participa'
  },
  {
    id: 2,
    nome: 'Liga de Extensão Rural',
    descricao: 'Promove ações diretas em comunidades rurais da região.',
    lider: 'Carlos Santos',
    liderId: '999',
    docenteResponsavel: 'Profa. Dra. Maria Santos',
    membrosCount: 25,
    atividadesCount: 8,
    area: 'Multidisciplinar',
    meuStatus: 'nao_participa'
  },
  {
    id: 3,
    nome: 'Grupo de Inovação Tecnológica',
    descricao: 'Desenvolvimento de soluções de software para problemas sociais.',
    lider: 'Ana Paula',
    liderId: '888',
    docenteResponsavel: 'Prof. Roberto Almeida',
    membrosCount: 15,
    atividadesCount: 2,
    area: 'Tecnologia',
    meuStatus: 'nao_participa'
  }
];

const mockMembersDB: Record<number, MembroGrupo[]> = {
  1: [
    { id: 1, nome: 'João Silva', matricula: '20231001', curso: 'Agronomia', role: 'lider' },
    { id: 101, nome: 'Prof. Dr. Carlos Oliveira', matricula: 'DOC001', curso: 'Docente', role: 'docente' }, // Docente como membro
    { id: 4, nome: 'Ana Costa', matricula: '20231002', curso: 'Engenharia', role: 'membro' },
    { id: 2, nome: 'Pedro Santos', matricula: '20230551', curso: 'Engenharia Ambiental', role: 'membro' },
    { id: 5, nome: 'Lucas Pereira', matricula: '20240101', curso: 'Agronomia', role: 'pendente', dataSolicitacao: '20/01/2025' },
  ],
  2: [
    { id: 102, nome: 'Profa. Dra. Maria Santos', matricula: 'DOC002', curso: 'Zootecnia', role: 'docente' }
  ],
  3: [
    { id: 103, nome: 'Prof. Roberto Almeida', matricula: 'DOC003', curso: 'Engenharia', role: 'docente' }
  ]
};

const mockActivitiesDB: Record<number, AtividadeGrupo[]> = {
  1: [
    { id: 1, titulo: 'Oficina de Compostagem', data: '20/12/2024', status: 'planejada', inscritos: 15 },
    { id: 2, titulo: 'Visita Técnica', data: '15/01/2025', status: 'planejada', inscritos: 8 },
    { id: 3, titulo: 'Palestra: Futuro Verde', data: '10/11/2024', status: 'concluida', inscritos: 45 },
  ],
  2: [],
  3: []
};

export function Comunidade({ user, initialGroupId }: ComunidadeProps) {
  const [grupos, setGrupos] = useState<Grupo[]>(() => {
    return initialGrupos.map(g => {
      const userInGroup = mockMembersDB[g.id]?.find(m => m.id === parseInt(user.id));
      
      if (userInGroup) {
        let status: Grupo['meuStatus'] = 'nao_participa';
        if (userInGroup.role === 'lider') status = 'lider';
        else if (userInGroup.role === 'membro') status = 'membro';
        else if (userInGroup.role === 'pendente') status = 'pendente';
        
        return { ...g, meuStatus: status };
      }
      return g;
    });
  });

  const [comunicados, setComunicados] = useState<Comunicado[]>([
    {
      id: 1,
      titulo: 'Novo Edital de Extensão 2024/2',
      conteudo: 'Informamos que está aberto o novo edital de extensão universitária.',
      autor: { nome: 'Coordenação', role: 'coordenador' },
      categoria: 'avisos',
      dataCriacao: '13/12/2024 09:30',
      fixado: true,
      segmentacao: { tipo: 'todos' }
    }
  ]);

  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setCategoria] = useState<'geral' | 'oportunidades' | 'avisos' | 'eventos' | 'certificacao'>('geral');
  
  // Estados para filtros de segmentação múltipla
  const [cursosFilterados, setCursosFilterados] = useState<string[]>([]);
  const [periodosFilterados, setPeriodosFilterados] = useState<string[]>([]);
  const [gruposFilterados, setGruposFilterados] = useState<string[]>([]);
  const [cardExpandido, setCardExpandido] = useState<'periodos' | 'cursos' | 'grupos' | null>(null);

  // --- ESTADOS DE GESTÃO DO GRUPO (MODAL) ---
  const [grupoSelecionado, setGrupoSelecionado] = useState<Grupo | null>(null);
  const [editMembros, setEditMembros] = useState<MembroGrupo[]>([]);
  const [editAtividades, setEditAtividades] = useState<AtividadeGrupo[]>([]);
  const [editNome, setEditNome] = useState('');
  const [editDescricao, setEditDescricao] = useState('');
  const [editDocente, setEditDocente] = useState('');
  
  // Inputs temporários
  const [novoMembroEmail, setNovoMembroEmail] = useState('');
  const [novaAtividadeTitulo, setNovaAtividadeTitulo] = useState('');
  const [novoAvisoTitulo, setNovoAvisoTitulo] = useState('');
  const [novoAvisoConteudo, setNovoAvisoConteudo] = useState('');
  const [mostarFormAvisoGrupo, setMostrarFormAvisoGrupo] = useState(false);

  useEffect(() => {
    if (initialGroupId) {
      const grupo = grupos.find(g => g.id === initialGroupId);
      if (grupo && grupo.meuStatus === 'lider') {
        abrirGestaoGrupo(grupo);
      }
    }
  }, [initialGroupId, grupos]);

  // --- HANDLERS ---

  const handleSolicitarEntrada = (grupoId: number) => {
    if (!mockMembersDB[grupoId]) mockMembersDB[grupoId] = [];
    const jaExiste = mockMembersDB[grupoId].some(m => m.id === parseInt(user.id));
    if (!jaExiste) {
      mockMembersDB[grupoId].push({
        id: parseInt(user.id),
        nome: user.nome,
        matricula: user.matricula,
        curso: 'Não informado',
        role: 'pendente',
        dataSolicitacao: new Date().toLocaleDateString('pt-BR')
      });
    }
    setGrupos(prev => prev.map(g => g.id === grupoId ? { ...g, meuStatus: 'pendente' } : g));
    toast.success('Solicitação enviada! Aguarde a aprovação do líder.');
  };

  const handleSairDoGrupo = (grupoId: number) => {
    const grupoAtual = grupos.find(g => g.id === grupoId);
    const eraMembroAtivo = grupoAtual?.meuStatus === 'membro';

    if (mockMembersDB[grupoId]) {
      mockMembersDB[grupoId] = mockMembersDB[grupoId].filter(m => m.id !== parseInt(user.id));
    }

    setGrupos(prev => prev.map(g => {
      if (g.id === grupoId) {
        return {
          ...g,
          meuStatus: 'nao_participa',
          membrosCount: eraMembroAtivo ? Math.max(0, g.membrosCount - 1) : g.membrosCount
        };
      }
      return g;
    }));

    toast.success('Você saiu do grupo.');
  };
  
  const abrirGestaoGrupo = (grupo: Grupo) => {
    setGrupoSelecionado(grupo);
    setEditMembros(mockMembersDB[grupo.id] || []);
    setEditAtividades(mockActivitiesDB[grupo.id] || []);
    setEditNome(grupo.nome);
    setEditDescricao(grupo.descricao);
    setEditDocente(grupo.docenteResponsavel);
  };

  const handleSalvarAlteracoesGrupo = () => {
    if (!grupoSelecionado) return;

    if (!editDocente.trim()) {
      toast.error('O grupo deve ter um docente responsável.');
      return;
    }

    setGrupos(prev => prev.map(g => g.id === grupoSelecionado.id ? {
      ...g,
      nome: editNome,
      descricao: editDescricao,
      docenteResponsavel: editDocente,
      membrosCount: editMembros.filter(m => m.role !== 'pendente').length,
      atividadesCount: editAtividades.length
    } : g));

    mockMembersDB[grupoSelecionado.id] = editMembros;
    mockActivitiesDB[grupoSelecionado.id] = editAtividades;

    toast.success('Alterações salvas com sucesso!');
    setGrupoSelecionado(null);
  };

  // --- Lógica de Mudança de Docente ---
  const handleChangeDocente = (novoDocenteNome: string) => {
    // 1. Achar o objeto do docente na lista de disponiveis
    const docenteObj = docentesDisponiveis.find(d => d.nome === novoDocenteNome);
    if (!docenteObj) return;

    setEditDocente(novoDocenteNome);

    // 2. Atualizar a lista de membros
    setEditMembros(prevMembros => {
      // Remove o docente antigo (se houver) da lista de membros
      const membrosSemDocenteAntigo = prevMembros.filter(m => m.role !== 'docente');
      
      // Adiciona o novo docente como membro
      const novoMembroDocente: MembroGrupo = {
        id: docenteObj.id,
        nome: docenteObj.nome,
        matricula: docenteObj.matricula,
        curso: docenteObj.curso, // ou 'Docente'
        role: 'docente'
      };

      return [...membrosSemDocenteAntigo, novoMembroDocente];
    });

    toast.info(`Docente responsável alterado para ${novoDocenteNome}`);
  };

  const handleConvidarMembro = () => {
    if (!novoMembroEmail.includes('@')) return toast.error('E-mail inválido');
    setEditMembros([...editMembros, {
      id: Date.now(),
      nome: novoMembroEmail.split('@')[0], 
      matricula: 'Pendente',
      curso: 'N/A',
      role: 'pendente',
      dataSolicitacao: new Date().toLocaleDateString('pt-BR')
    }]);
    setNovoMembroEmail('');
    toast.success('Convite enviado!');
  };

  const handleAprovar = (id: number) => {
    setEditMembros(prev => prev.map(m => m.id === id ? { ...m, role: 'membro' } : m));
    toast.success('Membro aprovado!');
  };

  const handleRejeitar = (id: number) => {
    setEditMembros(prev => prev.filter(m => m.id !== id));
    toast.info('Solicitação rejeitada.');
  };

  const handleAlterarCargo = (id: number, role: 'lider' | 'membro') => {
    setEditMembros(prev => prev.map(m => m.id === id ? { ...m, role } : m));
    toast.success('Cargo atualizado.');
  };

  const handleRemover = (id: number) => {
    setEditMembros(prev => prev.filter(m => m.id !== id));
    toast.success('Membro removido.');
  };

  const handleCriarAtividade = () => {
    if (!novaAtividadeTitulo.trim()) return;
    setEditAtividades([...editAtividades, {
      id: Date.now(),
      titulo: novaAtividadeTitulo,
      data: 'A definir',
      status: 'planejada',
      inscritos: 0
    }]);
    setNovaAtividadeTitulo('');
    toast.success('Atividade criada!');
  };

  const handlePostarAvisoGrupo = () => {
    if (!novoAvisoTitulo.trim()) return toast.error('Preencha o título');
    const novoAviso: Comunicado = {
      id: Date.now(),
      titulo: novoAvisoTitulo,
      conteudo: novoAvisoConteudo,
      autor: { nome: user.nome, role: 'discente' },
      categoria: 'avisos',
      dataCriacao: new Date().toLocaleString('pt-BR'),
      fixado: false,
      segmentacao: { tipo: 'grupo', grupos: [grupoSelecionado!.nome] }
    };
    setComunicados([novoAviso, ...comunicados]);
    setNovoAvisoTitulo(''); setNovoAvisoConteudo(''); setMostrarFormAvisoGrupo(false);
    toast.success('Aviso postado!');
  };

  const handleCriarComunicadoGeral = () => {
    if (!titulo.trim()) return toast.error('Preencha o título');
    
    // Se não houver filtros selecionados, é para todos
    const temFiltros = periodosFilterados.length > 0 || cursosFilterados.length > 0 || gruposFilterados.length > 0;

    let segmentacao: any = { tipo: 'todos' };
    
    // Se há filtros, criar segmentação personalizada
    if (temFiltros) {
      segmentacao = { tipo: 'personalizado' };
      if (periodosFilterados.length > 0) segmentacao.semestres = periodosFilterados;
      if (cursosFilterados.length > 0) segmentacao.cursos = cursosFilterados;
      if (gruposFilterados.length > 0) segmentacao.grupos = gruposFilterados;
    }

    setComunicados([{
      id: Date.now(),
      titulo,
      conteudo,
      autor: { nome: user.nome, role: user.role as any },
      categoria,
      dataCriacao: new Date().toLocaleString('pt-BR'),
      fixado: false,
      segmentacao
    }, ...comunicados]);
    
    setMostrarFormulario(false); 
    setTitulo(''); 
    setConteudo(''); 
    setCursosFilterados([]);
    setPeriodosFilterados([]);
    setGruposFilterados([]);
    setCardExpandido(null);
    toast.success('Comunicado publicado!');
  };

  const comunicadosFiltrados = comunicados.filter((c) => {
    const isGlobal = !c.segmentacao || c.segmentacao.tipo === 'todos';
    const matchCat = filtroCategoria === 'todas' || c.categoria === filtroCategoria;
    const matchBusca = busca === '' || c.titulo.toLowerCase().includes(busca.toLowerCase());
    return isGlobal && matchCat && matchBusca;
  });

  const getAvisosDoGrupoSelecionado = () => {
    if (!grupoSelecionado) return [];
    return comunicados.filter(c => c.segmentacao?.tipo === 'grupo' && 
      (c.segmentacao.grupos?.includes(grupoSelecionado.nome) || c.segmentacao.grupos?.includes(editNome)));
  };

  const podePublicarGeral = user.role === 'docente' || user.role === 'coordenador';

  const getCategoriaColor = (cat: string) => {
     switch (cat) {
      case 'oportunidades': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'avisos': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'eventos': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="grupos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-white border border-gray-200 p-2 gap-2 rounded-xl shadow-sm h-auto">
          <TabsTrigger 
            value="mural" 
            className="rounded-lg py-3 text-gray-600 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all font-medium hover:text-teal-600 data-[state=active]:hover:text-white"
          >
            Mural de Avisos
          </TabsTrigger>
          <TabsTrigger 
            value="grupos" 
            className="rounded-lg py-3 text-gray-600 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all font-medium hover:text-teal-600 data-[state=active]:hover:text-white"
          >
            Grupos Acadêmicos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mural" className="space-y-6">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-white shadow-lg border border-teal-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <ChatBubbleBottomCenterTextIcon className="w-8 h-8" /> Mural de Avisos
                </h1>
                <p className="text-teal-100 mt-1">Comunicados gerais da comunidade acadêmica</p>
              </div>
              {podePublicarGeral && !mostrarFormulario && (
                <Button onClick={() => setMostrarFormulario(true)} className="bg-white text-teal-700 hover:bg-teal-50 border border-transparent hover:border-teal-200 rounded-lg shadow-sm">
                  <PlusIcon className="w-4 h-4 mr-2" /> Novo Comunicado
                </Button>
              )}
            </div>
          </div>

          {mostrarFormulario && (
            <Card className="p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Novo Comunicado</h3>
              <div className="space-y-4">
                <Input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} className="rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500" />
                <Textarea placeholder="Conteúdo" value={conteudo} onChange={e => setConteudo(e.target.value)} className="rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500" />
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Segmentação (Opcional)</h4>
                  <p className="text-sm text-gray-600 mb-4">Clique nos cards para selecionar quem receberá este comunicado:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {/* Card Períodos */}
                    <div 
                      onClick={() => setCardExpandido(cardExpandido === 'periodos' ? null : 'periodos')}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        cardExpandido === 'periodos' 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200 bg-gray-50 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-gray-900">Períodos</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            {periodosFilterados.length === 0 
                              ? 'Nenhum selecionado' 
                              : `${periodosFilterados.length} selecionado${periodosFilterados.length !== 1 ? 's' : ''}`}
                          </p>
                        </div>
                        <div className={`text-teal-600 transition-transform ${cardExpandido === 'periodos' ? 'rotate-180' : ''}`}>
                          ▼
                        </div>
                      </div>
                      
                      {cardExpandido === 'periodos' && (
                        <div className="mt-4 pt-4 border-t border-teal-200">
                          <div className="grid grid-cols-2 gap-2">
                            {periodosDisponiveis.map((periodo) => (
                              <label key={periodo} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-teal-100 rounded">
                                <input 
                                  type="checkbox" 
                                  checked={periodosFilterados.includes(periodo)}
                                  onChange={() => {
                                    if (periodosFilterados.includes(periodo)) {
                                      setPeriodosFilterados(periodosFilterados.filter(p => p !== periodo));
                                    } else {
                                      setPeriodosFilterados([...periodosFilterados, periodo]);
                                    }
                                  }}
                                />
                                <span className="text-sm text-gray-700">{periodo}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Cursos - DESATIVADO */}
                    {/* 
                    <div 
                      onClick={() => setCardExpandido(cardExpandido === 'cursos' ? null : 'cursos')}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        cardExpandido === 'cursos' 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200 bg-gray-50 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-gray-900">Cursos</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            {cursosFilterados.length === 0 
                              ? 'Nenhum selecionado' 
                              : `${cursosFilterados.length} selecionado${cursosFilterados.length !== 1 ? 's' : ''}`}
                          </p>
                        </div>
                        <div className={`text-teal-600 transition-transform ${cardExpandido === 'cursos' ? 'rotate-180' : ''}`}>
                          ▼
                        </div>
                      </div>
                      
                      {cardExpandido === 'cursos' && (
                        <div className="mt-4 pt-4 border-t border-teal-200">
                          <div className="space-y-2">
                            {cursosDisponiveis.map((curso) => (
                              <label key={curso} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-teal-100 rounded">
                                <input 
                                  type="checkbox" 
                                  checked={cursosFilterados.includes(curso)}
                                  onChange={() => {
                                    if (cursosFilterados.includes(curso)) {
                                      setCursosFilterados(cursosFilterados.filter(c => c !== curso));
                                    } else {
                                      setCursosFilterados([...cursosFilterados, curso]);
                                    }
                                  }}
                                />
                                <span className="text-sm text-gray-700">{curso}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    */}

                    {/* Card Grupos Acadêmicos */}
                    <div 
                      onClick={() => setCardExpandido(cardExpandido === 'grupos' ? null : 'grupos')}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        cardExpandido === 'grupos' 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200 bg-gray-50 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-gray-900">Grupos</h5>
                          <p className="text-xs text-gray-600 mt-1">
                            {gruposFilterados.length === 0 
                              ? 'Nenhum selecionado' 
                              : `${gruposFilterados.length} selecionado${gruposFilterados.length !== 1 ? 's' : ''}`}
                          </p>
                        </div>
                        <div className={`text-teal-600 transition-transform ${cardExpandido === 'grupos' ? 'rotate-180' : ''}`}>
                          ▼
                        </div>
                      </div>
                      
                      {cardExpandido === 'grupos' && (
                        <div className="mt-4 pt-4 border-t border-teal-200">
                          <div className="space-y-2">
                            {grupos.map((grupo) => (
                              <label key={grupo.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-teal-100 rounded">
                                <input 
                                  type="checkbox" 
                                  checked={gruposFilterados.includes(grupo.nome)}
                                  onChange={() => {
                                    if (gruposFilterados.includes(grupo.nome)) {
                                      setGruposFilterados(gruposFilterados.filter(g => g !== grupo.nome));
                                    } else {
                                      setGruposFilterados([...gruposFilterados, grupo.nome]);
                                    }
                                  }}
                                />
                                <span className="text-sm text-gray-700">{grupo.nome}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resumo dos filtros selecionados */}
                  {(periodosFilterados.length > 0 || cursosFilterados.length > 0 || gruposFilterados.length > 0) && (
                    <div className="p-3 bg-teal-50 rounded-lg border border-teal-200 mb-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Filtros Selecionados:</p>
                      <div className="flex flex-wrap gap-2">
                        {periodosFilterados.map(p => (
                          <span key={p} className="px-2 py-1 bg-teal-200 text-teal-900 text-xs rounded">{p}</span>
                        ))}
                        {cursosFilterados.map(c => (
                          <span key={c} className="px-2 py-1 bg-blue-200 text-blue-900 text-xs rounded">{c}</span>
                        ))}
                        {gruposFilterados.map(g => (
                          <span key={g} className="px-2 py-1 bg-purple-200 text-purple-900 text-xs rounded">{g}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button variant="outline" onClick={() => { setMostrarFormulario(false); setCursosFilterados([]); setPeriodosFilterados([]); setGruposFilterados([]); setCardExpandido(null); }} className="rounded-lg">Cancelar</Button>
                  <Button onClick={handleCriarComunicadoGeral} className="bg-teal-600 text-white rounded-lg hover:bg-teal-700">Publicar</Button>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Buscar no mural..." 
                value={busca} 
                onChange={(e) => setBusca(e.target.value)} 
                className="pl-10 rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            {comunicadosFiltrados.map((comunicado) => (
              <Card key={comunicado.id} className={`p-6 rounded-xl border transition-shadow hover:shadow-md ${comunicado.fixado ? 'ring-1 ring-teal-500 border-teal-200' : 'border-gray-200'}`}>
                 <div className="mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoriaColor(comunicado.categoria)}`}>
                      {comunicado.categoria.toUpperCase()}
                    </span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">{comunicado.titulo}</h3>
                 <p className="text-gray-700 mb-4 leading-relaxed">{comunicado.conteudo}</p>
                 <div className="flex items-center gap-2 text-sm text-gray-500 border-t border-gray-100 pt-3">
                    <span className="font-semibold text-gray-700">{comunicado.autor.nome}</span>
                    <span>•</span>
                    <span>{comunicado.dataCriacao}</span>
                 </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grupos" className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Grupos Acadêmicos e Ligas</h2>
            <p className="text-gray-600">Gerencie e participe de grupos de estudo, pesquisa e extensão.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grupos.map((grupo) => (
              <Card 
                key={grupo.id} 
                className={`flex flex-col transition-all duration-300 rounded-xl overflow-hidden ${
                  grupo.meuStatus === 'lider' 
                    ? 'border-2 border-teal-500 shadow-md' 
                    : 'border border-gray-200 hover:border-teal-300 hover:shadow-md'
                }`}
              >
                <CardHeader className="bg-gray-50/50 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-white">{grupo.area}</Badge>
                    {grupo.meuStatus === 'lider' && <Badge className="bg-teal-600 hover:bg-teal-700">Líder Discente</Badge>}
                    {grupo.meuStatus === 'membro' && <Badge className="bg-blue-600 hover:bg-blue-700">Membro</Badge>}
                    {grupo.meuStatus === 'pendente' && <Badge className="bg-orange-500 hover:bg-orange-600">Pendente</Badge>}
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">{grupo.nome}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">{grupo.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3 text-sm text-gray-600 pt-4">
                  <div className="flex items-center gap-2">
                    <AcademicCapIcon className="w-4 h-4 text-purple-600" />
                    <span className="truncate" title={grupo.docenteResponsavel}>
                      Prof: <span className="font-medium text-gray-800">{grupo.docenteResponsavel}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2"><IdentificationIcon className="w-4 h-4 text-gray-500" /> Líder: <span className="font-medium text-gray-800">{grupo.lider}</span></div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100 mt-2">
                    <div className="flex items-center gap-1.5"><UsersIcon className="w-4 h-4 text-teal-600" /> {grupo.membrosCount}</div>
                    <div className="flex items-center gap-1.5"><BookOpenIcon className="w-4 h-4 text-blue-600" /> {grupo.atividadesCount}</div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 pb-6 border-t border-gray-100 bg-white">
                  {grupo.meuStatus === 'lider' ? (
                    <Button onClick={() => abrirGestaoGrupo(grupo)} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm font-medium">
                      <IdentificationIcon className="w-4 h-4 mr-2" /> Gerenciar Grupo
                    </Button>
                  ) : grupo.meuStatus === 'membro' ? (
                    <Button 
                      variant="outline" 
                      className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 rounded-lg"
                      onClick={() => handleSairDoGrupo(grupo.id)}
                    >
                      <UserMinusIcon className="w-4 h-4 mr-2" /> Sair do Grupo
                    </Button>
                  ) : grupo.meuStatus === 'pendente' ? (
                    <Button 
                      variant="outline" 
                      className="w-full text-orange-600 hover:bg-orange-50 border-orange-200 rounded-lg"
                      onClick={() => handleSairDoGrupo(grupo.id)}
                    >
                      <ClockIcon className="w-4 h-4 mr-2" /> Cancelar Solicitação
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full text-teal-600 hover:bg-teal-50 border-teal-200 rounded-lg"
                      onClick={() => handleSolicitarEntrada(grupo.id)}
                    >
                      <UserPlusIcon className="w-4 h-4 mr-2" /> Solicitar Entrada
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!grupoSelecionado} onOpenChange={(open: boolean) => !open && setGrupoSelecionado(null)}>
        <DialogContent className="sm:max-w-[95vw] w-[95vw] h-[95vh] bg-white p-0 gap-0 flex flex-col overflow-hidden shadow-2xl rounded-2xl border border-gray-200">
          {grupoSelecionado && (
            <>
              <DialogHeader className="p-6 border-b border-gray-100 bg-white shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl text-teal-800 font-bold flex items-center gap-2">
                      <UsersIcon className="w-7 h-7" /> Gestão: {editNome}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 mt-1">
                      Painel administrativo para Líderes Discentes.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
                <Tabs defaultValue="avisos" className="w-full h-full flex flex-col">
                  <TabsList className="grid w-full max-w-3xl grid-cols-4 mb-8 h-auto bg-white p-2 rounded-xl border border-gray-200 shadow-sm mx-auto gap-2">
                    <TabsTrigger value="avisos" className="rounded-lg py-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 font-medium">Avisos</TabsTrigger>
                    <TabsTrigger value="membros" className="rounded-lg py-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 font-medium">Membros</TabsTrigger>
                    <TabsTrigger value="atividades" className="rounded-lg py-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 font-medium">Atividades</TabsTrigger>
                    <TabsTrigger value="config" className="rounded-lg py-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 font-medium">Configurações</TabsTrigger>
                  </TabsList>

                  <TabsContent value="avisos" className="space-y-4 focus-visible:outline-none max-w-7xl mx-auto w-full">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-800">Mural Interno</h3>
                      <Button onClick={() => setMostrarFormAvisoGrupo(!mostarFormAvisoGrupo)} className="bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                        <PlusIcon className="w-4 h-4 mr-2" /> Postar Aviso
                      </Button>
                    </div>

                    {mostarFormAvisoGrupo && (
                      <Card className="p-5 border-teal-100 bg-white shadow-md rounded-xl">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-teal-800 mb-1.5 block">Título do Aviso</Label>
                            <Input placeholder="Ex: Reunião Extraordinária" value={novoAvisoTitulo} onChange={e => setNovoAvisoTitulo(e.target.value)} className="rounded-lg" />
                          </div>
                          <div>
                            <Label className="text-teal-800 mb-1.5 block">Mensagem</Label>
                            <Textarea placeholder="Escreva a mensagem para o grupo..." value={novoAvisoConteudo} onChange={e => setNovoAvisoConteudo(e.target.value)} className="rounded-lg" rows={4} />
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button variant="ghost" onClick={() => setMostrarFormAvisoGrupo(false)} className="rounded-lg">Cancelar</Button>
                            <Button onClick={handlePostarAvisoGrupo} className="bg-teal-600 text-white rounded-lg hover:bg-teal-700">Enviar</Button>
                          </div>
                        </div>
                      </Card>
                    )}

                    <div className="space-y-4 mt-4">
                      {getAvisosDoGrupoSelecionado().length === 0 ? (
                        <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                          <BellIcon className="w-16 h-16 mx-auto mb-3 text-gray-200" />
                          <p className="font-medium text-lg">Nenhum aviso postado</p>
                          <p className="text-sm mt-1">Use o botão acima para criar o primeiro comunicado.</p>
                        </div>
                      ) : (
                        getAvisosDoGrupoSelecionado().map(aviso => (
                          <Card key={aviso.id} className="p-6 border-l-4 border-l-teal-500 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-gray-900 text-lg">{aviso.titulo}</h4>
                              <Badge variant="outline" className="bg-gray-50">{aviso.dataCriacao}</Badge>
                            </div>
                            <p className="text-gray-700 mt-3 leading-relaxed">{aviso.conteudo}</p>
                            <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500 flex items-center gap-2">
                              <div className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xs">
                                {aviso.autor.nome.charAt(0)}
                              </div>
                              <span>Postado por <strong className="text-gray-700">{aviso.autor.nome}</strong></span>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="membros" className="space-y-8 focus-visible:outline-none max-w-7xl mx-auto w-full">
                    {/* Seção Pendentes */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                        <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                          <UserPlusIcon className="w-5 h-5" />
                        </span>
                        Solicitações Pendentes 
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 ml-2 rounded-full px-2">
                          {editMembros.filter(m => m.role === 'pendente').length}
                        </Badge>
                      </h3>
                      
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        {editMembros.filter(m => m.role === 'pendente').length === 0 ? (
                          <div className="p-8 text-center text-gray-500">
                            Nenhuma solicitação de entrada pendente no momento.
                          </div>
                        ) : (
                          <table className="w-full text-sm">
                            <thead className="bg-orange-50/50 text-gray-700 border-b border-gray-100">
                              <tr>
                                <th className="px-6 py-4 text-left font-semibold">Aluno</th>
                                <th className="px-6 py-4 text-left font-semibold">Curso</th>
                                <th className="px-6 py-4 text-left font-semibold">Data</th>
                                <th className="px-6 py-4 text-right font-semibold">Ações</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {editMembros.filter(m => m.role === 'pendente').map(membro => (
                                <tr key={membro.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 font-medium text-gray-900">{membro.nome}</td>
                                  <td className="px-6 py-4 text-gray-500">{membro.curso}</td>
                                  <td className="px-6 py-4 text-gray-500">{membro.dataSolicitacao}</td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button size="sm" onClick={() => handleAprovar(membro.id)} className="bg-green-600 text-white hover:bg-green-700 rounded-lg shadow-sm">
                                        <CheckIcon className="w-4 h-4 mr-1" /> Aprovar
                                      </Button>
                                      <Button size="sm" variant="outline" onClick={() => handleRejeitar(membro.id)} className="text-red-600 border-red-200 hover:bg-red-50 rounded-lg">
                                        <XMarkIcon className="w-4 h-4 mr-1" /> Rejeitar
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>

                    {/* Seção Ativos */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                          <span className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                            <UsersIcon className="w-5 h-5" />
                          </span>
                          Membros Ativos
                        </h3>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="E-mail para convite..." 
                            value={novoMembroEmail} 
                            onChange={e => setNovoMembroEmail(e.target.value)} 
                            className="w-72 bg-white rounded-lg"
                          />
                          <Button onClick={handleConvidarMembro} className="bg-teal-600 text-white hover:bg-teal-700 rounded-lg">
                            Convidar
                          </Button>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 text-gray-700 border-b border-gray-100">
                            <tr>
                              <th className="px-6 py-4 text-left font-semibold">Nome</th>
                              <th className="px-6 py-4 text-left font-semibold">Matrícula</th>
                              <th className="px-6 py-4 text-left font-semibold">Cargo</th>
                              <th className="px-6 py-4 text-right font-semibold">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {editMembros.filter(m => m.role !== 'pendente').map(membro => (
                              <tr key={membro.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="font-medium text-gray-900">{membro.nome}</div>
                                  <div className="text-xs text-gray-500">{membro.curso}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 font-mono">{membro.matricula}</td>
                                <td className="px-6 py-4">
                                  <Select 
                                    defaultValue={membro.role} 
                                    onValueChange={(val: any) => handleAlterarCargo(membro.id, val)}
                                    disabled={membro.id.toString() === user.id || membro.role === 'docente'} // Não pode editar o próprio cargo ou de um docente aqui
                                  >
                                    <SelectTrigger className={`h-9 w-36 border shadow-sm rounded-lg ${membro.role === 'lider' ? 'bg-teal-50 border-teal-200 text-teal-700 font-medium' : membro.role === 'docente' ? 'bg-purple-50 border-purple-200 text-purple-700 font-medium' : 'bg-white border-gray-200 text-gray-600'}`}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="lider"><span className="flex items-center gap-2"><ShieldCheckIcon className="w-4 h-4 text-teal-600"/> Líder</span></SelectItem>
                                      <SelectItem value="membro"><span className="flex items-center gap-2"><UsersIcon className="w-4 h-4"/> Membro</span></SelectItem>
                                      {membro.role === 'docente' && <SelectItem value="docente"><span className="flex items-center gap-2"><AcademicCapIcon className="w-4 h-4 text-purple-600"/> Docente</span></SelectItem>}
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  {membro.role !== 'docente' && (
                                    <Button variant="ghost" size="icon" onClick={() => handleRemover(membro.id)} className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                      <TrashIcon className="w-5 h-5" />
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="atividades" className="space-y-6 focus-visible:outline-none max-w-7xl mx-auto w-full">
                    <div className="flex gap-4 p-5 bg-blue-50 border border-blue-100 rounded-xl items-end shadow-sm">
                      <div className="flex-1">
                        <Label className="text-blue-800 mb-1.5 block">Nova Atividade</Label>
                        <Input 
                          placeholder="Título (ex: Workshop, Reunião)" 
                          value={novaAtividadeTitulo} 
                          onChange={e => setNovaAtividadeTitulo(e.target.value)} 
                          className="bg-white rounded-lg h-11"
                        />
                      </div>
                      <Button onClick={handleCriarAtividade} className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg h-11 px-6 shadow-sm">
                        <PlusIcon className="w-5 h-5 mr-2" /> Adicionar
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      {editAtividades.map(ativ => (
                        <div key={ativ.id} className="flex items-center justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all hover:border-teal-200">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${ativ.status === 'concluida' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                              {ativ.status === 'concluida' ? <CheckBadgeIcon className="w-6 h-6"/> : <ClockIcon className="w-6 h-6"/>}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-lg">{ativ.titulo}</p>
                              <p className="text-sm text-gray-500 mt-0.5">{ativ.data} • {ativ.inscritos} inscritos</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize bg-gray-50 px-3 py-1 text-sm rounded-lg">{ativ.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="config" className="space-y-6 focus-visible:outline-none max-w-7xl mx-auto w-full">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 text-lg mb-2">Informações Básicas</h3>
                        <div className="space-y-3">
                          <Label>Nome do Grupo</Label>
                          <Input value={editNome} onChange={e => setEditNome(e.target.value)} className="rounded-lg h-11" />
                        </div>
                        {/* Seção de Edição do Docente */}
                        <div className="space-y-3">
                          <Label>Docente Responsável</Label>
                          <div className="relative w-full">
                            <AcademicCapIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400 z-10" />
                            <Select value={editDocente} onValueChange={handleChangeDocente}>
                              <SelectTrigger className="rounded-lg h-11 pl-10">
                                <SelectValue placeholder="Selecione um docente" />
                              </SelectTrigger>
                              <SelectContent>
                                {docentesDisponiveis.map((doc) => (
                                  <SelectItem key={doc.id} value={doc.nome}>
                                    {doc.nome}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <p className="text-xs text-gray-500">Ao alterar o docente, ele será adicionado automaticamente à lista de membros.</p>
                        </div>
                        <div className="space-y-3">
                          <Label>Descrição</Label>
                          <Textarea value={editDescricao} onChange={e => setEditDescricao(e.target.value)} rows={6} className="rounded-lg resize-none" />
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <Label className="text-lg font-bold text-gray-800 mb-4 block">Visão Geral</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 text-center">
                              <span className="text-4xl font-bold text-teal-700 block mb-1">{editMembros.filter(m => m.role !== 'pendente').length}</span>
                              <p className="text-teal-600 font-medium text-sm">Membros</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
                              <span className="text-4xl font-bold text-blue-700 block mb-1">{editAtividades.length}</span>
                              <p className="text-blue-600 font-medium text-sm">Atividades</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                          <h4 className="font-bold text-gray-800 mb-2">Zona de Perigo</h4>
                          <p className="text-sm text-gray-500 mb-4">Ações irreversíveis para o grupo.</p>
                          <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg">
                            Encerrar Grupo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <DialogFooter className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-between items-center w-full">
                <Button variant="outline" onClick={() => setGrupoSelecionado(null)} className="rounded-lg border-gray-300 bg-white">
                  Fechar sem salvar
                </Button>
                <Button onClick={handleSalvarAlteracoesGrupo} className="bg-teal-600 text-white hover:bg-teal-700 px-8 rounded-lg shadow-sm">
                  <CheckIcon className="w-5 h-5 mr-2" /> Salvar Alterações
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}