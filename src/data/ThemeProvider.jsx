import React, { useContext, useState, useEffect } from 'react'

const MyContext = React.createContext()

function ThemeProvider({ children }) {

  const [imageIndex, setImageIndex] = useState(null)


  return (
    <MyContext.Provider
      value={{
        setImageIndex,
        imageIndex
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export { MyContext, ThemeProvider }
