import color from './color'
import get from './get'
import { multiply, pxTo } from './calcs'
import ms from 'modularscale-js'

export default class DesignSystem {
  constructor(system) {
    this.designSystem = system
    this.color = color(system.colorPalette)
    this.multiply = multiply
    this.pxTo = pxTo
  }

  get(val) {
    return get(this.designSystem, val)
  }

  bp(bp) {
    return get(this.designSystem.breakpoints, bp)
  }

  z(z) {
    return get(this.designSystem.zIndex, z)
  }

  fontSize(size) {
    const value = get(this.designSystem.type.sizes, size)
    let output
    if (this.designSystem.settings.useModularScale) {
      output = ms(value, this.designSystem.type.modularscale)
    } else {
      output = value
    }

    switch (this.designSystem.settings.fontSizeUnit) {
      case 'rem':
        return pxTo(output, this.designSystem.type.baseFontSize, 'rem')
      case 'em':
        return pxTo(output, this.designSystem.type.baseFontSize, 'em')
      default:
        return `${output}px`
    }
  }

  fs(size) {
    return this.fontSize(size)
  }

  spacing(index = 0) {
    return `${this.designSystem.spacing.scale[index]}px`;
  }
}