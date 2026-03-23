import { Metadata } from "next"
import {
  Building2,
  QrCode,
  ChefHat,
  LineChart,
  Users,
  ShieldCheck,
  Smartphone,
  Eye,
  Utensils,
  BedDouble,
  Waves,
  ClipboardList,
  CheckCircle2,
  Receipt,
  Timer,
  Bell,
  Lock,
  Layers,
  Settings,
  HeartHandshake,
  Zap,
  CreditCard,
  BarChart3,
  type LucideIcon,
  Percent,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Proposta Comercial — Pousada Rancho Fazendinha | Orderly",
  description:
    "Proposta exclusiva do sistema de gestão digital para a Pousada Rancho Fazendinha.",
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-slate-600 text-[15px]">
      <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 shrink-0 mt-[3px]" />
      <span>{children}</span>
    </li>
  )
}

function Feature({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="flex gap-3.5 py-3">
      <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-[15px] leading-snug">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

export default function PropostaPousadaPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-black text-slate-800">Orderly</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Proposta Exclusiva
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-14">
        {/* ── Resumo ── */}
        <section>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Proposta para a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Pousada Rancho Fazendinha
            </span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Sistema de gestão completo para o restaurante e pousada: cardápio digital via QR Code,
            comandas em tempo real, painel da cozinha, controle de quartos e mesas — tudo
            personalizado com a sua marca. O cliente acompanha a comanda pelo celular e o garçom
            registra pedidos com praticidade total.
          </p>
        </section>

        {/* ── Funcionalidades ── */}
        <section>
          <h2 className="text-xl font-black text-slate-900 mb-1">Funcionalidades</h2>
          <p className="text-sm text-slate-400 mb-4">Tudo que o sistema inclui para a sua operação.</p>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 divide-y divide-slate-100">
            <Feature
              icon={QrCode}
              title="Cardápio Digital via QR Code"
              desc="Cada mesa/quarto tem QR Code exclusivo. O cliente escaneia e pede pelo celular, sem instalar app."
            />
            <Feature
              icon={ClipboardList}
              title="Comandas Digitais em Tempo Real"
              desc="Pedidos registrados instantaneamente na comanda. Sem papel, sem erro, tudo rastreável."
            />
            <Feature
              icon={Percent}
              title="Cobrança de Taxa de Serviço do Garçom"
              desc="Opcional: Configure uma taxa de serviço percentual que será adicionada automaticamente ao valor total da comanda."
            />
            <Feature
              icon={Receipt}
              title="Fechamento de Conta Inteligente"
              desc="Relatório completo no fechamento: todos os itens, taxas e valor total, pronto para pagamento."
            />
            <Feature
              icon={Eye}
              title="Visibilidade para o Cliente"
              desc="O cliente acompanha a comanda em tempo real — vê o que pediu, o status e o valor total."
            />
            <Feature
              icon={Smartphone}
              title="Praticidade para Garçons"
              desc="O garçom lança pedidos pelo celular escolhendo a mesa ou comanda. Rápido e sem anotações manuais."
            />
            
            <Feature
              icon={Utensils}
              title="Gestão Separada do Restaurante"
              desc="Controle independente do restaurante — mesas, comandas e pedidos separados da operação da pousada."
            />
            <Feature
              icon={BedDouble}
              title="Controle de Quartos"
              desc="Gerencie ocupação, status e QR Codes por quarto. Pedidos do quarto vão para a comanda do hóspede."
            />
            <Feature
              icon={Lock}
              title="Segurança com PIN de Acesso"
              desc="Cada comanda tem PIN exclusivo gerado no check-in. Ex-hóspedes não acessam comandas de novos clientes."
            />
            <Feature
              icon={Waves}
              title="Pedidos de Qualquer Lugar"
              desc="Restaurante, piscina ou área de lazer — o garçom registra na comanda do cliente de qualquer lugar."
            />
            <Feature
              icon={Layers}
              title="Comandas Avulsas & DayUse"
              desc="Atenda clientes que não estão hospedados. Abra uma comanda avulsa com nome e PIN, simples assim."
            />
            <Feature
              icon={Settings}
              title="Gestão de Produtos e Categorias"
              desc="Crie, edite, ative ou desative itens do cardápio. Organize por categorias com ordem personalizada."
            />
            <Feature
              icon={BarChart3}
              title="Relatórios e Dashboard"
              desc="Faturamento, itens mais vendidos, ticket médio, mesas abertas — tudo em um painel visual e em tempo real."
            />
            <Feature
              icon={Bell}
              title="Atualização em Tempo Real"
              desc="Pedidos aparecem instantaneamente na cozinha e no painel. Tecnologia de atualização em menos de 1 segundo."
            />
            <Feature
              icon={Timer}
              title="Controle de Tempo de Preparo"
              desc="Saiba o tempo médio entre pedido e entrega. Identifique gargalos e otimize a operação."
            />
          </div>
        </section>

        {/* ── Suporte ── */}
        <section>
          <h2 className="text-xl font-black text-slate-900 mb-1">Suporte & Acompanhamento</h2>
          <p className="text-sm text-slate-400 mb-4">O que está incluso na implantação e na mensalidade.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Na Implantação
              </h3>
              <ul className="space-y-2.5">
                <Check>Finalização completa do sistema</Check>
                <Check>Suporte no cadastro de produtos, categorias, quartos e mesas</Check>
                <Check>Geração dos QR Codes</Check>
                <Check>Criação da conta (Dashboard)</Check>
                <Check>Treinamento para equipe</Check>
                <Check><strong>1 mês de acompanhamento intenso</strong></Check>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-primary" /> Na Mensalidade
              </h3>
              <ul className="space-y-2.5">
                <Check>Sistema online funcionando 99.9% do tempo</Check>
                <Check>Hospedagem e infraestrutura inclusa</Check>
                <Check>Manutenção e atualizações contínuas</Check>
                <Check>Correções de bugs</Check>
                <Check><strong>2 horas/mês de suporte</strong> para suporte e dúvidas</Check>
                <Check>Melhorias e ajustes menores inclusos</Check>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Preços ── */}
        <section>
          <h2 className="text-xl font-black text-slate-900 mb-1">Investimento</h2>
          <p className="text-sm text-slate-400 mb-4">Escolha a forma de pagamento da implantação.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {/* À vista */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 relative">
              <span className="absolute -top-3 left-5 text-[10px] font-black uppercase tracking-widest text-white bg-emerald-500 px-3 py-1 rounded-full">
                Melhor preço
              </span>
              <p className="text-sm font-semibold text-slate-500 mb-1">À vista</p>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-black text-slate-900">R$3.500</span>
              </div>
              <p className="text-sm text-slate-500">Pagamento único</p>
            </div>

            {/* Parcelado */}
            <div className="bg-slate-900 rounded-2xl p-6 relative">
              <span className="absolute -top-3 left-5 text-[10px] font-black uppercase tracking-widest text-white bg-primary px-3 py-1 rounded-full">
                Parcelado
              </span>
              <p className="text-sm font-semibold text-slate-400 mb-1">Em 6x</p>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-black text-white">R$4.800</span>
              </div>
              <p className="text-sm text-slate-400">6x de R$800,00</p>
            </div>
          </div>

          {/* Mensalidade */}
          <div className="bg-gradient-to-r from-primary to-blue-500 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-100">Mensalidade após implantação</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">R$149</span>
                <span className="text-blue-200 font-bold text-sm">/mês</span>
              </div>
            </div>
            <p className="text-sm text-blue-100 max-w-xs leading-relaxed">
              Inclui sistema online 99.9%, manutenção, atualizações e <strong>2h de suporte/mês</strong> para bugs e dúvidas.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-6 text-center">
        <p className="text-slate-400 text-xs font-medium">
          © 2026 Orderly · Proposta exclusiva para Pousada Rancho Fazendinha
        </p>
      </footer>
    </div>
  )
}
