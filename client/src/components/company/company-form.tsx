import React, { useState } from "react";
import { useCompanyStore } from "@/store/company-store";
import { BusinessType, ShippingOrigin } from "@/types/company-types";
import { toast } from "sonner";

interface CompanyFormProps {
  onSuccess: () => void;
}


export default function CompanyForm({ onSuccess }: CompanyFormProps) {
  const { createCompany, error, isLoading } = useCompanyStore();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [businessType, setBusinessType] = useState<BusinessType>(BusinessType.ECOMMERCE);
  const [averageMonthlyShipments, setAverageMonthlyShipment] = useState("");
  const [shippingOrigin, setShippingOrigin] = useState<ShippingOrigin>(ShippingOrigin.WAREHOUSE);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      name,
      address,
      businessType,
      averageMonthlyShipments: parseFloat(averageMonthlyShipments),
      shippingOrigin
    }

    await createCompany(data);

    const { error: currentError } = useCompanyStore.getState();

    if (!currentError) {
      setName("")
      setAddress("")
      setBusinessType(BusinessType.ECOMMERCE)
      setAverageMonthlyShipment("")
      setShippingOrigin(ShippingOrigin.WAREHOUSE);
      toast.success("Company created successfully")

      if (onSuccess) {
        onSuccess()
      }
    } else {
      toast.error("Failed to create a company.")
    }
  }


  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="text-red-500">{error}</p>
        )}
        <div className="flex flex-col gap-6 border border-amber-600 rounded-sm p-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              disabled={isLoading}
              placeholder="Logistics Co."
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
            <label htmlFor="average-monthly-shipment" className="text-sm font-medium">Average monthly shipments</label>
            <input
              id="average-monthly-shipment"
              type="number"
              value={averageMonthlyShipments}
              disabled={isLoading}
              placeholder="10"
              min={0}
              onChange={(e) => setAverageMonthlyShipment(e.target.value)}
              className="px-4 py-3 border border-slate-700 rounded-sm text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="business-type" className="text-sm font-medium">Business Type</label>
            <select
              name="business-type" id="business-type"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value as BusinessType)}
              disabled={isLoading}
              className="px-4 py-3 border border-slate-700 rounded-sm text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            >
              {Object.values(BusinessType).map((business) => (
                <option value={business} key={business}>
                  {business}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="shipment-origin" className="text-sm font-medium">Shipment Origin</label>
            <select
              name="shipment-origin"
              id="shipment-origin"
              value={shippingOrigin}
              onChange={(e) => setShippingOrigin(e.target.value as ShippingOrigin)}
              disabled={isLoading}
              className="px-4 py-3 border border-slate-700 rounded-sm text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            >
              {Object.values(ShippingOrigin).map((origin) => (
                <option value={origin} key={origin}>
                  {origin}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-amber-600 text-gray-100 rounded-sm hover:bg-amber-700 transition-colors cursor-pointer font-medium">
            {isLoading ? "Creating..." : "Create company"}
          </button>
        </div>
      </form>
    </div>
  )
}