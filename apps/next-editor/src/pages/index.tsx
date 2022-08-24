import type { NextPage } from "next"
import DesignEditor from "../components/DesignEditor"

const Home: NextPage = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <DesignEditor />
    </div>
  )
}

export default Home
