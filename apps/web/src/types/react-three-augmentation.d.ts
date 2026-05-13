/**
 * React Three Fiber JSX Component Type Augmentation
 * Fixes JSX component compatibility issues with R3F v9 + drei v10
 */

import type React from 'react'
import type { ForwardRefExoticComponent, PropsWithChildren } from 'react'

// Extend JSX.IntrinsicElements to support lineBasicNodeMaterial
declare global {
  namespace JSX {
    interface IntrinsicElements {
      lineBasicNodeMaterial: {
        args?: [any]
        attach?: string
        color?: string | number
        transparent?: boolean
        opacity?: number
        fog?: boolean
        depthTest?: boolean
        depthWrite?: boolean
        linewidth?: number
        wireframe?: boolean
        ref?: React.Ref<any>
        [key: string]: any
      }
    }
  }
}

// Make ForwardRefExoticComponent JSX compatible
declare module '@react-three/drei' {
  export const Html: React.FC<any> & {
    displayName?: string
  }
  export const PointerLockControls: React.FC<any> & {
    displayName?: string
  }
  export const PolygonEditor: React.FC<any> & {
    displayName?: string
  }
}

// Fix React Three Fiber JSX component exports
declare module '@react-three/fiber' {
  export const Html: React.FC<any>
}

export {}
