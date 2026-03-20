"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  CheckCircle2,
  XCircle,
  ChefHat,
  Search,
  MoreHorizontal,
  ThumbsUp,
} from "lucide-react"
import { Input } from "@/components/ui/input"

type OrderStatus = "pendente" | "aceito" | "finalizado" | "cancelado"

interface OrderItem {
  name: string
  quantity: number
  notes?: string
}

interface Order {
  id: string
  mesa: string | null
  status: OrderStatus
  origin: "cliente" | "garçom"
  total: number
  createdAt: string
  items: OrderItem[]
}

const mockOrders: Order[] = [
  {
    id: "ORD-0012",
    mesa: "Mesa 04",
    status: "pendente",
    origin: "cliente",
    total: 89.9,
    createdAt: "19:42",
    items: [
      { name: "Hambúrguer Artesanal", quantity: 2, notes: "Sem cebola" },
      { name: "Batata Frita G", quantity: 1 },
      { name: "Refrigerante 2L", quantity: 1 },
    ],
  },
  {
    id: "ORD-0013",
    mesa: "Mesa 12",
    status: "aceito",
    origin: "garçom",
    total: 145.5,
    createdAt: "19:35",
    items: [
      { name: "Pizza Calabresa (M)", quantity: 1 },
      { name: "Cerveja Artesanal IPA", quantity: 4 },
    ],
  },
  {
    id: "ORD-0010",
    mesa: "Mesa 02",
    status: "aceito",
    origin: "cliente",
    total: 45.0,
    createdAt: "19:28",
    items: [
      { name: "Sorvete de Baunilha", quantity: 2 },
      { name: "Água com Gás", quantity: 2 },
    ],
  },
  {
    id: "ORD-0008",
    mesa: "Balcão",
    status: "finalizado",
    origin: "garçom",
    total: 220.0,
    createdAt: "18:45",
    items: [
      { name: "Combo Família Especial", quantity: 1 },
      { name: "Suco Natural de Laranja", quantity: 3 },
    ],
  },
  {
    id: "ORD-0005",
    mesa: "Mesa 08",
    status: "cancelado",
    origin: "cliente",
    total: 35.0,
    createdAt: "18:10",
    items: [
      { name: "Porção de Cebola Empanada", quantity: 1 },
    ],
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pendente":
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white"><Clock className="w-3 h-3 mr-1" /> Pendente</Badge>
      case "aceito":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white"><ChefHat className="w-3 h-3 mr-1" /> Em Preparo</Badge>
      case "finalizado":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white"><CheckCircle2 className="w-3 h-3 mr-1" /> Finalizado</Badge>
      case "cancelado":
        return <Badge className="bg-rose-500 hover:bg-rose-600 text-white"><XCircle className="w-3 h-3 mr-1" /> Cancelado</Badge>
    }
  }

  const getOriginBadge = (origin: string) => {
    return origin === "cliente" ? (
      <Badge variant="outline" className="text-zinc-500 border-zinc-200">QR Code</Badge>
    ) : (
      <Badge variant="secondary" className="bg-slate-100 text-slate-600">Garçom</Badge>
    )
  }

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    )
  }

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.mesa && o.mesa.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const pendingOrders = filteredOrders.filter((o) => o.status === "pendente")
  const activeOrders = filteredOrders.filter((o) => o.status === "aceito")
  const historyOrders = filteredOrders.filter(
    (o) => o.status === "finalizado" || o.status === "cancelado"
  )

  const renderTable = (orderList: Order[], isActionable: boolean = true) => (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
            <TableHead className="w-[100px] font-semibold text-muted-foreground">Pedido</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Mesa/Local</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Itens & Observações</TableHead>
            <TableHead className="hidden md:table-cell font-semibold text-muted-foreground">Origem</TableHead>
            <TableHead className="hidden md:table-cell font-semibold text-muted-foreground">Horário</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                Nenhum pedido encontrado.
              </TableCell>
            </TableRow>
          ) : (
            orderList.map((order) => (
              <TableRow key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <span className="font-medium text-slate-900">{order.mesa || "Avulso"}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 max-w-[300px]">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="font-semibold text-primary">{item.quantity}x</span> {item.name}
                        {item.notes && (
                          <p className="text-xs text-rose-500 font-medium ml-4 mt-0.5">
                            * Obs: {item.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {getOriginBadge(order.origin)}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {order.createdAt}
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  {isActionable && order.status === "pendente" && (
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                        onClick={() => handleUpdateStatus(order.id, "aceito")}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Aceitar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                        onClick={() => handleUpdateStatus(order.id, "cancelado")}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  {isActionable && order.status === "aceito" && (
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
                        onClick={() => handleUpdateStatus(order.id, "finalizado")}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Finalizar
                      </Button>
                    </div>
                  )}
                  {!isActionable && (
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Gestão de Pedidos</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Gerencie e acompanhe os pedidos das mesas em tempo real.
          </p>
        </div>
        
        <div className="flex items-center gap-2 relative">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
          <Input
            placeholder="Buscar pedido ou mesa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-[280px] shadow-sm bg-card"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-[4px] border-l-amber-500 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos (Pendentes)</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">{pendingOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando aprovação</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-[4px] border-l-blue-500 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Preparo</CardTitle>
            <ChefHat className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{activeOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Sendo preparados na cozinha</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-[4px] border-l-emerald-500 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finalizados (Hoje)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">
              {filteredOrders.filter(o => o.status === "finalizado").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Pedidos concluídos com sucesso</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pendentes" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="pendentes" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            Pendentes
            {pendingOrders.length > 0 && (
              <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {pendingOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="preparo" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            Em Preparo
            {activeOrders.length > 0 && (
              <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {activeOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="historico" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="animate-in fade-in duration-300">
          <Card className="shadow-sm border-0 ring-1 ring-border/50">
            {renderTable(pendingOrders, true)}
          </Card>
        </TabsContent>

        <TabsContent value="preparo" className="animate-in fade-in duration-300">
          <Card className="shadow-sm border-0 ring-1 ring-border/50">
            {renderTable(activeOrders, true)}
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="animate-in fade-in duration-300">
          <Card className="shadow-sm border-0 ring-1 ring-border/50">
            {renderTable(historyOrders, false)}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
