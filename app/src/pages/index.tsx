import React, { useState, useEffect, useContext } from "react";
import ComputerCard from "./components/ComputerCard";
import AdminContext from "../../context/AdminContext";
import { deleteData, fetchData, postData } from "../../utils/fetchService";
import { addPc, deleteById, getAllPcs } from "../../utils/config";
import { ComputerRoot } from "../../models/computers/computers.interface";
import Pagination from "./components/Pagination";
import { AxiosError } from "axios";

export default function Home() {
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 10;
  const adminContext = useContext(AdminContext);
  if (!adminContext) {
    return null;
  }
  const { updateState, setUpdateState } = adminContext;

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [allSpecifications, setAllSpecifications] =
    useState<ComputerRoot | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataFromApis = async () => {
      try {
        const queryParams = [`pageNo=${pageNo}`, `pageSize=${pageSize}`];

        if (searchQuery) {
          // Encode special characters, except for spaces
          const encodedKeyword = encodeURIComponent(searchQuery);
          queryParams.push(`keyword=${encodedKeyword}`);
        }

        const queryString = queryParams.join("&");

        const data = await fetchData<ComputerRoot>(
          `${getAllPcs}?${queryString}`
        );
        setAllSpecifications(data);
        setTotalPages(Math.ceil(data?.totalItems / pageSize));

        setUpdateState(false);
        setIsLoading(false);
      } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
          setAllSpecifications(null);
        } else {
          console.error("Error fetching data:", error);
        }
        setIsLoading(false);
      }
    };

    fetchDataFromApis();
  }, [updateState, pageNo, searchQuery]);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteData(`${deleteById}/${id}`);

      if (response) {
        setUpdateState(true);
        setSuccessMessage("Data deleted successfully");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setErrorMessage("Error deleting data");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await postData(addPc, formData);
        if (response) {
          setSuccessMessage("File uploaded successfully");
          setUpdateState(true);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        }
      } catch (error) {
        setErrorMessage("Error uploading file");
        console.error("Error uploading file:", error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      } finally {
        setFile(null);
      }
    } else {
      setErrorMessage("File is undefined");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleSearch = (query: string) => {
    setPageNo(1);
    setSearchQuery(query);
  };

  const handlePageChange = (newPage: number) => {
    setPageNo(newPage);
  };

  return (
    <main className="w-full h-full flex flex-col py-24 items-center">
      <div className="flex flex-col min-w-[550px] min-h-[400px]">
        <h2 className="text-[#fff] text-[28px] text-center font-bold">
          Check.com
        </h2>
        <>
          {isLoading ? (
            <div className="text-center font-medium">Loading...</div>
          ) : (
            <div className="w-full mt-4">
              <input
                type="text"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by Processor or GPU..."
              />

              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none mt-4 pt-[10px]"
              />
              <button
                className="h-[50px] bg-[#00338D] mt-5 rounded-[15px] w-full"
                onClick={handleUpload}
              >
                Upload
              </button>

              {successMessage && (
                <div className="text-green-500 mt-2 text-center">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 mt-2 text-center">
                  {errorMessage}
                </div>
              )}

              <div>
                {!allSpecifications?.pcs.length ? (
                  <div className="text-center font-bold text-[21px] mt-10">
                    No record found
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 mt-5 cursor-pointer">
                    {allSpecifications?.pcs.map((computer) => (
                      <div
                        key={computer.computer_id}
                        className="cursor-pointer"
                      >
                        <ComputerCard
                          id={computer.computer_id}
                          processor={computer.processor}
                          gpu={computer.gpu}
                          storage={computer.storage_capacity}
                          weight={computer.weight}
                          ram={computer.ram}
                          handleDelete={handleDelete}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {allSpecifications?.pcs.length && (
                <div className="mt-10 mb-4 flex justify-end">
                  <Pagination
                    pageNo={pageNo}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          )}
        </>
      </div>
    </main>
  );
}
