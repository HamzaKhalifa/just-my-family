import React from 'react'
/* @ts-ignore */
import Loading from 'react-simple-loading'
import { useTheme } from 'react-jss'
import CSS from 'csstype'

import useStyles from './styles'
import { ITheme } from 'theme'

interface ILoader {
  style?: CSS.Properties
}

const Loader = (props: ILoader) => {
  const theme: ITheme = useTheme()

  const styles = useStyles()

  return (
    <div className={styles.loader} style={{ ...(props.style || {}) }}>
      <Loading color={theme.primaryColor} />
    </div>
  )
}

export default React.memo(Loader)
