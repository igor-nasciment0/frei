import './index.scss';

// Painel de marca institucional compartilhado pelas telas públicas (Login, Cadastro,
// Recuperar/Trocar Senha) — só o Login tem protótipo próprio (Login.dc.html); as demais
// estendem o mesmo padrão visual, por decisão de produto.
export default function PainelInstitucional() {
  return (
    <div className="painel-institucional">
      <div className="topo">
        <span className="monograma">A</span>
        <div>
          <p className="eyebrow">Ação Social</p>
          <p className="sub">Nossa Senhora de Fátima</p>
        </div>
      </div>

      <div className="meio">
        <div className="filete" />
        <h1>Pré-inscrições<br /><span>2026</span></h1>
        <p>Preencha sua ficha, escolha o curso e acompanhe todo o processo seletivo em um só lugar.</p>
      </div>

      <div className="stats">
        <div>
          <span className="numero">12</span>
          <span className="rotulo">Cursos</span>
        </div>
        <div>
          <span className="numero">64</span>
          <span className="rotulo">Anos de história</span>
        </div>
      </div>
    </div>
  );
}
