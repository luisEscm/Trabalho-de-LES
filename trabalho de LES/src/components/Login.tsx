import { useState } from 'react';
import { User, UserRole } from '../App';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  AcademicCapIcon, 
  ExclamationCircleIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  CheckCircleIcon, 
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

interface LoginProps {
  onLogin: (user: User) => void;
  onVoltar?: () => void;
}

type TelaAtiva = 'login' | 'cadastro' | 'recuperarSenha' | 'codigoRecuperacao' | 'novaSenha';

export function Login({ onLogin, onVoltar }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telaAtiva, setTelaAtiva] = useState<TelaAtiva>('login');
  const [erroLogin, setErroLogin] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [cadastroData, setCadastroData] = useState({
    nome: '',
    matricula: '',
    emailCadastro: '',
    senhaCadastro: '',
    confirmarSenha: ''
  });
  const [erroSenha, setErroSenha] = useState('');
  const [mostrarSenhaCadastro, setMostrarSenhaCadastro] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const [codigoRecuperacao, setCodigoRecuperacao] = useState(['', '', '', '', '', '']);
  const [novaSenhaData, setNovaSenhaData] = useState({
    novaSenha: '',
    confirmarNovaSenha: ''
  });
  const [erroRecuperacao, setErroRecuperacao] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarNovaSenha, setMostrarConfirmarNovaSenha] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);

  const usuariosMockados: { [key: string]: User } = {
    'joao.silva@discente.ufma.br': {
      id: '1',
      nome: 'João Silva',
      email: 'joao.silva@discente.ufma.br',
      matricula: '20231001',
      role: 'discente' as UserRole,
    },
    'ana.costa@discente.ufma.br': {
      id: '4',
      nome: 'Ana Costa',
      email: 'ana.costa@discente.ufma.br',
      matricula: '20231002',
      role: 'discente' as UserRole,
    },
    'maria.santos@coordenador.ufma.br': {
      id: '2',
      nome: 'Dra. Maria Santos',
      email: 'maria.santos@coordenador.ufma.br',
      matricula: 'SIAPE123',
      role: 'coordenador' as UserRole,
    },
    'carlos.oliveira@docente.ufma.br': {
      id: '3',
      nome: 'Prof. Dr. Carlos Oliveira',
      email: 'carlos.oliveira@docente.ufma.br',
      matricula: 'SIAPE456',
      role: 'docente' as UserRole,
    },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErroLogin('');
    
    const user = usuariosMockados[email as keyof typeof usuariosMockados];
    
    if (user && senha === '1234') {
      onLogin(user);
    } else {
      setErroLogin('E-mail ou senha incorretos. (Dica: A senha padrão é 1234)');
    }
  };

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    setErroSenha('');

    if (cadastroData.senhaCadastro !== cadastroData.confirmarSenha) {
      setErroSenha('As senhas não coincidem. Por favor, verifique e tente novamente.');
      return;
    }

    if (cadastroData.senhaCadastro.length < 6) {
      setErroSenha('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    alert('Cadastro realizado com sucesso! Um código de validação foi enviado para seu e-mail institucional.');
    setTelaAtiva('login');
    setCadastroData({
      nome: '',
      matricula: '',
      emailCadastro: '',
      senhaCadastro: '',
      confirmarSenha: ''
    });
  };

  const handleConfirmarSenhaBlur = () => {
    if (cadastroData.confirmarSenha && cadastroData.senhaCadastro !== cadastroData.confirmarSenha) {
      setErroSenha('As senhas não coincidem.');
    } else {
      setErroSenha('');
    }
  };

  const handleSolicitarRecuperacao = (e: React.FormEvent) => {
    e.preventDefault();
    setErroRecuperacao('');

    if (!emailRecuperacao.endsWith('@instituicao.edu.br') && !emailRecuperacao.includes('@')) {
      setErroRecuperacao('Por favor, utilize um e-mail institucional válido.');
      return;
    }

    setEmailEnviado(true);
    setTimeout(() => {
      setTelaAtiva('codigoRecuperacao');
    }, 1500);
  };

  const handleCodigoChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCodigo = [...codigoRecuperacao];
    newCodigo[index] = value;
    setCodigoRecuperacao(newCodigo);

    if (value && index < 5) {
      const nextInput = document.getElementById(`codigo-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodigoKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codigoRecuperacao[index] && index > 0) {
      const prevInput = document.getElementById(`codigo-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerificarCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    const codigo = codigoRecuperacao.join('');
    
    if (codigo.length !== 6) {
      setErroRecuperacao('Por favor, digite o código completo de 6 dígitos.');
      return;
    }

    if (codigo === '123456') {
      setTelaAtiva('novaSenha');
      setErroRecuperacao('');
    } else {
      setErroRecuperacao('Código inválido. Verifique o código enviado para seu e-mail.');
    }
  };

  const handleRedefinirSenha = (e: React.FormEvent) => {
    e.preventDefault();
    setErroRecuperacao('');

    if (novaSenhaData.novaSenha.length < 6) {
      setErroRecuperacao('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (novaSenhaData.novaSenha !== novaSenhaData.confirmarNovaSenha) {
      setErroRecuperacao('As senhas não coincidem.');
      return;
    }

    alert('Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.');
    setTelaAtiva('login');
    setEmailRecuperacao('');
    setCodigoRecuperacao(['', '', '', '', '', '']);
    setNovaSenhaData({ novaSenha: '', confirmarNovaSenha: '' });
    setEmailEnviado(false);
  };

  const voltarParaLogin = () => {
    setTelaAtiva('login');
    setErroRecuperacao('');
    setEmailRecuperacao('');
    setCodigoRecuperacao(['', '', '', '', '', '']);
    setNovaSenhaData({ novaSenha: '', confirmarNovaSenha: '' });
    setEmailEnviado(false);
  };

  if (telaAtiva === 'recuperarSenha') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <button
            onClick={voltarParaLogin}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar ao login
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <LockClosedIcon className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-gray-900">Recuperar Senha</h2>
            <p className="text-gray-600 mt-2">
              Digite seu e-mail institucional para receber o código de recuperação
            </p>
          </div>

          {emailEnviado ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-800 mb-2">
                <strong>Código enviado com sucesso!</strong>
              </p>
              <p className="text-green-700 text-sm">
                Verifique sua caixa de entrada em <strong>{emailRecuperacao}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSolicitarRecuperacao} className="space-y-4">
              {erroRecuperacao && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ExclamationCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{erroRecuperacao}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2">E-mail Institucional *</label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={emailRecuperacao}
                    onChange={(e) => {
                      setEmailRecuperacao(e.target.value);
                      setErroRecuperacao('');
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="seuemail@instituicao.edu.br"
                    required
                  />
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-teal-800 text-sm">
                  Um código de 6 dígitos será enviado para o e-mail institucional cadastrado. 
                  O código tem validade de 15 minutos.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Enviar Código de Recuperação
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (telaAtiva === 'codigoRecuperacao') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <button
            onClick={voltarParaLogin}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar ao login
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <EnvelopeIcon className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-gray-900">Digite o Código</h2>
            <p className="text-gray-600 mt-2">
              Enviamos um código de 6 dígitos para
            </p>
            <p className="text-teal-700 mt-1">
              <strong>{emailRecuperacao}</strong>
            </p>
          </div>

          <form onSubmit={handleVerificarCodigo} className="space-y-4">
            {erroRecuperacao && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{erroRecuperacao}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2 text-center">Código de Verificação</label>
              <div className="flex gap-2 justify-center">
                {codigoRecuperacao.map((digito, index) => (
                  <input
                    key={index}
                    id={`codigo-${index}`}
                    type="text"
                    maxLength={1}
                    value={digito}
                    onChange={(e) => handleCodigoChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodigoKeyDown(index, e)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xl"
                    required
                  />
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm text-center">
                O código expira em <strong>15 minutos</strong>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Verificar Código
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setTelaAtiva('recuperarSenha')}
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                Não recebeu o código? Reenviar
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              Demonstração: use o código <strong>123456</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (telaAtiva === 'novaSenha') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <LockClosedIcon className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-gray-900">Criar Nova Senha</h2>
            <p className="text-gray-600 mt-2">
              Digite sua nova senha de acesso
            </p>
          </div>

          <form onSubmit={handleRedefinirSenha} className="space-y-4">
            {erroRecuperacao && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{erroRecuperacao}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">Nova Senha *</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={mostrarNovaSenha ? "text" : "password"}
                  value={novaSenhaData.novaSenha}
                  onChange={(e) => {
                    setNovaSenhaData({ ...novaSenhaData, novaSenha: e.target.value });
                    setErroRecuperacao('');
                  }}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Digite sua nova senha (mínimo 6 caracteres)"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {mostrarNovaSenha ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Confirmar Nova Senha *</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={mostrarConfirmarNovaSenha ? "text" : "password"}
                  value={novaSenhaData.confirmarNovaSenha}
                  onChange={(e) => {
                    setNovaSenhaData({ ...novaSenhaData, confirmarNovaSenha: e.target.value });
                    setErroRecuperacao('');
                  }}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Digite a senha novamente"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarNovaSenha(!mostrarConfirmarNovaSenha)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {mostrarConfirmarNovaSenha ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-teal-800 text-sm">
                <strong>Requisitos da senha:</strong>
              </p>
              <ul className="text-teal-700 text-sm mt-2 space-y-1">
                <li>• Mínimo de 6 caracteres</li>
                <li>• Recomendado: combine letras, números e símbolos</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Redefinir Senha
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (telaAtiva === 'cadastro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <AcademicCapIcon className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-gray-900">Autocadastro de Discente</h2>
            <p className="text-gray-600 mt-2">Cadastro com validação de e-mail institucional</p>
          </div>

          <form onSubmit={handleCadastro} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Nome Completo *</label>
              <input
                type="text"
                value={cadastroData.nome}
                onChange={(e) => setCadastroData({ ...cadastroData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Matrícula *</label>
              <input
                type="text"
                value={cadastroData.matricula}
                onChange={(e) => setCadastroData({ ...cadastroData, matricula: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Digite sua matrícula"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">E-mail Institucional *</label>
              <input
                type="email"
                value={cadastroData.emailCadastro}
                onChange={(e) => setCadastroData({ ...cadastroData, emailCadastro: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="seuemail@discente.ufma.br"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Senha *</label>
              <div className="relative">
                <input
                  type={mostrarSenhaCadastro ? "text" : "password"}
                  value={cadastroData.senhaCadastro}
                  onChange={(e) => {
                    setCadastroData({ ...cadastroData, senhaCadastro: e.target.value });
                    if (erroSenha) setErroSenha('');
                  }}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Digite sua senha (mínimo 6 caracteres)"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenhaCadastro(!mostrarSenhaCadastro)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {mostrarSenhaCadastro ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Confirmar Senha *</label>
              <div className="relative">
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  value={cadastroData.confirmarSenha}
                  onChange={(e) => {
                    setCadastroData({ ...cadastroData, confirmarSenha: e.target.value });
                    if (erroSenha) setErroSenha('');
                  }}
                  onBlur={handleConfirmarSenhaBlur}
                  className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    erroSenha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite a senha novamente"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {mostrarConfirmarSenha ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              {erroSenha && (
                <div className="flex items-start gap-2 mt-2 text-red-600">
                  <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{erroSenha}</p>
                </div>
              )}
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-teal-800 text-sm">
                Após o cadastro, você receberá um código de validação no e-mail institucional informado.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!!erroSenha}
            >
              Realizar Cadastro
            </button>

            <button
              type="button"
              onClick={() => {
                setTelaAtiva('login');
                setErroSenha('');
                setCadastroData({
                  nome: '',
                  matricula: '',
                  emailCadastro: '',
                  senhaCadastro: '',
                  confirmarSenha: ''
                });
              }}
              className="w-full text-teal-600 py-2 hover:text-teal-700"
            >
              Voltar ao Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
        {onVoltar && (
          <button
            onClick={onVoltar}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar ao portal público
          </button>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
            <AcademicCapIcon className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-gray-900">Sistema de Extensão</h1>
          <p className="text-gray-600 mt-2">Gestão de Atividades Extensionistas</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {erroLogin && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-800 text-sm">
                    <strong>Erro de autenticação</strong>
                  </p>
                  <p className="text-red-700 text-sm mt-1">{erroLogin}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">E-mail Institucional</label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErroLogin('');
                }}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  erroLogin ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="seuemail@instituicao.edu.br"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Senha</label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErroLogin('');
                }}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  erroLogin ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {mostrarSenha ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" />
              Lembrar-me
            </label>
            <button 
              type="button" 
              onClick={() => setTelaAtiva('recuperarSenha')}
              className="text-teal-600 hover:text-teal-700"
            >
              Esqueci minha senha
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Entrar
          </button>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-2">Primeiro acesso?</p>
            <button
              type="button"
              onClick={() => setTelaAtiva('cadastro')}
              className="text-teal-600 hover:text-teal-700"
            >
              Realizar Autocadastro
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-2">Demonstração - Senha padrão: <strong>1234</strong></p>
          <div className="grid grid-cols-1 gap-1">
            <p className="text-xs text-gray-700"><strong>Líder (João):</strong> joao.silva@discente.ufma.br</p>
            <p className="text-xs text-gray-700"><strong>Membro (Ana):</strong> ana.costa@discente.ufma.br</p>
            <p className="text-xs text-gray-700"><strong>Docente:</strong> carlos.oliveira@docente.ufma.br</p>
            <p className="text-xs text-gray-700"><strong>Coord:</strong> maria.santos@coordenador.ufma.br</p>
          </div>
        </div>
      </div>
    </div>
  );
}