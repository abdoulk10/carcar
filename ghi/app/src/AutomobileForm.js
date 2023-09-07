// import React, { useState, useEffect } from "react";

// function AutomobileForm() {
//   const [models, setModels] = useState([]);
//   const [formData, setFormData] = useState({
//     color: "",
//     year: "",
//     vin: "",
//     model_id: "",
//   });

//   const fetchData = async () => {
//     const url = "http://localhost:8100/api/models/";
//     const response = await fetch(url);
//     if (response.ok) {
//       const data = await response.json();
//       // Modify the data structure to extract models correctly
//       const extractedModels = data.models.map((model) => ({
//         id: model.id,
//         name: model.name,
//       }));
//       setModels(extractedModels);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const automobilesUrl = "http://localhost:8100/api/automobiles/";
//     const fetchConfig = {
//       method: "post",
//       body: JSON.stringify(formData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await fetch(automobilesUrl, fetchConfig);
//     if (response.ok) {
//       setFormData({
//         color: "",
//         year: "",
//         vin: "",
//         model_id: "",
//       });
//     }
//   };

//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   return (
//     <div className="row">
//       <div className="offset-3 col-6">
//         <div className="shadow p-4 mt-4">
//           <div className="text-center">
//             <h2>Add an Automobile</h2>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="form-floating mb-3">
//               <input
//                 value={formData.color}
//                 onChange={handleChange}
//                 placeholder=" "
//                 required
//                 type="text"
//                 name="color"
//                 id="color"
//                 className="form-control"
//               />
//               <label htmlFor="color">Color</label>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 value={formData.year}
//                 onChange={handleChange}
//                 placeholder=" "
//                 required
//                 type="text"
//                 name="year"
//                 id="year"
//                 className="form-control"
//               />
//               <label htmlFor="year">Year</label>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 value={formData.vin}
//                 onChange={handleChange}
//                 placeholder=" "
//                 required
//                 type="text"
//                 name="vin"
//                 id="vin"
//                 className="form-control"
//               />
//               <label htmlFor="vin">Vin</label>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="model_id">Select Model</label>
//               <select
//                 value={formData.model_id}
//                 onChange={handleChange}
//                 required
//                 name="model_id"
//                 id="model_id"
//                 className="form-select"
//               >
//                 <option value="">Select a model</option>
//                 {models.map((model) => {
//                   return (
//                     <option key={model.id} value={model.id}>
//                       {model.name}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="form-group">
//               <button className="btn btn-primary">Create</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AutomobileForm;

import React, { useState, useEffect } from "react";

function AutomobileForm() {
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    color: "",
    year: "",
    vin: "",
    model_id: "",
  });

  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const automobilesUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(automobilesUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        color: "",
        year: "",
        vin: "",
        model_id: "",
      });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="text-center">
            <h2>Add an Automobile</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                value={formData.color}
                onChange={handleChange}
                placeholder=" "
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.year}
                onChange={handleChange}
                placeholder=" "
                required
                type="text"
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.vin}
                onChange={handleChange}
                placeholder=" "
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">Vin</label>
            </div>
            <div className="mb-3">
              <label htmlFor="model_id">Select Model</label>
              <select
                value={formData.model_id}
                onChange={handleChange}
                required
                name="model_id"
                id="model_id"
                className="form-select"
              >
                <option value="">Select a model</option>
                {models.map((model) => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
