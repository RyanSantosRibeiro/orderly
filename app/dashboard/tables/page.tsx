"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  SearchIcon,
  QrCode,
  Users,
  Coffee,
  MoreHorizontal,
  RefreshCcw,
  Receipt,
  LogOut,
  Bed,
  History,
  Printer,
  Key,
  Calendar,
  Lock,
  ArrowRight,
  ChevronRight
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

type RoomStatus = "livre" | "ocupado" | "manutencao"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Comanda {
  id: string
  accessPin: string
  checkInDate: string
  currentAmount: number
  orders: OrderItem[]
  lastOrder?: string
  lastOrderTime?: string
}

interface CustomRoom {
  id: string
  number: string
  status: RoomStatus
  capacity?: number
  activeComanda?: Comanda | null
}

const generatePin = () => Math.floor(1000 + Math.random() * 9000).toString()

const mockRooms: CustomRoom[] = [
  { id: "rm_1", number: "101", status: "livre", capacity: 2, activeComanda: null },
  { 
    id: "rm_2", 
    number: "102", 
    status: "ocupado", 
    capacity: 2, 
    activeComanda: {
      id: "cmd_123",
      accessPin: "4821",
      checkInDate: "18/03/2026",
      currentAmount: 145.50,
      lastOrder: "2x Chopp Pilsen, 1x Porção de Fritas",
      lastOrderTime: "agora",
      orders: [
        { id: "p1", name: "Chopp Pilsen 500ml", price: 15.00, quantity: 4 },
        { id: "p2", name: "Porção de Fritas G", price: 45.50, quantity: 1 },
        { id: "p3", name: "Água mineral", price: 8.00, quantity: 5 },
      ]
    }
  },
  { id: "rm_103", number: "103", status: "manutencao", capacity: 3, activeComanda: null },
  { 
    id: "rm_4", 
    number: "104", 
    status: "ocupado", 
    capacity: 4, 
    activeComanda: {
      id: "cmd_124",
      accessPin: "9930",
      checkInDate: "17/03/2026",
      currentAmount: 320.00,
      lastOrder: "1x Picanha na Chapa, 4x Refri",
      lastOrderTime: "há 15m",
      orders: [
        { id: "p4", name: "Picanha na Chapa", price: 180.00, quantity: 1 },
        { id: "p5", name: "Refrigerante Lata", price: 8.00, quantity: 4 },
        { id: "p6", name: "Sobremesa Petit Gateau", price: 28.00, quantity: 2 },
        { id: "p7", name: "Vinho Tinto", price: 52.00, quantity: 1 },
      ]
    }
  },
  { id: "rm_5", number: "105", status: "livre", capacity: 4, activeComanda: null },
  { id: "rm_201", number: "201", status: "livre", capacity: 2, activeComanda: null },
  { 
    id: "rm_202", 
    number: "202", 
    status: "ocupado", 
    capacity: 2, 
    activeComanda: {
      id: "cmd_125",
      accessPin: "1055",
      checkInDate: "19/03/2026",
      currentAmount: 45.90,
      lastOrder: "1x Água c/ Gás, 1x Café",
      lastOrderTime: "há 45m",
      orders: [
        { id: "p8", name: "Café Expresso", price: 7.00, quantity: 2 },
        { id: "p9", name: "Água c/ Gás", price: 6.00, quantity: 1 },
        { id: "p10", name: "Sanduíche Natural", price: 25.90, quantity: 1 },
      ]
    }
  },
  // Adding more mock rooms to demonstrate the grid
  ...Array.from({ length: 24 }).map((_, i) => ({
    id: `rm_auto_${i}`,
    number: (203 + i).toString(),
    status: (i % 5 === 0 ? "manutencao" : "livre") as RoomStatus,
    capacity: 2,
    activeComanda: null
  }))
]

