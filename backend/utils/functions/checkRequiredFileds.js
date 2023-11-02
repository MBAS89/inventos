
function checkRequiredFields(next, body, requiredFields) {
    const missingFields = [];
  
    requiredFields.forEach((field) => {
      if (body[field] === undefined || String(body[field]).trim() === '') {
        missingFields.push(field);
      }
    });
  
    if (missingFields.length > 0) {
      const errorMessage = `Missing required field(s): ${missingFields.join(', ')}`;
      return errorMessage
    }
}

//export the modules to be used anywhere
module.exports = { checkRequiredFields };