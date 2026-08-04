import { Product } from "../types";

export const exampleProducts: Product[] = [
  {
    id: "ko-harrow-raino",
    name: "KOREVA - Harrow (RAINO)",
    description: "KOREVA RAINO is a heavy-duty tractor-mounted disc harrow engineered for high-performance soil tilling, clod breaking, seedbed preparation, and field stubble incorporation. Built with 24-inch high-carbon steel discs, heavy 90x90mm angle iron frame, and triple-sealed bearings, it provides maximum penetration depth in hard soil conditions for tractors ranging from 35 HP to 75 HP.",
    categoryId: "tractor-attachments",
    tags: ["Harrow", "Tractor Attachment", "Tillage", "Soil Preparation", "Harrows", "Disc Harrow"],
    coverImage: "/products/harrow-8x8.webp",
    coverImageAlt: "KOREVA Raino Heavy-Duty Tractor Mounted Disc Harrow for efficient soil tilling and seedbed preparation",
    isPublished: true,
    defaultVariantId: "ko-raino-8x8",
    maintenanceTips: [
      "Grease triple-sealed bearings and disc gang axle spools every 20 hours of field operation.",
      "Inspect 24-inch disc concavity and torque gang tie-rod bolts prior to heavy soil tilling.",
      "Genuine replacement high-carbon steel discs and bearing housings are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-rotavator",
    name: "KOREVA - Rotavator",
    description: "KOREVA KOS-KOBRA series tractor rotavator is a commercial-grade rotary tiller designed for superior soil pulverization, crop residue mixing, and one-pass seedbed preparation. Available in 6ft, 7ft, and 8ft working widths, it features boron steel L-shaped blades, heavy-duty gear drive, and multi-speed gearbox suitable for all soil types.",
    categoryId: "tractor-attachments",
    tags: ["Rotavator", "Tractor Attachment", "Tillage", "Seedbed", "Rotavator 7ft", "Rotavators", "Rotavator 8ft", "Rotavator 6ft", "7ft", "8ft"],
    coverImage: "/products/rotavator-ko-kobra.png",
    coverImageAlt: "KOREVA KOS-KOBRA Heavy-Duty Tractor Rotavator for superior soil pulverization",
    isPublished: true,
    defaultVariantId: "ko-kobra-6ft",
    maintenanceTips: [
      "Check multi-speed gearbox oil level (STOU 15W-40) and side gear drive lubrication weekly.",
      "Inspect Boron steel L-blades for wear and replace worn blades in balanced opposite pairs.",
      "Genuine replacement L-blades, flange bolts, and gear seals are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-laser-land-leveller",
    name: "KOREVA - Laser Land Leveller (SMART LEVEL)",
    description: "KOREVA SMART LEVEL tractor-driven laser land leveller is a heavy-duty agricultural leveling machine engineered for precision field grading, optimal water conservation, uniform seed germination, and soil preparation. Built with an 8mm reinforced steel bucket frame, high-accuracy digital laser receiver mast, and double-acting hydraulic control valve, it provides flawless land leveling for 45 HP to 75 HP tractors.",
    categoryId: "tractor-attachments",
    tags: ["Laser Land Leveller", "Land Leveller", "Tractor Attachment", "Tillage", "Soil Preparation", "Field Leveling", "Laser Leveller 7ft", "7ft"],
    coverImage: "/products/laser-land-leveller-7ft.png",
    coverImageAlt: "KOREVA SMART LEVEL 7 Ft Heavy-Duty Tractor Laser Land Leveller for precision field leveling and water conservation",
    isPublished: true,
    defaultVariantId: "ko-laser-leveller-7ft",
    maintenanceTips: [
      "Inspect double-acting hydraulic hoses and cylinder seals for leak-free fluid pressure.",
      "Calibrate high-precision digital laser receiver mast and transmitter before field leveling operations.",
      "Genuine replacement bucket blade cutting edges, hydraulic control valves, and sensors are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-straw-reaper",
    name: "KOREVA - Straw Reaper (BHUSA KING)",
    description: "KOREVA BHUSA KING commercial-grade tractor PTO-driven straw reaper is engineered to cut, thresh, and blow crop stubble into fine straw (bhusa) in a single pass. Equipped with a 56-inch heavy-duty threshing drum, stone trap tray, double blower fan mechanism, and robust gear drive suitable for wheat and paddy crop stubble harvesting.",
    categoryId: "tractor-attachments",
    tags: ["Straw Reaper", "Bhusa Maker", "Tractor Attachment", "Harvesting", "Crop Residue", "Straw Reaper 56 inch", "56 inch"],
    coverImage: "/products/straw-reaper-56inch.png",
    coverImageAlt: "KOREVA BHUSA KING 56 Inch Heavy-Duty Tractor Straw Reaper Machine for efficient straw harvesting and bhusa making",
    isPublished: true,
    defaultVariantId: "ko-straw-reaper-56",
    maintenanceTips: [
      "Clean stone trap tray and clear straw residue from double blower fan housing after each harvesting shift.",
      "Inspect heat-treated threshing drum blades and cutter bar teeth for sharpness and alignment.",
      "Genuine replacement threshing blades, blower fan impellers, and V-belts are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-weeeder-dhurandhar",
    name: "KOREVA - Power Weeder (DHURANDHAR)",
    description: "KOREVA DHURANDHAR is a high-performance 7HP self-propelled walk-behind power weeder and inter-crop cultivator. Powered by a fuel-efficient 4-stroke engine with heavy-duty rotary blades and multi-speed gearbox, it is ideal for weeding, ridging, and soil aeration in sugarcane, cotton, maize, and vegetable farming.",
    categoryId: "self-propelled-machinery",
    tags: ["Power Weeder", "Self Propelled", "Weeding", "Tillage"],
    coverImage: "/products/power-weeder-dhurandhar.webp",
    coverImageAlt: "KOREVA DHURANDHAR 7HP Heavy Duty Self-Propelled Power Weeder for field weeding and cultivation",
    isPublished: true,
    defaultVariantId: "ko-1080",
    maintenanceTips: [
      "Check 7HP 4-stroke engine oil level (KOREVA 4T 20W-50) and clean foam air filter element every 25 operating hours.",
      "Inspect rotary tilling blades and gear-drive transmission oil prior to field weeding.",
      "Genuine replacement rotary tines, clutch cables, and carburetor service kits are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-weeder-vijay",
    name: "KOREVA - Power Weeder (VIJAY)",
    description: "KOREVA VIJAY is a commercial 7.8HP heavy-duty self-propelled power tiller and inter-row cultivator. Engineered with dual PTO shaft, PTO attachment compatibility, and adjustable tilling width, it effortlessly handles tough soil tilling, weeding, and furrowing across orchards and row crops.",
    categoryId: "self-propelled-machinery",
    tags: ["Power Weeder", "Self Propelled", "Weeding", "Tillage"],
    coverImage: "/products/power-weeder-vijay.webp",
    coverImageAlt: "KOREVA VIJAY 7.8HP Self-Propelled Power Weeder for intensive inter-crop weeding",
    isPublished: true,
    defaultVariantId: "ko-1110",
    maintenanceTips: [
      "Check 7.8HP engine oil and dual PTO shaft engagement before heavy inter-row tilling.",
      "Clean air filter assembly and tighten handle bar damper bolts every 20 hours of operation.",
      "Genuine replacement tilling blades, PTO couplers, and engine gaskets are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-pr-khetshakti",
    name: "KOREVA - Power Reaper (KHET SHAKTI)",
    description: "KOREVA KHET SHAKTI 7HP self-propelled agricultural power reaper is engineered for fast, clean, and loss-free harvesting of paddy, wheat, barley, soybean, and forage crops. Features a high-speed cutter bar, automatic side conveyer belt, and low fuel consumption for maximum field harvesting efficiency.",
    categoryId: "self-propelled-machinery",
    tags: ["Power Reaper", "Harvesting", "Self Propelled"],
    coverImage: "/products/power-reaper.webp",
    coverImageAlt: "KOREVA KHET SHAKTI 7HP Self-Propelled Agricultural Power Reaper for fast crop harvesting",
    isPublished: true,
    defaultVariantId: "ko-1260",
    maintenanceTips: [
      "Clean cutter bar guide teeth and lubricate conveyor belt drive gears daily during harvesting season.",
      "Inspect engine oil level and side conveyor belt tension prior to grain field cutting.",
      "Genuine replacement cutter bar blades, star wheels, and conveyor belting are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-bc-jpro",
    name: "KOREVA - Brush Cutter (JUNGLE PRO)",
    description: "KOREVA JUNGLE PRO 4-stroke commercial brush cutter and weed trimmer delivers high torque for clearing heavy grass, thick weeds, brush, and small saplings. Includes 3-tooth metal blade, 40-tooth carbide tip blade, and tap-and-go nylon trimmer head with ergonomic padded shoulder harness.",
    categoryId: "self-propelled-machinery",
    tags: ["Brush Cutter", "Weed Cutting", "Self Propelled"],
    coverImage: "/products/brushcutter.webp",
    coverImageAlt: "KOREVA JUNGLE PRO 4-Stroke Commercial Brush Cutter for weed and grass clearing",
    isPublished: true,
    defaultVariantId: "ko-bc-jpro-sp",
    maintenanceTips: [
      "Clean air filter sponge and check 4-stroke engine oil level before trimming heavy brush.",
      "Grease gear head bevel gearbox every 10 hours using high-temperature lithium grease.",
      "Genuine replacement 3-tooth metal blades, carbide tip saws, and nylon spool heads are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-pulveriser",
    name: "KOREVA - Pulveriser (GRAH LAXMI)",
    description: "KOREVA GRAH LAXMI commercial food processing pulveriser is a high-speed 3HP electric grain and spice grinder. Designed for fine and coarse pulverizing of wheat, rice, corn, spices, herbs, and dry food items with stainless steel beating blades and interchangeable mesh sieves.",
    categoryId: "food-processing-units",
    tags: ["Pulveriser", "Food Processing", "Grinding"],
    coverImage: "/products/Pulverizer.webp",
    coverImageAlt: "KOREVA GRAH LAXMI 3HP Commercial Food Processing Pulveriser for grain and spice grinding",
    isPublished: true,
    defaultVariantId: "ko-pulv-1170",
    maintenanceTips: [
      "Clean grinding chamber and mesh sieves after each processing batch to avoid cross-contamination.",
      "Inspect 3HP electric motor V-belt tension and lubricate pillow block bearings monthly.",
      "Genuine replacement stainless steel mesh sieves, beater hammers, and hopper clamps are available through certified KOREVA dealers."
    ]
  },
  {
    id: "ko-ricemill",
    name: "MINI Rice Mill",
    description: "KOREVA DHAN LAXMI MINI commercial rice mill and paddy huller processes up to 150-200 kg/hr of paddy. Features dual-stage rice hulling and bran separation, producing polished whole rice with minimal broken grains for small-scale commercial, farm, or custom milling operations.",
    categoryId: "food-processing-units",
    tags: ["Rice Mill", "Food Processing", "Milling"],
    coverImage: "/products/mini-rice-mill.png",
    coverImageAlt: "KOREVA DHAN LAXMI MINI Commercial Rice Mill for rice processing and hulling",
    isPublished: true,
    defaultVariantId: "ko-ricemill-1080",
    maintenanceTips: [
      "Clean hulling chamber and bran separator cyclone daily to maintain peak milling efficiency.",
      "Inspect rubber huller rollers for uniform wear and adjust hulling gap according to paddy grain variety.",
      "Genuine replacement rubber rollers, emery stone rollers, and sifter screens are available through certified KOREVA dealers."
    ]
  },
  // Lubricants
  {
    id: "ko-stou-15w40",
    name: "KOREVA - Super Tractor Oil Universal (STOU 15W-40)",
    description: "KOREVA STOU 15W-40 Super Tractor Oil Universal is a multi-purpose premium agricultural lubricant formulated for diesel tractor engines, hydraulic systems, wet brakes, and transmissions. Provides superior thermal stability, anti-wear protection, and friction control for agricultural equipment.",
    categoryId: "lubricants",
    tags: ["Tractor Fluid", "Engine Oil", "Hydraulic Oil", "STOU", "Lubricant", "15W-40"],
    coverImage: "/products/stou-lubricant.png",
    coverImageAlt: "KOREVA STOU 15W-40 Super Tractor Universal Lubricant Oil container",
    isPublished: true,
    defaultVariantId: "ko-stou-5l",
    maintenanceTips: [
      "Store oil containers in a dry, covered area away from direct sunlight and moisture contamination.",
      "Ensure fill neck and funnel are thoroughly cleaned before pouring oil into tractor hydraulic or engine sumps.",
      "Follow tractor OEM fluid replacement intervals (typically every 250–500 operating hours)."
    ]
  },
  {
    id: "ko-4t-agro-20w50",
    name: "KOREVA - Heavy Duty 4T Agro Engine Oil (20W-50)",
    description: "KOREVA 4T Agro 20W-50 heavy-duty 4-stroke engine oil is engineered specifically for power weeders, power tillers, reapers, brush cutters, and air-cooled agricultural engines operating under heavy loads and high ambient temperatures.",
    categoryId: "lubricants",
    tags: ["4T Oil", "Engine Oil", "Weeder Oil", "20W-50", "Lubricants"],
    coverImage: "/products/4t-agro-lubricant.png",
    coverImageAlt: "KOREVA 4T Agro 20W-50 Heavy Duty Engine Oil bottle for power machinery",
    isPublished: true,
    defaultVariantId: "ko-4t-3-5l",
    maintenanceTips: [
      "Check engine dipstick level before starting air-cooled power weeders, reapers, or brush cutters.",
      "Change engine oil after the first 5 hours of new machinery break-in, then every 50 operating hours thereafter.",
      "Dispose of used engine oil responsibly at authorized recycling centers or equipment dealers."
    ]
  },
  // Hand Tools
  {
    id: "ko-secateur-pro",
    name: "KOREVA - Bypass Pruning Secateur (PRO PRUNER)",
    description: "KOREVA PRO PRUNER is a professional 8-inch bypass pruning secateur forged from high-carbon Japanese SK5 alloy steel. Designed for clean, precise branch cuts up to 20mm in orchards, vineyards, and gardens, featuring anti-sap Teflon coating, spring loaded action, and ergonomic non-slip handles.",
    categoryId: "hand-tools",
    tags: ["Secateur", "Pruning Shears", "Garden Tools", "Hand Tools", "SK5 Steel"],
    coverImage: "/products/secateur-pro.png",
    coverImageAlt: "KOREVA PRO PRUNER SK5 Steel Professional Garden Bypass Pruning Shears Secateur",
    isPublished: true,
    defaultVariantId: "ko-secateur-8inch",
    maintenanceTips: [
      "Wipe SK5 steel blades with a mineral oil cloth after pruning to remove plant sap and prevent rust.",
      "Apply light machine oil to the central spring and pivot pin monthly for effortless tension rebound.",
      "Hone only the bevel edge using a fine diamond stone file at a 20° angle when blade dulls."
    ]
  },
  {
    id: "ko-sickle-agro",
    name: "KOREVA - Heavy Duty Grass & Weed Sickle (AGRO CUT)",
    description: "KOREVA AGRO CUT heavy-duty grass and weed harvesting sickle is crafted from high-carbon manganese steel with micro-serrated teeth. Features an induction-hardened cutting edge and contoured wooden handle for fast, effortless crop harvesting, grass trimming, and weed cutting.",
    categoryId: "hand-tools",
    tags: ["Sickle", "Harvesting Tool", "Hand Tools", "Weed Cutting"],
    coverImage: "/products/sickle-agro.png",
    coverImageAlt: "KOREVA AGRO CUT High-Carbon Steel Serrated Harvesting Sickle with Wooden Handle",
    isPublished: true,
    defaultVariantId: "ko-sickle-12inch",
    maintenanceTips: [
      "Clean crop residue and field dirt from micro-serrated teeth using a stiff bristle brush after use.",
      "Apply anti-rust protective oil to the manganese steel blade surface before off-season storage.",
      "Inspect wooden handle wedge pin tightness prior to heavy field harvesting."
    ]
  },
  {
    id: "ko-hand-sprayer",
    name: "KOREVA - Pressure Hand Sprayer (TURBO SPRAY)",
    description: "KOREVA TURBO SPRAY manual pressure hand sprayer features a durable chemical-resistant HDPE tank, solid brass adjustable spray nozzle, and smooth pressure pump mechanism. Designed for spraying liquid fertilizers, pesticides, herbicides, and water across crops, gardens, and greenhouses.",
    categoryId: "hand-tools",
    tags: ["Hand Sprayer", "Garden Sprayer", "Agricultural Tools", "Hand Tools", "Chemical Sprayer", "Pressure Sprayer"],
    coverImage: "/products/hand-sprayer-1.5l.png",
    coverImageAlt: "KOREVA TURBO SPRAY High Pressure Agricultural Hand Sprayer with Adjustable Brass Spray Nozzle",
    isPublished: true,
    defaultVariantId: "ko-sprayer-1-5l",
    maintenanceTips: [
      "Flush HDPE tank and brass nozzle with clean water after spraying pesticides or chemical solutions.",
      "Lubricate pump rod O-ring seal with silicone grease every 3 months to maintain pressure efficiency.",
      "Depressurize container using safety relief valve before opening or storing."
    ]
  },
  {
    id: "ko-sledge-hammer",
    name: "KOREVA - Heavy Duty Sledge Hammer (IRON CLAW)",
    description: "KOREVA IRON CLAW heavy-duty sledge hammer features a drop-forged carbon steel head with hardened striking faces and an unbreakable fiberglass shock-absorbing handle. Engineered for heavy agricultural post driving, stone breaking, construction, and demolition work.",
    categoryId: "hand-tools",
    tags: ["Sledge Hammer", "Demolition Hammer", "Hand Tools", "Carbon Steel", "Fiberglass Handle"],
    coverImage: "/products/hammer-6kg.png",
    coverImageAlt: "KOREVA IRON CLAW Drop Forged Carbon Steel Sledge Hammer with Fiberglass Handle",
    isPublished: true,
    defaultVariantId: "ko-hammer-6kg",
    maintenanceTips: [
      "Inspect steel head chamfer faces for metal burrs or mushrooming and file smooth if necessary.",
      "Check fiberglass handle bond to steel eye socket before heavy post driving or stone breaking.",
      "Store in a dry tool rack to prevent moisture buildup on carbon steel striking faces."
    ]
  },
  {
    id: "ko-bill-hook",
    name: "KOREVA - Heavy Duty Bill Hook (MACHETE CUT)",
    description: "KOREVA MACHETE CUT heavy-duty agricultural bill hook features a curved high-carbon manganese steel blade with induction-hardened edge. Designed for heavy bush clearing, thick branch lopping, banana harvesting, and sugar cane cutting.",
    categoryId: "hand-tools",
    tags: ["Bill Hook", "Machete", "Hand Tools", "Bush Clearing", "Harvesting Tool"],
    coverImage: "/products/bill-hook-wooden.png",
    coverImageAlt: "KOREVA MACHETE CUT High-Carbon Steel Agricultural Harvesting Bill Hook",
    isPublished: true,
    defaultVariantId: "ko-billhook-wooden",
    maintenanceTips: [
      "Sharpen curved manganese steel blade using a coarse whetstone following original blade bevel angle.",
      "Wipe sap off cutting edge and coat with protective oil after clearing brush or harvesting cane.",
      "Check handle rivets and non-slip rubber grip for secure hand holding during heavy lopping."
    ]
  },
  {
    id: "ko-sickle-pro",
    name: "KOREVA - Agricultural Harvesting Sickle (PRO CUT)",
    description: "KOREVA PRO CUT commercial agricultural sickle is forged from heat-treated high-manganese steel with ultra-sharp cutting edge options including crescent and pruning curves. Perfect for paddy harvesting, wheat cutting, fodder harvesting, and field maintenance.",
    categoryId: "hand-tools",
    tags: ["Sickle", "Harvesting Tool", "Hand Tools", "Crescent Sickle", "Pruning Sickle"],
    coverImage: "/products/sickle-crescent.png",
    coverImageAlt: "KOREVA PRO CUT High-Carbon Manganese Steel Agricultural Harvesting Sickle",
    isPublished: true,
    defaultVariantId: "ko-sickle-crescent",
    maintenanceTips: [
      "Clean crop moisture and soil particles off blade edge before sheathing or storing.",
      "Hone curved cutting edge periodically using a round sharpening steel for razor-sharp crop slicing.",
      "Store hanging in a dry area to prevent accidental blade edge contact and corrosion."
    ]
  },
  {
    id: "ko-khurpa",
    name: "KOREVA - Heavy Duty Garden Khurpa (SOIL KING)",
    description: "KOREVA SOIL KING heavy-duty garden khurpa is a hand-forged spring steel traditional weeding trowel. Features a sharp flat blade and ergonomic seasoned hardwood handle for soil tilling, bed weeding, root loosening, and seedling transplanting.",
    categoryId: "hand-tools",
    tags: ["Khurpa", "Hand Tools", "Garden Tools", "Weeding Tool", "Tilling", "Forged Steel"],
    coverImage: "/products/khurpa-3inch.png",
    coverImageAlt: "KOREVA SOIL KING Heavy-Duty Hand Forged Garden Khurpa Tilling Tool",
    isPublished: true,
    defaultVariantId: "ko-khurpa-3inch",
    maintenanceTips: [
      "Wash off mud and damp garden soil after bed weeding or seedling transplanting.",
      "Sharpen front flat blade edge with a metal file for effortless root slicing.",
      "Treat wooden handle with linseed oil annually to preserve hardwood durability."
    ]
  },
  {
    id: "ko-agrihorti-ladder",
    name: "KOREVA - Heavy Duty AgriHorti Orchard Ladder (HIGH REACH)",
    description: "KOREVA HIGH REACH commercial tripod aluminum orchard ladder is engineered for fruit picking, tree pruning, and high-branch horticulture maintenance. Features a wide base tripod design, non-slip rungs, and lightweight anti-rust aluminum alloy construction for maximum stability on uneven orchard soil.",
    categoryId: "hand-tools",
    tags: ["AgriHorti Ladder", "Orchard Ladder", "Tripod Ladder", "Pruning Ladder", "Hand Tools", "Aluminum Ladder"],
    coverImage: "/products/agrihorti-ladder.png",
    coverImageAlt: "KOREVA HIGH REACH Heavy-Duty Aluminum Tripod Orchard and Horticulture Ladder",
    isPublished: true,
    defaultVariantId: "ko-agrihorti-ladder-std",
    maintenanceTips: [
      "Inspect aluminum rungs and tripod rear support leg lock pins before ascending.",
      "Clean orchard mud from non-slip rubber feet to ensure maximum ground traction.",
      "Store indoors or under shade cover to prevent accidental mechanical damage."
    ]
  },
  {
    id: "ko-pahadi-kudal",
    name: "KOREVA - Heavy Duty Pahadi Kudal (MOUNTAIN DIGGER)",
    description: "KOREVA MOUNTAIN DIGGER heavy-duty Pahadi Kudal is a specialized hill terrain digging pick mattock hand-forged from high-manganese steel. Ideal for rocky soil excavation, terraced farming, trenching, tree planting, and tough root chopping in mountain and stony fields.",
    categoryId: "hand-tools",
    tags: ["Pahadi Kudal", "Kudal", "Mattock", "Digging Tool", "Hand Tools", "Terraced Farming"],
    coverImage: "/products/pahadi-kudal-medium.png",
    coverImageAlt: "KOREVA MOUNTAIN DIGGER Forged Manganese Steel Pahadi Kudal Digging Tool",
    isPublished: true,
    defaultVariantId: "ko-pahadi-kudal-medium",
    maintenanceTips: [
      "Inspect pick and mattock blade tips for burrs after digging in rocky mountain terrain.",
      "Ensure handle eye wedge is tight and securely fitted before heavy trench excavation.",
      "Coat manganese steel head with anti-rust oil prior to seasonal storage."
    ]
  },
  {
    id: "ko-garden-hoe",
    name: "KOREVA - Ergonomic Garden Hoe (CULTI HOE)",
    description: "KOREVA CULTI HOE dual-action forged steel garden hoe is designed for soil aeration, garden bed weeding, furrow creation, and earth scraping. Features electrophoretic rust-resistant finish and heavy-duty hardwood handle available in single blade and cultivator prong configurations.",
    categoryId: "hand-tools",
    tags: ["Garden Hoe", "Hoe", "Cultivator", "Hand Tools", "Weeding Hoe", "Garden Tools"],
    coverImage: "/products/garden-hoe-single.png",
    coverImageAlt: "KOREVA CULTI HOE Dual-Action Forged Steel Agricultural Garden Hoe",
    isPublished: true,
    defaultVariantId: "ko-garden-hoe-single",
    maintenanceTips: [
      "Scrape off compacted soil and weeds from blade and cultivator prongs after garden use.",
      "File hoe cutting edge flat to maintain quick weed-slice performance in nursery beds.",
      "Keep handle smooth and dry to avoid splintering or wood degradation."
    ]
  },
  {
    id: "ko-garden-rake",
    name: "KOREVA - Heavy Duty Garden Rake (RAKE KING)",
    description: "KOREVA RAKE KING heavy-duty garden rake features drop-forged high-carbon steel tines with anti-rust black coating. Designed for agricultural soil tilling, bed leveling, gravel spreading, and field debris gathering, available in 8, 12, 14, and 16-teeth working widths.",
    categoryId: "hand-tools",
    tags: ["Garden Rake", "Rake", "Hand Tools", "Garden Tools", "Soil Tilling", "Forged Steel"],
    coverImage: "/products/garden-rake-8teeth.png",
    coverImageAlt: "KOREVA RAKE KING Heavy Duty Forged Steel Agricultural Garden Rake",
    isPublished: true,
    defaultVariantId: "ko-rake-8teeth",
    maintenanceTips: [
      "Rinse away field debris and gravel dust from steel tines after bed leveling.",
      "Check tine alignment and straighten bent teeth using a soft mallet if needed.",
      "Store hanging vertically to prevent tine bending or handle stress."
    ]
  },
  {
    id: "ko-plastic-leaf-rake",
    name: "KOREVA - Heavy Duty Plastic Leaf Rake (LEAF PRO)",
    description: "KOREVA LEAF PRO 22-teeth plastic leaf rake features flexible, high-density polypropylene fan tines that conform to lawn contours without damaging turf grass. Ideal for raking fallen leaves, grass clippings, garden debris, and lawn maintenance.",
    categoryId: "hand-tools",
    tags: ["Leaf Rake", "Plastic Rake", "Lawn Rake", "Hand Tools", "Garden Tools", "22 Teeth"],
    coverImage: "/products/plastic-leaf-rake-22teeth.png",
    coverImageAlt: "KOREVA LEAF PRO 22 Teeth Heavy Duty Flexible Plastic Lawn and Leaf Rake",
    isPublished: true,
    defaultVariantId: "ko-leaf-rake-22teeth",
    maintenanceTips: [
      "Remove trapped leaves and damp grass clippings from plastic fan tines after lawn raking.",
      "Avoid storing under direct sunlight for prolonged periods to preserve polypropylene flexibility.",
      "Inspect tubular handle bolt attachment before seasonal autumn leaf clearing."
    ]
  },
  {
    id: "ko-garden-shovel",
    name: "KOREVA - Heavy Duty Garden Shovel (SHOVEL MASTER)",
    description: "KOREVA SHOVEL MASTER heavy-duty garden shovel is forged from high-carbon pressed steel with powder-coated rust protection. Available in Round Nose (for deep soil digging), Square Mouth (for loose material scooping), and Baby Compact (for hand garden trowel work).",
    categoryId: "hand-tools",
    tags: ["Garden Shovel", "Shovel", "Digging Tool", "Hand Tools", "Square Mouth", "Round Nose", "Baby Shovel"],
    coverImage: "/products/garden-shovel-round-nose.png",
    coverImageAlt: "KOREVA SHOVEL MASTER Heavy Duty Agricultural Digging Garden Shovel",
    isPublished: true,
    defaultVariantId: "ko-shovel-round-nose",
    maintenanceTips: [
      "Clean wet soil and clay from shovel blade socket after excavation.",
      "Touch up powder-coated blade edge with protective paint if scratched during rock digging.",
      "Check D-grip handle rivets to ensure rigid leverage during heavy material scooping."
    ]
  },
  {
    id: "ko-grass-sword",
    name: "KOREVA - Heavy Duty Grass Sword (SWORD CUT)",
    description: "KOREVA SWORD CUT heavy-duty grass sword features a 350mm dual-edged razor blade forged from high-manganese steel with induction hardening. Designed for effortless standing grass slicing, tall weed clearing, and pasture border maintenance without bending down.",
    categoryId: "hand-tools",
    tags: ["Grass Sword", "Garden Sword", "Weed Cutter", "Hand Tools", "Grass Cutting", "Manganese Steel"],
    coverImage: "/products/grass-sword.png",
    coverImageAlt: "KOREVA SWORD CUT High Manganese Steel Dual Edged Agricultural Grass Sword",
    isPublished: true,
    defaultVariantId: "ko-grass-sword-std",
    maintenanceTips: [
      "Wipe dual-edged blade clean of green grass sap and moisture after pasture clearing.",
      "Hone both cutting edges with a hand file following the factory bevel angle.",
      "Store inside protective blade sleeve to prevent rust and edge damage."
    ]
  },
  {
    id: "ko-hand-sprinkler",
    name: "KOREVA - Agricultural Hand Sprinkler (TURBO SPRINKLER)",
    description: "KOREVA TURBO SPRINKLER agricultural hand sprinkler is available in high-impact 8-pattern plastic and solid brass rotating head variants. Engineered for uniform water distribution, crop micro-irrigation, lawn watering, and greenhouse misting up to 12 meters radius.",
    categoryId: "hand-tools",
    tags: ["Hand Sprinkler", "Sprinkler", "Garden Sprinkler", "Irrigation", "Hand Tools", "Plastic Sprinkler", "Brass Sprinkler"],
    coverImage: "/products/hand-sprinkler-plastic.png",
    coverImageAlt: "KOREVA TURBO SPRINKLER High Efficiency Agricultural Hand Lawn Sprinkler",
    isPublished: true,
    defaultVariantId: "ko-sprinkler-plastic",
    maintenanceTips: [
      "Clear fine sand particles from sprinkler nozzle holes using water back-flush.",
      "Inspect quick-connect hose washer O-ring for leak-tight water connection.",
      "Drain water completely before storing during freezing winter months."
    ]
  },
  {
    id: "ko-hand-wheel-hoe",
    name: "KOREVA - Manual Hand Wheel Hoe (WHEEL CULTI)",
    description: "KOREVA WHEEL CULTI manual push wheel hoe cultivator features a 300mm steel wheel, tubular steel chassis, and interchangeable 1-tine or 3-tine spring steel attachments. Reduces field weeding labor by 70% in inter-crop vegetables, cotton, maize, and nursery beds.",
    categoryId: "hand-tools",
    tags: ["Hand Wheel Hoe", "Wheel Hoe", "Cultivator", "Weeding Tool", "Hand Tools", "1 Tine", "3 Tine"],
    coverImage: "/products/wheel-hoe-3tine.png",
    coverImageAlt: "KOREVA WHEEL CULTI Manual Push Wheel Hoe Agricultural Cultivator",
    isPublished: true,
    defaultVariantId: "ko-wheel-hoe-3tine",
    maintenanceTips: [
      "Oil wheel axle hub bearings monthly for smooth push operation in row crops.",
      "Scrape mud off 3-tine cultivator prongs after field weeding.",
      "Tighten attachment mounting bolts before working in tough dry soil."
    ]
  },
  {
    id: "ko-garden-spade",
    name: "KOREVA - Heavy Duty Garden Spade (SPADE KING)",
    description: "KOREVA SPADE KING heavy-duty garden spade features a drop-forged high-carbon steel flat blade with sharp straight cutting edge. Perfect for clean border edging, straight-wall trenching, soil slice turning, and root cutting with sturdy hardwood T-handle.",
    categoryId: "hand-tools",
    tags: ["Garden Spade", "Spade", "Border Spade", "Digging Tool", "Hand Tools", "Forged Steel"],
    coverImage: "/products/garden-spade.png",
    coverImageAlt: "KOREVA SPADE KING Heavy Duty Forged Steel Agricultural Garden Spade",
    isPublished: true,
    defaultVariantId: "ko-garden-spade-std",
    maintenanceTips: [
      "Wash off mud and root debris from flat steel blade after trenching.",
      "Sharpen straight bottom cutting edge with a file for clean root cutting.",
      "Keep wooden T-handle clean and oil occasionally with boiled linseed oil."
    ]
  },
  {
    id: "ko-seed-fertilizer-broadcaster",
    name: "KOREVA - Manual Seed & Fertilizer Broadcaster (AGRO BROADCASTER)",
    description: "KOREVA AGRO BROADCASTER portable manual backpack seed and fertilizer broadcast spreader features a 10-liter hopper, smooth hand-crank gear drive, and padded shoulder straps. Delivers uniform 3 to 6-meter spreading of granular fertilizers, wheat, rice, and grass seeds.",
    categoryId: "hand-tools",
    tags: ["Seed Broadcaster", "Fertilizer Spreader", "Manual Broadcaster", "Agricultural Tools", "Hand Tools"],
    coverImage: "/products/seed-fertilizer-broadcaster.png",
    coverImageAlt: "KOREVA AGRO BROADCASTER Portable Manual Seed and Fertilizer Broadcast Spreader",
    isPublished: true,
    defaultVariantId: "ko-broadcaster-std",
    maintenanceTips: [
      "Wash out 10-liter hopper with clean water after spreading chemical fertilizers to prevent corrosion.",
      "Oil hand-crank gear drive mechanism every 50 hours of broadcast operation.",
      "Check shoulder strap buckles and flow rate shutter gate adjustment before seeding."
    ]
  },
  {
    id: "ko-maize-sheller",
    name: "KOREVA - Manual Maize Sheller (CORN PRO)",
    description: "KOREVA CORN PRO manual maize corn sheller machine is constructed from heavy-duty cast iron with a smooth hand crank flywheel. Processes up to 80 kg/hr of corn cobs with grain-preserving kernel separation and adjustable cob size spring clamp.",
    categoryId: "hand-tools",
    tags: ["Maize Sheller", "Corn Sheller", "Hand Sheller", "Harvesting Tool", "Hand Tools"],
    coverImage: "/products/maize-sheller.png",
    coverImageAlt: "KOREVA CORN PRO Cast Iron Manual Hand Crank Maize Corn Sheller Machine",
    isPublished: true,
    defaultVariantId: "ko-maize-sheller-std",
    maintenanceTips: [
      "Brush out corn chaff and kernel residue from cast iron teeth after shelling.",
      "Apply light grease to hand crank flywheel gears for smooth manual turning.",
      "Adjust cob tension spring clamp according to dry corn cob diameter."
    ]
  },
  {
    id: "ko-garden-gloves",
    name: "KOREVA - Protective Heavy Duty Garden Gloves (GRIP SHIELD)",
    description: "KOREVA GRIP SHIELD protective garden work gloves feature a 13-gauge breathable nylon liner coated with textured micro-foam nitrile. Delivers thorn-proof, puncture-resistant hand protection, wet/dry oil grip, and long-lasting comfort for pruning and soil handling.",
    categoryId: "hand-tools",
    tags: ["Garden Gloves", "Work Gloves", "Protective Gear", "Hand Tools", "Nitrile Gloves"],
    coverImage: "/products/garden-gloves-red-black.png",
    coverImageAlt: "KOREVA GRIP SHIELD Nitrile Coated Heavy Duty Red and Black Garden Work Gloves",
    isPublished: true,
    defaultVariantId: "ko-gloves-red-black",
    maintenanceTips: [
      "Hand wash in cool water with mild soap to remove dirt and garden soil.",
      "Air dry flat away from direct heat sources to preserve micro-foam nitrile grip.",
      "Store in a cool dry tool bag away from sharp metal points."
    ]
  },
  {
    id: "ko-post-hole-digger",
    name: "KOREVA - Heavy Duty Post Hole Digger (HOLE DIGGER PRO)",
    description: "KOREVA HOLE DIGGER PRO manual post hole digger features dual hardened steel clam-shell blades and 1.2m heavy-duty hardwood handles. Excavates clean 6-inch (150mm) diameter holes up to 1.1m deep for fence posts, orchard saplings, and sign installation.",
    categoryId: "hand-tools",
    tags: ["Post Hole Digger", "Hole Digger", "Digging Tool", "Fence Tool", "Hand Tools"],
    coverImage: "/products/post-hole-digger.png",
    coverImageAlt: "KOREVA HOLE DIGGER PRO Dual Blade Steel Manual Post Hole Digger",
    isPublished: true,
    defaultVariantId: "ko-post-hole-digger-std",
    maintenanceTips: [
      "Clean mud and stones from dual clam-shell steel blades after hole excavation.",
      "Oil center pivot pin to ensure smooth scissor clamping action in clay soil.",
      "Inspect hardwood handle bolts for tight secure alignment."
    ]
  },
  {
    id: "ko-digging-fork",
    name: "KOREVA - Heavy Duty Digging Fork (FORK MASTER)",
    description: "KOREVA FORK MASTER heavy-duty agricultural digging fork features 4 drop-forged high-carbon steel oval tines and metal D-grip ash handle. Designed for deep soil aeration, potato harvesting, root crop digging, and compost turning without compacting soil.",
    categoryId: "hand-tools",
    tags: ["Digging Fork", "Spading Fork", "Fork", "Soil Aeration", "Hand Tools", "Forged Steel"],
    coverImage: "/products/digging-fork.png",
    coverImageAlt: "KOREVA FORK MASTER Heavy Duty Forged Steel Agricultural Digging Fork",
    isPublished: true,
    defaultVariantId: "ko-digging-fork-std",
    maintenanceTips: [
      "Wash soil and compost off 4 drop-forged steel oval tines after use.",
      "Inspect tines for alignment and avoid prying against heavy subterranean boulders.",
      "Store hanging vertically in a dry farm shed."
    ]
  },
  {
    id: "ko-hand-cultivator",
    name: "KOREVA - Ergonomic Hand Cultivator (CLAW PRO)",
    description: "KOREVA CLAW PRO 3-prong hand cultivator features curved heat-treated manganese steel claw tines with black electro-phoretic rust protection. Ideal for breaking soil crusts, weeding garden beds, aerating soil around flower beds, and mixing soil amendments.",
    categoryId: "hand-tools",
    tags: ["Hand Cultivator", "Cultivator", "Garden Claw", "3 Prong", "Hand Tools", "Weeding Tool"],
    coverImage: "/products/hand-cultivator-3prong.png",
    coverImageAlt: "KOREVA CLAW PRO 3-Prong Forged Steel Agricultural Hand Cultivator",
    isPublished: true,
    defaultVariantId: "ko-hand-cultivator-3prong",
    maintenanceTips: [
      "Rinse away damp garden soil from 3 manganese steel claw tines.",
      "Wipe tines dry and apply light oil film to preserve electro-phoretic finish.",
      "Ensure rubber handle grip is clean and dry."
    ]
  },
  {
    id: "ko-seed-treatment-drum",
    name: "KOREVA - Manual Seed Treatment Drum (SEED COATER)",
    description: "KOREVA SEED COATER manual seed treatment drum mixer is built with a 20 kg capacity heavy-gauge galvanized steel drum and angle iron stand frame. Ensures 100% uniform chemical, bio-fertilizer, and fungicide seed dressing prior to field planting.",
    categoryId: "hand-tools",
    tags: ["Seed Treatment Drum", "Seed Dresser", "Seed Coater", "Agricultural Equipment", "Hand Tools"],
    coverImage: "/products/seed-treatment-drum.png",
    coverImageAlt: "KOREVA SEED COATER Heavy Duty Manual Rotating Seed Treatment Drum Machine",
    isPublished: true,
    defaultVariantId: "ko-seed-treatment-drum-std",
    maintenanceTips: [
      "Clean inside 20 kg drum with water after dressing seeds with chemical fungicides or bio-fertilizers.",
      "Grease rotating drum axle bearings and angle iron frame pivot points before seeding season.",
      "Inspect drum lid clamp gasket to ensure 100% chemical-tight sealing."
    ]
  },
  {
    id: "ko-wheel-barrow",
    name: "KOREVA - Heavy Duty Wheel Barrow (CARGO BARROW)",
    description: "KOREVA CARGO BARROW heavy-duty agricultural wheelbarrow features an 85-liter seamless pressed steel tray, 32mm tubular steel chassis, and heavy pneumatic rubber tire (3.50-8). Supports up to 150 kg payload for farm harvest, soil, manure, and gravel transport.",
    categoryId: "hand-tools",
    tags: ["Wheel Barrow", "Wheelbarrow", "Garden Cart", "Agricultural Haulage", "Hand Tools"],
    coverImage: "/products/wheel-barrow.png",
    coverImageAlt: "KOREVA CARGO BARROW Heavy Duty Steel Agricultural Wheelbarrow",
    isPublished: true,
    defaultVariantId: "ko-wheel-barrow-std",
    maintenanceTips: [
      "Check pneumatic tire pressure (3.50-8) before hauling heavy farm loads.",
      "Clean manure and wet soil from 85-liter pressed steel tray to prevent tray corrosion.",
      "Grease wheel axle bearings every 3 months for smooth pushing."
    ]
  },
  {
    id: "ko-hand-soil-tiller",
    name: "KOREVA - Rotary Hand Soil Tiller (TILLER PRO)",
    description: "KOREVA TILLER PRO rotary manual hand soil tiller features 6 high-hardness manganese steel star-shaped blades and a long tubular handle. Effortlessly breaks hard topsoil crusts, pulverizes soil for seedbeds, and destroys weed seedlings in vegetable gardens.",
    categoryId: "hand-tools",
    tags: ["Hand Soil Tiller", "Soil Tiller", "Rotary Tiller", "Garden Tiller", "Hand Tools"],
    coverImage: "/products/hand-soil-tiller.png",
    coverImageAlt: "KOREVA TILLER PRO Rotary Blade Manual Agricultural Hand Soil Tiller",
    isPublished: true,
    defaultVariantId: "ko-hand-soil-tiller-std",
    maintenanceTips: [
      "Remove weed roots and soil crust buildup from 6 rotary star blades after tilling.",
      "Oil rotary blade axle pins for smooth rolling in nursery soil.",
      "Store indoors away from moisture."
    ]
  },
  {
    id: "ko-hand-ridger",
    name: "KOREVA - Manual Hand Ridger (RIDGER KING)",
    description: "KOREVA RIDGER KING manual hand ridging plow features dual adjustable moldboard wings forged from high-carbon steel. Creates uniform 200mm to 350mm planting furrows, ridges, and earth-up mounds for potatoes, sugarcane, vegetables, and field crops.",
    categoryId: "hand-tools",
    tags: ["Hand Ridger", "Ridger Plow", "Furrower", "Hand Tools", "Earthing Up Tool"],
    coverImage: "/products/hand-ridger.png",
    coverImageAlt: "KOREVA RIDGER KING Dual Wing Manual Steel Agricultural Hand Ridger",
    isPublished: true,
    defaultVariantId: "ko-hand-ridger-std",
    maintenanceTips: [
      "Clean soil from dual moldboard steel wings after furrow creation.",
      "Grease wing adjustment slot pins before earthing up crop rows.",
      "Sharpen front plow point for easy soil penetration."
    ]
  },
  {
    id: "ko-weight-lifter",
    name: "KOREVA - Agricultural Basket Weight Lifter (LIFT MASTER)",
    description: "KOREVA LIFT MASTER agricultural basket weight lifter is a heavy-duty hand trolley cart equipped with leverage arm hooks and solid rubber wheels. Effortlessly lifts and transports harvest baskets, fruit crates, and produce containers weighing up to 100 kg across farm fields.",
    categoryId: "hand-tools",
    tags: ["Weight Lifter", "Basket Lifter", "Harvest Trolley", "Hand Tools", "Crop Transport"],
    coverImage: "/products/weight-lifter-basket.png",
    coverImageAlt: "KOREVA LIFT MASTER Agricultural Basket Weight Lifter Trolley",
    isPublished: true,
    defaultVariantId: "ko-weight-lifter-basket",
    maintenanceTips: [
      "Check solid rubber wheel axle pins for smooth rolling over farm soil.",
      "Inspect leverage arm hooks and tubular frame weld joints before lifting 100kg harvest crates.",
      "Store in a dry tool shed to protect steel frame coating."
    ]
  }
];





