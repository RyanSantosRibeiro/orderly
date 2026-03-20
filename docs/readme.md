# 🍽️ Sistema de Comandas Digitais (QR Code) e Gestão para Pousadas/Hotéis

## 📌 Visão Geral

Este projeto é um sistema digital para pousadas, hotéis ou restaurantes, permitindo que hóspedes façam pedidos diretamente do quarto via QR Code. Todos os pedidos vão para uma comanda vinculada ao quarto. Atendentes e administradores gerenciam pedidos em tempo real.

O sistema é multi-tenant (white-label), permitindo que múltiplos estabelecimentos utilizem a mesma plataforma com personalizações próprias.

---

## 🧠 Conceito Geral

* Cada estabelecimento possui seu próprio ambiente administrativo.
* Quartos possuem QR Codes únicos e estáticos.
* **Segurança de Acesso:** Para evitar que hóspedes antigos acessem a comanda de novos hóspedes, cada comanda aberta possui um **PIN de Acesso** (4 a 6 dígitos) gerado no momento do check-in.
* Hóspedes acessam o cardápio digital vinculado ao quarto e validam seu acesso informando o PIN.
* Pedidos são enviados em tempo real para o sistema.
* Atendentes/Garçons podem criar pedidos manualmente, informando o quarto ou a **Comanda Avulsa** ativa. Mesmo em áreas comuns (como restaurante da pousada), os pedidos são lançados na comanda do cliente.
* Uma unidade (Quarto ou Comanda Avulsa) pode ter **várias comandas em seu histórico**, porém **apenas uma comanda pode estar ativa por vez** para aquele vínculo.

---

## 👥 Tipos de Usuário

### 👤 Hóspede (Cliente)

* Acessa via QR Code do quarto
* Visualiza cardápio / serviços
* Adiciona itens ao carrinho
* Envia pedidos para a comanda ativa do quarto

### 🍽️ Atendente / Garçom

* Acessa o sistema sem QR Code
* Seleciona o quarto/comanda ativa manualmente
* Cria pedidos para hóspedes no restaurante, piscina, etc.

### 🛠️ Administrador

* Gerencia cardápio - (Pode criar, editar, deletar, ativar/desativar)
* Controla quartos e comandas - (Pode abrir/fechar comandas, criar e editar quartos)
* Visualiza e gerencia pedidos - (Pode aceitar, cancelar, finalizar)
* Configura o estabelecimento - (Pode configurar tema, nome, logo, etc.)

---

## 🧱 Entidades do Sistema

### 🏢 Estabelecimento (Restaurante/Pousada)

* id
* nome
* logo_url
* configurações (tema, etc.)

---

### 🍔 Produto / Serviço

* id
* nome
* descrição
* preço
* categoria_id
* imagem_url
* ativo (boolean)

---

### 📂 Categoria

* id
* nome
* ordem

---

### 🛏️ Quarto

* id
* número / nome
* qr_code
* status (livre, ocupado, manutenção)

---

### 📋 Comanda

* id
* quarto_id (opcional - nulo para comandas avulsas)
* identificador (ex: Nome do Cliente ou "DayUse 01")
* access_pin (PIN aleatório gerado na abertura)
* status (ativa, fechada)
* criado_em
* fechado_em
* valor_total

---

### 🧾 Pedido

* id
* comanda_id
* status (pendente, aceito, cancelado, finalizado)
* origem (hóspede | atendente)
* criado_em

---

### 📦 Item do Pedido

* id
* pedido_id
* produto_id
* quantidade
* observação

---

### 👤 Usuário (Admin/Atendente)

* id
* nome
* email
* role (admin | waiter)
* estabelecimento_id

---

## 🔄 Fluxos Principais

### 📱 Fluxo do Hóspede (QR Code no Quarto)

1. Hóspede escaneia QR Code do quarto.
2. Sistema identifica o quarto e solicita o **PIN de Acesso** da comanda ativa.
3. Hóspede insere o PIN (recebido no check-in) para vincular seu dispositivo.
4. Acessa o cardápio e sua respectiva comanda.
5. Adiciona itens ao carrinho e envia pedidos.
6. Ao fechar a comanda (pelo admin), o acesso via aquele PIN é invalidado.

