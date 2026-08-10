# Handoff: Sistema de Inscrição do Vestibular — Ação Social Nossa Senhora de Fátima

## Overview
Redesign completo do portal do candidato do vestibular da Ação Social Nossa Senhora de Fátima. O candidato cria conta, preenche a pré-inscrição em 9 etapas, consulta a convocação para a prova (data, horário, local e sala definidos pela secretaria), navega o catálogo de cursos e consulta as dúvidas frequentes.

São 7 telas, cada uma em um arquivo próprio, com navegação real entre elas.

## About the Design Files
Os arquivos em `telas/` são **referências de design feitas em HTML** — protótipos que mostram aparência e comportamento pretendidos, **não código de produção para copiar**.

A tarefa é **recriar estas telas no ambiente já existente do codebase** (React, Vue, Angular, Blade, etc.), usando os padrões, componentes e bibliotecas estabelecidos lá. Se ainda não existe ambiente definido, escolha o framework mais adequado ao projeto e implemente as telas nele.

Pontos específicos destes arquivos que **não** devem ser reproduzidos:
- Todo o estilo está em atributos `style` inline (decisão do ambiente de prototipagem). No codebase, use a solução de estilo do projeto (CSS Modules, Tailwind, styled-components…).
- Os arquivos usam um runtime de prototipagem (`support.js`, tags `<x-dc>`, `<sc-if>`, `<sc-for>`, `{{ … }}`). Isso é andaime do protótipo — não é uma dependência a instalar.
- Os dados são fixos (candidato "Bruno de Oliveira", inscrição 2026-04871, cursos, datas). Tudo vem da API na implementação real.

Para visualizar: abra qualquer arquivo de `telas/` no navegador. `telas/Preview Mobile.dc.html` mostra as 7 telas em molduras de 390px de uma vez.

## Fidelity
**Alta fidelidade (hifi).** Cores, tipografia, espaçamentos, estados e comportamento responsivo são finais. Recrie fielmente, adaptando apenas os mecanismos (estilo, roteamento, estado) aos padrões do codebase.

---

## Design Tokens

### Cores
| Token | Hex | Uso |
|---|---|---|
| Azul-tinta (primária) | `#20304F` | Sidebar, cards escuros, títulos, botão primário |
| Azul-tinta hover | `#17233C` | Hover do botão primário |
| Azul-ardósia (secundária) | `#4A6B7C` | Rótulos de formulário, tags, cor padrão de link, faixa de contato |
| Areia (acento) | `#C2A46A` | Numerais, eyebrows, barra de progresso, underlines, ícone/marcador ativo |
| Argila (alerta) | `#B85C4F` | Pendências, asterisco de campo obrigatório |
| Fundo da página | `#F5F4F1` | Fundo do conteúdo |
| Branco | `#FFFFFF` | Cards, texto sobre fundo escuro |
| Texto corpo | `#333333` | Texto em fundo claro |
| Texto secundário | `#8F8F8F` | Legendas, rótulos, descrições |
| Borda de card | `#E2E0D9` | Borda de 1px dos cards |
| Divisor forte | `#EDEBE4` | Divisores dentro de cards |
| Divisor suave | `#F1EFE9` | Divisores de lista de campos |
| Divisor mais suave | `#EBE9E2` | Linha vertical da timeline |
| Borda de input | `#D6D3CB` | Borda inferior dos inputs (login) |
| Fundo de input | `#FCFBF8` | Fundo dos campos do formulário |
| Cinza inativo | `#C9C6BD` | Marcador de etapa futura, borda de círculo |
| Hover de linha | `#FAF9F6` | Hover das linhas de FAQ |
| Borda de tag azul | `#DCE3E7` | Borda das tags de categoria |
| Alerta: borda / hover | `#EBDAD6` / `#EDEAE3` | Borda do card de alerta, hover da lista de etapas |
| Placeholder de imagem | listras 45° `#E7E5DA` / `#F2F1EA` | Áreas de foto de curso |

