# Componentes do Projeto — Frei Online

Catálogo de todos os componentes React do projeto, organizados por onde vivem: compartilhados (`src/components`), utilitários/hooks (`src/util`) e componentes locais de página (dentro de `src/pages/**/componentes|components`).

## Compartilhados — `src/components`

### `AcordeaoPerguntas` (`acordeao_perguntas/index.jsx`)
Lista de perguntas frequentes em formato acordeão (um item aberto por vez, controlado por índice `selecionada`).
- **Props:** `max` (número opcional) — limita quantas perguntas são exibidas (usado na Home com `max={5}`; na página FAQ é usado sem limite).
- Busca as perguntas via `callApi(getFAQ)` em `useEffect`; filtra só as `isActive` e ordena por `order`.
- Cada pergunta renderiza `p.order`. Pergunta e `formatarComoHTML(p.answer)` (resposta pode conter HTML).
- Clique no cabeçalho da pergunta expande/recolhe (classe `selecionada`).
- Existe um arquivo irmão `perguntas.js` com um array mockado de perguntas/respostas — não é mais importado por `index.jsx` (dados reais vêm da API); parece ser resquício/mock antigo.

### `BarraLateral` (`barra_lateral/index.jsx`)
Sidebar de navegação principal do layout autenticado (`App`).
- Usa `useMediaQuery("screen and (max-width: 768px)")` para decidir entre `BarraMobile` (drawer) e `BarraPadrao` (fixa).
- **`BarraMobile`**: mantém estado `aberta`; expõe um `<button id="Button___openSideBar" style={{display:'none'}}>` que outros componentes (o `Cabecalho`) acionam via `document.getElementById(...).click()` para abrir o drawer sem precisar de estado compartilhado. Fecha automaticamente ao clicar fora (`useClickOutside`) ou ao mudar de rota (`useLocation`).
- **`BarraPadrao`**: renderiza o logo, (no mobile) botão de fechar, e a lista de links via `LinkLateral`.
- **`LinkLateral({ para, titulo, icone })`**: item de navegação com `useMatch(para)` para aplicar classe `selecionado`; ícone carregado de `/assets/images/icons/{icone}.svg`.
- Links fixos: Início (`/`), Inscrição (`/inscricao`), Acompanhamento (`/acompanhamento`), Cursos (`/cursos`), FAQ (`/faq`).

### `Cabecalho` (`cabecalho/index.jsx`)
Header do layout autenticado.
- Em `useEffect`, verifica `get("token")`; se ausente, `navigate("/login")` (guarda redundante além da que existe em `App`).
- Mostra nome do usuário logado (`get("user")`) e status estático "Online"; ao clicar, abre menu com opção **Sair** (`logout`: remove `token`/`user` do local-storage e navega para `/login`).
- Em telas mobile, mostra botão de menu (ícone hambúrguer) que aciona a abertura do drawer da `BarraLateral` via clique programático no botão oculto `Button___openSideBar`.
- Usa `useClickOutside` para fechar o menu do usuário ao clicar fora.

### `Carregamento` (`carregamento/index.jsx`)
Spinner de carregamento simples (`<img src="/assets/images/loading.svg">`).
- **Props:** `style` (objeto CSS opcional aplicado ao container) — usado, por exemplo, com `{ height: '100dvh' }` para tela cheia em `App` e sem `style` como carregamento inline (ex.: lista de cursos).

### Modal (`modal/`)
Sistema de modal global.
- **`context.js`**: `ModalContext` (`createContext()`), sem valor padrão.
- **`ModalProvider`** (`index.jsx`): provider que deve envolver toda a aplicação (feito em `main.jsx`, fora do `BrowserRouter`).
  - Estado: `modalContent` (nó React a renderizar dentro do modal), `isOpen`, `closeCallback`.
  - Ao abrir (`openModal({ customUI, onCloseCallback })`): chama `customUI(closeModal)` — ou seja, o conteúdo do modal já recebe a função de fechamento pronta para uso — e guarda `onCloseCallback` para executar quando o modal for fechado.
  - Ao fechar (`closeModal`): adiciona a classe `Modal___Closing` no elemento `#Modal__Overlay` (dispara animação de saída via CSS), aguarda 200ms (`sleep`), só então desmonta o conteúdo e executa `closeCallback`, se houver.
  - Fecha automaticamente ao clicar fora do conteúdo (`useClickOutside` no wrapper interno).
  - Enquanto o modal está aberto, adiciona `Overflow__Hidden` no `<body>` para travar o scroll da página.
  - Expõe `{ openModal, isOpen }` via `ModalContext.Provider`.
