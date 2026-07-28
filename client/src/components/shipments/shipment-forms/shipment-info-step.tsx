import { ShipmentFormAction, ShipmentFormData } from "@/types/shipment-types";

interface Props {
  state: ShipmentFormData["shipmentInfo"];
  dispatch: React.Dispatch<ShipmentFormAction>;
  onNext: () => void;
}


const ShipmentInfoStep = ({state, dispatch, onNext}: Props) => {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onNext();
  }

  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-y-2">
          <label htmlFor="shipment-name" className="text-sm font-bold">Shipment Name</label>
          <input 
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Shipment 0001"
            value={state.shipmentName}
            onChange={(e) => dispatch({type:"UPDATE_SHIPMENT_INFO", payload: {shipmentName: e.target.value}})}
           />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="sender-name" className="text-sm font-bold">Sender Name</label>
          <input 
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="John Doe"
            value={state.senderName}
            onChange={(e) => dispatch({type:"UPDATE_SHIPMENT_INFO", payload: {senderName: e.target.value}})}
           />
        </div>
        <div className="flex flex-col gap-y-2">
           <label htmlFor="sender-phone-number" className="text-sm font-bold">Sender Phone Number</label>
          <input 
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="+1234590"
            value={state.senderPhoneNumber}
            onChange={(e) => dispatch({type:"UPDATE_SHIPMENT_INFO", payload: {senderPhoneNumber: e.target.value}})}
           />
        </div>
        <div className="flex flex-col gap-y-2">
           <label htmlFor="pick-up-address" className="text-sm font-bold">Pickup Address</label>
          <input 
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Main Street 111"
            value={state.pickupAddress}
            onChange={(e) => dispatch({type:"UPDATE_SHIPMENT_INFO", payload: {pickupAddress: e.target.value}})}
           />
        </div>
          </div>
          <div className="flex flex-col gap-6">
             <div className="flex flex-col gap-y-2">
           <label htmlFor="receiver-name" className="text-sm font-bold">Receiver Name</label>
          <input 
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Jane Smith"
            value={state.receiverName}
            onChange={(e) => dispatch({type:"UPDATE_SHIPMENT_INFO", payload: {receiverName: e.target.value}})}
           />
        </div>
        <div className="flex flex-col gap-y-2">
           <label htmlFor="receiver-phone-number" className="text-sm font-bold">Receiver Phone Number</label>
          <input 
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="+1201031"
            value={state.receiverPhoneNumber}
            onChange={(e) => dispatch({type:"UPDATE_SHIPMENT_INFO", payload: {receiverPhoneNumber: e.target.value}})}
           />
        </div>
        <div className="flex flex-col gap-y-2">
           <label htmlFor="receiver-notes" className="text-sm font-bold">Receiver Notes</label>
          <input 
            className="px-4 py-2 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="The shipment is..."
            value={state.receiverNotes ?? ""}
            onChange={(e) => dispatch({type:"UPDATE_SHIPMENT_INFO", payload: {receiverNotes: e.target.value}})}
           />
        </div>
         <div className="flex flex-col gap-y-2">
           <label htmlFor="delivery-address" className="text-sm font-bold">Delivery Address</label>
          <input 
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Jk Vuzrazhdane"
            value={state.deliveryAddress}
            onChange={(e) => dispatch({type:"UPDATE_SHIPMENT_INFO", payload: {deliveryAddress: e.target.value}})}
           />
        </div>
          </div>
        </div>
         <button
          className=" px-6 py-3 bg-black text-white rounded-full hover:bg-black/80"
          type="submit">
          Next
        </button>
      </form>
    </div>
  )
}

export default ShipmentInfoStep