Sobre fundo escuro (`#20304F`), textos usam `rgba(255,255,255,α)`: título 1.0 · corpo 0.72 · secundário 0.7 · legenda 0.6 / 0.5 · rótulo apagado 0.38 · bordas 0.28 / 0.2 / 0.13 / 0.12.

### Tipografia
- **Manrope** (Google Fonts) — pesos 300, 400, 500, 600, 700, 800. Sem serifa em nenhum lugar.
- **JetBrains Mono** — pesos 400, 500. Só para dados: número da inscrição, datas curtas, horários, contadores de etapa, numeração do FAQ.
- Fallback: `system-ui, sans-serif`.

Escala (tamanho / peso / line-height / letter-spacing):

| Papel | Valor |
|---|---|
| H1 login | `clamp(36px,6.4vw,60px)` / 300 / 1.04 / -0.035em |
| H1 Início (nome do candidato) | `clamp(31px,5vw,46px)` / 300 / 1.1 / -0.03em |
| H1 detalhe do curso | `clamp(30px,4.8vw,44px)` / 300 / 1.08 / -0.03em |
| H1 de página interna | `clamp(29px,4.4vw,42px)` / 300 / 1.1 / -0.03em |
| H2 login (card) | `clamp(27px,4vw,36px)` / 300 / 1.12 / -0.03em |
| H2 card escuro | `clamp(25px,3.2vw,32px)` / 300 / 1.18 / -0.03em |
| H3 de seção | 26px / 300 / -0.03em |
| Título de card de curso | 18–20px / 600 / 1.25 |
| Título de item (timeline, ação rápida) | 15px / 600–700 |
| Corpo | 14.5–15px / 400 / 1.6–1.75 |
| Corpo secundário | 13–13.5px / 400 / 1.6 |
| Rótulo de campo | 13.5px / 600 / 0.06em / uppercase |
| Eyebrow | 11px / 600 / 0.16em / uppercase |
| Tag | 11px / 500 / 0.08em / uppercase |
| Mono (dados) | 10–12px / 400–500 / 0.04–0.1em |

Parágrafos longos usam `text-wrap: pretty` e largura máxima de 60–70ch.

### Espaçamento
Escala em uso: 2 · 3 · 4 · 5 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 28 · 30 · 32 · 34 · 36 · 40 · 44 · 48 · 56 · 64 · 72 px.
- Padding de conteúdo: `44px 48px 72px`, max-width 1120px.
- Padding de card claro: `26–34px 26–36px`.
- Padding de card escuro: `28–34px 30–36px`.
- Gap entre seções de página: 30–40px. Gap entre cards: 20–24px.

### Bordas, raios e sombras
- **Raio: 0 em tudo.** Nenhum canto arredondado, exceto círculos (`border-radius:50%`) do monograma, avatar e marcadores.
- **Sem sombras.** A hierarquia vem de espaço, filete de 1px e contraste de fundo.
- Bordas: sempre 1px sólido. Barra de progresso: 3px de altura. Linha de timeline: 1px.
- Transições: `.18s` em hover de botões, cards e links.

---

## Screens / Views

Ordem de navegação: **Login → Início → Minha inscrição → Acompanhamento**, com **Cursos → Detalhe do curso** e **Dúvidas** acessíveis pela navegação lateral.

### 1. Login — `telas/Login.dc.html`
**Propósito:** entrar na área do candidato ou criar cadastro.

**Layout:** grid de 2 colunas `1.05fr 1fr`, `min-height:100vh`.
- **Coluna esquerda** — fundo `#20304F`, padding `56px 64px`, `flex-direction:column` com `justify-content:space-between`:
  - topo: monograma (círculo 38px, borda `rgba(194,164,106,.55)`, letra "A" em `#C2A46A` 20px/300) + "AÇÃO SOCIAL" (eyebrow areia) e "Nossa Senhora de Fátima" (12px, branco 68%).
  - meio: filete areia de 52×1px; H1 "Pré-inscrições" com "2026" em `#C2A46A` na segunda linha; parágrafo de apoio (branco 72%, max 460px).
  - base: dois indicadores — "12 / Cursos" e "64 / Anos de história" (número 30px/300 areia, rótulo 11px uppercase branco 50%), gap 40px.
