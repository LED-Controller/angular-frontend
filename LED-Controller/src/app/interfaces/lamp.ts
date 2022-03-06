import { Color } from './color';
import { LightType } from './lightType';
export interface Lamp {
  mac: string,
  name: string,
  typ: LightType,
  isOn: boolean,
  isOnline: boolean,
  color: Color,
  brightness: number,
}
