import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { UIRow } from 'components/ui-blocks'
import styled, { css, keyframes } from 'styled-components'
import { UIFlexProps } from 'components/ui-blocks/UiBlocks'
import { UIIcon } from 'src/components/UIIcon'
import { ReactComponent as IconClose } from 'icons/close-32.svg'
import { UIBackgroundColors, UIBorderColors, UIColors, UITextColors } from 'components/UIColors'
import { opacifyRGB } from 'utils/opacify'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement

type UIInputContainerProps = {
  variant?: 'standart' | 'filled',
  isActive?: boolean,
  isFocused?: boolean,
  disabled?: boolean,
  error?: boolean,
  addonBefore?: unknown,
  addonAfter?: unknown,
  success?: boolean,
  textarea?: unknown,
}

const UIInputLabel = styled.label`
  position: absolute;
  pointer-events: none;
  line-height: 1em;
  top: 24px;
  left: 8px;
  transform: translateY(-50%);
  font-weight: 500;
  font-size: 13px;
  opacity: 1;
  color: ${UITextColors.gray};
  transition: top .15s ease, opacity .15s ease, font-size .15s ease;
`

const autoFillApply = keyframes`
  from {
    display: block;
  }
`

const autoFillCancel = keyframes`
  from {
    background-color: transparent;
    display: block;
  }
`

const UIInputBase = styled.input<{ constraintHeight?: boolean }>`
  background-color: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  height: 46px;
  font-weight: 500;
  color: ${UITextColors.base};
  filter: none;
  min-width: 32px;
  flex: 1 1 0;
  padding-left: 0;
  display: inline-block;
  animation-name: ${autoFillCancel};
  animation-duration: 10ms;
  width: inherit;

  &:-webkit-autofill {
    animation-name: ${autoFillApply};
    transition-delay: 9999s;
  }

  ${props => props.constraintHeight && css`
    textarea& {
      box-sizing: border-box;
      min-height: 24px;
      height: 24px;
      padding-bottom: 8px;
    }
  `}

  textarea& {
    height: 100%;
    padding: 0 14px 14px 0;
    margin: 8px auto 0;
  }

  &::placeholder {
    color: ${UITextColors.grayLight};
    font-family: inherit;
    font-weight: 500;
    opacity: 1;
  }

  &[disabled] {
    color: ${opacifyRGB(UITextColors.base, .5)}
  }
`

const UIInputContainer = styled(UIRow)<UIInputContainerProps>`
  position: relative;
  box-sizing: border-box;
  border: 1px solid transparent;
  box-shadow: inset 0 2px 5px ${opacifyRGB(UIBorderColors.base, .02)};
  border-radius: 2px;
  background-color: ${UIBackgroundColors.gray2};
  transition: border .15s ease, box-shadow .15s ease, border-color .15s ease, background-color .15s ease;
  min-height: ${props => props.textarea ? 'auto' : '48px'};
  width: 100%;
  padding: 0 8px;
  flex-shrink: 1;

  ${props => !props.disabled && css`
    &:hover {
      border-color: ${UIBorderColors.base};
    }
  `}

  ${props => props.disabled && css`
    color: ${opacifyRGB(UITextColors.gray, .5)};

    ${UIInputLabel} {
      color: ${opacifyRGB(UITextColors.gray, .5)};
    }
  `}

  ${props => props.isFocused && css`
    background-color: ${UIBackgroundColors.base};
    border-color: ${opacifyRGB(UIBorderColors.base, .8)};
  `}

  ${props => props.error && css`
    background-color: ${UIBackgroundColors.base};
    border-color: ${UIBorderColors.error};
    box-shadow: inset 0 2px 5px ${opacifyRGB(UIBorderColors.error, .02)};

    &:hover {
      border-color: ${UIBorderColors.error};
      box-shadow: inset 0 2px 5px ${opacifyRGB(UIBorderColors.error, .02)};
    }
  `}

  ${props => props.success && css`
    background-color: ${UIBackgroundColors.base};
    border-color: ${UIBorderColors.green};
    box-shadow: inset 0 2px 5px ${opacifyRGB(UIBorderColors.green, .02)};

    &:hover {
      border-color: ${UIBorderColors.green};
      box-shadow: inset 0 2px 5px ${opacifyRGB(UIBorderColors.green, .02)};
    }
  `}

  ${props => props.isActive && css`
    ${UIInputLabel} {
      font-size: 11px;
      opacity: .7;
      top: 9.5px;
      left: 8px;
    }
  `}

  ${props => props.variant === 'standart' && css`
    background-color: transparent;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid ${opacifyRGB(UIColors.gray600, .4)};
    box-shadow: none;
    padding: 0;

    ${props.error && css`
      border-color: ${UIBorderColors.error};
    `}
    ${UIInputInnerContainer} {
      padding-left: ${props.addonBefore ? '8px' : 0};
      padding-right: ${props.addonAfter ? '8px' : 0};
    }
  `}

  ${props => !!props.textarea && css`
    ${UIInputBase} {
      padding: 16px 0;
    }
  `}

`

