import { Color } from './color';
import { LightType } from './lightType';
export interface Lamp {
  mac: string,
  name: string,
  type: LightType,
  on: boolean,
  online: boolean,
  color: Color,
  brightness: number,
}
