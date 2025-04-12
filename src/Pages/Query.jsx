import React, { useState, useEffect } from "react";
import Logo from "../Components/Logo";
import Navigation from "../Components/Navigation";
import Modal from "../Components/modal";
import { useNavigate } from 'react-router-dom';


function Query() {
  const [modalOpen, setModalOpen] = useState(false);
  const [branches, setBranches] = useState([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    mainContent: "",
    uploadFile: null,
  });
  const [subject, setSubject] = useState(0); // This is the state for the subject\
  const [loginId, setloginId] = useState("")
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handlePrevPage = () => {
    setCurrentPage(1);
  };



  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("https://localhost:5001/Employee/Branches");
        if (!response.ok) {
          throw new Error("Server error");
        }
        const branches = await response.json();
        var result = branches.result.branches;
        console.log(result); // Konsolda branches-i yoxlayın
        setBranches(result);
      } catch (error) {
        console.error("Error fetching branches: ", error);
      }
    };
    fetchBranches();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      uploadFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    branches.forEach((element) => {
      if (element.id === formData.subject) {
        setSubject(element.id);
      }
    });
    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);

    form.append("branchId", formData.subject);
    form.append("comment", formData.mainContent);
    form.append("uploadFile", formData.uploadFile);


    try {
      const response = await fetch("https://localhost:5001/Employee/Feedbacks", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setModalOpen(true)
        var data = await response.json()
        const loginId = data.result.loginId;
        setloginId(loginId)

      } else {
        alert("There was an issue submitting your feedback.");
      }
    } catch (error) {
      alert("Error occurred while submitting the feedback.");
    }
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        loginId={loginId}
      />
      <Logo></Logo>
      <Navigation></Navigation>
      <div className="max-w-4xl mx-auto p-6 font-sans ">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-5 overflow-hidden">
            <div>
              <div className="flex space-x-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-250 p-2 border border-gray-300 rounded-md"
                    placeholder="Ad(məcburi deyil)"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-250 p-2 border border-gray-300 rounded-md"
                    placeholder="Soyad(məcburi deyil)"
                  />
                </div>
              </div>
              <div className="flex space-x-4 mb-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-250 p-2 border border-gray-300 rounded-md"
                    placeholder="Email(məcburi deyil)"
                  />
                </div>
                <div>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-[200px] p-2 border border-gray-300 text-[#5C5C5CCC] rounded-md"
                  >
                    <option>Mövzu</option>
                    {
                      branches.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className="ml-6 flex items-center">
              <p className="text-[#000000] text-sm">
                Hörmətli müraciətçi,<br /><br />
                Bu platformada etdiyiniz müraciətlərə XCOMPANY-ın Daxili Nəzarət
                Departamenti tərəfindən baxılır.<br /><br />
                Müraciətinizi anonim bildirmək qərarınıza hörmət edir, anonimliyinizin
                heç bir halda pozulmayacağına sizi əmin edirik!
              </p>
            </div>
          </div>

          <div>
            <textarea
              name="mainContent"
              value={formData.mainContent}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md h-40 resize-y"
              placeholder="Mətni daxil edin"
            ></textarea>
          </div>

          <div className="flex items-center justify-between w-[120px]">
            <button

              type="submit"
              className="w-20 py-2 mt-6 bg-[#00A0DF] rounded-4 text-white rounded-md hover:bg-blue-700"
            >
              Göndər
            </button>
            <input
              type="file"
              id="uploadFile"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="uploadFile" className="cursor-pointer">
              <img className="w-7 mt-4" src="/src/assets/Frame.png" />
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default Query;
