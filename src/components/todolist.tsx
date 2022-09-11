import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import Singletodo from './Singletodo';

interface props {
  todos: Todo[]
  settodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  Completedtodo: Todo[]
  setCompletedtodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Todolist: React.FC<props> = ({ todos, settodos, Completedtodo, setCompletedtodo }) => {
  return (
    <div className="container">
      <Droppable droppableId="todo_list">
        {
          (provider) =>
            <div className="todos" ref={provider.innerRef} {...provider.droppableProps}>
              <span className='todosheading'>Active Tasks</span>

              {todos.map((todo,index) => (
                <Singletodo index={index} todo={todo} key={todo.id} todos={todos} settodos={settodos} />
              ))}
              {provider.placeholder}
            </div>
        }
      </Droppable>
      <Droppable droppableId='todo_remove'>
        {
          (provider) =>
            <div className="todos remove" ref={provider.innerRef} {...provider.droppableProps}>
              <span className='todosheading'>Completed Tasks</span>
              {Completedtodo.map((todo,index) => (
                <Singletodo index={index} todo={todo} key={todo.id} todos={Completedtodo} settodos={setCompletedtodo} />
              ))}
              {provider.placeholder}
            </div>
        }
      </Droppable>

    </div>
    // <div className='todos'>
    //     {todos.map((todo)=> (
    //         <Singletodo  todo={todo}  key={todo.id} todos={todos} settodos={settodos} />
    //     ))}
    // </div>
  )
}

export default Todolist
