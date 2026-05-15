import React, { useState } from "react";
import { useWarehouseStore } from "@/store/warehouse-store";
import { toast } from "sonner";

interface WarehouseFormProps {
  onSuccess: () => void;
}


export default function WarehouseForm({ onSuccess }: WarehouseFormProps) {
  const { createWarehouse, error, isLoading } = useWarehouseStore();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      name,
      address,
      description,
      capacity: parseFloat(capacity)
    }

    await createWarehouse(data);

    const { error: currentError } = useWarehouseStore.getState();

    if (!currentError) {
      setName("")
      setAddress("")
      setDescription("")
      setCapacity("");
      //TODO: Remove the toast after adding the updating logic
      toast.success("Warehouse created successfuly");

      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast.error("Failed to create a warehouse")
    }
  }

  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="text-red-500 font-medium">{error}</p>
        )}
        <div className="flex flex-col gap-6 border border-amber-600 rounded-sm p-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              disabled={isLoading}
              placeholder="Boston Warehouse"
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 border border-slate-700 rounded-sm text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-sm font-medium">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              disabled={isLoading}
              placeholder="Main Street 11"
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-3 border border-slate-700 rounded-sm text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="capacity" className="text-sm font-medium">Capacity</label>
            <input
              id="capacity"
              type="number"
              value={capacity}
              disabled={isLoading}
              placeholder="1000"
              onChange={(e) => setCapacity(e.target.value)}
              className="px-4 py-3 border border-slate-700 rounded-sm text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea
              id="description"
              value={description}
              disabled={isLoading}
              placeholder="Warehouse is..."
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none px-4 py-3 border border-slate-700 rounded-sm text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-amber-600 text-gray-100 rounded-sm hover:bg-amber-700 transition-colors cursor-pointer font-medium"
          >
            {isLoading ? "Creating..." : "Create warehouse"}
          </button>
        </div>
      </form>
    </div>
  )
}