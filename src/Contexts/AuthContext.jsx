'use client'
import Cookies from "js-cookie";
const { useContext, useMemo, createContext, useState, useEffect } = require("react");


const AuthContext = createContext({
  user: '',
  login: (authTokens) => { },
  logout: () => { },
})

export function AuthContextProvider({ children }) {

  const [user, setUser] = useState('')

  useEffect(() => {
    const authToken = Cookies.get('authTokens')
    if (authToken) {
      const parsedToken = JSON.parse(authToken)
      setUser(parsedToken.user)
    }
  }, [])

  const login = async (authTokens) => {
    console.log(`Setting authTokens ${authTokens}`)
    Cookies.set('authTokens', JSON.stringify(authTokens))
    await setUser(authTokens.user)
  }

  const logout = () => {
    console.log('Removing authTokens')
    Cookies.remove('authTokens')
    setUser('')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuthContext() {
  return useContext(AuthContext)
}