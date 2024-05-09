import { CurrencyConverter } from "../components/CurrencyConverter/CurrencyConverter.jsx"
import { Navbar } from "../components/Navbar/Navbar.jsx"
import { AdditionalInfo } from "../components/AdditionalInfo/AdditionalInfo.jsx"

export const Home = () => {
  return (
    <> {/* React Fragment!! */}
        <Navbar></Navbar>
        <CurrencyConverter></CurrencyConverter>
        <AdditionalInfo></AdditionalInfo>
    </>
  )
}
