import CheckboxField from "@/components/common/checkbox";
import { ShipmentFormAction, ShipmentFormData } from "@/types/shipment-types";
import { PackageType } from "@/types/types";

interface Props {
  state: ShipmentFormData["packageInfo"];
  dispatch: React.Dispatch<ShipmentFormAction>;
  onNext: () => void;
  onBack: () => void
}

const ShipmentPackageInfoStep = ({state, dispatch, onNext, onBack}: Props) => {

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
        <div className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-y-2">
            <label htmlFor="package-type" className="text-sm font-bold">Package Type</label>
            <select id="package-type"
              value={state.packageType}
              onChange={(e) => dispatch({type: "UPDATE_PACKAGE_INFO", payload: {packageType: e.target.value}})}
              className="px-4 py-2 border border-slate-700 rounded-sm text-gray-700 focus:outline-none"
            >
              <option value="" disabled>Select an option</option>
              {Object.values((PackageType)).map((pack) => (
                <option value={pack} key={pack}>{pack}</option>
              ))}
            </select>
            </div>
             <div className="flex flex-col gap-y-2">
              <label htmlFor="package-description" className="text-sm font-bold">Package Description</label>
              <input 
                type="text"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Package is..."
                value={state.packageDescription}
                onChange={(e) => dispatch({type:"UPDATE_PACKAGE_INFO", payload: {packageDescription: e.target.value}})}
              />
            </div>
             <div className="flex flex-col gap-y-2">
              <label htmlFor="package-weight" className="text-sm font-bold">Package Weight</label>
              <input
                min={0}
                type="number"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="10kg"
                value={state.packageWeight}
                onChange={(e) => dispatch({type:"UPDATE_PACKAGE_INFO", payload: {packageWeight: Number(e.target.value)}})}
              />
            </div>
             <div className="flex flex-col gap-y-2">
              <label htmlFor="package-length" className="text-sm font-bold">Package Length</label>
              <input
                min={0}
                type="number"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="10cm"
                value={state.packageLength}
                onChange={(e) => dispatch({type:"UPDATE_PACKAGE_INFO", payload: {packageLength: Number(e.target.value)}})}
              />
            </div>
             <div className="flex flex-col gap-y-2">
              <label htmlFor="package-width" className="text-sm font-bold">Package Width</label>
              <input
                min={0}
                type="number"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="5cm"
                value={state.packageWidth}
                onChange={(e) => dispatch({type:"UPDATE_PACKAGE_INFO", payload: {packageWidth: Number(e.target.value)}})}
              />
            </div>
             <div className="flex flex-col gap-y-2">
              <label htmlFor="package-height" className="text-sm font-bold">Package Height</label>
              <input
                min={0}
                type="number"
                className="px-4 py-1 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="5cm"
                value={state.packageHeight}
                onChange={(e) => dispatch({type:"UPDATE_PACKAGE_INFO", payload: {packageHeight: Number(e.target.value)}})}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="receiver-notes" className="text-sm font-bold">Receiver Notes</label>
              <input 
                className="px-4 py-2 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="The package is..."
                value={state.packageNotes ?? ""}
                onChange={(e) => dispatch({type:"UPDATE_PACKAGE_INFO", payload: {packageNotes: e.target.value}})}
              />
           </div>
           <div className="flex flex-col gap-y-2">
            <label htmlFor="insurance" className="text-sm font-bold">Insurance</label>
            <CheckboxField
              id="insurance"
              label="Insurance"
              description="Cover your package against loss or damage"
              checked={state.hasInsurance}
              onChange={(checked) => dispatch({type: "UPDATE_PACKAGE_INFO", payload: {hasInsurance: checked}})}
            />
           </div>
           <div className="flex flex-col gap-y-2">
            <label htmlFor="cash-on-delivery" className="text-sm font-bold">Cash on Delivery</label>
            <CheckboxField
              id="cash-on-delivery"
              label="Cash on Delivery"
              description="Collect payment upon delivery"
              checked={state.hasCashOnDelivery}
              onChange={(checked) => dispatch({type: "UPDATE_PACKAGE_INFO", payload: {hasCashOnDelivery: checked}})}
            />
           </div>
           <div className="flex flex-col gap-y-2">
            <label htmlFor="dangerous-goods" className="text-sm font-bold">Dangerous Goods</label>
            <CheckboxField
              id="dangerous-goods"
              label="Dangerous Goods"
              description="Package contains hazardous materials"
              checked={state.hasDangerousGoods}
              onChange={(checked) => dispatch({type: "UPDATE_PACKAGE_INFO", payload: {hasDangerousGoods: checked}})}
            />
           </div>
           <div className="flex flex-col gap-y-2">
              <label htmlFor="special-hadling" className="text-sm font-bold">Special Handling</label>
              <input 
                className="px-4 py-2 border border-slate-700 rounded-full text-black placeholder:text-[14px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Fragile"
                value={state.specialHandling ?? ""}
                onChange={(e) => dispatch({type:"UPDATE_PACKAGE_INFO", payload: {specialHandling: e.target.value}})}
              />
           </div>
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

export default ShipmentPackageInfoStep