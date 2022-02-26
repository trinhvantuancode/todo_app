import React from 'react';
import Todo from '../Todo';

export default function TodoList( 
    { todoList , onCheckBtnClick, 
      openModal, onRemoveBtnClick } ) {
  return (
    <div className='todo-list' style={{padding: '10px 20px'}}>
      {
        todoList.map(todo => (
          <Todo 
            key={todo.id} 
            todo={todo} 
            onCheckBtnClick={onCheckBtnClick}
            onRemoveBtnClick={onRemoveBtnClick}
            openModal={openModal}
          />
        ))
      }
    </div>
  );
}
