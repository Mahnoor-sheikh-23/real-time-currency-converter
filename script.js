const fromAmount = document.querySelector(".amount");
const fromcurrency = document.querySelector(".from-currency");
const toAmount = document.querySelector(".to-ammount");
const tocurrency = document.querySelector(".to-currency");
const swapButton = document.querySelector(".swap");
const rateContainer = document.querySelector(".rate-container");




async function calculate(){
    const newfrom = fromcurrency.value 
    const newto = tocurrency.value

    let data = await fetch(`https://open.exchangerate-api.com/v6/latest/${newfrom}`);

    let result = await data.json()
    const rate = result.rates[newto]
    toAmount.value = (fromAmount.value * rate).toFixed(2)
    rateContainer.innerHTML = `
    <p>1${newfrom} = ${rate.toFixed(2)} ${newto}</p>
   <p> 1${newto} = ${(1/rate).toFixed(2)} ${newfrom}</p>
   <h2>${fromAmount.value} ${fromcurrency.value} = ${toAmount.value} ${newto}</h2>`
}

function swapfunc(){
    const tempValue = fromcurrency.value;
    fromcurrency.value = tocurrency.value
    tocurrency.value = tempValue;
    calculate()
}

fromAmount.addEventListener("input",calculate);
fromcurrency.addEventListener("change",calculate);
toAmount.addEventListener("input",calculate);
tocurrency.addEventListener("change",calculate);
swapButton.addEventListener("click",swapfunc);
calculate()

