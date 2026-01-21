import { User } from '../App';
import { 
  ClockIcon, 
  ArrowTrendingUpIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  CalendarIcon, 
  TrophyIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from './ui/button';

interface DashboardDiscenteProps {
  user: User;
  onNavigate: (view: string, params?: any) => void;
}

export function DashboardDiscente({ user, onNavigate }: DashboardDiscenteProps) {
  const horasConcluidas = 85;
  const horasPendentes = 15;
  const horasNecessarias = 120;
  const progresso = (horasConcluidas / horasNecessarias) * 100;

  const horasPorModalidade = [
    { modalidade: 'Projetos', horas: 40 },
    { modalidade: 'Eventos', horas: 25 },
    { modalidade: 'Cursos', horas: 20 },
  ];

  const horasPorSemestre = [
    { semestre: '2023.1', horas: 30 },
    { semestre: '2023.2', horas: 35 },
    { semestre: '2024.1', horas: 20 },
  ];

  const atividades = [
    { id: 1, titulo: 'Desenvolvimento Web para ONGs', carga: 40, status: 'Concluída', data: '15/03/2024' },
    { id: 2, titulo: 'Curso de Python para Iniciantes', carga: 20, status: 'Concluída', data: '10/02/2024' },
    { id: 3, titulo: 'Hackathon de Inovação Social', carga: 15, status: 'Pendente', data: '20/05/2024' },
    { id: 4, titulo: 'Workshop de Segurança Digital', carga: 10, status: 'Concluída', data: '05/01/2024' },
  ];

  // Grupos liderados (Mock visível apenas para o Líder João, ID 1)
  const isLeader = user.id === '1';
  const gruposLiderados = isLeader ? [
    { id: 1, nome: 'Grupo de Estudos em Sustentabilidade', membros: 12, pendencias: 2 }
  ] : [];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-gray-900">Meu Painel de Extensão</h2>
        <p className="text-gray-600 mt-1">Bem-vindo(a), {user.nome}. Acompanhe seu progresso.</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Horas Concluídas</p>
              <p className="text-gray-900 mt-1">{horasConcluidas}h</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Horas Pendentes</p>
              <p className="text-gray-900 mt-1">{horasPendentes}h</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Meta Necessária</p>
              <p className="text-gray-900 mt-1">{horasNecessarias}h</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Faltam</p>
              <p className="text-gray-900 mt-1">{horasNecessarias - horasConcluidas}h</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Card de Liderança Discente (Só aparece se tiver grupos liderados) */}
      {gruposLiderados.length > 0 && (
        <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-600 p-2 rounded-lg">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 font-bold">Liderança Discente</h3>
              <p className="text-teal-700 text-sm">Você gerencia {gruposLiderados.length} grupo(s)</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {gruposLiderados.map(grupo => (
               <div key={grupo.id} className="bg-white p-4 rounded border border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{grupo.nome}</p>
                    <p className="text-xs text-gray-500">{grupo.membros} membros ativos</p>
                  </div>
                  {/* Botão de Navegação para Gerenciar */}
                  <Button 
                    variant="link"
                    className="text-teal-600 font-medium hover:text-teal-800"
                    onClick={() => onNavigate('comunidade', { groupId: grupo.id })}
                  >
                    Gerenciar
                  </Button>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* Barra de Progresso */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Progresso Geral</h3>
          <span className="text-teal-600">{progresso.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-teal-600 to-teal-700 h-4 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progresso, 100)}%` }}
          ></div>
        </div>
        <p className="text-gray-600 text-sm mt-2">
          {horasConcluidas} de {horasNecessarias} horas completadas
        </p>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horas por Semestre */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Horas por Semestre</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={horasPorSemestre}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semestre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="horas" fill="#9e1e22" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Horas por Modalidade */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Distribuição por Modalidade</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={horasPorModalidade}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ modalidade, horas }) => `${modalidade}: ${horas}h`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="horas"
              >
                {horasPorModalidade.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Histórico de Atividades */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Histórico de Atividades</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Atividade
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Carga Horária
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {atividades.map((atividade) => (
                <tr key={atividade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <TrophyIcon className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-900">{atividade.titulo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{atividade.carga}h</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                        atividade.status === 'Concluída'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {atividade.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="w-4 h-4" />
                      {atividade.data}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}