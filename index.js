import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

const root = ReactDOM.createRoot(document.querySelector('#root'))

// todo
// 輸入值
// 計算按鈕
// 台幣換算成所有幣值印出

// todo2
// 新增幣種類,幣值
// 之後都有此幣值印出

//todo3 => 大家猜3~4個hook
// 錢包內有5000值
// 點擊幣種兌換
// 兌換紀錄

function App() {
  // !useState
  const [currency, setCurrency] = useState('');
  const [rate, setRate] = useState('');
  const [wallet, setWallet] = useState(5000);
  // 輸入台幣
  const [exChange, setExChange] = useState(0);
  // 台幣轉換暫存
  const [convert, setConvert] = useState(0)
  const [coinData, setCoinData] = useState({
    日幣: {
      rate: 45.4
    },
    澳幣: {
      rate: 0.483
    },
    美金: {
      rate: 0.33
    },
  })
  const [History, setHistory] = useState([])
  // !function declare
  function InputCurrency(e) {
    if (e.target.value === '') {
      setCurrency(e.target.value)
    } else if (!isNaN(e.target.value)) {
      return;
    }
    setCurrency(e.target.value)
  }
  function newCoinData(e) {
    if (e.target.value === '') {
      return;
    }
    setCoinData((prev) => {
      return {
        //這邊建議帶參數,ex: (prev)=> {setSomething{...prev}}
        ...prev,
        [currency]: { rate: Number(rate) }
      }
    })
  }
  function exchangeCurrency(e) {
    if (isNaN(e.target.value)) {
      return;
    }
    setExChange(Number(e.target.value));
  }
  // !JSX
  return (
    <>
      <h2>新增幣種</h2>
      <input type="text" value={currency} placeholder="幣種名稱"
        onChange={InputCurrency} />
      <input type="text" value={rate} placeholder="匯率"
        onChange={(e) => { setRate(e.target.value) }} />
      <input type="button" value="新增幣種"
        onClick={newCoinData} />
      <hr />
      <h2>您錢包還有{wallet}元</h2>
      <span>請輸入您要換的台幣</span>
      <input type="text" value={exChange}
        onChange={exchangeCurrency} />
      <input type="button" value="計算"
        onClick={() => {
          setConvert(exChange)
        }} />
      <p>可以換算</p>
      <ul>
        {
          Object.keys(coinData).map((item, i) => {
            const currencyValue = (Math.round(coinData[item].rate * convert)) / 100;
            return (
              <li key={i}>{item}:{currencyValue}
                <input type="button" value='兌換'
                  onClick={() => {
                    if (currencyValue === 0) {
                      return;
                    }
                    setWallet(wallet - exChange)
                    setHistory([
                      ...History,
                      {
                        台幣: convert,
                        兌換幣: {
                          名稱: item,
                          值: currencyValue
                        }
                      }
                    ])
                  }} />
              </li>
            )
          })
        }
      </ul>
      <hr />
      <h2>您的兌換紀錄</h2>
      <ul>
        {History.map((item, i) => {
          return (
            <li key={i}>您用{item['台幣']}元，兌換了{item['兌換幣']['值']}{item['兌換幣']['名稱']}</li>
          )
        })}
      </ul>
    </>
  )
}
root.render(<App />)
