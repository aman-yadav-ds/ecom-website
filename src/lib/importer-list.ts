export interface Importer {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  contactNo: string;
  email: string;
  mapLink: string;
}

export const importersList: Importer[] = [
  {
    id: "1",
    name: "SHERAB ENTERPRISE PRIVATE LIMITED",
    address: "NEMEYZAMPA, KHANGKHU, PARO, BHUTAN",
    contactPerson: "Mr. Namgay Dorji",
    contactNo: "+975 17 11 11 11",
    email: "sherabenterprise@yahoo.com",
    mapLink: "https://maps.google.com/?q=NEMEYZAMPA,+KHANGKHU,+PARO,+BHUTAN"
  },
  {
    id: "2",
    name: "SONAM YARGYEL ENTERPRISE",
    address: "NORZIN LAM, THIMPHU, BHUTAN",
    contactPerson: "Mr. Sonam Yargyel",
    contactNo: "+975 77 11 10 03",
    email: "sonamyargyelenterprise@gmail.com",
    mapLink: "https://maps.google.com/?q=NORZIN+LAM,+THIMPHU,+BHUTAN"
  },
  {
    id: "3",
    name: "M/S. ALL TECH TOOLS PVT. LTD.",
    address: "GATTAGHAR - 3, BHAKTAPUR, KATHMANDU",
    contactPerson: "Mr. Suman Shakya",
    contactNo: "+977 985 1022324",
    email: "alltechtools22@gmail.com",
    mapLink: "https://maps.google.com/?q=GATTAGHAR+-+3,+BHAKTAPUR,+KATHMANDU"
  },
  {
    id: "4",
    name: "KATHMANDU TRADING HOUSE",
    address: "TEKU ROAD, KATHMANDU, NEPAL",
    contactPerson: "Mr. Rajendra Maharjan",
    contactNo: "+977 1 4245678",
    email: "info@kathmandutrading.com.np",
    mapLink: "https://maps.google.com/?q=TEKU+ROAD,+KATHMANDU,+NEPAL"
  },
  {
    id: "5",
    name: "LANKA AGRI MACHINERIES",
    address: "NO 45, KANDY ROAD, COLOMBO, SRI LANKA",
    contactPerson: "Mr. Dinesh Silva",
    contactNo: "+94 11 234 5678",
    email: "sales@lankaagri.lk",
    mapLink: "https://maps.google.com/?q=NO+45,+KANDY+ROAD,+COLOMBO,+SRI+LANKA"
  }
];
