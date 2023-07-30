import type { Component, JSX } from 'solid-js'
import { For, createSignal } from 'solid-js'
import { BsPlusSlashMinus } from 'solid-icons/bs'
import { AiOutlinePercentage } from 'solid-icons/ai'
import { FaSolidDivide, FaSolidXmark, FaSolidPlus, FaSolidMinus, FaSolidEquals } from 'solid-icons/fa'
import { TbBackspace } from 'solid-icons/tb'
import clsx from 'clsx'
import { Calc } from 'calc-js'

export interface IOPeration {
  content: JSX.Element
  ctx: <T extends number>(value: T) => void
}

export interface Calculator {
  handler: Calc | null
  finished: boolean
}

const App: Component = () => {
  const [input, setInput] = createSignal<Calculator>({ handler: null, finished: false })
  const [output, setOuput] = createSignal<number>()

  const [tempNumb, setTempNumb] = createSignal('')

  const [error, setError] = createSignal('')

  const updateInput = (newCtx: Calculator): Calculator => setInput((prevCtx) => ({ ...prevCtx, ...newCtx }))

  // After 10 seconds, the operation is considered over
  const timeOutBeforeFinish = (): NodeJS.Timeout =>
    setTimeout(() => updateInput({ handler: null, finished: true }), 1000)

  const operations: IOPeration[] = [
    {
      content: 'AC',
      ctx: () => {
        setOuput()
        updateInput({ handler: null, finished: true })
        setTempNumb('')
      }
    },
    { content: <BsPlusSlashMinus />, ctx: () => {} },
    { content: <AiOutlinePercentage />, ctx: () => {} },
    { content: <FaSolidDivide />, ctx() {} },
    { content: 7, ctx: () => {} },
    { content: 8, ctx: () => {} },
    { content: 9, ctx: () => {} },
    { content: <FaSolidXmark />, ctx: (value) => input().handler?.multiply(value) },
    { content: 4, ctx: () => {} },
    { content: 5, ctx: () => {} },
    { content: 6, ctx: () => {} },
    { content: <FaSolidMinus />, ctx: (value) => input().handler?.minus(value) },
    { content: 1, ctx: () => {} },
    { content: 2, ctx: () => {} },
    { content: 3, ctx: () => {} },
    { content: <FaSolidPlus />, ctx: (value) => input().handler?.sum(value) },
    { content: ',', ctx: () => {} },
    { content: 0, ctx: () => {} },
    { content: <TbBackspace />, ctx: () => {} },
    {
      content: <FaSolidEquals />,
      ctx: () => {
        const result = input().handler?.finish()

        console.log(timeOutBeforeFinish())

        setOuput(result)
      }
    }
  ]

  const handleInput = (operation: (typeof operations)[number]): void => {
    setError('')
    clearTimeout(timeOutBeforeFinish())

    if (input().handler == null) {
      if (operation.content === 'AC') return operation.ctx(0)
      if (typeof operation.content !== 'number') {
        setError('Cannot use arethmic operations before starting with a number')
        return
      }

      setInput((prevCtx) => ({ ...prevCtx, handler: new Calc(operation.content as number) }))
    }

    if (typeof operation.content === 'number') {
      setTempNumb((prevValue) => prevValue.concat(String(operation.content)))
    } else {
      operation.ctx(Number(tempNumb()))
      setTempNumb('')
    }
  }

  return (
    <main class='h-screen overflow-hidden fill-white text-white'>
      <div class='flex h-1/3 bg-neutral-800/70'>
        {output()}
        {tempNumb()}
        {error()}
      </div>
      <div class='grid h-2/3 grid-cols-4 grid-rows-5'>
        <For each={operations}>
          {(ope, index) => {
            const pointer = Number(index()) + 1
            const subModule = pointer % 4 !== 0

            return (
              <button
                onClick={() => handleInput(ope)}
                class={clsx('grid h-full w-full place-items-center text-lg', {
                  'fill-white/50 text-opacity-50': pointer <= 3,
                  'bg-zinc-800': subModule,
                  'bg-indigo-500': !subModule,
                  '!bg-orange-500': index() === operations.length - 1
                })}>
                {ope.content}
              </button>
            )
          }}
        </For>
      </div>
    </main>
  )
}

export default App
