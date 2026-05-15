import React, { useState } from "react";
import { useCompanyStore } from "@/store/company-store";
import { BusinessType, ShippingOrigin } from "@/types/company-types";
import { toast } from "sonner";
import { Company } from "@/types/types";
import { Select, SelectContent, SelectOption, SelectTrigger } from "./select";

interface CompanyFormProps {
  onSuccess: () => void;
  company?: Company
}


export default function CompanyForm({ onSuccess, company }: CompanyFormProps) {
  const { createCompany, updateCompany, clearError, error, isLoading } = useCompanyStore();
  const [name, setName] = useState<string>(company?.name ?? "");
  const [address, setAddress] = useState<string>(company?.address ?? "");
  const [businessType, setBusinessType] = useState<BusinessType>(company?.businessType as BusinessType || BusinessType.ECOMMERCE);
  const [averageMonthlyShipments, setAverageMonthlyShipment] = useState<number | string>(company?.averageMonthlyShipments ?? "");
  const [shippingOrigin, setShippingOrigin] = useState<ShippingOrigin>(company?.shippingOrigin as ShippingOrigin || ShippingOrigin.WAREHOUSE);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearError();

    const data = {
      name,
      address,
      businessType,
      averageMonthlyShipments: Number(averageMonthlyShipments),
      shippingOrigin
    }

    if (company) {
      await updateCompany(company.id, data);
      toast.success("Company updated successfully")
    } else {
      await createCompany(data);
      toast.success("Company created successfully")
    }

    const { error: currentError } = useCompanyStore.getState();

    if (!currentError) {
      setName("")
      setAddress("")
      setBusinessType(BusinessType.ECOMMERCE)
      setAverageMonthlyShipment("")
      setShippingOrigin(ShippingOrigin.WAREHOUSE);

      if (onSuccess) {
        onSuccess()
      }
    } else {
      toast.error("Failed to create a company.")
    }
  }


  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col py-3 px-6">
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
              onChange={(e) => setAverageMonthlyShipment(e.target.value === "" ? "" : parseFloat(e.target.value))}
              className="px-4 py-3 border border-slate-700 rounded-sm text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="business-type" className="text-sm font-medium">Business Type</label>
            <Select
              id="business-type"
              value={businessType}
              onValueChange={(value) => setBusinessType(value as BusinessType)}
            >
              <SelectTrigger placeholder="Choose a business type" />
              <SelectContent>
                {Object.values(BusinessType).map((business) => (
                  <SelectOption value={business} key={business}>
                    {business}
                  </SelectOption>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="shipment-origin" className="text-sm font-medium">Shipment Origin</label>
            <Select
              id="shipment-origin"
              value={shippingOrigin}
              onValueChange={(value) => setShippingOrigin(value as ShippingOrigin)}
            >
              <SelectTrigger placeholder="Choose a shipping origin" />
              <SelectContent>
                {Object.values(ShippingOrigin).map((origin) => (
                  <SelectOption value={origin} key={origin}>
                    {origin}
                  </SelectOption>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-amber-600 text-gray-100 rounded-sm hover:bg-amber-700 transition-colors cursor-pointer font-medium">
            {isLoading ? "Creating..." : company ? "Save changes" : "Create company"}
          </button>
        </div>
      </form>
    </div>
  )
}