const UIInputAddonContainer = styled.div`
  height: 46px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
`

const UIInputBaseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  box-sizing: border-box;


  ${UIInputLabel} + & {
    padding-top: 14px;

    ${UIInputBase}:not(textarea) {
      height: 32px;
    }
  }
`

const UIInputInnerContainer = styled.div<{ hasLabel?: boolean, constraintHeight?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  position: relative;

  ${props => props.constraintHeight && css`
    ${UIInputBase} {
      margin-top: 16px;
    }
  `}

  ${props => props.constraintHeight && props.hasLabel && css`
    ${UIInputBase} {
      margin-top: 8px;
    }
  `}
`

type UIInputOwnProps = {
  variant?: 'standart' | 'filled',
  value?: string | number,
  name?: string | number,
  type?: string,
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  readOnly?: boolean,
  error?: boolean,
  success?: boolean,
  autoComplete?: string,
  autoFocus?: boolean,
  addonBefore?: ReactElement,
  addonAfter?: ReactElement,
  clearable?: boolean,
  containerRef?: ForwardedRef<HTMLDivElement>,
  selectAllOnFocus?: boolean,
  onChange?: ChangeEventHandler<FieldElement>,
  onChangeValue?: (value: string) => void,
  onFocus?: FocusEventHandler<FieldElement>,
  onBlur?: FocusEventHandler<FieldElement>,
  onKeyPress?: KeyboardEventHandler<FieldElement>,
  onEnter?: KeyboardEventHandler<FieldElement>,
  onBackspace?: KeyboardEventHandler<FieldElement>,
  onKeyDown?: KeyboardEventHandler<FieldElement>,
  onClick?: MouseEventHandler<HTMLDivElement>,
  textarea?: false,
  rows?: never,
  cols?: never,
  focused?: boolean,
  constraintHeight?: 'min' | 'max',
  title?: string,
}

type UITextareaOwnProps =
  Omit<UIInputOwnProps, 'textarea' | 'rows' | 'cols'>
  & { textarea?: true, rows?: number, cols?: number }

export type UIInputProps = (UIInputOwnProps | UITextareaOwnProps) & UIFlexProps

