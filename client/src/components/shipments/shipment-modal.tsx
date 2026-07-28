import { intiialFormState, shipmentFormReducer } from "@/reducers/shipment-reducer";
import { Warehouse } from "@/types/types";
import { X, Check } from "lucide-react";
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
  const [state, dispatch] = useReducer(shipmentFormReducer, intiialFormState)
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>("");
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

function handleNext(currentStep: number) {
  setCompletedSteps((prev) => new Set(prev).add(currentStep));
  setStep(currentStep + 1);
}

function handleBack(currentStep: number) {
  setCompletedSteps((prev) => {
    const next = new Set(prev);
    next.delete(currentStep - 1); 
    return next;
  });
  setStep(currentStep - 1);
}


  if (!isOpen) return null;

  function handleClose() {
    setStep(0)
    setSelectedWarehouseId("");
    setCompletedSteps(new Set()); 
    dispatch({ type: "RESET_FORM" })
    onClose()
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-sm border border-slate-800 w-full max-w-xl px-5 py-4">
        <div className="flex itemc justify-between p-3">
          <h2 className="text-lg font-bold text-gray-500">
            Add new Shipment
          </h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5"/>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="select-warehouse" className="text-sm font-bold">Select warehouse</label>
          <select
            id="select-warehouse"
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
            <div className="flex items-center gap-3 my-3">
            {STEPS.map((label, i) => {
              const isActive = i === step;
              const isCompleted = completedSteps.has(i);
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className={`flex items-center justify-center w-5 h-5 rounded-full border transition-colors
                      ${isCompleted
                        ? "bg-amber-600 border-amber-600" 
                        : isActive
                          ? "border-amber-600 bg-white"          
                          : "border-gray-300 bg-white" 
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="size-3 text-white"/>
                      ) : (
                        <span className={`text-xs font-bold
                          ${isActive ? "text-amber-600" : "text-gray-300"}`}
                        >
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <span className={`text-sm transition-colors whitespace-nowrap
                      ${isCompleted
                        ? "text-amber-600 font-medium"
                        : isActive
                          ? "text-black font-bold"
                          : "text-gray-400 font-medium"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-6 h-px transition-colors
                      ${completedSteps.has(i) ? "bg-amber-600" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              );
            })}
            </div>
            <div className="px-4 py-3">
              {step === 0 && (
                <ShipmentInfoStep
                  state={state.shipmentInfo}
                  dispatch={dispatch}
                  onNext={() => handleNext(0)}
                />
              )}
              {step === 1 && (
                <ShipmentPackageInfoStep
                  state={state.packageInfo}
                  dispatch={dispatch}
                    onNext={() => handleNext(1)}
                    onBack={() => handleBack(1)}
                />
              )}
              {step == 2 && (
                <ShipmentServiceInfoStep
                  state={state.serviceInfo}
                  dispatch={dispatch}
                  onNext={() => handleNext(2)}
                  onBack={() => handleBack(2)}
                />
              )}
              {step === 3 && (
                <ShipmentSubmitInfoStep
                  state={state}
                  onBack={() => handleBack(3)}
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