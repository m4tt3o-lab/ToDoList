import React, { useEffect, useState } from 'react';
import classes from '../styles/ToDo.module.css'; 

function ToDoList() {

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      document.body.style.backgroundColor = 'black';
      return () => {
          document.body.style.backgroundColor = ''; 
      };
  }, []);

    useEffect(() => {
        getTasks();
    }, []);

    async function getTasks() {
        try {
            const url = "http://localhost:3000/tasks";
            const response = await fetch(url);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Errore durante il recupero delle transazioni:", error);
        }
    }

    const addTask = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3000/tasks";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    task: newTask
                }),
            });
            if (response.ok) {
                await getTasks(); 
                setNewTask('');
                console.log("Task aggiunto con successo.");
            } else {
                console.error("Errore durante l'aggiunta del task.");
            }
        } catch (error) {
            console.error("Errore durante la richiesta di aggiunta del task:", error);
        }
    }

    const removeTask = async (id) => {
        const url = `http://localhost:3000/tasks/${id}`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (response.ok) {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
                console.log("Task cancellato con successo.");
            } else {
                console.error("Errore durante la cancellazione del task.");
            }
        } catch (error) {
            console.error("Errore durante la richiesta di cancellazione del task:", error);
        }
    }

    const upperTask = (index) => {
        if (index > 0) {
            setTasks(prevTasks => {
                const newTasks = [...prevTasks];
                [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
                return newTasks;
            });
        }
    };

    const downTask = (index) => {
        if (index < tasks.length - 1) {
            setTasks(prevTasks => {
                const newTasks = [...prevTasks];
                [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
                return newTasks;
            });
        }
    };

    const handleKeyDown = (event, callback) => {
        if (event.key === 'Enter') {
            callback(event);
        }
    };
    return (
      <div className={classes.mainContainer}>
          <h1 className={classes.projectTitle}><b>To-Do List</b></h1>
          <div>
              <input
                  placeholder="Insert task"
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, addTask)}
                  className={classes.inputText}
              />
              <button className={`${classes.buttonAdd} ${classes.buttonToDO}`} onClick={addTask}>Add</button><br /><br />
          </div>

          <ol className={classes.list}>
              {tasks.map((task, index) => (
                   <li key={task._id} className={`${classes.listItem} ${classes.buttonToDO}`}>
                      <span className={classes.text}>{task.task}</span>
                      <button className={`${classes.deleteButton} ${classes.buttonToDO}`} onClick={() => removeTask(task._id)}>Remove</button>
                      <button className={`${classes.upButton} ${classes.buttonToDO}`} onClick={() => upperTask(index)}>👆</button>
                      <button className={`${classes.downButton} ${classes.buttonToDO}`} onClick={() => downTask(index)}>👇</button>
                  </li>
              ))}
          </ol>
      </div>
  );
}

export default ToDoList;
