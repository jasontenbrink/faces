//try to start putting pgQuery statements in this file
/*jshint multistr: true */
var pgQuery = require('pg-query');
var family = {
  makeFamilyName: function (familyArray) {
    // console.log('from make family module, familyArray', familyArray);
    if(familyArray.length > 0){
      var familyName = familyArray[0].first_name;
      for (var i = 1; i < familyArray.length; i++) {
        familyName += ', ' + familyArray[i].first_name;
      }
      // console.log('from make family module, familyName', familyName);
      return familyName;
    }
    else return 'defunct';
  },
  makeQueryString: function (familyArray, familyId) {
    // console.log('makeQueryString familyArray, ', familyArray);
    // console.log('makeQueryString familyId, ', familyId);
    var queryString = 'INSERT INTO people_and_families (pin, family_id) VALUES ';
    if(familyArray.length > 1 ) {
      for (var i = 0; i < familyArray.length-1; i++) {
        queryString += '(' + familyArray[i].pin + ', ' + familyId + '), ';
      }
    }
    queryString += '(' + familyArray[familyArray.length-1].pin + ', ' + familyId + ') RETURNING *';
    // console.log('queryString, ', queryString);
    return queryString;
  },
  updateFamilyName: function (familyId) {
    console.log('familyId ', familyId );
    //get family members
    return this.getFamilyMembers(familyId)

    //make new family name
    .then(function (results) {
        console.log('people in the family', results[0]);
        var familyName = this.makeFamilyName(results[0]);
        console.log('new family name', familyName);

        //update family name
        return pgQuery("UPDATE families SET family_name = $1 WHERE family_id = $2",
          [familyName, familyId]);
      }.bind(this),
      function (err) {
        console.log(err);
        return err;
      }
    );
  },
  getFamilyMembers: function (familyId) {
    return pgQuery('SELECT first_name, last_name, email, p.pin \
      FROM people p JOIN people_and_families pf ON p.pin=pf.pin \
      WHERE pf.family_id = $1', [familyId]);
  }
};

function dbCallBack (err, rows, results) {
  if(err) {
    console.log(err);
    return(err);
  }
  return(rows[0]);
  //test getFamilyMembers
  //finish updateFamilyName
  //pull out the callback function
 }

module.exports = family;
