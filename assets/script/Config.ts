export interface Chip {
  value: number;
  color: string;
  isDefault: boolean;
  prefabPath: string;
}

export const ChipConfig: Chip[] = [
  {
    value: 10,
    color: 'green',
    isDefault: false,
    prefabPath: '/prefab/ChipGreen',
  },
  {
    value: 20,
    color: 'maroon',
    isDefault: true,
    prefabPath: '/prefab/ChipMaroon',
  }, // Default coin
  {
    value: 30,
    color: 'choco',
    isDefault: false,
    prefabPath: '/prefab/ChipChoco',
  },
  {
    value: 50,
    color: 'yellow',
    isDefault: false,
    prefabPath: '/prefab/ChipYellow',
  },
  {
    value: 100,
    color: 'teal',
    isDefault: false,
    prefabPath: '/prefab/ChipTeal',
  },
  {
    value: 200,
    color: 'violet',
    isDefault: false,
    prefabPath: '/prefab/ChipViolet',
  },
];
