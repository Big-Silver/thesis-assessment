import { useRouter } from "next/router";
import React from "react";
import { RiEdit2Line } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";

type ComputerSpecs = {
  id: number;
  processor: string;
  gpu: string;
  storage: string;
  weight: string;
  ram: string;
  handleDelete?: (id: number) => void;
};

const ComputerCard = ({
  id,
  processor,
  gpu,
  storage,
  weight,
  ram,
  handleDelete,
}: ComputerSpecs) => {
  const router = useRouter();

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer border p-2 min-h-[280px]">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Specfication</div>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold">Processor:</span> {processor}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold">GPU:</span> {gpu}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold">Storage:</span> {storage}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold">Weight:</span> {weight}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold">RAM:</span> {ram}
        </p>
      </div>
      <div className="flex items-center gap-4 pl-5">
        <div onClick={() => router.push(`/pc/${id}`)}>
          <RiEdit2Line className="text-[#ffffff] text-[28px]" />
        </div>{" "}
        {handleDelete && (
          <div className="cursor-pointer" onClick={() => handleDelete(id)}>
            <TbTrash className="text-[#E60000] text-[28px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComputerCard;