- **Coluna direita** — fundo `#F5F4F1`, centralizada, card de largura máxima 376px, gap 32px:
  - eyebrow "ÁREA DO CANDIDATO" + H2 "Acessar minha conta".
  - dois campos (E-mail, Senha): rótulo uppercase `#4A6B7C` + input sem caixa, apenas `border-bottom:1px solid #D6D3CB`, fundo transparente, 16px; **foco** muda a borda inferior para `#20304F`.
  - link "Esqueci minha senha" alinhado à direita, 13px, com underline de 1px `rgba(74,107,124,.3)`.
  - botão primário "Entrar" (largura total, `#20304F`, texto branco 15px/600, padding `16px 20px`; hover `#17233C`).
  - linha "Não possui conta? **Criar cadastro**" (link com underline areia).
  - divisor de 1px + nota de 12px com link para FAQ e telefone (11) 4362-1000.

**Ações:** "Entrar" e "Criar cadastro" → Início.

---

### Shell compartilhado (telas 2 a 7)
Grid de 2 colunas `250px 1fr`, `min-height:100vh`, fundo `#F5F4F1`.

**Sidebar** (`250px`, fundo `#20304F`, `position:sticky; top:0; height:100vh`, padding `30px 0 24px`):
1. Topo: monograma de 34px + "AÇÃO SOCIAL" / "N. S. de Fátima". Padding `0 26px 30px`. Contém o botão hamburguer, oculto no desktop.
2. Rótulo "NAVEGAÇÃO" (10px, branco 38%).
3. Itens: **Início · Minha inscrição · Acompanhamento · Cursos · Dúvidas frequentes** — 14.5px/500, branco 72%, padding `13px 26px`; hover branco puro. O item ativo recebe fundo `rgba(255,255,255,.07)` e borda esquerda de 2px `#C2A46A`. "Minha inscrição" traz um selo mono `8/9` com fundo `rgba(194,164,106,.16)`.
4. Rodapé (`margin-top:auto`): divisor + "Atendimento / Seg a sex · 8h–11h30 · 13h30–17h" + link "Sair da conta" (areia) → Login.

**Header** (sticky, `padding:20px 48px`, borda inferior `#E2E0D9`, fundo `#F5F4F1`):
- esquerda: breadcrumb "Portal do candidato / **{página}**" (12.5px).
- direita: nome "Bruno de Oliveira" (13.5px/600) + "inscrição 2026-04871" (mono 11px) e avatar circular de 36px, fundo `#4A6B7C`, iniciais "BO".

**Área de conteúdo:** `padding:44px 48px 72px`, `max-width:1120px`.

---

### 2. Início — `telas/Inicio.dc.html`
**Propósito:** visão geral do andamento e atalhos.

1. Eyebrow "OLÁ, SEJA BEM-VINDO" + H1 com o nome do candidato.
2. **Alerta de pendência** (condicional): card branco, borda `#EBDAD6`, padding `20px 22px`; ponto de 7px `#B85C4F`; título "Falta escolher seu curso" e texto explicando que a convocação aparece em Acompanhamento depois de concluir.
3. **Grid `1.5fr 1fr`, gap 24px:**
   - **Card escuro "Vestibular 2026"**: eyebrow areia, H2 "Sua pré-inscrição está em andamento" (max 22ch), linha "Etapa 9 de 9 · Escolha do curso"; barra de progresso (trilho `rgba(255,255,255,.16)` de 3px, preenchimento `#C2A46A` a **89%**); botão fantasma "Continuar inscrição" (borda e texto areia; hover inverte para fundo areia + texto `#20304F`) → Minha inscrição.
   - **Card "Datas"**: três marcos com data em mono areia e rótulo 14px/600 — 13 OUT Abertura das inscrições · 22 NOV Prova presencial · 05 DEZ Resultado (este em cinza/`#4A6B7C`), separados por divisores.
