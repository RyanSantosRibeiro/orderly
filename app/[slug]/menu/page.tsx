import { Suspense } from "react"
import MenuClient from "./menu-client"

// Server component pra receber os parâmetros e passar pro Client
export default async function MenuPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const searchParamsResult = await searchParams
  const paramsResult = await params
  const mesa = typeof searchParamsResult.mesa === "string" ? searchParamsResult.mesa : undefined
  const garcom = typeof searchParamsResult.garcom === "string" ? searchParamsResult.garcom : undefined

  return (  
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Carregando cardápio...</div>}>
      <MenuClient slug={paramsResult.slug} mesaInicial={mesa} garcom={garcom} />
    </Suspense>
  )
}
