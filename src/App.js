import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./Hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback((tasksObj) => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp(transformTasks);

  useEffect(() => {
    fetchTasks({
      url: "https://react-http-11a5d-default-rtdb.firebaseio.com/tasks.json",
    });
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
