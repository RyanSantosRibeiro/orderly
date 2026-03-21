"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, Store, User, MapPin, Share2, Info, X, History, Receipt, Clock, Bed } from "lucide-react"

const mockCategories = ["Oferta", "Entradinhas", "Entradas", "Camarões", "Peixe", "Bebidas", "Sobremesas"]
const mockProducts = [
  {
    id: "prod_1",
    name: "Camarão em Crosta (380g de Camarão)",
    description: "Camarões em crosta de pão de alho. Acompanha salada de alface americana, tomate, azeitona verde, palmito, pimentão e cebola. Acompanha risoto de limão siciliano.",
    price: 119.0,
    oldPrice: 150.0,
    category: "Oferta",
    image: "https://images.unsplash.com/photo-1559742811-82410a45ccbb?q=80&w=800&auto=format&fit=crop",
    code: "3017"
  },
  {
    id: "prod_2",
    name: "Meio Camarão Jurerê",
    description: "Camarões puxados no azeite extra virgem, alho e cebola, com toque final de vinho branco.",
    price: 99.9,
    category: "Oferta",
    image: "https://images.unsplash.com/photo-1535400255456-9842f14717b8?q=80&w=800&auto=format&fit=crop",
    code: "3029"
  },
  {
    id: "prod_3",
    name: "Camarão Mônaco (220g)",
    description: "Camarões empanados acompanhados de risoto de queijo parmesão.",
    price: 99.9,
    category: "Oferta",
    image: "https://images.unsplash.com/photo-1625944230945-174404f9224c?q=80&w=800&auto=format&fit=crop",
    code: "3071"
  },
  {
    id: "prod_4",
    name: "Cerveja Pilsen",
    description: "Long neck super gelada.",
    price: 12.0,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1618889482923-382504ff1956?q=80&w=800&auto=format&fit=crop",
    code: "4001"
  },
  {
    id: "prod_5",
    name: "Torta de Limão",
    description: "Torta refrescante com merengue suíço.",
    price: 22.0,
    category: "Sobremesas",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop",
    code: "5001"
  },
  {
    id: "prod_6",
    name: "Bolinho de Bacalhau (6 unidades)",
    description: "Tradicional bolinho de bacalhau crocante por fora e macio por dentro.",
    price: 39.9,
    category: "Entradinhas",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop",
    code: "1011"
  },
  {
    id: "prod_7",
    name: "Isca de Peixe",
    description: "Iscas de peixe empanadas acompanhadas de molho tártaro.",
    price: 49.9,
    category: "Entradinhas",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop",
    code: "1012"
  },

  // 🥗 ENTRADAS
  {
    id: "prod_8",
    name: "Salada Tropical",
    description: "Mix de folhas, manga, tomate cereja e molho especial da casa.",
    price: 32.0,
    category: "Entradas",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    code: "2011"
  },
  {
    id: "prod_9",
    name: "Carpaccio de Salmão",
    description: "Finas fatias de salmão com alcaparras e molho cítrico.",
    price: 59.9,
    category: "Entradas",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    code: "2012"
  },

  // 🦐 CAMARÕES
  {
    id: "prod_10",
    name: "Camarão ao Alho e Óleo (300g)",
    description: "Camarões salteados no alho e óleo com toque de ervas.",
    price: 89.9,
    category: "Camarões",
    image: "https://images.unsplash.com/photo-1559742811-82410a45ccbb?q=80&w=800&auto=format&fit=crop",
    code: "3010"
  },
  {
    id: "prod_11",
    name: "Camarão na Moranga",
    description: "Camarões ao molho cremoso servidos dentro da moranga.",
    price: 129.9,
    category: "Camarões",
    image: "https://images.unsplash.com/photo-1625944525533-473f8a3d54e7?q=80&w=800&auto=format&fit=crop",
    code: "3011"
  },

  // 🐟 PEIXES
  {
    id: "prod_12",
    name: "Filé de Tilápia Grelhado",
    description: "Acompanha arroz, legumes e molho de ervas.",
    price: 69.9,
    category: "Peixe",
    image: "https://images.unsplash.com/photo-1597692493774-729906159654?q=80&w=800&auto=format&fit=crop",
    code: "3020"
  },
  {
    id: "prod_13",
    name: "Salmão ao Molho de Maracujá",
    description: "Salmão grelhado com molho agridoce de maracujá.",
    price: 89.9,
    category: "Peixe",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    code: "3021"
  },

  // 🍹 BEBIDAS
  {
    id: "prod_14",
    name: "Suco Natural",
    description: "Sabores: laranja, abacaxi, maracujá ou limão.",
    price: 10.0,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1536939459926-301728717817?q=80&w=800&auto=format&fit=crop",
    code: "4002"
  },
  {
    id: "prod_15",
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná ou Sprite.",
    price: 8.0,
    category: "Bebidas",
    image: "https://images.unsplash.com/photo-1521488663238-087ebb50ca37?q=80&w=800&auto=format&fit=crop",
    code: "4003"
  },

  // 🍰 SOBREMESAS
  {
    id: "prod_16",
    name: "Petit Gateau",
    description: "Bolo quente de chocolate com sorvete de creme.",
    price: 28.0,
    category: "Sobremesas",
    image: "https://images.unsplash.com/photo-1536006734184-e9ed1a88b839?q=80&w=800&auto=format&fit=crop",
    code: "5002"
  },
  {
    id: "prod_17",
    name: "Pudim de Leite",
    description: "Clássico pudim caseiro com calda de caramelo.",
    price: 18.0,
    category: "Sobremesas",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=800&auto=format&fit=crop",
    code: "5003"
  }
]

