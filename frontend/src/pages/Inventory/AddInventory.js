import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddInventory() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    brand: "",
    category: "",
    quantity: "",
    unit: "",
    price: "",
    cost: "",
    restockLevel: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.code || formData.code <= 0) {
      errors.code = "Code is required and must be positive";
      isValid = false;
    }

    if (
      !formData.quantity ||
      isNaN(formData.quantity) ||
      formData.quantity <= 0
    ) {
      errors.quantity = "Quantity must be a positive number";
      isValid = false;
    }

    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      errors.price = "Price must be a positive number";
      isValid = false;
    }

    if (!formData.cost || isNaN(formData.cost) || formData.cost <= 0) {
      errors.cost = "Cost must be a positive number";
      isValid = false;
    }

    if (
      !formData.restockLevel ||
      isNaN(formData.restockLevel) ||
      formData.restockLevel <= 0
    ) {
      errors.restockLevel = "Re-stock Level must be a positive number";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      fetch("http://localhost:5000/inventory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          alert("Inventory Item Added Successfully");
          navigate("/viewinventory");
          setFormData({
            name: "",
            code: "",
            brand: "",
            category: "",
            quantity: "",
            unit: "",
            price: "",
            cost: "",
            restockLevel: "",
          });
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="container-fluid pt-5 mb-5 bg-dark">
        <div
          className="container p-5 mt-5 bg-body-secondary"
          style={{ borderRadius: 20, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        >
          <h1 className="mt-3 text-center">Add Inventory Item</h1>
          <div className="container mt-4">
            <form onSubmit={handleSubmit} className="text-start">
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="form-control"
                      id="code"
                      placeholder="Enter Code"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="form-control"
                      id="brand"
                      placeholder="Enter Brand"
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-control"
                      id="category"
                      placeholder="Enter Category"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="form-control"
                      id="quantity"
                      placeholder="Enter Quantity"
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="unit">Unit</label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="form-control"
                      id="unit"
                      placeholder="Enter Unit"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-control"
                      id="price"
                      placeholder="Enter Price"
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="cost">Cost</label>
                    <input
                      type="number"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      className="form-control"
                      id="cost"
                      placeholder="Enter Cost"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="restockLevel">Re-stock Level</label>
                    <input
                      type="number"
                      name="restockLevel"
                      value={formData.restockLevel}
                      onChange={handleInputChange}
                      className="form-control"
                      id="restockLevel"
                      placeholder="Enter Re-stock Level"
                      required
                    />
                  </div>
                </div>
              </div>

              {formErrors.name && (
                <div className="text-danger">{formErrors.name}</div>
              )}
              {formErrors.code && (
                <div className="text-danger">{formErrors.code}</div>
              )}
              {formErrors.quantity && (
                <div className="text-danger">{formErrors.quantity}</div>
              )}
              {formErrors.price && (
                <div className="text-danger">{formErrors.price}</div>
              )}
              {formErrors.cost && (
                <div className="text-danger">{formErrors.cost}</div>
              )}
              {formErrors.restockLevel && (
                <div className="text-danger">{formErrors.restockLevel}</div>
              )}

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn col-3 mt-3 mb-5 btn-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="" style={{ height: "200px" }}></div>
      </div>
    </div>
  );
}
