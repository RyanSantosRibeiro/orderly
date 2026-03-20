import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Store, 
  SmartphoneNfc, 
  ChefHat, 
  LineChart, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Smartphone,
  CreditCard,
  QrCode
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth selection:bg-primary/20 selection:text-primary">
      
      {/* NavBar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold">
               <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800">Orderly</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
            <a href="#funcionalidades" className="hover:text-primary transition-colors">Funcionalidades</a>
            <a href="#beneficios" className="hover:text-primary transition-colors">Benefícios</a>
            <a href="#planos" className="hover:text-primary transition-colors">Planos</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
              Entrar
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 rounded-full">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            Lançamento: Plataforma v2.0
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 max-w-4xl mx-auto leading-[1.1]">
            O jeito mais <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">inteligente</span> de fazer o pedido
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Revolucione o atendimento do seu restaurante com comandas digitais via QR Code. O cliente pede da mesa, o garçom gerencia e o pagamento é descomplicado.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button className="h-14 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 group w-full sm:w-auto">
                Testar Gratuitamente 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#funcionalidades">
              <Button variant="outline" className="h-14 px-8 text-base font-bold text-slate-600 border-slate-200 bg-white hover:bg-slate-50 rounded-full w-full sm:w-auto">
                Ver como funciona
              </Button>
            </Link>
          </div>
        </div>

        {/* Mockup Preview Area */}
        <div className="mt-20 max-w-5xl mx-auto px-6 relative z-10">
           <div className="w-full h-auto aspect-video bg-white/50 backdrop-blur-3xl rounded-[2rem] border-8 border-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex items-center justify-center p-8 relative">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-100 to-transparent pointer-events-none" />
              
              <div className="w-full max-w-3xl flex gap-8 items-end justify-center">
                 {/* Mobile Mockup */}
                 <div className="w-64 h-[450px] bg-white rounded-[2.5rem] shadow-2xl border-8 border-slate-900 overflow-hidden relative transform -rotate-6 z-20">
                    <div className="w-full h-32 bg-amber-500 rounded-t-2xl" />
                    <div className="px-4 -mt-10">
                       <div className="w-16 h-16 bg-slate-900 rounded-xl mb-4 shadow border-4 border-white" />
                       <div className="w-32 h-4 bg-slate-200 rounded-full mb-2" />
                       <div className="w-24 h-3 bg-slate-100 rounded-full mb-6" />
                       <div className="flex gap-2 mb-4">
                          <div className="w-16 h-6 bg-primary/20 rounded-full" />
                          <div className="w-14 h-6 bg-slate-100 rounded-full" />
                       </div>
                       <div className="w-full h-24 bg-slate-50 rounded-xl mb-3 flex p-2 gap-3">
                          <div className="w-16 h-full bg-slate-200 rounded-lg" />
                          <div className="flex-1 space-y-2 py-1">
                             <div className="w-20 h-2 bg-slate-200 rounded" />
                             <div className="w-12 h-2 bg-primary/40 rounded" />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Desktop Mockup */}
                 <div className="w-[600px] h-[350px] bg-slate-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex z-10 transform translate-x-12 translate-y-8">
                    {/* Sidebar */}
                    <div className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-4">
                       <div className="w-8 h-8 bg-primary rounded-lg" />
                       <div className="w-8 h-8 bg-slate-100 rounded-lg mt-4" />
                       <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                    </div>
                    {/* Main */}
                    <div className="flex-1 p-6 space-y-4">
                       <div className="flex gap-4">
                         <div className="w-32 h-20 bg-emerald-50 rounded-xl border border-emerald-100" />
                         <div className="w-32 h-20 bg-rose-50 rounded-xl border border-rose-100" />
                         <div className="w-32 h-20 bg-blue-50 rounded-xl border border-blue-100" />
                       </div>
                       <div className="w-full h-40 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                          <div className="w-full h-6 bg-slate-50 rounded mb-2" />
                          <div className="w-full h-6 bg-slate-50 rounded mb-2" />
                          <div className="w-full h-6 bg-slate-50 rounded" />
                       </div>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* Logos/Trust Section */}
      <section className="py-10 border-y border-slate-100 bg-white">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Aprovado por quem inova na gastronomia</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale">
               <div className="text-xl font-bold font-serif flex items-center gap-2"><Store/> Bistrô Paris</div>
               <div className="text-xl font-black flex items-center gap-2"><ChefHat/> O Mestre Burguer</div>
               <div className="text-xl font-bold tracking-widest flex items-center gap-2"><SmartphoneNfc/> SushiFast</div>
               <div className="text-xl font-black italic flex items-center gap-2">Pizzaria Napolitana</div>
            </div>
         </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Tudo que o seu negócio precisa em uma única plataforma</h2>
            <p className="mt-4 text-slate-500 font-medium text-lg">
               Elimine gargalos, reduza custos com equipamentos obsoletos e dê aos seus clientes controle total sobre os pedidos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feat 1 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <QrCode className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Menu 100% Digital</h3>
               <p className="text-slate-500 font-medium leading-relaxed">
                  Gere um QR Code exclusivo para cada mesa. Seus clientes pedem sozinhos pelo celular sem a necessidade de baixar nenhum app.
               </p>
            </div>

            {/* Feat 2 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <ChefHat className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Comunicação c/ Cozinha</h3>
               <p className="text-slate-500 font-medium leading-relaxed">
                  Nada de papel impresso. Pedidos vão instantaneamente do app do cliente ou garçom direto para a tela de preparo (Cozinha/KDS).
               </p>
            </div>

            {/* Feat 3 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <LineChart className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Dashboards Inteligentes</h3>
               <p className="text-slate-500 font-medium leading-relaxed">
                  Informação é poder! Acompanhe o tempo de atendimento por mesa, os pratos mais vendidos, ticket médio e tome decisões estratégicas.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios e Comparativo */}
      <section id="beneficios" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
           <div>
              <Badge className="bg-rose-50 text-rose-600 border-none font-bold uppercase tracking-widest px-4 py-1.5 mb-6">
                Reduza Erros em 99%
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                 Diga adeus as anotações e à confusão
              </h2>
              <p className="text-lg text-slate-500 font-medium mb-8 leading-relaxed">
                 Com Orderly, o pedido não sofre interpretações erradas de papel anotado. Todas as especificações e remoção de ingredientes são processadas digitalmente e você pode desfrutar de toda agilidade.
              </p>
              
              <ul className="space-y-4">
                 <li className="flex items-center gap-3 font-semibold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="w-4 h-4" />
                    </div>
                    Maior volume de mesas atendidas com a mesma equipe.
                 </li>
                 <li className="flex items-center gap-3 font-semibold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="w-4 h-4" />
                    </div>
                    Sistema Multi-Usuário (Admins, Garçons e Gerentes).
                 </li>
                 <li className="flex items-center gap-3 font-semibold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="w-4 h-4" />
                    </div>
                    Checkout (pagamento) através do smartphone.
                 </li>
              </ul>
           </div>
           
           <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform rotate-3" />
              <div className="relative bg-white rounded-[3rem] border border-slate-100 shadow-xl p-10 flex flex-col gap-6">
                 
                 <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-rose-500">
                       <Zap className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900">Velocidade no Atendimento</h4>
                       <p className="text-sm font-medium text-slate-500">De 12 minutos para 2 minutos.</p>
                    </div>
                 </div>

                 <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500">
                       <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900">Pagamento Flexível</h4>
                       <p className="text-sm font-medium text-slate-500">Nativo com PIX, Ticket, Cartão de Crédito.</p>
                    </div>
                 </div>

                 <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500">
                       <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900">White-label UI</h4>
                       <p className="text-sm font-medium text-slate-500">Seu menu, com Suas cores e Sua marca.</p>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </section>

      {/* Pricing / Planos */}
      <section id="planos" className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Planos transparentes e que crescem junto com você</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               
               {/* Grátis */}
               <div className="bg-white rounded-[2rem] p-10 border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
                  <h3 className="text-2xl font-black text-slate-900">Iniciante</h3>
                  <p className="text-slate-500 font-medium mt-2">Perfeito para carrinhos, food trucks e barzinhos que estão começando a lucrar.</p>
                  
                  <div className="my-8 flex items-baseline gap-2">
                     <span className="text-5xl font-black tracking-tighter text-slate-900">R$0</span>
                     <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">/ mês</span>
                  </div>

                  <ul className="space-y-4 font-medium text-slate-600 flex-1">
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0"/>Até 10 mesas simultâneas</li>
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0"/>Cardápio com 50 Produtos</li>
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0"/>1 Garçom</li>
                  </ul>

                  <Button className="mt-8 w-full h-12 rounded-xl font-bold bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-none border-none">
                     Começar Rápido
                  </Button>
               </div>

               {/* Pro (Destaque) */}
               <div className="bg-slate-900 rounded-[2rem] p-10 border border-slate-800 shadow-2xl shadow-primary/20 flex flex-col relative transform md:-translate-y-4">
                  <div className="absolute top-0 right-10 transform -translate-y-1/2">
                     <Badge className="bg-primary text-white border-none shadow-sm px-4 py-1.5 uppercase font-black tracking-widest text-[10px]">Mais Popular</Badge>
                  </div>
                  <h3 className="text-2xl font-black text-white">Premium</h3>
                  <p className="text-slate-300 font-medium mt-2">Para salões complexos que não podem parar de gerar alto faturamento.</p>
                  
                  <div className="my-8 flex items-baseline gap-2 text-white">
                     <span className="text-5xl font-black tracking-tighter text-white">R$ 149</span>
                     <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">/ mês</span>
                  </div>

                  <ul className="space-y-4 font-medium text-slate-200 flex-1">
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>Mesas ilimitadas</li>
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>Produtos ilimitados e Variáveis</li>
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>Relatórios Avançados (Tempo de preparo etc)</li>
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>Sem limites de Contas de Garçons</li>
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>Acesso nativo a Cozinha (Display KDS)</li>
                  </ul>

                  <Button className="mt-8 w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
                     Assinar Planos Pro
                  </Button>
               </div>

            </div>
         </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden bg-primary">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
               Pronto para automatizar suas vendas?
            </h2>
            <Link href="/auth/signup">
              <Button className="h-14 px-10 text-lg font-bold bg-white text-black hover:bg-slate-100 rounded-full shadow-2xl transition-all hover:scale-105">
                 Criar Conta Agora
              </Button>
            </Link>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100 text-center">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center gap-2 mb-6 grayscale opacity-80">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold">
                 <Building2 className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800">Orderly</span>
            </div>
            <p className="text-slate-500 font-medium text-sm">
               © 2026 Orderly Tecnologias. Aumentando o faturamento do Food Service.
            </p>
         </div>
      </footer>

    </div>
  )
}
