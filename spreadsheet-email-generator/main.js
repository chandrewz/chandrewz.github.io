var data = [
  ['Last Name',  'Middle Name', 'First Name',  'Location', 'Title', 'Email', 'School District', 'State', 'Regional Service Center', 'Lead Source', 'Lead Status'],
];

var container = document.getElementById('hot');
init();

function button() {
  console.log(hot.getData());
  data = hot.getData();
  var e = document.getElementById('option');
  var option = e.options[e.selectedIndex].value;
  var domain = document.getElementById('domain').value;
  var baseRow = data[0];
  for (var i in data) {
    var row = data[i];
    if (!isRowEmpty(row)) {
      row[0] = row[0] ? row[0].trim().capitalize() : '';
      row[1] = row[1] ? row[1].trim().capitalize() : '';
      row[2] = row[2] ? row[2].trim().capitalize() : '';
      var firstName = row[2].toLowerCase().replace(/[^a-z]/gi,'');
      var middleName = row[1].toLowerCase().replace(/[^a-z]/gi,'');
      var lastName = row[0].toLowerCase().replace(/[^a-z]/gi,'');
      row[3] = row[3] ? row[3].trim().capitalize() : '';
      row[4] = row[4] ? row[4].trim().capitalize() : '';
      row[6] = data[0][6] ? data[0][6] : '';
      row[7] = data[0][7] ? data[0][7] : '';
      row[8] = data[0][8] ? data[0][8] : '';
      row[9] = data[0][9] ? data[0][9] : '';
      row[10] = data[0][10] ? data[0][10] : '';
      switch(option) {
        case "0":
          // [first name][last name]
          row[5] = firstName + lastName + '@' + domain;
          break;
        case "1":
          // [first name].[last name]
          row[5] = firstName + '.' + lastName + '@' + domain;
          break;
        case "2":
          // [last name].[first name]
          row[5] = lastName + '.' + firstName + '@' + domain;
          break;
        case "3":
          // [first initial][last name]
          row[5] = firstName.charAt(0) + lastName + '@' + domain;
          break;
        case "4":
          // [last name][first initial]
          row[5] = lastName + firstName.charAt(0) + '@' + domain;
          break;
        case "5":
          // [first name][middle initial][last name]
          row[5] = firstName + middleName.charAt(0) + lastName + '@' + domain;
          break;
        case "6":
          // [first name].[middle initial].[last name]
          if (middleName == '') {
            row[5] = firstName + '.' + lastName + '@' + domain;
          } else {
            row[5] = firstName + '.' + middleName.charAt(0) + '.' + lastName + '@' + domain;
          }
          break;
        case "8":
          // [first initial].[last name]
          row[5] = firstName.charAt(0) + '.' + lastName + '@' + domain;
          break;
        default:
      }
      data[i] = row;
    }
  }

  hot.destroy();
  init();
}

function init() {
  var cellWidth = screen.width / 12;

  hot = new Handsontable(container,
  {
    data: data,
    minSpareRows: 1,
    rowHeaders: true,
    colHeaders: ['Last Name',  'Middle Name', 'First Name',  'Location', 'Title', 'Email', 'School District', 'State', 'Regional Service Center', 'Lead Source', 'Lead Status'],
    contextMenu: true,
    cells : function(row, col, prop) {
      var cellProperties = {};

      if (col == 5) {
          cellProperties.readOnly = true;
      }
      else {
          cellProperties.readOnly = false;
      }

      return cellProperties;
    },
    stretchH: 'all'
  });
}

String.prototype.capitalize = function() {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function isRowEmpty(row) {

  for (var i = 0, ilen = row.length; i < ilen; i++) {
    if (row[i] !== null) {
      return false;
    }
  }

  return true;
}