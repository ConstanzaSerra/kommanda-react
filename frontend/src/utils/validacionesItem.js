export function validarHorarioItem(items, idItem) {
  const elItem = items.find(p => p.id === idItem)
  if (!elItem.disponibleHastaHs < getHora(Date())) {
    throw Error("no se puede, es muy tarde")
  }
}