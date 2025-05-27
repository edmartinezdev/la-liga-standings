"use client"

import * as React from "react"

const TabsContext = React.createContext(null)

function Tabs({ defaultValue, className, children }) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, children }) {
  return (
    <div className={`flex border-b ${className}`}>
      {children}
    </div>
  )
}

function TabsTrigger({ value, className, children }) {
  const context = React.useContext(TabsContext)
  
  if (!context) {
    throw new Error("TabsTrigger must be used within Tabs")
  }
  
  const isActive = context.value === value
  
  return (
    <button
      className={`px-4 py-2 ${isActive 
        ? 'border-b-2 border-[#003366] font-semibold' 
        : 'text-gray-500 hover:text-black'} ${className}`}
      onClick={() => context.setValue(value)}
    >
      {children}
    </button>
  )
}

function TabsContent({ value, className, children }) {
  const context = React.useContext(TabsContext)
  
  if (!context) {
    throw new Error("TabsContent must be used within Tabs")
  }
  
  return context.value === value ? (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  ) : null
}

export { Tabs, TabsList, TabsTrigger, TabsContent }