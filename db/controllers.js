const { connection } = require('./index.js');

const scores = {
  getN(quantity) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM high_scores ORDER BY score DESC';
      if (quantity && typeof quantity === 'number') {
        query += ` LIMIT ${quantity}`;
      }
      connection.query(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  add({ name, score }) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO high_scores (name, score) VALUES (?, ?)',
        [name, score],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('OK');
          }
        },
      );
    });
  },
};

module.exports = { scores };
