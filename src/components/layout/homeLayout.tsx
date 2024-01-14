import { FC } from "react"
import Header from "../header"
import { Box } from "@chakra-ui/react"

interface LayoutProps  {
    children: React.ReactNode
}

const HomeLayout : FC<LayoutProps> = ({ children }) => {
  return (
    <>
        <Header />
        <Box pt="65px"></Box>
        {children}
    </>
  )
}
export default HomeLayout