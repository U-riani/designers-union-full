import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  useUpdateProjectsDescriptionMutation,
 
} from "../../data/projectsSlice";

const AdminProjectDescription = ({ data, handleRefetch }) => {
  const projectId = useParams().projectId;
  // console.log(projectId);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [mainProject, setMainProject] = useState(data.mainProject);
  const [updateProjectsDescription] =
    useUpdateProjectsDescriptionMutation(projectId);
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true)
    handleRefetch('start')
    e.preventDefault();
    // Here you could call the update function to save the data
    // const updatedData = { projectId, name, description, mainProject };
    // console.log(updatedData);

    try {
      const formData = new FormData();
      const response = await updateProjectsDescription({
        name,
        description,
        mainProject,
        projectId,
      }).unwrap();

      if (name?.ge) formData.append("name[ge]", name.ge);
      if (name?.en) formData.append("name[en]", name.en);

      if (description?.ge) formData.append("description[ge]", description.ge);
      if (description?.en) formData.append("description[en]", description.en);

      if (mainProject !== undefined)
        formData.append("mainProject", mainProject);
      if(response) {
        handleRefetch('finish')
        setLoading(false)

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Project Name, Description, Main Project Checkbox */}
      <div>
        <label>Name (Georgian)</label>
        <input
          type="text"
          value={name.ge}
          onChange={(e) => setName({ ...name, ge: e.target.value })}
        />
      </div>
      <div>
        <label>Name (English)</label>
        <input
          type="text"
          value={name.en}
          onChange={(e) => setName({ ...name, en: e.target.value })}
        />
      </div>
      <div className="d-flex flex-column py-3 bg-light">
        <label>Description (Georgian)</label>
        <textarea
          rows={5}
          value={description.ge}
          onChange={(e) =>
            setDescription({ ...description, ge: e.target.value })
          }
        />
      </div>
      <div className="d-flex flex-column py-3 bg-light">
        <label>Description (English)</label>
        <textarea
          rows={5}
          value={description.en}
          onChange={(e) =>
            setDescription({ ...description, en: e.target.value })
          }
        />
      </div>
      <div>
        <label>Main Project</label>
        <input
          type="checkbox"
          checked={mainProject}
          onChange={(e) => setMainProject(e.target.checked)}
        />
      </div>
      <Button disabled={loading ? true : false} variant="success" type="submit">
        {loading ? 'loading ...' :"Save Update"}
      </Button>
    </form>
  );
};

export default AdminProjectDescription;
