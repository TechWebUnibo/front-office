import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <Pagination className='pagination justify-content-center mt-2'>
                {pageNumbers.map(number => (
                    <Pagination.Item key={number} onClick={() => paginate(number)} >
                        {number}</Pagination.Item>
                ))}
            </Pagination>
        </nav>
    );
};

export default Paginator;