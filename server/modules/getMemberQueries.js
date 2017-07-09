const pgQuery = require('pg-query');

const queries = {
    getOnePerson(pin, isMinister){
        let adminNotes = ""
        if (isMinister) adminNotes = "admin_notes,";
        return pgQuery(`SELECT pin, first_name, middle_name, last_name, email, 
            age, gender, electronic_newsletter, ${adminNotes} primary_phone_number,
            secondary_phone_number FROM people WHERE pin = ${pin}`);
    },
    getOnePersonsFamilies(pin){
        return pgQuery(`SELECT family_name, f.family_id from people p 
            JOIN people_and_families pf ON p.pin=pf.pin 
            JOIN families f ON pf.family_id=f.family_id
            WHERE p.pin = ${pin}`);
    },
    getOnePersonsAddresses(pin){
        return pgQuery(`SELECT house_number, street, city, county, state, zip, a.address_id from people p 
            JOIN people_and_addresses pa ON (p.pin = pa.pin) 
            JOIN addresses a ON (pa.address_id = a.address_id) 
            WHERE p.pin = ${pin}`);
    },
    getManyPeople(paramsArray, isMinister){
        let adminNotes = ""
        if (isMinister) adminNotes = "admin_notes,";
        return pgQuery(
            `SELECT first_name, last_name, email, gender, age, electronic_newsletter,
                p.pin, ${adminNotes} primary_phone_number, secondary_phone_number, street, state, zip, a.address_id 
            FROM people p 
            LEFT JOIN (
                SELECT pin, MIN(address_id) AS address_id FROM people_and_addresses GROUP BY pin
            ) pa
            ON p.pin=pa.pin 
            LEFT JOIN addresses a 
            ON pa.address_id=a.address_id
            WHERE first_name ILIKE $1 AND last_name ILIKE $2 AND tenant_id=$3`, paramsArray
        );
    }
}

module.exports = queries;