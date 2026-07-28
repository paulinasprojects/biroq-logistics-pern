import { ShipmentFormData, ShipmentFormAction } from "@/types/shipment-types";

export const intiialFormState: ShipmentFormData = {
  shipmentInfo: {
    shipmentName: "",
    senderName: "",
    senderPhoneNumber: "",
    pickupAddress: "",
    receiverName: "",
    receiverPhoneNumber: "",
    receiverNotes: "",
    deliveryAddress: "",
  },
  packageInfo: {
    packageType: "",
    packageDescription: "",
    packageNotes: "",
    packageWeight: 0,
    packageLength: 0,
    packageWidth: 0,
    packageHeight: 0,
    declaredValue: 0,
    hasInsurance: false,
    hasCashOnDelivery: false,
    hasDangerousGoods: false,
    specialHandling: "",
  },
  serviceInfo: {
    serviceType: "",
    serviceName: "",
    servicePrice: 0,
    chargeableWeight: "",
    deliveryTimeFrame: "",
    hasPickUpToday: false,
    hasSaturdayDelivery: false,
  }
}

export function shipmentFormReducer(state: ShipmentFormData, action: ShipmentFormAction) {
  switch (action.type) {
    case "UPDATE_SHIPMENT_INFO":
      return {
        ...state,
        shipmentInfo: {
          ...state.shipmentInfo,
          ...action.payload,
        }
      };
     case "UPDATE_PACKAGE_INFO":
      return {
        ...state,
        packageInfo: {
          ...state.packageInfo,
          ...action.payload
        }
      };
      case "UPDATE_SERVICE_INFO":
        return {
          ...state,
          serviceInfo: {
            ...state.serviceInfo,
            ...action.payload
          }
        };
      case "RESET_FORM":
        return intiialFormState;
      default:
        return state;    
  }
}