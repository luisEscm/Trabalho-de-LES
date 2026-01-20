import { useState } from 'react';
import { 
  XMarkIcon, 
  UsersIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  MapPinIcon,
  TrophyIcon,
  Cog6ToothIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

interface Inscrito {
  id: number;
  nome: string;
  matricula: string;
  email: string;
  telefone: string;
  curso: string;
  periodo: string;
  dataInscricao: string;
  status: 'Pendente' | 'Aprovado' | 'Reprovado';
}

interface Participante {
  id: number;
  nome: string;
  matricula: string;
  email: string;
  curso: string;
  dataAprovacao: string;
  frequencia: number;
  status: 'Ativo' | 'Desistente';
}

interface Oportunidade {
  id: number;
  titulo: string;
  descricao: string;
  modalidade: string;
  cargaHoraria?: number;
  vagas?: number;
  inscritos?: number;
  local?: string;
  periodo: string;
  status: string;
}

interface ModalGerenciarOportunidadeProps {
  oportunidade: Oportunidade;
  onClose: () => void;
}

type AbaAtiva = 'inscritos' | 'participantes' | 'detalhes';

export function ModalGerenciarOportunidade({ oportunidade, onClose }: ModalGerenciarOportunidadeProps) {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('inscritos');

  // Dados mockados de inscritos
  const inscritosMock: Inscrito[] = [
    {
      id: 1,
      nome: 'Maria  Santos Silva',
      matricula: '202301234',
      email: 'maria.silva@instituicao.edu.br',
      telefone: '(11) 98765-4321',
      curso: 'Medicina',
      periodo: '5º período',
      dataInscricao: '05/12/2024',
      status: 'Pendente'
    },
    {
      id: 2,
      nome: 'Pedro Henrique Costa',
      matricula: '202301567',
      email: 'pedro.costa@instituicao.edu.br',
      telefone: '(11) 97654-3210',
      curso: 'Enfermagem',
      periodo: '3º período',
      dataInscricao: '06/12/2024',
      status: 'Pendente'
    },
    {
      id: 3,
      nome: 'Ana Carolina Souza',
      matricula: '202301890',
      email: 'ana.souza@instituicao.edu.br',
      telefone: '(11) 96543-2109',
      curso: 'Medicina',
      periodo: '7º período',
      dataInscricao: '07/12/2024',
      status: 'Pendente'
    }
  ];

  // Dados mockados de participantes aprovados
  const participantesMock: Participante[] = [
    {
      id: 1,
      nome: 'João Carlos Silva',
      matricula: '202201123',
      email: 'joao.silva@instituicao.edu.br',
      curso: 'Medicina',
      dataAprovacao: '01/03/2024',
      frequencia: 87,
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Fernanda Lima Santos',
      matricula: '202201456',
      email: 'fernanda.lima@instituicao.edu.br',
      curso: 'Enfermagem',
      dataAprovacao: '02/03/2024',
      frequencia: 95,
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Ricardo Alves Costa',
      matricula: '202201789',
      email: 'ricardo.alves@instituicao.edu.br',
      curso: 'Medicina',
      dataAprovacao: '03/03/2024',
      frequencia: 100,
      status: 'Ativo'
    },
    {
      id: 4,
      nome: 'Juliana Martins',
      matricula: '202201012',
      email: 'juliana.martins@instituicao.edu.br',
      curso: 'Farmácia',
      dataAprovacao: '05/03/2024',
      frequencia: 42,
      status: 'Desistente'
    }
  ];

  const handleAprovarInscricao = (inscritoId: number) => {
    console.log('Aprovando inscrição:', inscritoId);
    alert('Inscrição aprovada! O aluno será notificado por e-mail.');
  };

  const handleReprovarInscricao = (inscritoId: number) => {
    const motivo = prompt('Informe o motivo da reprovação (será enviado ao aluno):');
    if (motivo) {
      console.log('Reprovando inscrição:', inscritoId, 'Motivo:', motivo);
      alert('Inscrição reprovada. O aluno será notificado com o motivo informado.');
    }
  };

  const handleAlterarStatusParticipante = (participanteId: number) => {
    const confirmacao = confirm('Deseja marcar este participante como desistente?');
    if (confirmacao) {
      console.log('Alterando status do participante:', participanteId);
      alert('Status do participante alterado.');
    }
  };

  const handleEncerrarAtividade = () => {
    const confirmacao = confirm(
      'Ao encerrar a atividade, todos os participantes ativos receberão seus certificados automaticamente. Deseja continuar?'
    );
    if (confirmacao) {
      console.log('Encerrando atividade:', oportunidade.id);
      alert('Atividade encerrada! Os certificados serão emitidos automaticamente.');
      onClose();
    }
  };

  const participantesAtivos = participantesMock.filter(p => p.status === 'Ativo');
  const participantesDesistentes = participantesMock.filter(p => p.status === 'Desistente');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-2">Gerenciar Oportunidade</h2>
              <p className="text-gray-600">{oportunidade.titulo}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Abas */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setAbaAtiva('inscritos')}
                className={`pb-3 px-2 border-b-2 transition-colors ${
                  abaAtiva === 'inscritos'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-gray-600 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  <span>Inscrições Pendentes</span>
                  <span className="px-2 py-0.5 bg-yellow-500 text-white rounded-full text-xs">
                    {inscritosMock.filter(i => i.status === 'Pendente').length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setAbaAtiva('participantes')}
                className={`pb-3 px-2 border-b-2 transition-colors ${
                  abaAtiva === 'participantes'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-gray-600 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4" />
                  <span>Participantes</span>
                  <span className="px-2 py-0.5 bg-teal-600 text-white rounded-full text-xs">
                    {participantesAtivos.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setAbaAtiva('detalhes')}
                className={`pb-3 px-2 border-b-2 transition-colors ${
                  abaAtiva === 'detalhes'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-gray-600 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cog6ToothIcon className="w-4 h-4" />
                  <span>Detalhes e Configurações</span>
                </div>
              </button>
            </div>
          </div>

          {/* Conteúdo da Aba de Inscritos */}
          {abaAtiva === 'inscritos' && (
            <div className="space-y-4">
              {inscritosMock.filter(i => i.status === 'Pendente').length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Nenhuma inscrição pendente</p>
                  <p className="text-gray-500 text-sm">Todas as inscrições foram analisadas</p>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-900 text-sm">
                      Analise as inscrições e aprove ou reprove os candidatos. 
                      Os alunos serão notificados automaticamente por e-mail.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {inscritosMock
                      .filter(i => i.status === 'Pendente')
                      .map((inscrito) => (
                        <div key={inscrito.id} className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white">
                                  {inscrito.nome.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-gray-900">{inscrito.nome}</p>
                                  <p className="text-gray-600 text-sm">Mat: {inscrito.matricula}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-gray-600 text-xs mb-1">Curso e Período</p>
                                  <p className="text-gray-900 text-sm">{inscrito.curso} • {inscrito.periodo}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 text-xs mb-1">Data da Inscrição</p>
                                  <div className="flex items-center gap-1 text-gray-900 text-sm">
                                    <CalendarIcon className="w-3 h-3" />
                                    {inscrito.dataInscricao}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-600 text-xs mb-1">E-mail</p>
                                  <div className="flex items-center gap-1 text-gray-900 text-sm">
                                    <EnvelopeIcon className="w-3 h-3" />
                                    {inscrito.email}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-600 text-xs mb-1">Telefone</p>
                                  <div className="flex items-center gap-1 text-gray-900 text-sm">
                                    <PhoneIcon className="w-3 h-3" />
                                    {inscrito.telefone}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleAprovarInscricao(inscrito.id)}
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                >
                                  <CheckCircleIcon className="w-4 h-4" />
                                  Aprovar Inscrição
                                </button>
                                <button
                                  onClick={() => handleReprovarInscricao(inscrito.id)}
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                  <XCircleIcon className="w-4 h-4" />
                                  Reprovar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Conteúdo da Aba de Participantes */}
          {abaAtiva === 'participantes' && (
            <div className="space-y-4">
              {/* Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="text-teal-600 text-sm mb-1">Participantes Ativos</p>
                  <p className="text-teal-900 text-2xl">{participantesAtivos.length}</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Desistentes</p>
                  <p className="text-gray-900 text-2xl">{participantesDesistentes.length}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-600 text-sm mb-1">Frequência Média</p>
                  <p className="text-blue-900 text-2xl">
                    {Math.round(
                      participantesAtivos.reduce((acc, p) => acc + p.frequencia, 0) / 
                      participantesAtivos.length
                    )}%
                  </p>
                </div>
              </div>

              {/* Lista de Participantes */}
              <div className="space-y-3">
                <h3 className="text-gray-900">Participantes Ativos</h3>
                {participantesAtivos.map((participante) => (
                  <div key={participante.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white">
                          {participante.nome.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <p className="text-gray-900">{participante.nome}</p>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                              {participante.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>Mat: {participante.matricula}</span>
                            <span>• {participante.curso}</span>
                            <span>• Frequência: {participante.frequencia}%</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAlterarStatusParticipante(participante.id)}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                      >
                        Marcar Desistência
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desistentes */}
              {participantesDesistentes.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="text-gray-900">Desistentes</h3>
                  {participantesDesistentes.map((participante) => (
                    <div key={participante.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white">
                          {participante.nome.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <p className="text-gray-900">{participante.nome}</p>
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                              Desistente
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>Mat: {participante.matricula}</span>
                            <span>• {participante.curso}</span>
                            <span>• Frequência final: {participante.frequencia}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Conteúdo da Aba de Detalhes */}
          {abaAtiva === 'detalhes' && (
            <div className="space-y-6">
              {/* Informações da Oportunidade */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-teal-600 text-white p-2 rounded-lg">
                    <BookOpenIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{oportunidade.titulo}</h3>
                    <p className="text-teal-700 text-sm">{oportunidade.modalidade}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{oportunidade.descricao}</p>
              </div>

              {/* Detalhes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Carga Horária</p>
                  <p className="text-gray-900">{oportunidade.cargaHoraria} horas</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Período</p>
                  <p className="text-gray-900">{oportunidade.periodo}</p>
                </div>
                {oportunidade.local && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600 text-sm mb-1">Local</p>
                    <div className="flex items-center gap-2 text-gray-900">
                      <MapPinIcon className="w-4 h-4" />
                      {oportunidade.local}
                    </div>
                  </div>
                )}
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Vagas</p>
                  <p className="text-gray-900">{oportunidade.inscritos}/{oportunidade.vagas}</p>
                </div>
              </div>

              {/* Ações */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-gray-900 mb-4">Ações da Atividade</h3>
                <div className="space-y-3">
                  <button
                    className="w-full flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-gray-900">Editar Detalhes</p>
                      <p className="text-gray-600 text-sm">Alterar informações da oportunidade</p>
                    </div>
                  </button>

                  <button
                    onClick={handleEncerrarAtividade}
                    className="w-full flex items-center gap-3 p-4 border border-teal-300 rounded-lg hover:bg-teal-50 transition-colors text-left"
                  >
                    <TrophyIcon className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-teal-900">Encerrar Atividade e Emitir Certificados</p>
                      <p className="text-teal-700 text-sm">
                        Todos os participantes ativos receberão certificados automaticamente
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}