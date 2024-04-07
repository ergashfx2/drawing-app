import React, {useRef, useEffect, useState} from 'react';
import {ref, uploadString, getDownloadURL} from "firebase/storage";
import {storage} from "../FireBase/FireBase";

const Canvas = ({color, id , lineWidth}) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawHistory, setDrawHistory] = useState([]);
    const [drawingId, setDrawingId] = useState(id);
    const [imageURL, setImageURL] = useState('');
    const inputRef = useRef(null);
    const [show,setShow] = useState('none')

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setDrawHistory([]);
    };

    const handleUndo = () => {
        setDrawHistory(prevDrawHistory => {
            if (prevDrawHistory.length > 1) {
                const newDrawHistory = [...prevDrawHistory];
                newDrawHistory.pop();
                redrawCanvas(newDrawHistory);
                return newDrawHistory;
            } else {
                return prevDrawHistory;
            }
        });
    };

    const redrawCanvas = (drawHistoryToRedraw) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.src = drawHistoryToRedraw[drawHistoryToRedraw.length - 1];
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const startDrawing = (e) => {
            setIsDrawing(true);
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.strokeStyle = color || 'black';
            ctx.lineWidth = lineWidth || 15;
            ctx.lineCap = 'round';
        };

        const draw = (e) => {
            if (!isDrawing) return;
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
        };

        const stopDrawing = () => {
            setIsDrawing(false);
            ctx.closePath();
            setDrawHistory(prevDrawHistory => [...prevDrawHistory, canvas.toDataURL()]);
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
        };
    }, [color, isDrawing,lineWidth]);

    const exportImage = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');
        const anchor = document.createElement('a');
        anchor.href = image;
        anchor.download = 'drawing.png';
        anchor.click();
    };

    const uploadImageToFirebase = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');

        const storageRef = ref(storage, 'images/' + drawingId + '.png');

        uploadString(storageRef, image, 'data_url').then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              setImageURL(downloadURL)
              setShow('block')
            });
        });
    };

    const copyToClipboard = () => {
        inputRef.current.select();
        document.execCommand('copy');
        alert('Copied to clipboard!');
        setShow('none')
    };


    return (
        <div>
            <div style={{display:show}} className={'position-fixed bg-light mt-4'}>
                <input className={'form-input'} ref={inputRef} value={imageURL} readOnly style={{width: '200px'}}/>
                <button onClick={copyToClipboard}>Copy</button>
            </div>
            <canvas ref={canvasRef} width={900} height={600}/>
            <button onClick={handleUndo} className="mb-2 btn btn-primary mx-1">Undo</button>
            <button onClick={handleClear} className="mb-2 btn btn-primary mx-1">Clear</button>
            <button onClick={exportImage} className="mb-2 btn btn-primary mx-1">Export image</button>
            <button onClick={uploadImageToFirebase} className=" mb-2 btn btn-primary mx-1">Share</button>
        </div>
    );
};

export default Canvas;
