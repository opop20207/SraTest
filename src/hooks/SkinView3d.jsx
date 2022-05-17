import * as skinview from "skinview3d";
import {useEffect} from 'react';
import reactImageSize from 'react-image-size';

function SkinView3d({ imgLink }) {
    let skinViewer;
    let rotateAnimation;

    const isAble2Dto3D = async() => {
      try {
        const {width, height} = await reactImageSize(imgLink);
        console.log(width + " and " + height);
        return width == 64 && height == 64;
      } catch {
        console.log("fail to load image");
        return false;
      }
    }

  const initializeViewer = async() => {
    const isAble = await isAble2Dto3D();
    if (!isAble) return;

    skinViewer = new skinview.FXAASkinViewer({
      canvas: document.getElementById(imgLink),
    });
    skinViewer.width=200;
    skinViewer.height=200;
    skinViewer.loadSkin(imgLink);

    rotateAnimation = null;
  }

  const onMouse = () => {
    if(!skinViewer) {
      console.log("onMouse : " + "return!");
      return;
    }
    rotateAnimation = skinViewer.animations.add(
        skinview.RotatingAnimation
    );
  }

  const outMouse = () => {
    if(!rotateAnimation) {
      console.log("outMouse : " + "return!");
      return;
    }
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
