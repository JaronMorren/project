const ageValidation = (request, response, next) => {
    const { age } = request.body;
    if (!age) {
return response.status(400).json({ message: 'O campo "age" é obrigatório' });
    } 
    if (typeof age !== 'number') {
return response.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    } 
    if (!Number.isInteger(age)) {
return response.status(400).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
    } 
    if (age <= 18) {
return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  };
  module.exports = ageValidation;