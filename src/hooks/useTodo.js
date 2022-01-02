import React, { useState, useEffect } from 'react';
import { ulid } from 'ulid';
import * as todoData from '../apis/todos';

export const useTodo = () => {

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      setTodoList([...todo].reverse());
    });
  }, []);

  console.log("TODOリスト:", todoList);

  // ステータス変更
  const toggleTodoListItemStatus = (id, done) => {
    const todoItem = todoList.find((item) => item.id === id);
    const newTodoItem = {...todoItem, done: !done };

    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((item) =>
        item.id !== updatedTodo.id ? item : updatedTodo
      );
      setTodoList(newTodoList);
    });
  };

  // 新規TODO追加
  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      content: todoContent,
      id: ulid(),
      done: false
    };

    return todoData.addTodoData(newTodoItem).then((addTodo)=> {
      setTodoList([addTodo, ...todoList]);
    });
  };

  // TODO削除
  const deleteTodoListItem = (id) => {
    todoData.deleteTodoData(id).then((deleteListItemId) => {
      const newTodoList = todoList.filter(
        (item) => item.id !== deleteListItemId
      );

      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem
  };
};