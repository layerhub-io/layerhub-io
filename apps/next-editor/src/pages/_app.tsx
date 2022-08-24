import "../../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider } from "baseui"
import { styletron } from "../styletron"
import { Provider as ScenifyProvider } from "@layerhub-io/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <ScenifyProvider>
          <Component {...pageProps} />
        </ScenifyProvider>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default MyApp
