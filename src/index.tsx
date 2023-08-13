// @refresh reload
import './index.css'
import 'solid-devtools'

import { render } from 'solid-js/web'

import Main from './Main'

render(() => <Main />, document.getElementById('root') as HTMLElement)
