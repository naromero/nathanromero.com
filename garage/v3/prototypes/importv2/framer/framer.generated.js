// This is autogenerated by Framer Studio


// Generated by CoffeeScript 1.8.0
(function() {
  var lookupLine, properties, _RESULT,
    __slice = [].slice;

  if (window.FramerStudio == null) {
    window.FramerStudio = {};
  }

  window.onerror = null;

  window.midiCommand = window.midiCommand || function() {};

  if (Framer.Device) {
    properties = ["deviceScale", "contentScale", "deviceType", "keyboard", "orientation", "fullScreen"];
    properties.map(function(propertyName) {
      return Framer.Device.on("change:" + propertyName, function() {
        return window._bridge("device:change");
      });
    });
  }

  _RESULT = null;

  lookupLine = function(lineNumber) {
    var char, charIndex, errorColNumber, errorLine, errorLineIndex, errorLineNumber, loc, sourceLines, _i, _len;
    sourceLines = _RESULT.js.split("\n");
    errorLineIndex = lineNumber - 1;
    errorLine = sourceLines[errorLineIndex];
    if (!errorLine) {
      return lineNumber;
    }
    errorLineNumber = 1;
    errorColNumber = 0;
    for (charIndex = _i = 0, _len = errorLine.length; _i < _len; charIndex = ++_i) {
      char = errorLine[charIndex];
      loc = _RESULT.sourceMap.sourceLocation([errorLineIndex, charIndex]);
      if (loc && loc[0] > errorLineNumber) {
        errorLineNumber = loc[0] + 1;
        errorColNumber = loc[1];
      }
    }
    console.log("lineNumber", lineNumber);
    console.log("errorLineNumber", errorLineNumber);
    return errorLineNumber;
  };

  FramerStudio.compile = function(code) {
    var e, err, errorMessage;
    console.log("FramerStudio.compile");
    window.onerror = null;
    window.onresize = null;
    try {
      _RESULT = CoffeeScript.compile(code, {
        sourceMap: true,
        filename: "generated.js"
      });
    } catch (_error) {
      e = _error;
      console.log("Compile error:", e);
      if (e instanceof SyntaxError) {
        errorMessage = e.stack;
        err = new SyntaxError(e.message);
        err.line = e.location.first_line;
        err.lineNumber = e.location.first_line;
        err.lookup = true;
        window._bridge("StudioError", {
          message: e.message,
          line: e.location.first_line,
          lineNumber: e.location.first_line,
          errorType: "compile"
        });
        throw err;
      } else {
        throw e;
      }
    }
    window.onerror = function(errorMsg, url, lineNumber) {
      var error;
      console.log.apply(console, ["Eval error:"].concat(__slice.call(arguments)));
      error = new Error(errorMsg);
      error.line = lookupLine(lineNumber);
      window._bridge("StudioError", {
        message: errorMsg,
        line: error.line,
        lineNumber: error.line,
        errorType: "eval"
      });
      throw error;
    };
    return _RESULT.js;
  };

  if (typeof window._bridge === "function") {
    window._bridge("StudioScriptLoaded");
  }

}).call(this);

