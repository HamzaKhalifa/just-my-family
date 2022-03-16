import React from 'react'
import { useTheme } from 'react-jss'
import { DebounceInput } from 'react-debounce-input'
import CSS from 'csstype'

import useStyles from './styles'
import { ITheme } from 'theme'

interface IInput {
  name?: string
  value?: string | number
  onChange?: any
  placeholder?: string
  formik?: any
  type?: string
  error?: string
  PrefixIcon?: any
  SuffixIcon?: any
  style?: CSS.Properties
  debounce?: boolean
}

const Input = React.forwardRef((props: IInput, ref: any) => {
  const styles = useStyles()
  const theme: ITheme = useTheme()

  const formikProps = React.useMemo(
    () =>
      props.formik && props.name
        ? {
            onChange: props.formik.handleChange,
            value: props.formik.values[props.name],
            onBlur: props.formik.handleBlur,
          }
        : {},
    [props.formik, props.name]
  )
  const error: string = React.useMemo(() => {
    if (props.name && props.formik?.touched[props.name])
      return props.formik.errors[props.name]
    else return props.error
  }, [props.formik, props.error, props.name])

  return (
    <div
      style={{ ...(props.style ?? {}) }}
      className={styles[error ? 'inputErrorContainer' : 'inputContainer']}
    >
      {props.PrefixIcon && (
        <props.PrefixIcon
          size={25}
          color={error ? theme.error : theme.primaryColor}
        />
      )}

      {!props.debounce && (
        <input
          ref={ref}
          className={styles.input}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          type={props.type}
          {...formikProps}
        />
      )}

      {props.debounce && (
        <DebounceInput
          inputRef={ref}
          minLength={3}
          debounceTimeout={300}
          onChange={props.onChange}
          className={styles.input}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          type={props.type}
        />
      )}

      {props.SuffixIcon && (
        <props.SuffixIcon
          style={{ cursor: 'pointer' }}
          onClick={() => {
            ref?.current?.focus()
          }}
          size={25}
          color={error ? theme.error : theme.primaryColor}
        />
      )}
      <span className={styles.error}>{error}</span>
    </div>
  )
})

export default React.memo(Input)
