interface LevelInfo {
    level: number; 
    scale: number;
}

export enum TileType {
    Raster = "Raster",
    Vector = "Vector"
}

export default class ScaleLevels {

    static VectorTileLevels: LevelInfo[] = [
        { "level": 0, "scale": 591657527.591555 },
        { "level": 1, "scale": 295828763.795777 },
        { "level": 2, "scale": 147914381.897889 },
        { "level": 3, "scale": 73957190.948944 },
        { "level": 4, "scale": 36978595.474472 },
        { "level": 5, "scale": 18489297.737236 },
        { "level": 6, "scale": 9244648.868618 },
        { "level": 7, "scale": 4622324.434309 },
        { "level": 8, "scale": 2311162.217155 },
        { "level": 9, "scale": 1155581.108577 },
        { "level": 10, "scale": 577790.554289 },
        { "level": 11, "scale": 288895.277144 },
        { "level": 12, "scale": 144447.638572 },
        { "level": 13, "scale": 72223.819286 },
        { "level": 14, "scale": 36111.909643 },
        { "level": 15, "scale": 18055.954822 },
        { "level": 16, "scale": 9027.977411 },
        { "level": 17, "scale": 4513.988705 },
        { "level": 18, "scale": 2256.994353 },
        { "level": 19, "scale": 1128.497176 },
        { "level": 20, "scale": 564.248588 },
        { "level": 21, "scale": 282.124294 },
        { "level": 22, "scale": 141.062147 }
        ];

    static RasterTileLevels: LevelInfo[] = [
      {
        "level": 0,
        "scale": 295828763.795778
      },
      {
        "level": 1,
        "scale": 147914381.897889
      },
      {
        "level": 2,
        "scale": 73957190.9489445
      },
      {
        "level": 3,
        "scale": 36978595.474472
      },
      {
        "level": 4,
        "scale": 18489297.737236
      },
      {
        "level": 5,
        "scale": 9244648.868618
      },
      {
        "level": 6,
        "scale": 4622324.434309
      },
      {
        "level": 7,
        "scale": 2311162.2171545
      },
      {
        "level": 8,
        "scale": 1155581.1085775
      },
      {
        "level": 9,
        "scale": 577790.5542885
      },
      {
        "level": 10,
        "scale": 288895.2771445
      },
      {
        "level": 11,
        "scale": 144447.638572
      },
      {
        "level": 12,
        "scale": 72223.819286
      },
      {
        "level": 13,
        "scale": 36111.909643
      },
      {
        "level": 14,
        "scale": 18055.9548215
      },
      {
        "level": 15,
        "scale": 9027.977411
      },
      {
        "level": 16,
        "scale": 4513.9887055
      },
      {
        "level": 17,
        "scale": 2256.9943525
      },
      {
        "level": 18,
        "scale": 1128.4971765
      },
      {
        "level": 19,
        "scale": 564.248588
      },
      {
        "level": 20,
        "scale": 282.124294
      },
      {
        "level": 21,
        "scale": 141.062147
      },
      {
        "level": 22,
        "scale": 70.5310735
      }
    ]

    /**
     * Compares two arrays of LevelInfo objects for equality.
     * @param scaleLevels The first array of LevelInfo objects.
     * @param other The second array of LevelInfo objects. Defaults to ScaleLevels.Levels.
     * @returns True if the arrays are equal, false otherwise.
     */
    static equals(scaleLevels: LevelInfo[], other: LevelInfo[] = ScaleLevels.RasterTileLevels): boolean {
        if (scaleLevels.length !== other.length) {
            return false;
        }
        for (let i = 0; i < scaleLevels.length; i++) {
            if (scaleLevels[i].level !== other[i].level || scaleLevels[i].scale !== other[i].scale) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns the tiling scheme zoom level associated with the provided scale. 
     * Note: whole number levels only.
     */
    static GetLevelForScale(scale: number, tileType: TileType = TileType.Raster): number | undefined {
        
        const levels = tileType === TileType.Raster ? ScaleLevels.RasterTileLevels : ScaleLevels.VectorTileLevels;

        let closest = levels[0];

        for (const level of levels) {
            if (Math.abs(level.scale - scale) < Math.abs(closest.scale - scale)) {
                closest = level;
            }
        }
        return closest.level;
    }

    /**
     * Returns the scale associated with the provided ESRI/Google web mapping tiling scheme zoom level.
     * Note: the level will be rounded to the nearest whole number.
     */
    static GetScaleForLevel(level: number, tileType: TileType = TileType.Raster): number | undefined {
        const levelInfo = (tileType === TileType.Raster ? ScaleLevels.RasterTileLevels : ScaleLevels.VectorTileLevels).find(l => l.level === Math.round(level));
        return levelInfo?.scale;
    }

    
}