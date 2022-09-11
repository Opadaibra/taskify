
import React, { FormEvent, useState } from 'react';
import './App.css';
import InputeField from './components/InputeField';
import Todolist from './components/todolist';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
const App: React.FC = () => {
  //list singl element text
  const [todo, settodo] = useState<string>("");
  //list of elements type todo { id , todo , isDone?} 
  const [todos, settodos] = useState<Todo[]>([]);
  const [Completedtodo, setCompletedtodo] = useState<Todo[]>([]);
  //add new element to list
  const handleadd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      settodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      settodo("");
    }
  }
  const ondragend = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId == source.droppableId || destination.index == source.index) return;
    let add, active = todos, complet = Completedtodo;
    if (source.droppableId == 'todo_list') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complet[source.index];
      complet.splice(source.index, 1);
    }
    if (destination.droppableId == 'todo_list') {
      active.splice(destination.index, 0, add);
    } else {
      complet.splice(destination.index, 0, add);
    }
    setCompletedtodo(complet);
    settodos(active);
  };


  //view section
  return (
    <DragDropContext onDragEnd={ondragend}>
      <div className="App">
        {/* head line */}
        <span className='heading'>Taskify</span>
        <InputeField todo={todo} setTodo={settodo} handladd={handleadd} />
        <Todolist todos={todos} settodos={settodos} Completedtodo={Completedtodo} setCompletedtodo={setCompletedtodo} />
      </div>
    </DragDropContext>
  );
}

export default App;
