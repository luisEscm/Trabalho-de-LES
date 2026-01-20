import { useState } from 'react';
import { 
  TrophyIcon, 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationCircleIcon, 
  ArrowDownTrayIcon, 
  ShieldCheckIcon, 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  QrCodeIcon, 
  XMarkIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

export function PaginaCertificadosPublica() {
  const [codigoValidacao, setCodigoValidacao] = useState('');
  const [certificadoValidado, setCertificadoValidado] = useState<any>(null);
  const [validando, setValidando] = useState(false);
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Dados simulados de certificados para validação
  const certificadosDemo = {
    'CERT-2024-001234': {
      codigo: 'CERT-2024-001234',
      participante: 'João Silva',
      atividade: 'Programa de Alfabetização Digital para Idosos',
      tipo: 'Projeto',
      cargaHoraria: 60,
      dataEmissao: '2024-12-15',
      dataInicio: '2024-02-01',
      dataConclusao: '2024-06-30',
      coordenador: 'Prof. Dr. Carlos Oliveira',
      situacao: 'Válido',
      hashValidacao: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
    },
    'CERT-2024-005678': {
      codigo: 'CERT-2024-005678',
      participante: 'Maria Santos',
      atividade: 'Desenvolvimento de Apps para ONGs',
      tipo: 'Programa',
      cargaHoraria: 120,
      dataEmissao: '2024-11-20',
      dataInicio: '2024-03-01',
      dataConclusao: '2024-12-15',
      coordenador: 'Profa. Dra. Ana Carolina',
      situacao: 'Válido',
      hashValidacao: 'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4'
    },
    'CERT-2024-012345': {
      codigo: 'CERT-2024-012345',
      participante: 'Pedro Oliveira',
      atividade: 'Hackathon de Inovação Social',
      tipo: 'Evento',
      cargaHoraria: 20,
      dataEmissao: '2024-06-18',
      dataInicio: '2024-06-15',
      dataConclusao: '2024-06-17',
      coordenador: 'Prof. Me. Roberto Santos',
      situacao: 'Válido',
      hashValidacao: 'm5n4b3v2c1x0z9a8s7d6f5g4h3j2k1l0'
    }
  };

  const handleValidar = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCertificadoValidado(null);
    setValidando(true);

    // Simular validação
    setTimeout(() => {
      const cert = certificadosDemo[codigoValidacao as keyof typeof certificadosDemo];
      
      if (cert) {
        setCertificadoValidado(cert);
        setShowModal(true);
      } else {
        setErro('Certificado não encontrado. Verifique o código e tente novamente.');
        setShowModal(true);
      }
      
      setValidando(false);
    }, 1000);
  };

  const handleLimpar = () => {
    setCodigoValidacao('');
    setCertificadoValidado(null);
    setErro('');
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Validação de Certificados</h2>
          <p className="text-gray-600 mt-1">
            Verifique a autenticidade de certificados emitidos pelo sistema
          </p>
        </div>
        <a
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <ShieldCheckIcon className="w-5 h-5" />
          <span>Validar Certificado</span>
        </a>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Certificados Emitidos</p>
              <p className="text-gray-900 mt-1">2.847</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <TrophyIcon className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Validações Realizadas</p>
              <p className="text-gray-900 mt-1">1.523</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Taxa de Autenticidade</p>
              <p className="text-gray-900 mt-1">98.5%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de Validação */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-gray-900">Verificar Autenticidade</h3>
            <p className="text-gray-600 mt-2">
              Digite o código de validação encontrado no certificado
            </p>
          </div>

          <form onSubmit={handleValidar} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Código de Autenticidade
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={codigoValidacao}
                  onChange={(e) => {
                    setCodigoValidacao(e.target.value.toUpperCase());
                    setErro('');
                  }}
                  placeholder="Ex: CERT-2024-001234"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                O código está localizado no rodapé do certificado
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={validando || !codigoValidacao}
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {validando ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Validando...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon className="w-5 h-5" />
                    <span>Validar Certificado</span>
                  </>
                )}
              </button>
              
              {codigoValidacao && (
                <button
                  type="button"
                  onClick={handleLimpar}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpar
                </button>
              )}
            </div>
          </form>

          {/* Códigos de Demonstração */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Códigos para demonstração:</strong>
            </p>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setCodigoValidacao('CERT-2024-001234')}
                className="block text-sm text-teal-600 hover:text-teal-700"
              >
                • CERT-2024-001234
              </button>
              <button
                type="button"
                onClick={() => setCodigoValidacao('CERT-2024-005678')}
                className="block text-sm text-teal-600 hover:text-teal-700"
              >
                • CERT-2024-005678
              </button>
              <button
                type="button"
                onClick={() => setCodigoValidacao('CERT-2024-012345')}
                className="block text-sm text-teal-600 hover:text-teal-700"
              >
                • CERT-2024-012345
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Validação */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Certificado Válido */}
            {certificadoValidado && (
              <>
                {/* Header de Sucesso */}
                <div className="bg-green-50 border-b border-green-200 p-6 sticky top-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <CheckCircleIcon className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">Certificado Válido</h3>
                        <p className="text-green-700 text-sm">
                          Este certificado foi emitido oficialmente pelo sistema e é autêntico
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Título e Tipo */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-teal-100">
                        <TrophyIcon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">{certificadoValidado.atividade}</h3>
                        <p className="text-gray-600 text-sm">{certificadoValidado.tipo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Informações Principais */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participante:</span>
                      <span className="text-gray-900">{certificadoValidado.participante}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Coordenador:</span>
                      <span className="text-gray-900">{certificadoValidado.coordenador}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Carga Horária:</span>
                      <span className="text-gray-900">{certificadoValidado.cargaHoraria}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Período:</span>
                      <span className="text-gray-900">
                        {new Date(certificadoValidado.dataInicio).toLocaleDateString('pt-BR')} até{' '}
                        {new Date(certificadoValidado.dataConclusao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Emissão:</span>
                      <span className="text-gray-900">
                        {new Date(certificadoValidado.dataEmissao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <CheckCircleIcon className="w-4 h-4" />
                        {certificadoValidado.situacao}
                      </span>
                    </div>
                  </div>

                  {/* Código de Autenticidade - RF27 */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <QrCodeIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-xs text-gray-600">Código de Autenticidade:</span>
                    </div>
                    <p className="text-sm text-gray-900 font-mono mb-3">{certificadoValidado.codigo}</p>
                    <p className="text-xs text-gray-600 mb-1">Hash de Verificação:</p>
                    <p className="text-xs text-gray-900 font-mono break-all">
                      {certificadoValidado.hashValidacao}
                    </p>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      Baixar Comprovante
                    </button>
                    <button 
                      onClick={handleCloseModal}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Certificado Inválido */}
            {erro && (
              <>
                {/* Header de Erro */}
                <div className="bg-red-50 border-b border-red-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-100 p-3 rounded-full">
                        <XCircleIcon className="w-8 h-8 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">Certificado Não Encontrado</h3>
                        <p className="text-red-700 text-sm">
                          O código informado não corresponde a nenhum certificado válido
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Detalhes do Erro */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <ExclamationCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-700 text-sm mb-2">{erro}</p>
                        <p className="text-red-600 text-sm">
                          <strong>Código informado:</strong> <span className="font-mono">{codigoValidacao}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Orientações */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="text-gray-900 mb-3">Possíveis causas:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-1">•</span>
                        <span>O código foi digitado incorretamente. Verifique se não há erros de digitação.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-1">•</span>
                        <span>O certificado pode ter sido revogado ou cancelado.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-1">•</span>
                        <span>O código pode ser de um certificado emitido por outra instituição.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 mt-1">•</span>
                        <span>O certificado pode ser fraudulento.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        handleCloseModal();
                        setCodigoValidacao('');
                      }}
                      className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Tentar Novamente
                    </button>
                    <button 
                      onClick={handleCloseModal}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Informações sobre Certificação */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h3 className="text-teal-900 mb-3">Sobre a Validação de Certificados</h3>
        <div className="space-y-2 text-teal-800 text-sm">
          <p><strong>Como validar:</strong> Digite o código de autenticidade presente no certificado. O sistema exibirá todas as informações originais para confirmar a autenticidade.</p>
          <p><strong>Validação Pública:</strong> Qualquer pessoa pode validar a autenticidade de um certificado utilizando o código único impresso no documento.</p>
          <p><strong>Importante:</strong> Certificados emitidos pelo sistema possuem código único e podem ser validados a qualquer momento.</p>
        </div>
      </div>
    </div>
  );
}