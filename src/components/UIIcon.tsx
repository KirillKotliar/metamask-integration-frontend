import React, { ComponentProps, ComponentType } from 'react'
import { palette } from 'styles/style-constants'
import styled, {
  AnyStyledComponent,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
} from 'styled-components'
import { UIBlock } from 'components/ui-blocks'
import { UIBlockProps } from 'components/ui-blocks/UiBlocks'

type inferStyledTypes<T extends AnyStyledComponent> =
  ComponentProps<StyledComponentInnerComponent<T>>
  & StyledComponentInnerOtherProps<T>

type UIIconOwnProps = {
  size?: 64 | 48 | 40 | 32 | 24 | 20 | 16,
  active?: boolean,
  activeFill?: string,
  fill?: string,
  opacity?: number,
  className?: string,
  icon: ComponentType,
  containerFill?: UIBlockProps['fill'],
}

type UIIconProps = UIIconOwnProps & Omit<inferStyledTypes<typeof UIBlock>, 'fill' | 'ref'>

type UIIconContainerProps = {
  size?: UIIconOwnProps['size'],
  opacity?: UIIconOwnProps['opacity'],
  fill?: UIBlockProps['fill'],
}

const UIIconContainer = styled(UIBlock)<UIIconContainerProps>`
  transition: color .12s linear;

  svg {
    fill: currentColor;
    width: ${props => (props.size ?? 32) + 'px'};
    height: ${props => (props.size ?? 32) + 'px'};
    opacity: ${props => props.opacity};
  }
`

const _UIIcon = React.forwardRef<HTMLDivElement, UIIconProps>((props, ref) => {
  const {
    active = false,
    activeFill = palette.green,
    fill,
    icon: Icon,
    className,
    size = 32,
    opacity,
    containerFill,
    ...containerProps
  } = props
  const finalFill = (active ? activeFill : fill) ?? 'inherit'
  return ( // @ts-ignore
    <UIIconContainer
      fill={containerFill}
      {...containerProps}
      textColor={finalFill}
      size={size}
      ref={ref}
      w={size}
      h={size}
      className={className}
      opacity={opacity}
    >
      <Icon />
    </UIIconContainer>
  )
})

export const UIIcon = styled(_UIIcon)<UIIconProps>``
