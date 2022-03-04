import { LightType } from './../interfaces/lightType';
import { Lamp } from "../interfaces/lamp";

export const Lamps: Lamp[] = [
    { mac: "008041aefd7e",
      name: 'Wohnzimmer LED-Streifen',
      art: LightType.RGB,
      isOn: true,
      isOnline: false,
      color: {r: 255,g:66,b:122,w:-1},
      brightness: 67,
    },
    { mac: "119152bfge8f",
      name: 'Küchen LED-Streifen',
      art: LightType.NEOPIXEL,
      isOn: false,
      isOnline: true,
      color: {r: 44,g:166,b:255,w:-1},
      brightness: 100,
    },
]
