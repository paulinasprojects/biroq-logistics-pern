import { intiialFormState, shipmentFormReducer } from "@/reducers/shipment-reducer";
import { Warehouse } from "@/types/types";
import { X } from "lucide-react";
import { useReducer, useState } from "react";
import ShipmentInfoStep from "./shipment-forms/shipment-info-step";
import ShipmentPackageInfoStep from "@/components/shipments/shipment-forms/shipment-package-info-step";
import ShipmentServiceInfoStep from "@/components/shipments/shipment-forms/shipment-service-info-step";
import ShipmentSubmitInfoStep from "@/components/shipments/shipment-forms/shipment-submit-info-step";

interface ShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  warehouses: Warehouse[];
}

const STEPS = ["Shipment Info", "Package Info", "Service Info", "Review"]

export default function ShipmentModal({
  isOpen,
  onClose,
  warehouses
}: ShipmentModalProps) {
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>("");
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(shipmentFormReducer, intiialFormState)


  if (!isOpen) return null;

  function handleClose() {
    setStep(0)
    setSelectedWarehouseId("");
    dispatch({ type: "RESET_FORM" })
    onClose()
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-sm border border-slate-800 w-full max-w-xl px-4">
        <div className="flex itemc justify-between p-3">
          <h2 className="text-lg font-bold text-gray-500">
            Add new Shipment
          </h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5"/>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <select
            value={selectedWarehouseId}
            onChange={(e) => setSelectedWarehouseId(e.target.value)}
            className="px-4 py-2 border border-slate-700 rounded-sm text-gray-700 focus:outline-none"
          >
            <option value="" disabled>Select a warehouse</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
        <div>
        {selectedWarehouseId ? (
          <>
          <div className="flex items-center gap-3 px-5">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`text-sm ${i == step ? "text-black font-bold" : "text-gray-600 font-medium"}`}>{label}</span>
                {i < STEPS.length - 1 && <span className="text-gray-600 text-xs">,</span>}
              </div>
            ))}
          </div>
            <div className="px-4 py-3">
              {step === 0 && (
                <ShipmentInfoStep
                  state={state.shipmentInfo}
                  dispatch={dispatch}
                  onNext={() => setStep(1)}
                />
              )}
              {step === 1 && (
                <ShipmentPackageInfoStep
                  state={state.packageInfo}
                  dispatch={dispatch}
                  onNext={() => setStep(2)}
                  onBack={() => setStep(0)}
                />
              )}
              {step == 2 && (
                <ShipmentServiceInfoStep
                  state={state.serviceInfo}
                  dispatch={dispatch}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <ShipmentSubmitInfoStep
                  state={state}
                  onBack={() => setStep(2)}
                  onSuccess={handleClose}
                  dispatch={dispatch}
                  warehouseId={selectedWarehouseId}
                />
              )}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400 px-3 pb-4">
            Please select a warehouse to continue.
          </p>
        )}
        </div>
        </div>
      </div>
    </div>
  )
}