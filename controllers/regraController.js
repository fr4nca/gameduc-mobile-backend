const db = require("../config/db");

class RegraController {
  static async getRegras(req, res, next) {
    try {
      const { gameId } = req.params;
      if (gameId !== "undefined") {
        const results = await db.query(
          "SELECT * FROM tb_regra WHERE tb_game_id = ?",
          [gameId]
        );
        return res.json(results);
      } else {
        return res.status(400).json({ error: "Id não pode ser undefined" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async createRegra(req, res, next) {
    try {
      const { gameId, descricao, classificacao, tag, pontuacao } = req.body;
      await db.query(
        "INSERT INTO tb_regra(descricao, classificacao, tag, pontuacao, tb_game_id) VALUES(?, ?, ?, ?, ?)",
        [descricao, classificacao, tag, pontuacao, gameId]
      );
      return res.status(200).json({ message: "Regra criada com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async updateRegra(req, res, next) {
    try {
      const { regraId } = req.params;
      const { descricao, classificacao, tag, pontuacao } = req.body;

      await db.query(
        `UPDATE tb_regra SET descricao = ?, classificacao = ?, tag = ?, pontuacao = ? WHERE id = ?`,
        [descricao, classificacao, tag, pontuacao, regraId]
      );
      return res.status(200).json({ message: "Regra alterada com sucesso" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }

  static async deleteRegra(req, res, next) {
    try {
      const { regraId } = req.params;
      await db.query(`DELETE FROM tb_regra WHERE id = ?`, [regraId]);
      return res.status(200).json({ message: "Regra deletada" });
    } catch (err) {
      return res.status(400).json({ error: err.sqlMessage });
    }
  }
}

module.exports = RegraController;
