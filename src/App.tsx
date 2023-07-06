import { useState, useEffect } from 'react'
import MapComponent2 from './components/MapComponent2'
import Popover from './components/Popover'
import stateMap from './constants/indianStates.json';
import './App.css'
import './styles/index.css'

export interface IFillMap {
  [key: string]: { fill: string };
}
function App() {
  const [xpos, setxpos] = useState(0);
  const [ypos, setypos] = useState(0);
  const [popoverText, setPopoverText] = useState('');
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const states: { [key: string]: string } = stateMap;
  const createFillMap = (): IFillMap => {
    const map: IFillMap = {};
    Object.keys(states).forEach((key) => {
      map[key] = { fill: 'white' };
    });
    return map;
  }
  const localStorageFillMap = localStorage.getItem('fillMap');
  const [fillMap, setFillMap] = useState<IFillMap>(localStorageFillMap ? JSON.parse(localStorageFillMap) : createFillMap);

  useEffect(() => {
    localStorage.setItem('fillMap', JSON.stringify(fillMap));
  }, [fillMap]);
  return (
    <>
      <div className='svg-container'>
        <MapComponent2
          onClick={(e) => {
            const map = {...fillMap};
            const prevFill = fillMap[e.target.classList[0] as string].fill;
            const nextFill = prevFill === '#f35959' ? 'white' : '#f35959';
            map[e.target.classList[0] as string].fill = nextFill;
            setFillMap({...map});
            setPopoverVisible(false);
          }}
          onMouseEnter={(e) => {
            setxpos(e.nativeEvent.pageX - 60);
            setypos(e.nativeEvent.pageY - 60);
            setPopoverText(states[e.target.classList[0] as string]);
            setPopoverVisible(true);
          }}
          onMouseLeave={(e) => {
            setPopoverVisible(false);
          }}
          fillMap={fillMap}
        />
      </div>
      {isPopoverVisible && <Popover toolTipText={popoverText} style={{ top: ypos, left: xpos }} />}
    </>
  )
}

export default App
