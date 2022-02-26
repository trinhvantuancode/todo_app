import React , { useState , useEffect, useCallback, useRef } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTransition,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { getTodoList, addNewTodo, removeTodo, editCheckTodo, editNameTodo } from './components/apis';

function App() {

  const [todoList,setTodoList] = useState([]);
  const [addTextInp, setAddTextInp] = useState("");
  const [editTodo, setEditTodo] = useState(undefined);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const editField = useRef();

  // open Edit Form
  const openModal = useCallback((prevTodo) => setEditTodo(prevTodo), []);
  // close Edit Form
  const closeModal = useCallback(() => setEditTodo(undefined), []);

  // call api get todo list
  useEffect(() => {
    getTodoList().then(rep => {
      setTodoList(rep);
    });
  }, []);

  // textfield change -> button isDisabled change from true to false and contrary
  const onEditChangeHandle = useCallback((e) => {
    e.target.value === e.target.defaultValue ? setIsOpenEdit(false) : setIsOpenEdit(true);
  }, []);

  // Change textfield form add -> change addTextInp
  const onAddChangeHandle = useCallback((e) => {
    setAddTextInp(e.target.value);
  }, []);

  // call api add new todo
  const onAddHandleSubmit = useCallback((e) => {
    addNewTodo({name: addTextInp, isCompleted: false}).then((rep => {
      setTodoList((prev) => [rep, ...prev]);
    }));
    setAddTextInp("");
    e.preventDefault();
  }, [addTextInp]);

  // call api edit todo isComplete from true to false and contrary
  const onCheckBtnClick = useCallback((prevTodo) => {
    editCheckTodo({...prevTodo, isCompleted : true}).then((rep) => {
      setTodoList((prev) => (prev.map((todo) => todo.id === prevTodo.id ? rep : todo)));
    });
  }, []);

  // call api edit name todo
  const onEditHandleSubmit = useCallback((e) => {
    editNameTodo({...editTodo, name: editField.current.value}).then((rep) => {
      setTodoList((prev) => (prev.map((todo) => todo.id === rep.id ? rep : todo)));
    });
    closeModal();
    e.preventDefault();
  }, [editTodo, closeModal]);

  // call api remove todo from list todo
  const onRemoveBtnClick = useCallback((prevTodo) => {
    removeTodo(prevTodo).then(() => {
      setTodoList((prev) => prev.filter(todo => todo.id !== prevTodo.id));
    });
  }, []);
  console.log("reload");

  return (
    <div className="App">
      <h2>Nhiệm vụ cần làm</h2>
      <form style={{padding: '10px 20px'}} onSubmit={onAddHandleSubmit}>
          <Textfield 
          name='addtodo' 
          placeholder='Nhập công việc muốn thêm...'
          elemAfterInput={
            <Button 
              appearance="primary"
              isDisabled={!addTextInp}
              type="submit"
            >Thêm</Button>
          }
          onChange={onAddChangeHandle}
          value={addTextInp}
          ></Textfield>
      </form>
      <TodoList 
        todoList={todoList} 
        onCheckBtnClick={onCheckBtnClick} 
        onRemoveBtnClick={onRemoveBtnClick}
        openModal={openModal}
      />
      <ModalTransition>
        { editTodo && (
        <Modal onClose={closeModal}>
            <form onSubmit={onEditHandleSubmit}>
            <ModalHeader>
                <ModalTitle>Sửa việc làm</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Textfield 
                defaultValue={editTodo.name}
                onChange={onEditChangeHandle} 
                ref={editField}
              />
            </ModalBody>
            <ModalFooter>
                <Button appearance="warning" onClick={closeModal}>
                    Hủy
                </Button>
                <Button appearance="primary"
                 type="submit"
                 isDisabled={!isOpenEdit}
                 >
                    Sửa
                </Button>
            </ModalFooter>
            </form>
        </Modal>
        )}
      </ModalTransition>
    </div>
  );
}

export default App;
