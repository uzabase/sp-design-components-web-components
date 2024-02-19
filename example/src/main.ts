import App from './App.svelte'
import "@sp-design/components-web-components"
import "@sp-design/token/lib/speeda-tokens.css"

const app = new App({
  target: document.getElementById('app')!,
})

export default app
