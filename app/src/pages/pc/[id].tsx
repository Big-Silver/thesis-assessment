import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchData, putData } from "../../../utils/fetchService";
import { getById, updateById } from "../../../utils/config";
import { EditComputerPc } from "../../../models/computers/computers.interface";

export default function Computer() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<EditComputerPc>({
    ram: "",
    storage_type: "",
    storage_capacity: "",
    usb_ports: "",
    gpu: "",
    weight: "",
    psu_wattage: "",
    processor: "",
  });

  useEffect(() => {
    const fetchDataFromApis = async () => {
      try {
        if (id !== undefined) {
          const idToFetch = Array.isArray(id) ? id[0] : id;
          const idNumber = parseInt(idToFetch, 10);

          if (!isNaN(idNumber)) {
            const data = await fetchData<EditComputerPc>(`${getById}/${id}`);
            setIsLoading(false);

            if (data) {
              setFormData(data);
            }
          }
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchDataFromApis();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await putData(`${updateById}/${id}`, formData);

      if (response) {
        await router.push("/");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full h-full flex flex-col py-24 items-center">
      <div className="flex flex-col w-[650px] min-h-[400px]">
        <h2 className="text-[#fff] text-[28px] text-center font-bold">
          Edit Specification
        </h2>
        <div className="w-full mt-4">
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label htmlFor="processor" className="text-[#fff] mb-2 block">
                Processor:
              </label>
              <input
                type="text"
                id="processor"
                name="processor"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={formData.processor}
                onChange={handleInputChange}
                placeholder="Processor"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gpu" className="text-[#fff] mb-2 block">
                GPU:
              </label>
              <input
                type="text"
                id="gpu"
                name="gpu"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={formData.gpu}
                onChange={handleInputChange}
                placeholder="GPU"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ram" className="text-[#fff] mb-2 block">
                RAM:
              </label>
              <input
                type="text"
                id="ram"
                name="ram"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={formData.ram}
                onChange={handleInputChange}
                placeholder="RAM"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="storageType" className="text-[#fff] mb-2 block">
                Storage Type:
              </label>
              <input
                type="text"
                id="storageType"
                name="storageType"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={formData.storage_type}
                onChange={handleInputChange}
                placeholder="Storage Type"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="storageCapacity"
                className="text-[#fff] mb-2 block"
              >
                Storage Capacity:
              </label>
              <input
                type="text"
                id="storageCapacity"
                name="storageCapacity"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={formData.storage_capacity}
                onChange={handleInputChange}
                placeholder="Storage Capacity"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="usbPorts" className="text-[#fff] mb-2 block">
                USB Ports:
              </label>
              <input
                type="text"
                id="usbPorts"
                name="usbPorts"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={formData.usb_ports}
                onChange={handleInputChange}
                placeholder="USB Ports"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weight" className="text-[#fff] mb-2 block">
                Weight:
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Weight"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="psuWattage" className="text-[#fff] mb-2 block">
                PSU Wattage:
              </label>
              <input
                type="text"
                id="psuWattage"
                name="psuWattage"
                className="h-[50px] rounded-[15px] text-black bg-gray-100 w-full px-4 outline-none"
                value={formData.psu_wattage}
                onChange={handleInputChange}
                placeholder="PSU Wattage"
              />
            </div>
            <button
              type="submit"
              className="h-[50px] bg-[#E60000] mt-5 rounded-[15px] w-full"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
