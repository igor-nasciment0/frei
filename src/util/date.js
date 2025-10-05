import { addMinutes, format, parseISO } from "date-fns";

/**
 * Função auxiliar que gera um array de horários das 08:00 às 18:00,
 * com incrementos de 30 minutos.
 * @returns {string[]} Ex: ['08:00', '08:30', ..., '18:00']
 */
function gerarHorariosFixos() {
  const horarios = [];
  const horaInicial = 8;
  const horaFinal = 17;

  for (let hora = horaInicial; hora <= horaFinal; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 30) {
      // Formata a hora e o minuto para terem sempre dois dígitos (ex: 08, 09, 00, 30)
      const horaFormatada = String(hora).padStart(2, '0');
      const minutoFormatado = String(minuto).padStart(2, '0');
      
      horarios.push(`${horaFormatada}:${minutoFormatado}`);
    }
  }
  return horarios;
}

/**
 * Função principal que recebe os dias disponíveis e gera os horários para cada um.
 * @param {string[]} datas - Array de datestrings em UTC (ex: ['2025-10-27T00:00:00.000Z'])
 * @returns {Object} - Objeto com os dias como chave e um array de horários como valor.
 */
export function gerarHorariosParaDiasDisponiveis(datas) {
  // Gera a lista de horários apenas uma vez para otimização
  const horariosDoDia = gerarHorariosFixos();

  return datas.reduce((acc, dataString) => {
    // PONTO CRÍTICO: Lidando com o UTC ('Z')
    // A forma mais segura de garantir que você pegue o dia correto, ignorando o fuso horário,
    // é extrair a data diretamente da string, antes que qualquer biblioteca a interprete.
    // '2025-10-27T00:00:00.000Z' se torna '2025-10-27'.
    const diaKey = dataString.substring(0, 10);

    // Atribui a lista de horários gerada para o dia correspondente
    acc[diaKey] = horariosDoDia;
    
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
    return toLocalISOString(dataCombinada);

  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return null;
  }
}

function toLocalISOString(date) {
  // 1. Pega o desvio de fuso horário em minutos (ex: para UTC-3, retorna 180)
  const offset = date.getTimezoneOffset();
  
  // 2. Cria uma nova data, subtraindo o desvio.
  //    Isso "move" a data para que o UTC dela corresponda ao horário local original.
  const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
  
  // 3. Converte a data ajustada para ISO e remove a parte dos milissegundos e o 'Z'
  return adjustedDate.toISOString().slice(0, 19);
}


export function converterDataUTCParaLocalSemMudarDia(dataStringUTC) {
  if(!dataStringUTC)
    return "";

  // 1. Converte a string UTC para um objeto Date.
  // O objeto Date ainda armazena o valor em UTC, mas métodos como `toString()` o mostrarão no fuso local.
  const dataObj = parseISO(dataStringUTC);

  // 2. Pega o "desvio" de fuso horário do navegador em minutos.
  // Para São Paulo (UTC-3), o valor será 180.
  const offset = dataObj.getTimezoneOffset();

  // 3. Adiciona esses minutos de volta à data. Isso "engana" a conversão,
  // efetivamente tratando a data como se fosse local desde o início.
  const dataAjustada = addMinutes(dataObj, offset);

  // 4. Agora, formata a data ajustada. Ela sairá com o dia correto.
  return format(dataAjustada, 'dd/MM/yyyy');
}

/**
 * Converte uma datestring UTC para o formato AAAA-MM-DD,
 * garantindo que o dia não seja alterado pela conversão de fuso horário.
 * @param {string} dataStringUTC - A data em formato ISO com 'Z'.
 * @returns {string} - A data formatada como 'AAAA-MM-DD'.
 */
export function formatarParaInputDate(dataStringUTC) {
  if (!dataStringUTC) return ''; // Retorna vazio se a data for nula

  const dataObj = parseISO(dataStringUTC);
  const offset = dataObj.getTimezoneOffset();
  const dataAjustada = addMinutes(dataObj, offset);
  
  return format(dataAjustada, 'yyyy-MM-dd');
}
