    interface LevelInfo {
        level: number; 
        resolution: number;
        scale: number;
    }

export default class ScaleLevels {

    static Levels: LevelInfo[] = [
      {
        "level": 0,
        "resolution": 78271.516964,
        "scale": 295828763.795778
      },
      {
        "level": 1,
        "resolution": 39135.758482,
        "scale": 147914381.897889
      },
      {
        "level": 2,
        "resolution": 19567.8792410001,
        "scale": 73957190.9489445
      },
      {
        "level": 3,
        "resolution": 9783.93962049995,
        "scale": 36978595.474472
      },
      {
        "level": 4,
        "resolution": 4891.96981024998,
        "scale": 18489297.737236
      },
      {
        "level": 5,
        "resolution": 2445.98490512499,
        "scale": 9244648.868618
      },
      {
        "level": 6,
        "resolution": 1222.9924525625,
        "scale": 4622324.434309
      },
      {
        "level": 7,
        "resolution": 611.496226281245,
        "scale": 2311162.2171545
      },
      {
        "level": 8,
        "resolution": 305.74811314069,
        "scale": 1155581.1085775
      },
      {
        "level": 9,
        "resolution": 152.874056570279,
        "scale": 577790.5542885
      },
      {
        "level": 10,
        "resolution": 76.4370282852055,
        "scale": 288895.2771445
      },
      {
        "level": 11,
        "resolution": 38.2185141425366,
        "scale": 144447.638572
      },
      {
        "level": 12,
        "resolution": 19.1092570712683,
        "scale": 72223.819286
      },
      {
        "level": 13,
        "resolution": 9.55462853563415,
        "scale": 36111.909643
      },
      {
        "level": 14,
        "resolution": 4.77731426781708,
        "scale": 18055.9548215
      },
      {
        "level": 15,
        "resolution": 2.38865713397469,
        "scale": 9027.977411
      },
      {
        "level": 16,
        "resolution": 1.19432856698734,
        "scale": 4513.9887055
      },
      {
        "level": 17,
        "resolution": 0.597164283427525,
        "scale": 2256.9943525
      },
      {
        "level": 18,
        "resolution": 0.298582141779909,
        "scale": 1128.4971765
      },
      {
        "level": 19,
        "resolution": 0.149291070823809,
        "scale": 564.248588
      },
      {
        "level": 20,
        "resolution": 0.0746455354119042,
        "scale": 282.124294
      },
      {
        "level": 21,
        "resolution": 0.0373227677059521,
        "scale": 141.062147
      },
      {
        "level": 22,
        "resolution": 0.018661383852976,
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