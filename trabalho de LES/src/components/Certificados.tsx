import { User } from '../App';
import { useState } from 'react';
import { 
  TrophyIcon, 
  ArrowDownTrayIcon, 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  QrCodeIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

interface CertificadosProps {
  user: User;
}

interface Certificado {
  id: number;
  titulo: string;
  cargaHoraria: number;
  dataEmissao: string;
  codigo: string;
  status: 'Disponível' | 'Validado';
}

export function Certificados({ user }: CertificadosProps) {
  const [showValidacao, setShowValidacao] = useState(false);
  const [codigoValidacao, setCodigoValidacao] = useState('');

  // Dados mockados
  const certificados: Certificado[] = [
    {
      id: 1,
      titulo: 'Desenvolvimento Web para ONGs',
      cargaHoraria: 60,
      dataEmissao: '15/03/2024',
      codigo: 'CERT-2024-001-XYZ123',
      status: 'Disponível'
    },
    {
      id: 2,
      titulo: 'Curso de Capacitação Digital',
      cargaHoraria: 45,
      dataEmissao: '10/02/2024',
      codigo: 'CERT-2024-002-ABC456',
      status: 'Disponível'
    },
    {
      id: 3,
      titulo: 'Workshop de Inovação',
      cargaHoraria: 10,
      dataEmissao: '05/01/2024',
      codigo: 'CERT-2024-003-DEF789',
      status: 'Disponível'
    },
    {
      id: 4,
      titulo: 'Congresso Nacional de Medicina',
      cargaHoraria: 30,
      dataEmissao: '28/11/2024',
      codigo: 'EXT-2024-001-GHI012',
      status: 'Validado'
    }
  ];

  if (showValidacao) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">Validação de Certificados</h2>
          <button
            onClick={() => setShowValidacao(false)}
            className="text-gray-600 hover:text-gray-700"
          >
            Voltar
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-gray-900">Verificar Autenticidade</h3>
              <p className="text-gray-600 mt-2">
                Página pública para validação de certificados
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Código de Autenticidade</label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={codigoValidacao}
                    onChange={(e) => setCodigoValidacao(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite o código do certificado"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (codigoValidacao) {
                    alert('Certificado validado com sucesso!\n\nDados do certificado:\nTitulo: Projeto Saúde da Família\nParticipante: João Silva\nCarga Horária: 40h\nData de Emissão: 15/03/2024');
                  }
                }}
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Validar Certificado
              </button>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-teal-800 text-sm">
                  <strong>Como validar:</strong> Digite o código de autenticidade presente no certificado.
                  O sistema exibirá todas as informações originais para confirmar a autenticidade.
                </p>
              </div>
            </div>
          </div>
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
            {user.role === 'discente' ? 'Meus Certificados' : 'Certificação'}
          </h2>
          <p className="text-gray-600 mt-1">
            {user.role === 'discente' 
              ? 'Visualize e baixe seus certificados emitidos'
              : 'Gestão de certificados digitais'
            }
          </p>
        </div>
        <button
          onClick={() => setShowValidacao(true)}
          className="flex items-center gap-2 border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors"
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Validar Certificado
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Certificados</p>
              <p className="text-gray-900 mt-1">{certificados.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrophyIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Internos</p>
              <p className="text-gray-900 mt-1">
                {certificados.filter(c => c.status === 'Disponível').length}
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
              <p className="text-gray-600 text-sm">Externos Validados</p>
              <p className="text-gray-900 mt-1">
                {certificados.filter(c => c.status === 'Validado').length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Horas Certificadas</p>
              <p className="text-gray-900 mt-1">
                {certificados.reduce((sum, cert) => sum + cert.cargaHoraria, 0)}h
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TrophyIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Certificados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificados.map((certificado) => (
          <div key={certificado.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    certificado.status === 'Disponível' ? 'bg-teal-100' : 'bg-purple-100'
                  }`}>
                    <TrophyIcon className={`w-6 h-6 ${
                      certificado.status === 'Disponível' ? 'text-teal-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{certificado.titulo}</h3>
                    <p className="text-gray-600 text-sm">{certificado.status}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Carga Horária:</span>
                  <span className="text-gray-900">{certificado.cargaHoraria}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data de Emissão:</span>
                  <span className="text-gray-900">{certificado.dataEmissao}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <CheckCircleIcon className="w-4 h-4" />
                    {certificado.status}
                  </span>
                </div>
              </div>

              {/* Código de Autenticidade */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCodeIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600">Código de Autenticidade:</span>
                  </div>
                </div>
                <p className="text-sm text-gray-900 mt-1 font-mono">{certificado.codigo}</p>
              </div>

              {user.role === 'discente' && (
                <button
                  onClick={() => alert(`Baixando certificado: ${certificado.titulo}\nDownload em PDF`)}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Baixar Certificado
                </button>
              )}

              {user.role !== 'discente' && (
                <div className="flex gap-2">
                  <button className="flex-1 border border-teal-600 text-teal-600 py-2 rounded-lg hover:bg-teal-50 transition-colors">
                    Visualizar
                  </button>
                  <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Baixar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Informações sobre Certificação */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h3 className="text-teal-900 mb-3">Sobre os Certificados</h3>
        <div className="space-y-2 text-teal-800 text-sm">
          <p><strong>Geração Automática:</strong> Certificados digitais são gerados automaticamente após conclusão de atividades internas</p>
          <p><strong>Código Único:</strong> Cada certificado possui código único para verificação de autenticidade</p>
          <p><strong>Validação Pública:</strong> Qualquer pessoa pode validar certificados através da página pública</p>
          <p><strong>Download:</strong> Certificados disponíveis para download em formato PDF</p>
        </div>
      </div>
    </div>
  );
}