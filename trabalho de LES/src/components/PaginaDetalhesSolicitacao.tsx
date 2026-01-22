import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  DocumentTextIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationCircleIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface Solicitacao {
  id: number;
  aluno: string;
  atividade: string;
  horasSolicitadas: number;
  dataEnvio: string;
  status: 'Pendente' | 'Aprovado' | 'Indeferido';
  prazoRestante: number;
  anexo: string;
  parecer?: string;
}

interface PaginaDetalhesSolicitacaoProps {
  solicitacao: Solicitacao;
  onVoltar: () => void;
  userRole?: 'discente' | 'coordenador' | 'docente' | 'admin';
  onAtualizarSolicitacao?: (solicitacao: Solicitacao) => void;
}

export function PaginaDetalhesSolicitacao({ 
  solicitacao: solicitacaoInicial, 
  onVoltar,
  userRole,
  onAtualizarSolicitacao
}: PaginaDetalhesSolicitacaoProps) {
  const [solicitacao, setSolicitacao] = useState(solicitacaoInicial);
  const [modalAprovacao, setModalAprovacao] = useState(false);
  const [modalIndeferimento, setModalIndeferimento] = useState(false);
  const [motivoIndeferimento, setMotivoIndeferimento] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
      case 'Indeferido':
        return <XCircleIcon className="w-6 h-6 text-red-600" />;
      case 'Pendente':
        return <ExclamationCircleIcon className="w-6 h-6 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-700';
      case 'Indeferido':
        return 'bg-red-100 text-red-700';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusTexto = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'Aprovada';
      case 'Indeferido':
        return 'Indeferida';
      case 'Pendente':
        return 'Pendente';
      default:
        return status;
    }
  };

  const handleDownloadPDF = () => {
    // Implementar download do PDF
    console.log('Download do documento:', solicitacao.anexo);
  };

  const handleAprovar = () => {
    const solicitacaoAtualizada = {
      ...solicitacao,
      status: 'Aprovado' as const,
      parecer: 'Solicitação aprovada pela coordenação.'
    };
    setSolicitacao(solicitacaoAtualizada);
    onAtualizarSolicitacao?.(solicitacaoAtualizada);
    toast.success('Solicitação aprovada com sucesso!');
    setModalAprovacao(false);
  };

  const handleIndeferir = () => {
    if (!motivoIndeferimento.trim()) {
      toast.error('Motivo do indeferimento é obrigatório');
      return;
    }
    const solicitacaoAtualizada = {
      ...solicitacao,
      status: 'Indeferido' as const,
      parecer: motivoIndeferimento
    };
    setSolicitacao(solicitacaoAtualizada);
    onAtualizarSolicitacao?.(solicitacaoAtualizada);
    toast.success('Solicitação indeferida com sucesso!');
    setModalIndeferimento(false);
    setMotivoIndeferimento('');
  };

  return (
    <div className="space-y-6">
      {/* Botão Voltar */}
      <button
        onClick={onVoltar}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Voltar para Solicitações
      </button>

      {/* Header da Página */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-lg bg-teal-100">
            <DocumentTextIcon className="w-8 h-8 text-teal-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="text-gray-900 text-2xl mb-1">{solicitacao.atividade}</h1>
                <p className="text-gray-600">Solicitação de Aproveitamento de Atividade</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getStatusColor(solicitacao.status)}`}>
                {getStatusIcon(solicitacao.status)}
                {getStatusTexto(solicitacao.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Botão de Download */}
        {userRole === 'coordenador' && solicitacao.status === 'Pendente' ? (
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={handleDownloadPDF}
              className="bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Baixar Documento da Solicitação (PDF)
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setModalAprovacao(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Aprovar
              </button>
              <button
                onClick={() => setModalIndeferimento(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
              >
                <XCircleIcon className="w-5 h-5" />
                Indeferir
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleDownloadPDF}
            className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            Baixar Documento da Solicitação (PDF)
          </button>
        )}
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal - Informações */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações da Solicitação */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-900 text-lg mb-4">Informações da Solicitação</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                  Aluno
                </label>
                <p className="text-gray-900 text-lg font-medium">{solicitacao.aluno}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                  Atividade
                </label>
                <p className="text-gray-700">{solicitacao.atividade}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                    Carga Horária Solicitada
                  </label>
                  <p className="text-gray-900 text-lg font-medium">{solicitacao.horasSolicitadas} horas</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                    Data de Envio
                  </label>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{solicitacao.dataEnvio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parecer/Motivo */}
          {solicitacao.parecer && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-gray-900 text-lg mb-4">
                {solicitacao.status === 'Indeferido' ? 'Motivo do Indeferimento' : 'Parecer'}
              </h2>
              
              <div className={`p-4 rounded-lg border ${
                solicitacao.status === 'Indeferido'
                  ? 'bg-red-50 border-red-200'
                  : solicitacao.status === 'Aprovado'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`text-sm leading-relaxed ${
                  solicitacao.status === 'Indeferido'
                    ? 'text-red-800'
                    : solicitacao.status === 'Aprovado'
                    ? 'text-green-800'
                    : 'text-gray-800'
                }`}>
                  {solicitacao.parecer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Coluna Lateral - Resumo */}
        <div className="space-y-6">
          {/* Status Detalhado */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              {getStatusIcon(solicitacao.status)}
              Status da Solicitação
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Situação Atual</p>
                <p className={`text-sm font-medium px-3 py-2 rounded-lg inline-block mt-1 ${getStatusColor(solicitacao.status)}`}>
                  {getStatusTexto(solicitacao.status)}
                </p>
              </div>

              {solicitacao.status === 'Pendente' && (
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider">Prazo Restante</p>
                  <p className="text-lg font-medium text-yellow-600 mt-1">
                    {solicitacao.prazoRestante} dias
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card de Informação */}
          {solicitacao.status === 'Pendente' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-yellow-900 mb-2 font-medium">Solicitação Pendente</h3>
              <p className="text-yellow-800 text-sm">
                Sua solicitação está em análise. Você será notificado quando a coordenação tomar uma decisão.
              </p>
            </div>
          )}

          {solicitacao.status === 'Aprovado' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-green-900 mb-2 font-medium">Solicitação Aprovada</h3>
              <p className="text-green-800 text-sm">
                Parabéns! Sua solicitação foi aprovada. As horas desta atividade serão adicionadas ao seu histórico de extensão.
              </p>
            </div>
          )}

          {solicitacao.status === 'Indeferido' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-900 mb-2 font-medium">Solicitação Indeferida</h3>
              <p className="text-red-800 text-sm">
                Sua solicitação foi indeferida. Verifique o motivo acima e considere enviar uma nova solicitação com as informações revisadas.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Aprovação */}
      <AlertDialog open={modalAprovacao} onOpenChange={setModalAprovacao}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              Aprovar Solicitação
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja aprovar esta solicitação? As horas serão registradas no histórico do aluno.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aluno</label>
              <p className="text-gray-900">{solicitacao.aluno}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Atividade</label>
              <p className="text-gray-900">{solicitacao.atividade}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Carga Horária</label>
              <p className="text-gray-900">{solicitacao.horasSolicitadas} horas</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleAprovar}
              className="bg-green-600 hover:bg-green-700">
              Aprovar Solicitação
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de Indeferimento */}
      <AlertDialog open={modalIndeferimento} onOpenChange={setModalIndeferimento}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <XCircleIcon className="w-5 h-5 text-red-600" />
              Indeferir Solicitação
            </AlertDialogTitle>
            <AlertDialogDescription>
              Explique o motivo do indeferimento desta solicitação. Este motivo será enviado ao aluno.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aluno</label>
              <p className="text-gray-900">{solicitacao.aluno}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Atividade</label>
              <p className="text-gray-900">{solicitacao.atividade}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Motivo do Indeferimento *</label>
              <textarea
                value={motivoIndeferimento}
                onChange={(e) => setMotivoIndeferimento(e.target.value)}
                placeholder="Explique o motivo do indeferimento..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={4}
              />
              {!motivoIndeferimento.trim() && (
                <p className="text-sm text-red-600 mt-1">Campo obrigatório</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleIndeferir}
              className="bg-red-600 hover:bg-red-700">
              Indeferir Solicitação
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
