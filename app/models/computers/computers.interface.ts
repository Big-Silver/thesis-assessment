export interface ComputerRoot {
  pcs: ComputerPc[];
  totalItems: number;
  totalPages: number;
}

export interface ComputerPc {
  computer_id: number;
  ram: string;
  storage_type: string;
  storage_capacity: string;
  usb_ports: string;
  gpu: string;
  weight: string;
  psu_wattage: string;
  processor: string;
}

export interface EditComputerPc {
  ram: string;
  storage_type: string;
  storage_capacity: string;
  usb_ports: string;
  gpu: string;
  weight: string;
  psu_wattage: string;
  processor: string;
}
