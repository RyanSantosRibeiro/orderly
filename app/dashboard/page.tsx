import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Utensils, 
  Clock, 
  CreditCard,
  User,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  Star
} from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Estatísticas Mock para o Dashboard do Restaurante
  const stats = [
    {
      title: "Faturamento do Dia",
      value: "R$ 4.850,00",
      description: "+12.5% vs ontem",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Pedidos Realizados",
      value: "142",
      description: "+8% vs ontem",
      icon: Utensils,
      trend: "up"
    },
    {
      title: "Ticket Médio",
      value: "R$ 82,90",
      description: "+2.1% vs ontem",
      icon: CreditCard,
      trend: "up"
    },
    {
      title: "Tempo Médio (Preparo)",
      value: "18 min",
      description: "-4 min (Mais rápido)",
      icon: Clock,
      trend: "down" // down is good for time
    }
  ]

  const topProducts = [
    { name: "Camarão em Crosta", qty: 45, revenue: 5355.00, img: "🦐" },
    { name: "Meio Camarão Jurerê", qty: 38, revenue: 3796.20, img: "🍤" },
    { name: "Cerveja Pilsen", qty: 112, revenue: 1344.00, img: "🍺" },
    { name: "Suco Natural", qty: 42, revenue: 420.00, img: "🍹" },
    { name: "Petit Gateau", qty: 18, revenue: 504.00, img: "🍫" },
  ]

  const recentOrders = [
    { id: "ORD-0142", mesa: "04", time: "Há 2 min", value: 189.90, status: "Finalizado" },
    { id: "ORD-0141", mesa: "12", time: "Há 15 min", value: 450.00, status: "Em Preparo" },
    { id: "ORD-0140", mesa: "Balcão", time: "Há 28 min", value: 35.00, status: "Finalizado" },
    { id: "ORD-0139", mesa: "08", time: "Há 42 min", value: 110.50, status: "Cancelado" },
  ]

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Visão Geral</h1>
           <p className="text-muted-foreground mt-1 text-sm">Acompanhe o desempenho do seu restaurante em tempo real.</p>
        </div>
        <Badge variant="outline" className="w-fit bg-emerald-50 text-emerald-600 border-emerald-200 px-3 py-1 font-semibold shadow-sm">
           <Activity className="w-4 h-4 mr-2 animate-pulse" /> Ao Vivo
        </Badge>
      </div>

      {/* Cards de Métricas (Top 4) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          const isUp = stat.trend === "up"
          
          return (
            <Card key={i} className="shadow-sm border-slate-200 bg-white group hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-slate-500">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${isUp ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                   <Icon className={`h-4 w-4 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800 tracking-tight">{stat.value}</div>
                <div className="flex items-center mt-2.5 text-xs font-medium">
                  {isUp ? (
                    <ArrowUpRight className="w-3 h-3 mr-1 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1 text-emerald-500" /> // Seta pra baixo tb verde no cenario do tempo
                  )}
                  <span className={isUp ? "text-emerald-600" : "text-emerald-600"}>
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        
        {/* Gráfico de Faturamento por Hora (Simulado via CSS) */}
        <Card className="shadow-sm border-slate-200 lg:col-span-4 flex flex-col">
          <CardHeader>
             <CardTitle className="text-xl">Faturamento Diário</CardTitle>
             <CardDescription>Pico de vendas das últimas 12 horas</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end min-h-[250px] relative">
             <div className="absolute inset-x-6 inset-y-0 border-b border-l border-slate-100 flex items-end justify-between px-2 pb-2">
                {/* Simulated Bar Chart */}
                {[20, 35, 25, 60, 85, 100, 75, 40, 25, 45, 90, 75].map((h, idx) => (
                   <div key={idx} className="w-1/12 mx-1 flex flex-col justify-end items-center h-[90%] group">
                      <div 
                         className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary/50 transition-colors relative"
                         style={{ height: `${h}%` }}
                      >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}%
                         </div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 font-mono">{idx + 10}h</span>
                   </div>
                ))}
             </div>
          </CardContent>
        </Card>

        {/* Produtos Mais Pedidos */}
        <Card className="shadow-sm border-slate-200 lg:col-span-3 flex flex-col">
          <CardHeader>
             <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-xl">TOP 5 Produtos</CardTitle>
                   <CardDescription>Itens com maior faturamento hoje</CardDescription>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                   <Star className="w-4 h-4" />
                </div>
             </div>
          </CardHeader>
          <CardContent className="flex-1">
             <div className="space-y-4 pt-2">
                {topProducts.map((p, i) => (
                   <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shadow-sm">
                            {p.img}
                         </div>
                         <div>
                            <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{p.qty} pedidos</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-bold text-slate-900">{formatPrice(p.revenue)}</p>
                      </div>
                   </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Pedidos Recentes */}
      <Card className="shadow-sm border-slate-200">
         <CardHeader>
            <CardTitle className="text-xl">Pedidos Recentes</CardTitle>
            <CardDescription>Fluxo de saída das mesas e balcão.</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="rounded-md border border-slate-100 overflow-hidden">
               <table className="w-full text-sm text-left align-middle">
                 <thead className="bg-slate-50 text-slate-500">
                   <tr>
                     <th className="h-10 px-4 font-semibold text-[13px] uppercase tracking-wider">Mesa/Comanda</th>
                     <th className="h-10 px-4 font-semibold text-[13px] uppercase tracking-wider">Pedido</th>
                     <th className="h-10 px-4 font-semibold text-[13px] uppercase tracking-wider">Tempo</th>
                     <th className="h-10 px-4 font-semibold text-[13px] uppercase tracking-wider">Valor Total</th>
                     <th className="h-10 px-4 font-semibold text-[13px] uppercase tracking-wider text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {recentOrders.map((order, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                         <td className="px-4 py-3 font-semibold text-slate-900">
                            {order.mesa === "Balcão" ? "Balcão" : `Mesa ${order.mesa}`}
                         </td>
                         <td className="px-4 py-3 text-slate-500 font-mono text-xs">{order.id}</td>
                         <td className="px-4 py-3 text-slate-500 flex items-center gap-1.5"><Clock className="w-3 h-3" /> {order.time}</td>
                         <td className="px-4 py-3 font-semibold text-slate-800">{formatPrice(order.value)}</td>
                         <td className="px-4 py-3 text-right">
                            <Badge 
                               variant="outline"
                               className={
                                 order.status === "Finalizado" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                                 order.status === "Em Preparo" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                 "bg-rose-50 text-rose-600 border-rose-200"
                               }
                            >
                               {order.status}
                            </Badge>
                         </td>
                      </tr>
                   ))}
                 </tbody>
               </table>
            </div>
         </CardContent>
      </Card>
    </div>
  )
}
