const tractorAttachmentFilters = [
  "Tractor HP",
  "Attachment Type",
  "Working Width",
  "Machine Weight",
  "PTO Input",
  "Blades Type",
  "Number of Discs"
];

const selfPropelledFilters = [
  "Engine Power",
  "Machinery Type",
  "Displacement",
  "Machine Weight",
  "Drive System",
  "Engine Type",
  "Transmission Type"
];

const foodProcessingFilters = [
  "Processing Type",
  "Capacity",
  "Motor Power",
  "Operation Speed",
  "Machine Weight",
  "Power Source"
];

const lubricantFilters = [
  "Viscosity Grade",
  "Fluid Type",
  "Container Volume",
  "Application",
  "API Rating"
];

const handToolFilters = [
  "Tool Type",
  "Blade Steel",
  "Handle Material",
  "Cutting Capacity",
  "Finish / Coating"
];

export const CATEGORY_FILTERS: Record<string, string[]> = {
  "Tractor Attachments": tractorAttachmentFilters,
  "tractor-attachments": tractorAttachmentFilters,
  "Self Propelled Machinery": selfPropelledFilters,
  "self-propelled-machinery": selfPropelledFilters,
  "Food Processing Units": foodProcessingFilters,
  "food-processing-units": foodProcessingFilters,
  "Lubricants": lubricantFilters,
  "lubricants": lubricantFilters,
  "Hand Tools": handToolFilters,
  "hand-tools": handToolFilters,
};

export const ALLOWED_FILTERS = [
  "Tractor HP",
  "Attachment Type",
  "Working Width",
  "Engine Power",
  "Machinery Type",
  "Displacement",
  "Processing Type",
  "Capacity",
  "Motor Power",
  "Viscosity Grade",
  "Fluid Type",
  "Container Volume",
  "Tool Type",
  "Blade Steel",
  "Machine Weight"
];
