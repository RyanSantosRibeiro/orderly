"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
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
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  MoreHorizontal
} from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  active: boolean
  code: string
}

const mockCategories = ["Oferta", "Entradinhas", "Entradas", "Camarões", "Peixe", "Bebidas", "Sobremesas"]

const initialProducts: Product[] = [
  {
    id: "prod_1",
    name: "Camarão em Crosta",
    description: "Camarões em crosta de pão de alho com salada.",
    price: 119.0,
    category: "Oferta",
    image: "🦐",
    active: true,
    code: "3017"
  },
  {
    id: "prod_2",
    name: "Meio Camarão Jurerê",
    description: "Camarões puxados no azeite extra virgem, alho e cebola.",
    price: 99.9,
    category: "Oferta",
    image: "🍤",
    active: true,
    code: "3029"
  },
  {
    id: "prod_4",
    name: "Cerveja Pilsen",
    description: "Long neck super gelada.",
    price: 12.0,
    category: "Bebidas",
    image: "🍺",
    active: true,
    code: "4001"
  },
  {
    id: "prod_17",
    name: "Pudim de Leite",
    description: "Clássico pudim caseiro com calda de caramelo.",
    price: 18.0,
    category: "Sobremesas",
    image: "🍮",
    active: false,
    code: "5003"
  }
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  const [tempName, setTempName] = useState("")
  const [tempDesc, setTempDesc] = useState("")
  const [tempPrice, setTempPrice] = useState("")
  const [tempCat, setTempCat] = useState(mockCategories[0])
  const [tempCode, setTempCode] = useState("")
  const [tempActive, setTempActive] = useState(true)

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setTempName(product.name)
      setTempDesc(product.description)
      setTempPrice(product.price.toString())
      setTempCat(product.category)
      setTempCode(product.code)
      setTempActive(product.active)
    } else {
      setEditingProduct(null)
      setTempName("")
      setTempDesc("")
      setTempPrice("")
      setTempCat(mockCategories[0])
      setTempCode("")
      setTempActive(true)
    }
    setIsModalOpen(true)
  }

  const handleSave = () => {
    const parsedPrice = parseFloat(tempPrice) || 0
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { 
        ...p, name: tempName, description: tempDesc, price: parsedPrice, category: tempCat, code: tempCode, active: tempActive 
      } : p))
    } else {
      const newProduct: Product = {
        id: `prod_${Date.now()}`,
        name: tempName,
        description: tempDesc,
        price: parsedPrice,
        category: tempCat,
        image: "🍽️",
        active: tempActive,
        code: tempCode || "0000"
      }
      setProducts([newProduct, ...products])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  const toggleActive = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Produtos</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Adicione, edite e organize os produtos e categorias.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[240px] shadow-sm bg-white border-slate-200"
            />
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white shadow-sm font-semibold"
            onClick={() => handleOpenModal()}
          >
            <Plus className="w-4 h-4 mr-2" /> Novo Produto
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-[4px] border-l-primary shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{products.filter(p => p.active).length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desativados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-500">{products.filter(p => !p.active).length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-0 ring-1 ring-border/50">
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-slate-100">
                <TableHead className="w-[80px] font-semibold text-slate-500">Imagem</TableHead>
                <TableHead className="font-semibold text-slate-500 w-[250px]">Produto</TableHead>
                <TableHead className="font-semibold text-slate-500">Cód</TableHead>
                <TableHead className="font-semibold text-slate-500">Categoria</TableHead>
                <TableHead className="font-semibold text-slate-500">Preço</TableHead>
                <TableHead className="font-semibold text-slate-500 text-center">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-500">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                    <TableCell>
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl border border-slate-200 shadow-sm">
                        {product.image}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-slate-900 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{product.description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-mono bg-slate-50 border-slate-200">
                        {product.code}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={`px-2 py-1 h-8 rounded-full text-xs font-medium border ${
                          product.active 
                           ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                           : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                        }`}
                        onClick={() => toggleActive(product.id)}
                      >
                        {product.active ? (
                          <><CheckCircle2 className="w-3 h-3 mr-1" /> Ativo</>
                        ) : (
                          <><XCircle className="w-3 h-3 mr-1" /> Inativo</>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-slate-500 hover:text-primary hover:bg-primary/10 h-8 w-8"
                          onClick={() => handleOpenModal(product)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 h-8 w-8"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl">{editingProduct ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex gap-4">
              <div className="shrink-0 flex flex-col items-center gap-2">
                 <div className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors">
                    {editingProduct ? <span className="text-5xl">{editingProduct.image}</span> : <ImageIcon className="w-8 h-8" />}
                 </div>
                 <span className="text-xs font-medium text-slate-500">Alterar Foto</span>
              </div>
              <div className="flex-1 space-y-4">
                 <div>
                    <Label htmlFor="name" className="text-slate-700">Nome do Produto *</Label>
                    <Input id="name" value={tempName} onChange={(e) => setTempName(e.target.value)} placeholder="Ex: Camarão Mônaco" className="mt-1.5" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                      <Label htmlFor="price" className="text-slate-700">Preço (R$) *</Label>
                      <Input id="price" type="number" step="0.01" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} placeholder="0.00" className="mt-1.5" />
                   </div>
                   <div>
                      <Label htmlFor="code" className="text-slate-700">Código PDV</Label>
                      <Input id="code" value={tempCode} onChange={(e) => setTempCode(e.target.value)} placeholder="Ex: 3010" className="mt-1.5" />
                   </div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <Label htmlFor="category" className="text-slate-700">Categoria</Label>
                  <select 
                    id="category" 
                    value={tempCat} 
                    onChange={(e) => setTempCat(e.target.value)} 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
                  >
                     {mockCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
               </div>
               <div className="flex flex-col justify-end pb-1">
                  <Button 
                    variant={tempActive ? "default" : "outline"}
                    className={`h-10 w-full font-semibold transition-colors ${tempActive ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "text-slate-500"}`}
                    onClick={() => setTempActive(!tempActive)}
                  >
                    {tempActive ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Ativo</> : "Inativo"}
                  </Button>
               </div>
            </div>

            <div>
               <Label htmlFor="desc" className="text-slate-700">Descrição Detalhada</Label>
               <Input id="desc" value={tempDesc} onChange={(e) => setTempDesc(e.target.value)} placeholder="Breve descrição" className="mt-1.5" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button className="bg-primary text-white" onClick={handleSave} disabled={!tempName || !tempPrice}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
