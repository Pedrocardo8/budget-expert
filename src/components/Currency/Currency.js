import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow'
import '../../App.css';

// API KEY atualizada 

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=2f5db7b3fac24d65b97eba1301839210&format=1'

function Currency() {
// variáveis declaradas para tratar os dados API
const [currencyOptions, setCurrencyOptions] = useState([])
const [fromCurrency, setFromCurrency] = useState()
const [toCurrency, setToCurrency] = useState()
const [exchangeRate, setExchangeRate] = useState()
const [amount, setAmount] = useState(1)
const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

// para descobrir o valor da variavel a mostrar em cada box 

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
 
  // fetch dos dados da API, tratar os dados com as vars que declarei 
  useEffect(() => {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])
  
// para atualizar o valor qnd se altera a currency, tanto para o FromCurrency e o toCurrency
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

    return (
      <>
      <div className="text-center">
      <h1 className="title-dash">Currency Converter</h1>
      <p className="p-4"></p>
      <div className="currency">
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
        </div>
      </div>
    </>
  );
}
export default Currency;