export default function RoomsPage() {
  const [rooms, setRooms] = useState<CustomRoom[]>(mockRooms)
  const [searchTerm, setSearchTerm] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<CustomRoom | null>(null)
  
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [selectedQrRoom, setSelectedQrRoom] = useState<CustomRoom | null>(null)

  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false)
  const [selectedCloseRoom, setSelectedCloseRoom] = useState<CustomRoom | null>(null)

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedDetailRoom, setSelectedDetailRoom] = useState<CustomRoom | null>(null)

  const [tempNum, setTempNum] = useState("")
  const [tempStatus, setTempStatus] = useState<RoomStatus>("livre")
  const [tempCap, setTempCap] = useState("2")

  const filteredRooms = rooms.filter((r) =>
    r.number.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenDetail = (room: CustomRoom) => {
    setSelectedDetailRoom(room)
    setIsDetailModalOpen(true)
  }

  const handleOpenModal = (room?: CustomRoom) => {
    if (room) {
      setEditingRoom(room)
      setTempNum(room.number)
      setTempStatus(room.status)
      setTempCap(room.capacity?.toString() || "2")
    } else {
      setEditingRoom(null)
      const lastNum = rooms.filter(r => !isNaN(Number(r.number))).sort((a,b) => Number(b.number) - Number(a.number))[0]?.number
      const nextNum = lastNum ? (Number(lastNum) + 1).toString().padStart(3, "0") : "101"
      
      setTempNum(nextNum)
      setTempStatus("livre")
      setTempCap("2")
    }
    setIsModalOpen(true)
  }

  const handleOpenQr = (room: CustomRoom) => {
    setSelectedQrRoom(room)
    setIsQrModalOpen(true)
  }

  const handleOpenCloseAccount = (room: CustomRoom) => {
    setIsDetailModalOpen(false) // Close detail if adding from there
    setSelectedCloseRoom(room)
    setIsCloseModalOpen(true)
  }

  const handleSave = () => {
    if (editingRoom) {
      setRooms(prev => prev.map(r => r.id === editingRoom.id ? { 
        ...r, 
        number: tempNum, 
        status: tempStatus, 
        capacity: Number(tempCap) 
      } : r))
    } else {
      const newRoom: CustomRoom = {
        id: `rm_${Date.now()}`,
        number: tempNum,
        status: tempStatus,
        capacity: Number(tempCap),
        activeComanda: null
      }
      setRooms([...rooms, newRoom])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este quarto permanentemente?")) {
      setRooms(prev => prev.filter(r => r.id !== id))
      setIsDetailModalOpen(false)
    }
  }

  const changeStatus = (id: string, newStatus: RoomStatus) => {
    setRooms(prev => prev.map(r => {
      if (r.id === id) {
        let updatedRoom = { ...r, status: newStatus }
        if (newStatus === "ocupado" && r.status !== "ocupado") {
          updatedRoom = { 
            ...updatedRoom, 
            activeComanda: {
              id: `cmd_${Date.now()}`,
              accessPin: generatePin(),
              checkInDate: new Date().toLocaleDateString('pt-BR'),
              currentAmount: 0,
              orders: []
            }
          }
        } else if (newStatus === "livre") {
          updatedRoom = { ...updatedRoom, activeComanda: null }
        }

        // Update selected detail room if it's the one being changed
        if (selectedDetailRoom?.id === id) {
          setSelectedDetailRoom(updatedRoom)
        }
        return updatedRoom
      }
      return r
    }))
  }

  const finalizeAccount = () => {
    if (selectedCloseRoom) {
      changeStatus(selectedCloseRoom.id, "livre")
      setIsCloseModalOpen(false)
    }
  }

  const getStatusCompactClass = (status: RoomStatus) => {
    switch (status) {
      case "livre": return "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
      case "ocupado": return "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20"
      case "manutencao": return "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
    }
  }

  const calculateFees = (amount: number) => {
    const serviceFee = amount * 0.10; // 10%
    const tourismFee = 5.00; // Taxa fixa exemplo
    const total = amount + serviceFee + tourismFee;
    return { serviceFee, tourismFee, total };
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Bed className="w-8 h-8 text-primary" />
            Quadro de Ocupação
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Visualize o panorama geral dos quartos. Clique para gerenciar detalhes e comandas.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Ex: 101..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[180px] shadow-sm bg-white border-slate-200"
            />
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white shadow-sm font-semibold"
            onClick={() => handleOpenModal()}
          >
            <Plus className="w-4 h-4 mr-2" /> Novo Quarto
          </Button>
        </div>
      </div>

      {/* Grid de Quartos Compacto */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 pb-8">
         {filteredRooms.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 bg-white border border-slate-200 rounded-lg border-dashed">
               <Coffee className="w-12 h-12 mx-auto text-slate-300 mb-4" />
               Nenhum quarto encontrado.
            </div>
         ) : (
            filteredRooms.map(room => (
               <Card 
                  key={room.id} 
                  onClick={() => handleOpenDetail(room)}
                  className={`cursor-pointer h-24 flex flex-col items-center justify-center p-2 rounded-xl transition-all hover:scale-105 active:scale-95 border-none text-white shadow-lg ${getStatusCompactClass(room.status)}`}
               >
                  <span className="text-2xl font-black tracking-tighter leading-none">{room.number}</span>
                  {room.status === "ocupado" && room.activeComanda && (
                     <span className="text-[10px] font-bold mt-1.5 px-2 py-0.5 bg-black/20 rounded-full">
                        {new Intl.NumberFormat('pt-BR', { notation: 'compact', style: 'currency', currency: 'BRL' }).format(room.activeComanda.currentAmount)}
                     </span>
                  )}
                  {room.status === "manutencao" && (
                     <RefreshCcw className="w-3 h-3 mt-1.5 opacity-50 animate-spin-slow" />
                  )}
                  {room.status === "livre" && (
                    <span className="text-[9px] uppercase font-bold mt-1.5 opacity-50 tracking-widest">Livre</span>
                  )}
               </Card>
            ))
         )}
      </div>

      {/* Modal de Detalhes do Quarto (Action Sheet) */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden border-none shadow-2xl">
          {selectedDetailRoom && (
            <>
              <div className={`p-8 text-white relative ${
                selectedDetailRoom.status === 'livre' ? 'bg-emerald-500' : 
                selectedDetailRoom.status === 'ocupado' ? 'bg-rose-500' : 'bg-amber-500'
              }`}>
                <div className="flex justify-between items-start">
                   <div>
                      <h2 className="text-5xl font-black tracking-tighter mb-1">Quarto {selectedDetailRoom.number}</h2>
                      <div className="flex items-center gap-4 text-white/80 font-medium">
                         <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Capacidade: {selectedDetailRoom.capacity}</span>
                         {selectedDetailRoom.status === 'ocupado' && (
                            <span className="flex items-center gap-1.5 font-bold text-white"><Calendar className="w-4 h-4" /> Desde {selectedDetailRoom.activeComanda?.checkInDate}</span>
                         )}
                      </div>
                   </div>
                   <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                      <Bed className="w-10 h-10" />
                   </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                 {selectedDetailRoom.status === 'ocupado' && selectedDetailRoom.activeComanda && (
                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex flex-col p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">PIN DE ACESSO</span>
                          <span className="text-2xl font-black text-primary tracking-[0.2em] font-mono leading-none">
                             {selectedDetailRoom.activeComanda.accessPin}
                          </span>
                       </div>
                       <div className="flex flex-col p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 text-center">CONSUMO ATUAL</span>
                          <span className="text-2xl font-black text-rose-600 leading-none text-center font-mono">
                             {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedDetailRoom.activeComanda.currentAmount)}
                          </span>
                       </div>
                    </div>
                 )}

                 {selectedDetailRoom.status === 'ocupado' && selectedDetailRoom.activeComanda?.lastOrder && (
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
                       <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-primary tracking-widest leading-none mb-1">ÚLTIMO REGISTRO</span>
                          <span className="text-sm font-bold text-slate-700 leading-tight line-clamp-1">{selectedDetailRoom.activeComanda.lastOrder}</span>
                       </div>
                       <div className="text-[10px] font-bold text-muted-foreground bg-white p-1 rounded-lg border shadow-sm">
                          {selectedDetailRoom.activeComanda.lastOrderTime}
                       </div>
                    </div>
                 )}

                 <div className="space-y-3">
                    <Label className="text-xs uppercase font-black text-slate-400 tracking-widest">Alterar Status & Ações</Label>
                    <div className="grid grid-cols-2 gap-2">
                       {selectedDetailRoom.status !== 'livre' && (
                          <Button variant="outline" className="h-12 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold justify-start" onClick={() => changeStatus(selectedDetailRoom.id, 'livre')}>
                             <CheckCircle2 className="w-4 h-4 mr-2" /> Liberar Quarto
                          </Button>
                       )}
                       {selectedDetailRoom.status !== 'ocupado' && (
                          <Button variant="outline" className="h-12 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold justify-start" onClick={() => changeStatus(selectedDetailRoom.id, 'ocupado')}>
                             <Users className="w-4 h-4 mr-2" /> Check-in Hóspede
                          </Button>
                       )}
                       {selectedDetailRoom.status !== 'manutencao' && (
                          <Button variant="outline" className="h-12 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700 font-bold justify-start" onClick={() => changeStatus(selectedDetailRoom.id, 'manutencao')}>
                             <RefreshCcw className="w-4 h-4 mr-2" /> Manutenção
                          </Button>
                       )}
                       <Button variant="outline" className="h-12 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold justify-start" onClick={() => handleOpenQr(selectedDetailRoom)}>
                          <QrCode className="w-4 h-4 mr-2" /> QR Code
                       </Button>
                    </div>
                 </div>

                 <div className="flex gap-2 pt-2">
                    {selectedDetailRoom.status === 'ocupado' && (
                       <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20" onClick={() => handleOpenCloseAccount(selectedDetailRoom)}>
                          <Receipt className="w-4 h-4 mr-2" /> Fechar Conta
                       </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100" onClick={() => handleOpenModal(selectedDetailRoom)}>
                       <Edit2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50" onClick={() => handleDelete(selectedDetailRoom.id)}>
                       <Trash2 className="w-5 h-5" />
                    </Button>
                 </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Adicionar/Editar Quarto Config */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>{editingRoom ? "Editar Quarto" : "Cadastrar Novo Quarto"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
               <Label htmlFor="num" className="text-slate-700">Número ou Identificação</Label>
               <Input id="num" value={tempNum} onChange={(e) => setTempNum(e.target.value)} placeholder="101" className="mt-1.5" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <Label htmlFor="cap" className="text-slate-700">Capacidade</Label>
                  <Input id="cap" type="number" min="1" value={tempCap} onChange={(e) => setTempCap(e.target.value)} placeholder="2" className="mt-1.5" />
               </div>
               <div>
                  <Label htmlFor="status" className="text-slate-700">Status</Label>
                  <select 
                    id="status" 
                    value={tempStatus} 
                    onChange={(e) => setTempStatus(e.target.value as RoomStatus)} 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
                  >
                     <option value="livre">Disponível</option>
                     <option value="ocupado">Ocupado</option>
                     <option value="manutencao">Manutenção/Limpeza</option>
                  </select>
               </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleSave} disabled={!tempNum}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Fechar Conta / Relatório */}
      <Dialog open={isCloseModalOpen} onOpenChange={setIsCloseModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-slate-900 p-6 text-white text-center">
             <Receipt className="w-10 h-10 text-primary mx-auto mb-2" />
             <h2 className="text-2xl font-bold tracking-tight">Fechamento de Conta</h2>
             <p className="text-slate-400 text-sm">Quarto {selectedCloseRoom?.number} • {selectedCloseRoom?.activeComanda?.checkInDate}</p>
          </div>
          
          <div className="p-6">
             <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Produtos & Serviços</span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-lg">
                   <Key className="w-3 h-3 text-slate-400" />
                   <span className="text-xs font-black text-slate-600 font-mono tracking-widest">{selectedCloseRoom?.activeComanda?.accessPin}</span>
                </div>
             </div>
             
             <ScrollArea className="h-[250px] pr-4">
                <div className="space-y-4">
                   {selectedCloseRoom?.activeComanda?.orders?.map(item => (
                      <div key={item.id} className="flex justify-between items-start group">
                         <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800">{item.name}</span>
                            <span className="text-xs text-slate-500 font-medium">{item.quantity}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</span>
                         </div>
                         <span className="text-sm font-mono font-bold text-slate-700">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                         </span>
                      </div>
                   ))}
                   {(!selectedCloseRoom?.activeComanda?.orders || selectedCloseRoom.activeComanda.orders.length === 0) && (
                      <div className="py-8 text-center text-slate-400 italic text-sm">Nenhum consumo registrado.</div>
                   )}
                </div>
             </ScrollArea>
             
             <Separator className="my-4" />
             
             <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                   <span>Subtotal</span>
                   <span className="font-mono">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedCloseRoom?.activeComanda?.currentAmount || 0)}</span>
                </div>
                
                <div className="flex justify-between text-sm text-slate-500">
                   <div className="flex items-center gap-1.5">
                      <span>Taxa de Serviço</span>
                      <Badge className="bg-slate-100 text-slate-500 border-none px-1.5 py-0 text-[10px]">10%</Badge>
                   </div>
                   <span className="font-mono text-emerald-600">+{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculateFees(selectedCloseRoom?.activeComanda?.currentAmount || 0).serviceFee)}</span>
                </div>
                
                <div className="flex justify-between text-sm text-slate-500">
                   <span>Taxa de Turismo (ISS/Day)</span>
                   <span className="font-mono text-emerald-600">+{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculateFees(selectedCloseRoom?.activeComanda?.currentAmount || 0).tourismFee)}</span>
                </div>
                
                <Separator className="my-2 border-dashed" />
                
                <div className="flex justify-between items-center pt-2">
                   <span className="text-lg font-black text-slate-900">VALOR TOTAL</span>
                   <span className="text-2xl font-black text-primary font-mono tracking-tighter">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculateFees(selectedCloseRoom?.activeComanda?.currentAmount || 0).total)}
                   </span>
                </div>
             </div>
          </div>
          
          <div className="bg-slate-50 p-6 flex gap-3">
             <Button variant="outline" className="flex-1 font-bold gap-2" onClick={() => setIsCloseModalOpen(false)}>
                Cancelar
             </Button>
             <Button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold gap-2 shadow-lg" onClick={finalizeAccount}>
                <LogOut className="w-4 h-4" /> Finalizar & Liberar
             </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10">
             <Printer className="w-4 h-4 mr-2" /> Imprimir
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modal Mostrar QR Code */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white flex flex-col items-center justify-center p-8">
          <div className="text-center mb-6">
             <h2 className="text-2xl font-bold">Quarto {selectedQrRoom?.number}</h2>
             <p className="text-sm text-slate-500">Escaneie para acessar o cardápio e comandos</p>
          </div>
          
          <div className="bg-white p-4 border-2 border-slate-200 rounded-xl shadow-sm mb-6">
             <div className="w-48 h-48 bg-slate-900 border-[8px] border-white relative flex items-center justify-center">
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-2">
                   {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className={`bg-white ${Math.random() > 0.4 ? 'opacity-100' : 'opacity-0'} rounded-sm`} />
                   ))}
                </div>
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center z-10 p-1">
                   <div className="w-full h-full bg-primary rounded-sm flex items-center justify-center">
                      <QrCode className="text-white w-6 h-6" />
                   </div>
                </div>
             </div>
          </div>
          
          <div className="flex gap-3 w-full">
            <Button className="flex-1 bg-slate-100 text-slate-800 hover:bg-slate-200 border-none shadow-none font-semibold">
               Copiar Link
            </Button>
            <Button className="flex-1 bg-primary text-white hover:bg-primary/90 font-semibold shadow-sm">
               Baixar/Imprimir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
