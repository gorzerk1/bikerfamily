import React, { useContext, useState, useEffect } from 'react'

const MyContext = React.createContext()

function ThemeProvider({ children }) {
  const getLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  }
  const [foodOrderData, setFoodOrderData] = useState(getLocalStorage('foodOrderData', []).filter(item => item !== null && item !== undefined))
  const [guestInfoData, setGuestInfoData] = useState(getLocalStorage('guestInfoData', []))
  const [isIG, setIsIG] = useState(getLocalStorage('isIG', false))
  const [isCreditCard, setIsCreditCard] = useState(getLocalStorage('isCreditCard', false))
  const [isPopUpOrder, setIsPopUpOrder] = useState(getLocalStorage('isPopUpOrder', false))
  const [creditCardInfo, setCreditCardInfo] = useState(getLocalStorage('creditCardInfo', {}))
  const [deliveryData, setDeliveryData] = useState(getLocalStorage('deliveryData', []));
  const [orderType, setOrderType] = useState(getLocalStorage('orderType', ''));

  useEffect(() => {
    localStorage.setItem('foodOrderData', JSON.stringify(foodOrderData))
  }, [foodOrderData])

  useEffect(() => {
    localStorage.setItem('guestInfoData', JSON.stringify(guestInfoData))
  }, [guestInfoData])

  useEffect(() => {
    localStorage.setItem('isIG', JSON.stringify(isIG))
  }, [isIG])

  useEffect(() => {
    localStorage.setItem('isCreditCard', JSON.stringify(isCreditCard))
  }, [isCreditCard])

  useEffect(() => {
    localStorage.setItem('isPopUpOrder', JSON.stringify(isPopUpOrder))
  }, [isPopUpOrder])

  useEffect(() => {
    localStorage.setItem('creditCardInfo', JSON.stringify(creditCardInfo))
  }, [creditCardInfo])

  useEffect(() => {
    localStorage.setItem('deliveryData', JSON.stringify(deliveryData))
  }, [deliveryData])

  useEffect(() => {
    localStorage.setItem('orderType', JSON.stringify(orderType));
  }, [orderType]);

  return (
    <MyContext.Provider
      value={{
        foodOrderData,
        setFoodOrderData,
        guestInfoData,
        setGuestInfoData,
        setIsIG,
        isIG,
        setIsPopUpOrder,
        isPopUpOrder,
        setIsCreditCard,
        isCreditCard,
        setCreditCardInfo,
        creditCardInfo,
        deliveryData,
        setDeliveryData,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export { MyContext, ThemeProvider }