4. **Ações rápidas** — H3 + grid de 3 cards brancos. Cada card: numeral 26px/300 areia (01, 02, 03), título 15px `#20304F`, legenda 12.5px cinza; hover muda a borda para `#20304F`. São "Agendar/Ver convocação da prova — Data, local e sala", "Conhecer os cursos — 12 opções disponíveis", "Falar com a secretaria — (11) 4362-1000".
5. **Dúvidas frequentes** — H3 + link "Ver todas"; card branco com as 3 primeiras perguntas, cada linha com "+" areia à direita, hover `#FAF9F6`. Clicar abre a pergunta correspondente já expandida em Dúvidas.

---

### 3. Minha inscrição — `telas/Inscricao.dc.html`
**Propósito:** preencher/revisar as 9 etapas da pré-inscrição.

**Layout:** grid `290px 1fr`, gap 44px, `align-items:start`.

**Coluna esquerda (sticky, `top:110px`):** barra de progresso de 3px (trilho `#E2E0D9`, preenchimento areia) + contador mono `8/9`; lista das 9 etapas. Cada etapa: círculo de 18px com número, ou "✓" quando concluída; a etapa atual ganha fundo branco e borda esquerda de 2px `#20304F`; hover `#EDEAE3`. Clicar navega entre etapas.

**Etapas:** 1 Informações pessoais · 2 Endereço · 3 Informações de nascimento · 4 Documento · 5 Dados da mãe · 6 Responsável secundário · 7 Escolaridade · 8 Informações gerais · 9 Escolha do curso.

**Card do formulário (branco, borda 1px):**
- cabeçalho: título da etapa (19px/700 `#20304F`) + nota "Campos marcados com * são obrigatórios" (asterisco `#B85C4F`).
- campos: cada linha é um grid `200px 1fr` com rótulo à esquerda (13.5px/600 `#4A6B7C`, asterisco quando obrigatório) e caixa de valor à direita (borda `#E2E0D9`, fundo `#FCFBF8`, padding `12px 14px`, 14.5px); campos de seleção exibem "▾" cinza à direita. Divisor `#F1EFE9` entre linhas.
- rodapé: link "← Voltar" (cinza) e botão primário "Salvar e avançar" — que na última etapa passa a "Concluir inscrição" e leva a Acompanhamento.

Campos por etapa (conteúdo exato do protótipo, todos os obrigatórios marcados): ver `telas/Inscricao.dc.html`, constante `STEPS`. Ex.: etapa 9 tem Primeira opção (select), Período (select), Segunda opção (select), Período (select).

---

### 4. Acompanhamento — `telas/Acompanhamento.dc.html`
**Propósito:** situação da inscrição, cursos escolhidos e convocação para a prova.

1. Eyebrow "INSCRIÇÃO 2026-04871" + H1 "Acompanhamento".
2. **Cursos escolhidos** — eyebrow + grid de 2 cards brancos:
   - topo do card: rótulo mono "1ª OPÇÃO" (areia) / "2ª OPÇÃO" (cinza) + tag de categoria ("Técnico").
   - nome do curso 20px/600; divisor; sub-grid de 2 colunas com "Período" e "Vagas" (rótulo 11.5px cinza + valor 14px/600).
   - link "Ver o curso" com underline areia → detalhe do curso.
   - Dados: 1ª opção Técnico em Informática · Manhã · 32 vagas; 2ª opção Comunicação Visual · Tarde · 24 vagas.
