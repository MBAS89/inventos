import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export const ReusablePhoneInput = ({ phoneNumber, setPhoneNumber }) => {

    const handlerPhoneNumber = (value, data, event, formattedValue) => {
        setPhoneNumber(value);
    };

    const containerStyle = {
        width: '100%',
        marginTop:'4px',

    };

    const inputStyle = {
        width:'100%',
        paddingRight: '2.5rem', 
        borderRadius: '0.375rem',
        border: '1px solid #50B426', 
        backgroundColor: 'white', 
        fontSize: '0.875rem', 
        color: '#4B5563', 
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', 
        '&:focus': {
            border: '1px solid #ffb062',
            outline: 'none',
            ring: '0',
        },

    };

    const buttonStyle = {
        border: '1px solid #50B426', 
    }

    const searchStyle = {
        border: '1px solid #50B426', 
    }

    return (
    <div className='col-span-6 sm:col-span-3'>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <PhoneInput
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            inputStyle={inputStyle}
            enableAreaCodes={false}
            country="us"
            inputProps={{
                name: 'phoneNumber',
            }}
            searchStyle={searchStyle}
            enableSearch={true}
            autoFormat
            specialLabel=""
            value={phoneNumber}
            onChange={handlerPhoneNumber}
        />
    </div>
  )
}
