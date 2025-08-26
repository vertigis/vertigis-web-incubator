    interface LevelInfo {
        level: number; 
        scale: number;
    }

export default class ScaleLevels {

    static Levels: LevelInfo[] = [
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

    static GetLevelForScale(scale: number): number | undefined {
        // TODO: Implement logic to find level for given scale
        for(const levelInfo of ScaleLevels.Levels) {
            if (levelInfo.scale <= scale) {
                return levelInfo.level;
            }
        }
        return undefined;
    }

    static GetScaleForLevel(level: number): number | undefined {
        const levelInfo = ScaleLevels.Levels.find(l => l.level === Math.round(level));
        return levelInfo?.scale;
    }

    
}