export const UIInput = React.forwardRef<FieldElement, UIInputProps>((props, ref) => {
  const {
    variant = 'filled',
    value: _value,
    name,
    type,
    label,
    placeholder,
    disabled,
    readOnly,
    addonBefore,
    autoComplete,
    autoFocus,
    addonAfter,
    clearable,
    selectAllOnFocus,
    onChange,
    onChangeValue,
    onBlur,
    onFocus,
    onKeyPress,
    onEnter,
    onBackspace,
    onKeyDown,
    containerRef,
    textarea,
    cols,
    rows,
    focused: isExternalFocused,
    constraintHeight,
    ...containerProps
  } = props

  const inputRef = useRef<FieldElement | null>(null)

  const [value, setValue] = useState(_value ?? '')

  const [isFocused, setFocused] = useState(isExternalFocused)

  const [isAutoFilled, setAutoFilled] = useState(false)

  const handleChange = useCallback((e: React.ChangeEvent<FieldElement>) => {
    if (onChange) {
      onChange(e)
    }
    setValue(e.target.value)
    if (onChangeValue) {
      onChangeValue(e.target.value)
    }
  }, [onChange, onChangeValue])

  const handleFocus = useCallback((e: React.FocusEvent<FieldElement>) => {
    setFocused(true)
    if (onFocus) {
      onFocus(e)
    }
    if (selectAllOnFocus) {
      e.target.select()
    }
  }, [onFocus, selectAllOnFocus])

  const handleBlur = useCallback((e: React.FocusEvent<FieldElement>) => {
    setFocused(false)
    if (onBlur) {
      onBlur(e)
    }
  }, [onBlur])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputRef = useCallback((elem: any) => {
    inputRef.current = elem
    if (ref) {
      if (typeof ref === 'function') {
        ref(elem)
      } else {
        ref.current = elem
      }
    }
  }, [ref])

  const handleClear = useCallback(() => {
    // Dirty magic to make react emit onChange event
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set
    nativeInputValueSetter!.call(inputRef.current, '')
    const event = new Event('input', { bubbles: true })
    inputRef.current!.dispatchEvent(event)
    inputRef.current!.focus()
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<FieldElement>) => {
    if (onKeyDown) {
      onKeyDown(e)
    }

    if (onEnter && e.key.toLowerCase() === 'enter') {
      onEnter(e)
    }

    if (onBackspace && e.key.toLowerCase() === 'backspace') {
      onBackspace(e)
    }

  }, [onKeyDown, onEnter, onBackspace])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChromeAutoFill = useCallback((e: any) => {
    setAutoFilled(e.animationName === autoFillApply.getName())
  }, [])

  useEffect(() => {
    setValue(_value ?? '')
  }, [_value])

  const hasValue = typeof value === 'number' || value.length > 0

  const isActive = hasValue || isFocused || isAutoFilled

  const isTextarea = textarea || constraintHeight === 'max'

  useEffect(() => {
    if (constraintHeight === 'max' && inputRef.current) {
      inputRef.current.style.height = '0'
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
      inputRef.current.addEventListener('input', () => {
        inputRef.current!.style.height = '0'
        inputRef.current!.style.height = inputRef.current!.scrollHeight + 'px'
      })
    }
  }, [constraintHeight, textarea])

  useEffect(() => {
    if (inputRef.current && inputRef.current.type === 'number' && isFocused) {
      const cancelWheel = (e: Event) => e.preventDefault()

      inputRef.current.addEventListener('wheel', cancelWheel, { passive: false })
      return () => {
        inputRef.current!.removeEventListener('wheel', cancelWheel)
      }
    }
  }, [isFocused])


  return ( // @ts-ignore
    <UIInputContainer
      ref={containerRef}
      isActive={isActive}
      isFocused={isFocused || isExternalFocused}
      disabled={disabled}
      variant={variant}
      addonBefore={!!addonBefore}
      addonAfter={!!addonAfter}
      {...containerProps}
    >
      {!!addonBefore && (
        <UIInputAddonContainer>
          {addonBefore}
        </UIInputAddonContainer>
      )}
      <UIInputInnerContainer hasLabel={!!label} constraintHeight={constraintHeight === 'max'}>
        {!!label && <UIInputLabel>{label}</UIInputLabel>}
        <UIInputBaseContainer>
          {/* @ts-ignore */}
          <UIInputBase
            textarea={textarea}
            as={isTextarea ? 'textarea' : 'input'}
            cols={textarea ? cols : undefined}
            rows={textarea ? rows : undefined}
            ref={handleInputRef}
            value={value}
            name={name?.toString()}
            type={type}
            placeholder={!isActive && !!label ? '' : placeholder}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyPress={onKeyPress}
            onKeyDown={handleKeyDown}
            onAnimationStart={handleChromeAutoFill}
            constraintHeight={constraintHeight === 'max'}
          />
        </UIInputBaseContainer>
      </UIInputInnerContainer>
      {(!!addonAfter || (clearable && hasValue && !disabled && !readOnly)) && (
        <UIInputAddonContainer>
          {addonAfter}
          {(clearable && hasValue && !disabled && !readOnly) && (
            <UIIcon icon={IconClose} size={32} onClick={handleClear} />
          )}
        </UIInputAddonContainer>
      )}
    </UIInputContainer>
  )
})
