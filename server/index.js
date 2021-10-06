const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

const PORT = process.env.NODE_PORT || 3001
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DOCKER_DATABASE
})

// GET scores from db and check if db exists
app.get('/scores', (req, res) => {
  db.query('SELECT * FROM scores', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.json(results)
    }
  })
  db.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`,
    (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Database OK')
      }
    }
  )
  db.query(
    `CREATE TABLE IF NOT EXISTS scores (
    gameID INT NOT NULL AUTO_INCREMENT,
    player INT,
    computer INT,
    PRIMARY KEY (gameID)
  )`,
    (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Table OK')
      }
    }
  )
})

app.post('/scores', (req, res) => {
  const { player, computer } = req.body
  const query = `INSERT INTO scores ( player, computer ) VALUES ( ?, ? )`
  db.query(query, [player, computer], (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