---

### 🍽️ Fluxo do Atendente (Restaurante/Áreas Comuns)

1. Acessa o sistema sem QR Code.
2. Pergunta o número do quarto ou o nome/identificador da Comanda Avulsa.
3. Seleciona o vínculo (que puxa automaticamente a comanda ativa).
4. Adiciona itens ao pedido.
5. Envia pedido.

---

### ☀️ Fluxo de DayUse (Comanda Avulsa)

1. Cliente chega à pousada para utilizar as dependências (sem quarto).
2. Administrador/Atendente abre uma **Comanda Avulsa** informando um identificador (ex: Nome do Cliente).
3. Sistema gera um **PIN de Acesso** e um link único para o cliente.
4. Cliente acessa o cardápio via link ou QR Code genérico e informa o PIN.
5. Faz pedidos normalmente durante o dia.
6. Ao final, a conta é fechada e o identificador é liberado.

---

### 🛠️ Fluxo do Administrador

1. Acessa painel administrativo
2. Gerencia:

   * Cardápio / Serviços
   * Categorias
   * Produtos
   * Quartos e Comandas
3. Visualiza pedidos em tempo real
4. Atualiza status dos pedidos
5. Fecha comandas (checkout do hóspede)

---

## 📺 Telas do Sistema

### 📱 Hóspede

* Cardápio
* Lista de produtos
* Carrinho
* Confirmação de pedido
* Extrato da comanda (opcional)

---

### 🍽️ Atendente

* Seleção de quarto / comanda ativa
* Cardápio
* Carrinho
* Envio de pedido

---

### 🛠️ Admin

* Dashboard
* Gestão de pedidos
* Gestão de produtos e categorias
* Gestão de quartos e comandas (abrir/fechar comanda)
* Configurações

---

## 🔌 Funcionalidades

### ✅ Essenciais

* Cadastro de estabelecimentos
* CRUD de produtos e categorias
* Geração de QR Code por quarto
* Sistema de pedidos em tempo real
* Carrinho por sessão
* Lançamento de pedidos na comanda (quarto ou avulsa)
* Seleção de identificador manual pelo atendente
* Criação de comandas avulsas para clientes DayUse

---

### ⚡ Tempo Real

* Atualização de pedidos (ex: Supabase Realtime)
* Mudança de status instantânea

---

### 🔐 Controle de Acesso

* Admin: acesso total
* Atendente: criação de pedidos
* Hóspede: acesso limitado ao cardápio e extrato de sua comanda

---

## 🧩 Regras de Negócio

* Uma unidade (quarto ou identificador avulso) pode ter várias comandas ao longo do tempo (histórico), mas **APENAS UMA comanda ativa por vez**.
* Os pedidos são vinculados obrigatoriamente à comanda (e não diretamente ao quarto ou cliente).
* Pedido só pode ser editado antes de ser enviado.
* Produtos podem ser ativados/desativados.
* O único que pode cancelar um pedido é o admin, e ainda fica registrado.
* O fechamento da comanda inativa a mesma, permitindo a abertura de uma nova comanda para o próximo hóspede do quarto.

---

## 🚀 Tecnologias

* Next.js
* Supabase (Auth, Database, Realtime)
* TailwindCSS / SCSS
* QR Code para identificação de quartos

---

## 📦 Estrutura Geral do Projeto

---

## 🔮 Possíveis Evoluções

* Pagamento integrado (PIX, cartão) no fechamento da comanda
* Impressão automática de pedidos (cozinha/bar)
* Sistema de notificações
* Histórico e relatórios de comandas fechadas
* Multi-idioma

---

## 📝 Observações

Este sistema foi projetado para ser:

* Escalável (multi-estabelecimento)
* Flexível (white-label)
* Simples para o hóspede final
* Eficiente para operação da pousada/hotel

---
