import React from 'react'
import { AuthFunction, Footer, Container } from '../components/index.js'

const Auth = () => {
  return (
    <div className=" bg-gray-800 w-full h-screen">
      <Container>
        <AuthFunction/>
      </Container>
    </div>
  )
}

export default Auth