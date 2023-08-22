import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LiaSave } from "react-icons/lia";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function EditableTask({ task, onUpdate, onDelete, fetchTasks }) {
  console.log(task.completed);
  const { authState } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [checked, setChecked] = useState(task.completed);

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleSaveClick = () => {
    if (editedText !== task.text) {
      onUpdate(task.id, editedText, checked);
    }
    setIsEditing(false);
  };

  async function updateStatus(e) {
    setChecked(e);
    onUpdate(task.id, editedText, e);
  }

  return (
    <div className="text-gray-500 text-lg flex items-center justify-between gap-2">
      <div className="flex items-center justify-between gap-2">
        <input
          type="checkbox"
          id={task.id}
          name={task.id}
          checked={checked}
          onChange={(e) => updateStatus(e.target.checked)}
        />
        {isEditing ? (
          <input type="text" value={editedText} onChange={handleInputChange} />
        ) : (
          <label htmlFor={task.id}>{editedText}</label>
        )}
      </div>
      <div>
        {isEditing ? (
          <button onClick={handleSaveClick}>
            <LiaSave />
          </button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>
              <FiEdit />
            </button>
            <button onClick={() => onDelete(task.id)}>
              <MdOutlineDeleteOutline />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EditableTask;
