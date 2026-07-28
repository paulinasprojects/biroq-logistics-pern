/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { shipmentFormReducer, intiialFormState } from "@/reducers/shipment-reducer";
import { ShipmentFormAction, ShipmentFormData } from "@/types/shipment-types";

interface ShipmentContextType {
  state: ShipmentFormData;
  dispatch: React.Dispatch<ShipmentFormAction>;
}

const ShipmentFormContext = createContext<ShipmentContextType | undefined>(undefined);

export function ShipmentFormProvider({ children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(shipmentFormReducer, intiialFormState);

  return (
    <ShipmentFormContext.Provider value={{state, dispatch}}>
      {children}
    </ShipmentFormContext.Provider>
  )
}

export function useShipmentFormContext() {
  const ctx = useContext(ShipmentFormContext);

  if (!ctx) {
    throw new Error("Something went wrong")
  }

  return ctx;
}