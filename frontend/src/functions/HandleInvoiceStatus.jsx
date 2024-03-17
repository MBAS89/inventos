import { AiOutlineCheckCircle } from "react-icons/ai"
import { HiOutlineReceiptRefund } from "react-icons/hi"
import { CiWarning } from "react-icons/ci"

export const handleStatus = (status) => {
    if(status === "paid"){
        return(
            <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                <AiOutlineCheckCircle />
                <p className="whitespace-nowrap text-sm">Paid</p>
            </span>
        )
    }else if(status === "Partially" || status === "partially"){
        return(
            <span className="inline-flex items-center justify-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                <HiOutlineReceiptRefund />
                <p className="whitespace-nowrap text-sm">Partially</p>
            </span>
        )
    }else if(status === "refunded"){
        return(
            <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                <HiOutlineReceiptRefund />
                <p className="whitespace-nowrap text-sm">Refunded</p>
            </span>
        )
    }else{
        return(
            <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-200 px-2.5 py-0.5 text-gray-700">
                <CiWarning />
                <p className="whitespace-nowrap text-sm">Unknown</p>
            </span>
        )
    }

} 