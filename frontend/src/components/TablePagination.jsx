//icons
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

export const TablePagination = ({ currentPage, totalPages, setCurrentPage, totalCount, count, casher }) => {
    let pagesAfter = [];
    let pagesBefore = [];

    if (currentPage !== 1) {
        // Calculate pages before the current page
        for (let i = Math.max(1, currentPage - 4); i < currentPage; i++) {
            pagesBefore.push(i);
        }
    }
    
    if (currentPage !== totalPages) {
        // Calculate pages after the current page
        for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + 4); i++) {
            pagesAfter.push(i);
        }
    }

    return (
        <div className={`flex font-bold ${casher ? 'bg-transparent' : 'bg-white '} py-2 items-center justify-center px-8 relative`}>
            <div className='absolute left-5 font-medium'>{count} | {totalCount}</div>
            <ol className="flex justify-center gap-1 text-xs">
                <li>
                    <div onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} className={`cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white text-gray-900 ${currentPage === 1 ? 'opacity-50' : ''}`}>
                        <MdKeyboardArrowLeft />
                    </div>
                </li>
                {pagesBefore.map(page => (
                    <li key={page}>
                        <div onClick={() => setCurrentPage(page)} className={`cursor-pointer block h-8 w-8 rounded border ${page === currentPage ? 'bg-[#50B426] text-white' : 'bg-white text-gray-900'} text-center leading-8`}>
                            {page}
                        </div>
                    </li>
                ))}
                <div>
                    <input
                    type="number"
                    className="h-8 w-12 rounded border border-[#50B426] focus:border-none focus:outline-none bg-white p-0 text-center text-xs font-bold text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    min="1"
                    value={currentPage}
                    onChange={(e) => e.target.value <= totalPages ? setCurrentPage(e.target.value) : totalPages}
                    id="PaginationPage"
                    />
                </div>
                {pagesAfter.map(page => (
                    <li key={page}>
                        <div onClick={() => setCurrentPage(page)} className={`cursor-pointer block h-8 w-8 rounded border ${page === currentPage ? 'bg-[#50B426] text-white' : 'bg-white text-gray-900'} text-center leading-8`}>
                            {page}
                        </div>
                    </li>
                ))}
                <li>
                    <div onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} className={`cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white text-gray-900 ${currentPage === totalPages ? 'opacity-50' : ''}`}>
                        <MdKeyboardArrowRight />
                    </div>
                </li>
            </ol>
        </div>
    );
};