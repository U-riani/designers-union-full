import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import {
  useCreateProjectsHeroDataMutation,
  useUpdateProjectsHeroDataMutation,
  useDeleteProjectsHerodataMutation,
} from "../../data/projectsSlice";
import { useParams } from "react-router-dom";

const AdminProjectsHeroDataComponent = ({ data, handleRefetch }) => {
  const projectId = useParams().projectId;
  const [heroData, setHeroData] = useState(
    data.heroData?.length > 0
      ? data.heroData
      : [{ heroText: { en: "", ge: "" }, image: { url: "" } }]
  );
  const [updateProjectsHeroData] = useUpdateProjectsHeroDataMutation(projectId);
  const [createProjectsHeroData] = useCreateProjectsHeroDataMutation();
  const [deleteProjectsHerodata] = useDeleteProjectsHerodataMutation();
  const { upData } = useUpdateProjectsHeroDataMutation(projectId);
  const [loading, setLoading] = useState(false);
  console.log("upData", upData);

  // Function to handle text changes for hero text (for existing data)
  const handleHeroTextChange = (index, language, value) => {
    const updatedHeroData = heroData.map((hero, i) => {
      if (i === index) {
        const updatedHero = {
          ...hero, // Ensure the hero object is copied
          heroText: {
            ...hero.heroText, // Copy the heroText object
            [language]: value, // Update the specific language field
          },
        };
        return updatedHero;
      }
      return hero;
    });

    setHeroData(updatedHeroData);
  };

  console.log('data', data)

  // Function to handle image change for a hero (for existing data)
  const handleImageChange = (index, file) => {
    const updatedHeroData = heroData.map((hero, i) => {
      if (i === index) {
        const updatedHero = {
          ...hero, // Clone the hero object
          image: file,
          url: URL.createObjectURL(file),
          updatedAt: new Date().toISOString(), // Optionally, update the timestamp
        };
        return updatedHero;
      }
      return hero;
    });

    setHeroData(updatedHeroData);
  };

  console.log(heroData)
  // console.log(heroData[0].image);

  // Function to handle adding a new hero (for new data)
  const handleAddHero = () => {
    const newHero = {
      heroText: { ge: "", en: "" },
      image: { url: "", fileName: "" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setHeroData([...heroData, newHero]);
  };

  // Function to handle creating a hero (for new data when the "Create Hero" button is clicked)
  const handleCreateHero = async (index) => {
    setLoading(true)
    handleRefetch('start')
    const newHero = heroData[index];
    try {
      const formData = new FormData();
      formData.append("index", index);
      formData.append("url", newHero.image.url);
      formData.append("heroText[ge]", newHero.heroText.ge);
      formData.append("heroText[en]", newHero.heroText.en);
      formData.append("images", newHero.image);

      const response = await createProjectsHeroData({
        formData,
        projectId,
      }).unwrap();
      if(response) {
        setLoading(false)
        handleRefetch('finish')
      }
      console.log("--Create HeroData res:", response);
    } catch (error) {
      console.log(error);
    }
    console.log("Creating Hero: ", newHero, index);
    // You can add additional logic here (e.g., send data to a backend API or perform validations)
  };
  console.log(data);

  // Function to handle updating a hero (for existing data)
  // const handleUpdateHero = async (index) => {
  //   console.log(heroData)
  //   const heroToUpdate = heroData[index];
  //   console.log("Updating Hero: ", heroToUpdate.heroText, index);
  //   try{
  //     const response = await updateProjectsHeroData({heroText: heroToUpdate.heroText, projectId, index}).unwrap();
  //    // Assuming `projectId` and `heroData` are available
  //   // const response = await updateProjectsHeroData({ id: projectId, heroData: updatedHeroData });

  //   // Check if the update was successful
  //   if (response.data) {
  //     console.log("Update successful:", response.data); // The server response
  //   } else if (response.error) {
  //     console.error("Update failed:", response.error);
  //   }
  //   }catch(error) {
  //     console.log(error)
  //   }
  //   // You can add more logic here to save the updated data to a backend or database
  // };
  const handleUpdateHero = async (index) => {
    const heroToUpdate = heroData[index];
    setLoading(true);
    handleRefetch("start");
    try {
      const response = await updateProjectsHeroData({
        heroText: heroToUpdate.heroText,
        projectId,
        index,
        url: heroToUpdate.image.url,
        image: heroToUpdate.image,
      }).unwrap();

      // Successful response
      if (response) {
        handleRefetch("finish");
        setLoading(false);
      }
    } catch (error) {
      // Handle error in case the request fails
      console.error("Update failed:", error);
    }
  };

  // Function to handle deleting a hero (for existing data)
  const handleDeleteHero = async (index) => {
    const heroToDelete = heroData[index];
    setLoading(true);
    handleRefetch("start");
    try {
      const response = await deleteProjectsHerodata({
        index,
        id: projectId,
      }).unwrap();
      if (response) {
        handleRefetch("finish");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }

    // Remove the hero from the heroData state
    // const updatedHeroData = heroData.filter((_, i) => i !== index);
    // setHeroData(updatedHeroData);
  };

  return (
    <form>
      {/* Hero Information */}
      {heroData.map((hero, index) => (
        <div key={hero._id || index}>
          {/* Use _id for key if available */}
          {/* Hero Text (Georgian) */}
          <div className="py-3 bg-light">
            <label>Hero Text (Georgian)</label>
            <input
              type="text"
              value={hero.heroText.ge}
              onChange={(e) =>
                handleHeroTextChange(index, "ge", e.target.value)
              }
            />
          </div>
          {/* Hero Text (English) */}
          <div className="py-3 bg-light">
            <label>Hero Text (English)</label>
            <input
              type="text"
              value={hero.heroText.en}
              onChange={(e) =>
                handleHeroTextChange(index, "en", e.target.value)
              }
            />
          </div>
          {/* Hero Image */}
          <div className="py-3 bg-light">
            <label>Hero Image</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
            {/* Display the uploaded image if available */}
            {hero.image && (
              <img
                className="pt-2"
                src={hero.image.url}
                alt="Hero"
                width="100"
                height="auto"
              />
            )}
            {/* Display the old image filename */}

            {console.log(hero.image)}
          </div>
          {/* Buttons for Updating or Deleting Hero */}
          {hero._id ? (
            <div>
              <Button
                disabled={loading ? true : false}
                variant="success"
                onClick={() => handleUpdateHero(index)}
              >
                {loading ? "Laoding ..." : "Update Hero"}
              </Button>
              {/* <Button className="mx-3" onClick={handleAddHero}>
                Add More Hero
              </Button> */}
              <Button
                className="ms-4"
                disabled={loading ? true : false}
                variant="danger"
                onClick={() => handleDeleteHero(index)}
              >
                {loading ? "loading ..." : "Delete Hero"}
              </Button>
            </div>
          ) : (
            <div>
              <Button variant="success" onClick={() => handleCreateHero(index)}>
                {loading ? "loading ..." : "Create Hero"}
              </Button>
              {/* <Button className="mx-3" onClick={handleAddHero}>
                Add More Hero
              </Button> */}
            </div>
          )}
        </div>
      ))}
      <Col sm={4}>
        <Button className="mx-3 mt-3" onClick={handleAddHero}>
          Add More Hero
        </Button>
      </Col>
      {/* Add More Heroes Button (only for new heroes) */}
    </form>
  );
};

export default AdminProjectsHeroDataComponent;
