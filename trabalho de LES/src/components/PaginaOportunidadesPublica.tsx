import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  CalendarIcon, 
  MapPinIcon, 
  UsersIcon, 
  ClockIcon, 
  FunnelIcon, 
  BookOpenIcon, 
  LightBulbIcon, 
  TrophyIcon, 
  CheckCircleIcon, 
  XMarkIcon, 
  InformationCircleIcon,
  UserPlusIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface PaginaOportunidadesPublicaProps {
  onLoginClick?: () => void;
  onVerDetalhes?: (oportunidade: Oportunidade) => void;
}

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

export function PaginaOportunidadesPublica({ onLoginClick, onVerDetalhes }: PaginaOportunidadesPublicaProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroModalidade, setFiltroModalidade] = useState<string>('Todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todas');
  const [oportunidadeSelecionada, setOportunidadeSelecionada] = useState<Oportunidade | null>(null);

  // Dados simulados de oportunidades públicas (aprovadas)
  const oportunidades: Oportunidade[] = [
    {
      id: 1,
      titulo: 'Desenvolvimento Web para ONGs',
      descricao: 'Criação de websites e sistemas web para organizações sem fins lucrativos da comunidade',
      modalidade: 'Projeto',
      local: 'Laboratório de Desenvolvimento Web',
      vagas: 30,
      inscritos: 25,
      periodo: 'Mar/2024 - Jun/2024',
      cargaHoraria: 60,
      responsavel: 'Prof. Dr. João Silva',
      status: 'Aberta'
    },
    {
      id: 2,
      titulo: 'Inclusão Digital para Comunidades Rurais',
      descricao: 'Capacitação em informática básica e internet para agricultores e comunidades do interior',
      modalidade: 'Projeto',
      local: 'Comunidades Rurais',
      vagas: 20,
      inscritos: 18,
      periodo: 'Fev/2024 - Jul/2024',
      cargaHoraria: 60,
      responsavel: 'Profa. Maria Santos',
      status: 'Em Execução'
    },
    {
      id: 3,
      titulo: 'Hackathon Social: Soluções para a Cidade',
      descricao: 'Maratona de programação focada em desenvolver aplicativos que resolvam problemas urbanos',
      modalidade: 'Evento',
      local: 'Auditório Central',
      vagas: 100,
      inscritos: 87,
      periodo: '15/05/2024',
      cargaHoraria: 30,
      responsavel: 'Prof. Carlos Lima',
      status: 'Aberta'
    },
    {
      id: 4,
      titulo: 'Programação para Terceira Idade',
      descricao: 'Introdução à lógica de programação e desenvolvimento de jogos educativos para idosos',
      modalidade: 'Curso',
      local: 'Laboratório de Informática',
      vagas: 40,
      inscritos: 40,
      periodo: 'Abr/2024 - Mai/2024',
      cargaHoraria: 45,
      responsavel: 'Profa. Ana Paula',
      status: 'Aberta'
    },
    {
      id: 5,
      titulo: 'Oficina de Robótica Educacional',
      descricao: 'Ensino de robótica e programação para crianças de escolas públicas',
      modalidade: 'Oficina',
      local: 'Laboratório de Robótica',
      vagas: 25,
      inscritos: 15,
      periodo: 'Jun/2024',
      cargaHoraria: 30,
      responsavel: 'Prof. Roberto Costa',
      status: 'Aberta'
    }
  ];

  const modalidades = ['Todas', 'Projeto', 'Programa', 'Evento', 'Curso', 'Oficina', 'Grupo Acadêmico'];
  const statusOptions = ['Todas', 'Aberta', 'Em Execução', 'Encerrada'];

  // Filtrar oportunidades
  const oportunidadesFiltradas = oportunidades.filter(op => {
    const matchSearch = op.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       op.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchModalidade = filtroModalidade === 'Todas' || op.modalidade === filtroModalidade;
    const matchStatus = filtroStatus === 'Todas' || op.status === filtroStatus;
    
    return matchSearch && matchModalidade && matchStatus;
  });

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

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Portal de Oportunidades</h2>
          <p className="text-gray-600 mt-1">
            Explore as atividades de extensão disponíveis
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Oportunidades</p>
              <p className="text-gray-900 mt-1">{oportunidades.length}</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inscrições Abertas</p>
              <p className="text-gray-900 mt-1">
                {oportunidades.filter(o => o.status === 'Aberta').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Vagas Disponíveis</p>
              <p className="text-gray-900 mt-1">
                {oportunidades.reduce((sum, op) => sum + (op.vagas - op.inscritos), 0)}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Horas Disponíveis</p>
              <p className="text-gray-900 mt-1">
                {oportunidades.reduce((sum, op) => sum + op.cargaHoraria, 0)}h
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">
              <FunnelIcon className="w-4 h-4 inline mr-2" />
              Buscar
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar oportunidades..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Modalidade</label>
            <select
              value={filtroModalidade}
              onChange={(e) => setFiltroModalidade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {modalidades.map(mod => (
                <option key={mod} value={mod}>{mod}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            <strong>{oportunidadesFiltradas.length}</strong> oportunidade(s) encontrada(s)
          </p>
        </div>
      </div>

      {/* Lista de Oportunidades - Estilo similar ao do discente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {oportunidadesFiltradas.map((oportunidade) => {
          const Icon = getIconeModalidade(oportunidade.modalidade);
          const vagasDisponiveis = oportunidade.vagas - oportunidade.inscritos;
          const percentualPreenchido = (oportunidade.inscritos / oportunidade.vagas) * 100;

          return (
            <div
              key={oportunidade.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-100">
                      <Icon className="w-6 h-6 text-teal-600" />
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
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 text-gray-400" />
                    <span>{oportunidade.local}</span>
                  </div>

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
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Vagas:</span>
                    <span className={vagasDisponiveis > 0 ? 'text-teal-600' : 'text-red-600'}>
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

                {/* Footer com Status e Ação */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className={`px-3 py-1 rounded-full text-sm ${getCorStatus(oportunidade.status)}`}>
                    {oportunidade.status}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => onVerDetalhes?.(oportunidade)}
                      className="flex items-center gap-1 px-3 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm"
                    >
                      <InformationCircleIcon className="w-4 h-4" />
                      Ver Detalhes
                    </button>
                    
                    <button
                      onClick={onLoginClick}
                      disabled={vagasDisponiveis === 0}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        vagasDisponiveis > 0
                          ? 'bg-teal-600 text-white hover:bg-teal-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {vagasDisponiveis > 0 ? 'Inscrever-se' : 'Esgotada'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensagem quando não há resultados */}
      {oportunidadesFiltradas.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Nenhuma oportunidade encontrada</h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou termo de busca para encontrar outras oportunidades.
          </p>
        </div>
      )}

      {/* Informações sobre o Portal */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h3 className="text-teal-900 mb-3">Sobre o Portal de Oportunidades</h3>
        <div className="space-y-2 text-teal-800 text-sm">
          <p><strong>Portal Público:</strong> Catálogo de todas as oportunidades de extensão disponíveis</p>
          <p><strong>Inscrição:</strong> Para se inscrever em uma oportunidade, é necessário fazer login ou criar uma conta</p>
          <p><strong>Importante:</strong> Todas as oportunidades exibidas já foram aprovadas pela coordenação de extensão</p>
        </div>
      </div>
    </div>
  );
}