// Layer info for /Users/nathan.romero/Dropbox (AppDirect)/Product Design/UI Framework/141029 DESPRD-592 Import Type Selection/importv2.framer/imported/import prototype/layers.json.js
window.__imported__ = window.__imported__ || {};
window.__imported__["import prototype/layers.json.js"] = [
  {
    "maskFrame" : null,
    "id" : "C4415B41-186C-4FCA-A5C2-58209E0EC6BE",
    "visible" : true,
    "children" : [
      {
        "maskFrame" : null,
        "id" : "1323F065-F3CB-43F7-92A3-1338ED6C8948",
        "visible" : true,
        "children" : [
          {
            "maskFrame" : null,
            "id" : "C2A7114A-5DCA-45B3-91F9-6D8A1301F075",
            "visible" : true,
            "children" : [

            ],
            "image" : {
              "path" : "images\/pwSelected-C2A7114A-5DCA-45B3-91F9-6D8A1301F075.png",
              "frame" : {
                "y" : 409,
                "x" : 503,
                "width" : 398,
                "height" : 120
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 409,
              "x" : 503,
              "width" : 398,
              "height" : 120
            },
            "name" : "pwSelected"
          },
          {
            "maskFrame" : {
              "y" : 543,
              "x" : 76,
              "width" : 840,
              "height" : 292
            },
            "id" : "9E96FDF1-E600-421B-AE06-43D7FFAC1D8E",
            "visible" : true,
            "children" : [

            ],
            "image" : {
              "path" : "images\/pwOptions-9E96FDF1-E600-421B-AE06-43D7FFAC1D8E.png",
              "frame" : {
                "y" : 543,
                "x" : 76,
                "width" : 840,
                "height" : 292
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 543,
              "x" : 76,
              "width" : 840,
              "height" : 292
            },
            "name" : "pwOptions"
          }
        ],
        "image" : {
          "path" : "images\/passwordManager-1323F065-F3CB-43F7-92A3-1338ED6C8948.png",
          "frame" : {
            "y" : 409,
            "x" : 76,
            "width" : 848,
            "height" : 502
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 409,
          "x" : 76,
          "width" : 848,
          "height" : 502
        },
        "name" : "passwordManager"
      },
      {
        "maskFrame" : null,
        "id" : "3186D984-326E-4695-999B-19CFBEE5D236",
        "visible" : true,
        "children" : [
          {
            "maskFrame" : null,
            "id" : "08DED1F3-5F2C-47A5-8180-6B936DEFC01D",
            "visible" : true,
            "children" : [
              {
                "maskFrame" : {
                  "y" : 488,
                  "x" : 106,
                  "width" : 91,
                  "height" : 20
                },
                "id" : "01E6E0AF-8CBC-4BCB-8CA7-9B0F43266880",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/Bitmap__Rectangle_17-01E6E0AF-8CBC-4BCB-8CA7-9B0F43266880.png",
                  "frame" : {
                    "y" : 488,
                    "x" : 106,
                    "width" : 91,
                    "height" : 20
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 488,
                  "x" : 106,
                  "width" : 91,
                  "height" : 20
                },
                "name" : "Bitmap__Rectangle_17"
              }
            ],
            "image" : {
              "path" : "images\/samlSelected-08DED1F3-5F2C-47A5-8180-6B936DEFC01D.png",
              "frame" : {
                "y" : 409,
                "x" : 91,
                "width" : 398,
                "height" : 120
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 409,
              "x" : 91,
              "width" : 398,
              "height" : 120
            },
            "name" : "samlSelected"
          },
          {
            "maskFrame" : {
              "y" : 543,
              "x" : 76,
              "width" : 840,
              "height" : 593
            },
            "id" : "DD19754F-62B6-4329-9109-6F0754C9150B",
            "visible" : true,
            "children" : [

            ],
            "image" : {
              "path" : "images\/samlOptions-DD19754F-62B6-4329-9109-6F0754C9150B.png",
              "frame" : {
                "y" : 543,
                "x" : 76,
                "width" : 840,
                "height" : 593
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 543,
              "x" : 76,
              "width" : 840,
              "height" : 593
            },
            "name" : "samlOptions"
          }
        ],
        "image" : {
          "path" : "images\/saml-3186D984-326E-4695-999B-19CFBEE5D236.png",
          "frame" : {
            "y" : 409,
            "x" : 76,
            "width" : 848,
            "height" : 803
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 409,
          "x" : 76,
          "width" : 848,
          "height" : 803
        },
        "name" : "saml"
      },
      {
        "maskFrame" : null,
        "id" : "7D14A2A5-53B7-4690-844A-F32995789D69",
        "visible" : true,
        "children" : [
          {
            "maskFrame" : {
              "y" : 433,
              "x" : 524,
              "width" : 14,
              "height" : 14
            },
            "id" : "5C21FA8C-D99E-4E22-A440-F284D1D4733D",
            "visible" : true,
            "children" : [

            ],
            "image" : {
              "path" : "images\/Bitmap_3__Oval_2-5C21FA8C-D99E-4E22-A440-F284D1D4733D.png",
              "frame" : {
                "y" : 433,
                "x" : 524,
                "width" : 14,
                "height" : 14
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 433,
              "x" : 524,
              "width" : 14,
              "height" : 14
            },
            "name" : "Bitmap_3__Oval_2"
          }
        ],
        "image" : {
          "path" : "images\/pwDeselected-7D14A2A5-53B7-4690-844A-F32995789D69.png",
          "frame" : {
            "y" : 409,
            "x" : 503,
            "width" : 398,
            "height" : 120
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 409,
          "x" : 503,
          "width" : 398,
          "height" : 120
        },
        "name" : "pwDeselected"
      },
      {
        "maskFrame" : null,
        "id" : "59E0F4E4-C37E-422C-81C6-875BE38AD532",
        "visible" : true,
        "children" : [
          {
            "maskFrame" : {
              "y" : 488,
              "x" : 106,
              "width" : 91,
              "height" : 20
            },
            "id" : "581C7279-5F10-4DCE-A519-CC8E9C377604",
            "visible" : true,
            "children" : [

            ],
            "image" : {
              "path" : "images\/Bitmap__Rectangle_18-581C7279-5F10-4DCE-A519-CC8E9C377604.png",
              "frame" : {
                "y" : 488,
                "x" : 106,
                "width" : 91,
                "height" : 20
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 488,
              "x" : 106,
              "width" : 91,
              "height" : 20
            },
            "name" : "Bitmap__Rectangle_18"
          },
          {
            "maskFrame" : {
              "y" : 432,
              "x" : 108,
              "width" : 14,
              "height" : 14
            },
            "id" : "9D81EC46-8716-4713-9FFE-38C9D236A733",
            "visible" : true,
            "children" : [

            ],
            "image" : {
              "path" : "images\/Bitmap_3__Oval_1-9D81EC46-8716-4713-9FFE-38C9D236A733.png",
              "frame" : {
                "y" : 432,
                "x" : 108,
                "width" : 14,
                "height" : 14
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 432,
              "x" : 108,
              "width" : 14,
              "height" : 14
            },
            "name" : "Bitmap_3__Oval_1"
          }
        ],
        "image" : {
          "path" : "images\/samlDeselected-59E0F4E4-C37E-422C-81C6-875BE38AD532.png",
          "frame" : {
            "y" : 409,
            "x" : 91,
            "width" : 398,
            "height" : 120
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 409,
          "x" : 91,
          "width" : 398,
          "height" : 120
        },
        "name" : "samlDeselected"
      },
      {
        "maskFrame" : null,
        "id" : "F1284AAA-5648-498E-AE2D-EAB4B1CBCC05",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/authConainer-F1284AAA-5648-498E-AE2D-EAB4B1CBCC05.png",
          "frame" : {
            "y" : 358,
            "x" : 73,
            "width" : 847,
            "height" : 324
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 358,
          "x" : 73,
          "width" : 847,
          "height" : 324
        },
        "name" : "authConainer"
      },
      {
        "maskFrame" : null,
        "id" : "8CBE9AA6-6E1A-41C2-91F1-DEAE7C33AB98",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/bg-8CBE9AA6-6E1A-41C2-91F1-DEAE7C33AB98.png",
          "frame" : {
            "y" : 0,
            "x" : 0,
            "width" : 1273,
            "height" : 1373
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 0,
          "x" : 0,
          "width" : 1273,
          "height" : 1373
        },
        "name" : "bg"
      }
    ],
    "image" : {
      "path" : "images\/proto-C4415B41-186C-4FCA-A5C2-58209E0EC6BE.png",
      "frame" : {
        "y" : 0,
        "x" : 0,
        "width" : 1274,
        "height" : 1391
      }
    },
    "imageType" : "png",
    "layerFrame" : {
      "y" : 0,
      "x" : 0,
      "width" : 1274,
      "height" : 1391
    },
    "name" : "proto"
  }
]
window.Framer.Defaults.DeviceView = {
  "deviceScale" : -1,
  "orientation" : 0,
  "contentScale" : 1,
  "deviceType" : "fullscreen"
};

window.FramerStudioInfo = {
  "deviceImagesUrl" : "file:\/\/\/Applications\/Framer%20Studio.app\/Contents\/Resources\/DeviceImages\/"
};

Framer.Device = new Framer.DeviceView();
Framer.Device.setupContext();