System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, ChipConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "80b66jur3ROMoiJdSbu8bFU", "Config", undefined);

      _export("ChipConfig", ChipConfig = [{
        value: 10,
        color: 'green',
        isDefault: false,
        prefabPath: '/prefab/ChipGreen'
      }, {
        value: 20,
        color: 'maroon',
        isDefault: true,
        prefabPath: '/prefab/ChipMaroon'
      }, // Default coin
      {
        value: 30,
        color: 'choco',
        isDefault: false,
        prefabPath: '/prefab/ChipChoco'
      }, {
        value: 50,
        color: 'yellow',
        isDefault: false,
        prefabPath: '/prefab/ChipYellow'
      }, {
        value: 100,
        color: 'teal',
        isDefault: false,
        prefabPath: '/prefab/ChipTeal'
      }, {
        value: 200,
        color: 'violet',
        isDefault: false,
        prefabPath: '/prefab/ChipViolet'
      }]);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0996d46654be644a821bc242bff99213a8edc5dd.js.map