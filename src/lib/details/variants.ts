import { Variant } from "../types";

export const exampleVariants: Variant[] = [
  // Harrow
  {
    id: "ko-raino-disc",
    name: "KO-RAINO",
    productId: "ko-harrow-raino",
    images: ["/products/harrrow.webp"],
    price: "85000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KO-RAINO",
      "Disc Size (Diameter)": "24 Inches",
      "Concavity": "100 mm to 300 mm",
      "Disc Weight": "9 Kg",
      "Angle Frame Use": "90*90*10 mm",
      "Support Angle Frame Use": "90*90*10 mm",
      "Machine Weight": "465 Kg",
      "Bearing Size (3 side)": "539 number",
      "Bearing Size (1 side)": "6310 number",
      "Spacer spool weight": "4 kg",
      "Number of Discs": "7*7, 8*8, 9*9 & 10*10",
      "Center Tube": "2\" C Class Pipe"
    }
  },
  // Rotavator
  {
    id: "ko-kobra-6ft",
    name: "KOS-KOBRA 6 FT",
    productId: "ko-rotavator",
    images: ["/products/rotavator.png"],
    price: "115000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KOS-KOBRA 6 FT",
      "Change Gear": "19-17",
      "Rotor RPM": "224 RPM",
      "Tractor HP": "40+",
      "Total Width": "204 CM or 80 Inches",
      "Working Width": "188 CM or 74 Inches",
      "Machine Weight": "405 Kgs",
      "Blades Type": "L Type",
      "Number of Blades": "42L / 54L / 72J Type",
      "PTO Input": "540 RPM"
    }
  },
  {
    id: "ko-chitah-7ft",
    name: "KOP-CHITAH 7 FT",
    productId: "ko-rotavator",
    images: ["/products/rotavator.png"],
    price: "125000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KOP-CHITAH 7 FT",
      "Change Gear": "19-17",
      "Rotor RPM": "224 RPM",
      "Tractor HP": "55+",
      "Total Width": "225 CM or 88 Inches",
      "Working Width": "210 CM or 83 Inches",
      "Machine Weight": "458 Kgs",
      "Blades Type": "L Type",
      "Number of Blades": "48L / 66L / 78J Type",
      "PTO Input": "540 RPM"
    }
  },
  // Power Weeder
  {
    id: "ko-1080",
    name: "KO-1080 DHURANDHAR",
    productId: "ko-weeeder-dhurandhar",
    images: ["/products/power-weeder-dhurandhar.webp"],
    price: "45000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KO-1080 DHURANDHAR",
      "Engine Model": "170F Gasoline",
      "Engine Type": "Single Cylinder, Four Stroke, Air Cooled",
      "Engine Power": "7 HP",
      "Displacement": "212 CC",
      "Starting System": "Manual / Recoil Start",
      "Machine Weight": "90 Kg",
      "Transmission Type": "Gear Driven",
      "Number of Blades": "32 Blades",
      "No. of Gears": "2F+1R",
      "Tyre Size": "4.00-8 Tube Less",
      "Tool Kit": "Available",
      "SUIC Centralized Code": "Lesar Cutting",
      "Main Clutch": "Friction Clutch",
      "Tilling Depth": "5-8 Inches"
    }
  },
  {
    id: "ko-1110",
    name: "KO-1110 VIJAY",
    productId: "ko-weeder-vijay",
    images: ["/products/power-weeder-vijay.webp"],
    price: "48000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KO-1110 VIJAY",
      "Engine Model": "177F Gasoline",
      "Engine Type": "Single Cylinder, Four Stroke, Air Cooled",
      "Engine Power": "7.8 HP",
      "Displacement": "270 CC",
      "Starting System": "Manual / Recoil Start",
      "Machine Weight": "102 Kg",
      "Transmission Type": "Gear Driven",
      "Number of Blades": "32 Blades",
      "No. of Gears": "2F+1R",
      "Tyre Size": "4.00-8 Tube Less",
      "Tool Kit": "Available",
      "SUIC Centralized Code": "Lesar Cutting",
      "Main Clutch": "Friction Clutch",
      "Tilling Depth": "5-8 Inches"
    }
  },
  // Power Reaper
  {
    id: "ko-1260",
    name: "KO-1260 KHET SHAKTI",
    productId: "ko-pr-khetshakti",
    images: ["/products/power-reaper.webp"],
    price: "120000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KO-1260 KHET SHAKTI",
      "Engine Type": "Single Cylinder, Four Stroke, Air Cooled",
      "Engine Model": "170F",
      "Displacement": "212 CC",
      "Engine Power": "7 HP",
      "Rated Speed": "3600 RPM",
      "Fuel Tank Capacity": "3.6 L",
      "Productivity": "1.2-1.6 hr/Acre",
      "Cutting Width": "1200 mm",
      "Plant Height": "50-150 mm",
      "Stubble Height": "<50 mm",
      "Machine Weight": "170 Kg"
    }
  },
  // Brush Cutter
  {
    id: "ko-bc-jpro-sp",
    name: "KO-1350 JUGLE PRO (Side Pack)",
    productId: "ko-bc-jpro",
    images: ["/products/brushcutter.webp"],
    price: "15000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KO-1350 JUGLE PRO",
      "Engine Type": "Single Cylinder, Four Stroke, Air Cooled",
      "Engine Model": "JX35",
      "Displacement": "35.8 CC",
      "Engine Power": "1.0 Kw / 7000 rpm",
      "Carburator": "Diafragm-type",
      "Fuel Tank Capacity": "630 ml",
      "Engine Oil Capacity": "80 ml",
      "Carry Type": "Side Pack",
      "Shaft Type": "Aluminium Tube",
      "Shaft Pipe Diameter": "28 mm",
      "Shaft Pipe Thickness": "2 mm",
      "Shaft Teeth": "9 teeth"
    }
  },
  {
    id: "ko-bc-jpro-bp",
    name: "KO-1350 BP JUNGLE PRO (Back Pack)",
    productId: "ko-bc-jpro",
    images: ["/products/brushcutter.webp"],
    price: "16000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KO-1350 BP JUNGLE PRO",
      "Engine Type": "Single Cylinder, Four Stroke, Air Cooled",
      "Engine Model": "JX35",
      "Displacement": "35.8 CC",
      "Engine Power": "1.0 Kw / 7000 rpm",
      "Carburator": "Diafragm-type",
      "Fuel Tank Capacity": "630 ml",
      "Engine Oil Capacity": "80 ml",
      "Carry Type": "Back Pack",
      "Shaft Type": "Aluminium Tube",
      "Shaft Pipe Diameter": "28 mm",
      "Shaft Pipe Thickness": "2 mm",
      "Shaft Teeth": "9 teeth"
    }
  },
  // Pulveriser
  {
    id: "ko-pulv-1170",
    name: "KO-1170 GRAH LAXMI",
    productId: "ko-pulveriser",
    images: ["/products/Pulverizer.webp"],
    price: "25000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KO-1170 GRAH LAXMI",
      "Motor Power": "3 HP (Electric)",
      "Grinding Capacity": "25 - 35 Kg Per hour",
      "Electricity": "220V & Single Phase",
      "Power Use": "2 - 2.5 Units per hour",
      "Speed": "1140 RPM or 2800 RPM",
      "Machine Weight": "90 Kg",
      "Material": "SS or MS"
    }
  },
  // MINI Rice Mill
  {
    id: "ko-ricemill-1080",
    name: "KO-1080 DHAN LAXMI",
    productId: "ko-ricemill",
    images: ["/products/mini-rice-mill.png"],
    price: "35000.00",
    applicableGst: "5",
    technicalDetails: {
      "Brand": "Koreva",
      "Model": "KO-1080 DHAN LAXMI",
      "Motor Power": "3 HP",
      "Production Capacity": "100-120 Kg",
      "Electricity": "220V & Single Phase",
      "Power Use": "2 - 2.5 Units per hour",
      "Speed": "1140 RPM or 2800 RPM",
      "Machine Weight": "60 Kg",
      "Material": "SS or MS"
    }
  },
  // STOU Lubricants
  {
    id: "ko-stou-5l",
    name: "KOREVA STOU 15W-40 (5L Can)",
    productId: "ko-stou-15w40",
    images: ["/products/power-weeder-dhurandhar.webp"],
    price: "2450.00",
    applicableGst: "18",
    technicalDetails: {
      "Brand": "Koreva",
      "Viscosity Grade": "15W-40",
      "API Rating": "API CJ-4 / GL-4",
      "Container Volume": "5 Litre Can",
      "Application": "Engine, Transmission, Hydraulics & Wet Brakes",
      "Base Oil": "Premium Semi-Synthetic",
      "Pour Point": "-33°C",
      "Flash Point": "228°C"
    }
  },
  {
    id: "ko-stou-20l",
    name: "KOREVA STOU 15W-40 (20L Bucket)",
    productId: "ko-stou-15w40",
    images: ["/products/power-weeder-dhurandhar.webp"],
    price: "8900.00",
    applicableGst: "18",
    technicalDetails: {
      "Brand": "Koreva",
      "Viscosity Grade": "15W-40",
      "API Rating": "API CJ-4 / GL-4",
      "Container Volume": "20 Litre Bucket",
      "Application": "Engine, Transmission, Hydraulics & Wet Brakes",
      "Base Oil": "Premium Semi-Synthetic",
      "Pour Point": "-33°C",
      "Flash Point": "228°C"
    }
  },
  {
    id: "ko-stou-210l",
    name: "KOREVA STOU 15W-40 (210L Drum)",
    productId: "ko-stou-15w40",
    images: ["/products/power-weeder-dhurandhar.webp"],
    price: "82000.00",
    applicableGst: "18",
    technicalDetails: {
      "Brand": "Koreva",
      "Viscosity Grade": "15W-40",
      "API Rating": "API CJ-4 / GL-4",
      "Container Volume": "210 Litre Drum",
      "Application": "Commercial Fleet & Large Farms",
      "Base Oil": "Premium Semi-Synthetic",
      "Pour Point": "-33°C",
      "Flash Point": "228°C"
    }
  },
  // 4T Agro Lubricants
  {
    id: "ko-4t-1l",
    name: "KOREVA 4T AGRO 20W-50 (1L Bottle)",
    productId: "ko-4t-agro-20w50",
    images: ["/products/power-weeder-vijay.webp"],
    price: "420.00",
    applicableGst: "18",
    technicalDetails: {
      "Brand": "Koreva",
      "Viscosity Grade": "20W-50",
      "API Rating": "API SL / JASO MA2",
      "Container Volume": "1 Litre Bottle",
      "Application": "Power Weeders, Reapers & 4-Stroke Engines",
      "Flash Point": "235°C",
      "Viscosity Index": "138"
    }
  },
  {
    id: "ko-4t-3-5l",
    name: "KOREVA 4T AGRO 20W-50 (3.5L Can)",
    productId: "ko-4t-agro-20w50",
    images: ["/products/power-weeder-vijay.webp"],
    price: "1350.00",
    applicableGst: "18",
    technicalDetails: {
      "Brand": "Koreva",
      "Viscosity Grade": "20W-50",
      "API Rating": "API SL / JASO MA2",
      "Container Volume": "3.5 Litre Can",
      "Application": "Power Weeders, Reapers & 4-Stroke Engines",
      "Flash Point": "235°C",
      "Viscosity Index": "138"
    }
  },
  // Secateur PRO
  {
    id: "ko-secateur-8inch",
    name: "KOREVA PRO PRUNER 8-Inch",
    productId: "ko-secateur-pro",
    images: ["/products/brushcutter.webp"],
    price: "850.00",
    applicableGst: "12",
    technicalDetails: {
      "Brand": "Koreva",
      "Blade Steel": "SK5 High Carbon Alloy Steel",
      "Handle Material": "Ergonomic Aluminium with Non-Slip Rubber",
      "Cutting Capacity": "20 mm",
      "Finish / Coating": "Teflon Anti-Rust & Anti-Sap Coating",
      "Overall Length": "200 mm (8 Inches)",
      "Weight": "240 Grams"
    }
  },
  {
    id: "ko-secateur-9inch",
    name: "KOREVA PRO PRUNER 9-Inch Heavy Duty",
    productId: "ko-secateur-pro",
    images: ["/products/brushcutter.webp"],
    price: "1150.00",
    applicableGst: "12",
    technicalDetails: {
      "Brand": "Koreva",
      "Blade Steel": "SK5 High Carbon Alloy Steel",
      "Handle Material": "Forged Aluminium Heavy Grip",
      "Cutting Capacity": "25 mm",
      "Finish / Coating": "Titanium Coated Anti-Sap",
      "Overall Length": "225 mm (9 Inches)",
      "Weight": "310 Grams"
    }
  },
  // Sickle AGRO CUT
  {
    id: "ko-sickle-12inch",
    name: "KOREVA AGRO CUT Sickle 12-Inch (Serrated)",
    productId: "ko-sickle-agro",
    images: ["/products/harrrow.webp"],
    price: "380.00",
    applicableGst: "12",
    technicalDetails: {
      "Brand": "Koreva",
      "Blade Steel": "High Carbon Manganese Steel",
      "Handle Material": "Seasoned Ash Wood",
      "Cutting Capacity": "Crop & Grass Harvesting",
      "Finish / Coating": "Black Oxide Anti-Corrosion",
      "Blade Type": "Micro-Serrated Edge",
      "Weight": "290 Grams"
    }
  },
  {
    id: "ko-sickle-14inch",
    name: "KOREVA AGRO CUT Sickle 14-Inch (Smooth Edge)",
    productId: "ko-sickle-agro",
    images: ["/products/harrrow.webp"],
    price: "450.00",
    applicableGst: "12",
    technicalDetails: {
      "Brand": "Koreva",
      "Blade Steel": "High Carbon Manganese Steel",
      "Handle Material": "Reinforced Ergonomic Hardwood",
      "Cutting Capacity": "Heavy Stalk & Paddy Harvesting",
      "Finish / Coating": "Electrophoretic Anti-Rust Coating",
      "Blade Type": "Smooth Razor Edge",
      "Weight": "340 Grams"
    }
  }
];

