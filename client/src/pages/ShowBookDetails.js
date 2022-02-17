//Преписаный код на функ

import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const ShowBookDetails = () => {
  const [book, setBook] = useState({});
  const idBook = useParams().id
  const navigate = useNavigate();

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


    
  function onDeleteClick(id){
    axios
      .delete('http://localhost:8082/api/books/'+ id)
      .then(res => {
        navigate("/")
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
      })
  };

  let BookItem = (
  <div>
    <table className="table table-hover table-dark">
      <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Категория</th>
            <th scope="col">Значение</th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Автор</td>
          <td>{ book.author }</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>ISBN</td>
          <td>{ book.isbn }</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Издатель</td>
          <td>{ book.publisher }</td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td>Дата публикации</td>
          <td>{ book.published_date }</td>
        </tr>
        <tr>
          <th scope="row">5</th>
          <td>Описание</td>
          <td>{ book.description }</td>
        </tr>
      </tbody>
    </table>
  </div>)
  
  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Показать список книг
            </Link>
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">{book.title}</h1>
            <p className="lead text-center">
                Подробная информация о книге
            </p>
            <hr /> <br />
          </div>
        </div>
        <div>
          { BookItem }
        </div>

        <div className="row row_but">
          <div className="col-md-6">
            <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={() => onDeleteClick(idBook)}>Удалить книгу</button><br />
          </div>

          <div className="col-md-6">
            <Link to={`/edit-book/${idBook}`} className="btn btn-outline-info btn-lg btn-block">
                  Реактировать книгу
            </Link>
            <br />
          </div>

        </div>
          {/* <br />
          <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
          <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}

      </div>
    </div>
  );
};

export default ShowBookDetails;