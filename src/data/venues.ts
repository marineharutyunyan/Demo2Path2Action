export interface Venue {
  id: number;
  name: string;
  nameArm: string;
  description: string;
  descriptionArm: string;
  address: string;
  addressArm: string;
  coordinates: [number, number]; // [lng, lat]
  capacity: string;
  capacityArm: string;
  ownerEmail: string;
  pricing: "free" | "paid";
  locationType: "outdoor" | "indoor";
  region: string;
  regionArm: string;
}

export const venues: Venue[] = [
  {
    id: 1,
    name: "Opera Garden",
    nameArm: "Օպերայի այգի",
    description:
        "Open-air venue adjacent to the Yerevan Opera Theater, ideal for cultural events and community meetings.",
    descriptionArm:
        "Բացօթյա տարածք Երևանի Օպերայի թատրոնի հարևանությամբ, իդեալական մշակութային միջոցառումների և համայնքային հանդիպումների համար։",
    address: "54 Tumanyan St, Yerevan",
    addressArm: "Թումանյան փողոց 54, Երևան",
    coordinates: [44.5134, 40.1872],
    capacity: "150 guests",
    capacityArm: "150 հյուր",
    ownerEmail: "m.marine.harutyunyan@gmail.com",
    pricing: "free",
    locationType: "outdoor",
    region: "Yerevan",
    regionArm: "Երևան",
  },
  {
    id: 2,
    name: "Erebuni Events Center",
    nameArm: "Էրեբունի Միջոցառումների Կենտրոն",
    description:
        "Spacious hall in the historic Erebuni District, great for workshops and large-scale civic initiatives.",
    descriptionArm:
        "Ընդարձակ դահլիճ պատմական Էրեբունի շրջանում, հարմար սեմինարների և լայնածավալ քաղաքացիական նախաձեռնությունների համար։",
    address: "38 Erebuni Ave, Yerevan",
    addressArm: "Էրեբունի պողոտա 38, Երևան",
    coordinates: [44.5089, 40.1361],
    capacity: "300 guests",
    capacityArm: "300 հյուր",
    ownerEmail: "m.marine.harutyunyan@gmail.com",
    pricing: "free",
    locationType: "indoor",
    region: "Yerevan",
    regionArm: "Երևան",
  },
  {
    id: 3,
    name: "Hrazdan Cultural Hub",
    nameArm: "Հրազդան Մշակութային Կենտրոն",
    description: "Dynamic space near Hrazdan Stadium, designed for creative collaborations and activist meetups.",
    descriptionArm: "Ոգևորիչ տարածք Հրազդան մարզադաշտի մոտ, նախատեսված ստեղծարար համագործակցությունների և ակտիվիստների հանդիպումների համար։",
    address: "5 Azatutyan Ave, Yerevan",
    addressArm: "Ազատության պողոտա 5, Երևան",
    coordinates: [44.4791, 40.1928],
    capacity: "180 guests",
    capacityArm: "180 հյուր",
    ownerEmail: "m.marine.harutyunyan@gmail.com",
    pricing: "free",
    locationType: "indoor",
    region: "Yerevan",
    regionArm: "Երևան",
  },
];
