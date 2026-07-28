import { ShipmentFormAction, ShipmentFormData } from "@/types/shipment-types";
import { useShipmentStore } from "@/store/shipment-store";
import { toast } from "sonner";

interface Props {
  state: ShipmentFormData;
  dispatch: React.Dispatch<ShipmentFormAction>;
  onBack: () => void;
  onSuccess: () => void
  warehouseId: string
}


const ShipmentSubmitInfoStep = ({state, dispatch, onBack, onSuccess, warehouseId}: Props) => {
  const { createShipment, error } = useShipmentStore();

  	async function handleSubmit() {
      await createShipment({
        warehouseId: warehouseId,
        shipmentName: state.shipmentInfo.shipmentName,
        senderName: state.shipmentInfo.senderName,
        senderPhoneNumber: state.shipmentInfo.senderPhoneNumber,
        pickupAddress: state.shipmentInfo.pickupAddress,
        receiverName: state.shipmentInfo.receiverName,
        receiverPhoneNumber: state.shipmentInfo.receiverPhoneNumber,
        receiverNotes: state.shipmentInfo.receiverNotes ?? null,
        deliveryAddress: state.shipmentInfo.deliveryAddress,
        packageType: state.packageInfo.packageType,
        packageDescription: state.packageInfo.packageDescription,
        packageWeight: state.packageInfo.packageWeight,
        packageLength: state.packageInfo.packageLength,
        packageWidth: state.packageInfo.packageWidth,
        packageHeight: state.packageInfo.packageHeight,
        packageNotes: state.packageInfo.packageNotes ?? null,
        declaredValue: state.packageInfo.declaredValue,
        hasInsurance: state.packageInfo.hasInsurance,
        hasCashOnDelivery: state.packageInfo.hasCashOnDelivery,
        hasDangerousGoods: state.packageInfo.hasDangerousGoods,
        specialHandling: state.packageInfo.specialHandling,
        serviceType: state.serviceInfo.serviceType,
        serviceName: state.serviceInfo.serviceName,
        servicePrice: state.serviceInfo.servicePrice,
        chargeableWeight: state.serviceInfo.chargeableWeight,
        hasPickUpToday: state.serviceInfo.hasPickUpToday,
        hasSaturdayDelivery: state.serviceInfo.hasSaturdayDelivery,
        deliveryTimeFrame: state.serviceInfo.deliveryTimeFrame
      });
      
      const { error } = useShipmentStore.getState();
      if (!error) {
        toast.success("Shipment created successfully");
        dispatch({type: "RESET_FORM"})
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast.error("Failed to create a shipment")
      }
	  }
  return (
    <div className="flex flex-col gap-6">
      {error && (
        <span className="text-red text-sm">
          {error}
        </span>
      )}
      <h3 className="font-bold text-black">
        Review Information
      </h3>
      <div className="flex flex-col gap-2">
        <span>warehouseId</span>
        <span>{warehouseId}</span>
      </div>
      <div className="flex *:basis-1/2 gap-4">
       <button
            type="button"
            onClick={onBack}
            className=" px-6 py-3 border border-black rounded-full hover:bg-black/10"         
          >
            Back
          </button>
      <button className=" px-6 py-3 bg-black text-white rounded-full hover:bg-black/80"
        onClick={handleSubmit}>
        Submit
     </button>

      </div>
    </div>
  )
}

export default ShipmentSubmitInfoStep