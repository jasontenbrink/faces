var family = {
  makeFamilyName: function (familyArray) {
    console.log('from make family module, familyArray', familyArray);
      var familyName = familyArray[0].first_name;
      for (var i = 1; i < familyArray.length; i++) {
        familyName += ', ' + familyArray[i].first_name;
      }
      console.log('from make family module, familyName', familyName);
      return familyName;
  },
  makeQueryString: function (familyArray, familyId) {
    var queryString = 'INSERT INTO people_and_families (pin, family_id) VALUES ';
    for (var i = 0; i < familyArray.length-1; i++) {
      queryString += '(' + familyArray[i].pin + ', ' + familyId + '), ';
    }
    queryString += '(' + familyArray[familyArray.length-1].pin + ', ' + familyId + ') RETURNING *';
    return queryString;
  }
};


module.exports = family;
