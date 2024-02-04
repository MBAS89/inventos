export const checkRequiredFields = (payload, requiredFields) => {
    const missingFields = [];
  
    requiredFields.forEach((field) => {
      if (payload[field] === undefined || String(payload[field]).trim() === '') {
        missingFields.push(field);
      }
    });
  
    if (missingFields.length > 0) {
      const errorMessage = `Missing required field(s): ${missingFields.join(', ')}`;
      return errorMessage
    }
}