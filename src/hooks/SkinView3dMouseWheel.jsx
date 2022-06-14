import * as skinview from "skinview3d";
import {useEffect, useRef} from 'react';

function SkinView3dMouseWheel({ imgLink, width=200, height=200 }) {
    const skinViewer = useRef();
    const rotateAnimation = useRef();
    const orbitControl = useRef();

  const initializeViewer = () => {
    skinViewer.current = new skinview.FXAASkinViewer({
      canvas: document.getElementById(imgLink),
    });
    skinViewer.current.width=width;
    skinViewer.current.height=height;
    skinViewer.current.loadSkin(imgLink);

    rotateAnimation.current = null;

    orbitControl.current = skinview.createOrbitControls(skinViewer.current);
    orbitControl.current.enableRotate = true;
    orbitControl.current.enableZoom = true;
    orbitControl.current.enablePan = false;
  }

  useEffect(() => {
    if(!imgLink) return;
    initializeViewer();
  }, [imgLink])

  return (
    <div>
      <canvas id={imgLink} />
    </div>
  );
}

export default SkinView3dMouseWheel;