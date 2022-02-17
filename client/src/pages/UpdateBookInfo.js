import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const UpdateBookInfo = () => {
  const idBook = useParams().id
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    isbn: '',
    author: '',
    description: '',
    published_date: '',
    publisher: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/books/'+idBook)
      .then(res => {
        // console.log("Print-showBookDetails-API-response: " + res.data.title);
        let date = res.data.published_date.split('T')
        res.data.published_date = date[0]
        setBook(res.data)
      })
      .catch(err => {
        console.log("Error from ShowBookDetails");
      })

  }, [])

  const handleChange = (event) =>{
    setBook({ ...book, [event.target.name]: event.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();

    const data = {
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      description: book.description,
      published_date: book.published_date,
      publisher: book.publisher
    };

    axios
      .put('http://localhost:8082/api/books/'+idBook, data)
      .then(res => {
        navigate("/");
      })
      .catch(err => {
        console.log("Error in UpdateBookInfo!");
      })
  };

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Показать список книг
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Редактор книги</h1>
            <p className="lead text-center">
              Обновить информацию о книге
            </p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
        <form noValidate onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor="title">Заголовок</label>
            <input
              type='text'
              placeholder='Title of the Book'
              name='title'
              className='form-control'
              value={book.title}
              onChange={handleChange}
            />
          </div>
          <br />

          <div className='form-group'>
          <label htmlFor="isbn">ISBN</label>
            <input
              type='text'
              placeholder='ISBN'
              name='isbn'
              className='form-control'
              value={book.isbn}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
          <label htmlFor="author">Автор</label>
            <input
              type='text'
              placeholder='Author'
              name='author'
              className='form-control'
              value={book.author}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
          <label htmlFor="description">Описание</label>
            <input
              type='text'
              placeholder='Describe this book'
              name='description'
              className='form-control'
              value={book.description}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
          <label htmlFor="published_date">Дата побликации</label>
            <input
              type='date'
              placeholder='published_date'
              name='published_date'
              className='form-control'
              value={book.published_date}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
          <label htmlFor="publisher">Издатель</label>
            <input
              type='text'
              placeholder='Publisher of this Book'
              name='publisher'
              className='form-control'
              value={book.publisher}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-outline-info btn-lg btn-block">Обновить данные о книге</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default UpdateBookInfo;