import { createUseStyles } from 'react-jss'

import { ITheme } from 'theme'

const useStyles = createUseStyles((theme: ITheme) => ({
  chatMessageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '20px',
    width: '100%',
  },
  myMessageContainer: {
    extend: 'chatMessageContainer',
    flexDirection: 'row-reverse',
  },
  messageBubble: {
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '20px',
    marginLeft: '10px',
    flex: 1,
  },
  myMessageBubble: {
    extend: 'messageBubble',
    marginRight: '10px',
    backgroundColor: theme.shadowColor,
  },
  messageText: {
    color: theme.textColor1,
    marginBottom: '20px',
  },
  myMessageText: {
    extend: 'messageText',
    color: theme.frontColor,
  },
  messageAttachments: {
    display: 'flex',
  },
  messageSentAt: {
    color: theme.secondaryColor,
    fontSize: '12px',
  },
}))

export default useStyles
