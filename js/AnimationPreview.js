export default class AnimationPreview {
    // this function draws sprite from canvasSrc to canvasTarget
    constructor(canvasSrc, canvasTarget) {
        this.source = canvasSrc;
        this.target = canvasTarget;
        this.ctx = canvasTarget.getContext('2d');
        this.sourceCtx = canvasSrc.getContext('2d');
        this.frame = 0;
        this.frameOrder = [1,2,3,2];

        // Match dimensions
        this.target.width = this.source.width / 4;
        this.target.height = this.source.height;

        // Start animation loop
        setInterval(() => {
            // Clear target canvas
            this.ctx.clearRect(0, 0, this.target.width, this.target.height);

            // Get current source image data
            const sourceData = this.sourceCtx.getImageData(0, 0, this.source.width, this.source.height);
            const offset = 32;
            const exactOffset = this.source.width === offset * 4 ? this.frameOrder[this.frame] : this.frameOrder[this.frame]-1;
            // Draw left or right half
            this.ctx.putImageData(
                sourceData,
                -offset * exactOffset, 0,
                offset * exactOffset, 0,
                offset,
                this.source.height
            );

            if (this.frame === 3) {
                this.frame = 0;
            } else {
                this.frame++;
            }

        }, 300); // Update every second

    }
}