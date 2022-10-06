var sid = chrome.extension.getBackgroundPage().XUTSID;

var nationsMap = new Map(Object.entries({
  54: "Brazil",
  45: "Spain",
  14: "England",
  18: "France",
  27: "Italy",
  52: "Argentina",
  21: "Germany",
  34: "Netherlands",
  38: "Portugal",
  7: "Belgium",
  56: "Colombia",
  60: "Uruguay",
  40: "Russia",
  48: "Turkey",
  149: "Afghanistan",
  1: "Albania",
  97: "Algeria",
  194: "American Samoa",
  98: "Angola",
  62: "Anguilla",
  63: "Antigua and Barbuda",
  3: "Armenia",
  64: "Aruba",
  195: "Australia",
  4: "Austria",
  5: "Azerbaijan",
  65: "Bahamas",
  150: "Bahrain",
  151: "Bangladesh",
  66: "Barbados",
  6: "Belarus",
  67: "Belize",
  99: "Benin",
  68: "Bermuda",
  152: "Bhutan",
  53: "Bolivia",
  8: "Bosnia and Herzegovina",
  100: "Botswana",
  69: "British Virgin Islands",
  153: "Brunei Darussalam",
  9: "Bulgaria",
  101: "Burkina Faso",
  102: "Burundi",
  154: "Cambodia",
  103: "Cameroon",
  70: "Canada",
  104: "Cape Verde Islands",
  71: "Cayman Islands",
  105: "Central African Republic",
  106: "Chad",
  55: "Chile",
  155: "China PR",
  213: "Chinese Taipei",
  214: "Comoros",
  107: "Congo",
  110: "Congo DR",
  196: "Cook Islands",
  72: "Costa Rica",
  108: "Côte d'Ivoire",
  10: "Croatia",
  73: "Cuba",
  85: "Curaçao",
  11: "Cyprus",
  12: "Czech Republic",
  13: "Denmark",
  109: "Djibouti",
  74: "Dominica",
  207: "Dominican Republic",
  57: "Ecuador",
  111: "Egypt",
  76: "El Salvador",
  112: "Equatorial Guinea",
  113: "Eritrea",
  208: "Estonia",
  142: "Eswatini",
  114: "Ethiopia",
  16: "Faroe Islands",
  197: "Fiji",
  17: "Finland",
  19: "FYR Macedonia",
  115: "Gabon",
  116: "Gambia",
  20: "Georgia",
  117: "Ghana",
  205: "Gibraltar",
  22: "Greece",
  206: "Greenland",
  77: "Grenada",
  157: "Guam",
  78: "Guatemala",
  118: "Guinea",
  119: "Guinea-Bissau",
  79: "Guyana",
  80: "Haiti",
  81: "Honduras",
  158: "Hong Kong",
  23: "Hungary",
  24: "Iceland",
  159: "India",
  160: "Indonesia",
  75: "International",
  161: "Iran",
  162: "Iraq",
  26: "Israel",
  82: "Jamaica",
  163: "Japan",
  164: "Jordan",
  165: "Kazakhstan",
  120: "Kenya",
  166: "Korea DPR",
  167: "Korea Republic",
  219: "Kosovo",
  168: "Kuwait",
  169: "Kyrgyzstan",
  170: "Laos",
  28: "Latvia",
  171: "Lebanon",
  121: "Lesotho",
  122: "Liberia",
  123: "Libya",
  29: "Liechtenstein",
  30: "Lithuania",
  31: "Luxembourg",
  172: "Macau",
  124: "Madagascar",
  125: "Malawi",
  173: "Malaysia",
  174: "Maldives",
  126: "Mali",
  32: "Malta",
  127: "Mauritania",
  128: "Mauritius",
  83: "Mexico",
  33: "Moldova",
  175: "Mongolia",
  15: "Montenegro",
  84: "Montserrat",
  129: "Morocco",
  130: "Mozambique",
  176: "Myanmar",
  131: "Namibia",
  177: "Nepal",
  215: "New Caledonia",
  198: "New Zealand",
  86: "Nicaragua",
  132: "Niger",
  133: "Nigeria",
  35: "Northern Ireland",
  36: "Norway",
  178: "Oman",
  179: "Pakistan",
  180: "Palestine",
  87: "Panama",
  199: "Papua New Guinea",
  58: "Paraguay",
  59: "Peru",
  181: "Philippines",
  37: "Poland",
  88: "Puerto Rico",
  182: "Qatar",
  25: "Republic of Ireland",
  39: "Romania",
  134: "Rwanda",
  200: "Samoa",
  41: "San Marino",
  135: "São Tomé e Príncipe",
  183: "Saudi Arabia",
  42: "Scotland",
  136: "Senegal",
  51: "Serbia",
  137: "Seychelles",
  138: "Sierra Leone",
  184: "Singapore",
  43: "Slovakia",
  44: "Slovenia",
  201: "Solomon Islands",
  139: "Somalia",
  140: "South Africa",
  218: "South Sudan",
  185: "Sri Lanka",
  89: "St. Kitts and Nevis",
  90: "St. Lucia",
  91: "St. Vincent and the Grenadines",
  141: "Sudan",
  92: "Suriname",
  46: "Sweden",
  47: "Switzerland",
  186: "Syria",
  202: "Tahiti",
  187: "Tajikistan",
  143: "Tanzania",
  188: "Thailand",
  212: "Timor-Leste",
  144: "Togo",
  203: "Tonga",
  93: "Trinidad and Tobago",
  145: "Tunisia",
  189: "Turkmenistan",
  94: "Turks and Caicos Islands",
  146: "Uganda",
  49: "Ukraine",
  190: "United Arab Emirates",
  95: "United States",
  96: "US Virgin Islands",
  191: "Uzbekistan",
  204: "Vanuatu",
  61: "Venezuela",
  192: "Vietnam",
  50: "Wales",
  193: "Yemen",
  147: "Zambia",
  148: "Zimbabwe"
}))

