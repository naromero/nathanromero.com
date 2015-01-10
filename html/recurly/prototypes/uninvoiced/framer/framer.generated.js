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

window.__imported__ = window.__imported__ || {};
window.__imported__["vat-animation/layers.json.js"] = [
  {
    "maskFrame" : null,
    "id" : "2A4343F8-E23C-46E7-881E-209DAE84AEDD",
    "visible" : true,
    "children" : [
      {
        "maskFrame" : null,
        "id" : "4F806F60-586A-4B05-A733-BD3B16EFFB69",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/tooltip3-4F806F60-586A-4B05-A733-BD3B16EFFB69.png",
          "frame" : {
            "y" : 151,
            "x" : 318,
            "width" : 58,
            "height" : 40
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 151,
          "x" : 318,
          "width" : 58,
          "height" : 40
        },
        "name" : "tooltip3"
      },
      {
        "maskFrame" : null,
        "id" : "693EDA83-0458-46C1-994E-762A1EBFAB9C",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/tooltip2-693EDA83-0458-46C1-994E-762A1EBFAB9C.png",
          "frame" : {
            "y" : 261,
            "x" : 221,
            "width" : 58,
            "height" : 40
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 261,
          "x" : 221,
          "width" : 58,
          "height" : 40
        },
        "name" : "tooltip2"
      },
      {
        "maskFrame" : null,
        "id" : "2B93DC0C-DCA4-44D8-A5F1-D17FDA7A119A",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/tooltip-2B93DC0C-DCA4-44D8-A5F1-D17FDA7A119A.png",
          "frame" : {
            "y" : 90,
            "x" : 167,
            "width" : 58,
            "height" : 40
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 90,
          "x" : 167,
          "width" : 58,
          "height" : 40
        },
        "name" : "tooltip"
      },
      {
        "maskFrame" : null,
        "id" : "635BF70C-BC14-4AD8-882C-EA9E9170A753",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/country3-635BF70C-BC14-4AD8-882C-EA9E9170A753.png",
          "frame" : {
            "y" : 162,
            "x" : 309,
            "width" : 76,
            "height" : 76
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 162,
          "x" : 309,
          "width" : 76,
          "height" : 76
        },
        "name" : "country3"
      },
      {
        "maskFrame" : null,
        "id" : "E19F9C48-CE85-4EA7-BC87-C37FFB11A452",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/country2-E19F9C48-CE85-4EA7-BC87-C37FFB11A452.png",
          "frame" : {
            "y" : 272,
            "x" : 212,
            "width" : 76,
            "height" : 76
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 272,
          "x" : 212,
          "width" : 76,
          "height" : 76
        },
        "name" : "country2"
      },
      {
        "maskFrame" : null,
        "id" : "44B96ED4-E7C5-47FC-9EAD-C9418E5AC38A",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/country-44B96ED4-E7C5-47FC-9EAD-C9418E5AC38A.png",
          "frame" : {
            "y" : 101,
            "x" : 158,
            "width" : 76,
            "height" : 76
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 101,
          "x" : 158,
          "width" : 76,
          "height" : 76
        },
        "name" : "country"
      }
    ],
    "image" : {
      "path" : "images\/canvas-2A4343F8-E23C-46E7-881E-209DAE84AEDD.png",
      "frame" : {
        "y" : 0,
        "x" : 0,
        "width" : 617,
        "height" : 476
      }
    },
    "imageType" : "png",
    "layerFrame" : {
      "y" : 0,
      "x" : 0,
      "width" : 617,
      "height" : 476
    },
    "name" : "canvas"
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