import { useForm } from 'react-hook-form';
import './index.scss';

export default function Inscricao() {

  const { register, handleSubmit } = useForm();

  return (
    <section className='inscricao'>
        <h3>Minha Pré-Inscrição</h3>

        <table className="tabela-form">
          <tbody>
            <tr>
              <td className="label">Carga Horária</td>
              <td className="input">
                
              </td>
            </tr>
            <tr>
              <td className="label">Idade Mínima/Máxima</td>
              <td className="input">

              </td>
            </tr>
            <tr>
              <td className="label">Escolaridade mínima</td>
              <td className="input">
              </td>
            </tr>
            <tr>
              <td className="label">Contribuição mensal</td>
              <td className="input">
              </td>
            </tr>
            <tr>
              <td className="label">Períodos</td>
              <td className="input">

              </td>
            </tr>
          </tbody>
        </table>
    </section>
  )
}