var count = 250
var start = 0
var totalPlayers = 0

var listaArrayPais = new Array()
var listaSetPais = new Set()
var codPais = new Array()
var nomePais = new Array()
var qtdPais = new Array()

var listaArrayLiga = new Array()
var listaSetLiga = new Set()
var codLiga = new Array()
var qtdLiga = new Array()

var listaArrayTime = new Array()
var listaSetTime = new Set()
var codTime = new Array()
var qtdTime = new Array()

function mudarTexto(id, novoTexto) {
  document.getElementById(id).innerHTML = novoTexto;
}

async function getPlayers(start) {
  const response = await fetch('https://utas.mob.v1.fut.ea.com/ut/game/fifa23/club', {
    method: 'POST',
    headers: {
      'X-UT-SID': sid,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      count: count,
      sort: 'desc',
      sortBy: 'value',
      start: start,
      type: 'player'
    }),
  })
  const jsonRes = await response.json();
  return jsonRes
}

async function getTotals() {
  const response = await fetch('https://utas.mob.v1.fut.ea.com/ut/game/fifa23/club/stats/club', {
    headers: {
      'X-UT-SID': sid,
      'content-type': 'application/json'
    },
    method: 'GET'
  })
  const jsonRes = await response.json();
  return jsonRes
}

async function relatorioTotals() {

  await getTotals().then(json => {
    json.stat.map(el => {
      if (el.type == 'players') {
        totalPlayers = el.typeValue
        mudarTexto("totals", 'Total de Jogadores: ' + totalPlayers)
      }
    })
  });

}

//----------- Requisição dos paises ---------------------
async function relatorioPaises(start) {

  await getTotals()

  // for (let i = 256; i <= totalPlayers; i++) {
  //   await getPlayers(0).then(json => {
  //     json.itemData.map(el => {
  //       listaSetPais.add(el.nation)
  //       listaArrayPais.push(el.nation)
  //     })
  //   })   
  // }

  // Preenche a lista de players por país
  if (totalPlayers <= 250) {
    await getPlayers(0).then(json => {
      json.itemData.map(el => {
        listaSetPais.add(el.nation)
        listaArrayPais.push(el.nation)
      })
    })
  } else if (totalPlayers > 250 && totalPlayers <= 500) {

    await getPlayers(0).then(json => {
      json.itemData.map(el => {
        listaSetPais.add(el.nation)
        listaArrayPais.push(el.nation)
      })
    })

    await getPlayers(250).then(json => {
      json.itemData.map(el => {
        listaSetPais.add(el.nation)
        listaArrayPais.push(el.nation)
      })
    })

  } else if (totalPlayers > 500 && totalPlayers <= 750) {

    await getPlayers(0).then(json => {
      json.itemData.map(el => {
        listaSetPais.add(el.nation)
        listaArrayPais.push(el.nation)
      })
    })

    await getPlayers(250).then(json => {
      json.itemData.map(el => {
        listaSetPais.add(el.nation)
        listaArrayPais.push(el.nation)
      })
    })

    await getPlayers(500).then(json => {
      json.itemData.map(el => {
        listaSetPais.add(el.nation)
        listaArrayPais.push(el.nation)
      })
    })

  }

  // Converte set em array e ordena por código(crescente)
  codPais = Array.from(listaSetPais)

  // Ordena a lista
  //codPais.sort((a, b) => a - b)
  // qtdPais.sort()

  // Faz De/Para Cód. País para Nome País
  for (let i = 0; i < codPais.length; i++) {

    qtdPais.push(listaArrayPais.filter(n => n == codPais[i]).length)

    for (const [k, v] of nationsMap) {
      if (k == codPais[i]) {
        nomePais.push(v)
      }
    }
  }

  // Preenchendo a tabela
  let tbody = document.getElementById('tbody')

  for (let i = 0; i < codPais.length; i++) {
    let tr = tbody.insertRow()

    let tdnomes = tr.insertCell()
    let tdNomePais = tr.insertCell()

    tdnomes.innerText = nomePais[i]
    tdNomePais.innerText = qtdPais[i]

  }

}

//----------- Requisição das ligas ---------------------
async function relatorioLigas() {

  await getPlayers().then(json => {
    json.itemData.map(el => {
      if (el.itemType == 'player') {
        listaSetLiga.add(el.leagueId)
        listaArrayLiga.push(el.leagueId)
      }
    })
  });

  codLiga = Array.from(listaSetLiga)
  codLiga.sort((a, b) => a - b)

  for (let i = 0; i < codLiga.length; i++) {

    qtdLiga.push(listaArrayLiga.filter(n => n == codLiga[i]).length)

  }

  mudarTexto('codLiga', codLiga)
  mudarTexto('qtdLiga', qtdLiga)

}

//----------- Requisição dos Times ---------------------
async function relatorioTimes() {

  await getPlayers().then(json => {
    json.itemData.map(el => {
      if (el.itemType == 'player') {
        listaSetTime.add(el.teamid)
        listaArrayTime.push(el.teamid)
      }
    })
  });

  codTime = Array.from(listaSetTime)
  codTime.sort((a, b) => a - b)

  for (let i = 0; i < codTime.length; i++) {

    qtdTime.push(listaArrayTime.filter(n => n == codTime[i]).length)

  }

  mudarTexto('codTime', codTime)
  mudarTexto('qtdTime', qtdTime)

}

relatorioTotals()

relatorioPaises()

mudarTexto("sid", sid)

