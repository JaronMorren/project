const watchedAtValidation = (request, response, next) => {
    const { watchedAt } = request.body.talk;
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!watchedAt) {
return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
} if (!dateRegex.test(watchedAt)) { 
return response.status(400).json({ 
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}
    next();
  };
  module.exports = watchedAtValidation;