3. **Grid `1fr 340px`, gap 28px:**
   - **Timeline** (card branco, padding `34px 36px`): cada item é um grid `20px 1fr` — marcador circular de 11px + linha vertical de 1px; título 15px `#20304F`, selo de status em mono sobre `#F1EFE9`, descrição 13.5px cinza (max 60ch). Itens: "Cadastro criado" (concluído, marcador `#20304F`) · "Pré-inscrição preenchida" (concluído) · "Convocação emitida" (confirmado) · "Prova presencial" (aguardando, marcador `#C9C6BD`) · "Resultado e matrícula" (aguardando).
   - **Card escuro "Convocação para a prova"** — informação **emitida pelo sistema, não editável pelo candidato**: eyebrow areia, nota "Local, data e sala definidos pela secretaria. Chegue com 30 minutos de antecedência." e 4 pares rótulo/valor (rótulo branco 60% à esquerda, valor 14px/600 alinhado à direita, divisor `rgba(255,255,255,.13)`): Data `Sáb · 22/11/2025` · Horário `09h00 · portões 08h30` · Local `Unidade Itapevi — Rua Frei Damião, 145` · Sala `Bloco B · Sala 14`. Fecha com botão fantasma areia "Baixar comprovante".
   - **Card "Levar no dia"**: RG e CPF do candidato · Comprovante de escolaridade · Comprovante de residência, com divisores.

---

### 5. Cursos — `telas/Cursos.dc.html`
**Propósito:** navegar o catálogo.

1. Cabeçalho em `flex` com `space-between`: eyebrow "TURMAS 2026" + H1 "Nossos cursos" à esquerda; **filtros** à direita — chips retangulares (padding `10px 18px`, borda `#DAD7CE`, 13px): **Todos · Técnico · Qualificação · Inglês**. O ativo tem fundo `#20304F` e texto branco; hover muda a borda para `#20304F`.
2. **Grid de 3 colunas, gap 24px.** Card de curso (branco, borda 1px, hover borda `#20304F`):
   - topo: área de foto de 132px com listras 45° e legenda mono "foto do curso" sobre branco 80% — **placeholder aguardando imagem real**.
   - corpo (padding `22px 24px 24px`): nome 18px/600; duas tags (categoria em `#4A6B7C` com borda `#DCE3E7`; carga horária em cinza); divisor; linha final com preço (13px cinza) e "Detalhes" (13px/600 com underline areia).
3. Cursos: Técnico em Informática (1.000h · R$ 160,00/mês) · Técnico em Administração (1.000h · R$ 160,00) · Eletromecânica de Autos (Qualificação · 880h · R$ 120,00) · Comunicação Visual (880h · R$ 140,00) · Inglês Básico e Pré-intermediário (320h · R$ 90,00) · Inglês Avançado (sábados) (320h · R$ 90,00).

---

### 6. Detalhe do curso — `telas/Curso.dc.html`
**Propósito:** decidir por um curso e iniciar a inscrição. Recebe o curso pela URL (`?c=inf`).

1. Link "← Todos os cursos".
2. Faixa de imagem de `clamp(140px,26vw,200px)` com listras e legenda "foto do curso · 1600×500" — **placeholder**.
3. Eyebrow com a categoria (areia) + H1 com o nome do curso.
4. **Grid `1fr 320px`, gap 36px:**
   - **Esquerda:** bloco "VISÃO GERAL" (rótulo 12px/700 uppercase cinza) com dois parágrafos de 15px/1.75; divisor; bloco "MERCADO DE TRABALHO" com um parágrafo; botão primário "Inscrever-se neste curso" → Minha inscrição.
   - **Direita:** card "INFORMAÇÕES" com 5 itens, cada um em três linhas — rótulo 12px cinza, valor 15px/600 `#20304F`, complemento 12px cinza, divisor `#F1EFE9`: Carga horária `1.000 horas` (2 anos · 5 dias por semana) · Idade `15 a 25 anos` (até 26/01/2026) · Escolaridade mínima `1º ano do Ensino Médio` (cursando em 2026) · Contribuição mensal `R$ 160,00` (material didático à parte) · Períodos `Manhã e tarde` (07h05–12h00 · 13h40–18h30).

---

### 7. Dúvidas frequentes — `telas/Duvidas.dc.html`
**Propósito:** autoatendimento. Aceita `?q=<índice>` para abrir uma pergunta específica.

