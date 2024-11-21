import React from 'react'



const FeaturesCard = ({item, title, desc }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-none hover:bg-opacity-20 transition-all duration-300">
        <div  className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-3xl font-bold text-gray-900 mx-auto mb-4">
            {item}
        </div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-500">{desc}</p>
    </div>
  )
}

export default FeaturesCard

