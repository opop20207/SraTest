import * as skinview from "skinview3d";
import { useEffect, useRef } from "react";
import { RandomHash } from "random-hash";
import { randomBytes } from "crypto";

function SkinView3d({ imgLink, width = 200, height = 200 }) {
    const skinViewer = useRef();
    const rotateAnimation = useRef();

    const generateHash = new RandomHash({
        length: 124,
        charset:
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_",
        rng: randomBytes,
    });
    const id = generateHash();

    const initializeViewer = () => {
        skinViewer.current = new skinview.FXAASkinViewer({
            canvas: document.getElementById(imgLink + id),
        });
        skinViewer.current.width = width;
        skinViewer.current.height = height;
        skinViewer.current.loadSkin(imgLink);

        skinViewer.current = null;
        rotateAnimation.current = null;
    };

    const onMouse = () => {
        skinViewer.current = new skinview.FXAASkinViewer({
            canvas: document.getElementById(imgLink + id),
        });

        skinViewer.current.width = width;
        skinViewer.current.height = height;
        skinViewer.current.loadSkin(imgLink);

        rotateAnimation.current = skinViewer.current.animations.add(
            skinview.RotatingAnimation
        );
    };

    const outMouse = () => {
        rotateAnimation.current.resetAndRemove();
        rotateAnimation.current = null;
        skinViewer.current = null;
    };

    useEffect(() => {
        if (!imgLink) return;

        let abortController = new AbortController();
        initializeViewer();

        return () => {
            abortController.abort();
        };
    }, [imgLink]);

    return (
        <div>
            <canvas
                id={imgLink + id}
                onMouseOver={onMouse}
                onMouseOut={outMouse}
            />
        </div>
    );
}

export default SkinView3d;
