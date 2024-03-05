export const handleContract = (status) => {
    if(status === 'contract-based' || status === 'Active'){
        return(
            <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                {status === 'Active' ? 'Active' : 'Yes'}
            </span>
        )
    }else{ 
        return(
            <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                {status === 'Expired' ? 'Expired' : 'No'}
            </span>
        )
    }
} 