import api from "../base";

export async function getDatasAgendamento() {
  const r = await api().get("/appointments/available-dates");
  return r.data;
}

export async function getAgendamento() {
  const r = await api().get("/appointments/my");
  return r.data;
}

export async function criaAgendamento(dataAgendamento) {
  const r = await api().post("/appointments", { appointmentDateTime: dataAgendamento });
  return r.data;
}