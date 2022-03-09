import { Color } from './color';
import { LightType } from './lightType';
export interface Lamp {
  mac: string,
  name: string,
  type: LightType,
  isOn: boolean,
  isOnline: boolean,
  color: Color,
  brightness: number,
}
