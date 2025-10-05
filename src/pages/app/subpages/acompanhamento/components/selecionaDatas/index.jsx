import React, { useState, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { gerarHorariosParaDiasDisponiveis, formatarAgendamentoParaISO } from '../../../../../../util/date';

import './index.scss';
import { Select, SelectItem } from '../../../../../../components/select';

export function SeletorDeAgendamento({ datasDisponiveis, confirmar }) {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState('');

  const horariosAgrupados = useMemo(() => gerarHorariosParaDiasDisponiveis(datasDisponiveis), [datasDisponiveis]);

  const diasDisponiveis = Object.keys(horariosAgrupados).map(diaStr => parse(diaStr, 'yyyy-MM-dd', new Date()));

  const horariosDoDiaSelecionado = diaSelecionado ? horariosAgrupados[format(diaSelecionado, 'yyyy-MM-dd')] : [];

  const handleSelecaoDia = (dia) => {
    setDiaSelecionado(dia);
    setHorarioSelecionado(''); // Limpa o horário ao trocar de dia
  };

  const handleSelecaoHorario = (horario) => {
    setHorarioSelecionado(horario);
  };

  const modifiers = {
    disponivel: diasDisponiveis,
  };

  const modifiersStyles = {
    disponivel: {
      color: '#007bff',
      fontWeight: 'bold',
    },
  };

  return (
    <div className='seletor-de-agendamento'>
      <h3>Escolha um dia e horário:</h3>
      <DayPicker
        mode="single"
        selected={diaSelecionado}
        onSelect={handleSelecaoDia} // Remove onDayClick
        locale={ptBR}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        disabled={(date) => !diasDisponiveis.some(availableDate =>
          format(availableDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        )}
        fromDate={new Date()} // Substitui hidden before
        className="responsive-daypicker" // Classe para estilos mobile
      />

      {diaSelecionado &&

        (
          <div className='horarios'>
            <p>Selecione um horário para {format(diaSelecionado, 'dd/MM/yyyy')}: </p>
            <div>
              <Select
                placeholder="Selecione um horário..."
                dropIcon="/assets/images/icons/angulo.svg"
                value={horarioSelecionado}
                onChange={handleSelecaoHorario}
              >
                {horariosDoDiaSelecionado.map((horario, index) => (
                  <SelectItem key={index} value={horario}>{horario}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        )
      }

      {horarioSelecionado && (
        <div className='confirmar'>
          <button onClick={() => confirmar(formatarAgendamentoParaISO(diaSelecionado, horarioSelecionado))}>
            Confirmar Agendamento
          </button>
        </div>
      )}
    </div>
  );
}