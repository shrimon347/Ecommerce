import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'


function App() {
  return (
    <Router>
        <Navbar />
        <main>
        <Routes>
        <Route path='/' Component={HomeScreen} exact />
        <Route path='/login' Component={LoginScreen} />
        <Route path='/register' Component={RegisterScreen} />
        <Route path='/product/:id' Component={ProductScreen} />
        <Route path='/cart/:id?' Component={CartScreen} />
        <Route path='/shipping' Component={ShippingScreen} />
        <Route path='/payment' Component={PaymentScreen} />
        <Route path='/placeorder' Component={PlaceOrderScreen} />
        
        </Routes>
        </main>
        <Footer />
    </Router>
  )
}

export default App
