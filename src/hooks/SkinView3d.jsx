import * as skinview from "skinview3d";
import {useEffect} from 'react';

function SkinView3d({ imgLink }) {
    let skinViewer;
    let rotateAnimation;

  function initializeViewer() {
    skinViewer = new skinview.FXAASkinViewer({
      canvas: document.getElementById(imgLink),
    });
    skinViewer.width=200;
    skinViewer.height=200;
    skinViewer.loadSkin(imgLink);

    rotateAnimation = null;
  }

  const onMouse = () => {
    rotateAnimation = skinViewer.animations.add(
        skinview.RotatingAnimation
    );
  }

  const outMouse = () => {
      rotateAnimation.resetAndRemove();
      rotateAnimation = null;
  }

  useEffect(() => {
    initializeViewer();
  }, [imgLink])

  return (
    <div>
      <canvas id={imgLink} onMouseOver={onMouse} onMouseOut={outMouse} />
    </div>
  );
}

export default SkinView3d;
