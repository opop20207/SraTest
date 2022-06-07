import * as skinview from "skinview3d";
import {useEffect, useRef} from 'react';

function SkinView3d({ imgLink, width=200, height=200 }) {
    const skinViewer = useRef();
    const rotateAnimation = useRef();
    const milliseconds = new Date().getMilliseconds();

  const initializeViewer = () => {
    skinViewer.current = new skinview.FXAASkinViewer({
      canvas: document.getElementById(imgLink + milliseconds),
    });
    skinViewer.current.width=width;
    skinViewer.current.height=height;
    skinViewer.current.loadSkin(imgLink);

    rotateAnimation.current = null;
  }

  const onMouse = () => {
    if(!skinViewer) {
      return;
    }
    rotateAnimation.current = skinViewer.current.animations.add(
        skinview.RotatingAnimation
    );
  }

  const outMouse = () => {
    if(!rotateAnimation) {
      return;
    }
      rotateAnimation.current.resetAndRemove();
      rotateAnimation.current = null;
  }

  useEffect(() => {
    if(!imgLink) return;
    initializeViewer();
  }, [imgLink])

  return (
    <div>
      <canvas id={imgLink + milliseconds} onMouseOver={onMouse} onMouseOut={outMouse} />
    </div>
  );
}

export default SkinView3d;
