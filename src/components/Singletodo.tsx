import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdOutlineDone } from 'react-icons/md'
import './style.css'
import { Draggable } from 'react-beautiful-dnd'
type props = {
  index: number
  todo: Todo;
  todos: Todo[];
  settodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Singletodo = ({ index, todo, todos, settodos }: props) => {

  const [edit, setedit] = useState<boolean>(false);
  const [edittodo, setedittodo] = useState<string>(todo.todo);
  const handledone = (id: number) => {
    settodos(
      todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      ));
  }
  const handledelet = (id: number) => {
    settodos(todos.filter((todo) => todo.id !== id));
  }
  const handledit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    settodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: edittodo } : todo)))
    setedit(false);
  }
  const inputref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputref.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provider) => (
        <form 
         className="todo_single"
         onSubmit={(e) => handledit(e, todo.id)} 
         {...provider.draggableProps}
         {...provider.dragHandleProps}
         ref={provider.innerRef}>
      {
        edit ? (
          <input ref={inputref} value={edittodo} onChange={(e) => setedittodo(e.target.value)} className="todo_single_text" />
        ) : todo.isDone ? (
          <s className='todo_single_text'>{todo.todo}</s>
        ) : (<span className='todo_single_text'>{todo.todo}</span>)

      }

      {/* <span className='todo_single_text'>{todo.todo}</span> */}
      <div>
        <span className="icon"><AiFillEdit onClick={() => { if (!edit && !todo.isDone) { setedit(!edit) } }} /> </span>
        <span className="icon"><AiFillDelete onClick={() => handledelet(todo.id)} /> </span>
        <span className="icon"><MdOutlineDone onClick={() => handledone(todo.id)} /> </span>
      </div>
    </form>)
}
    </Draggable >
  );

}

export default Singletodo