- **`useModal()`** (`src/util/useModal.js`): hook de conveniência (`useContext(ModalContext)`), usado hoje só pelo `SeletorDeAgendamento` (fluxo de agendamento da prova).
- Único consumidor no app hoje: `Agendamento` (dentro da timeline de acompanhamento) abre o modal com `SeletorDeAgendamento`.

### `Select` / `SelectItem` (`select/index.jsx`)
Wrapper de campo de seleção usado em todos os formulários do app.
- Implementação atual: `<select>`/`<option>` nativos do HTML (props: `defaultValue`, `value`, `disabled`, `onChange(valorString)`, `children`, `className`, `placeholder` — a primeira `<option>` é sempre o placeholder, desabilitada e oculta).
- Há uma implementação alternativa **comentada** no mesmo arquivo usando `@radix-ui/react-select` (Root/Trigger/Value/Icon/Content/Viewport), incluindo suporte a `dropIcon` customizado — indica migração planejada/pausada para um select estilizado, mantendo a mesma API pública (`Select`/`SelectItem`) para não quebrar os formulários que já a consomem.
- `SelectItem({ disabled, onClick, value, children, className })` hoje só repassa para `<option>` (props `disabled`/`className` do wrapper Radix ficariam órfãs na versão nativa).

### `ToasterContainer` (`toaster_container/index.jsx`)
Wrapper de `react-hot-toast`'s `<Toaster />`, instanciado localmente em cada página que precisa de toasts (não é global em `main.jsx`).
- **Props:** `props` (objeto opcional repassado ao `Toaster`; default `position: 'bottom-center'`, `reverseOrder`, `toastOptions: { duration: 3000 }`, `containerClassName: 'cont-toaster'`).
- Em `useEffect` reagindo a `location.pathname`, chama `toast.remove()` — limpa toasts pendentes ao trocar de rota.
- Usado em: `Inscricao`, `Acompanhamento`, `Login`, `Cadastro`, `RecuperarSenha`, `TrocarSenha`.

## Hooks e utilitários (`src/util`)

- **`useClickOutside(ref, callback)`** — dispara `callback` em `mousedown`/`touchstart` fora do elemento referenciado. Usado em: sidebar mobile, menu do usuário no cabeçalho, modal.
- **`useMediaQuery(query)`** — wrapper de `window.matchMedia`; retorna `null` até a primeira resolução (evita flash de layout errado no SSR/primeira renderização), depois `true`/`false` reativo.
- **`useModal()`** — ver seção Modal acima.
- **`date.js`** — funções puras de data/hora (sem componente): `gerarHorariosParaDiasDisponiveis`, `formatarAgendamentoParaISO`, `converterDataUTCParaLocalSemMudarDia`, `formatarParaInputDate` (ver detalhes em `architecture.md`).
- **`form.js`** — `generateFormData(json)`: converte um objeto plano em `FormData` (usado nos payloads de login/cadastro).
- **`general.js`** — `sleep(ms)`, `mergeObjects(target, source)` (merge profundo respeitando tipos, via lodash `cloneDeep`), `testState(current, model, optional)` (validação recursiva de preenchimento de um objeto de estado contra um "modelo" de campos obrigatórios).
- **`string.jsx`** — `formatarData(stringData)` (data curta via `toLocaleDateString`), `formatarComoHTML(texto)` (parseia string HTML com `DOMParser` e retorna `<span dangerouslySetInnerHTML>`), `corrigeURLVideo(url)` (normaliza links do YouTube — padrão `youtu.be` ou `youtube.com/watch` — para o formato `embed`, preservando `?list=`).

## Componentes locais de página

### `src/pages/app/subpages/inscricao/componentes/` (formulário de inscrição)

