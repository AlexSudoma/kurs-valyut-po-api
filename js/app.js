window.currenciesBackup = [];

function filterCurrencies(searchValue) {
    var result = [];
    for(var currency of currenciesBackup) {
        var currencyCurrency = currency.txt.toLowerCase();
        if(currencyCurrency.indexOf(searchValue) >= 0) {
            result.push(currency);
        }
    }
    renderCurrencies(result);
}

function renderCurrencies(currencies) {
    var htmlStr = '';

    for (var currency of currencies) {
        htmlStr += `<tr>
        <td>${currency.txt}</td>
        <td class="text-center">${currency.rate}</td>
    </tr>`;
}
    document.getElementById('currencies').innerHTML = htmlStr;
}

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221110&json').then(res => res.json()).then(function(data) {
    window.currenciesBackup = data;
    renderCurrencies(data);
});

var search = document.getElementById('search');

search.onkeyup = function(e) {
    var searchValue = e.currentTarget.value;
    filterCurrencies(searchValue.trim().toLowerCase());
}