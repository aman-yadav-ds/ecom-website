export const CATEGORY_FILTERS: Record<string, string[]> = {
  "Tractor Attachments": ["Brand", "Model", "Working Width", "Machine Weight", "Blades Type"],
  "Self Propelled Machinery": ["Brand", "Model", "Engine Type", "Material", "Machine Weight"],
  "Food Processing Units": ["Brand", "Model", "Material", "Machine Weight"],
  "Lubricants": ["Brand", "Type"],
  "Hand Tools": ["Brand", "Material", "Machine Weight"],
};

export const ALLOWED_FILTERS = [
  "Brand",
  "Model",
  "Engine Type",
  "Blades Type",
  "Carry Type",
  "Material",
  "Working Width",
  "Machine Weight",
];
