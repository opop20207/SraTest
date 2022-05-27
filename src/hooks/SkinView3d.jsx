import * as skinview from "skinview3d";
import {useEffect, useRef} from 'react';

function SkinView3d({ imgLink }) {
    const skinViewer = useRef();
    const rotateAnimation = useRef();

  const initializeViewer = () => {
    skinViewer.current = new skinview.FXAASkinViewer({
      canvas: document.getElementById(imgLink),
    });
    skinViewer.current.width=200;
    skinViewer.current.height=200;
    skinViewer.current.loadSkin(imgLink);

    rotateAnimation.current = null;

    console.log(skinViewer);
  }

  const onMouse = () => {
    console.log(skinViewer);
    if(!skinViewer) {
      console.log("onMouse : " + "return!");
      return;
    }
    rotateAnimation.current = skinViewer.current.animations.add(
        skinview.RotatingAnimation
    );
  }

  const outMouse = () => {
    if(!rotateAnimation) {
      console.log("outMouse : " + "return!");
      return;
    }
      rotateAnimation.current.resetAndRemove();
      rotateAnimation.current = null;
  }

  useEffect(() => {
    initializeViewer();
  }, [])

  return (
    <div>
      <canvas id={imgLink} onMouseOver={onMouse} onMouseOut={outMouse} />
    </div>
  );
}

export default SkinView3d;