export default function MenuClient({
  slug,
  mesaInicial,
  garcom,
}: {
  slug: string
  mesaInicial?: string
  garcom?: string
}) {
  const [activeCategory, setActiveCategory] = useState(mockCategories[0])
  const [mesa, setMesa] = useState<string | undefined>(mesaInicial)
  const [waiterId] = useState<string | undefined>(garcom)
  const [isSelectorOpen, setIsSelectorOpen] = useState(!mesaInicial)
  const [tempMesa, setTempMesa] = useState("")

  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([])
  const [history, setHistory] = useState<{ id: string; date: string; items: { name: string; quantity: number; price: number }[]; total: number }[]>([])
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null)
  const [tempQuantity, setTempQuantity] = useState(1)

  const [pin, setPin] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [deliveryLocation, setDeliveryLocation] = useState("Meu Local")

  useEffect(() => {
    if (mesa) {
      if (mesa.toLowerCase().includes("mesa")) setDeliveryLocation("Mesa")
      else if (mesa.toLowerCase().includes("dayuse")) setDeliveryLocation("Piscina")
      else setDeliveryLocation("Meu Quarto")
    }
  }, [mesa])

  // Chave única para o localStorage baseada no estabelecimento e mesa
  const authKey = mesa ? `auth_${slug}_${mesa}` : null
  const historyKey = mesa ? `history_${slug}_${mesa}` : null

  useEffect(() => {
    if (authKey) {
      const savedAuth = localStorage.getItem(authKey)
      if (savedAuth === "true") {
        setIsAuthenticated(true)
      }
    }
  }, [authKey])

  useEffect(() => {
    if (historyKey) {
      const savedHistory = localStorage.getItem(historyKey)
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory))
      }
    }
  }, [historyKey])

  const handleConfirmOrder = () => {
    if (cart.length === 0) return

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      items: cart.map(item => ({ ...item })),
      total: cartTotal,
      location: deliveryLocation
    }

    const updatedHistory = [newOrder, ...history]
    setHistory(updatedHistory)
    setCart([])

    if (historyKey) {
      localStorage.setItem(historyKey, JSON.stringify(updatedHistory))
    }

    alert("Pedido enviado com sucesso!")
  }

  const handleValidatePin = () => {
    // Simulação de validação (Dado de teste: 1234)
    if (pin === "1234") {
      setIsAuthenticated(true)
      setAuthError(false)
      if (authKey) {
        localStorage.setItem(authKey, "true")
      }
    } else {
      setAuthError(true)
      setPin("")
    }
  }

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  const handleSelectTable = () => {
    if (tempMesa.trim() !== "") {
      setMesa(tempMesa.trim())
      setIsSelectorOpen(false)
      setPin("")
      setAuthError(false)
    }
  }

  const openProductModal = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product)
    setTempQuantity(1)
  }

  const handleAddToCart = () => {
    if (!selectedProduct) return

    setCart((prev) => {
      const existing = prev.find((item) => item.id === selectedProduct.id)
      if (existing) {
        return prev.map((item) =>
          item.id === selectedProduct.id ? { ...item, quantity: item.quantity + tempQuantity } : item
        )
      }
      return [...prev, { id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, quantity: tempQuantity }]
    })

    setSelectedProduct(null)
  }

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            const newQ = item.quantity + delta
            return newQ > 0 ? { ...item, quantity: newQ } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 pb-20">

      {/* Modal para Escolha de Mesa ou PIN */}
      <Dialog
        open={isSelectorOpen || (!!mesa && !isAuthenticated)}
        onOpenChange={(open) => {
          if (!mesa) setIsSelectorOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {!mesa ? "Bem-vindo ao Menu" : "Acesso à Comanda"}
            </DialogTitle>
            <DialogDescription>
              {!mesa
                ? (!waiterId
                  ? "Por favor, digite o número da mesa para acessar o cardápio."
                  : `Olá, Garçom ${waiterId}. Selecione a mesa para iniciar o pedido.`)
                : `A mesa ${mesa} está vinculada a uma comanda ativa. Informe o PIN de acesso.`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {!mesa ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mesa" className="text-right font-medium">
                  Mesa
                </Label>
                <Input
                  id="mesa"
                  autoFocus
                  placeholder="Ex: 04"
                  className="col-span-3 text-lg"
                  value={tempMesa}
                  onChange={(e) => setTempMesa(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSelectTable()}
                />
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pin" className="text-right font-medium">
                  PIN
                </Label>
                <div className="col-span-3 space-y-2">
                  <Input
                    id="pin"
                    type="password"
                    inputMode="numeric"
                    autoFocus
                    placeholder="****"
                    maxLength={6}
                    className={`text-center text-2xl tracking-[0.5em] font-bold ${authError ? 'border-rose-500 animate-shake' : ''}`}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, ""))
                      setAuthError(false)
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleValidatePin()}
                  />
                  {authError && (
                    <p className="text-xs text-rose-500 font-medium text-center">PIN incorreto. Tente novamente.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            {!mesa ? (
              <Button onClick={handleSelectTable} disabled={!tempMesa.trim()} className="w-full">
                Confirmar Mesa
              </Button>
            ) : (
              <div className="w-full flex flex-col gap-2">
                <Button onClick={handleValidatePin} disabled={pin.length < 4} className="w-full">
                  Validar Acesso
                </Button>
                <Button variant="ghost" onClick={() => setMesa(undefined)} className="w-full text-slate-500 text-xs">
                  Mudar Mesa / Comanda
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hero Banner Simulando o Layout (Gift Card) */}
      <div className="w-full h-48 md:h-72 bg-amber-500 relative overflow-hidden flex items-center justify-center"
        style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundImage: "url('https://scontent-gig4-2.cdninstagram.com/v/t51.82787-15/651497111_17954074233078250_1857652216451159194_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzM4NzM4MzE2NTkzNTQ0NjI5NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4ODEwLnNkci5DMyJ9&_nc_ohc=Jlf7oWneuKIQ7kNvwHyfrXD&_nc_oc=Ado1C3Jtietz7LrE6UrHwX6LzJL770PH5Ri1u7ZUgQfFlSwRZ0Tm3eHCCRsYkjUkXbZbtw1mM3UNVnuQy32pWZs4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-gig4-2.cdninstagram.com&_nc_gid=44hV3Ex0Mlks1NGISkGi2w&_nc_ss=8&oh=00_AfzY_rkcrI70S7vQVqphO-FjseoTq8RvfO9gk17utEegGQ&oe=69C12FC6')" }}>
        <div className="absolute inset-0 bg-linear-to-r from-orange-600/40 to-amber-400/50 opacity-90" />
        <div className="z-10 text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter shadow-sm">COM O GIFT CARD {slug.replace(/-/g, " ").toUpperCase()}.</h1>
          <p className="mt-2 font-medium">A NOSSA ESPECIALIDADE É O MELHOR DO BRASIL</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white relative">
        {/* Info Restaurante */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-md flex items-center justify-center font-bold text-xs uppercase text-center leading-tight">
              {slug.substring(0, 4)}
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight capitalize">{slug.replace(/-/g, " ")}</h1>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                {mesa && (
                  <span className="flex items-center text-primary font-medium">
                    <MapPin className="w-3 h-3 mr-0.5" /> Mesa {mesa}
                  </span>
                )}
                {waiterId && (
                  <span className="flex items-center text-amber-600 font-medium">
                    <User className="w-3 h-3 mr-0.5" /> Garçom {waiterId}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">

              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-800">
                <Share2 className="w-5 h-5" />
              </Button>


              {/* Carrinho (Drawer Lateral) */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative border-slate-200 text-slate-700 h-10 px-3">
                    <ShoppingCart className="w-5 h-5 mr-1 pt-0.5" />
                    <span className="font-semibold">{formatPrice(cartTotal)}</span>
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white p-0">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:max-w-[400px] flex flex-col p-0">
                  <SheetHeader className="p-4 border-b border-slate-100 bg-slate-50">
                    <SheetTitle className="flex items-center gap-2 text-lg">
                      <ShoppingCart className="w-5 h-5" /> Seu Carrinho
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center text-slate-500 mt-10">Seu carrinho está vazio.</div>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                          <div className="flex-1 pr-4">
                            <p className="font-semibold text-sm leading-tight text-slate-800">{item.name}</p>
                            <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.price)}</p>
                          </div>
                          <div className="flex items-center gap-3 bg-slate-50 rounded-full px-2 py-1 border border-slate-200">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-primary hover:text-primary/80">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.length > 0 && (
                    <div className="p-4 border-t bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-6">
                      <div className="space-y-3">
                         <Label className="text-xs uppercase font-black text-slate-400 tracking-widest pl-1">Onde você está?</Label>
                         <div className="grid grid-cols-2 gap-2">
                            {["Meu Quarto", "Piscina", "Restaurante", "Recepção"].map((loc) => (
                              <Button
                                key={loc}
                                variant="outline"
                                size="sm"
                                className={`h-11 font-bold rounded-xl transition-all border-slate-200 ${deliveryLocation === loc ? "bg-slate-900  border-slate-900" : "text-slate-500 hover:bg-slate-50"}`}
                                onClick={() => setDeliveryLocation(loc)}
                              >
                                {loc === "Meu Quarto" && <Bed className="w-3 h-3 mr-2" />}
                                {loc === "Piscina" && <Info className="w-3 h-3 mr-2 text-sky-500" />}
                                {loc === "Restaurante" && <Store className="w-3 h-3 mr-2 text-orange-500" />}
                                {loc}
                              </Button>
                            ))}
                         </div>
                      </div>

                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-dashed border-slate-100">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(cartTotal)}</span>
                      </div>
                      <Button
                        className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90"
                        onClick={handleConfirmOrder}
                      >
                        Confirmar Pedido
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex items-center gap-2">

              {/* Botão de Histórico (Comanda) */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 h-10 px-3 relative transition-all hover:bg-slate-50 group">
                    <Receipt className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Sua Comanda</span>
                    {history.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-white p-0 border-2 border-white shadow-sm">
                        {history.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:max-w-[400px] flex flex-col p-0 bg-white">
                  <SheetHeader className="p-6 border-b border-slate-100 bg-slate-50">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
                      <Receipt className="w-5 h-5 text-primary" /> Meus Pedidos
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto p-0">
                    {history.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                          <Receipt className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-sm font-medium">Você ainda não realizou nenhum pedido nesta sessão.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {history.map((order) => (
                          <div key={order.id} className="p-6 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{order.id}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <p className="text-sm font-bold text-slate-600">{order.date}</p>
                                  </div>
                                  <span className="text-slate-300">•</span>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-primary" />
                                    <p className="text-sm font-bold text-primary">{(order as any).location || "Local não informado"}</p>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px] font-bold">
                                Confirmado
                              </Badge>
                            </div>

                            <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span className="text-slate-700 font-medium">
                                    <span className="text-primary font-bold">{item.quantity}x</span> {item.name}
                                  </span>
                                  <span className="text-slate-500 font-mono text-xs">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total do Pedido</span>
                              <span className="text-lg font-black text-slate-900 font-mono">
                                {formatPrice(order.total)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {history.length > 0 && (
                    <div className="p-6 bg-slate-900 text-white">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Acumulado</span>
                        <span className="text-2xl font-black text-primary font-mono tracking-tighter">
                          {formatPrice(history.reduce((acc, order) => acc + order.total, 0))}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic">Pague diretamente na recepção ao fechar sua comanda.</p>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>

        {/* Menu Categorias (estilo abas) */}
        <div className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
          <div className="flex overflow-x-auto no-scrollbar pt-2 px-2">
            <div className="flex items-center px-4">
              <div className="bg-primary text-white p-1.5 rounded-full mr-2 shadow-sm">
                <Store className="w-4 h-4" />
              </div>
            </div>
            {mockCategories.map((cat) => (
              <button
                key={cat}
                className={`whitespace-nowrap pb-3 px-4 font-semibold text-[15px] transition-colors relative ${activeCategory === cat
                  ? "text-slate-900 border-b-2 border-primary"
                  : "text-slate-500 hover:text-slate-800"
                  }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Faixa de Aviso da Oferta */}
        {activeCategory === "Oferta" && (
          <div className="px-4 py-3 mt-4">
            <div className="flex items-center gap-2 border border-slate-200 rounded-md p-3 justify-center text-sm text-slate-500 bg-slate-50">
              <Info className="w-4 h-4" /> DOMINGO A QUINTA, NO JANTAR E SEGUNDA A SEXTA, NO ALMOÇO
            </div>
          </div>
        )}

        {/* Lista de Produtos (Layout Novo) */}
        <main className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4 text-slate-800 capitalize">
            {activeCategory}
          </h2>

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockProducts
              .filter((p) => p.category === activeCategory)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 cursor-pointer group pb-6 border-b border-slate-100 sm:border-b-0 sm:pb-0"
                  onClick={() => openProductModal(product)}
                >
                  {/* Imagem */}
                  <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-slate-100 rounded-lg flex items-center justify-center text-5xl shrink-0 border border-slate-200 overflow-hidden relative shadow-sm group-hover:opacity-90 transition-opacity">
                    {product.image.startsWith('http') ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      product.image
                    )}
                    <div className="absolute top-1 left-1 bg-black/60 rounded p-0.5">
                      <Store className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Info Produto */}
                  <div className="flex-1 flex flex-col justify-start">
                    <h3 className="font-semibold text-slate-900 text-[15px] leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{formatPrice(product.price)}</span>
                      {product.oldPrice && (
                        <span className="text-xs text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
                      )}
                      <span className="text-[10px] text-slate-400">Cód: {product.code}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Alergenicos fake */}
                    <div className="mt-auto pt-3 flex gap-1">
                      <div className="w-5 h-5 rounded-full border border-orange-200 flex items-center justify-center text-[8px] bg-orange-50 text-orange-600">🍞</div>
                      <div className="w-5 h-5 rounded-full border border-red-200 flex items-center justify-center text-[8px] bg-red-50 text-red-600">🦐</div>
                      <div className="w-5 h-5 rounded-full border border-blue-200 flex items-center justify-center text-[8px] bg-blue-50 text-blue-600">🥛</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>

      {/* Modal / Dialog de Produto Aberto */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-[90vw] p-0 overflow-hidden flex flex-col md:flex-row gap-0 bg-transparent border-0 shadow-2xl">

          {/* Imagem Grande (Esquerda) */}
          <div className="w-full md:w-1/2 bg-slate-100 min-h-[250px] md:min-h-[500px] flex items-center justify-center text-9xl relative overflow-hidden">
            {selectedProduct?.image.startsWith('http') ? (
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            ) : (
              selectedProduct?.image
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 bg-white/50 backdrop-blur-md rounded-full text-slate-800 hover:bg-white md:hidden"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Detalhes (Direita) */}
          <div className="p-6 md:p-8 md:w-1/2 bg-white flex flex-col h-full rounded-t-2xl rounded-t-none md:rounded-r-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{selectedProduct?.name}</h2>
                <p className="text-xl md:text-2xl font-bold text-slate-900 mt-2">{formatPrice(selectedProduct?.price || 0)}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {selectedProduct?.description}
            </p>

            <div className="flex gap-2 mt-6">
              <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 font-normal border-slate-200 px-2 py-1">🍞 Glúten</Badge>
              <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 font-normal border-slate-200 px-2 py-1">🦐 Crustáceos</Badge>
              <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 font-normal border-slate-200 px-2 py-1">🥛 Lactose</Badge>
            </div>
            <p className="text-sm text-slate-400 mt-3">Cód: {selectedProduct?.code}</p>

            <div className="mt-8 md:mt-auto pt-6 flex gap-4 items-center">
              <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 border border-slate-200 h-12">
                <button
                  onClick={() => tempQuantity > 1 && setTempQuantity(q => q - 1)}
                  className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-base font-bold text-slate-900">{tempQuantity}</span>
                <button
                  onClick={() => setTempQuantity(q => q + 1)}
                  className="w-10 h-full flex items-center justify-center text-primary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-bold text-base transition-transform active:scale-95 shadow-md hover:shadow-lg"
                onClick={handleAddToCart}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
