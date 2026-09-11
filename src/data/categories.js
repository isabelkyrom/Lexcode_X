export const CATEGORIES = [
  { id: "educacion", label: "Educación" },
  { id: "salud", label: "Salud" },
  { id: "medioambiente", label: "Medio Ambiente" },
  { id: "seguridad", label: "Seguridad" },
  { id: "economia", label: "Economía" },
  { id: "derechoshumanos", label: "Derechos Humanos" },
];

export const ALL_CATEGORY = { id: "todas", label: "Todas" };

export function getCategoryLabel(categoryId) {
  return CATEGORIES.find((category) => category.id === categoryId)?.label ?? categoryId;
}
