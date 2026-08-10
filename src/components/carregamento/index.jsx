import './index.scss';

export default function Carregamento({ style }) {
  return (
    <div className="carregamento" style={style}>
      <div className="spinner" />
    </div>
  )
}
