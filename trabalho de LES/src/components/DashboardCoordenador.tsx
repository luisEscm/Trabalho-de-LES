import { User } from '../App';
import { 
  UsersIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon, 
  ArrowTrendingUpIcon, 
  TrophyIcon 
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

interface DashboardCoordenadorProps {
  user: User;
}

export function DashboardCoordenador({ user }: DashboardCoordenadorProps) {
  const totalAlunos = 450;
  const alunosComHoras = 320;
  const alunosEmRisco = 85;
  const solicitacoesPendentes = 12;

  const distribuicaoHoras = [
    { faixa: '0-30h', quantidade: 85 },
    { faixa: '31-60h', quantidade: 120 },
    { faixa: '61-90h', quantidade: 145 },
    { faixa: '91-120h', quantidade: 70 },
    { faixa: '120h+', quantidade: 30 },
  ];

  const evolucaoSemestral = [
    { semestre: '2022.2', concluidos: 45, total: 420 },
    { semestre: '2023.1', concluidos: 68, total: 435 },
    { semestre: '2023.2', concluidos: 92, total: 445 },
    { semestre: '2024.1', concluidos: 115, total: 450 },
  ];

  const oportunidadesAtivas = [
    { id: 1, titulo: 'Desenvolvimento Web para ONGs', inscritos: 25, vagas: 30, responsavel: 'Prof. João' },
    { id: 2, titulo: 'Automação IoT para Agricultura', inscritos: 18, vagas: 20, responsavel: 'Profa. Maria' },
    { id: 3, titulo: 'Alfabetização Digital Comunitária', inscritos: 40, vagas: 40, responsavel: 'Prof. Carlos' },
    { id: 4, titulo: 'Oficinas de Robótica Educacional', inscritos: 15, vagas: 25, responsavel: 'Profa. Ana' },
  ];

  const solicitacoesRecentes = [
    { id: 1, aluno: 'Pedro Oliveira', atividade: 'Congresso Nacional de Medicina', horas: 20, dias: 2 },
    { id: 2, aluno: 'Julia Santos', atividade: 'Workshop de Tecnologia', horas: 8, dias: 5 },
    { id: 3, aluno: 'Lucas Ferreira', atividade: 'Simpósio de Extensão', horas: 16, dias: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Painel de Coordenação</h2>
        <p className="text-gray-600 mt-1">Indicadores e métricas do curso</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Alunos</p>
              <p className="text-gray-900 mt-1">{totalAlunos}</p>
              <p className="text-green-600 text-xs mt-1">↑ 3.2% vs semestre anterior</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <UsersIcon className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Alunos com Horas</p>
              <p className="text-gray-900 mt-1">{alunosComHoras}</p>
              <p className="text-gray-600 text-xs mt-1">{((alunosComHoras/totalAlunos)*100).toFixed(1)}% do total</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Alunos em Risco</p>
              <p className="text-gray-900 mt-1">{alunosEmRisco}</p>
              <p className="text-red-600 text-xs mt-1">Menos de 50% das horas</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Solicitações Pendentes</p>
              <p className="text-gray-900 mt-1">{solicitacoesPendentes}</p>
              <p className="text-yellow-600 text-xs mt-1">Aguardando análise</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Distribuição de Carga Horária</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={distribuicaoHoras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="faixa" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill="#9e1e22" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Evolução de Concluintes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={evolucaoSemestral}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semestre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="concluidos" stroke="#16a34a" name="Concluídos" strokeWidth={2} />
              <Line type="monotone" dataKey="total" stroke="#9e1e22" name="Total" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Solicitações de Aproveitamento Pendentes</h3>
            <p className="text-gray-600 text-sm mt-1">Prazo de 10 dias para decisão</p>
          </div>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            {solicitacoesPendentes} pendentes
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Aluno
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Atividade
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Horas
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
              {solicitacoesRecentes.map((solicitacao) => (
                <tr key={solicitacao.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{solicitacao.aluno}</td>
                  <td className="px-6 py-4 text-gray-700">{solicitacao.atividade}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-gray-700">
                      <ClockIcon className="w-4 h-4" />
                      {solicitacao.horas}h
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      solicitacao.dias <= 2 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {solicitacao.dias} dias restantes
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-teal-600 hover:text-teal-700 text-sm mr-3">
                      Analisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Oportunidades Ativas</h3>
          <p className="text-gray-600 text-sm mt-1">Atividades de extensão em andamento</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Responsável
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Vagas
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Ocupação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {oportunidadesAtivas.map((oportunidade) => {
                const ocupacao = (oportunidade.inscritos / oportunidade.vagas) * 100;
                return (
                  <tr key={oportunidade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <TrophyIcon className="w-5 h-5 text-teal-600" />
                        <span className="text-gray-900">{oportunidade.titulo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{oportunidade.responsavel}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {oportunidade.inscritos}/{oportunidade.vagas}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              ocupacao === 100 ? 'bg-green-500' : 'bg-teal-600'
                            }`}
                            style={{ width: `${ocupacao}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{ocupacao.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}