1. Eyebrow "CENTRAL DE AJUDA" + H1 "Perguntas frequentes". Conteúdo com `max-width:840px`.
2. **Acordeão** em card branco. Cada linha (padding `22px 28px`): numeração mono areia (`01`…`08`), pergunta 15px/500 `#20304F`, e sinal "+" / "–" areia à direita; hover `#FAF9F6`; divisor `#EDEBE4`. A resposta abre abaixo com padding `0 28px 26px 66px` (recuo alinhado à pergunta), 14.5px/1.75, max 70ch. **Apenas uma pergunta aberta por vez.**
3. **Faixa de contato** (fundo `#4A6B7C`, padding `30px 32px`, `space-between` com `flex-wrap`): "Não encontrou sua dúvida?" 17px/600 + "Seg a sex · 8h–11h30 e 13h30–17h · (11) 4362-1000"; botão fantasma "Falar no WhatsApp" (borda branca 50%; hover fundo branco + texto `#4A6B7C`).

Perguntas: início das inscrições · cursos oferecidos · horário de atendimento · idade mínima · custo · "Já fiz minha pré-inscrição, o que faço agora?" · documentos · endereço da escola. Textos completos em `telas/Duvidas.dc.html`, constante `FAQS`.

---

## Interactions & Behavior

### Navegação
- Sidebar: 5 destinos; item ativo por rota. Breadcrumb no header reflete a rota.
- "Sair da conta" → Login. "Entrar"/"Criar cadastro" → Início.
- Cards de curso e "Ver o curso" → detalhe do curso (id do curso na rota/URL).
- Pergunta do bloco de FAQ do Início → Dúvidas com aquela pergunta aberta.

### Formulário da pré-inscrição
- 9 etapas; navegação por "Salvar e avançar" / "← Voltar" e por clique direto na lista de etapas.
- Progresso conta **etapas concluídas** (não a atual): 8 de 9 = 89%. Etapas concluídas exibem "✓". Esse número é o mesmo do selo da sidebar — deriva de uma única fonte.
- Última etapa: botão vira "Concluir inscrição" e leva a Acompanhamento.
- Validação a especificar no backend/API: obrigatórios sinalizados com `*`; máscaras esperadas — CPF `000.000.000-00`, RG `00.000.000-0`, CEP `00000-000`, telefone `+55 (00) 00000-0000`, data `DD/MM/AAAA`. Erro de campo: borda e mensagem em `#B85C4F` (padrão a definir junto ao design system do codebase).

### Convocação da prova
Somente leitura — quem define data, horário, local e sala é a secretaria. Não existe seleção de horário pelo candidato. Estados a tratar na implementação: **sem convocação ainda** (pré-inscrição incompleta → mostrar a pendência) e **convocação emitida** (mostrar os 4 campos + comprovante).

### Hover / foco
- Botão primário: `#20304F` → `#17233C`.
- Botão fantasma areia: borda+texto areia → fundo areia + texto `#20304F`.
- Botão fantasma branco: borda branca → fundo branco + texto `#4A6B7C`.
- Cards clicáveis: borda `#E2E0D9` → `#20304F`.
- Linhas de FAQ / lista de etapas: fundo `#FAF9F6` / `#EDEAE3`.
- Itens da sidebar: texto branco 72% → 100%.
- Inputs do login: borda inferior `#D6D3CB` → `#20304F` no foco.
- Todas as transições: `.18s`.

### Responsivo
Três quebras, aplicadas por largura de viewport **e** de container (para funcionar também embutido em molduras estreitas):
- **≤1150px:** grids de 3 colunas → 2; padding de conteúdo `36px 32px 64px`; header `18px 32px`.
- **≤960px:** o shell deixa de ser grid e empilha; a sidebar perde o sticky/100vh e vira uma **faixa superior** com logo + **botão hamburguer de 44×44px** (borda branca 28%, três traços de 1.5px; hover borda areia). Fechado: navegação, rótulo "NAVEGAÇÃO" e rodapé ocultos. Aberto: itens em coluna (padding `15px 20px`) com borda superior branca 12%, e o bloco de atendimento + "Sair da conta" no fim. Todos os grids de 2 colunas colapsam para 1 — incluindo login, hero do Início, `1fr 340px`, `1fr 320px`, `290px 1fr` e as linhas rótulo/campo do formulário (rótulo acima do campo). A coluna de etapas perde o sticky.
- **≤640px:** grids de 3 colunas e os cards de opção de curso viram 1 coluna; header permite `flex-wrap`.
- Títulos usam `clamp()`, escalando continuamente em vez de saltar nas quebras.
- Verificado a 390px: coluna única, sem overflow horizontal, alvos de toque ≥44px.

