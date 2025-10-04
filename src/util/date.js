import { format, parseISO } from 'date-fns';

export function agruparHorariosPorDia(datas) {
  return datas.reduce((acc, dataString) => {
    const dataObj = parseISO(dataString);
    const diaKey = format(dataObj, 'yyyy-MM-dd'); // Chave: '2025-10-27'
    const hora = format(dataObj, 'HH:mm');      // Valor: '10:00'

    if (!acc[diaKey]) {
      acc[diaKey] = [];
    }
    acc[diaKey].push(hora);
    return acc;
  }, {});
}

/**
 * Combina um objeto Date (dia) com uma string de horário (HH:mm)
 * e retorna uma string no formato ISO 8601 (padrão UTC).
 *
 * @param {Date} dia - O objeto Date contendo o dia, mês e ano selecionados.
 * @param {string} horario - A string do horário no formato "HH:mm".
 * @returns {string | null} - A data completa em formato ISO string, ou null se a entrada for inválida.
 */
export function formatarAgendamentoParaISO(dia, horario) {
  // 1. Valida se as entradas são válidas
  if (!dia || !horario || typeof horario !== 'string' || !horario.includes(':')) {
    console.error("Entrada inválida. Forneça um objeto Date e um horário no formato 'HH:mm'.");
    return null;
  }

  try {
    // 2. Extrai a hora e os minutos da string de horário
    const [horas, minutos] = horario.split(':').map(Number);

    // 3. Cria uma cópia do objeto de data para não alterar o estado original
    const dataCombinada = new Date(dia);

    // 4. Define o horário na nova data e zera os segundos para consistência
    dataCombinada.setHours(horas);
    dataCombinada.setMinutes(minutos);
    dataCombinada.setSeconds(0);
    dataCombinada.setMilliseconds(0);

    // 5. Retorna a data no formato ISO 8601 (ex: "2025-10-27T14:00:00.000Z")
    return dataCombinada.toISOString();

  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return null;
  }
}