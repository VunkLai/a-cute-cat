import { Image } from "antd";
import Cat from "./images/playing-cat-loop.gif";

function App() {
  return (
    <div>
      <Image src={Cat} preview={false} style={{ width: 150, height: 150 }} />
    </div>
  );
}

export default App;
