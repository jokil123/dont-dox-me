import { Button } from "../../components/button/button"
import { useState } from "react";
import "./index.scss"

export const Index = () => {
    const [enabled, setEnabled] = useState(true);

    return(<div className="App">
    <h1>DON'T <span>DOX</span> ME</h1>
    <p>Status</p>
    <h2 style={{ color: enabled ? 'lime' : 'red' }}>{enabled ? 'Enabled' : 'Disabled'}</h2>
    <Button label="toggle" onClick={() => setEnabled(!enabled)}></Button>
  </div>)
}