- **`input.jsx`** (`Input`) — célula `<td>` de tabela de formulário, componente genérico de campo:
  - **Props:** `as` (componente de input a renderizar, default `'input'`; usado com `IMaskInput` para campos mascarados), `name`, `children`, `ref`, demais props repassadas ao componente.
  - Usa `useFormContext()` para ler `errors` e exibir mensagem de erro (`encontraErro`, também exportado) acima do campo.
  - Inclui correção para o bug de autofill do navegador: escuta `onAnimationStart` de uma animação chamada `onAutoFillStart` (definida no CSS) e força `onChange` com o valor atual — necessário porque o Chrome não dispara eventos normais de input em autofill.
  - `encontraErro(errors, name)` — resolve erro de campo aninhado a partir de um `name` com notação de ponto (`"address.cep"` → `errors.address.cep`).

- **`formCursos.jsx`** (`FormularioCursos`) — último "passo" do fluxo de inscrição (fora do wizard de dados pessoais): seleção de 1ª e 2ª opção de curso + horário.
  - Carrega lista de cursos (`getCursos`) e, se o usuário já tiver inscrição (`getInscricao`), pré-popula os `Select`s com os cursos/horários já escolhidos e busca os horários correspondentes.
  - Regra de negócio: não permite que 1ª e 2ª opção sejam exatamente o mesmo par curso+horário — ao detectar conflito, limpa a opção conflitante e mostra erro inline (`erro`, exibido em linha própria da tabela). Há um bloco de regra comentado (exigência de 2ª opção fora de cursos "Teens") que está desativado no momento.
  - Ao confirmar (`criaInscricao`), dispara barra de progresso (`react-top-loading-bar`), toast de sucesso e navega para `/acompanhamento` após 1s.

- **`formDados.jsx`** — oito componentes de formulário, um por "passo" do wizard de inscrição, todos consumindo o mesmo `useFormContext()` compartilhado (via `FormProvider` em `Inscricao`) e recebendo `{ avancar, retornar }`:
  - `FormularioDadosPessoais` — nome, telefone (máscara `+55 (00) 00000-0000`), gênero (`Select` com opções de `selects.js`).
  - `FormularioEndereco` — CEP (máscara, com `onBlur` disparando `getEnderecoCompleto` para autopreencher rua/bairro/cidade/UF via ViaCEP), rua, bairro, cidade, estado (máscara 2 letras maiúsculas), número, complemento (opcional).
  - `FormularioNascimento` — data, cidade, estado (máscara UF), país.
  - `FormularioRG` — CPF (máscara `000.000.000-00`), número do RG, data de emissão (validação `min` de `01/01/1900`), órgão emissor.
  - `FormularioResponsavelPrimario` — dados da mãe (nome, e-mail, telefone, telefone secundário); campo `relationship` fixado/desabilitado como "Mãe" (`Select disabled`).
  - `FormularioResponsavelSecundario` — mesmos campos do responsável primário, mas `relationship` livre (lista `parentesco`).
  - `FormularioEscolar` — escola atual, série atual (`Select` com `escolaridades`), tipo de escola (`Select` com `tipoEscola`).
  - `FormularioInformacoesGerais` — como conheceu o instituto (`Select`), renda mensal familiar (campo mascarado como moeda BRL via `IMaskInput` com `mask={Number}`), pessoas em casa, pessoas trabalhando.
  - Cada formulário é uma `<table className="tabela-form">`; footer com botão "Retornar" (exceto no primeiro passo) e "Avançar", que chama `avancar([...nomes dos campos])` — o componente pai decide se valida (`methods.trigger`) e avança de passo ou submete.

- **`padroes.js`** — objeto com a "forma"/valores-padrão (todos strings vazias) de todo o formulário de inscrição; usado como base para `mergeObjects` (preenche com dados já existentes do usuário) e como "modelo" para `testState` (validação de obrigatoriedade antes do submit final).
- **`selects.js`** — arrays de opções estáticas usados pelos `Select`s do formulário: `genero`, `parentesco`, `comoConheceu`, `estadosBrasileiros` (não usado atualmente nos formulários, que preferem input mascarado de UF), `escolaridades`, `tipoEscola`.

### `src/pages/app/subpages/acompanhamento/components/`

