import React, { useRef } from 'react'
import "./style.css"

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handladd: (e: React.FormEvent) => void;
}
const InputeField = ({ todo, setTodo, handladd }: props) => {
  const inputref = useRef<HTMLInputElement>(null);
  return (

    <form className='input'
      onSubmit={(e) => {
        handladd(e);
        inputref.current?.blur();
      }}
    >
      <input ref={inputref}
        type="text" placeholder='Enter a task' className='inputbox'
        value={todo}
        onChange={
          (e) => setTodo(e.target.value)
        }
      />
      <button className='input_btn' type='submit'>Go</button>
    </form>
  )
}

export default InputeField
