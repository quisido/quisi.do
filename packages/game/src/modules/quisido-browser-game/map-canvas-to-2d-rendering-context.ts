const CANVAS_RENDERING_CONTEXT_2D_SETTINGS: CanvasRenderingContext2DSettings = {
  alpha: true,
  colorSpace: 'display-p3',
  // TODO: Research if this should be true or false. Which has better performance when we render 60fps?
  desynchronized: true,
  willReadFrequently: false,
};

export default function mapCanvasTo2DRenderingContext(
  canvas: HTMLCanvasElement,
): CanvasRenderingContext2D {
  const renderingContext: CanvasRenderingContext2D | null = canvas.getContext(
    '2d',
    CANVAS_RENDERING_CONTEXT_2D_SETTINGS,
  );

  if (renderingContext === null) {
    throw new Error('Canvas does not have a 2D rendering context.', {
      cause: canvas,
    });
  }

  return renderingContext;
}
