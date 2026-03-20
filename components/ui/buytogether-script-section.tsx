"use client"
import { useState } from "react"
import { Check, Copy } from "lucide-react"

export default function orderlyBuyTogetherScriptSection() {
    const [copied, setCopied] = useState(false)
    const installScript = `<!-- orderly Buy Together Widget -->
<script src="https://orderly.vercel.app/orderlyBuyTogether.js"></script>

<script>
  window.orderlyBuy.init({
    apiKey: 'SUA_CHAVE_AQUI',
    apiUrl: 'https://orderly.vercel.app/api/orderly/generate-look'
  });
</script>

<!-- Botões de exemplo: adicione a classe 'orderly-add' e os data attributes -->
<!-- <button class="orderly-add" data-orderly-id="ID_UNICO" data-orderly-image="URL_IMAGEM" data-orderly-name="NOME">Add ao Look</button> -->`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(installScript)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0d1117] rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#161b22]">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                </div>
                <div className="p-6 overflow-x-auto">
                    <pre className="text-sm font-mono leading-relaxed">
                        <code className="text-blue-300">
                            {`<!-- orderly Buy Together Widget -->
<script src="https://orderly.vercel.app/orderlyBuyTogether.js"></script>

<script>`}
                        </code>
                        <code className="text-emerald-400">
                            {`
  window.orderlyBuy.init({
    apiKey: 'SUA_CHAVE_AQUI'
  });`}
                        </code>
                        <code className="text-blue-300">
                            {`
</script>`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
