import CheckboxField from "@/components/common/checkbox";
import { ShipmentFormAction, ShipmentFormData } from "@/types/shipment-types";
import { ServiceType } from "@/types/types";

interface Props {
  state: ShipmentFormData["serviceInfo"];
  dispatch: React.Dispatch<ShipmentFormAction>;
  onNext: () => void;
  onBack: () => void
}



const ShipmentServiceInfoStep = ({state, dispatch, onNext, onBack}: Props) => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onNext()
  }

  function goBack() {
    onBack()
  }


  
  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="package-type" className="text-sm font-bold">Package Type</label>
            <select id="package-type"
              value={state.serviceType}
              onChange={(e) => dispatch({type: "UPDATE_SERVICE_INFO", payload: {serviceType: e.target.value}})}
              className="px-4 py-2 border border-slate-700 rounded-sm text-gray-700 focus:outline-none"
            >
              <option value="" disabled>Select an option</option>
              {Object.values((ServiceType)).map((service) => (
                <option value={service} key={service}>{service}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
              <label htmlFor="service-name" className="text-sm font-bold">Service Name</label>
              <input 
                type="text"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Service name"
                value={state.serviceName}
                onChange={(e) => dispatch({type:"UPDATE_SERVICE_INFO", payload: {serviceName: e.target.value}})}
              />
          </div>
           <div className="flex flex-col gap-y-2">
              <label htmlFor="package-weight" className="text-sm font-bold">Service Price</label>
              <input
                min={0}
                type="number"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="10kg"
                value={state.servicePrice}
                onChange={(e) => dispatch({type:"UPDATE_SERVICE_INFO", payload: {servicePrice: Number(e.target.value)}})}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="chargeable-weight" className="text-sm font-bold">Chargeable Weigth</label>
              <input 
                type="text"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="10kg"
                value={state.chargeableWeight}
                onChange={(e) => dispatch({type:"UPDATE_SERVICE_INFO", payload: {chargeableWeight: e.target.value}})}
              />
          </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="delivery-time-frame" className="text-sm font-bold">Delivery Time Frame</label>
              <input 
                type="text"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="5 days"
                value={state.deliveryTimeFrame}
                onChange={(e) => dispatch({type:"UPDATE_SERVICE_INFO", payload: {deliveryTimeFrame: e.target.value}})}
              />
          </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="pickup-today" className="text-sm font-bold">Today PickUp</label>
                <CheckboxField
                  id="pickup-today"
                  label="Pick up today"
                  description="Pick today"
                  checked={state.hasPickUpToday}
                  onChange={(checked) => dispatch({type: "UPDATE_SERVICE_INFO", payload: {hasPickUpToday: checked}})}
                />
            </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="saturday-delivery" className="text-sm font-bold">Saturday Delivery</label>
                <CheckboxField
                  id="saturday-delivery"
                  label="Deliver on Saturday"
                  description="Deliver on saturday"
                  checked={state.hasSaturdayDelivery}
                  onChange={(checked) => dispatch({type: "UPDATE_SERVICE_INFO", payload: {hasSaturdayDelivery: checked}})}
                />
            </div>
        </div>
          <div className="flex *:basis-1/2 gap-4">
          <button
            type="button"
            onClick={goBack}
            className=" px-6 py-3 border border-black rounded-full hover:bg-black/10"         
          >
            Back
          </button>
          <button
            type="submit"
            className=" px-6 py-3 bg-black text-white rounded-full hover:bg-black/80"          
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShipmentServiceInfoStep