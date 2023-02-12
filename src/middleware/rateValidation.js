const rateValidation = (request, response, next) => {
    const { rate } = request.body.talk;
    if (rate === undefined) {
      return response.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };
  module.exports = rateValidation;