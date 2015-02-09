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
window.__imported__["New Coupon/layers.json.js"] = [
  {
    "maskFrame" : null,
    "id" : "B217884F-65B2-4981-A48F-700F2138092D",
    "visible" : true,
    "children" : [
      {
        "maskFrame" : null,
        "id" : "4D7F4863-49AB-4AF8-9531-F784C333308D",
        "visible" : true,
        "children" : [

        ],
        "image" : {
          "path" : "images\/subheader-4D7F4863-49AB-4AF8-9531-F784C333308D.png",
          "frame" : {
            "y" : 176,
            "x" : 182,
            "width" : 1396,
            "height" : 90
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 176,
          "x" : 182,
          "width" : 1396,
          "height" : 90
        },
        "name" : "subheader"
      },
      {
        "maskFrame" : null,
        "id" : "3E96B194-DDDC-4D6F-80FC-6446A5851B16",
        "visible" : true,
        "children" : [
          {
            "maskFrame" : null,
            "id" : "3A154549-E4CC-4B0F-8932-24FA62CAA27A",
            "visible" : true,
            "children" : [
              {
                "maskFrame" : null,
                "id" : "AEBBD81D-18CE-4B2C-964C-1583C1C803AE",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row6active-AEBBD81D-18CE-4B2C-964C-1583C1C803AE.png",
                  "frame" : {
                    "y" : 684,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 684,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row6active"
              },
              {
                "maskFrame" : null,
                "id" : "66E3BD41-B440-445C-A446-7F81FA427A1F",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row6hover-66E3BD41-B440-445C-A446-7F81FA427A1F.png",
                  "frame" : {
                    "y" : 684,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 684,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row6hover"
              },
              {
                "maskFrame" : null,
                "id" : "6ABBF976-9525-4464-BA61-F3EE3702191B",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row6default-6ABBF976-9525-4464-BA61-F3EE3702191B.png",
                  "frame" : {
                    "y" : 684,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 684,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row6default"
              }
            ],
            "image" : {
              "path" : "images\/row6-3A154549-E4CC-4B0F-8932-24FA62CAA27A.png",
              "frame" : {
                "y" : 684,
                "x" : 182,
                "width" : 1397,
                "height" : 86
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 684,
              "x" : 182,
              "width" : 1397,
              "height" : 86
            },
            "name" : "row6"
          },
          {
            "maskFrame" : null,
            "id" : "EC4CE07A-894F-43DA-999B-B0A19F4D9415",
            "visible" : true,
            "children" : [
              {
                "maskFrame" : null,
                "id" : "799741FE-FFD4-4C58-B196-E94D06A81753",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row5active-799741FE-FFD4-4C58-B196-E94D06A81753.png",
                  "frame" : {
                    "y" : 600,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 600,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row5active"
              },
              {
                "maskFrame" : null,
                "id" : "0EF8FA6D-36DE-4CCF-8319-2F19FE137369",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row5hover-0EF8FA6D-36DE-4CCF-8319-2F19FE137369.png",
                  "frame" : {
                    "y" : 600,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 600,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row5hover"
              },
              {
                "maskFrame" : null,
                "id" : "649E0224-13B1-4419-99FB-D48AB419B2B4",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row5default-649E0224-13B1-4419-99FB-D48AB419B2B4.png",
                  "frame" : {
                    "y" : 600,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 600,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row5default"
              }
            ],
            "image" : {
              "path" : "images\/row5-EC4CE07A-894F-43DA-999B-B0A19F4D9415.png",
              "frame" : {
                "y" : 600,
                "x" : 182,
                "width" : 1397,
                "height" : 86
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 600,
              "x" : 182,
              "width" : 1397,
              "height" : 86
            },
            "name" : "row5"
          },
          {
            "maskFrame" : null,
            "id" : "B2D30CF4-0078-48A4-8E91-6976CFB9769D",
            "visible" : true,
            "children" : [
              {
                "maskFrame" : null,
                "id" : "EAC4DD8C-16DA-45A4-8FA3-93A01DAF1297",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row4active-EAC4DD8C-16DA-45A4-8FA3-93A01DAF1297.png",
                  "frame" : {
                    "y" : 516,
                    "x" : 182,
                    "width" : 1396,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 516,
                  "x" : 182,
                  "width" : 1396,
                  "height" : 86
                },
                "name" : "row4active"
              },
              {
                "maskFrame" : null,
                "id" : "E26BD0B9-D5E8-4811-9E83-B500F024BD98",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row4hover-E26BD0B9-D5E8-4811-9E83-B500F024BD98.png",
                  "frame" : {
                    "y" : 516,
                    "x" : 182,
                    "width" : 1396,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 516,
                  "x" : 182,
                  "width" : 1396,
                  "height" : 86
                },
                "name" : "row4hover"
              },
              {
                "maskFrame" : null,
                "id" : "0DAE9F7E-0D54-457B-82DA-DCC5939B0F6D",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row4default-0DAE9F7E-0D54-457B-82DA-DCC5939B0F6D.png",
                  "frame" : {
                    "y" : 516,
                    "x" : 182,
                    "width" : 1396,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 516,
                  "x" : 182,
                  "width" : 1396,
                  "height" : 86
                },
                "name" : "row4default"
              }
            ],
            "image" : {
              "path" : "images\/row4-B2D30CF4-0078-48A4-8E91-6976CFB9769D.png",
              "frame" : {
                "y" : 516,
                "x" : 182,
                "width" : 1396,
                "height" : 86
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 516,
              "x" : 182,
              "width" : 1396,
              "height" : 86
            },
            "name" : "row4"
          },
          {
            "maskFrame" : null,
            "id" : "BBA440AA-4142-4292-9586-3A7F2EC56B8B",
            "visible" : true,
            "children" : [
              {
                "maskFrame" : null,
                "id" : "9B70AA1B-8EA0-42CC-95EA-5C89EFFB9723",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row3active-9B70AA1B-8EA0-42CC-95EA-5C89EFFB9723.png",
                  "frame" : {
                    "y" : 432,
                    "x" : 182,
                    "width" : 1396,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 432,
                  "x" : 182,
                  "width" : 1396,
                  "height" : 86
                },
                "name" : "row3active"
              },
              {
                "maskFrame" : null,
                "id" : "5830C20E-0233-46B4-BB23-D6F63366B7C8",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row3hover-5830C20E-0233-46B4-BB23-D6F63366B7C8.png",
                  "frame" : {
                    "y" : 432,
                    "x" : 182,
                    "width" : 1396,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 432,
                  "x" : 182,
                  "width" : 1396,
                  "height" : 86
                },
                "name" : "row3hover"
              },
              {
                "maskFrame" : null,
                "id" : "5AEF3A60-E282-4FAC-A4E2-3B4129A84762",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row3default-5AEF3A60-E282-4FAC-A4E2-3B4129A84762.png",
                  "frame" : {
                    "y" : 432,
                    "x" : 182,
                    "width" : 1396,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 432,
                  "x" : 182,
                  "width" : 1396,
                  "height" : 86
                },
                "name" : "row3default"
              }
            ],
            "image" : {
              "path" : "images\/row3-BBA440AA-4142-4292-9586-3A7F2EC56B8B.png",
              "frame" : {
                "y" : 432,
                "x" : 182,
                "width" : 1396,
                "height" : 86
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 432,
              "x" : 182,
              "width" : 1396,
              "height" : 86
            },
            "name" : "row3"
          },
          {
            "maskFrame" : null,
            "id" : "8076CDAE-4D8F-425F-94E1-F04C2D3EB136",
            "visible" : true,
            "children" : [
              {
                "maskFrame" : null,
                "id" : "AA883E7E-4B77-4F88-9112-8DBE76666D60",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row2active-AA883E7E-4B77-4F88-9112-8DBE76666D60.png",
                  "frame" : {
                    "y" : 348,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 348,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row2active"
              },
              {
                "maskFrame" : null,
                "id" : "585DEEF9-D1E9-4DD8-8718-1F59DBA05B96",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row2hover-585DEEF9-D1E9-4DD8-8718-1F59DBA05B96.png",
                  "frame" : {
                    "y" : 348,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 348,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row2hover"
              },
              {
                "maskFrame" : null,
                "id" : "0E58359E-4C64-43A8-82B5-350F5C3FAB2F",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row2default-0E58359E-4C64-43A8-82B5-350F5C3FAB2F.png",
                  "frame" : {
                    "y" : 348,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 348,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row2default"
              }
            ],
            "image" : {
              "path" : "images\/row2-8076CDAE-4D8F-425F-94E1-F04C2D3EB136.png",
              "frame" : {
                "y" : 348,
                "x" : 182,
                "width" : 1397,
                "height" : 86
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 348,
              "x" : 182,
              "width" : 1397,
              "height" : 86
            },
            "name" : "row2"
          },
          {
            "maskFrame" : null,
            "id" : "7B47021E-F923-4A3F-AC92-58669FFC8B45",
            "visible" : true,
            "children" : [
              {
                "maskFrame" : null,
                "id" : "2E5BA5BB-DC5E-48B8-9005-9B6DC2668D0A",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row1active-2E5BA5BB-DC5E-48B8-9005-9B6DC2668D0A.png",
                  "frame" : {
                    "y" : 264,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 264,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row1active"
              },
              {
                "maskFrame" : null,
                "id" : "C986BCDD-5C4B-4510-B20E-FA5DE236C2AC",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row1hover-C986BCDD-5C4B-4510-B20E-FA5DE236C2AC.png",
                  "frame" : {
                    "y" : 264,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 264,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row1hover"
              },
              {
                "maskFrame" : null,
                "id" : "DE68C00D-1692-4786-8F56-A25B2F62E06C",
                "visible" : true,
                "children" : [

                ],
                "image" : {
                  "path" : "images\/row1default-DE68C00D-1692-4786-8F56-A25B2F62E06C.png",
                  "frame" : {
                    "y" : 264,
                    "x" : 182,
                    "width" : 1397,
                    "height" : 86
                  }
                },
                "imageType" : "png",
                "layerFrame" : {
                  "y" : 264,
                  "x" : 182,
                  "width" : 1397,
                  "height" : 86
                },
                "name" : "row1default"
              }
            ],
            "image" : {
              "path" : "images\/row1-7B47021E-F923-4A3F-AC92-58669FFC8B45.png",
              "frame" : {
                "y" : 264,
                "x" : 182,
                "width" : 1397,
                "height" : 86
              }
            },
            "imageType" : "png",
            "layerFrame" : {
              "y" : 264,
              "x" : 182,
              "width" : 1397,
              "height" : 86
            },
            "name" : "row1"
          }
        ],
        "image" : {
          "path" : "images\/rows-3E96B194-DDDC-4D6F-80FC-6446A5851B16.png",
          "frame" : {
            "y" : 264,
            "x" : 182,
            "width" : 1397,
            "height" : 506
          }
        },
        "imageType" : "png",
        "layerFrame" : {
          "y" : 264,
          "x" : 182,
          "width" : 1397,
          "height" : 506
        },
        "name" : "rows"
      }
    ],
    "image" : {
      "path" : "images\/interaction-B217884F-65B2-4981-A48F-700F2138092D.png",
      "frame" : {
        "y" : 0,
        "x" : 0,
        "width" : 1760,
        "height" : 948
      }
    },
    "imageType" : "png",
    "layerFrame" : {
      "y" : 0,
      "x" : 0,
      "width" : 1760,
      "height" : 948
    },
    "name" : "interaction"
  }
]
window.Framer.Defaults.DeviceView = {
  "deviceScale" : -1,
  "orientation" : 0,
  "contentScale" : 1,
  "deviceType" : "fullscreen"
};

window.FramerStudioInfo = {
  "deviceImagesUrl" : "file:\/\/\/Applications\/Framer%20Studio.app\/Contents\/Resources\/DeviceImages\/",
  "documentTitle" : "selectableTable.framer"
};

Framer.Device = new Framer.DeviceView();
Framer.Device.setupContext();