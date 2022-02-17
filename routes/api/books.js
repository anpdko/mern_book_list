const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');

// GET api/books - Получить все книги
router.get('/', (req, res) => {
  Book.find()
    .then(books =>{
      res.json(books)
    })
    .catch(err => {
      res.status(404).json({ nobooksfound: 'Книги не найдены' })});
});

// GET api/books/:id - Получить одну книгу по id
router.get('/:id', (req, res) => {
  console.log("id: ", req.params.id)
  Book.findById(req.params.id)
    .then(book => {
      console.log("book:", book)
      res.json(book)
    })
    .catch(err => res.status(404).json({ nobookfound: 'Книга не найдена' }));
});

// GET api/books - Добавить/сохранить книгу
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(book => {
      res.json({ msg: 'Книга успешно добавлена' })
    })
    .catch(err => res.status(400).json({ error: 'Не удалось добавить книгу' }));
});

// GET api/books/:id - Обновить книгу
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Успешно Обновлено' }))
    .catch(err =>
      res.status(400).json({ error: 'Невозможно обновить базу данных' })
    );
});

// GET api/books/:id - Удалить книгу
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Запись в книге успешно удалена' }))
    .catch(err => res.status(404).json({ error: 'Нет такой книги' }));
});

module.exports = router;