- **`linhaTempo/linhaTempo.jsx`** (`Timeline`, exportado como default; arquivo/pasta chamados de "linhaTempo") — monta a timeline de 5 etapas do processo seletivo do candidato: Pré-inscrição → Agendamento → Concluir Inscrição → Vestibular → Resultado. Busca o agendamento do usuário (`getAgendamento`) e recebe `statusVestibular` via `useOutletContext()`. `TimelineItem` é o item visual de cada etapa (aplica classe `agendamento-pendente` quando a etapa "Agendamento" ainda não tem data marcada).
- **`linhaTempo/dadosLinha.jsx`** — conteúdo textual/interativo de cada etapa da timeline (todos exportados nomeados):
  - `PreInscricao` — mensagem estática de sucesso (a etapa em si só existe se o usuário chegou até a timeline).
  - `Agendamento({ dataAgendada, alteravel })` — se já há data agendada, mostra data/hora e (se `alteravel`) botão "Alterar agendamento"; senão, botão "Realizar agendamento". Ambos abrem o modal global com `SeletorDeAgendamento`, passando `agendar` (chama `criaAgendamento`, toast de sucesso e `window.location.reload()` após 2s) como callback de confirmação.
  - `ConcluirInscricao({ dataAgendada, realizado })` — instruções para comparecimento presencial (endereço fixo do instituto, valor da inscrição R$ 40,00, documentos necessários) ou confirmação se `realizado`.
  - `ProvaVestibular({ realizado, dadosInscricao })` — instruções da prova (data/horário/sala quando disponíveis) ou confirmação de aplicação.
  - `Resultado({ realizado, dataPublicacao, urlResultado, mostrarUrl })` — mostra link do resultado quando disponível, ou data prevista de divulgação (e link antecipado se `mostrarUrl` estiver habilitado pelo backend).
  - Todas usam `converterDataUTCParaLocalSemMudarDia` para exibir datas.

- **`selecionaDatas/index.jsx`** (`SeletorDeAgendamento`) — conteúdo do modal de agendamento/reagendamento da prova.
  - **Props:** `datasDisponiveis` (array de datas ISO vindas da API), `confirmar(dataISO)` (callback).
  - Usa `react-day-picker` (`DayPicker`, locale `ptBR`) para seleção de dia, restringindo dias selecionáveis aos presentes em `datasDisponiveis` (via `disabled`) e destacando-os visualmente (`modifiers`/`modifiersStyles`).
  - Ao selecionar um dia, gera a lista de horários fixos daquele dia (`gerarHorariosParaDiasDisponiveis`) e exibe um `Select` de horários.
  - Ao escolher horário, mostra botão "Confirmar Agendamento" que chama `confirmar(formatarAgendamentoParaISO(dia, horario))`.

## Componentes de página (top-level, um por rota)

Não são "componentes reutilizáveis" no sentido estrito, mas compõem a UI de cada tela — documentados com mais detalhe de fluxo/regra de negócio em `features-usecases.md`:

- `App` (`pages/app`) — shell autenticado (sidebar + header + outlet), guarda de sessão, carrega status do vestibular.
- `Inicio` (`pages/app/subpages/inicio`) — dashboard/boas-vindas, aviso de agendamento pendente, anúncio de status das inscrições (`Anuncio`/`BotaoAnuncio`, internos ao arquivo), atalhos e FAQ resumido.
- `Cursos` (`pages/app/subpages/cursos`) — grade de cursos com filtro por tipo (+ filtro especial "Inglês" baseado no nome), `CardCurso` (interno) carrega a imagem do curso sob demanda como blob.
- `DetalhesCurso` (`pages/app/subpages/cursos/detalhes`) — ficha completa de um curso (descrição, tabela de informações, mercado de trabalho opcional), com skeletons de carregamento.
- `FAQ` (`pages/app/subpages/faq`) — página dedicada, reaproveita `AcordeaoPerguntas` sem limite.
- `Inscricao` (`pages/app/subpages/inscricao`) — orquestra o wizard de formulário de dados pessoais + seleção de curso.
- `Acompanhamento` (`pages/app/subpages/acompanhamento`) — resumo da inscrição (1ª/2ª opção) + `Timeline`.
- `Login`, `Cadastro`, `RecuperarSenha`, `TrocarSenha` (`pages/login`, `pages/cadastro`, `pages/recuperar-senha`, `pages/trocar-senha`) — telas públicas, todas com o mesmo layout visual de dois painéis (formulário à esquerda, logo/branding à direita).
