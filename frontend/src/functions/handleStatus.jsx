export const handleStatus = (status) => {
    if(status){
        return(
            <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                Yes
            </span>
        )
    }else{ 
        return(
            <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                No
            </span>
        )
    }
} 