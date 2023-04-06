import { Injectable } from '@angular/core';
const tailwindConfig = require('../../../tailwind.config');

@Injectable({
  providedIn: 'root',
})
export class ColorPickerService {
  constructor() {}

  getColor(shade: string) {
    return tailwindConfig.theme.colors['custom-color'][shade];
  }

  setCustomColor(colorName: string, colorValue: string) {
    tailwindConfig.theme.colors[colorName] = ({ opacityVariable, opacityValue, color }: { opacityVariable: string, opacityValue: number, color: any }) => {
      const newColor = color.alpha(opacityValue / 100).toString();
      console.log(newColor);
      return {
        '50': color.alpha(0.05).mix(newColor, 0.5).string(),
        '100': color.alpha(0.1).mix(newColor, 0.5).string(),
        '200': color.alpha(0.2).mix(newColor, 0.5).string(),
        '300': color.alpha(0.3).mix(newColor, 0.5).string(),
        '400': color.alpha(0.4).mix(newColor, 0.5).string(),
        '500': color.alpha(0.5).mix(newColor, 0.5).string(),
        '600': color.alpha(0.6).mix(newColor, 0.5).string(),
        '700': color.alpha(0.7).mix(newColor, 0.5).string(),
        '800': color.alpha(0.8).mix(newColor, 0.5).string(),
        '900': color.alpha(0.9).mix(newColor, 0.5).string(),
      };
    };
  }
}
