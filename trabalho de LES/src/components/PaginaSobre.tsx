import { 
  AcademicCapIcon, 
  UsersIcon, 
  TrophyIcon, 
  ArrowTrendingUpIcon,
  BookOpenIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  CheckCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

interface PaginaSobreProps {
  onLoginClick?: () => void;
}

export function PaginaSobre({ onLoginClick }: PaginaSobreProps) {
  const estatisticas = [
    { label: 'Oportunidades Ativas', valor: '127', icon: BookOpenIcon, cor: 'teal' },
    { label: 'Participantes', valor: '2.847', icon: UsersIcon, cor: 'blue' },
    { label: 'Certificados Emitidos', valor: '1.932', icon: TrophyIcon, cor: 'green' },
    { label: 'Horas de Extensão', valor: '45.380', icon: ArrowTrendingUpIcon, cor: 'purple' },
  ];

  const funcionalidades = [
    {
      icon: UsersIcon,
      titulo: 'Gestão de Usuários',
      descricao: 'Sistema de cadastro e gerenciamento de perfis (Discente, Docente, Coordenador e Administrador).'
    },
    {
      icon: BookOpenIcon,
      titulo: 'Portal de Oportunidades',
      descricao: 'Catálogo de projetos, programas, eventos e grupos acadêmicos de extensão com sistema de inscrição online.'
    },
    {
      icon: CheckCircleIcon,
      titulo: 'Aprovação de Atividades',
      descricao: 'Fluxo de aprovação para oportunidades criadas por discentes e docentes, com prazos definidos.'
    },
    {
      icon: TrophyIcon,
      titulo: 'Certificação Digital',
      descricao: 'Emissão automática de certificados digitais com código único de validação e validação pública.'
    },
    {
      icon: ArrowTrendingUpIcon,
      titulo: 'Aproveitamento de Horas',
      descricao: 'Sistema para solicitar aproveitamento de atividades externas com análise da coordenação.'
    },
    {
      icon: ShieldCheckIcon,
      titulo: 'Segurança e Controle',
      descricao: 'Autenticação com email institucional, recuperação de senha e controle de permissões por perfil.'
    },
  ];

  const getCor = (cor: string) => {
    const cores: any = {
      teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    };
    return cores[cor] || cores.teal;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg p-8 md:p-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <AcademicCapIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-white mb-1">Sistema de Gestão de Extensão Universitária</h1>
              <p className="text-teal-100">
                Conectando a universidade à comunidade
              </p>
            </div>
          </div>
          
          <p className="text-teal-50 text-lg mt-6 leading-relaxed">
            Plataforma para gerenciar atividades de extensão universitária, promovendo a integração entre ensino, pesquisa e extensão.
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {estatisticas.map((stat, index) => {
          const Icon = stat.icon;
          const cor = getCor(stat.cor);
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${cor.bg} rounded-lg mb-3`}>
                <Icon className={`w-6 h-6 ${cor.text}`} />
              </div>
              <h3 className="text-gray-900 mb-1">{stat.valor}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Funcionalidades Principais */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-gray-900 mb-2">Funcionalidades do Sistema</h2>
          <p className="text-gray-600">
            Recursos disponíveis para gestão de atividades de extensão
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funcionalidades.map((func, index) => {
            const Icon = func.icon;
            
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-gray-900 mb-2">{func.titulo}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {func.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contato e Suporte */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-gray-900 mb-6 text-center">Contato e Suporte</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <EnvelopeIcon className="w-6 h-6 text-teal-600" />
            </div>
            <h4 className="text-gray-900 mb-1">E-mail</h4>
            <p className="text-gray-600 text-sm">extensao@instituicao.edu.br</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <PhoneIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-gray-900 mb-1">Telefone</h4>
            <p className="text-gray-600 text-sm">(00) 0000-0000</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MapPinIcon className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-gray-900 mb-1">Endereço</h4>
            <p className="text-gray-600 text-sm">Coordenação de Extensão - Campus Central</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-teal-50 rounded-lg text-center">
          <p className="text-teal-800">
            <strong>Horário de Atendimento:</strong> Segunda a Sexta, das 8h às 17h
          </p>
        </div>
      </div>
    </div>
  );
}