### Acessibilidade
- Hamburguer com `aria-label` e `aria-expanded`.
- Contraste: branco sobre `#20304F` ≈ 11.5:1; `#333` sobre `#F5F4F1` ≈ 11:1; areia `#C2A46A` sobre `#20304F` ≈ 5.4:1 (use-a em texto de 13px+ ou peso 600). **Evite** areia sobre fundo claro em texto pequeno.
- Estados de foco visíveis são obrigatórios na implementação (o protótipo só define foco nos inputs do login).
- Acordeão do FAQ deve virar `<button aria-expanded>` + região associada.

## State Management
| Estado | Escopo | Transições |
|---|---|---|
| `usuário autenticado` | app | login → Início; "Sair" → Login |
| `etapa atual` (0–8) | Minha inscrição | avançar/voltar/clique na etapa; seed = primeira etapa pendente |
| `etapas concluídas` | app (server) | alimenta barra, "✓" e selo `8/9` da sidebar |
| `filtro de categoria` | Cursos | chips: Todos / Técnico / Qualificação / Inglês |
| `curso selecionado` | rota | id na URL (`?c=inf` no protótipo) |
| `pergunta aberta` | Dúvidas | acordeão exclusivo; aceita índice inicial pela URL (`?q=2`) |
| `menu mobile aberto` | shell | hamburguer; fecha ao navegar |

**Dados esperados da API:** candidato (nome, iniciais, número da inscrição); progresso da pré-inscrição (etapas e valores); opções de curso escolhidas (1ª e 2ª, com período e vagas); convocação (data, horário, local, sala, URL do comprovante); timeline (título, status, descrição); catálogo de cursos (nome, categoria, carga, preço, textos, informações, imagem); FAQ (pergunta, resposta); datas do calendário do vestibular.

## Assets
- **Fontes:** Manrope e JetBrains Mono (Google Fonts). Substituir pela fonte equivalente do design system, se houver.
- **Logo:** ainda **não** aplicado. O protótipo usa um monograma provisório — círculo com a letra "A" — no lugar do símbolo da instituição. Solicitar o arquivo oficial (SVG) e trocar nos dois pontos: sidebar (34px) e painel de login (38px).
- **Fotos de curso:** todas são placeholders listrados. Necessário: 1 imagem por curso em card (≈ 600×264, 2.27:1) e 1 imagem de topo por curso (≈ 1600×500, 3.2:1).
- **Ícones:** nenhum arquivo de ícone é usado; os marcadores são formas CSS (círculos, traços, "+/–", "▾"). Substituir pelo set de ícones do codebase se o padrão de lá exigir.

## Files
```
telas/Login.dc.html            Tela 1 — login / criar cadastro
telas/Inicio.dc.html           Tela 2 — visão geral do candidato
telas/Inscricao.dc.html        Tela 3 — pré-inscrição em 9 etapas
telas/Acompanhamento.dc.html   Tela 4 — cursos escolhidos, timeline, convocação
telas/Cursos.dc.html           Tela 5 — catálogo com filtros
telas/Curso.dc.html            Tela 6 — detalhe do curso
telas/Duvidas.dc.html          Tela 7 — FAQ em acordeão
telas/Preview Mobile.dc.html   Utilitário — as 7 telas em molduras de 390px
telas/support.js               Runtime do protótipo (não é dependência do projeto)
```
Cada arquivo carrega os dados de exemplo no `<script>` ao final (constantes `COURSES`, `STEPS`, `FAQS`, `TIMELINE`) — bons contratos de partida para os tipos da API.
