import type { Component, JSX } from 'solid-js'
import { For, createSignal } from 'solid-js'
import { BsPlusSlashMinus } from 'solid-icons/bs'
import { AiOutlinePercentage } from 'solid-icons/ai'
import { FaSolidDivide, FaSolidXmark, FaSolidPlus, FaSolidMinus, FaSolidEquals } from 'solid-icons/fa'
import { TbBackspace } from 'solid-icons/tb'
import clsx from 'clsx'
import { Motion } from '@motionone/solid'

import { calculate } from './bindings'
import { Animations } from './utils/Animations'

export interface IOperation {
  content: JSX.Element
  ctx?: Token | (() => unknown)
}

const App: Component = () => {
  const [result, setResult] = createSignal<number>()
  const [input, setInput] = createSignal<JSX.Element[]>([])

  const tokens: Token[] = []

  const operations: IOperation[] = [
    { content: 'AC', ctx: () => setInput([]) },
    { content: <BsPlusSlashMinus />, ctx: '-' },
    { content: <AiOutlinePercentage />, ctx: '%' },
    { content: <FaSolidDivide />, ctx: '/' },
    { content: 7 },
    { content: 8 },
    { content: 9 },
    { content: <FaSolidXmark />, ctx: '*' },
    { content: 4 },
    { content: 5 },
    { content: 6 },
    { content: <FaSolidMinus />, ctx: '-' },
    { content: 1 },
    { content: 2 },
    { content: 3 },
    { content: <FaSolidPlus />, ctx: '+' },
    { content: ',' },
    { content: 0 },
    { content: <TbBackspace />, ctx: () => setInput(input().slice(0, -1)) },
    { content: <FaSolidEquals />, ctx: async () => await calculate(tokens.join('')) }
  ]

  const handleTyping = async (operation: IOperation) => {
    if (typeof operation.ctx === 'function') return operation.ctx()

    setInput((prevInput) => {
      tokens.push(typeof operation.content === 'object' ? operation.ctx : operation.content)
      return [...prevInput, operation.content]
    })

    console.log(input())
  }

  return (
    <main class='h-screen overflow-hidden fill-white text-white'>
      <div class='flex h-1/3 flex-col bg-gradient-to-tr from-zinc-800/80 to-zinc-700/80 px-3 py-2'>
        <span class='h-full w-full cursor-default select-none text-right text-3xl hover:opacity-70'>20</span>
        <ul class='flex h-full w-full items-center justify-end border border-white'>
          <For each={input()}>
            {(token) => <Motion.li {...Animations.fadeInOut({ width: [0, '12px', 0] })}>{token}</Motion.li>}
          </For>
        </ul>
      </div>

      <div class='grid h-2/3 grid-cols-4 grid-rows-5'>
        <For each={operations}>
          {(operation, index) => {
            const pointer = index() + 1
            const subModule = pointer % 4 !== 0

            return (
              <button
                onClick={async () => await handleTyping(operation)}
                class={clsx('group grid h-full w-full place-items-center text-lg hover:brightness-125', {
                  'bg-zinc-800': subModule,
                  'bg-indigo-500': !subModule,
                  'bg-orange-500': index() === operations.length - 1,
                  '!bg-red-500': index() === 0
                })}>
                <span class='transition-opacity duration-[25ms] group-active:opacity-30'>{operation.content}</span>
              </button>
            )
          }}
        </For>
      </div>
    </main>
  )
}

export default App
