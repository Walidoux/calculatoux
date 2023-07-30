import './index.css'
import 'solid-devtools'

import { render } from 'solid-js/web'

import Main from './Main'

render(() => {
  return <Main />
}, document.getElementById('root') as HTMLElement)
