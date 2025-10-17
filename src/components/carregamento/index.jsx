import './index.scss';

export default function Carregamento({ style }) {
  return (
    <div className="carregamento" style={style}>
      <img src="/assets/images/loading.svg" alt="" />
    </div>
  )
}