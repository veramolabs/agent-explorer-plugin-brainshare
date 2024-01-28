import { useViewport } from "reactflow"

export const DebugFlow: React.FC = () => {    
  const { x, y, zoom } = useViewport()
  console.log(`Viewport is currently at (${x}, ${y}) zoom: ${zoom}`)
  return (<></>)
}