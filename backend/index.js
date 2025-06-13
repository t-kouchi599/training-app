const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Pool } = require('pg')

// express アプリ生成
const app = express()
const port = 3000

// app.use 系を設定
app.use(cors())
app.use(bodyParser.json())

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'training_app',
  password: 'test',
  port: 5432,
})

// POST /api/body-weights（新規 or 上書き）
app.post('/api/body-weights', async (req, res) => {
  const { date, weight } = req.body
  if (!date || weight == null) {
    return res.status(400).json({ error: 'dateとweightは必須' })
  }

  try {
    await pool.query(
      `
      INSERT INTO
        body_weights (date, weight)
      VALUES
        ($1, $2)
      ON CONFLICT (date)
      DO UPDATE SET
        weight = EXCLUDED.weight
      `,
      [date, weight]
    )
    res.status(201).json({ message: '保存成功' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'DBエラー' })
  }
})

// GET /api/body-weights?start=...&end=...
app.get('/api/body-weights', async (req, res) => {
  const { start, end } = req.query
  if (!start || !end) {
    return res.status(400).json({ error: 'startとendが必要' })
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        date,
        weight
      FROM
        body_weights
      WHERE
        date BETWEEN $1 AND $2
      ORDER BY
        date
      `,
      [start, end]
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'DBエラー' })
  }
})

// DELETE /api/body-weights/:date
app.delete('/api/body-weights/:date', async (req, res) => {
  const targetDate = req.params.date

  try {
    const result = await pool.query(
      'DELETE FROM body_weights WHERE date = $1',
      [targetDate]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: '指定の日付のデータが存在しません' })
    }

    res.status(200).json({ message: '削除成功' })
  } catch (err) {
    console.error('削除エラー:', err)
    res.status(500).json({ error: '削除に失敗しました' })
  }
})

app.listen(port, () => {
  console.log(`サーバー起動中！http://localhost:${port}`)
})