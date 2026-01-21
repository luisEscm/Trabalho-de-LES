import { User } from '../App';
import { 
  UsersIcon, 
  ArrowTrendingUpIcon, 
  TrophyIcon, 
  BookOpenIcon, 
  ClockIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';

interface DashboardDocenteProps {
  user: User;
}

export function DashboardDocente({ user }: DashboardDocenteProps) {
  const minhasOportunidades = 3;
  const totalParticipantes = 63;
  const horasGeradas = 420;
  const gruposAcademicos = 2;

  const distribuicaoAtividades = [
    { tipo: 'IoT na Agricultura', participantes: 18 },
    { tipo: 'Alfabetização Digital', participantes: 25 },
    { tipo: 'Apps para ONGs', participantes: 20 },
  ];

  const evolucaoParticipacao = [
    { mes: 'Ago', participantes: 45 },
    { mes: 'Set', participantes: 52 },
    { mes: 'Out', participantes: 58 },
    { mes: 'Nov', participantes: 63 },
  ];

  const statusOportunidades = [
    { name: 'Em Andamento', value: 2, color: '#9e1e22' },
    { name: 'Concluídas', value: 5, color: '#16a34a' },
    { name: 'Planejadas', value: 1, color: '#eab308' },
  ];

  const minhasAtividades = [
    { 
      id: 1, 
      titulo: 'Extensão Rural Sustentável', 
      tipo: 'Projeto',
      inscritos: 18, 
      vagas: 20, 
      inicio: '01/08/2024',
      termino: '15/12/2024',
      status: 'Em Andamento',
      horasGeradas: 120
    },
    { 
      id: 2, 
      titulo: 'Projeto Saúde da Família', 
      tipo: 'Ação Contínua',
      inscritos: 25, 
      vagas: 30, 
      inicio: '15/07/2024',
      termino: '20/12/2024',
      status: 'Em Andamento',
      horasGeradas: 200
    },
    { 
      id: 3, 
      titulo: 'Workshop de Educação Ambiental', 
      tipo: 'Evento',
      inscritos: 20, 
      vagas: 25, 
      inicio: '10/11/2024',
      termino: '15/11/2024',
      status: 'Concluído',
      horasGeradas: 100
    },
  ];

  const meusGrupos = [
    {
      id: 1,
      nome: 'Grupo de Estudos em Sustentabilidade',
      lider: 'Marina Silva',
      membros: 12,
      atividades: 4,
      status: 'Aprovado'
    },
    {
      id: 2,
      nome: 'Liga de Extensão Rural',
      lider: 'Carlos Santos',
      membros: 8,
      atividades: 3,
      status: 'Aprovado'
    }
  ];

  const participantesDestaque = [
    { nome: 'Ana Paula Santos', horas: 45, atividades: 3 },
    { nome: 'João Silva', horas: 38, atividades: 2 },
    { nome: 'Maria Oliveira', horas: 36, atividades: 3 },
    { nome: 'Pedro Costa', horas: 32, atividades: 2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Painel do Docente</h2>
        <p className="text-gray-600 mt-1">Bem-vindo(a), {user.nome}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Minhas Oportunidades</p>
              <p className="text-gray-900 mt-1">{minhasOportunidades}</p>
              <p className="text-teal-600 text-xs mt-1">Ativas no momento</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Participantes</p>
              <p className="text-gray-900 mt-1">{totalParticipantes}</p>
              <p className="text-green-600 text-xs mt-1">Alunos envolvidos</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UsersIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Horas Geradas</p>
              <p className="text-gray-900 mt-1">{horasGeradas}h</p>
              <p className="text-blue-600 text-xs mt-1">Total no semestre</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Grupos Acadêmicos</p>
              <p className="text-gray-900 mt-1">{gruposAcademicos}</p>
              <p className="text-indigo-600 text-xs mt-1">Sob sua responsabilidade</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <UsersIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Participantes por Atividade</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={distribuicaoAtividades}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipo" angle={-15} textAnchor="end" height={80} fontSize={12} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="participantes" fill="#9e1e22" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Evolução de Participação</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={evolucaoParticipacao}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="participantes" stroke="#9e1e22" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Status das Oportunidades</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusOportunidades}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusOportunidades.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Minhas Atividades de Extensão</h3>
          <p className="text-gray-600 text-sm mt-1">Oportunidades que você coordena</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Participantes
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Horas
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {minhasAtividades.map((atividade) => {
                const ocupacao = (atividade.inscritos / atividade.vagas) * 100;
                return (
                  <tr key={atividade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <TrophyIcon className="w-5 h-5 text-teal-600" />
                        <span className="text-gray-900">{atividade.titulo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                        {atividade.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-gray-700 text-sm">
                          {atividade.inscritos}/{atividade.vagas}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5 w-20">
                            <div
                              className={`h-1.5 rounded-full ${
                                ocupacao === 100 ? 'bg-green-500' : 'bg-teal-600'
                              }`}
                              style={{ width: `${ocupacao}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{ocupacao.toFixed(0)}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span>{atividade.inicio}</span>
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        até {atividade.termino}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-700">
                        <ClockIcon className="w-4 h-4" />
                        {atividade.horasGeradas}h
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        atividade.status === 'Em Andamento' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {atividade.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900 flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-indigo-600" />
              Meus Grupos Acadêmicos
            </h3>
            <p className="text-gray-600 text-sm mt-1">Grupos sob sua responsabilidade</p>
          </div>
          <div className="p-6 space-y-4">
            {meusGrupos.map((grupo) => (
              <div key={grupo.id} className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-gray-900">{grupo.nome}</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {grupo.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-indigo-600" />
                    <span>Líder: {grupo.lider}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4 text-teal-600" />
                      {grupo.membros} membros
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpenIcon className="w-4 h-4 text-blue-600" />
                      {grupo.atividades} atividades
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {meusGrupos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <UsersIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Nenhum grupo acadêmico criado</p>
                <p className="text-sm">Crie grupos pela aba Comunidade</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900 flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
              Participantes Destaque
            </h3>
            <p className="text-gray-600 text-sm mt-1">Alunos com melhor desempenho</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {participantesDestaque.map((participante, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-900">{participante.nome}</p>
                      <p className="text-gray-500 text-xs">{participante.atividades} atividades</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-teal-700">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm">{participante.horas}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <BookOpenIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 text-sm mb-1">
              <strong>Perfil de Docente</strong>
            </p>
            <p className="text-blue-700 text-sm">
              Como docente, você tem acesso a todas as funcionalidades do sistema, exceto a análise de 
              solicitações de aproveitamento (exclusiva para coordenadores). Você pode criar oportunidades, 
              gerenciar grupos acadêmicos, emitir certificados e acompanhar métricas de suas atividades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}