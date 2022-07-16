import React from 'react'

function Pagination({ pageCount = 1, paginate, page }) {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) pageNumbers.push(i);
    return (
        <div>
            <ul className='pagination justify-content-center'>
                <li className='page-item'>
                    <a onClick={() => paginate("-1")} className='page-link'>
                        previous
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className={page === number ? 'page-link bg-primary text-light' : 'page-link'} >
                            {number}
                        </a>
                    </li>
                ))}
                <li className='page-item'>
                    <a onClick={() => paginate("+1")} className='page-link'>
                        next
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination