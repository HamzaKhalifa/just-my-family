import React from 'react'
import { useTheme } from 'react-jss'
import CSS from 'csstype'

import useStyles from './styles'
import { ITheme } from 'theme'

interface IButton {
  PrefixIcon?: any
  text?: string
  onClick?: any
  type?: 'button' | 'submit' | 'reset' | undefined
  filled?: boolean
  style?: CSS.Properties
  loading?: boolean
  textStyle?: CSS.Properties
}

const Button = (props: IButton) => {
  const styles = useStyles()
  const theme: ITheme = useTheme()

  return (
    <button
      onClick={props.onClick}
      className={
        styles[props.loading ? 'buttonDislabed' : props.filled ? 'buttonContainerFilled' : 'buttonContainer']
      }
      type={props.type ?? 'button'}
      style={{ ...(props.style ?? {}) }}
      disabled={props.loading}
    >
      {props.PrefixIcon && (
        <props.PrefixIcon color={props.filled ? theme.frontColor : theme.primaryColor} size={25} />
      )}

      {props.text && (
        <h2
          style={{ ...(props.textStyle || {}) }}
          className={styles[props.filled ? 'buttonTitleFilled' : 'buttonTitle']}
        >
          {props.text} {props.loading && '...'}
        </h2>
      )}
    </button>
  )
}

export default React.memo(Button)
