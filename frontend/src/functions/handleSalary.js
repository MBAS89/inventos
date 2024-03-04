import millify from 'millify'

export const handleSalary = (employee) =>{
    if(employee.yearly_salary){
        return `$${millify(employee.yearly_salary)} -Y`
    }else if(employee.monthly_salary){
        return `$${millify(employee.monthly_salary)} -M`
    }else if(employee.hourly_rate){
        return `$${millify(employee.hourly_rate)} -H`
    }else{
        return 'Unspecified'
    }
} 