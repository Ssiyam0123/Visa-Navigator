import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../general/LoadingSpinner";

const MyAddedVisasPage = () => {
  const { user } = useContext(AuthContext); // Get the current user from AuthContext
  const [visas, setVisas] = useState([]); // State to store visas added by the user
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedVisa, setSelectedVisa] = useState(null); // State for the selected visa to update
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  // Fetch visas added by the user
  useEffect(() => {
    setLoading(true);
    fetch(`https://assignment-10-server-swart-nine.vercel.app/results/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setVisas(Array.isArray(data) ? data : [data]); // Handle both array and single object response
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user?.email]);

  // Handle deletion of a visa
  const handleDeleteClick = (visaId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-10-server-swart-nine.vercel.app/visas/${visaId}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete visa");
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "The visa has been successfully removed.", "success");
              setVisas(visas.filter((v) => v._id !== visaId)); // Update visas list
            } else {
              throw new Error("Visa deletion failed on the server.");
            }
          })
          .catch((err) => {
            Swal.fire("Error!", `Failed to delete visa: ${err.message}`, "error");
          });
      }
    });
  };

  // Open the modal for updating a visa
  const handleUpdateClick = (visa) => {
    setSelectedVisa(visa);
    setModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedVisa(null);
  };

  // Handle form submission for updating a visa
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVisa = {
      countryName: e.target.countryName.value,
      visaType: e.target.visaType.value,
      processingTime: e.target.processingTime.value,
      fee: e.target.fee.value,
      validity: e.target.validity.value,
      applicationMethod: e.target.applicationMethod.value,
    };

    Swal.fire({
      title: "Save changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-10-server-swart-nine.vercel.app/visas/${selectedVisa._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVisa),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to update visa");
            return res.json();
          })
          .then(() => {
            Swal.fire("Saved!", "Visa details updated successfully.", "success");
            setVisas(
              visas.map((visa) =>
                visa._id === selectedVisa._id ? { ...visa, ...updatedVisa } : visa
              )
            );
            handleModalClose();
          })
          .catch((err) => {
            Swal.fire("Error!", `Error updating visa: ${err.message}`, "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Changes not saved", "", "info");
      }
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 w-11/12">
      <h1 className="text-2xl font-semibold mb-4">My Added Visas</h1>

      {/* Visas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.length > 0 ? (
          visas.map((visa) => (
            <div key={visa._id} className="card bg-white shadow-lg rounded-lg">
              <figure>
                <img
                  src={visa.countryImage}
                  alt={visa.countryName}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-xl font-semibold">{visa.countryName}</h2>
                <p>
                  <strong>Visa Type:</strong> {visa.visaType}
                </p>
                <p>
                  <strong>Processing Time:</strong> {visa.processingTime}
                </p>
                <p>
                  <strong>Fee:</strong> ${visa.fee}
                </p>
                <p>
                  <strong>Validity:</strong> {visa.validity}
                </p>
                <p>
                  <strong>Application Method:</strong> {visa.applicationMethod}
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleUpdateClick(visa)}
                    className="btn btn-primary btn-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick(visa._id)}
                    className="btn btn-error btn-sm ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No visas found.</p>
        )}
      </div>

      {/* Update Modal */}
      {modalOpen && selectedVisa && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="modal-box bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Update Visa</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="countryName"
                defaultValue={selectedVisa.countryName}
                placeholder="Country Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="visaType"
                defaultValue={selectedVisa.visaType}
                placeholder="Visa Type"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="processingTime"
                defaultValue={selectedVisa.processingTime}
                placeholder="Processing Time"
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="fee"
                defaultValue={selectedVisa.fee}
                placeholder="Fee"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="validity"
                defaultValue={selectedVisa.validity}
                placeholder="Validity"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="applicationMethod"
                defaultValue={selectedVisa.applicationMethod}
                placeholder="Application Method"
                className="input input-bordered w-full"
                required
              />
              <div className="modal-action flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedVisasPage;
