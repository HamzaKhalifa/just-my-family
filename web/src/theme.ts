export interface ITheme {
  textColor1: string
  textColor2: string
  primaryColor: string
  secondaryColor: string
  frontColor: string
  secondaryFrontColor: string
  tertiaryFrontColor: string
  error: string
  shadowColor: string
  shadowError: string
}

const theme: ITheme = {
  textColor1: '#000',
  textColor2: '#5f3d3d',
  primaryColor: '#510fec',
  secondaryColor: '#502e9d',
  frontColor: '#fff',
  secondaryFrontColor: '#f2f2f2',
  tertiaryFrontColor: '#b0b0b0',
  error: '#ff0000',
  shadowColor: '#510fec33',
  shadowError: '#ff9898',
}

export default theme
