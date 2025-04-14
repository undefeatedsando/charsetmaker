
export const TRGT_HEIGHT = 192;
export const TRGT_WIDTH = 128;
export const SCALE = 1;//it works but with no canvas scale
export const DELAY = 50;
export const SPRITE_SHEET_TYPES = {
    XP: {
        name: 'xp',
        columns: 4,
        rows: 4,
        frameWidth: 32,
        frameHeight: 48,
        offsetX: 0
    },
    VX: {
        name: 'vx',
        columns: 3,
        rows: 4,
        frameWidth: 32,
        frameHeight: 48,
        offsetX: 32  // 32px offset to skip the first frame
    }
};