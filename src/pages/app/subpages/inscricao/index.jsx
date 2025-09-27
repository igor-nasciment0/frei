import { Controller, useForm } from 'react-hook-form';
import './index.scss';
import { Select, SelectItem } from '../../../../components/select';

export default function Inscricao() {

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      firstChoiceCourseCode: 0,
      firstChoicePeriodCode: 0,
      secondChoiceCourseCode: 0,
      secondChoicePeriodCode: 0
    }
  });

  return (
    <section className='inscricao'>
      <h3>Minha Pré-Inscrição</h3>

      <form action="">
        <table className="tabela-form">
          <tbody>
            <tr>
              <td className="label obrigatorio">Primeira Opção de Curso</td>
              <td className="input">
                <Controller
                  name='firstChoiceCourseCode'
                  control={control}
                  render={({ field }) => (
                    <Select dropIcon="/assets/images/icons/angulo.svg" placeholder={"asdjlaksjdl"} value={field.value} onChange={field.onChange}>
                      <SelectItem value={"1"}>asdasd</SelectItem>
                    </Select>
                  )}
                >
                </Controller>
              </td>
            </tr>
            <tr>
              <td className="label obrigatorio">Horário para a Primeira Opção</td>
              <td className="input">
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="label obrigatorio">Segunda Opção de Curso</td>
              <td className="input">
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td className="label obrigatorio">Horário Opção de Curso</td>
              <td className="input">
                <input type="text" />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className='submit'>
              <td>
                <input type="submit" value="Registrar" />
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </section>
  )
}
