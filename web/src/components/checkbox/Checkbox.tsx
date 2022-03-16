import React from 'react'
import { useTheme } from 'react-jss'

import useStyles from './styles'
import { ITheme } from 'theme'

interface ICheckbox {
  checked?: boolean
  label?: string
  formik?: any
  name?: string
  error?: string
  PrefixIcon?: any
  SuffixIcon?: any
  onChange?: any
  style?: any
}

const Checkbox = (props: ICheckbox) => {
  const styles = useStyles()
  const theme: ITheme = useTheme()

  const formikProps = React.useMemo(
    () =>
      props.formik && props.name
        ? {
            onChange: props.formik.handleChange,
            checked: props.formik.values[props.name],
            onBlur: props.formik.handleBlur,
          }
        : {},
    [props.formik, props.name]
  )
  const error: string = React.useMemo(() => {
    if (props.name && props.formik?.touched[props.name]) return props.formik.errors[props.name]
    else return props.error
  }, [props.formik, props.error, props.name])

  return (
    <div
      onClick={() => props.onChange(props.name)}
      style={{ ...(props.style || {}) }}
      className={styles[error ? 'checkboxErrorContainer' : 'checkboxContainer']}
    >
      {props.PrefixIcon && <props.PrefixIcon size={25} color={error ? theme.error : theme.primaryColor} />}

      <span className={styles.label}>{props.label}</span>

      <input
        type="checkbox"
        className={styles.checkbox}
        name={props.name}
        checked={props.checked}
        onChange={() => {}}
        {...formikProps}
      />

      {props.SuffixIcon && (
        <props.SuffixIcon
          style={{ cursor: 'pointer' }}
          size={25}
          color={error ? theme.error : theme.primaryColor}
        />
      )}
      <span className={styles.error}>{error}</span>
    </div>
  )
}

export default React.memo(Checkbox)
