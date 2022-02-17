import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCard = (props) => {
    const book = props.book;

    let description = props.book.description
    if(description.length > 25){
        description = description.substr(0, 25) + "..."
    }

    return(
        <Link className="link" to={`/show-book/${book._id}`}>
            <div className="card-container">
                <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
                <div className="desc">
                    <h2>
                            {book.title}
                    </h2>
                    <h3>{book.author}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    )
};

export default BookCard;