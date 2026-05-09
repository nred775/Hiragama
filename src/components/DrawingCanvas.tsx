import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export interface DrawingCanvasRef {
  clear: () => void;
  isEmpty: () => boolean;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, {}>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [empty, setEmpty] = useState(true);

  useImperativeHandle(ref, () => ({
    clear: () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setEmpty(true);
        }
      }
    },
    isEmpty: () => empty
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Setup canvas for high DPI displays
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#f8fafc'; // slate-50
        ctx.lineWidth = 14;
      }
    }
    
    // Prevent scrolling when touching the canvas
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    canvas?.addEventListener('touchstart', preventScroll, { passive: false });
    canvas?.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      canvas?.removeEventListener('touchstart', preventScroll);
      canvas?.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setEmpty(false);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-square bg-slate-900 touch-none cursor-crosshair rounded-[48px]"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
  );
});
