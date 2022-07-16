import React from 'react'

function Search() {
    return (
        <div className="input-group justify-content-center">
            <div className="form-outline">
                <input className="form-control" placeholder='search' />
            </div>
            <button type="button" class="btn btn-primary">
                <i className="fas fa-search"></i>
            </button>
        </div>
    )
}

export default Search