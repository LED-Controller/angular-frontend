import { Lamp } from "../interfaces/lamp";

export const Lamps: Lamp[] = [
    { id: 1,
      name: 'Wohnzimmer LED-Streifen',
      modell: "rgb",
      isOn: true,
      color: "125,80,110",
      brightness: 67,
      room:"Wohnzimmer",
    },
    { id: 2,
      name: 'Küchen LED-Streifen',
      modell: "rgbw",
      isOn: false,
      color: "0,255,100",
      brightness: 100,
      room:"Küche",},
]
