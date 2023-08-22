import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import EditableTask from "./EditableTask";
import { useRouter } from "next/navigation";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const router = useRouter();
  function handleCreateTask() {
    // Define the new task object
    const newTask = {
      text: "Nova tarefa",
      // Add any other properties for the new task
    };

    // Make the fetch request to create a new task
    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.ok) {
          fetchTasks(); // Fetch updated task list
        } else {
          
          console.error("Error creating task");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Network error:", error);
      });
  }

  function handleDeleteTask(taskId) {
    // Make the fetch request
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authState.token}`, // Include your token here
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchTasks();
        } else {
          // Handle error
          console.error("Error deleting task");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Network error:", error);
      });
  }

  function handleTaskUpdate(taskId, updatedText, completedStatus) {
    // Define the updated task object
    const updatedTask = {
      text: updatedText,
      completed: completedStatus
      // Add any other properties you want to update
    };

    // Make the fetch request
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`, // Include your token here
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (response.ok) {
          fetchTasks();
        } else {
          if (response.status === 403) {
            setAuthState({ token: null });
            router.push("/");
          }
          console.error("Error updating task");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Network error:", error);
      });
  }

  const fetchTasks = async () => {
    if (authState.token) {
      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        console.log('hi')
        if(response.status === 403) {
          setAuthState({token: null})
          router.push('/')
        }
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-80 relative">
      <div className="bg-lila w-full shadow-md py-2 px-6 text-center text-white font-semibold">
        Tarefas
      </div>
      <div className="bg-white flex flex-col pt-8 pb-12 px-10 gap-8 w-full shadow-md text-sm">
        {tasks.map((task) => (
          <EditableTask
            key={task.id}
            task={task}
            onUpdate={handleTaskUpdate}
            onDelete={handleDeleteTask}
            fetchTasks={fetchTasks}
          />
        ))}
      </div>
      <button
        className="bg-lila absolute -bottom-5 py-3 px-6 rounded-full text-white font-semibold"
        onClick={handleCreateTask}
      >
        New Task
      </button>
    </div>
  );
};

export default Tasks;
