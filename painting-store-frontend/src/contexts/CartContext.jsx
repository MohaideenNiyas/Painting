import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (painting, qty = 1) => {
    setItems(prev => {
      const ex = prev.find(it => it._id === painting._id)
      if (ex) return prev.map(it => it._id === painting._id ? { ...it, quantity: it.quantity + qty } : it)
      return [...prev, { ...painting, quantity: qty }]
    })
  }

  const removeFromCart = (id) => setItems(prev => prev.filter(it => it._id !== id))
  const clearCart = () => setItems([])
  const updateQty = (id, qty) => setItems(prev => prev.map(it => it._id === id ? { ...it, quantity: qty } : it))

  const total = items.reduce((s, it) => s + (it.price * it.quantity), 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, updateQty, total }}>
      {children}
    </CartContext.Provider>
  )
}