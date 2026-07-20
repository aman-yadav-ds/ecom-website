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
  }
];
